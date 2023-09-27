import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { SelectToken } from '.';
import { resetIcon } from '../../style';
import { mergeToken } from '../../theme/internal';

const FIXED_ITEM_MARGIN = 2;

const getSelectItemStyle = ({
  multipleSelectItemHeight,
  selectHeight,
  lineWidth: borderWidth,
}: SelectToken): readonly [number, number] => {
  const selectItemDist = (selectHeight - multipleSelectItemHeight) / 2 - borderWidth;
  const selectItemMargin = Math.ceil(selectItemDist / 2);
  return [selectItemDist, selectItemMargin] as const;
};

function genSizeStyle(token: SelectToken, suffix?: string): CSSObject {
  const { componentCls, iconCls } = token;

  const selectOverflowPrefixCls = `${componentCls}-selection-overflow`;

  const selectItemHeight = token.multipleSelectItemHeight;
  const [selectItemDist] = getSelectItemStyle(token);

  const suffixCls = suffix ? `${componentCls}-${suffix}` : '';

  return {
    [`${componentCls}-multiple${suffixCls}`]: {
      fontSize: token.fontSize,

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
          maxWidth: '100%',
          display: 'inline-flex',
        },
      },

      // ========================= Selector =========================
      [`${componentCls}-selector`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: '100%',
        // Multiple is little different that horizontal is follow the vertical
        padding: `${selectItemDist - FIXED_ITEM_MARGIN}px ${FIXED_ITEM_MARGIN * 2}px`,
        borderRadius: token.borderRadius,

        [`${componentCls}-show-search&`]: {
          cursor: 'text',
        },

        [`${componentCls}-disabled&`]: {
          background: token.multipleSelectorBgDisabled,
          cursor: 'not-allowed',
        },

        '&:after': {
          display: 'inline-block',
          width: 0,
          margin: `${FIXED_ITEM_MARGIN}px 0`,
          lineHeight: `${selectItemHeight}px`,
          visibility: 'hidden',
          content: '"\\a0"',
        },
      },

      [`
        &${componentCls}-show-arrow ${componentCls}-selector,
        &${componentCls}-allow-clear ${componentCls}-selector
      `]: {
        paddingInlineEnd: token.fontSizeIcon + token.controlPaddingHorizontal,
      },

      // ======================== Selections ========================
      [`${componentCls}-selection-item`]: {
        display: 'flex',
        alignSelf: 'center',
        flex: 'none',
        boxSizing: 'border-box',
        maxWidth: '100%',
        height: selectItemHeight,
        marginTop: FIXED_ITEM_MARGIN,
        marginBottom: FIXED_ITEM_MARGIN,
        lineHeight: `${selectItemHeight - token.lineWidth * 2}px`,
        background: token.multipleItemBg,
        border: `${token.lineWidth}px ${token.lineType} ${token.multipleItemBorderColor}`,
        borderRadius: token.borderRadiusSM,
        cursor: 'default',
        transition: `font-size ${token.motionDurationSlow}, line-height ${token.motionDurationSlow}, height ${token.motionDurationSlow}`,
        marginInlineEnd: FIXED_ITEM_MARGIN * 2,
        paddingInlineStart: token.paddingXS,
        paddingInlineEnd: token.paddingXS / 2,

        [`${componentCls}-disabled&`]: {
          color: token.multipleItemColorDisabled,
          borderColor: token.multipleItemBorderColorDisabled,
          cursor: 'not-allowed',
        },

        // It's ok not to do this, but 24px makes bottom narrow in view should adjust
        '&-content': {
          display: 'inline-block',
          marginInlineEnd: token.paddingXS / 2,
          overflow: 'hidden',
          whiteSpace: 'pre', // fix whitespace wrapping. custom tags display all whitespace within.
          textOverflow: 'ellipsis',
        },

        '&-remove': {
          ...resetIcon(),

          display: 'inline-flex',
          alignItems: 'center',
          color: token.colorIcon,
          fontWeight: 'bold',
          fontSize: 10,
          lineHeight: 'inherit',
          cursor: 'pointer',

          [`> ${iconCls}`]: {
            verticalAlign: '-0.2em',
          },

          '&:hover': {
            color: token.colorIconHover,
          },
        },
      },

      // ========================== Input ==========================
      [`${selectOverflowPrefixCls}-item + ${selectOverflowPrefixCls}-item`]: {
        [`${componentCls}-selection-search`]: {
          marginInlineStart: 0,
        },
      },

      // https://github.com/ant-design/ant-design/issues/44754
      [`${selectOverflowPrefixCls}-item-suffix`]: {
        height: '100%',
      },

      [`${componentCls}-selection-search`]: {
        display: 'inline-flex',
        position: 'relative',
        maxWidth: '100%',
        marginInlineStart: token.inputPaddingHorizontalBase - selectItemDist,

        [`
          &-input,
          &-mirror
        `]: {
          height: selectItemHeight,
          fontFamily: token.fontFamily,
          lineHeight: `${selectItemHeight}px`,
          transition: `all ${token.motionDurationSlow}`,
        },

        '&-input': {
          width: '100%',
          minWidth: 4.1, // fix search cursor missing
        },

        '&-mirror': {
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          insetInlineEnd: 'auto',
          zIndex: 999,
          whiteSpace: 'pre', // fix whitespace wrapping caused width calculation bug
          visibility: 'hidden',
        },
      },

      // ======================= Placeholder =======================
      [`${componentCls}-selection-placeholder`]: {
        position: 'absolute',
        top: '50%',
        insetInlineStart: token.inputPaddingHorizontalBase,
        insetInlineEnd: token.inputPaddingHorizontalBase,
        transform: 'translateY(-50%)',
        transition: `all ${token.motionDurationSlow}`,
      },
    },
  };
}

const genMultipleStyle = (token: SelectToken): CSSInterpolation => {
  const { componentCls } = token;

  const smallToken = mergeToken<SelectToken>(token, {
    selectHeight: token.controlHeightSM,
    multipleSelectItemHeight: token.controlHeightXS,
    borderRadius: token.borderRadiusSM,
    borderRadiusSM: token.borderRadiusXS,
  });

  const largeToken = mergeToken<SelectToken>(token, {
    fontSize: token.fontSizeLG,
    selectHeight: token.controlHeightLG,
    multipleSelectItemHeight: token.multipleItemHeightLG,
    borderRadius: token.borderRadiusLG,
    borderRadiusSM: token.borderRadius,
  });

  const [, smSelectItemMargin] = getSelectItemStyle(token);

  return [
    genSizeStyle(token),
    // ======================== Small ========================
    genSizeStyle(smallToken, 'sm'),

    // Padding
    {
      [`${componentCls}-multiple${componentCls}-sm`]: {
        [`${componentCls}-selection-placeholder`]: {
          insetInline: token.controlPaddingHorizontalSM - token.lineWidth,
        },

        // https://github.com/ant-design/ant-design/issues/29559
        [`${componentCls}-selection-search`]: {
          marginInlineStart: smSelectItemMargin,
        },
      },
    },

    // ======================== Large ========================
    genSizeStyle(largeToken, 'lg'),
  ];
};

export default genMultipleStyle;
