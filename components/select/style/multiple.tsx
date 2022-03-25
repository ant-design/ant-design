import { CSSObject, CSSInterpolation } from '@ant-design/cssinjs';
import type { SelectToken } from '.';
import { resetIcon } from '../../_util/theme';

const FIXED_ITEM_MARGIN = 2;

function getSelectItemStyle({
  controlHeightSM,
  controlHeight,
  controlLineWidth: borderWidth,
}: SelectToken) {
  const selectItemDist = (controlHeight - controlHeightSM) / 2 - borderWidth;
  const selectItemMargin = Math.ceil(selectItemDist / 2);
  return [selectItemDist, selectItemMargin];
}

function genSizeStyle(token: SelectToken, suffix?: string): CSSObject {
  const { selectCls, iconPrefixCls } = token;

  const selectOverflowPrefixCls = `${selectCls}-selection-overflow`;

  const selectItemHeight = token.controlHeightSM;
  const [selectItemDist] = getSelectItemStyle(token);

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
          display: 'inline-flex',
        },
      },

      // ========================= Selector =========================
      [`${selectCls}-selector`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        // Multiple is little different that horizontal is follow the vertical
        padding: `${selectItemDist - FIXED_ITEM_MARGIN}px ${FIXED_ITEM_MARGIN * 2}px`,

        [`${selectCls}-show-search&`]: {
          cursor: 'text',
        },

        [`${selectCls}-disabled&`]: {
          background: token.colorBgComponentDisabled,
          cursor: 'not-allowed',
        },

        '&:after': {
          display: 'inline-block',
          width: 0,
          margin: `${FIXED_ITEM_MARGIN}px 0`,
          lineHeight: `${selectItemHeight}px`,
          content: '"\\a0"',
        },
      },

      [`
        &${selectCls}-show-arrow ${selectCls}-selector,
        &${selectCls}-allow-clear ${selectCls}-selector
      `]: {
        paddingInlineEnd: token.fontSizeSM + token.controlPaddingHorizontal,
      },

      // ======================== Selections ========================
      [`${selectCls}-selection-item`]: {
        position: 'relative',
        display: 'flex',
        flex: 'none',
        boxSizing: 'border-box',
        maxWidth: '100%',
        height: selectItemHeight,
        marginTop: FIXED_ITEM_MARGIN,
        marginBottom: FIXED_ITEM_MARGIN,
        lineHeight: `${selectItemHeight - token.controlLineWidth * 2}px`,
        background: token.colorBgContainer,
        border: `${token.controlLineWidth}px solid ${token.colorSplit}`,
        borderRadius: token.controlRadius,
        cursor: 'default',
        transition: `font-size ${token.motionDurationSlow}, line-height ${token.motionDurationSlow}, height ${token.motionDurationSlow}`,
        userSelect: 'none',
        marginInlineEnd: FIXED_ITEM_MARGIN * 2,
        paddingInlineStart: token.paddingXS,
        paddingInlineEnd: token.paddingXS / 2,

        [`${selectCls}-disabled&`]: {
          color: token.colorTextDisabled,
          borderColor: token.colorBorder,
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

          display: 'inline-block',
          color: token.colorAction,
          fontWeight: 'bold',
          fontSize: 10,
          lineHeight: 'inherit',
          cursor: 'pointer',

          [`> .${iconPrefixCls}`]: {
            verticalAlign: '-0.2em',
          },

          '&:hover': {
            color: token.colorActionHover,
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
      [`${selectCls}-selection-placeholder `]: {
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

export default function genMultipleStyle(token: SelectToken): CSSInterpolation {
  const { selectCls } = token;

  const smallToken: SelectToken = {
    ...token,
    controlHeight: token.controlHeightSM,
    controlHeightSM: token.controlHeightXS,
  };
  const [, smSelectItemMargin] = getSelectItemStyle(token);

  return [
    genSizeStyle(token),
    // ======================== Small ========================
    // Shared
    genSizeStyle(smallToken, 'sm'),

    // Padding
    {
      [`${selectCls}-multiple${selectCls}-sm`]: {
        [`${selectCls}-selection-placeholder`]: {
          insetInlineStart: token.controlPaddingHorizontalSM - token.controlLineWidth,
          insetInlineEnd: 'auto',
        },

        // https://github.com/ant-design/ant-design/issues/29559
        [`${selectCls}-selection-search`]: {
          marginInlineStart: smSelectItemMargin,
        },
      },
    },

    // ======================== Large ========================
    // Shared
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
