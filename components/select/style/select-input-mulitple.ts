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
      '--select-multi-item-height': token.multipleItemHeight,
      '--select-multi-padding-base': `calc((var(--select-height) - var(--select-multi-item-height)) / 2)`,
      '--select-multi-padding-vertical': `calc(var(--select-multi-padding-base) - ${INTERNAL_FIXED_ITEM_MARGIN} - ${lineWidth})`,
      '--select-multi-item-padding-horizontal': `calc(${inputPaddingHorizontalBase} - var(--select-multi-padding-vertical) - ${lineWidth} * 2)`,

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

        insetInlineStart: 'var(--select-multi-item-padding-horizontal)',
        top: '50%',
        transform: 'translateY(-50%)',
      },

      // ======================= Content ========================
      [`${componentCls}-content`]: {
        flexWrap: 'wrap',
        alignItems: 'center',

        '&-item-prefix': {
          height: 'var(--select-multi-item-height)',
        },

        '&-item': {
          maxWidth: `calc(100% - ${FIXED_INPUT_MIN_WIDTH}px)`,
        },

        [`${componentCls}-content-item-prefix + ${componentCls}-content-item-suffix,
          ${componentCls}-content-item-suffix:first-child`]: {
          marginInlineStart: 'var(--select-multi-item-padding-horizontal)',
        },

        [`${componentCls}-selection-item`]: {
          lineHeight: `calc(var(--select-multi-item-height) - ${lineWidth} * 2)`,
          border: `${lineWidth} solid transparent`,
          display: 'flex',
          marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
          marginInlineEnd: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
          background: token.multipleItemBg,
          borderRadius: token.borderRadiusSM,
          paddingInlineStart: paddingXS,
          paddingInlineEnd: paddingXXS,

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
        },
      },
    },
  };
};

export default genSelectInputMultipleStyle;
