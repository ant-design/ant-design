/* eslint-disable import/prefer-default-export */

import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { Theme } from './context';

export function registerTheme(theme: Theme) {
  const variables: Record<string, string> = {};

  if (theme.primaryColor) {
    variables['primary-color'] = theme.primaryColor;
  }

  // Convert to css variables
  const cssList = Object.keys(variables).map(key => `--ant-${key}: ${variables[key]};`);

  updateCSS(
    `
  :root {
    ${cssList.join('\n')}
  }
  `,
    'ant-dynamic-theme',
  );
}
