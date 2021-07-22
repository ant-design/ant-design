/* eslint-disable import/prefer-default-export, prefer-destructuring */

import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { TinyColor } from '@ctrl/tinycolor';
import { generate } from '@ant-design/colors';
import { Theme } from './context';

export function registerTheme(theme: Theme) {
  const variables: Record<string, string> = {};

  const formatColor = (color: TinyColor, updater?: (cloneColor: TinyColor) => void) => {
    const clone = color.clone();
    updater?.(clone);
    return clone.toHexString();
  };

  // ================ Primary Color ================
  if (theme.primaryColor) {
    const primaryColor = new TinyColor(theme.primaryColor);
    const primaryColors = generate(primaryColor.toHexString());

    variables['primary-color'] = formatColor(primaryColor);
    variables['primary-color-disabled'] = primaryColors[1];
    variables['primary-color-hover'] = primaryColors[4];
    variables['primary-color-active'] = primaryColors[7];

    // Legacy - We should use semantic naming standard
    primaryColors.forEach((color, index) => {
      variables[`primary-${index + 1}`] = color;
    });
    // Deprecated
    variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, c => c.lighten(35));
    variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, c => c.lighten(20));
    variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, c => c.tint(20));
    variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, c => c.tint(50));
    variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, c =>
      c.setAlpha(primaryColor.getAlpha() * 0.12),
    );
  }

  // ================= Error Color =================
  if (theme.errorColor) {
    const errorColor = new TinyColor(theme.errorColor);
    const errorColors = generate(errorColor.toHexString());

    variables['error-color'] = formatColor(errorColor);
    variables['error-color-disabled'] = errorColors[1];
    variables['error-color-hover'] = errorColors[4];
    variables['error-color-active'] = errorColors[7];
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
