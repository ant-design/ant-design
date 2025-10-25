import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { SelectToken } from '../../select/style/token';
import { resetIcon } from '../../style';

/**
 * Get multiple selector needed style. The calculation:
 *
 * ContainerPadding = BasePadding - ItemMargin
 *
 * Border:                    ╔═══════════════════════════╗                 ┬
 * ContainerPadding:          ║                           ║                 │
 *                            ╟───────────────────────────╢     ┬           │
 * Item Margin:               ║                           ║     │           │
 *                            ║             ┌──────────┐  ║     │           │
 * Item(multipleItemHeight):  ║ BasePadding │   Item   │  ║  Overflow  Container(ControlHeight)
 *                            ║             └──────────┘  ║     │           │
 * Item Margin:               ║                           ║     │           │
 *                            ╟───────────────────────────╢     ┴           │
 * ContainerPadding:          ║                           ║                 │
 * Border:                    ╚═══════════════════════════╝                 ┴
 */
export const getMultipleSelectorUnit = (
  token: Pick<
    SelectToken,
    | 'max'
    | 'calc'
    | 'multipleSelectItemHeight'
    | 'paddingXXS'
    | 'lineWidth'
    | 'INTERNAL_FIXED_ITEM_MARGIN'
  >,
) => {
  const { multipleSelectItemHeight, paddingXXS, lineWidth, INTERNAL_FIXED_ITEM_MARGIN } = token;

  const basePadding = token.max(token.calc(paddingXXS).sub(lineWidth).equal(), 0);
  const containerPadding = token.max(
    token.calc(basePadding).sub(INTERNAL_FIXED_ITEM_MARGIN).equal(),
    0,
  );

  return {
    basePadding,
    containerPadding,
    itemHeight: unit(multipleSelectItemHeight),
    itemLineHeight: unit(
      token.calc(multipleSelectItemHeight).sub(token.calc(token.lineWidth).mul(2)).equal(),
    ),
  };
};

/**
 * Get the `rc-overflow` needed style.
 * It's a share style which means not affected by `size`.
 */
export const genOverflowStyle = (
  token: Pick<
    SelectToken,
    | 'calc'
    | 'componentCls'
    | 'iconCls'
    | 'borderRadiusSM'
    | 'motionDurationSlow'
    | 'paddingXS'
    | 'multipleItemColorDisabled'
    | 'multipleItemBorderColorDisabled'
    | 'colorIcon'
    | 'colorIconHover'
    | 'INTERNAL_FIXED_ITEM_MARGIN'
  >,
): CSSObject => {
  const {
    componentCls,
    iconCls,
    borderRadiusSM,
    motionDurationSlow,
    paddingXS,
    multipleItemColorDisabled,
    multipleItemBorderColorDisabled,
    colorIcon,
    colorIconHover,
    INTERNAL_FIXED_ITEM_MARGIN,
  } = token;

  const selectOverflowPrefixCls = `${componentCls}-selection-overflow`;

  return {
    /**
     * Do not merge `height` & `line-height` under style with `selection` & `search`, since chrome
     * may update to redesign with its align logic.
     */
    // =========================== Overflow ===========================
    [selectOverflowPrefixCls]: {
      position: 'relative',
      display: 'flex',
      flex: 'auto',
      flexWrap: 'wrap',
      maxWidth: '100%',

      '&-item': {
        flex: 'none',
        alignSelf: 'center',
        // https://github.com/ant-design/ant-design/issues/54179
        maxWidth: 'calc(100% - 4px)',
        display: 'inline-flex',
      },

      // ======================== Selections ==========================
      [`${componentCls}-selection-item`]: {
        display: 'flex',
        alignSelf: 'center',
        flex: 'none',
        boxSizing: 'border-box',
        maxWidth: '100%',
        marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
        borderRadius: borderRadiusSM,
        cursor: 'default',
        transition: `font-size ${motionDurationSlow}, line-height ${motionDurationSlow}, height ${motionDurationSlow}`,
        marginInlineEnd: token.calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
        paddingInlineStart: paddingXS,
        paddingInlineEnd: token.calc(paddingXS).div(2).equal(),

        [`${componentCls}-disabled&`]: {
          color: multipleItemColorDisabled,
          borderColor: multipleItemBorderColorDisabled,
          cursor: 'not-allowed',
        },

        // It's ok not to do this, but 24px makes bottom narrow in view should adjust
        '&-content': {
          display: 'inline-block',
          marginInlineEnd: token.calc(paddingXS).div(2).equal(),
          overflow: 'hidden',
          whiteSpace: 'pre', // fix whitespace wrapping. custom tags display all whitespace within.
          textOverflow: 'ellipsis',
        },

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
    },
  };
};
