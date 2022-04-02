/* eslint-disable no-await-in-loop, no-console */

const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const chalk = require('chalk');
const { spawn } = require('child_process');

(async () => {
  console.time('Execution...');

  const demoFiles = glob.sync(path.join(process.cwd(), 'components/**/demo/*.md'));

  const tmpFolder = path.resolve('components', '~tmp');
  await fs.remove(tmpFolder);
  await fs.ensureDir(tmpFolder);

  function getTypescriptDemo(content, demoPath) {
    const lines = content.split(/[\n\r]/);

    const tsxStartLine = lines.findIndex(line =>
      line.replace(/\s/g).toLowerCase().includes('```tsx'),
    );

    if (tsxStartLine < 0) {
      return null;
    }

    const tsxEndLine = lines.findIndex(
      (line, index) => index > tsxStartLine && line.trim() === '```',
    );

    let script = lines.slice(tsxStartLine + 1, tsxEndLine).join('\n');
    // Replace mountNode
    script = script.replace('mountNode', `document.getElementById('#root')`);

    // Replace antd
    script = script.replace(`from 'antd'`, `from '..'`);

    // Add path
    script = `/* eslint-disabled */\n// ${demoPath}\n${script}`;

    return script;
  }

  for (let i = 0; i < demoFiles.length; i += 1) {
    const demoPath = demoFiles[i];

    const content = await fs.readFile(demoPath, 'utf8');
    const script = getTypescriptDemo(content, demoPath);

    const dirs = path.dirname(demoPath).split(path.sep);

    // Parse TSX
    if (script) {
      const tmpFile = path.join(
        tmpFolder,
        `${dirs[dirs.length - 2]}-${path.basename(demoPath).replace(/\..*/, '')}.tsx`,
      );
      await fs.writeFile(tmpFile, script, 'utf8');
    }
  }
})();
