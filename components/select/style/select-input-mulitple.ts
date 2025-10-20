import { resetIcon, textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/interface';
import type { SelectToken } from './token';

const FIXED_INPUT_MIN_WIDTH = 4;

const genSelectInputMultipleStyle: GenerateStyle<SelectToken> = (token) => {
  const {
    componentCls,
    calc,
    iconCls,
    paddingXS,
    paddingXXS,
    INTERNAL_FIXED_ITEM_MARGIN,
    lineWidth,
    colorIcon,
    colorIconHover,
    inputPaddingHorizontalBase,
  } = token;

  return {
    '&-multiple': {
      '--select-multi-item-background': token.multipleItemBg,
      '--select-multi-item-border-color': 'transparent',
      '--select-multi-item-border-radius': token.borderRadiusSM,
      '--select-multi-item-height': token.multipleItemHeight,
      '--select-multi-padding-base': `calc((var(--select-height) - var(--select-multi-item-height)) / 2)`,
      '--select-multi-padding-vertical': `calc(var(--select-multi-padding-base) - ${INTERNAL_FIXED_ITEM_MARGIN} - ${lineWidth})`,
      '--select-multi-item-padding-horizontal': `calc(${inputPaddingHorizontalBase} - var(--select-multi-padding-vertical) - ${lineWidth} * 2)`,

      // ========================================================
      // ==                        Base                        ==
      // ========================================================
      // ========================= Root =========================
      paddingBlock: `var(--select-multi-padding-vertical)`,
      paddingInlineStart: `calc(var(--select-multi-padding-base) - ${lineWidth})`,

      // ======================== Prefix ========================
      [`${componentCls}-prefix`]: {
        marginInlineStart: 'var(--select-multi-item-padding-horizontal)',
      },

      [`${componentCls}-prefix + ${componentCls}-content`]: {
        [`${componentCls}-placeholder`]: {
          insetInlineStart: 0,
        },
        [`${componentCls}-content-item${componentCls}-content-item-suffix`]: {
          marginInlineStart: 0,
        },
      },

      // ===================== Placeholder ======================
      [`${componentCls}-placeholder`]: {
        position: 'absolute',
        lineHeight: 'var(--select-line-height)',

        insetInlineStart: 'var(--select-multi-item-padding-horizontal)',
        width: 'calc(100% - var(--select-multi-item-padding-horizontal))',
        top: '50%',
        transform: 'translateY(-50%)',
      },

      // ======================= Content ========================
      [`${componentCls}-content`]: {
        flexWrap: 'wrap',
        alignItems: 'center',
        lineHeight: 1,

        '&-item-prefix': {
          height: 'var(--select-font-size)',
        },

        '&-item': {
          lineHeight: 1,
          maxWidth: `calc(100% - ${FIXED_INPUT_MIN_WIDTH}px)`,
        },

        [`${componentCls}-content-item-prefix + ${componentCls}-content-item-suffix,
          ${componentCls}-content-item-suffix:first-child`]: {
          marginInlineStart: 'var(--select-multi-item-padding-horizontal)',
        },

        [`${componentCls}-selection-item`]: {
          lineHeight: `calc(var(--select-multi-item-height) - ${lineWidth} * 2)`,
          border: `${lineWidth} solid var(--select-multi-item-border-color)`,
          display: 'flex',
          marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
          marginInlineEnd: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
          background: `var(--select-multi-item-background)`,
          borderRadius: `var(--select-multi-item-border-radius)`,
          paddingInlineStart: paddingXS,
          paddingInlineEnd: paddingXXS,
          transition: ['height', 'line-height', 'padding']
            .map((key) => `${key} ${token.motionDurationSlow}`)
            .join(','),

          // >>> Content
          '&-content': {
            ...textEllipsis,
            marginInlineEnd: paddingXXS,
          },

          // >>> Remove
          '&-remove': {
            ...resetIcon(),

            display: 'inline-flex',
            alignItems: 'center',
            color: colorIcon,
            fontWeight: 'bold',
            fontSize: 10,
            lineHeight: 'inherit',
            cursor: 'pointer',

            [`> ${iconCls}`]: {
              verticalAlign: '-0.2em',
            },

            '&:hover': {
              color: colorIconHover,
            },
          },
        },

        [`${componentCls}-input`]: {
          lineHeight: calc(INTERNAL_FIXED_ITEM_MARGIN)
            .mul(2)
            .add('var(--select-multi-item-height)')
            .equal(),
          width: 'calc(var(--select-input-width, 0) * 1px)',
          minWidth: FIXED_INPUT_MIN_WIDTH,
          maxWidth: '100%',
          transition: `line-height ${token.motionDurationSlow}`,
        },
      },

      // ========================================================
      // ==                        Size                        ==
      // ========================================================
      [`&${componentCls}-sm`]: {
        '--select-multi-item-height': token.multipleItemHeightSM,
        '--select-multi-item-border-radius': token.borderRadiusXS,
      },

      [`&${componentCls}-lg`]: {
        '--select-multi-item-height': token.multipleItemHeightLG,
        '--select-multi-item-border-radius': token.borderRadius,
      },

      // ========================================================
      // ==                      Variants                      ==
      // ========================================================
      [`&${componentCls}-filled`]: {
        '--select-multi-item-border-color': token.colorSplit,
        '--select-multi-item-background': token.colorBgContainer,

        [`&${componentCls}-disabled`]: {
          '--select-multi-item-border-color': 'transparent',
        },
      },
    },
  };
};

export default genSelectInputMultipleStyle;
