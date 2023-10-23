import { operationUnit } from '../../style';
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

      [`&${componentCls}-code`]: {
        margin: '0 0.2em',
        paddingInline: '0.4em',
        paddingBlock: '0.2em 0.1em',
        fontSize: '85%',
        lineHeight: 1.2,
        background: 'rgba(150, 150, 150, 0.1)',
        border: '1px solid rgba(100, 100, 100, 0.2)',
        borderRadius: 3,
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
export default genComponentStyleHook(
  'Typography',
  (token) => [genTypographyStyle(token)],
  () => ({
    titleMarginTop: '1.2em',
    titleMarginBottom: '0.5em',
  }),
);
