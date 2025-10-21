import * as prettier from "prettier";
import * as fs from 'fs'
import * as path from 'path'
import {execa} from 'execa'
import {fileURLToPath} from 'url'
import {readPackageUpSync} from 'read-package-up'
import * as semver from 'semver'

const generate = async () => {
    const cwd = process.cwd()
    const rootMarkdownFilepath = path.join(cwd, 'readme.md')
    const readme = fs.readFileSync(rootMarkdownFilepath, 'utf8');

    const beginGeneratedPackageDocsMarker = '<!-- begin generated package docs -->'
    const endGeneratedPackageDocsMarker = '<!-- end generated package docs -->'
    const beginIndex = readme.indexOf(beginGeneratedPackageDocsMarker)
    const endIndex = readme.indexOf(endGeneratedPackageDocsMarker)
    if (beginIndex === -1 || endIndex === -1) {
        throw new Error(`Add ${beginGeneratedPackageDocsMarker} and ${endGeneratedPackageDocsMarker} to the readme somewhere.`)
    }
    /** @type {import('./pkgs.json')} */
    const pkgs = JSON.parse(fs.readFileSync(path.join(cwd, 'pkgs.json'), 'utf8'))
    
    const allPkgs = pkgs.sections.flatMap(s => s.packages)
    for (const pkg of allPkgs) {
        const name = pkg.name
        try {
            (import.meta.resolve(name))
        } catch {
            await execa('pnpm', ['install', name])
        }
    }
    const packages = allPkgs
        .map(({name, url}) => {
            const mainModulePath = fileURLToPath(import.meta.resolve(name))
            const mainModuleContent = fs.readFileSync(mainModulePath, 'utf8')
            const pkg = readPackageUpSync({cwd: path.dirname(mainModulePath)})
            const readmePath = [
                path.join(path.dirname(pkg.path), 'README.md'),
                path.join(path.dirname(pkg.path), 'readme.md'),
            ].find(fs.existsSync)
            const readmeContent = readmePath ? fs.readFileSync(readmePath, 'utf8') : ''
            return {
                name,
                package: name,
                url,
                mainModulePath,
                packageJson: pkg.packageJson,
                packageJsonPath: pkg.path,
                readmeContent,
                readmePath,
                mainModuleContent,
                hasDefaultExport: mainModuleContent.includes('export default'),
                camelCaseName: name.replace(/-(\w)/g, m => m[1].toUpperCase()),
            }
        })

    let newGeneratedReadmeSection = [
        ...pkgs.sections.map(s => [
            s.title,
            s.subtitle ? `\n\n${s.subtitle}\n\n` : '\n\n',
            s.packages.map(p => {
                const details = packages.find(d => d.package === p.name)
                if (!details) {
                    throw new Error(JSON.stringify({}))
                }
                return `- [**${p.name}**](#${p.name}): ${details.packageJson.description}`
            }).join('\n')
        ].join('\n\n')),
        '## Docs',
        ...packages.map(p => {
            const modifiedContent = p.readmeContent
                .replaceAll(`# ${p.package}`, ``)
                .replaceAll('\n#', '\n####')
                .replaceAll(/#{5,}/g, '#####')
                .replaceAll(`install ${p.package}`, `install p-suite`)
                .replaceAll(`from '${p.package}'`, `from 'p-suite/${p.package}'`)
                .trim()
            const sections = modifiedContent.split('\n\n')
            let trimmedContent = ''
            for (const section of sections) {
                const newTrimmedContent = [trimmedContent, section].join('\n\n')
                if (section.startsWith('#') && newTrimmedContent.split('\n').length > 50) {
                    trimmedContent += `\n\n_see the rest of the docs in the [source package](${p.url})_`
                    break
                }
                trimmedContent = newTrimmedContent
            }
            return [
                `### ${p.package}`,
                '\n\n',
                `_Documenation from [source package](${p.url})_ | _[Back to packages](#packages)_`,
                '\n\n',
                trimmedContent,
                '\n\n',
            ].join('\n')
        })
    ].join('\n\n')

    for (const p of packages) {
        newGeneratedReadmeSection = newGeneratedReadmeSection
            .replaceAll(`(${p.url})`, `(#${p.name})`)
            .replaceAll(`[source package](#${p.name})`, `[source package](${p.url})`) // in this case we want to link to the actual url
    }
    newGeneratedReadmeSection = newGeneratedReadmeSection
        .replaceAll(
            `[More…](https://github.com/sindresorhus/promise-fun)`,
            `[More…](#packages)`,
        )

    let updatedReadme = [
        readme.slice(0, beginIndex),
        beginGeneratedPackageDocsMarker,
        '\n',
        newGeneratedReadmeSection,
        '\n',
        readme.slice(endIndex),
    ].join('\n')
    updatedReadme = await prettier.format(updatedReadme, {
        filepath: rootMarkdownFilepath,
        // try to match sindresorhus's style as closely as possible
        semi: true,
        singleQuote: true,
        useTabs: true,
        bracketSpacing: false,
        printWidth: 120,
        trailingComma: 'none',
        arrowParens: 'avoid',
    })

    fs.writeFileSync(rootMarkdownFilepath, updatedReadme, 'utf8')
        
    await execa('pnpm', ['install', ...packages.map(p => `${p.package}@latest`)]);

    const {packageJson} = readPackageUpSync({cwd})

    packageJson.exports = {}
    const sourceDirectory = path.join(cwd, 'source')
    fs.mkdirSync(sourceDirectory, {recursive: true})
    for (const p of packages) {
        const code = [`export * from '${p.package}'`]
        if (p.hasDefaultExport) {
            code.push(`export {default} from '${p.package}'`)
        }
        fs.writeFileSync(path.join(sourceDirectory, `${p.package}.js`), code.join('\n'))
        fs.writeFileSync(path.join(sourceDirectory, `${p.package}.d.ts`), code.join('\n'))
        packageJson.exports['./' + p.package] = {
            types: `./source/${p.package}.d.ts`,
            default: `./source/${p.package}.js`,
        }
    }
    const barrel = packages.flatMap(p => {
        return [`export * as ${p.camelCaseName} from './${p.package}'`]
    }).join('\n')
    fs.writeFileSync(path.join(cwd, 'source', 'index.js'), barrel)
    fs.writeFileSync(path.join(cwd, 'source', 'index.d.ts'), barrel)

    packageJson.exports['.'] = {
        types: './source/index.d.ts',
        default: './source/index.js',
    }

    packageJson.engines = {}
    packages.forEach(p => {
        const {engines} = p.packageJson
        if (!engines) return
        Object.entries(engines).forEach(([tool, versionString]) => {
            const parts = versionString.split(' || ').flatMap(versionString => {
                const joined = [packageJson.engines[tool], versionString].filter(Boolean).join(' ')
                const minVersion = semver.minVersion(joined)
                if (!minVersion) return []

                return `>=${minVersion.version}`
            })

            packageJson.engines[tool] = parts.join(' || ')
        })
    })

    delete packageJson._id
    if (packageJson.readme === 'ERROR: No README data found!') {
        delete packageJson.readme
    }

    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
}

await generate();
