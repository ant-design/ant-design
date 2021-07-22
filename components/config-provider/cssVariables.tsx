/* eslint-disable import/prefer-default-export */

import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { TinyColor } from '@ctrl/tinycolor';
import { Theme } from './context';

export function registerTheme(theme: Theme) {
  const variables: Record<string, string> = {};

  if (theme.primaryColor) {
    // ================ Primary Color ================
    const primaryColor = new TinyColor(theme.primaryColor);
    variables['primary-color'] = primaryColor.toHexString();
    // Deprecated
    variables['primary-color-deprecated-l-35'] = primaryColor.clone().lighten(35).toHexString();
    variables['primary-color-deprecated-l-20'] = primaryColor.clone().lighten(20).toHexString();
    variables['primary-color-deprecated-t-20'] = primaryColor.clone().tint(20).toHexString();
    variables['primary-color-deprecated-t-50'] = primaryColor.clone().tint(50).toHexString();
    variables['primary-color-deprecated-f-12'] = primaryColor
      .clone()
      .setAlpha(primaryColor.getAlpha() * 0.12)
      .toHexString();
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
