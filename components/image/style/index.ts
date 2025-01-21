import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import { genModalMaskStyle } from '../../modal/style';
import { textEllipsis } from '../../style';
import { initFadeMotion, initZoomMotion } from '../../style/motion';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 预览浮层 z-index
   * @descEN z-index of preview popup
   */
  zIndexPopup: number;
  /**
   * @desc 预览操作图标大小
   * @descEN Size of preview operation icon
   */
  previewOperationSize: number;
  /**
   * @desc 预览操作图标颜色
   * @descEN Color of preview operation icon
   */
  previewOperationColor: string;
  /**
   * @desc 预览操作图标悬浮颜色
   * @descEN Color of hovered preview operation icon
   */
  previewOperationHoverColor: string;
  /**
   * @desc 预览操作图标禁用颜色
   * @descEN Disabled color of preview operation icon
   */
  previewOperationColorDisabled: string;
}

/**
 * @desc Image 组件的 Token
 * @descEN Token for Image component
 */
export interface ImageToken extends FullToken<'Image'> {
  /**
   * @desc 预览类名
   * @descEN Preview class name
   */
  previewCls: string;
  /**
   * @desc 模态框遮罩背景色
   * @descEN Background color of modal mask
   */
  modalMaskBg: string;
  /**
   * @desc 预览切换按钮尺寸
   * @descEN Size of preview switch button
   */
  imagePreviewSwitchSize: number;
}

export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;

export const genBoxStyle = (position?: PositionType): CSSObject => ({
  position: position || 'absolute',
  inset: 0,
});

export const genImageMaskStyle = (token: ImageToken): CSSObject => {
  const { iconCls, motionDurationSlow, paddingXXS, marginXXS, prefixCls, colorTextLightSolid } =
    token;
  return {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colorTextLightSolid,
    background: new FastColor('#000').setA(0.5).toRgbString(),
    cursor: 'pointer',
    opacity: 0,
    transition: `opacity ${motionDurationSlow}`,

    [`.${prefixCls}-mask-info`]: {
      ...textEllipsis,
      padding: `0 ${unit(paddingXXS)}`,
      [iconCls]: {
        marginInlineEnd: marginXXS,
        svg: {
          verticalAlign: 'baseline',
        },
      },
    },
  };
};

