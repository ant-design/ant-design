import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 轨迹颜色
   * @descEN Line color
   */
  tailColor: string;
  /**
   * @desc 轨迹宽度
   * @descEN Line width
   */
  tailWidth: number;
  /**
   * @desc 节点边框宽度
   * @descEN Border width of node
   */
  dotBorderWidth: number;
  /**
   * @desc 节点背景色
   * @descEN Background color of node
   */
  dotBg: string;
  /**
   * @desc 时间项下间距
   * @descEN Bottom padding of item
   */
  itemPaddingBottom: number;
}

interface TimelineToken extends FullToken<'Timeline'> {
  itemHeadSize: number;
  customHeadPaddingVertical: number;
  paddingInlineEnd: number;
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
        paddingBottom: token.itemPaddingBottom,
        fontSize: token.fontSize,
        listStyle: 'none',

        '&-tail': {
          position: 'absolute',
          insetBlockStart: token.itemHeadSize,
          insetInlineStart: (token.itemHeadSize - token.tailWidth) / 2,
          height: `calc(100% - ${token.itemHeadSize}px)`,
          borderInlineStart: `${token.tailWidth}px ${token.lineType} ${token.tailColor}`,
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
          width: token.itemHeadSize,
          height: token.itemHeadSize,
          backgroundColor: token.dotBg,
          border: `${token.dotBorderWidth}px ${token.lineType} transparent`,
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
          insetBlockStart: token.itemHeadSize / 2,
          insetInlineStart: token.itemHeadSize / 2,
          width: 'auto',
          height: 'auto',
          marginBlockStart: 0,
          paddingBlock: token.customHeadPaddingVertical,
          lineHeight: 1,
          textAlign: 'center',
          border: 0,
          borderRadius: 0,
          transform: `translate(-50%, -50%)`,
        },

        '&-content': {
          position: 'relative',
          insetBlockStart: -(token.fontSize * token.lineHeight - token.fontSize) + token.lineWidth,
          marginInlineStart: token.margin + token.itemHeadSize,
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
              marginInlineStart: token.tailWidth / 2,
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
            insetInlineStart: `calc(100% - ${(token.itemHeadSize + token.tailWidth) / 2}px)`,
          },

          [`${componentCls}-item-content`]: {
            width: `calc(100% - ${token.itemHeadSize + token.marginXS}px)`,
          },
        },
      },

      [`&${componentCls}-pending
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: 'block',
        height: `calc(100% - ${token.margin}px)`,
        borderInlineStart: `${token.tailWidth}px dotted ${token.tailColor}`,
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
          borderInlineStart: `${token.tailWidth}px dotted ${token.tailColor}`,
        },

        [`${componentCls}-item-content`]: {
          minHeight: token.controlHeightLG * 1.2,
        },
      },

      [`&${componentCls}-label`]: {
        [`${componentCls}-item-label`]: {
          position: 'absolute',
          insetBlockStart: -(token.fontSize * token.lineHeight - token.fontSize) + token.tailWidth,
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
export default genComponentStyleHook(
  'Timeline',
  (token) => {
    const timeLineToken = mergeToken<TimelineToken>(token, {
      itemHeadSize: 10,
      customHeadPaddingVertical: token.paddingXXS,
      paddingInlineEnd: 2,
    });

    return [genTimelineStyle(timeLineToken)];
  },
  (token) => ({
    tailColor: token.colorSplit,
    tailWidth: token.lineWidthBold,
    dotBorderWidth: token.wireframe ? token.lineWidthBold : token.lineWidth * 3,
    dotBg: token.colorBgContainer,
    itemPaddingBottom: token.padding * 1.25,
  }),
);
