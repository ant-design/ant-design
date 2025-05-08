import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genHorizontalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSize } = token;
  const itemCls = `${componentCls}-item`; // .ant-steps-item

  return {
    [`${componentCls}-horizontal`]: {
      [itemCls]: {
        flex: '1 1 auto',
        minWidth: token.iconSize,
      },

      [`${itemCls}-rail`]: {
        marginTop: token.calc(`var(--steps-icon-size)`).div(2).equal(),
        height: token.lineWidth,
        flex: 1,
        minWidth: 0,
        alignSelf: 'flex-start',
        transform: 'translateY(-50%)',
      },
    },
  };
};

export default genHorizontalStyle;
