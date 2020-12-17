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

    // insert React & ReactDOM
    script = `import ReactDOM from 'react-dom';\n${script}`;
    if (!script.includes('import React') && !script.includes('import * as React')) {
      script = `import React from 'react';\n${script}`;
    }

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

  const child = spawn('npm', ['run', 'tsc']);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('exit', async code => {
    console.timeEnd('Execution...');

    if (code) {
      console.log(chalk.red('💥 OPS! Seems some tsx demo not pass tsc...'));
    } else {
      await fs.remove(tmpFolder);
      console.log(chalk.green('🤪 All tsx demo passed. Congratulations!'));
    }

    process.exit(code);
  });
})();
