// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  GenerateStyle,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
} from '../../_util/theme';

export interface ImageToken extends DerivativeToken {
  prefixCls: string;
  previewPrefixCls: string;
  iconPrefixCls: string;
  imageSizeBase: string;
  imageFontSizeBase: string;
  imageBg: string;
  imageColor: string;
  imageMaskFontSize: string;
  imagePreviewOperationSize: string;
  imagePreviewOperationColor: string;
  imagePreviewOperationDisabledColor: string;
  marginXss: string;
}

export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;

export const genBoxStyle = (position?: PositionType): CSSObject => ({
  position: position || 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const genModalMask = (token: ImageToken): CSSObject => {
  const { prefixCls, animationDurationSlow, previewPrefixCls } = token;
  return {
    pointerEvents: 'none',
    [`.${previewPrefixCls}.${prefixCls}-zoom-enter, .${previewPrefixCls}.${prefixCls}zoom-appear`]:
      {
        transform: 'none',
        opacity: 0,
        animationDuration: animationDurationSlow,
        userSelect: 'none', // https://github.com/ant-design/ant-design/issues/11777
      },
  };
};

export const genImageMaskStyle = (token: ImageToken): CSSObject => {
  const { iconPrefixCls, white, black, animationDurationSlow, paddingXXS, marginXss, prefixCls } =
    token;
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: white,
    background: new TinyColor(black).setAlpha(0.5).toRgbString(),
    cursor: 'pointer',
    opacity: 0,
    transition: `opacity ${animationDurationSlow}`,

    [`.${prefixCls}-mask-info`]: {
      padding: `0 ${paddingXXS}`,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`.${iconPrefixCls}`]: {
        marginInlineEnd: marginXss,
      },
    },
  };
};

export const genPreviewOperationsStyle = (token: ImageToken): CSSObject => {
  const {
    imagePreviewOperationColor,
    modalMaskBg,
    paddingSM,
    imagePreviewOperationDisabledColor,
    imagePreviewOperationSize,
    previewPrefixCls,
  } = token;
  return {
    ...resetComponent(token),
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    color: imagePreviewOperationColor,
    listStyle: 'none',
    background: new TinyColor(modalMaskBg).setAlpha(0.1).toRgbString(),
    pointerEvents: 'auto',

    [`.${previewPrefixCls}-operations-operation`]: {
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

    [`.${previewPrefixCls}-icon`]: {
      fontSize: imagePreviewOperationSize,
    },
  };
};
export const genPreviewSwitchStyle = (token: ImageToken): CSSObject => {
  const {
    imagePreviewOperationColor,
    modalMaskBg,
    iconPrefixCls,
    imagePreviewOperationDisabledColor,
    previewPrefixCls,
  } = token;
  return {
    position: 'absolute',
    top: '50%',
    right: '10px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    marginTop: '-22px',
    color: imagePreviewOperationColor,
    background: new TinyColor(modalMaskBg).setAlpha(0.1).toRgbString(),
    borderRadius: '50%',
    cursor: 'pointer',
    pointerEvents: 'auto',

    [`.${previewPrefixCls}-disabled`]: {
      color: imagePreviewOperationDisabledColor,
      cursor: 'not-allowed',
      [`> .${iconPrefixCls}`]: {
        cursor: 'not-allowed',
      },
    },
    [`> .${iconPrefixCls}`]: {
      fontSize: '18px',
    },
  };
};

export const genImagePreviewStyle = (token: ImageToken): CSSObject => {
  const { easeOut, previewPrefixCls } = token;
  return {
    height: '100%',
    textAlign: 'center',
    [`.${previewPrefixCls}-body`]: {
      ...genBoxStyle(),
      overflow: 'hidden',
    },

    [`.${previewPrefixCls}-img`]: {
      maxWidth: '100%',
      maxHeight: '100%',
      verticalAlign: 'middle',
      transform: 'scale3d(1, 1, 1)',
      cursor: 'grab',
      transition: `transform 0.3s ${easeOut} 0s`,
      userSelect: 'none',
      pointerEvents: 'auto',

      '&-wrapper': {
        ...genBoxStyle(),
        transition: `transform 0.3s ${easeOut} 0s`,

        '&::before': {
          display: 'inline-block',
          width: '1px',
          height: '50%',
          marginInlineEnd: '-1px',
          content: '""',
        },
      },
    },

    [`.${previewPrefixCls}-moving`]: {
      [`.${previewPrefixCls}-preview-img`]: {
        cursor: 'grabbing',

        '&-wrapper': {
          transitionDuration: '0s',
        },
      },
    },

    [`.${previewPrefixCls}-operations`]: {
      ...genPreviewOperationsStyle(token),
    },

    [`.${previewPrefixCls}-switch-left, .${previewPrefixCls}-switch-right`]: {
      ...genPreviewSwitchStyle(token),
    },

    [`.${previewPrefixCls}-switch-left`]: {
      left: '10px',
    },

    [`.${previewPrefixCls}-switch-right`]: {
      right: '10px',
    },
  };
};

const genImageStyle: GenerateStyle<ImageToken> = (token: ImageToken) => {
  const { prefixCls, zIndexModalMask, modalMaskBg, previewPrefixCls, imageBg, zIndexImage } = token;
  return {
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
    ...genModalMask(token),

    [`.${previewPrefixCls}-mask`]: {
      ...genBoxStyle('fixed'),
      zIndex: zIndexModalMask,
      height: '100%',
      backgroundColor: modalMaskBg,

      '&-hidden': {
        display: 'none',
      },
    },

    [`.${previewPrefixCls}-wrap`]: {
      ...genBoxStyle('fixed'),
      overflow: 'auto',
      outline: 0,
      WebkitOverflowScrolling: 'touch',
      zIndex: zIndexImage,
      [`.${previewPrefixCls}`]: {
        ...genImagePreviewStyle(token),
      },
    },
  };
};

export const initImageToken = (
  token: DerivativeToken,
  prefixCls: string,
  iconPrefixCls: string,
): ImageToken => ({
  ...token,
  prefixCls,
  iconPrefixCls,
  previewPrefixCls: `${prefixCls}-preview`,
});

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const inputToken: ImageToken = initImageToken(token, prefixCls, iconPrefixCls);
  console.log('genImageStyle(inputToken, hashId)', genImageStyle(inputToken, hashId));
  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genImageStyle(inputToken, hashId),
    ]),
    hashId,
  ];
}
