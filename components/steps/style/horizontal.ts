import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genHorizontalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`; // .ant-steps-item

  return {
    [`${componentCls}-horizontal`]: {
      [itemCls]: {
        flex: '1 1 auto',
        minWidth: token.iconSize,
      },

      [`${itemCls}-content`]: {
        paddingBottom: 0,
      },

      [`${itemCls}-rail`]: {
        position: 'static',
        marginTop: 'calc(var(--steps-icon-size) / 2 + var(--steps-item-wrapper-padding-top))',
        width: 'auto',
        height: 'var(--steps-rail-size)',
        flex: 1,
        minWidth: 0,
        alignSelf: 'flex-start',
        transform: 'translateY(-50%)',
      },
    },
  };
};

export default genHorizontalStyle;
