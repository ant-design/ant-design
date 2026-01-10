import { resetIcon, textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/interface';
import { genCssVar } from '../../theme/util/genStyleUtils';
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
    antCls,
  } = token;

  const [varName, varRef] = genCssVar(antCls, 'select');

  return {
    '&-multiple': {
      [varName('multi-item-background')]: token.multipleItemBg,
      [varName('multi-item-border-color')]: 'transparent',
      [varName('multi-item-border-radius')]: token.borderRadiusSM,
      [varName('multi-item-height')]: token.multipleItemHeight,
      [varName('multi-padding-base')]:
        `calc((${varRef('height')} - ${varRef('multi-item-height')}) / 2)`,
      [varName('multi-padding-vertical')]:
        `calc(${varRef('multi-padding-base')} - ${INTERNAL_FIXED_ITEM_MARGIN} - ${lineWidth})`,
      [varName('multi-item-padding-horizontal')]:
        `calc(${inputPaddingHorizontalBase} - ${varRef('multi-padding-vertical')} - ${lineWidth} * 2)`,

      // ========================================================
      // ==                        Base                        ==
      // ========================================================
      // ========================= Root =========================
      paddingBlock: varRef('multi-padding-vertical'),
      paddingInlineStart: `calc(${varRef('multi-padding-base')} - ${lineWidth})`,

      // ======================== Prefix ========================
      [`${componentCls}-prefix`]: {
        marginInlineStart: varRef('multi-item-padding-horizontal'),
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
        lineHeight: varRef('line-height'),

        insetInlineStart: varRef('multi-item-padding-horizontal'),
        width: `calc(100% - ${varRef('multi-item-padding-horizontal')})`,
        top: '50%',
        transform: 'translateY(-50%)',
      },

      // ======================= Content ========================
      [`${componentCls}-content`]: {
        flexWrap: 'wrap',
        alignItems: 'center',
        lineHeight: 1,

        '&-item-prefix': {
          height: varRef('font-size'),
        },

        '&-item': {
          lineHeight: 1,
          maxWidth: `calc(100% - ${FIXED_INPUT_MIN_WIDTH}px)`,
        },

        [`${componentCls}-content-item-prefix + ${componentCls}-content-item-suffix,
          ${componentCls}-content-item-suffix:first-child`]: {
          marginInlineStart: varRef('multi-item-padding-horizontal'),
        },

        [`${componentCls}-selection-item`]: {
          lineHeight: `calc(${varRef('multi-item-height')} - ${lineWidth} * 2)`,
          border: `${lineWidth} solid ${varRef('multi-item-border-color')}`,
          display: 'flex',
          marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
          marginInlineEnd: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
          background: varRef('multi-item-background'),
          borderRadius: varRef('multi-item-border-radius'),
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
            .add(varRef('multi-item-height'))
            .equal(),
          // TODO: need change to varRef('input-width')
          width: `calc(var(--select-input-width, 0) * 1px)`,
          minWidth: FIXED_INPUT_MIN_WIDTH,
          maxWidth: '100%',
          transition: `line-height ${token.motionDurationSlow}`,
        },
      },

      // ========================================================
      // ==                        Size                        ==
      // ========================================================
      [`&${componentCls}-sm`]: {
        [varName('multi-item-height')]: token.multipleItemHeightSM,
        [varName('multi-item-border-radius')]: token.borderRadiusXS,
      },

      [`&${componentCls}-lg`]: {
        [varName('multi-item-height')]: token.multipleItemHeightLG,
        [varName('multi-item-border-radius')]: token.borderRadius,
      },

      // ========================================================
      // ==                      Variants                      ==
      // ========================================================
      [`&${componentCls}-filled`]: {
        [varName('multi-item-border-color')]: token.colorSplit,
        [varName('multi-item-background')]: token.colorBgContainer,
        [`&${componentCls}-disabled`]: {
          [varName('multi-item-border-color')]: 'transparent',
        },
      },
    },
  };
};

export default genSelectInputMultipleStyle;
