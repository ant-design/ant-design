import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genRadiusStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, tableRadius } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [componentCls]: {
        // https://github.com/ant-design/ant-design/issues/39115#issuecomment-1362314574
        [`${componentCls}-title, ${componentCls}-header`]: {
          borderRadius: `${tableRadius}px ${tableRadius}px 0 0`,
        },

        [`${componentCls}-title + ${componentCls}-container`]: {
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,

          table: {
            borderRadius: 0,

            '> thead > tr:first-child': {
              'th:first-child': {
                borderRadius: 0,
              },

              'th:last-child': {
                borderRadius: 0,
              },
            },
          },
        },

        '&-container': {
          borderStartStartRadius: tableRadius,
          borderStartEndRadius: tableRadius,

          'table > thead > tr:first-child': {
            '> *:first-child': {
              borderStartStartRadius: tableRadius,
            },

            '> *:last-child': {
              borderStartEndRadius: tableRadius,
            },
          },
        },

        '&-footer': {
          borderRadius: `0 0 ${tableRadius}px ${tableRadius}px`,
        },
      },
    },
  };
};

export default genRadiusStyle;
