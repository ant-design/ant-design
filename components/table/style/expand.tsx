import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { operationUnit } from '../../_util/theme';
import type { TableToken } from './index';

const genExpandStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const {
    componentCls,
    antCls,
    controlInteractiveSize: checkboxSize,
    controlLineWidth,
    padding,
    paddingXXS,
  } = token;
  const halfInnerSize = checkboxSize / 2 - controlLineWidth;
  // must be odd number, unless it cannot align centerly
  const expandIconSize = halfInnerSize * 2 + controlLineWidth * 3;
  const tableBorder = `${controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  const expandIconLineOffset = paddingXXS - controlLineWidth;

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-expand-icon-col`]: {
        width: checkboxSize + padding * 2,
      },

      [`${componentCls}-row-expand-icon-cell`]: {
        textAlign: 'center',
      },

      [`${componentCls}-row-indent`]: {
        height: 1,
      },

      [`${componentCls}-row-expand-icon`]: {
        ...operationUnit(token),
        position: 'relative',
        display: 'inline-flex',
        verticalAlign: 'text-top',
        boxSizing: 'border-box',
        width: expandIconSize,
        height: expandIconSize,
        padding: 0,
        color: 'inherit',
        lineHeight: `${expandIconSize}px`,
        background: token.tableExpandIconBg,
        border: tableBorder,
        borderRadius: token.radiusBase,
        outline: 'none',
        transform: `scale(${checkboxSize / expandIconSize})`,
        transition: `all ${token.motionDurationSlow}`,
        userSelect: 'none',

        [`&:focus, &:hover, &:active`]: {
          borderColor: 'currentcolor',
        },

        [`&::before, &::after`]: {
          position: 'absolute',
          background: 'currentcolor',
          transition: `transform ${token.motionDurationSlow} ease-out`,
          content: '""',
        },

        '&::before': {
          top: halfInnerSize,
          insetInlineEnd: expandIconLineOffset,
          insetInlineStart: expandIconLineOffset,
          height: controlLineWidth,
        },

        '&::after': {
          top: expandIconLineOffset,
          bottom: expandIconLineOffset,
          insetInlineStart: halfInnerSize,
          width: controlLineWidth,
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
        marginInlineEnd: token.paddingXS,
      },

      [`tr${componentCls}-expanded-row`]: {
        '&, &:hover': {
          '> td': {
            background: token.tableExpandedRowBg,
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
