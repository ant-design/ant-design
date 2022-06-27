export const PASS = 'pass';
export const WARNING = 'warning';
export const ERROR = 'error';

export type STATUS = typeof PASS | typeof WARNING | typeof ERROR;

export default (line: string) => {
  // Compile error
  if (line.includes('&')) {
    return ERROR;
  }

  // Fix number
  const ignoreStyle = [
    'font-size',
    'line-height',
    'border',
    'border-',
    'opacity',
    'color',
    'z-index',
    'background',
    'background-',
    'vertical-align',
    'flex',
    'width',
    'height',
    'transition',
    'animation',
    'animation-',
    'transform',
  ];
  const [propName, propValue] = line.split(/:\s+|;/).map(s => s.trim());

  if (
    propName &&
    propValue &&
    !ignoreStyle.some(
      styleName =>
        styleName === propName || (styleName.endsWith('-') && propName.includes(styleName)),
    ) &&
    !line.includes('{') &&
    !line.includes(',')
  ) {
    const numberMatch = propValue.match(/\d+(\.\d+)?[\w%]+/g) || [];

    for (let j = 0; j < numberMatch.length; j += 1) {
      const str = numberMatch[j];

      if (str.endsWith('%') || str.endsWith('em')) {
        continue;
      }

      const num = Number(str.match(/\d+(\.\d+)?/g)?.[0] || 0);
      if (num % 4 !== 0) {
        return WARNING;
      }
    }
  }

  return PASS;
};
