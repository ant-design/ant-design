// Style as confirm component
import { unit } from '@ant-design/cssinjs';
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
    modalTitleHeight,
    modalContentHeight,
  } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

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
          marginTop: token
            .calc(token.calc(modalContentHeight).sub(modalConfirmIconSize).equal())
            .div(2)
            .equal(),
        },
        [`&-has-title > ${token.iconCls}`]: {
          marginTop: token
            .calc(token.calc(modalTitleHeight).sub(modalConfirmIconSize).equal())
            .div(2)
            .equal(),
        },
      },

      [`${confirmComponentCls}-paragraph`]: {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
        rowGap: token.marginXS,
        maxWidth: `calc(100% - ${unit(
          token.calc(token.modalConfirmIconSize).add(token.marginSM).equal(),
        )})`,
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
