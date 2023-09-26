import type { ColorMapToken, MapToken } from '../../interface';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';

const cssVariablesMap: Record<keyof ColorMapToken, string> = {
  colorBgBase: '--color-bg-base',
  colorTextBase: '--color-text-base',

  colorText: '--color-text',
  colorTextSecondary: '--color-text-secondary',
  colorTextTertiary: '--color-text-tertiary',
  colorTextQuaternary: '--color-text-quaternary',

  colorFill: '--color-fill',
  colorFillSecondary: '--color-fill-secondary',
  colorFillTertiary: '--color-fill-tertiary',
  colorFillQuaternary: '--color-fill-quaternary',

  colorBgElevated: '--color-bg-elevated',
  colorBgContainer: '--color-bg-container',
  colorBgLayout: '--color-bg-layout',
  colorBgSpotlight: '--color-bg-spotlight',
  colorBgBlur: '--color-bg-blur',

  colorBorder: '--color-border',
  colorBorderSecondary: '--color-border-secondary',

  colorPrimaryBg: '--color-primary-bg',
  colorPrimaryBgHover: '--color-primary-bg-hover',
  colorPrimaryBorder: '--color-primary-border',
  colorPrimaryBorderHover: '--color-primary-border-hover',
  colorPrimaryHover: '--color-primary-hover',
  colorPrimary: '--color-primary',
  colorPrimaryActive: '--color-primary-active',
  colorPrimaryTextHover: '--color-primary-text-hover',
  colorPrimaryText: '--color-primary-text',
  colorPrimaryTextActive: '--color-primary-text-active',

  colorSuccessBg: '--color-success-bg',
  colorSuccessBgHover: '--color-success-bg-hover',
  colorSuccessBorder: '--color-success-border',
  colorSuccessBorderHover: '--color-success-border-hover',
  colorSuccessHover: '--color-success-hover',
  colorSuccess: '--color-success',
  colorSuccessActive: '--color-success-active',
  colorSuccessTextHover: '--color-success-text-hover',
  colorSuccessText: '--color-success-text',
  colorSuccessTextActive: '--color-success-text-active',

  colorErrorBg: '--color-error-bg',
  colorErrorBgHover: '--color-error-bg-hover',
  colorErrorBorder: '--color-error-border',
  colorErrorBorderHover: '--color-error-border-hover',
  colorErrorHover: '--color-error-hover',
  colorError: '--color-error',
  colorErrorActive: '--color-error-active',
  colorErrorTextHover: '--color-error-text-hover',
  colorErrorText: '--color-error-text',
  colorErrorTextActive: '--color-error-text-active',

  colorWarningBg: '--color-warning-bg',
  colorWarningBgHover: '--color-warning-bg-hover',
  colorWarningBorder: '--color-warning-border',
  colorWarningBorderHover: '--color-warning-border-hover',
  colorWarningHover: '--color-warning-hover',
  colorWarning: '--color-warning',
  colorWarningActive: '--color-warning-active',
  colorWarningTextHover: '--color-warning-text-hover',
  colorWarningText: '--color-warning-text',
  colorWarningTextActive: '--color-warning-text-active',

  colorInfoBg: '--color-info-bg',
  colorInfoBgHover: '--color-info-bg-hover',
  colorInfoBorder: '--color-info-border',
  colorInfoBorderHover: '--color-info-border-hover',
  colorInfoHover: '--color-info-hover',
  colorInfo: '--color-info',
  colorInfoActive: '--color-info-active',
  colorInfoTextHover: '--color-info-text-hover',
  colorInfoText: '--color-info-text',
  colorInfoTextActive: '--color-info-text-active',

  colorLinkHover: '--color-link-hover',
  colorLink: '--color-link',
  colorLinkActive: '--color-link-active',

  colorBgMask: '--color-bg-mask',
  colorWhite: '--color-white',
};

export default function genColorMapToken(token: MapToken): ColorMapToken {
  updateCSS(
    `:root {
  ${Object.entries(cssVariablesMap)
    .map(([key, value]: [keyof ColorMapToken, string]) => `${value}: ${token[key]};`)
    .join('\n')}
}`,
    'antd-css-variables',
  );

  return Object.entries(cssVariablesMap).reduce<Record<keyof ColorMapToken, string>>(
    (acc, [key, value]: [keyof ColorMapToken, string]) => {
      acc[key] = `var(${value})`;
      return acc;
    },
    {} as Record<keyof ColorMapToken, string>,
  );
}
