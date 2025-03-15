import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { ComponentToken, InputToken } from './token';
import { initComponentToken, initInputToken } from './token';

export type { ComponentToken };
export { initComponentToken, initInputToken };

const genTextAreaStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingLG } = token;
  const textareaPrefixCls = `${componentCls}-textarea`;

  return {
    [textareaPrefixCls]: {
      position: 'relative',

      '&-show-count': {
        // https://github.com/ant-design/ant-design/issues/33049
        [`> ${componentCls}`]: {
          height: '100%',
        },

        [`${componentCls}-data-count`]: {
          position: 'absolute',
          bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: token.colorTextDescription,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        },
      },

      [`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: {
        paddingInlineEnd: paddingLG,
      },

      [`&-affix-wrapper${componentCls}-affix-wrapper`]: {
        padding: 0,

        [`> textarea${componentCls}`]: {
          fontSize: 'inherit',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          minHeight: token
            .calc(token.controlHeight)
            .sub(token.calc(token.lineWidth).mul(2))
            .equal(),

          '&:focus': {
            boxShadow: 'none !important',
          },
        },

        [`${componentCls}-suffix`]: {
          margin: 0,

          '> *:not(:last-child)': {
            marginInline: 0,
          },

          // Clear Icon
          [`${componentCls}-clear-icon`]: {
            position: 'absolute',
            insetInlineEnd: token.paddingInline,
            insetBlockStart: token.paddingXS,
          },

          // Feedback Icon
          [`${textareaPrefixCls}-suffix`]: {
            position: 'absolute',
            top: 0,
            insetInlineEnd: token.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            margin: 'auto',
            pointerEvents: 'none',
          },
        },
      },

      [`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: {
        [`${componentCls}-suffix`]: {
          [`${componentCls}-clear-icon`]: {
            insetInlineEnd: token.paddingInlineSM,
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  ['Input', 'TextArea'],
  (token) => {
    const inputToken = mergeToken<InputToken>(token, initInputToken(token));

    return [genTextAreaStyle(inputToken)];
  },
  initComponentToken,
  {
    resetFont: false,
  },
);
