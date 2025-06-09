import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genHorizontalStyle from './horizontal';

export interface ComponentToken {
  /**
   * @desc 轨迹颜色
   * @descEN Line color
   */
  tailColor?: string;
  /**
   * @desc 轨迹宽度
   * @descEN Line width
   */
  tailWidth?: number | string;
  /**
   * @desc 节点边框宽度
   * @descEN Border width of node
   */
  dotBorderWidth?: number | string;
  /**
   * @desc 节点大小
   * @descEN Node size
   */
  dotSize?: number | string;
  /**
   * @desc 节点背景色
   * @descEN Background color of node
   */
  dotBg?: string;
  /**
   * @desc 时间项下间距
   * @descEN Bottom padding of item
   */
  itemPaddingBottom?: number;
}

export interface TimelineToken extends FullToken<'Timeline'> {
  itemHeadSize: number;
  customHeadPaddingVertical: number;
  paddingInlineEnd: number;
}

const genTimelineStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { componentCls, tailColor } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [componentCls]: [
      // ==============================================================
      // ==                           Item                           ==
      // ==============================================================
      {
        ...resetComponent(token),

        [itemCls]: {
          '--steps-title-horizontal-title-height': token.fontHeight,
          '--steps-vertical-rail-margin': '0px',
          '--steps-title-horizontal-rail-gap': '0px',

          // Root Level: Record Steps icon size and support fallback
          '--steps-icon-dot-size-origin': 'var(--steps-icon-size-active)',
          '--steps-icon-dot-size-custom': token.dotSize,

          // Item Level: Record Steps icon color and support fallback
          '--steps-item-icon-dot-bg-color-origin': 'var(--steps-item-icon-dot-bg-color)',
          '--steps-item-icon-dot-bg-color-custom': token.dotBg,

          '--steps-icon-size':
            'var(--steps-icon-dot-size-custom, var(--steps-icon-dot-size-origin))',

          // Icon
          [`${itemCls}-icon`]: {
            '--steps-dot-icon-border-width': token.dotBorderWidth,
            '--steps-dot-icon-size': 'var(--steps-icon-size)',
            '--steps-item-icon-dot-bg-color':
              'var(--steps-item-icon-dot-bg-color-custom, var(--steps-item-icon-dot-bg-color-origin))',
          },

          // Title
          [`${itemCls}-title`]: {
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
          },

          // Content
          [`${itemCls}-content`]: {
            color: token.colorText,
          },

          // Rail
          [`${itemCls}-rail`]: {
            '--steps-item-solid-line-color': tailColor,
            '--steps-rail-size': token.tailWidth,
          },
        },
      },

      // ==============================================================
      // ==                          Status                          ==
      // ==============================================================
      {
        [itemCls]: {
          '--steps-item-process-rail-line-style': 'dotted',
        },

        [`${itemCls}${itemCls}${itemCls}-color`]: {
          '&-blue': {
            '--steps-item-icon-dot-color': token.colorPrimary,
          },

          '&-red': {
            '--steps-item-icon-dot-color': token.colorError,
          },

          '&-green': {
            '--steps-item-icon-dot-color': token.colorSuccess,
          },

          '&-gray': {
            '--steps-item-icon-dot-color': token.colorTextDisabled,
          },
        },
      },
    ],
  };
};

const genVerticalStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { calc, componentCls, itemPaddingBottom } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-vertical`]: {
      // =============================================================
      // ==                        Alternate                        ==
      // =============================================================
      [`&${componentCls}-layout-alternate`]: {
        [itemCls]: {
          minHeight: 'auto',
          paddingBottom: itemPaddingBottom,

          // Icon
          [`${itemCls}-icon`]: {
            position: 'absolute',
          },

          // Icon & Rail
          [`${itemCls}-icon, ${itemCls}-rail`]: {
            position: 'absolute',
            left: {
              _skip_check_: true,
              value: '50%',
            },
            transform: 'translateX(-50%)',
          },

          // Section
          [`${itemCls}-section`]: {
            display: 'flex',
            flexWrap: 'nowrap',
            gap: calc(token.margin).mul(2).add('var(--steps-dot-icon-size)').equal(),
          },

          // >>> Header & Content
          [`${itemCls}-header, ${itemCls}-content`]: {
            flex: '1 1 50%',
          },

          [`${itemCls}-header`]: {
            textAlign: 'end',
            flexDirection: 'column',
            alignItems: 'stretch',
          },

          [`${itemCls}-content`]: {
            textAlign: 'start',
          },

          // Position
          [`&-position-end`]: {
            [`${itemCls}-header`]: {
              textAlign: 'start',
              order: 1,
            },

            [`${itemCls}-content`]: {
              textAlign: 'end',
            },
          },
        },
      },

      // =============================================================
      // ==                        Same Side                        ==
      // =============================================================
      [`&:not(${componentCls}-layout-alternate)`]: {
        [`${itemCls}-position-end`]: {
          textAlign: 'end',

          [`${itemCls}-icon`]: {
            order: 1,
          },

          [`${itemCls}-rail`]: {
            insetInlineStart: 'auto',
            insetInlineEnd: 'calc(var(--steps-icon-size) / 2)',
            transform: 'translateX(50%)',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Timeline'> = (token) => ({
  tailColor: token.colorSplit,
  tailWidth: token.lineWidthBold,
  dotBorderWidth: token.lineWidthBold,
  dotBg: undefined,
  dotSize: undefined,
  itemPaddingBottom: token.padding * 1.25,
});

export default genStyleHooks(
  'Timeline',
  (token) => {
    const timeLineToken = mergeToken<TimelineToken>(token, {
      itemHeadSize: 10,
      customHeadPaddingVertical: token.paddingXXS,
      paddingInlineEnd: 2,
    });

    return [
      genTimelineStyle(timeLineToken),
      genVerticalStyle(timeLineToken),
      genHorizontalStyle(timeLineToken),
    ];
  },
  prepareComponentToken,
);
