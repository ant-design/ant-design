import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genStickyStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-sticky`]: {
        '&-holder': {
          position: 'sticky',
          zIndex: token.zIndexTableSticky,
          background: token.colorBgComponent,
        },

        '&-scroll': {
          position: 'sticky',
          bottom: 0,
          zIndex: token.zIndexTableSticky,
          display: 'flex',
          alignItems: 'center',
          background: new TinyColor(token.tableBorderColor).lighten(80).toRgbString(),
          borderTop: tableBorder,
          opacity: 0.6,

          '&:hover': {
            transformOrigin: 'center bottom',
          },

          // fake scrollbar style of sticky
          '&-bar': {
            // FIXME
            height: 8,
            // FIXME
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderRadius: 100,
            transition: `all ${token.motionDurationSlow}`,

            '&:hover, &-active': {
              // FIXME
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          },
        },
      },
    },
  };
};

export default genStickyStyle;
