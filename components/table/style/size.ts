import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genSizeStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, tableExpandColumnWidth, calc } = token;
  const getSizeStyle = (
    size: 'small' | 'middle',
    paddingVertical: number,
    paddingHorizontal: number,
    fontSize: number,
  ) => ({
    [`${componentCls}${componentCls}-${size}`]: {
      fontSize,
      [`
        ${componentCls}-title,
        ${componentCls}-footer,
        ${componentCls}-cell,
        ${componentCls}-thead > tr > th,
        ${componentCls}-tbody > tr > th,
        ${componentCls}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: {
        padding: `${unit(paddingVertical)} ${unit(paddingHorizontal)}`,
      },

      [`${componentCls}-filter-trigger`]: {
        marginInlineEnd: unit(calc(paddingHorizontal).div(2).mul(-1).equal()),
      },

      [`${componentCls}-expanded-row-fixed`]: {
        margin: `${unit(calc(paddingVertical).mul(-1).equal())} ${unit(
          calc(paddingHorizontal).mul(-1).equal(),
        )}`,
      },

      [`${componentCls}-tbody`]: {
        // ========================= Nest Table ===========================
        [`${componentCls}-wrapper:only-child ${componentCls}`]: {
          marginBlock: unit(calc(paddingVertical).mul(-1).equal()),
          marginInline: `${unit(
            calc(tableExpandColumnWidth).sub(paddingHorizontal).equal(),
          )} ${unit(calc(paddingHorizontal).mul(-1).equal())}`,
        },
      },

      // https://github.com/ant-design/ant-design/issues/35167
      [`${componentCls}-selection-extra`]: {
        paddingInlineStart: unit(calc(paddingHorizontal).div(4).equal()),
      },
    },
  });
  return {
    [`${componentCls}-wrapper`]: {
      ...getSizeStyle(
        'middle',
        token.tablePaddingVerticalMiddle,
        token.tablePaddingHorizontalMiddle,
        token.tableFontSizeMiddle,
      ),
      ...getSizeStyle(
        'small',
        token.tablePaddingVerticalSmall,
        token.tablePaddingHorizontalSmall,
        token.tableFontSizeSmall,
      ),
    },
  };
};

export default genSizeStyle;
