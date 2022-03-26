// deps-lint-skip-all
import { useStyleRegister, useToken } from '../../_util/theme';
import type { UseComponentStyleResult, GenerateStyle, AliasToken } from '../../_util/theme';
import { operationUnit } from '../../_util/theme/util/operationUnit';
import {
  getTitleStyles,
  getResetStyles,
  getLinkStyles,
  getEditableStyles,
  getCopiableStyles,
  getEllipsisStyles,
} from './mixins';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  sizeMarginHeadingVerticalStart: number | string;
  sizeMarginHeadingVerticalEnd: number | string;
}

export interface TypographyToken extends AliasToken, ComponentToken {
  typographyCls: string;
}

const genTypographyStyle: GenerateStyle<TypographyToken> = token => {
  const { typographyCls, sizeMarginHeadingVerticalStart } = token;

  return {
    [typographyCls]: {
      color: token.colorText,
      overflowWrap: 'break-word',
      '&&-secondary': {
        color: token.colorTextSecondary,
      },

      '&&-success': {
        color: token.colorSuccess,
      },

      '&&-warning': {
        color: token.colorWarning,
      },

      '&&-danger': {
        color: token.colorError,
        'a&:active, a&:focus, a&:hover': {
          color: token.colorErrorHover,
        },
      },

      '&&-disabled': {
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
        userSelect: 'none',
      },

      [`
        div&,
        p
      `]: {
        marginBottom: '1em',
      },

      ...getTitleStyles(token),

      [`
      & + h1&,
      & + h2&,
      & + h3&,
      & + h4&,
      & + h5&
      `]: {
        marginTop: sizeMarginHeadingVerticalStart,
      },

      [`
      div,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5`]: {
        [`
        + h1,
        + h2,
        + h3,
        + h4,
        + h5
        `]: {
          marginTop: sizeMarginHeadingVerticalStart,
        },
      },

      ...getResetStyles(),

      ...getLinkStyles(token),

      // Operation
      [`
        ${typographyCls}-expand,
        ${typographyCls}-edit,
        ${typographyCls}-copy
      `]: {
        ...operationUnit(token),
        marginInlineStart: token.marginXXS,
      },

      ...getEditableStyles(token),

      ...getCopiableStyles(token),

      ...getEllipsisStyles(),

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { typography } = token;

      const typographyToken: TypographyToken = {
        ...token,

        typographyCls: `.${prefixCls}`,

        sizeMarginHeadingVerticalStart: '1.2em',
        sizeMarginHeadingVerticalEnd: '0.5em',

        ...typography,
      };

      return [genTypographyStyle(typographyToken)];
    }),
    hashId,
  ];
}
