#!/usr/bin/env node
/* eslint strict:0, camelcase:0 */
'use strict';

const child_process = require('child_process');
const execSync = child_process.execSync;
const runCmd = require('antd-tools/lib/runCmd');
execSync('rm -rf node_modules/rc-*');
const packageJson = require('../package.json');
const deps = packageJson.dependencies;
const savePrefix = execSync('tnpm config get save-prefix').toString().trim();
execSync('tnpm config set save-prefix \'~\'');
let cmd = [];
for (const name in deps) {
  if (name.match(/^rc-/)) {
    cmd.push(`${name}@latest`);
  }
}
runCmd('tnpm', ['i'].concat(cmd).concat('--save'), () => {
  execSync(`tnpm config set save-prefix '${savePrefix}'`);
});
