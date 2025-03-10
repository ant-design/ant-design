import type { CSSObject } from '@ant-design/cssinjs';

import { textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genEllipsisStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-cell-ellipsis`]: {
        ...textEllipsis,
        wordBreak: 'keep-all',

        // Fixed first or last should special process
        [`
          &${componentCls}-cell-fix-start-shadow,
          &${componentCls}-cell-fix-end-shadow
        `]: {
          overflow: 'visible',
          [`${componentCls}-cell-content`]: {
            ...textEllipsis,
            display: 'block',
          },
        },

        [`${componentCls}-column-title`]: {
          ...textEllipsis,
          wordBreak: 'keep-all',
        },
      },
    },
  };
};

export default genEllipsisStyle;
