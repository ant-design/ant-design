import { ThemeType } from './index';
import warning from '../_util/warning';

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  ['aria-hidden']: 'true',
};

const fillTester = /-fill$/;
const outlineTester = /-o$/;
const twoToneTester = /-twotone$/;

export function getThemeFromTypeName(type: string): ThemeType | null {
  let result: ThemeType | null = null;
  if (fillTester.test(type)) {
    result = 'filled';
  } else if (outlineTester.test(type)) {
    result = 'outlined';
  } else if (twoToneTester.test(type)) {
    result = 'twoTone';
  }
  return result;
}

export function withThemeSuffix(type: string, theme: ThemeType) {
  const alreadyHaveTheme = getThemeFromTypeName(type);
  warning(!alreadyHaveTheme,
    `This icon already has a theme '${alreadyHaveTheme}'.` +
    ` The prop 'theme' will be ignored.`);
  let result = type;
  if (!alreadyHaveTheme) {
    if (theme === 'filled') {
      result += '-fill';
    } else if (theme === 'outlined') {
      result += '-o';
    } else if (theme === 'twoTone') {
      result += '-twotone';
    } else {
      warning(false, `This icon '${type}' has unknown theme '${theme}'`);
    }
  }
  return result;
}
