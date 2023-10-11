// Style as confirm component
import { prepareComponentToken, prepareToken, type ModalToken } from '.';
import { clearFix } from '../../style';
import { genSubStyleComponent, type GenerateStyle } from '../../theme/internal';

// ============================= Confirm ==============================

const genModalConfirmStyle: GenerateStyle<ModalToken> = (token) => {
  const {
    componentCls,
    titleFontSize,
    titleLineHeight,
    modalConfirmIconSize,
    fontSize,
    lineHeight,
  } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  const titleHeight = Math.round(titleFontSize * titleLineHeight);
  const contentHeight = Math.round(fontSize * lineHeight);

  return {
    [confirmComponentCls]: {
      '&-rtl': {
        direction: 'rtl',
      },
      [`${token.antCls}-modal-header`]: {
        display: 'none',
      },
      [`${confirmComponentCls}-body-wrapper`]: {
        ...clearFix(),
      },

      // ====================== Body ======================
      [`${confirmComponentCls}-body`]: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',

        [`> ${token.iconCls}`]: {
          flex: 'none',
          fontSize: modalConfirmIconSize,
          marginInlineEnd: token.marginSM,
          marginTop: (contentHeight - modalConfirmIconSize) / 2,
        },
        [`&-has-title > ${token.iconCls}`]: {
          marginTop: (titleHeight - modalConfirmIconSize) / 2,
        },
      },

      [`${confirmComponentCls}-paragraph`]: {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
        rowGap: token.marginXS,
        maxWidth: `calc(100% - ${token.modalConfirmIconSize + token.marginSM}px)`,
      },

      [`${confirmComponentCls}-title`]: {
        color: token.colorTextHeading,
        fontWeight: token.fontWeightStrong,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight,
      },

      [`${confirmComponentCls}-content`]: {
        color: token.colorText,
        fontSize,
        lineHeight,
      },

      // ===================== Footer =====================
      [`${confirmComponentCls}-btns`]: {
        textAlign: 'end',
        marginTop: token.marginSM,

        [`${token.antCls}-btn + ${token.antCls}-btn`]: {
          marginBottom: 0,
          marginInlineStart: token.marginXS,
        },
      },
    },

    [`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorError,
    },

    [`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorWarning,
    },

    [`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorInfo,
    },

    [`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorSuccess,
    },
  };
};

// ============================== Export ==============================
export default genSubStyleComponent(
  ['Modal', 'confirm'],
  (token) => {
    const modalToken = prepareToken(token);

    return [genModalConfirmStyle(modalToken)];
  },
  prepareComponentToken,
  {
    // confirm is weak than modal since no conflict here
    order: -1000,
  },
);
