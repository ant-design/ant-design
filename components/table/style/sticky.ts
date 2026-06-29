import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genStickyStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    componentCls,
    opacityLoading,
    tableScrollThumbBg,
    tableScrollThumbBgHover,
    tableScrollThumbSize,
    tableScrollBg,
    stickyScrollBarBorderRadius,
    lineWidth,
    lineType,
    tableBorderColor,
    zIndexTableFixed,
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-sticky`]: {
        '&-holder': {
          position: 'sticky',
          zIndex: `calc(var(--columns-count) * 2 + ${zIndexTableFixed} + 1)`,
          background: token.colorBgContainer,
        },

        '&-scroll': {
          position: 'sticky',
          bottom: 0,
          height: `${unit(tableScrollThumbSize)} !important`,
          zIndex: `calc(var(--columns-count) * 2 + ${zIndexTableFixed} + 1)`,
          display: 'flex',
          alignItems: 'center',
          background: tableScrollBg,
          borderTop: tableBorder,
          opacity: opacityLoading,

          '&:hover': {
            transformOrigin: 'center bottom',
          },

          // fake scrollbar style of sticky
          '&-bar': {
            height: tableScrollThumbSize,
            backgroundColor: tableScrollThumbBg,
            borderRadius: stickyScrollBarBorderRadius,
            transition: `all ${token.motionDurationSlow}, transform 0s`,
            position: 'absolute',
            bottom: 0,

            '&:hover, &-active': {
              backgroundColor: tableScrollThumbBgHover,
            },
          },
        },
      },
    },
  };
};

export default genStickyStyle;
