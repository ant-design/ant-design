import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { operationUnit } from '../../_util/theme';
import type { TableToken } from './index';

const genExpandStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls, antCls } = token;
  // FIXME: 需要从 checkbox 那里取
  const checkboxSize = token.fontSizeLG;
  const halfInnerSize = Math.ceil((token.fontSizeSM * 1.4 - token.controlLineWidth * 3) / 2);
  const expandIconSize = halfInnerSize * 2 + token.controlLineWidth * 3;
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

        [`&:focus, &:hover, &:active`]: {
          borderColor: 'currentcolor',
        },

        [`&::before, &::after`]: {
          position: 'absolute',
          background: 'currentcolor',
          transition: 'transform 0.3s ease-out',
          content: '""',
        },

        '&::before': {
          top: halfInnerSize,
          right: '3px',
          left: '3px',
          height: token.controlLineWidth,
        },

        '&::after': {
          top: '3px',
          bottom: '3px',
          left: halfInnerSize,
          width: token.controlLineWidth,
          transform: 'rotate(90deg)',
        },

        // Motion effect
        '&-collapsed::before': {
          transform: 'rotate(-180deg)',
        },

        '&-collapsed::after': {
          transform: 'rotate(0deg)',
        },

        '&-spaced': {
          '&::before, &::after': {
            display: 'none',
            content: 'none',
          },
          background: 'transparent',
          border: '0',
          visibility: 'hidden',
        },

        [`${componentCls}-row-indent + &`]: {
          marginTop:
            (token.fontSizeBase * token.lineHeight - token.controlLineWidth * 3) / 2 -
            halfInnerSize,
          marginRight: token.paddingXS,
        },
      },

      [`tr${componentCls}-expanded-row`]: {
        '&, &:hover': {
          '> td': {
            background: '@table-expanded-row-bg',
          },
        },

        // https://github.com/ant-design/ant-design/issues/25573
        [`${antCls}-descriptions-view`]: {
          display: 'flex',

          table: {
            flex: 'auto',
            width: 'auto',
          },
        },
      },

      // With fixed
      [`${componentCls}-expanded-row-fixed`]: {
        position: 'relative',
        margin: `-${token.tablePaddingVertical}px -${token.tablePaddingHorizontal}px`,
        padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
      },
    },
  };
};

export default genExpandStyle;
