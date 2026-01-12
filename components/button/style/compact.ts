// Style as inline component
import type { CSSObject } from '@ant-design/cssinjs';

import { genCompactItemStyle } from '../../style/compact-item';
import { genCompactItemVerticalStyle } from '../../style/compact-item-vertical';
import type { GenerateStyle } from '../../theme/internal';
import { genSubStyleComponent } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { ButtonToken } from './token';
import { prepareComponentToken, prepareToken } from './token';

const genButtonCompactStyle: GenerateStyle<ButtonToken> = (token) => {
  const { antCls, componentCls, lineWidth, calc } = token;
  const insetOffset = calc(lineWidth).mul(-1).equal();

  const [, varRef] = genCssVar(antCls, 'btn');

  const getCompactBorderStyle = (vertical?: boolean) => {
    const itemCls = `${componentCls}-compact${vertical ? '-vertical' : ''}-item`;
    const selector = `${itemCls}${componentCls}-variant-solid:not([disabled])`;

    return {
      // TODO: Border color transition should be not cover when has color.
      [itemCls]: {
        transition: `none`,
      },

      [`${selector} + ${selector}::before`]: {
        position: 'absolute',
        top: vertical ? insetOffset : 0,
        insetInlineStart: vertical ? 0 : insetOffset,
        backgroundColor: varRef('bg-color-hover'),
        content: '""',
        width: vertical ? '100%' : lineWidth,
        height: vertical ? lineWidth : '100%',
      } as CSSObject,
    };
  };
  // Special styles for solid Button
  return {
    ...getCompactBorderStyle(),
    ...getCompactBorderStyle(true),
  };
};

// ============================== Export ==============================
export default genSubStyleComponent(
  ['Button', 'compact'],
  (token) => {
    const buttonToken = prepareToken(token);

    return [
      // Space Compact
      genCompactItemStyle(buttonToken),
      genCompactItemVerticalStyle(buttonToken),
      genButtonCompactStyle(buttonToken),
    ];
  },
  prepareComponentToken,
);
