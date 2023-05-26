import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';
import {
  getCopyableStyles,
  getEditableStyles,
  getEllipsisStyles,
  getLinkStyles,
  getResetStyles,
  getTitleStyles,
} from './mixins';
import { operationUnit } from '../../style';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  sizeMarginHeadingVerticalStart: number | string;
  sizeMarginHeadingVerticalEnd: number | string;
}

export type TypographyToken = FullToken<'Typography'>;

const genTypographyStyle: GenerateStyle<TypographyToken> = (token) => {
  const { componentCls, sizeMarginHeadingVerticalStart } = token;

  return {
    [componentCls]: {
      color: token.colorText,
      wordBreak: 'break-word',
      lineHeight: token.lineHeight,
      [`&${componentCls}-secondary`]: {
        color: token.colorTextDescription,
      },

      [`&${componentCls}-success`]: {
        color: token.colorSuccess,
      },

      [`&${componentCls}-warning`]: {
        color: token.colorWarning,
      },

      [`&${componentCls}-danger`]: {
        color: token.colorError,
        'a&:active, a&:focus': {
          color: token.colorErrorActive,
        },
        'a&:hover': {
          color: token.colorErrorHover,
        },
      },

      [`&${componentCls}-disabled`]: {
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
      & + h1${componentCls},
      & + h2${componentCls},
      & + h3${componentCls},
      & + h4${componentCls},
      & + h5${componentCls}
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

      ...getResetStyles(token),

      ...getLinkStyles(token),

      // Operation
      [`
        ${componentCls}-expand,
        ${componentCls}-edit,
        ${componentCls}-copy
      `]: {
        ...operationUnit(token),
        marginInlineStart: token.marginXXS,
      },

      ...getEditableStyles(token),

      ...getCopyableStyles(token),

      ...getEllipsisStyles(),

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Typography', (token) => [genTypographyStyle(token)], {
  sizeMarginHeadingVerticalStart: '1.2em',
  sizeMarginHeadingVerticalEnd: '0.5em',
});
