/* eslint-disable no-await-in-loop, no-console */

// ==============================================================================
// This script is used for converting demo with ES6 `export default` grammar
// PR: https://github.com/ant-design/ant-design/pull/34843
// ==============================================================================

const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const chalk = require('chalk');

(async () => {
  console.time('Execution...');

  const demoFiles = glob.sync(path.join(process.cwd(), 'components/*/demo/*.md'));

  const tmpFolder = path.resolve('components', '~tmp');
  await fs.remove(tmpFolder);
  await fs.ensureDir(tmpFolder);

  function getConvertedDemo(content) {
    return content.replace(
      /ReactDOM.render\(([\S\s]*),\s*mountNode,?(\n)?\);/g,
      'export default () => ($1$2);',
    );
  }

  for (let i = 0; i < demoFiles.length; i += 1) {
    const demoPath = demoFiles[i];
    console.log(chalk.white(`Converting demos(${i + 1}/${demoFiles.length}): ${demoPath}`));
    const content = await fs.readFile(demoPath, 'utf8');
    const newContent = getConvertedDemo(content);
    await fs.writeFile(demoPath, newContent, 'utf8');
  }
  console.log(chalk.green(`All demos(${i + 1}/${demoFiles.length}) done.`));
})();
