import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genFixedStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  // FIXME
  const shadowColor = new TinyColor('rgba(0, 0, 0, 0.15)').darken(5).toRgbString();
  return {
    [`${componentCls}-wrapper`]: {
      [`
        ${componentCls}-cell-fix-left,
        ${componentCls}-cell-fix-right
      `]: {
        position: 'sticky !important',
        zIndex: token.zIndexTableFixed,
        background: token.tableBg,
      },

      [`
        ${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after
      `]: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '-1px',
        width: '30px',
        transform: 'translateX(100%)',
        transition: 'box-shadow 0.3s',
        content: '""',
        pointerEvents: 'none',
      },

      [`
        ${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after
      `]: {
        position: 'absolute',
        top: '0',
        bottom: '-1px',
        left: '0',
        width: '30px',
        transform: 'translateX(-100%)',
        transition: 'box-shadow 0.3s',
        content: '""',
        pointerEvents: 'none',
      },

      [`${componentCls}-container`]: {
        '&::before, &::after': {
          position: 'absolute',
          top: '0',
          bottom: '0',
          zIndex: '1',
          width: '30px',
          transition: 'box-shadow 0.3s',
          content: '""',
          pointerEvents: 'none',
        },

        '&::before': {
          left: '0',
        },

        '&::after': {
          right: '0',
        },
      },

      [`${componentCls}-ping-left`]: {
        [`&:not(${componentCls}-has-fix-left) ${componentCls}-container`]: {
          position: 'relative',

          '&::before': {
            boxShadow: `inset 10px 0 8px -8px ${shadowColor}`,
          },
        },

        [`
          ${componentCls}-cell-fix-left-first::after,
          ${componentCls}-cell-fix-left-last::after
        `]: {
          boxShadow: `inset 10px 0 8px -8px ${shadowColor}`,
        },

        [`${componentCls}-cell-fix-left-last::before`]: {
          backgroundColor: 'transparent !important',
        },
      },

      [`${componentCls}-ping-right`]: {
        [`&:not(${componentCls}-has-fix-right) ${componentCls}-container`]: {
          position: 'relative',

          '&::before': {
            boxShadow: `inset -10px 0 8px -8px ${shadowColor}`,
          },
        },

        [`
          ${componentCls}-cell-fix-right-first::after,
          ${componentCls}-cell-fix-right-last::after
        `]: {
          boxShadow: `inset -10px 0 8px -8px ${shadowColor}`,
        },
      },
    },
  };
};

export default genFixedStyle;
