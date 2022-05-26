import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genFixedStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
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
    },
  };
};

export default genFixedStyle;
