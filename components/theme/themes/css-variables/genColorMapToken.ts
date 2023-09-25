import type { ColorMapToken } from '../../interface';

export default function genColorMapToken(): ColorMapToken {
  return {
    colorBgBase: 'var(--color-bg-base)',
    colorTextBase: 'var(--color-text-base)',

    colorText: 'var(--color-text)',
    colorTextSecondary: 'var(--color-text-secondary)',
    colorTextTertiary: 'var(--color-text-tertiary)',
    colorTextQuaternary: 'var(--color-text-quaternary)',

    colorFill: 'var(--color-fill)',
    colorFillSecondary: 'var(--color-fill-secondary)',
    colorFillTertiary: 'var(--color-fill-tertiary)',
    colorFillQuaternary: 'var(--color-fill-quaternary)',

    colorBgElevated: 'var(--color-bg-elevated)',
    colorBgContainer: 'var(--color-bg-container)',
    colorBgLayout: 'var(--color-bg-layout)',
    colorBgSpotlight: 'var(--color-bg-spotlight)',
    colorBgBlur: 'var(--color-bg-blur)',

    colorBorder: 'var(--color-border)',
    colorBorderSecondary: 'var(--color-border-secondary)',

    colorPrimaryBg: 'var(--color-primary-bg)',
    colorPrimaryBgHover: 'var(--color-primary-bg-hover)',
    colorPrimaryBorder: 'var(--color-primary-border)',
    colorPrimaryBorderHover: 'var(--color-primary-border-hover)',
    colorPrimaryHover: 'var(--color-primary-hover)',
    colorPrimary: 'var(--color-primary)',
    colorPrimaryActive: 'var(--color-primary-active)',
    colorPrimaryTextHover: 'var(--color-primary-text-hover)',
    colorPrimaryText: 'var(--color-primary-text)',
    colorPrimaryTextActive: 'var(--color-primary-text-active)',

    colorSuccessBg: 'var(--color-success-bg)',
    colorSuccessBgHover: 'var(--color-success-bg-hover)',
    colorSuccessBorder: 'var(--color-success-border)',
    colorSuccessBorderHover: 'var(--color-success-border-hover)',
    colorSuccessHover: 'var(--color-success-hover)',
    colorSuccess: 'var(--color-success)',
    colorSuccessActive: 'var(--color-success-active)',
    colorSuccessTextHover: 'var(--color-success-text-hover)',
    colorSuccessText: 'var(--color-success-text)',
    colorSuccessTextActive: 'var(--color-success-text-active)',

    colorErrorBg: 'var(--color-error-bg)',
    colorErrorBgHover: 'var(--color-error-bg-hover)',
    colorErrorBorder: 'var(--color-error-border)',
    colorErrorBorderHover: 'var(--color-error-border-hover)',
    colorErrorHover: 'var(--color-error-hover)',
    colorError: 'var(--color-error)',
    colorErrorActive: 'var(--color-error-active)',
    colorErrorTextHover: 'var(--color-error-text-hover)',
    colorErrorText: 'var(--color-error-text)',
    colorErrorTextActive: 'var(--color-error-text-active)',

    colorWarningBg: 'var(--color-warning-bg)',
    colorWarningBgHover: 'var(--color-warning-bg-hover)',
    colorWarningBorder: 'var(--color-warning-border)',
    colorWarningBorderHover: 'var(--color-warning-border-hover)',
    colorWarningHover: 'var(--color-warning-hover)',
    colorWarning: 'var(--color-warning)',
    colorWarningActive: 'var(--color-warning-active)',
    colorWarningTextHover: 'var(--color-warning-text-hover)',
    colorWarningText: 'var(--color-warning-text)',
    colorWarningTextActive: 'var(--color-warning-text-active)',

    colorInfoBg: 'var(--color-info-bg)',
    colorInfoBgHover: 'var(--color-info-bg-hover)',
    colorInfoBorder: 'var(--color-info-border)',
    colorInfoBorderHover: 'var(--color-info-border-hover)',
    colorInfoHover: 'var(--color-info-hover)',
    colorInfo: 'var(--color-info)',
    colorInfoActive: 'var(--color-info-active)',
    colorInfoTextHover: 'var(--color-info-text-hover)',
    colorInfoText: 'var(--color-info-text)',
    colorInfoTextActive: 'var(--color-info-text-active)',

    colorLinkHover: 'var(--color-link-hover)',
    colorLink: 'var(--color-link)',
    colorLinkActive: 'var(--color-link-active)',

    colorBgMask: 'var(--color-bg-mask)',
    colorWhite: 'var(--color-white)',
  };
}
