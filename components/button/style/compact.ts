// Style as inline component
import type { CSSObject } from '@ant-design/cssinjs';

import { genCompactItemStyle } from '../../style/compact-item';
import { genCompactItemVerticalStyle } from '../../style/compact-item-vertical';
import type { GenerateStyle } from '../../theme/internal';
import { genSubStyleComponent } from '../../theme/internal';
import type { ButtonToken } from './token';
import { prepareComponentToken, prepareToken } from './token';

const genButtonCompactStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, colorPrimaryHover, lineWidth, calc } = token;
  const insetOffset = calc(lineWidth).mul(-1).equal();
  const getCompactBorderStyle = (vertical?: boolean) => {
    const itemCls = `${componentCls}-compact${vertical ? '-vertical' : ''}-item`;
    const selector = `${itemCls}${componentCls}-primary:not([disabled])`;

    return {
      // TODO: Border color transition should be not cover when has color.
      [itemCls]: {
        transition: `none`,
      },

      [`${selector} + ${selector}::before`]: {
        position: 'absolute',
        top: vertical ? insetOffset : 0,
        insetInlineStart: vertical ? 0 : insetOffset,
        backgroundColor: colorPrimaryHover,
        content: '""',
        width: vertical ? '100%' : lineWidth,
        height: vertical ? lineWidth : '100%',
      } as CSSObject,
    };
  };
  // Special styles for Primary Button
  return {
    ...getCompactBorderStyle(),
    ...getCompactBorderStyle(true),
  };
};

// Handle dropdown trigger button in compact group
// When dropdown is open, the trigger button has elevated z-index
// But when hovering sibling buttons, they should have higher z-index
// to ensure proper border rendering
// https://github.com/ant-design/ant-design/issues/56662
const genDropdownCompactStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, antCls } = token;
  const compactCls = `${componentCls}-compact`;

  return {
    [compactCls]: {
      // When a button is a dropdown trigger and dropdown is open,
      // give it elevated z-index
      [`&-item${antCls}-dropdown-open`]: {
        zIndex: 3,
      },
      // When hovering a sibling button, it should have higher z-index
      // than the dropdown-open button to ensure proper border overlap
      [`&-item:hover`]: {
        zIndex: 4,
      },
    },
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
      genDropdownCompactStyle(buttonToken),
    ];
  },
  prepareComponentToken,
);
