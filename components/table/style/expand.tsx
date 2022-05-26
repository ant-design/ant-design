import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { operationUnit } from '../../_util/theme';
import type { TableToken } from './index';

const genExpandStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls, Checkbox: { checkboxSize } = { checkboxSize: 0 } } = token;
  const expandIconSize =
    Math.ceil((token.fontSizeSM * 1.4 - token.controlLineWidth * 3) / 2) * 2 +
    token.controlLineWidth * 3;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-expand-icon-col`]: {
        width: '48px',
      },

      [`${componentCls}-row-expand-icon-cell`]: {
        textAlign: 'center',
      },

      [`${componentCls}-row-indent`]: {
        float: 'left',
        height: '1px',
      },

      [`${componentCls}-row-expand-icon`]: {
        ...operationUnit(token),
        position: 'relative',
        display: 'inline-flex',
        float: 'left',
        boxSizing: 'border-box',
        width: expandIconSize,
        height: expandIconSize,
        padding: '0',
        color: 'inherit',
        lineHeight: `${expandIconSize}px`,
        background: token.tableExpandIconBg,
        border: tableBorder,
        borderRadius: token.radiusBase,
        outline: 'none',
        transform: `scale(${checkboxSize / expandIconSize})`,
        transition: 'all 0.3s',
        userSelect: 'none',
      },
    },
  };
};

export default genExpandStyle;
