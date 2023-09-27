import type { AliasToken } from '../interface';

type CSSVarMap = {
  [key in keyof AliasToken]?: `--${string}`;
};

const cssVarMap: CSSVarMap = {
  // Map Token
  colorBgBase: '--antd-color-bg-base',
  colorTextBase: '--antd-color-text-base',

  colorText: '--antd-color-text',
  colorTextSecondary: '--antd-color-text-secondary',
  colorTextTertiary: '--antd-color-text-tertiary',
  colorTextQuaternary: '--antd-color-text-quaternary',

  colorFill: '--antd-color-fill',
  colorFillSecondary: '--antd-color-fill-secondary',
  colorFillTertiary: '--antd-color-fill-tertiary',
  colorFillQuaternary: '--antd-color-fill-quaternary',

  colorBgElevated: '--antd-color-bg-elevated',
  colorBgContainer: '--antd-color-bg-container',
  colorBgLayout: '--antd-color-bg-layout',
  colorBgSpotlight: '--antd-color-bg-spotlight',
  colorBgBlur: '--antd-color-bg-blur',

  colorBorder: '--antd-color-border',
  colorBorderSecondary: '--antd-color-border-secondary',

  colorPrimaryBg: '--antd-color-primary-bg',
  colorPrimaryBgHover: '--antd-color-primary-bg-hover',
  colorPrimaryBorder: '--antd-color-primary-border',
  colorPrimaryBorderHover: '--antd-color-primary-border-hover',
  colorPrimaryHover: '--antd-color-primary-hover',
  colorPrimary: '--antd-color-primary',
  colorPrimaryActive: '--antd-color-primary-active',
  colorPrimaryTextHover: '--antd-color-primary-text-hover',
  colorPrimaryText: '--antd-color-primary-text',
  colorPrimaryTextActive: '--antd-color-primary-text-active',

  colorSuccessBg: '--antd-color-success-bg',
  colorSuccessBgHover: '--antd-color-success-bg-hover',
  colorSuccessBorder: '--antd-color-success-border',
  colorSuccessBorderHover: '--antd-color-success-border-hover',
  colorSuccessHover: '--antd-color-success-hover',
  colorSuccess: '--antd-color-success',
  colorSuccessActive: '--antd-color-success-active',
  colorSuccessTextHover: '--antd-color-success-text-hover',
  colorSuccessText: '--antd-color-success-text',
  colorSuccessTextActive: '--antd-color-success-text-active',

  colorErrorBg: '--antd-color-error-bg',
  colorErrorBgHover: '--antd-color-error-bg-hover',
  colorErrorBorder: '--antd-color-error-border',
  colorErrorBorderHover: '--antd-color-error-border-hover',
  colorErrorHover: '--antd-color-error-hover',
  colorError: '--antd-color-error',
  colorErrorActive: '--antd-color-error-active',
  colorErrorTextHover: '--antd-color-error-text-hover',
  colorErrorText: '--antd-color-error-text',
  colorErrorTextActive: '--antd-color-error-text-active',

  colorWarningBg: '--antd-color-warning-bg',
  colorWarningBgHover: '--antd-color-warning-bg-hover',
  colorWarningBorder: '--antd-color-warning-border',
  colorWarningBorderHover: '--antd-color-warning-border-hover',
  colorWarningHover: '--antd-color-warning-hover',
  colorWarning: '--antd-color-warning',
  colorWarningActive: '--antd-color-warning-active',
  colorWarningTextHover: '--antd-color-warning-text-hover',
  colorWarningText: '--antd-color-warning-text',
  colorWarningTextActive: '--antd-color-warning-text-active',

  colorInfoBg: '--antd-color-info-bg',
  colorInfoBgHover: '--antd-color-info-bg-hover',
  colorInfoBorder: '--antd-color-info-border',
  colorInfoBorderHover: '--antd-color-info-border-hover',
  colorInfoHover: '--antd-color-info-hover',
  colorInfo: '--antd-color-info',
  colorInfoActive: '--antd-color-info-active',
  colorInfoTextHover: '--antd-color-info-text-hover',
  colorInfoText: '--antd-color-info-text',
  colorInfoTextActive: '--antd-color-info-text-active',

  colorLinkHover: '--antd-color-link-hover',
  colorLink: '--antd-color-link',
  colorLinkActive: '--antd-color-link-active',

  colorBgMask: '--antd-color-bg-mask',
  colorWhite: '--antd-color-white',

  // Alias Token
  colorFillContent: '--antd-color-fill-content',
  colorFillContentHover: '--antd-color-fill-content-hover',
  colorFillAlter: '--antd-color-fill-alter',
  colorBgContainerDisabled: '--antd-color-bg-container-disabled',

  colorBorderBg: '--antd-color-border-bg',
  colorSplit: '--antd-color-split',

  colorTextPlaceholder: '--antd-color-text-placeholder',
  colorTextDisabled: '--antd-color-text-disabled',
  colorTextHeading: '--antd-color-text-heading',
  colorTextLabel: '--antd-color-text-label',
  colorTextDescription: '--antd-color-text-description',
  colorTextLightSolid: '--antd-color-text-light-solid',
  colorHighlight: '--antd-color-highlight',
  colorBgTextHover: '--antd-color-bg-text-hover',
  colorBgTextActive: '--antd-color-bg-text-active',

  colorIcon: '--antd-color-icon',
  colorIconHover: '--antd-color-icon-hover',

  colorErrorOutline: '--antd-color-error-outline',
  colorWarningOutline: '--antd-color-warning-outline',

  controlItemBgHover: '--antd-control-item-bg-hover',
  controlItemBgActive: '--antd-control-item-bg-active',
  controlItemBgActiveHover: '--antd-control-item-bg-active-hover',
  controlItemBgActiveDisabled: '--antd-control-item-bg-active-disabled',
  controlTmpOutline: '--antd-control-tmp-outline',
  controlOutline: '--antd-control-outline',
};

export default cssVarMap;
