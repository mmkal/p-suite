
import * as fs from 'fs'
import * as path from 'path'
import {execa} from 'execa'
import {fileURLToPath} from 'url'
import {readPackageUpSync} from 'read-package-up'
import * as semver from 'semver'

const generate = async () => {
    const cwd = process.cwd()
    const readme = fs.readFileSync(path.join(cwd, 'readme.md'), 'utf8');

    const packages = readme.split('\n')
        .flatMap(line => {
            if (!line.startsWith('- **')) return []
            return [line.split('[')[1].split(']')[0]]
        })
        .map(name => {
            const mainModulePath = fileURLToPath(import.meta.resolve(name))
            const mainModuleContent = fs.readFileSync(mainModulePath, 'utf8')
            const pkg = readPackageUpSync({cwd: path.dirname(mainModulePath)})
            // console.log(name, 'engines', pkg.packageJson.engines)
            return {
                package: name,
                mainModulePath,
                packageJson: pkg.packageJson,
                packageJsonPath: pkg.path,
                mainModuleContent,
                hasDefaultExport: mainModuleContent.includes('export default'),
                camelCaseName: name.replace(/-(\w)/g, m => m[1].toUpperCase()),
            }
        })

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

    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');
}

await generate();