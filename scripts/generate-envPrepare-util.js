/**
 * ZombieJ: This util will replace `components/xx/style/yy.ts` with short path.
 * This help to minify the bundle size.
 *
 * Source:
 * const genStyle = () => ({
 *   borderRadius: `1px solid ${token.colorBorderSplit}`,
 * });
 *
 * To:
 * const genStyle = () => ({
 *   [r.Za]: `1px solid ${token.colorBorderSplit}`,
 * });
 */

const styleMap = require('../~tmpSheet.json');

const KEY_LIST = Object.keys(styleMap);

function isStyleFile(filePath) {
  return /components\/[^/]+\/style/.test(filePath);
}

function replaceStyleKeys(fileContent) {
  // let matched = false;
  let leftQuota = 0;

  // Record the prop we need to replace
  const propSet = new Set();
  const lineNo = [];

  const lines = fileContent.split('\n');
  const parsedLines = lines.map((line, index) => {
    let newLine = line;
    const trimLine = newLine.trim();

    // Only start when called `return {}` which is in the CSSObject
    if (
      newLine.includes(' return {') ||
      newLine.includes(' => ({') ||
      newLine.includes(' return [') ||
      newLine.includes(' => [')
    ) {
      leftQuota += 1;
      return newLine;
    }

    if (leftQuota === 0) {
      return newLine;
    }

    const startQuotaCount = (trimLine.match(/({|\[)/g) || []).length;
    const endQuotaCount = (trimLine.match(/(}|])/g) || []).length;

    leftQuota += startQuotaCount - endQuotaCount;

    KEY_LIST.forEach((key) => {
      const keyMatch = ` ${key}: `;
      if (newLine.includes(keyMatch)) {
        lineNo.push(index);
        // matched = true;
        // newLine = newLine.replace(keyMatch, ` [r.${styleMap[key]}]: `);
      }
    });

    return newLine;
  });

  if (matched) {
    const content = [`import r from '../../style/sheet';`, ...parsedLines].join('\n');

    return content;
  }

  return fileContent;
}

module.exports = {
  isStyleFile,
  replaceStyleKeys,
};
