import { operationUnit } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';
import {
  getCopyableStyles,
  getEditableStyles,
  getEllipsisStyles,
  getLinkStyles,
  getResetStyles,
  getTitleStyles,
} from './mixins';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * @desc 标题上间距
   * @descEN Margin top of title
   */
  titleMarginTop: number | string;
  /**
   * @desc 标题下间距
   * @descEN Margin bottom of title
   */
  titleMarginBottom: number | string;
}

export type TypographyToken = FullToken<'Typography'>;

const genTypographyStyle: GenerateStyle<TypographyToken> = (token) => {
  const { componentCls, titleMarginTop } = token;

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

      ...getResetStyles(token),

      ...getLinkStyles(token),

      // Operation
      [`
        ${componentCls}-expand,
        ${componentCls}-collapse,
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

export const prepareComponentToken: GetDefaultToken<'Typography'> = () => ({
  titleMarginTop: '1.2em',
  titleMarginBottom: '0.5em',
});

// ============================== Export ==============================
export default genStyleHooks(
  'Typography',
  (token) => [genTypographyStyle(token)],
  prepareComponentToken,
);
