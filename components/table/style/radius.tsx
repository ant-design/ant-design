import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genRadiusStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [componentCls]: {
        '&-title': {
          borderRadius: `${token.tableRadius}px ${token.tableRadius}px 0 0`,
        },

        '&-title + &-container': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,

          'table > thead > tr:first-child': {
            'th:first-child': {
              borderRadius: 0,
            },

            'th:last-child': {
              borderRadius: 0,
            },
          },
        },

        '&-container': {
          borderTopLeftRadius: token.tableRadius,
          borderTopRightRadius: token.tableRadius,

          'table > thead > tr:first-child': {
            'th:first-child': {
              borderTopLeftRadius: token.tableRadius,
            },

            'th:last-child': {
              borderTopRightRadius: token.tableRadius,
            },
          },
        },

        '&-footer': {
          borderRadius: `0 0 ${token.tableRadius}px ${token.tableRadius}px`,
        },
      },
    },
  };
};

export default genRadiusStyle;
