// deps-lint-skip-all
import { useStyleRegister, useToken } from '../../_util/theme';
import type { UseComponentStyleResult, GenerateStyle } from '../../_util/theme';
import { operationUnit } from '../../_util/theme/util/operationUnit';
import {
  getTitleStyles,
  getResetStyles,
  getLinkStyles,
  getEditableStyles,
  getCopiableStyles,
  getEllipsisStyles,
} from './mixins';
import type { TypographyToken } from './mixins';

const genTypographyStyle: GenerateStyle<TypographyToken> = token => {
  const { prefixCls, titleMarginTop } = token.typography;
  return {
    [`.${prefixCls}`]: {
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
          // FIXME: need new token like errorColorHover
          color: token.errorColors[4],
        },
      },

      '&&-disabled': {
        color: token.disabledColor,
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
        marginTop: titleMarginTop,
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
          marginTop: titleMarginTop,
        },
      },

      ...getResetStyles(),

      ...getLinkStyles(token),

      // Operation
      [`
      .${prefixCls}-expand,
      .${prefixCls}-edit,
      .${prefixCls}-copy
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

  const typographyToken: TypographyToken = {
    ...token,
    typography: {
      prefixCls,
      titleMarginTop: '1.2em',
      titleMarginBottom: '0.5em',
      titleFontWeight: 600,
    },
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genTypographyStyle(typographyToken),
    ]),
    hashId,
  ];
}
