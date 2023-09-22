import type { ColorMapToken } from '../../interface';
import { TinyColor } from '@ctrl/tinycolor';

export default function genColorMapToken(): ColorMapToken {
  return {
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
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],

    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],

    colorLinkHover: linkColors[4],
    colorLink: linkColors[6],
    colorLinkActive: linkColors[7],

    colorBgMask: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    colorWhite: '#fff',
  };
}