export const genPreviewOperationsStyle = (token: ImageToken): CSSObject => {
  const {
    previewCls,
    modalMaskBg,
    paddingSM,
    marginXL,
    margin,
    paddingLG,
    previewOperationColorDisabled,
    previewOperationHoverColor,
    motionDurationSlow,
    iconCls,
    colorTextLightSolid,
  } = token;

  const operationBg = new FastColor(modalMaskBg).setA(0.1);
  const operationBgHover = operationBg.clone().setA(0.2);

  return {
    [`${previewCls}-footer`]: {
      position: 'fixed',
      bottom: marginXL,
      left: {
        _skip_check_: true,
        value: '50%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: token.previewOperationColor,
      transform: 'translateX(-50%)',
    },
    [`${previewCls}-progress`]: {
      marginBottom: margin,
    },
    [`${previewCls}-close`]: {
      position: 'fixed',
      top: marginXL,
      right: {
        _skip_check_: true,
        value: marginXL,
      },
      display: 'flex',
      color: colorTextLightSolid,
      backgroundColor: operationBg.toRgbString(),
      borderRadius: '50%',
      padding: paddingSM,
      outline: 0,
      border: 0,
      cursor: 'pointer',
      transition: `all ${motionDurationSlow}`,

      '&:hover': {
        backgroundColor: operationBgHover.toRgbString(),
      },

      [`& > ${iconCls}`]: {
        fontSize: token.previewOperationSize,
      },
    },
    [`${previewCls}-operations`]: {
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${unit(paddingLG)}`,
      backgroundColor: operationBg.toRgbString(),
      borderRadius: 100,

      '&-operation': {
        marginInlineStart: paddingSM,
        padding: paddingSM,
        cursor: 'pointer',
        transition: `all ${motionDurationSlow}`,
        userSelect: 'none',

        [`&:not(${previewCls}-operations-operation-disabled):hover > ${iconCls}`]: {
          color: previewOperationHoverColor,
        },

        '&-disabled': {
          color: previewOperationColorDisabled,
          cursor: 'not-allowed',
        },

        '&:first-of-type': {
          marginInlineStart: 0,
        },

        [`& > ${iconCls}`]: {
          fontSize: token.previewOperationSize,
        },
      },
    },
  };
};

export const genPreviewSwitchStyle = (token: ImageToken): CSSObject => {
  const {
    modalMaskBg,
    iconCls,
    previewOperationColorDisabled,
    previewCls,
    zIndexPopup,
    motionDurationSlow,
  } = token;

  const operationBg = new FastColor(modalMaskBg).setA(0.1);
  const operationBgHover = operationBg.clone().setA(0.2);

  return {
    [`${previewCls}-switch-left, ${previewCls}-switch-right`]: {
      position: 'fixed',
      insetBlockStart: '50%',
      zIndex: token.calc(zIndexPopup).add(1).equal(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: token.imagePreviewSwitchSize,
      height: token.imagePreviewSwitchSize,
      marginTop: token.calc(token.imagePreviewSwitchSize).mul(-1).div(2).equal(),
      color: token.previewOperationColor,
      background: operationBg.toRgbString(),
      borderRadius: '50%',
      transform: `translateY(-50%)`,
      cursor: 'pointer',
      transition: `all ${motionDurationSlow}`,
      userSelect: 'none',

      '&:hover': {
        background: operationBgHover.toRgbString(),
      },

      '&-disabled': {
        '&, &:hover': {
          color: previewOperationColorDisabled,
          background: 'transparent',
          cursor: 'not-allowed',
          [`> ${iconCls}`]: {
            cursor: 'not-allowed',
          },
        },
      },
      [`> ${iconCls}`]: {
        fontSize: token.previewOperationSize,
      },
    },

    [`${previewCls}-switch-left`]: {
      insetInlineStart: token.marginSM,
    },

    [`${previewCls}-switch-right`]: {
      insetInlineEnd: token.marginSM,
    },
  };
};

export const genImagePreviewStyle: GenerateStyle<ImageToken> = (token: ImageToken) => {
  const { motionEaseOut, previewCls, motionDurationSlow, componentCls } = token;

  return [
    {
      [`${componentCls}-preview-root`]: {
        [previewCls]: {
          height: '100%',
          textAlign: 'center',
          pointerEvents: 'none',
        },

        [`${previewCls}-body`]: {
          ...genBoxStyle(),
          overflow: 'hidden',
        },

        [`${previewCls}-img`]: {
          maxWidth: '100%',
          maxHeight: '70%',
          verticalAlign: 'middle',
          transform: 'scale3d(1, 1, 1)',
          cursor: 'grab',
          transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
          userSelect: 'none',

          '&-wrapper': {
            ...genBoxStyle(),
            transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,

            // https://github.com/ant-design/ant-design/issues/39913
            // TailwindCSS will reset img default style.
            // Let's set back.
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            '& > *': {
              pointerEvents: 'auto',
            },

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
      },
    },
    // Override
    {
      [`${componentCls}-preview-root`]: {
        [`${previewCls}-wrap`]: {
          zIndex: token.zIndexPopup,
        },
      },
    },

    // Preview operations & switch
    {
      [`${componentCls}-preview-operations-wrapper`]: {
        position: 'fixed',
        zIndex: token.calc(token.zIndexPopup).add(1).equal(),
      },
      '&': [genPreviewOperationsStyle(token), genPreviewSwitchStyle(token)],
    },
  ];
};

const genImageStyle: GenerateStyle<ImageToken> = (token: ImageToken) => {
  const { componentCls } = token;
  return {
    // ============================== image ==============================
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      [`${componentCls}-img`]: {
        width: '100%',
        height: 'auto',
        verticalAlign: 'middle',
      },
      [`${componentCls}-img-placeholder`]: {
        backgroundColor: token.colorBgContainerDisabled,
        backgroundImage:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '30%',
      },
      [`${componentCls}-mask`]: {
        ...genImageMaskStyle(token),
      },
      [`${componentCls}-mask:hover`]: {
        opacity: 1,
      },
      [`${componentCls}-placeholder`]: {
        ...genBoxStyle(),
      },
    },
  };
};

const genPreviewMotion: GenerateStyle<ImageToken> = (token) => {
  const { previewCls } = token;

  return {
    [`${previewCls}-root`]: initZoomMotion(token, 'zoom'),
    '&': initFadeMotion(token, true),
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Image'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + 80,
  previewOperationColor: new FastColor(token.colorTextLightSolid).setA(0.65).toRgbString(),
  previewOperationHoverColor: new FastColor(token.colorTextLightSolid).setA(0.85).toRgbString(),
  previewOperationColorDisabled: new FastColor(token.colorTextLightSolid).setA(0.25).toRgbString(),
  previewOperationSize: token.fontSizeIcon * 1.5, // FIXME: fontSizeIconLG
});

export default genStyleHooks(
  'Image',
  (token) => {
    const previewCls = `${token.componentCls}-preview`;

    const imageToken = mergeToken<ImageToken>(token, {
      previewCls,
      modalMaskBg: new FastColor('#000').setA(0.45).toRgbString(), // FIXME: Shared Token
      imagePreviewSwitchSize: token.controlHeightLG,
    });

    return [
      genImageStyle(imageToken),
      genImagePreviewStyle(imageToken),
      genModalMaskStyle(mergeToken<ImageToken>(imageToken, { componentCls: previewCls })),
      genPreviewMotion(imageToken),
    ];
  },
  prepareComponentToken,
);
