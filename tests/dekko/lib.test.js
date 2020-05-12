const $ = require('dekko');
const chalk = require('chalk');
const path = require('path');

function getFileName(filePath) {
  return filePath.slice(filePath.lastIndexOf(path.sep) + 1);
}

$('lib').isDirectory().hasFile('index.js').hasFile('index.d.ts');

$('lib/*')
  .filter(
    filename =>
      !filename.endsWith('index.js') &&
      !filename.endsWith('index.d.ts') &&
      !filename.endsWith('.map'),
  )
  .isDirectory()
  .filter(
    filename =>
      !filename.endsWith('style') && !filename.endsWith('_util') && !filename.endsWith('locale'),
  )
  .hasFile('index.js')
  .hasFile('index.d.ts')
  .hasDirectory('style');

$('lib/*/style').hasFile('css.js').hasFile('index.js');

// locale
const filterLocaleFile = filePath => {
  const fileName = getFileName(filePath);
  return (
    !fileName.endsWith('index.js') &&
    !fileName.endsWith('.d.ts') &&
    !fileName.endsWith('.map') &&
    !fileName.endsWith('style') &&
    !fileName.includes('-') &&
    !fileName.endsWith('LocaleReceiver.js') &&
    !fileName.endsWith('context.js')
  );
};
const localeFiles = $('lib/locale/*').filter(filterLocaleFile);
const localeProviderFiles = $('lib/locale-provider/*').filter(filterLocaleFile);

function compare(originFiles, targetFiles, targetPath) {
  originFiles.assert(
    `not exist in '${targetPath}'. Please use 'scripts/generateLegacyLocale.js' to refresh locale files.`,
    filePath => {
      const fileName = getFileName(filePath);

      return targetFiles.filenames.some(targetFilePath => getFileName(targetFilePath) === fileName);
    },
  );
}

compare(localeFiles, localeProviderFiles, '/locale-provider');
compare(localeProviderFiles, localeFiles, '/locale');

// eslint-disable-next-line no-console
console.log(chalk.green('✨ `lib` directory is valid.'));
