// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';

export interface ComponentToken {
  imageBg: string;
  imagePreviewOperationSize: number;
  imagePreviewOperationColor: string;
  imagePreviewSwitchSize: number;
  zIndexImage: number;
}

export interface ImageToken extends FullToken<'Image'> {
  previewCls: string;
  modalMaskBg: string;
  zIndexModalMask: number;
  imagePreviewOperationDisabledColor: string;
}

export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;

export const genBoxStyle = (position?: PositionType): CSSObject => ({
  position: position || 'absolute',
  inset: 0,
});

export const genImageMaskStyle = (token: ImageToken): CSSObject => {
  const { iconCls, motionDurationSlow, paddingXXS, marginXXS, prefixCls } = token;
  return {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    background: new TinyColor('#000').setAlpha(0.5).toRgbString(),
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
  const { modalMaskBg, paddingSM, imagePreviewOperationDisabledColor } = token;

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
    color: token.imagePreviewOperationColor,
    listStyle: 'none',
    background: new TinyColor(modalMaskBg).setAlpha(0.1).toRgbString(),
    pointerEvents: 'auto',

    [`&-operation`]: {
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

    [`&-progress`]: {
      position: 'absolute',
      left: { _skip_check_: true, value: '50%' },
      transform: 'translateX(-50%)',
    },

    [`&-icon`]: {
      fontSize: token.imagePreviewOperationSize,
    },
  };
};

export const genPreviewSwitchStyle = (token: ImageToken): CSSObject => {
  const { modalMaskBg, iconCls, imagePreviewOperationDisabledColor, previewCls } = token;

  return {
    position: 'absolute',
    insetBlockStart: '50%',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: token.imagePreviewSwitchSize,
    height: token.imagePreviewSwitchSize,
    marginTop: -token.imagePreviewSwitchSize / 2,
    color: token.imagePreviewOperationColor,
    background: new TinyColor(modalMaskBg).setAlpha(0.1).toRgbString(),
    borderRadius: '50%',
    cursor: 'pointer',
    pointerEvents: 'auto',

    [`${previewCls}-disabled`]: {
      color: imagePreviewOperationDisabledColor,
      cursor: 'not-allowed',
      [`> ${iconCls}`]: {
        cursor: 'not-allowed',
      },
    },
    [`> ${iconCls}`]: {
      fontSize: token.imagePreviewOperationSize,
    },
  };
};

export const genImagePreviewStyle = (token: ImageToken): CSSObject => {
  const { motionEaseOut, previewCls, motionDurationSlow } = token;

  return {
    height: '100%',
    textAlign: 'center',
    [`${previewCls}-body`]: {
      ...genBoxStyle(),
      overflow: 'hidden',
    },

    [`${previewCls}-img`]: {
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
          width: 1,
          height: '50%',
          marginInlineEnd: -1,
          content: '""',
        },
      },
    },

    [`${previewCls}-moving`]: {
      [`${previewCls}-preview-img`]: {
        cursor: 'grabbing',

        '&-wrapper': {
          transitionDuration: '0s',
        },
      },
    },

    [`${previewCls}-operations`]: {
      ...genPreviewOperationsStyle(token),
    },

    [`${previewCls}-switch-left, ${previewCls}-switch-right`]: {
      ...genPreviewSwitchStyle(token),
    },

    [`${previewCls}-switch-left`]: {
      insetInlineStart: token.marginSM,
    },

    [`${previewCls}-switch-right`]: {
      insetInlineEnd: token.marginSM,
    },
  };
};

const genImageStyle: GenerateStyle<ImageToken> = (token: ImageToken) => {
  const {
    prefixCls,
    zIndexModalMask,
    modalMaskBg,
    previewCls,
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
    [`${previewCls}.${prefixCls}-zoom-enter, ${previewCls}.${prefixCls}zoom-appear`]: {
      transform: 'none',
      opacity: 0,
      animationDuration: motionDurationSlow,
      userSelect: 'none', // https://github.com/ant-design/ant-design/issues/11777
    },
    [`${previewCls}-root`]: {
      [`${previewCls}-mask`]: {
        ...genBoxStyle('fixed'),
        zIndex: zIndexModalMask,
        height: '100%',
        backgroundColor: modalMaskBg,

        '&-hidden': {
          display: 'none',
        },
      },
      [`${previewCls}-wrap`]: {
        ...genBoxStyle('fixed'),
        overflow: 'auto',
        outline: 0,
        WebkitOverflowScrolling: 'touch',
        zIndex: zIndexImage,
        [`${previewCls}`]: {
          ...genImagePreviewStyle(token),
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Image',
  token => {
    const imagePreviewOperationColor = new TinyColor(token.imagePreviewOperationColor);

    const imageToken = mergeToken<ImageToken>(token, {
      previewCls: `${token.componentCls}-preview`,
      imagePreviewOperationDisabledColor: new TinyColor(imagePreviewOperationColor)
        .setAlpha(0.25)
        .toRgbString(),
      modalMaskBg: new TinyColor('#000').setAlpha(0.45).toRgbString(), // FIXME: Shared Token
      zIndexModalMask: 1000, // FIXME: Shared Token
    });

    return [genImageStyle(imageToken)];
  },
  {
    imageBg: '#f5f5f5',
    imagePreviewOperationSize: 18,
    imagePreviewOperationColor: new TinyColor({ r: 255, g: 255, b: 255, a: 0.85 }).toRgbString(),
    imagePreviewSwitchSize: 44,
    zIndexImage: 1080,
  },
);
