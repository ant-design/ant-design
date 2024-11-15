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
  const getCompactBorderStyle = (vertical?: boolean) =>
    ({
      [`${componentCls}-compact${vertical ? '-vertical' : ''}-item${componentCls}-primary:not([disabled])`]:
        {
          '& + &::before': {
            position: 'absolute',
            top: calc(lineWidth).mul(-1).equal(),
            insetInline: 0,
            backgroundColor: colorPrimaryHover,
            content: '""',
            [vertical ? 'height' : 'width']: lineWidth,
          },
        },
    }) as CSSObject;
  // Special styles for Primary Button
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
