import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
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
  const {
    componentCls,
    tailColor,
    fontHeight,
    dotSize,
    dotBg,
    dotBorderWidth,
    fontSize,
    lineHeight,
    colorText,
    tailWidth,
    colorPrimary,
    colorError,
    colorSuccess,
    colorTextDisabled,
    antCls,
  } = token;

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

  return {
    [componentCls]: [
      // ==============================================================
      // ==                           Item                           ==
      // ==============================================================
      {
        ...resetComponent(token),

        [itemCls]: {
          [varName('title-horizontal-title-height')]: fontHeight,
          [varName('vertical-rail-margin')]: '0px',
          [varName('title-horizontal-rail-gap')]: '0px',

          // Root Level: Record Steps icon size and support fallback
          [varName('icon-dot-size-origin')]: varRef('icon-size-active'),
          [varName('icon-dot-size-custom')]: dotSize,

          // Item Level: Record Steps icon color and support fallback
          [varName('item-icon-dot-bg-color-origin')]: varRef('item-icon-dot-bg-color'),
          [varName('item-icon-dot-bg-color-custom')]: dotBg,

          [varName('icon-size')]: varRef('icon-dot-size-custom', varRef('icon-dot-size-origin')),

          // Icon
          [`${itemCls}-icon`]: {
            [varName('dot-icon-border-width')]: dotBorderWidth,
            [varName('dot-icon-size')]: varRef('icon-size'),
            [varName('item-icon-dot-bg-color')]: varRef(
              'item-icon-dot-bg-color-custom',
              varRef('item-icon-dot-bg-color-origin'),
            ),
          },

          // Title
          [`${itemCls}-title`]: {
            fontSize,
            lineHeight,
          },

          // Content
          [`${itemCls}-content`]: {
            color: colorText,
          },

          // Rail
          [`${itemCls}-rail`]: {
            [varName('item-solid-line-color')]: tailColor,
            [varName('rail-size')]: tailWidth,
          },
        },
      },

      // ==============================================================
      // ==                          Status                          ==
      // ==============================================================
      {
        [itemCls]: {
          [varName('item-process-rail-line-style')]: 'dotted',
        },

        [`${itemCls}${itemCls}${itemCls}-color`]: {
          '&-blue': {
            [varName('item-icon-dot-color')]: colorPrimary,
          },

          '&-red': {
            [varName('item-icon-dot-color')]: colorError,
          },

          '&-green': {
            [varName('item-icon-dot-color')]: colorSuccess,
          },

          '&-gray': {
            [varName('item-icon-dot-color')]: colorTextDisabled,
          },
        },
      },
    ],
  };
};

const genVerticalStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { calc, componentCls, itemPaddingBottom, margin, antCls } = token;
  const itemCls = `${componentCls}-item`;
  const [, stepsVarRef] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

  const [timelineVarName, timelineVarRef] = genCssVar(antCls, 'timeline');

  return {
    [`${componentCls}:not(${componentCls}-horizontal)`]: {
      [timelineVarName('head-span')]: '12',
      [timelineVarName('head-span-ptg')]: `calc(${timelineVarRef('head-span')} / 24 * 100%)`,

      // =============================================================
      // ==                        Alternate                        ==
      // =============================================================
      [`&${componentCls}-layout-alternate`]: {
        [itemCls]: {
          [timelineVarName('alternate-gap')]: calc(margin)
            .mul(2)
            .add(stepsVarRef('dot-icon-size'))
            .equal(),

          minHeight: 'auto',
          paddingBottom: itemPaddingBottom,

          // Icon & Rail
          [`${itemCls}-icon, ${itemCls}-rail`]: {
            position: 'absolute',
            insetInlineStart: timelineVarRef('head-span-ptg'),
          },

          // Icon
          [`${itemCls}-icon`]: {
            marginInlineStart: `calc(${stepsVarRef('icon-size')} / -2)`,
          },

          // Section
          [`${itemCls}-section`]: {
            display: 'flex',
            flexWrap: 'nowrap',
            gap: timelineVarRef('alternate-gap'),
          },

          // >>> Header
          [`${itemCls}-header`]: {
            textAlign: 'end',
            flexDirection: 'column',
            alignItems: 'stretch',
            flex: `1 1 calc(${timelineVarRef('head-span-ptg')} - ${timelineVarRef('alternate-gap')} / 2)`,
          },

          // >>> Content
          [`${itemCls}-content`]: {
            textAlign: 'start',
            flex: `1 1 calc(100% - ${timelineVarRef('head-span-ptg')} - ${timelineVarRef('alternate-gap')} / 2)`,
          },

          // Placement
          '&-placement-end': {
            [`${itemCls}-header`]: {
              textAlign: 'start',
              order: 1,
            },

            [`${itemCls}-content`]: {
              textAlign: 'end',
            },

            [`${itemCls}-icon, ${itemCls}-rail`]: {
              insetInlineStart: `calc(100% - ${timelineVarRef('head-span-ptg')})`,
            },
          },
        },
      },

      // =============================================================
      // ==                        Same Side                        ==
      // =============================================================
      [`&:not(${componentCls}-layout-alternate)`]: {
        [`${itemCls}-placement-end`]: {
          textAlign: 'end',

          [`${itemCls}-icon`]: {
            order: 1,
          },

          [`${itemCls}-rail`]: {
            insetInlineStart: 'auto',
            insetInlineEnd: `calc(${stepsVarRef('icon-size')} / 2)`,
            marginInlineEnd: `calc(${stepsVarRef('rail-size')} / -2)`,
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
