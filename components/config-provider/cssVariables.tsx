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

  const fillColor = (colorVal: string, type: string) => {
    const baseColor = new TinyColor(colorVal);
    const colorPalettes = generate(baseColor.toHexString());

    variables[`${type}-color`] = formatColor(baseColor);
    variables[`${type}-color-disabled`] = colorPalettes[1];
    variables[`${type}-color-hover`] = colorPalettes[4];
    variables[`${type}-color-active`] = colorPalettes[7];
  };

  // ================ Primary Color ================
  if (theme.primaryColor) {
    fillColor(theme.primaryColor, 'primary');

    // FIXME: Remove these if no need anymore
    const primaryColor = new TinyColor(theme.primaryColor);
    const primaryColors = generate(primaryColor.toHexString());

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

  // ================ Warning Color ================
  if (theme.warningColor) {
    fillColor(theme.warningColor, 'warning');
  }

  // ================= Error Color =================
  if (theme.errorColor) {
    fillColor(theme.errorColor, 'error');
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
