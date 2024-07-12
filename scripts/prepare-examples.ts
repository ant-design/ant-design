import fg from 'fast-glob';
import fs from 'fs-extra';
import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';

import rootPkg from '../package.json';

const examples = fg.sync(['examples/**/package.json'], {
  cwd: process.cwd(),
  onlyFiles: true,
  ignore: ['**/node_modules/**', '.git'],
});

const _order = ['dependencies', 'devDependencies', 'peerDependencies'] as const;

function detectRootDepsVersion(pkgName: string) {
  const _pkg: any = rootPkg;

  for (let i = 0; i < _order.length; i++) {
    const depKey = _order[i];
    if (_pkg?.[depKey]?.[pkgName]) {
      return _pkg[depKey][pkgName];
    }
  }
}

function syncVersion(pkgJson = {}, deps: string[] = []) {
  const _pkgJson: any = cloneDeep(pkgJson);

  _order.forEach((key) => {
    const _processDeps = _pkgJson[key];

    if (isPlainObject(_processDeps)) {
      Object.keys(_processDeps).forEach((dep) => {
        if (deps.includes(dep)) {
          _processDeps[dep] = detectRootDepsVersion(dep) ?? _processDeps[dep];
        }
      });
    }
  });

  return _pkgJson;
}

function modifyPackageJson(pkgJson: any) {
  if (typeof pkgJson === 'object' && pkgJson !== null) {
    return {
      ...syncVersion(
        pkgJson,
        ['@ant-design/cssinjs'], // need to sync version
      ),
      author: 'antd GitHub CI',
    };
  }
}

function main() {
  for (let i = 0; i < examples.length; i++) {
    const example = examples[i];

    const pkgJson = fs.readJsonSync(example);
    const newPkgJson = modifyPackageJson(pkgJson) ?? pkgJson;

    const rewritePath = process.env.CI ? example : `${example}.tmp`; // ignored

    fs.writeJsonSync(rewritePath, newPkgJson, { spaces: 2 });

    globalThis.console.log(`🔮 [prepare-examples] ${pkgJson.name} has been prepared.`);
  }
}

main();
