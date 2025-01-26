import { genAffixStyle, genInputStyle } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { ComponentToken, InputToken } from './token';
import { initComponentToken, initInputToken } from './token';

export type { ComponentToken };
export { initComponentToken, initInputToken };

const genTextAreaStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingLG } = token;

  return {
    [componentCls]: {
      position: 'relative',

      // Reset height for `textarea`s
      'textarea&': {
        maxWidth: '100%', // prevent textarea resize from coming out of its container
        height: 'auto',
        minHeight: token.controlHeight,
        lineHeight: token.lineHeight,
        verticalAlign: 'bottom',
        transition: `all ${token.motionDurationSlow}, height 0s`,
        resize: 'vertical',
      },

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
        &-affix-wrapper${componentCls}-has-feedback ${componentCls}
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
          [`${componentCls}-suffix`]: {
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
  'Input',
  (token) => {
    const inputToken = mergeToken<InputToken>(token, initInputToken(token));

    return [genInputStyle(inputToken), genTextAreaStyle(inputToken), genAffixStyle(inputToken)];
  },
  initComponentToken,
  {
    resetFont: false,
  },
);
