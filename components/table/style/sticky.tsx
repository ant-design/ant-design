import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme';
import type { TableToken } from './index';

const genStickyStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const {
    componentCls,
    opacityLoading,
    tableScrollThumbBg,
    tableScrollThumbBgHover,
    tableScrollThumbSize,
    tableScrollBg,
    zIndexTableSticky,
  } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-sticky`]: {
        '&-holder': {
          position: 'sticky',
          zIndex: zIndexTableSticky,
          background: token.colorBgComponent,
        },

        '&-scroll': {
          position: 'sticky',
          bottom: 0,
          height: `${tableScrollThumbSize}px !important`,
          zIndex: zIndexTableSticky,
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
            borderRadius: 100,
            transition: `all ${token.motionDurationSlow}, transform none`,
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
