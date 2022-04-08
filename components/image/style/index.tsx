// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { FullToken, genComponentStyleHook, GenerateStyle, resetComponent } from '../../_util/theme';

export interface ImageToken extends FullToken<'Image'> {
  previewPrefixCls: string;
  imageSizeBase: number;
  marginXXS: number;
  imageBg: string;
  imageColor: string;
  imagePreviewOperationDisabledColor: string;
  imageMaskFontSize: number;
  iconPrefixClsFontSize: number;
  imagePreviewOperationSize: number;
  imageFontSizeBase: number;
  switchLeft: number;
  switchRight: number;
  switchWidth: number;
  switchHeight: number;
  switchMarginTop: number;
  width1px: number;
  modalMaskBg: string;
  zIndexImage: number;
  zIndexModalMask: number;
  motionEaseOut: string;
  white: string;
  black: string;
}

export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;

export const genBoxStyle = (position?: PositionType): CSSObject => ({
  position: position || 'absolute',
  inset: 0,
});

export const genImageMaskStyle = (token: ImageToken): CSSObject => {
  const { iconCls, white, black, motionDurationSlow, paddingXXS, marginXXS, prefixCls } = token;
  return {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: white,
    background: new TinyColor(black).setAlpha(0.5).toRgbString(), // FIXME: hard code in v4
    cursor: 'pointer',
    opacity: 0,
    transition: `opacity ${motionDurationSlow}`,

    [`.${prefixCls}-mask-info`]: {
      padding: `0 ${paddingXXS}px`,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [iconCls]: {
        marginInlineEnd: marginXXS,
      },
    },
  };
};

export const genPreviewOperationsStyle = (token: ImageToken): CSSObject => {
  const {
    black,
    modalMaskBg,
    paddingSM,
    imagePreviewOperationDisabledColor,
    imagePreviewOperationSize,
    previewPrefixCls,
  } = token;
  return {
    ...resetComponent(token),
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineEnd: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    color: black,
    listStyle: 'none',
    background: new TinyColor(modalMaskBg).setAlpha(0.1).toRgbString(), // FIXME: hard code
    pointerEvents: 'auto',

    [`${previewPrefixCls}-operations-operation`]: {
      marginInlineStart: paddingSM,
      padding: paddingSM,
      cursor: 'pointer',

      '&-disabled': {
        color: imagePreviewOperationDisabledColor,
        pointerEvents: 'none',
      },

      '&:last-of-type': {
        marginInlineStart: 0,
      },
    },

    [`${previewPrefixCls}-icon`]: {
      fontSize: imagePreviewOperationSize,
    },
  };
};
export const genPreviewSwitchStyle = (token: ImageToken): CSSObject => {
  const {
    black,
    modalMaskBg,
    iconCls,
    imagePreviewOperationDisabledColor,
    previewPrefixCls,
    switchWidth,
    switchRight,
    switchHeight,
    switchMarginTop,
    iconPrefixClsFontSize,
  } = token;
  return {
    position: 'absolute',
    insetBlockStart: '50%',
    insetInlineEnd: switchRight,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: switchWidth,
    height: switchHeight,
    marginTop: switchMarginTop,
    color: black,
    background: new TinyColor(modalMaskBg).setAlpha(0.1).toRgbString(), // FIXME: hard code in v4
    borderRadius: '50%',
    cursor: 'pointer',
    pointerEvents: 'auto',

    [`${previewPrefixCls}-disabled`]: {
      color: imagePreviewOperationDisabledColor,
      cursor: 'not-allowed',
      [`> ${iconCls}`]: {
        cursor: 'not-allowed',
      },
    },
    [`> ${iconCls}`]: {
      fontSize: iconPrefixClsFontSize,
    },
  };
};

