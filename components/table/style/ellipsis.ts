import type { CSSObject } from '@ant-design/cssinjs';

import { textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genEllipsisStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  const cellContentCls = `${componentCls}-cell-content`;

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-cell-ellipsis`]: {
        ...textEllipsis,
        wordBreak: 'keep-all',

        // Inline-block children are clipped by the cell without showing the ellipsis,
        // so let Button and Tag shrink to the cell and ellipsis their own text.
        // https://github.com/ant-design/ant-design/issues/5753
        [`> ${antCls}-btn, > ${cellContentCls} > ${antCls}-btn`]: {
          maxWidth: '100%',

          [`> span:not(${antCls}-btn-icon)`]: {
            ...textEllipsis,
            minWidth: 0,
          },
        },

        [`> ${antCls}-tag, > ${cellContentCls} > ${antCls}-tag`]: {
          ...textEllipsis,
          maxWidth: '100%',
          // `overflow: hidden` moves the inline-block baseline, keep the Tag where it was
          verticalAlign: 'middle',
        },

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
