import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';
import { operationUnit } from '../../style';

const genExpandStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    componentCls,
    antCls,
    controlInteractiveSize: checkboxSize,
    motionDurationSlow,
    lineWidth,
    paddingXS,
    lineType,
    tableBorderColor,
    tableExpandIconBg,
    tableExpandColumnWidth,
    borderRadius,
    fontSize,
    fontSizeSM,
    lineHeight,
    tablePaddingVertical,
    tablePaddingHorizontal,
    tableExpandedRowBg,
    paddingXXS,
  } = token;
  const halfInnerSize = checkboxSize / 2 - lineWidth;
  // must be odd number, unless it cannot align center
  const expandIconSize = halfInnerSize * 2 + lineWidth * 3;
  const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;
  const expandIconLineOffset = paddingXXS - lineWidth;

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-expand-icon-col`]: {
        width: tableExpandColumnWidth,
      },

      [`${componentCls}-row-expand-icon-cell`]: {
        textAlign: 'center',

        [`${componentCls}-row-expand-icon`]: {
          display: 'inline-flex',
          float: 'none',
          verticalAlign: 'sub',
        },
      },

      [`${componentCls}-row-indent`]: {
        height: 1,
        float: 'left',
      },

      [`${componentCls}-row-expand-icon`]: {
        ...operationUnit(token),
        position: 'relative',
        float: 'left',
        boxSizing: 'border-box',
        width: expandIconSize,
        height: expandIconSize,
        padding: 0,
        color: 'inherit',
        lineHeight: `${expandIconSize}px`,
        background: tableExpandIconBg,
        border: tableBorder,
        borderRadius,
        transform: `scale(${checkboxSize / expandIconSize})`,
        transition: `all ${motionDurationSlow}`,
        userSelect: 'none',

        [`&:focus, &:hover, &:active`]: {
          borderColor: 'currentcolor',
        },

        [`&::before, &::after`]: {
          position: 'absolute',
          background: 'currentcolor',
          transition: `transform ${motionDurationSlow} ease-out`,
          content: '""',
        },

        '&::before': {
          top: halfInnerSize,
          insetInlineEnd: expandIconLineOffset,
          insetInlineStart: expandIconLineOffset,
          height: lineWidth,
        },

        '&::after': {
          top: expandIconLineOffset,
          bottom: expandIconLineOffset,
          insetInlineStart: halfInnerSize,
          width: lineWidth,
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
          border: 0,
          visibility: 'hidden',
        },
      },

      [`${componentCls}-row-indent + ${componentCls}-row-expand-icon`]: {
        marginTop:
          (fontSize * lineHeight - lineWidth * 3) / 2 -
          Math.ceil((fontSizeSM * 1.4 - lineWidth * 3) / 2),
        marginInlineEnd: paddingXS,
      },

      [`tr${componentCls}-expanded-row`]: {
        '&, &:hover': {
          [`> th, > td`]: {
            background: tableExpandedRowBg,
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
        margin: `-${tablePaddingVertical}px -${tablePaddingHorizontal}px`,
        padding: `${tablePaddingVertical}px ${tablePaddingHorizontal}px`,
      },
    },
  };
};

export default genExpandStyle;
