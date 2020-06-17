/* eslint-disable no-console */
/**
 * Generate legacy locale file as shadow of `/locale` to `/locale-provider`.
 */

const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');

glob('components/locale/@(*_*|default).tsx', (er, files) => {
  files.forEach(filePath => {
    const modulePath = filePath.replace(/^components/, '..').replace('.tsx', '');
    const legacyModulePath = filePath.replace('locale', 'locale-provider');

    const template = `import locale from '${modulePath}';

export default locale;
`.trim();

    console.log(modulePath, '=>', legacyModulePath);
    fs.writeFileSync(legacyModulePath, template, 'utf8');
  });

  console.log(chalk.green('✨ Locale generate success!'));
});
