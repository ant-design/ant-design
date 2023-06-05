import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent } from '../../style';

export interface ComponentToken {}

interface TimelineToken extends FullToken<'Timeline'> {
  timeLineItemPaddingBottom: number;
  timeLineItemHeadSize: number;
  timeLineItemCustomHeadPaddingVertical: number;
  timeLineItemTailWidth: number;
  timeLinePaddingInlineEnd: number;
  timeLineHeadBorderWidth: number;
}

const genTimelineStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      margin: 0,
      padding: 0,
      listStyle: 'none',

      [`${componentCls}-item`]: {
        position: 'relative',
        margin: 0,
        paddingBottom: token.timeLineItemPaddingBottom,
        fontSize: token.fontSize,
        listStyle: 'none',

        '&-tail': {
          position: 'absolute',
          insetBlockStart: token.timeLineItemHeadSize,
          insetInlineStart: (token.timeLineItemHeadSize - token.timeLineItemTailWidth) / 2,
          height: `calc(100% - ${token.timeLineItemHeadSize}px)`,
          borderInlineStart: `${token.timeLineItemTailWidth}px ${token.lineType} ${token.colorSplit}`,
        },

        '&-pending': {
          [`${componentCls}-item-head`]: {
            fontSize: token.fontSizeSM,
            backgroundColor: 'transparent',
          },

          [`${componentCls}-item-tail`]: {
            display: 'none',
          },
        },

        '&-head': {
          position: 'absolute',
          width: token.timeLineItemHeadSize,
          height: token.timeLineItemHeadSize,
          backgroundColor: token.colorBgContainer,
          border: `${token.timeLineHeadBorderWidth}px ${token.lineType} transparent`,
          borderRadius: '50%',

          '&-blue': {
            color: token.colorPrimary,
            borderColor: token.colorPrimary,
          },

          '&-red': {
            color: token.colorError,
            borderColor: token.colorError,
          },

          '&-green': {
            color: token.colorSuccess,
            borderColor: token.colorSuccess,
          },

          '&-gray': {
            color: token.colorTextDisabled,
            borderColor: token.colorTextDisabled,
          },
        },

        '&-head-custom': {
          position: 'absolute',
          insetBlockStart: token.timeLineItemHeadSize / 2,
          insetInlineStart: token.timeLineItemHeadSize / 2,
          width: 'auto',
          height: 'auto',
          marginBlockStart: 0,
          paddingBlock: token.timeLineItemCustomHeadPaddingVertical,
          lineHeight: 1,
          textAlign: 'center',
          border: 0,
          borderRadius: 0,
          transform: `translate(-50%, -50%)`,
        },

        '&-content': {
          position: 'relative',
          insetBlockStart: -(token.fontSize * token.lineHeight - token.fontSize) + token.lineWidth,
          marginInlineStart: token.margin + token.timeLineItemHeadSize,
          marginInlineEnd: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
          wordBreak: 'break-word',
        },

        '&-last': {
          [`> ${componentCls}-item-tail`]: {
            display: 'none',
          },

          [`> ${componentCls}-item-content`]: {
            minHeight: token.controlHeightLG * 1.2,
          },
        },
      },

      [`&${componentCls}-alternate,
        &${componentCls}-right,
        &${componentCls}-label`]: {
        [`${componentCls}-item`]: {
          '&-tail, &-head, &-head-custom': {
            insetInlineStart: '50%',
          },

          '&-head': {
            marginInlineStart: `-${token.marginXXS}px`,

            '&-custom': {
              marginInlineStart: token.timeLineItemTailWidth / 2,
            },
          },

          '&-left': {
            [`${componentCls}-item-content`]: {
              insetInlineStart: `calc(50% - ${token.marginXXS}px)`,
              width: `calc(50% - ${token.marginSM}px)`,
              textAlign: 'start',
            },
          },

          '&-right': {
            [`${componentCls}-item-content`]: {
              width: `calc(50% - ${token.marginSM}px)`,
              margin: 0,
              textAlign: 'end',
            },
          },
        },
      },

      [`&${componentCls}-right`]: {
        [`${componentCls}-item-right`]: {
          [`${componentCls}-item-tail,
            ${componentCls}-item-head,
            ${componentCls}-item-head-custom`]: {
            insetInlineStart: `calc(100% - ${
              (token.timeLineItemHeadSize + token.timeLineItemTailWidth) / 2
            }px)`,
          },

          [`${componentCls}-item-content`]: {
            width: `calc(100% - ${token.timeLineItemHeadSize + token.marginXS}px)`,
          },
        },
      },

      [`&${componentCls}-pending
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: 'block',
        height: `calc(100% - ${token.margin}px)`,
        borderInlineStart: `${token.timeLineItemTailWidth}px dotted ${token.colorSplit}`,
      },

      [`&${componentCls}-reverse
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: 'none',
      },

      [`&${componentCls}-reverse ${componentCls}-item-pending`]: {
        [`${componentCls}-item-tail`]: {
          insetBlockStart: token.margin,
          display: 'block',
          height: `calc(100% - ${token.margin}px)`,
          borderInlineStart: `${token.timeLineItemTailWidth}px dotted ${token.colorSplit}`,
        },

        [`${componentCls}-item-content`]: {
          minHeight: token.controlHeightLG * 1.2,
        },
      },

      [`&${componentCls}-label`]: {
        [`${componentCls}-item-label`]: {
          position: 'absolute',
          insetBlockStart:
            -(token.fontSize * token.lineHeight - token.fontSize) + token.timeLineItemTailWidth,
          width: `calc(50% - ${token.marginSM}px)`,
          textAlign: 'end',
        },

        [`${componentCls}-item-right`]: {
          [`${componentCls}-item-label`]: {
            insetInlineStart: `calc(50% + ${token.marginSM}px)`,
            width: `calc(50% - ${token.marginSM}px)`,
            textAlign: 'start',
          },
        },
      },

      // ====================== RTL =======================
      '&-rtl': {
        direction: 'rtl',

        [`${componentCls}-item-head-custom`]: {
          transform: `translate(50%, -50%)`,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Timeline', (token) => {
  const timeLineToken = mergeToken<TimelineToken>(token, {
    timeLineItemPaddingBottom: token.padding * 1.25,
    timeLineItemHeadSize: 10,
    timeLineItemCustomHeadPaddingVertical: token.paddingXXS,
    timeLinePaddingInlineEnd: 2,
    timeLineItemTailWidth: token.lineWidthBold,
    timeLineHeadBorderWidth: token.wireframe ? token.lineWidthBold : token.lineWidth * 3,
  });

  return [genTimelineStyle(timeLineToken)];
});