export const genImagePreviewStyle = (token: ImageToken): CSSObject => {
  const { motionEaseOut, previewPrefixCls, switchRight, switchLeft, width1px, motionDurationSlow } =
    token;
  return {
    height: '100%',
    textAlign: 'center',
    [`${previewPrefixCls}-body`]: {
      ...genBoxStyle(),
      overflow: 'hidden',
    },

    [`${previewPrefixCls}-img`]: {
      maxWidth: '100%',
      maxHeight: '100%',
      verticalAlign: 'middle',
      transform: 'scale3d(1, 1, 1)',
      cursor: 'grab',
      transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
      userSelect: 'none',
      pointerEvents: 'auto',

      '&-wrapper': {
        ...genBoxStyle(),
        transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,

        '&::before': {
          display: 'inline-block',
          width: width1px,
          height: '50%',
          marginInlineEnd: -width1px,
          content: '""',
        },
      },
    },

    [`${previewPrefixCls}-moving`]: {
      [`${previewPrefixCls}-preview-img`]: {
        cursor: 'grabbing',

        '&-wrapper': {
          transitionDuration: '0s',
        },
      },
    },

    [`${previewPrefixCls}-operations`]: {
      ...genPreviewOperationsStyle(token),
    },

    [`${previewPrefixCls}-switch-left, ${previewPrefixCls}-switch-right`]: {
      ...genPreviewSwitchStyle(token),
    },

    [`${previewPrefixCls}-switch-left`]: {
      insetInlineStart: switchLeft,
    },

    [`${previewPrefixCls}-switch-right`]: {
      insetInlineEnd: switchRight,
    },
  };
};

const genImageStyle: GenerateStyle<ImageToken> = (token: ImageToken) => {
  const {
    prefixCls,
    zIndexModalMask,
    modalMaskBg,
    previewPrefixCls,
    imageBg,
    zIndexImage,
    motionDurationSlow,
  } = token;
  return {
    // ============================== image ==============================
    [`.${prefixCls}`]: {
      position: 'relative',
      display: 'inline-block',
      [`.${prefixCls}-img`]: {
        width: '100%',
        height: 'auto',
        verticalAlign: 'middle',
      },
      [`.${prefixCls}-img-placeholder`]: {
        backgroundColor: imageBg,
        backgroundImage:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '30%',
      },

      [`.${prefixCls}-mask`]: {
        ...genImageMaskStyle(token),
      },
      [`.${prefixCls}-mask:hover`]: {
        opacity: 1,
      },
      [`.${prefixCls}-placeholder`]: {
        ...genBoxStyle(),
      },
    },
    // ============================== preview ==============================
    pointerEvents: 'none',
    [`${previewPrefixCls}.${prefixCls}-zoom-enter, ${previewPrefixCls}.${prefixCls}zoom-appear`]: {
      transform: 'none',
      opacity: 0,
      animationDuration: motionDurationSlow,
      userSelect: 'none', // https://github.com/ant-design/ant-design/issues/11777
    },
    [`${previewPrefixCls}-root`]: {
      [`${previewPrefixCls}-mask`]: {
        ...genBoxStyle('fixed'),
        zIndex: zIndexModalMask,
        height: '100%',
        backgroundColor: modalMaskBg,

        '&-hidden': {
          display: 'none',
        },
      },
      [`${previewPrefixCls}-wrap`]: {
        ...genBoxStyle('fixed'),
        overflow: 'auto',
        outline: 0,
        WebkitOverflowScrolling: 'touch',
        zIndex: zIndexImage,
        [`${previewPrefixCls}`]: {
          ...genImagePreviewStyle(token),
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Image', (token, { hashId }) => {
  const imageToken: ImageToken = {
    ...token,
    previewPrefixCls: `${token.componentCls}-preview`,

    white: '#fff', // FIXME: hard code
    black: '#000', // FIXME: hard code
    imageSizeBase: 48, // FIXME: hard code in v4
    imageFontSizeBase: 24, // FIXME: hard code in v4
    imageBg: '#f5f5f5', // FIXME: hard code in v4
    imageColor: '#fff', // FIXME: hard code in v4
    imageMaskFontSize: 16, // FIXME: hard code in v4
    imagePreviewOperationSize: 18, // FIXME: hard code in v4
    iconPrefixClsFontSize: 18, // FIXME: hard code in v4
    switchWidth: 44, // FIXME: hard code in v4
    switchHeight: 44, // FIXME: hard code in v4
    switchRight: 10, // FIXME: hard code in v4
    switchLeft: 10, // FIXME: hard code in v4
    switchMarginTop: -22, // FIXME: hard code in v4
    width1px: 1, // FIXME: hard code in v4
    imagePreviewOperationDisabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // FIXME: hard code in v4
    modalMaskBg: new TinyColor('#000').setAlpha(0.45).toRgbString(), // FIXME: hard code in v4
    zIndexImage: 1080, // FIXME: hard code in v4
    zIndexModalMask: 1000, // FIXME: hard code in v4
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // FIXME: hard code in v4
  };

  return [genImageStyle(imageToken, hashId)];
});
