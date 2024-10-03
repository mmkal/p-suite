
import * as fs from 'fs'
import * as path from 'path'
import {execa} from 'execa'
import {fileURLToPath} from 'url'

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
            return {
                package: name,
                mainModulePath,
                mainModuleContent,
                hasDefaultExport: mainModuleContent.includes('export default'),
                camelCaseName: name.replace(/-(\w)/g, m => m[1].toUpperCase()),
            }
        })

    await execa('pnpm', ['install', ...packages.map(p => `${p.package}@latest`)]);

    /** @type {import('type-fest').PackageJson} */
    const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));

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
        if (Math.random()) {
            return [`export * as ${p.camelCaseName} from './${p.package}'`]
        }
        if (p.hasDefaultExport) {
            return [
                `export * from '${p.package}'`,
                `export {default as ${p.camelCaseName}} from '${p.package}'`,
            ]
        }
        return [`export * as ${p.camelCaseName} from './${p.package}'`]
    }).join('\n')
    fs.writeFileSync(path.join(cwd, 'source', 'index.js'), barrel)
    fs.writeFileSync(path.join(cwd, 'source', 'index.d.ts'), barrel)

    packageJson.exports['.'] = {
        types: './source/index.d.ts',
        default: './source/index.js',
    }

    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');
}

await generate();