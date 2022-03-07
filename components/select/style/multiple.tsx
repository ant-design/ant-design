import { CSSObject, CSSInterpolation } from '@ant-design/cssinjs';
import type { SelectToken } from '.';
import { resetIcon } from '../../_util/theme';

function genSizeStyle(token: SelectToken, suffix?: string): CSSInterpolation {
  const { selectCls, iconPrefixCls } = token;

  const selectOverflowPrefixCls = `${selectCls}-selection-overflow`;

  const selectItemHeight = token.controlHeightSM;
  const selectItemDist = (token.controlHeight - selectItemHeight) / 2 - token.borderWidth;

  const selectItemMargin = Math.ceil(selectItemDist / 2);

  const suffixCls = suffix ? `${selectCls}-${suffix}` : '';

  return {
    [`${selectCls}-multiple${suffixCls}`]: {
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
        },
      },

      // ========================= Selector =========================
      [`${selectCls}-selector`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        // Multiple is little different that horizontal is follow the vertical
        padding: `${selectItemDist - selectItemMargin}px ${selectItemMargin * 2}px`,

        [`${selectCls}-show-search&`]: {
          cursor: 'text',
        },

        [`${selectCls}-disabled&`]: {
          background: token.componentBackgroundDisabled,
          cursor: 'not-allowed',
        },

        '&:after': {
          display: 'inline-block',
          width: 0,
          margin: `${selectItemMargin}px 0`,
          lineHeight: `${selectItemHeight}px`,
          content: '"\\a0"',
        },
      },

      [`
        &${selectCls}-show-arrow ${selectCls}-selector,
        &${selectCls}-allow-clear ${selectCls}-selector
      `]: {
        paddingRight: token.fontSizeSM + token.controlPaddingHorizontal,
      },

      // ======================== Selections ========================
      [`${selectCls}-selection-item`]: {
        position: 'relative',
        display: 'flex',
        flex: 'none',
        boxSizing: 'border-box',
        maxWidth: '100%',
        height: selectItemHeight,
        marginTop: selectItemMargin,
        marginBottom: selectItemMargin,
        lineHeight: `${selectItemHeight - token.borderWidth * 2}px`,
        background: token.background,
        border: `${token.borderWidth}px solid ${token.borderColorSplit}`,
        borderRadius: token.borderRadius,
        cursor: 'default',
        transition: `font-size ${token.duration}, line-height ${token.duration}, height ${token.duration}`,
        userSelect: 'none',
        marginInlineEnd: selectItemMargin * 2,
        paddingInlineStart: token.paddingXS,
        paddingInlineEnd: token.paddingXS / 2,

        [`${selectCls}-disabled&`]: {
          color: token.textColorDisabled,
          borderColor: token.borderColor,
          cursor: 'not-allowed',
        },

        // It's ok not to do this, but 24px makes bottom narrow in view should adjust
        '&-content': {
          display: 'inline-block',
          marginRight: token.paddingXS / 2,
          overflow: 'hidden',
          whiteSpace: 'pre', // fix whitespace wrapping. custom tags display all whitespace within.
          textOverflow: 'ellipsis',
        },

        '&-remove': {
          ...resetIcon(),

          display: 'inline-block',
          color: token.textColorSecondary,
          fontWeight: 'bold',
          fontSize: 10,
          lineHeight: 'inherit',
          cursor: 'pointer',

          [`> .${iconPrefixCls}`]: {
            verticalAlign: '-0.2em',
          },

          '&:hover': {
            color: token.iconColorHover,
          },
        },
      },

      // ========================== Input ==========================
      [`${selectOverflowPrefixCls}-item + ${selectOverflowPrefixCls}-item`]: {
        [`${selectCls}-selection-search`]: {
          marginInlineStart: 0,
        },
      },

      [`${selectCls}-selection-search`]: {
        position: 'relative',
        maxWidth: '100%',
        // FIXME: no sure this style
        marginInlineStart: token.inputPaddingHorizontalBase - selectItemDist,

        [`
          &-input,
          &-mirror
        `]: {
          height: selectItemHeight,
          fontFamily: token.fontFamily,
          lineHeight: `${selectItemHeight}px`,
          transition: `all ${token.duration}`,
        },

        '&-input': {
          width: '100%',
          minWidth: 4.1, // fix search cursor missing
        },

        '&-mirror': {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 999,
          whiteSpace: 'pre', // fix whitespace wrapping caused width calculation bug
          visibility: 'hidden',
        },
      },

      // ======================= Placeholder =======================
      [`${selectCls}-selection-placeholder `]: {
        position: 'absolute',
        top: '50%',
        right: token.inputPaddingHorizontalBase,
        left: token.inputPaddingHorizontalBase,
        transform: 'translateY(-50%)',
        transition: `all ${token.duration}`,
      },
    },
  };
}

export default function genMultipleStyle(token: SelectToken): CSSInterpolation {
  return [
    genSizeStyle(token),
    // ======================== Small ========================
    genSizeStyle(
      {
        ...token,
        controlHeight: token.controlHeightSM,
        controlHeightSM: token.controlHeightXS,
      },
      'sm',
    ),
    // ======================== Large ========================
    genSizeStyle(
      {
        ...token,
        fontSize: token.fontSizeLG,
        controlHeight: token.controlHeightLG,
        controlHeightSM: token.controlHeight,
      },
      'lg',
    ),
  ];
}
