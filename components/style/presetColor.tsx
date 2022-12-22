/* eslint-disable import/prefer-default-export */

import type { CSSObject } from '@ant-design/cssinjs';
import type { AliasToken, PresetColorKey } from '../theme/internal';
import { PresetColors } from '../theme/internal';
import type { TokenWithCommonCls } from '../theme/util/genComponentStyleHook';

type CSSProp = 'color' | 'backgroundColor' | 'borderColor';

interface CalcColor {
  lightColor: string;
  lightBorderColor: string;
  darkColor: string;
  textColor: string;
}

interface Options {
  /**
   * Role and CSS properties
   * @default ['color', 'backgroundColor']
   */
  cssProps?: CSSProp[];
  /**
   * Generate default and inverse
   * @default ['default']
   */
  type?: Array<'default' | 'inverse'>;

  /**
   * default css selector
   * @default `${token.componentCls}-${colorKey}`
   */
  defaultSelector?: (colorKey: PresetColorKey) => string;

  /**
   * inverse css selector
   * @default ${defaultSelector(colorKey)}-inverse`
   */
  inverseSelector?: (colorKey: PresetColorKey) => string;

  /**
   * generate other css
   */
  genOtherCss?: (colorKey: PresetColorKey, calcColor: CalcColor) => CSSObject;
}

export function genPresetColor<Token extends TokenWithCommonCls<AliasToken>>(
  token: Token,
  options?: Options,
): CSSObject {
  const {
    cssProps = ['color', 'backgroundColor'],
    type = ['default'],
    defaultSelector = (colorKey: PresetColorKey) => `${token.componentCls}-${colorKey}`,
    inverseSelector = (colorKey: PresetColorKey) => {
      const allSelector = defaultSelector(colorKey).split(',');
      return allSelector.map((selector) => `${selector}-inverse`).join(',');
    },
    genOtherCss = () => ({}),
  } = options || {};

  return PresetColors.reduce((prev: Record<string, CSSObject>, colorKey: PresetColorKey) => {
    const lightColor = token[`${colorKey}-1`];
    const lightBorderColor = token[`${colorKey}-3`];
    const darkColor = token[`${colorKey}-6`];
    const textColor = token[`${colorKey}-7`];

    const defaultSelectorStr = defaultSelector(colorKey);
    const inverseSelectorStr = inverseSelector(colorKey);

    prev[defaultSelectorStr] = {};
    prev[inverseSelectorStr] = {};

    cssProps.forEach((cssProp) => {
      if (type.includes('default')) {
        if (cssProp === 'color') {
          prev[defaultSelectorStr][cssProp] = textColor;
        }
        if (cssProp === 'backgroundColor') {
          prev[defaultSelectorStr][cssProp] = lightColor;
        }
        if (cssProp === 'borderColor') {
          prev[defaultSelectorStr][cssProp] = lightBorderColor;
        }
      }

      if (type.includes('inverse')) {
        if (cssProp === 'color') {
          prev[inverseSelectorStr][cssProp] = token.colorTextLightSolid;
        }

        if (['backgroundColor', 'borderColor'].includes(cssProp)) {
          prev[inverseSelectorStr][cssProp as any] = darkColor;
        }
      }
    });

    return {
      ...prev,
      ...genOtherCss(colorKey, { lightColor, lightBorderColor, darkColor, textColor }),
    };
  }, {});
}
