---
name: Ant Design
description: Enterprise-grade React UI design system from Ant Group, built around the values Natural, Certain, Meaningful, and Growing.
colors:
  primary: '#1677FF'
  success: '#52C41A'
  warning: '#FAAD14'
  error: '#FF4D4F'
  info: '#1677FF'
  blue: '#1677FF'
  purple: '#722ED1'
  cyan: '#13C2C2'
  green: '#52C41A'
  magenta: '#EB2F96'
  red: '#F5222D'
  orange: '#FA8C16'
  yellow: '#FADB14'
  volcano: '#FA541C'
  geekblue: '#2F54EB'
  gold: '#FAAD14'
  lime: '#A0D911'
  surface: '#FFFFFF'
  surface-container: '#FAFAFA'
  surface-layout: '#F5F5F5'
  on-surface: '#1F1F1F'
  on-surface-variant: '#595959'
  on-surface-disabled: '#BFBFBF'
  outline: '#D9D9D9'
  outline-variant: '#F0F0F0'
typography:
  display-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
  headline-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 20px
  code:
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  none: 0px
  sm: 2px
  md: 4px
  DEFAULT: 6px
  lg: 8px
  xl: 16px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  control-height: 32px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '#FFFFFF'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 15px
  button-primary-hover:
    backgroundColor: '#4096FF'
  button-primary-active:
    backgroundColor: '#0958D9'
  button-default:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 15px
  button-default-hover:
    textColor: '#4096FF'
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 4px 11px
  input-field-focus:
    backgroundColor: '{colors.surface}'
  select-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 11px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 24px
  modal:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 20px 24px
  menu-item-selected:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.primary}'
    typography: '{typography.body-md}'
  tabs-tab-active:
    textColor: '{colors.primary}'
    typography: '{typography.body-md}'
  table-header:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    padding: 16px
  tag:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
  tooltip:
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
    textColor: '#FFFFFF'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    padding: 6px 8px
  dropdown-item-hover:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
---
