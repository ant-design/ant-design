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
  const { antCls, componentCls, lineWidth, calc, colorBgContainer } = token;

  const solidSelector = `${componentCls}-variant-solid:not([disabled])`;
  const insetOffset = calc(lineWidth).mul(-1).equal();

  const [varName, varRef] = genCssVar(antCls, 'btn');

  const getCompactBorderStyle = (vertical?: boolean): CSSObject => {
    const itemCls = `${componentCls}-compact${vertical ? '-vertical' : ''}-item`;

    return {
      // TODO: Border color transition should be not cover when has color.
      [itemCls]: {
        [varName('compact-connect-border-color')]: varRef('bg-color-hover'),

        [`&${solidSelector}`]: {
          transition: `none`,

          [`& + ${solidSelector}:before`]: [
            {
              position: 'absolute',
              backgroundColor: varRef('compact-connect-border-color'),
              content: '""',
            },
            vertical
              ? {
                  top: insetOffset,
                  insetInline: insetOffset,
                  height: lineWidth,
                }
              : {
                  insetBlock: insetOffset,
                  insetInlineStart: insetOffset,
                  width: lineWidth,
                },
          ],

          '&:hover:before': {
            display: 'none',
          },
        },
      },
    };
  };

  // Special styles for solid Button
  return [
    getCompactBorderStyle(),
    getCompactBorderStyle(true),
    {
      [`${solidSelector}${componentCls}-color-default`]: {
        [varName('compact-connect-border-color')]:
          `color-mix(in srgb, ${varRef('bg-color-hover')} 75%, ${colorBgContainer})`,
      },
    },
  ];
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
