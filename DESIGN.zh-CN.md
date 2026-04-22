---
name: 'Ant Design'
description: 'Enterprise-class UI design language and React component library'
themeConfig:
  antdVersion: '6.x'
  provider: 'ConfigProvider'
  algorithm:
    - 'default'
    - 'dark'
    - 'compact'
  customizable: 'true'
  tokenLayers:
    - 'seed'
    - 'map'
    - 'alias'
    - 'component'
  cssVar: 'true'
  cssVarPrefix: '--ant'
fonts:
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
  code: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
colors:
  # Brand
  primary: '#1677ff'
  primary-hover: '#4096ff'
  primary-active: '#0958d9'
  primary-bg: '#e6f4ff'
  primary-bg-hover: '#bae0ff'
  primary-border: '#91caff'
  primary-border-hover: '#69b1ff'
  primary-text: '#1677ff'
  primary-text-hover: '#4096ff'
  primary-text-active: '#0958d9'
  # Functional
  error: '#ff4d4f'
  error-hover: '#ff7875'
  error-active: '#d9363e'
  error-bg: '#fff2f0'
  error-border: '#ffccc7'
  error-text: '#ff4d4f'
  warning: '#faad14'
  warning-hover: '#ffd666'
  warning-active: '#d48806'
  warning-bg: '#fffbe6'
  warning-border: '#ffe58f'
  warning-text: '#faad14'
  success: '#52c41a'
  success-hover: '#95de64'
  success-active: '#389e0d'
  success-bg: '#f6ffed'
  success-border: '#b7eb8f'
  success-text: '#52c41a'
  info: '#1677ff'
  info-hover: '#69b1ff'
  info-active: '#0958d9'
  info-bg: '#e6f4ff'
  info-border: '#91caff'
  info-text: '#1677ff'
  # Text
  text: 'rgba(0,0,0,0.88)'
  text-secondary: 'rgba(0,0,0,0.65)'
  text-tertiary: 'rgba(0,0,0,0.45)'
  text-quaternary: 'rgba(0,0,0,0.25)'
  text-light-solid: '#fff'
  text-heading: 'rgba(0,0,0,0.88)'
  text-label: 'rgba(0,0,0,0.65)'
  text-description: 'rgba(0,0,0,0.45)'
  text-disabled: 'rgba(0,0,0,0.25)'
  text-placeholder: 'rgba(0,0,0,0.25)'
  # Background
  bg-container: '#ffffff'
  bg-elevated: '#ffffff'
  bg-layout: '#f5f5f5'
  bg-spotlight: 'rgba(0,0,0,0.85)'
  bg-mask: 'rgba(0,0,0,0.45)'
  # Border
  border: '#d9d9d9'
  border-secondary: '#f0f0f0'
  border-disabled: '#d9d9d9'
  # Fill
  fill: 'rgba(0,0,0,0.15)'
  fill-secondary: 'rgba(0,0,0,0.06)'
  fill-tertiary: 'rgba(0,0,0,0.04)'
  fill-quaternary: 'rgba(0,0,0,0.02)'
  fill-content: 'rgba(0,0,0,0.06)'
  fill-content-hover: 'rgba(0,0,0,0.15)'
  fill-alter: 'rgba(0,0,0,0.02)'
  # Link
  link: '#1677ff'
  link-hover: '#69b1ff'
  link-active: '#0958d9'
  # Highlight
  highlight: '#ff4d4f'
  # Icon
  icon: 'rgba(0,0,0,0.45)'
  icon-hover: 'rgba(0,0,0,0.88)'
  # Control
  control-item-bg-hover: 'rgba(0,0,0,0.04)'
  control-item-bg-active: '#e6f4ff'
  control-item-bg-active-hover: '#bae0ff'
typography:
  heading-1:
    fontFamily: '{fonts.sans}'
    fontSize: '38px'
    fontWeight: '700'
    lineHeight: '1.2105263157894737'
  heading-2:
    fontFamily: '{fonts.sans}'
    fontSize: '30px'
    fontWeight: '600'
    lineHeight: '1.2666666666666666'
  heading-3:
    fontFamily: '{fonts.sans}'
    fontSize: '24px'
    fontWeight: '600'
    lineHeight: '1.3333333333333333'
  heading-4:
    fontFamily: '{fonts.sans}'
    fontSize: '20px'
    fontWeight: '600'
    lineHeight: '1.4'
  heading-5:
    fontFamily: '{fonts.sans}'
    fontSize: '16px'
    fontWeight: '600'
    lineHeight: '1.5'
  body-lg:
    fontFamily: '{fonts.sans}'
    fontSize: '16px'
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: '{fonts.sans}'
    fontSize: '14px'
    fontWeight: '400'
    lineHeight: '1.5714285714285714'
  body-sm:
    fontFamily: '{fonts.sans}'
    fontSize: '12px'
    fontWeight: '400'
    lineHeight: '1.6666666666666667'
  label-lg:
    fontFamily: '{fonts.sans}'
    fontSize: '16px'
    fontWeight: '600'
    lineHeight: '1.5'
  label-md:
    fontFamily: '{fonts.sans}'
    fontSize: '14px'
    fontWeight: '600'
    lineHeight: '1.5714285714285714'
  label-sm:
    fontFamily: '{fonts.sans}'
    fontSize: '12px'
    fontWeight: '600'
    lineHeight: '1.6666666666666667'
rounded:
  none: '0px'
  xs: '2px'
  sm: '4px'
  DEFAULT: '6px'
  lg: '8px'
  xl: '12px'
spacing:
  xxs: '4px'
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  xxl: '48px'
motion:
  duration-fast: '0.1s'
  duration-mid: '0.2s'
  duration-slow: '0.3s'
  ease-in-out: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
  ease-out: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
  ease-in-back: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)'
  ease-out-back: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)'
  ease-out-circ: 'cubic-bezier(0.08, 0.82, 0.17, 1)'
  ease-in-out-circ: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)'
  ease-out-quint: 'cubic-bezier(0.23, 1, 0.32, 1)'
  ease-in-quint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
shadows:
  default: '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)'
  secondary: '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)'
  tertiary: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)'
  card: '0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 12px 4px rgba(0,0,0,0.09)'
components:
  alert:
    with-description-icon-size: '{typography.heading-3}'
    default-padding: '8px 12px'
    with-description-padding: '20px 24px'
  avatar:
    container-size: '32px'
    container-size-lg: '40px'
    container-size-sm: '{typography.heading-3}'
    text-font-size: '{typography.label-md}'
    text-font-size-lg: '{typography.label-md}'
    text-font-size-sm: '{typography.label-md}'
    icon-font-size: '18px'
    icon-font-size-lg: '{typography.heading-3}'
    icon-font-size-sm: '{typography.label-md}'
    group-space: '{rounded.sm}'
    group-overlapping: '-8px'
    group-border-color: '{colors.bg-container}'
  badge:
    indicator-zindex: 'auto'
    indicator-height: '{typography.heading-4}'
    indicator-height-sm: '{typography.label-md}'
    dot-size: '{rounded.DEFAULT}'
    text-font-size: '{rounded.xl}'
    text-font-size-sm: '{rounded.xl}'
    text-font-weight: 'normal'
    status-size: '{rounded.DEFAULT}'
  breadcrumb:
    item-color: '{colors.icon}'
    last-item-color: '{colors.icon-hover}'
    icon-font-size: '{typography.label-md}'
    link-color: '{colors.icon}'
    link-hover-color: '{colors.icon-hover}'
    separator-color: '{colors.icon}'
    separator-margin: '{rounded.lg}'
  button:
    blue-shadow-color: '0 2px 0 rgba(5,145,255,0.1)'
    purple-shadow-color: '0 2px 0 rgba(155,5,255,0.06)'
    cyan-shadow-color: '0 2px 0 rgba(5,255,215,0.1)'
    green-shadow-color: '0 2px 0 rgba(142,255,30,0.08)'
    magenta-shadow-color: '0 2px 0 rgba(255,5,105,0.06)'
    pink-shadow-color: '0 2px 0 rgba(255,5,105,0.06)'
    red-shadow-color: '0 2px 0 rgba(255,22,5,0.06)'
    orange-shadow-color: '0 2px 0 rgba(255,175,5,0.1)'
    yellow-shadow-color: '0 2px 0 rgba(245,255,5,0.1)'
    volcano-shadow-color: '0 2px 0 rgba(255,125,25,0.1)'
    geekblue-shadow-color: '0 2px 0 rgba(5,88,255,0.06)'
    lime-shadow-color: '0 2px 0 rgba(225,255,5,0.1)'
    gold-shadow-color: '0 2px 0 rgba(255,215,5,0.1)'
    font-weight: '400'
    icon-gap: '{rounded.lg}'
    default-shadow: '0 2px 0 rgba(0,0,0,0.02)'
    primary-shadow: '0 2px 0 rgba(5,145,255,0.1)'
    danger-shadow: '0 2px 0 rgba(255,38,5,0.06)'
    primary-color: '{colors.text-light-solid}'
    danger-color: '{colors.text-light-solid}'
    border-color-disabled: '{colors.border-disabled}'
    default-ghost-color: '{colors.bg-container}'
    ghost-bg: 'transparent'
    default-ghost-border-color: '{colors.bg-container}'
    padding-inline: '15px'
    padding-inline-lg: '15px'
    padding-inline-sm: '7px'
    only-icon-size: 'inherit'
    only-icon-size-sm: 'inherit'
    only-icon-size-lg: 'inherit'
    group-border-color: '{colors.primary-hover}'
    link-hover-bg: 'transparent'
    text-text-color: '{colors.icon-hover}'
    text-text-hover-color: '{colors.icon-hover}'
    text-text-active-color: '{colors.icon-hover}'
    text-hover-bg: '{colors.control-item-bg-hover}'
    default-color: '{colors.icon-hover}'
    default-bg: '{colors.bg-container}'
    default-border-color: '{colors.border-disabled}'
    default-border-color-disabled: '{colors.border-disabled}'
    default-hover-bg: '{colors.bg-container}'
    default-hover-color: '{colors.primary-hover}'
    default-hover-border-color: '{colors.primary-hover}'
    default-active-bg: '{colors.bg-container}'
    default-active-color: '{colors.primary-active}'
    default-active-border-color: '{colors.primary-active}'
    solid-text-color: '{colors.text-light-solid}'
    content-font-size: '{typography.label-md}'
    content-font-size-sm: '{typography.label-md}'
    content-font-size-lg: '{typography.label-lg}'
    content-line-height: '1.5714285714285714'
    content-line-height-sm: '1.5714285714285714'
    content-line-height-lg: '1.5'
    padding-block: '{rounded.sm}'
    padding-block-sm: '{rounded.none}'
    padding-block-lg: '7px'
    default-bg-disabled: '{colors.control-item-bg-hover}'
    dashed-bg-disabled: '{colors.control-item-bg-hover}'
  card:
    header-bg: 'transparent'
    header-font-size: '{typography.label-lg}'
    header-font-size-sm: '{typography.label-md}'
    header-height: '56px'
    header-height-sm: '{typography.heading-1}'
    actions-bg: '{colors.bg-container}'
    actions-li-margin: '12px 0'
    tabs-margin-bottom: '-17px'
    extra-color: '{colors.icon-hover}'
    body-padding-sm: '{rounded.xl}'
    header-padding-sm: '{rounded.xl}'
    body-padding: '{typography.heading-3}'
    header-padding: '{typography.heading-3}'
  checkbox: {}
  collapse:
    header-padding: '12px 16px'
    header-bg: '{colors.fill-quaternary}'
    content-padding: '16px 16px'
    content-bg: '{colors.bg-container}'
    borderless-content-padding: '4px 16px 16px'
    borderless-content-bg: 'transparent'
  date-picker:
    padding-block: '{rounded.sm}'
    padding-block-sm: '{rounded.none}'
    padding-block-lg: '7px'
    padding-inline: '11px'
    padding-inline-sm: '7px'
    padding-inline-lg: '11px'
    addon-bg: '{colors.fill-quaternary}'
    active-border-color: '{colors.info-text}'
    hover-border-color: '{colors.primary-hover}'
    active-shadow: '0 0 0 2px rgba(5,145,255,0.1)'
    error-active-shadow: '0 0 0 2px rgba(255,38,5,0.06)'
    warning-active-shadow: '0 0 0 2px rgba(255,215,5,0.1)'
    hover-bg: '{colors.bg-container}'
    active-bg: '{colors.bg-container}'
    input-font-size: '{typography.label-md}'
    input-font-size-lg: '{typography.label-lg}'
    input-font-size-sm: '{typography.label-md}'
    cell-hover-bg: '{colors.control-item-bg-hover}'
    cell-active-with-range-bg: '{colors.control-item-bg-active}'
    cell-hover-with-range-bg: '#cbe0fd'
    cell-range-border-color: '#82b4f9'
    cell-bg-disabled: '{colors.control-item-bg-hover}'
    time-column-width: '56px'
    time-column-height: '224px'
    time-cell-height: '28px'
    cell-width: '36px'
    cell-height: '{typography.heading-3}'
    text-height: '40px'
    without-time-cell-height: '66px'
    multiple-item-bg: '{colors.fill-secondary}'
    multiple-item-border-color: 'transparent'
    multiple-item-height: '{typography.heading-3}'
    multiple-item-height-sm: '{typography.label-lg}'
    multiple-item-height-lg: '32px'
    multiple-selector-bg-disabled: '{colors.control-item-bg-hover}'
    multiple-item-color-disabled: '{colors.text-disabled}'
    multiple-item-border-color-disabled: 'transparent'
    arrow-shadow-width: '8.970562748477143px'
    presets-width: '120px'
    presets-max-width: '200px'
  drawer:
    footer-padding-block: '{rounded.lg}'
    footer-padding-inline: '{typography.label-lg}'
    dragger-size: '{rounded.sm}'
  dropdown:
    padding-block: '5px'
    arrow-offset-horizontal: '{rounded.xl}'
    arrow-offset-vertical: '{rounded.lg}'
    arrow-shadow-width: '8.970562748477143px'
  form:
    label-required-mark-color: '{colors.highlight}'
    label-color: '{colors.icon-hover}'
    label-font-size: '{typography.label-md}'
    label-height: '32px'
    label-colon-margin-inline-start: '{rounded.xs}'
    label-colon-margin-inline-end: '{rounded.lg}'
    item-margin-bottom: '{typography.heading-3}'
    vertical-label-padding: '0 0 8px'
    vertical-label-margin: '{rounded.none}'
    inline-item-margin-bottom: '{rounded.none}'
  input:
    padding-block: '{rounded.sm}'
    padding-block-sm: '{rounded.none}'
    padding-block-lg: '7px'
    padding-inline: '11px'
    padding-inline-sm: '7px'
    padding-inline-lg: '11px'
    addon-bg: '{colors.fill-quaternary}'
    active-border-color: '{colors.info-text}'
    hover-border-color: '{colors.primary-hover}'
    active-shadow: '0 0 0 2px rgba(5,145,255,0.1)'
    error-active-shadow: '0 0 0 2px rgba(255,38,5,0.06)'
    warning-active-shadow: '0 0 0 2px rgba(255,215,5,0.1)'
    hover-bg: '{colors.bg-container}'
    active-bg: '{colors.bg-container}'
    input-font-size: '{typography.label-md}'
    input-font-size-lg: '{typography.label-lg}'
    input-font-size-sm: '{typography.label-md}'
  menu:
    dropdown-width: '160px'
    radius-item: '{rounded.lg}'
    item-border-radius: '{rounded.lg}'
    radius-sub-menu-item: '{rounded.sm}'
    sub-menu-item-border-radius: '{rounded.sm}'
    color-item-text: '{colors.icon-hover}'
    item-color: '{colors.icon-hover}'
    color-item-text-hover: '{colors.icon-hover}'
    item-hover-color: '{colors.icon-hover}'
    color-item-text-hover-horizontal: '{colors.info-text}'
    horizontal-item-hover-color: '{colors.info-text}'
    color-group-title: '{colors.icon}'
    group-title-color: '{colors.icon}'
    color-item-text-selected: '{colors.info-text}'
    item-selected-color: '{colors.info-text}'
    sub-menu-item-selected-color: '{colors.info-text}'
    color-item-text-selected-horizontal: '{colors.info-text}'
    horizontal-item-selected-color: '{colors.info-text}'
    color-item-bg: '{colors.bg-container}'
    item-bg: '{colors.bg-container}'
    color-item-bg-hover: '{colors.fill-secondary}'
    item-hover-bg: '{colors.fill-secondary}'
    color-item-bg-active: '{colors.fill-secondary}'
    item-active-bg: '{colors.control-item-bg-active}'
    color-sub-item-bg: '{colors.fill-quaternary}'
    sub-menu-item-bg: '{colors.fill-quaternary}'
    color-item-bg-selected: '{colors.control-item-bg-active}'
    item-selected-bg: '{colors.control-item-bg-active}'
    color-item-bg-selected-horizontal: 'transparent'
    horizontal-item-selected-bg: 'transparent'
    color-active-bar-width: '{rounded.none}'
    active-bar-width: '{rounded.none}'
    color-active-bar-height: '{rounded.xs}'
    active-bar-height: '{rounded.xs}'
    color-active-bar-border-size: '1px'
    active-bar-border-width: '1px'
    color-item-text-disabled: '{colors.text-disabled}'
    item-disabled-color: '{colors.text-disabled}'
    color-danger-item-text: '{colors.highlight}'
    danger-item-color: '{colors.highlight}'
    color-danger-item-text-hover: '{colors.highlight}'
    danger-item-hover-color: '{colors.highlight}'
    color-danger-item-text-selected: '{colors.highlight}'
    danger-item-selected-color: '{colors.highlight}'
    color-danger-item-bg-active: '{colors.error-bg}'
    danger-item-active-bg: '{colors.error-bg}'
    color-danger-item-bg-selected: '{colors.error-bg}'
    danger-item-selected-bg: '{colors.error-bg}'
    item-margin-inline: '{rounded.sm}'
    horizontal-item-border-radius: '{rounded.none}'
    horizontal-item-hover-bg: 'transparent'
    item-height: '40px'
    group-title-line-height: '1.5714285714285714'
    collapsed-width: '80px'
    popup-bg: '{colors.bg-container}'
    item-margin-block: '{rounded.sm}'
    item-padding-inline: '{typography.label-lg}'
    horizontal-line-height: '46px'
    icon-size: '{typography.label-md}'
    icon-margin-inline-end: '10px'
    collapsed-icon-size: '{typography.label-lg}'
    group-title-font-size: '{typography.label-md}'
    item-width: 'calc(100% - 8px)'
  modal:
    footer-bg: 'transparent'
    header-bg: 'transparent'
    title-line-height: '1.5'
    title-font-size: '{typography.label-lg}'
    content-bg: '{colors.bg-container}'
    title-color: '{colors.icon-hover}'
    content-padding: '{rounded.none}'
    header-padding: '16px 24px'
    header-border-bottom: '1px solid rgba(5,5,5,0.06)'
    header-margin-bottom: '{rounded.none}'
    body-padding: '{typography.heading-3}'
    footer-padding: '8px 16px'
    footer-border-top: '1px solid rgba(5,5,5,0.06)'
    footer-border-radius: '0 0 8px 8px'
    footer-margin-top: '{rounded.none}'
    confirm-body-padding: '32px 32px 24px'
    confirm-icon-margin-inline-end: '{typography.label-lg}'
    confirm-btns-margin-top: '{typography.heading-3}'
    mask: 'true'
  notification:
    width: '384px'
    progress-bg: 'linear-gradient(90deg, #69b1ff, #1677ff)'
  pagination:
    item-bg: '{colors.bg-container}'
    item-size: '32px'
    item-size-sm: '{typography.heading-3}'
    item-size-lg: '40px'
    item-active-bg: '{colors.bg-container}'
    item-active-color: '{colors.info-text}'
    item-active-color-hover: '{colors.primary-hover}'
    item-link-bg: '{colors.bg-container}'
    item-active-color-disabled: '{colors.text-disabled}'
    item-active-bg-disabled: '{colors.fill}'
    item-input-bg: '{colors.bg-container}'
    mini-options-size-changer-top: '{rounded.none}'
    padding-block: '{rounded.sm}'
    padding-block-sm: '{rounded.none}'
    padding-block-lg: '7px'
    padding-inline: '11px'
    padding-inline-sm: '7px'
    padding-inline-lg: '11px'
    addon-bg: '{colors.fill-quaternary}'
    active-border-color: '{colors.info-text}'
    hover-border-color: '{colors.primary-hover}'
    active-shadow: '0 0 0 2px rgba(5,145,255,0.1)'
    error-active-shadow: '0 0 0 2px rgba(255,38,5,0.06)'
    warning-active-shadow: '0 0 0 2px rgba(255,215,5,0.1)'
    hover-bg: '{colors.bg-container}'
    active-bg: '{colors.bg-container}'
    input-font-size: '{typography.label-md}'
    input-font-size-lg: '{typography.label-lg}'
    input-font-size-sm: '{typography.label-md}'
  popover:
    title-min-width: '177px'
    arrow-shadow-width: '8.970562748477143px'
    arrow-offset-horizontal: '{rounded.xl}'
    arrow-offset-vertical: '{rounded.lg}'
    inner-padding: '{rounded.none}'
    title-margin-bottom: '{rounded.none}'
    title-padding: '5px 16px 4px'
    title-border-bottom: '1px solid rgba(5,5,5,0.06)'
    inner-content-padding: '12px 16px'
  progress:
    circle-text-color: '{colors.icon-hover}'
    default-color: '{colors.info-text}'
    remaining-color: '{colors.fill-secondary}'
    line-border-radius: '100px'
    circle-text-font-size: '1em'
    circle-icon-font-size: '1.1666666666666667em'
  radio:
    radio-size: '{typography.label-lg}'
    dot-size: '{rounded.lg}'
    dot-color-disabled: '{colors.text-disabled}'
    button-solid-checked-color: '{colors.text-light-solid}'
    button-solid-checked-bg: '{colors.info-text}'
    button-solid-checked-hover-bg: '{colors.primary-hover}'
    button-solid-checked-active-bg: '{colors.primary-active}'
    button-bg: '{colors.bg-container}'
    button-checked-bg: '{colors.bg-container}'
    button-color: '{colors.icon-hover}'
    button-checked-bg-disabled: '{colors.fill}'
    button-checked-color-disabled: '{colors.text-disabled}'
    button-padding-inline: '15px'
    wrapper-margin-inline-end: '{rounded.lg}'
    radio-color: '{colors.info-text}'
    radio-bg-color: '{colors.bg-container}'
  select:
    option-selected-color: '{colors.icon-hover}'
    option-selected-font-weight: '600'
    option-selected-bg: '{colors.control-item-bg-active}'
    option-active-bg: '{colors.control-item-bg-hover}'
    option-padding: '5px 12px'
    option-font-size: '{typography.label-md}'
    option-line-height: '1.5714285714285714'
    option-height: '32px'
    selector-bg: '{colors.bg-container}'
    clear-bg: '{colors.bg-container}'
    single-item-height-lg: '40px'
    multiple-item-bg: '{colors.fill-secondary}'
    multiple-item-border-color: 'transparent'
    multiple-item-height: '{typography.heading-3}'
    multiple-item-height-sm: '{typography.label-lg}'
    multiple-item-height-lg: '32px'
    multiple-selector-bg-disabled: '{colors.control-item-bg-hover}'
    multiple-item-color-disabled: '{colors.text-disabled}'
    multiple-item-border-color-disabled: 'transparent'
    show-arrow-padding-inline-end: '18px'
    hover-border-color: '{colors.primary-hover}'
    active-border-color: '{colors.info-text}'
    active-outline-color: 'rgba(5,145,255,0.1)'
    select-affix-padding: '{rounded.sm}'
  slider:
    control-size: '10px'
    rail-size: '{rounded.sm}'
    handle-size: '10px'
    handle-size-hover: '{rounded.xl}'
    dot-size: '{rounded.lg}'
    handle-line-width: '{rounded.xs}'
    handle-line-width-hover: '2.5px'
    rail-bg: '{colors.control-item-bg-hover}'
    rail-hover-bg: '{colors.fill-secondary}'
    track-bg: '{colors.info-border}'
    track-hover-bg: '{colors.link-hover}'
    handle-color: '{colors.info-border}'
    handle-active-color: '{colors.info-text}'
    handle-active-outline-color: 'rgba(22,119,255,0.2)'
    handle-color-disabled: '#bfbfbf'
    dot-border-color: '{colors.border-secondary}'
    dot-active-border-color: '{colors.info-border}'
    track-bg-disabled: '{colors.control-item-bg-hover}'
  steps:
    title-line-height: '32px'
    custom-icon-size: '32px'
    custom-icon-top: '{rounded.none}'
    custom-icon-font-size: '{typography.heading-3}'
    icon-size: '32px'
    icon-top: '-0.5px'
    icon-font-size: '{typography.label-md}'
    icon-size-sm: '{typography.heading-3}'
    dot-size: '{rounded.lg}'
    dot-current-size: '10px'
    nav-arrow-color: '{colors.text-disabled}'
    nav-content-max-width: 'unset'
    wait-icon-color: '{colors.text-disabled}'
    wait-icon-bg-color: '{colors.bg-container}'
    wait-icon-border-color: '{colors.text-disabled}'
    finish-icon-bg-color: '{colors.bg-container}'
    finish-icon-border-color: '{colors.info-text}'
  switch:
    track-height: '22px'
    track-height-sm: '{typography.label-lg}'
    track-min-width: '44px'
    track-min-width-sm: '28px'
    track-padding: '{rounded.xs}'
    handle-bg: '{colors.text-light-solid}'
    handle-size: '18px'
    handle-size-sm: '{rounded.xl}'
    handle-shadow: '0 2px 4px 0 rgba(0,35,11,0.2)'
    inner-min-margin: '9px'
    inner-max-margin: '{typography.heading-3}'
    inner-min-margin-sm: '{rounded.DEFAULT}'
    inner-max-margin-sm: '18px'
  table:
    header-bg: '#fafafa'
    header-color: '{colors.icon-hover}'
    header-sort-active-bg: '{colors.border-secondary}'
    header-sort-hover-bg: '{colors.border-secondary}'
    body-sort-bg: '#fafafa'
    row-hover-bg: '#fafafa'
    row-selected-bg: '{colors.control-item-bg-active}'
    row-selected-hover-bg: '{colors.control-item-bg-active-hover}'
    row-expanded-bg: '{colors.fill-quaternary}'
    cell-padding-block: '{typography.label-lg}'
    cell-padding-inline: '{typography.label-lg}'
    cell-padding-block-md: '{rounded.xl}'
    cell-padding-inline-md: '{rounded.lg}'
    cell-padding-block-sm: '{rounded.lg}'
    cell-padding-inline-sm: '{rounded.lg}'
    border-color: '{colors.border-secondary}'
    header-border-radius: '{rounded.lg}'
    footer-bg: '#fafafa'
    footer-color: '{colors.icon-hover}'
    cell-font-size: '{typography.label-md}'
    cell-font-size-md: '{typography.label-md}'
    cell-font-size-sm: '{typography.label-md}'
    header-split-color: '{colors.border-secondary}'
    fixed-header-sort-active-bg: '{colors.border-secondary}'
    header-filter-hover-bg: '{colors.fill-secondary}'
    filter-dropdown-menu-bg: '{colors.bg-container}'
    filter-dropdown-bg: '{colors.bg-container}'
    expand-icon-bg: '{colors.bg-container}'
    selection-column-width: '32px'
    sticky-scroll-bar-bg: '{colors.text-disabled}'
    sticky-scroll-bar-border-radius: '100px'
    expand-icon-margin-top: '2.5px'
    header-icon-color: 'rgba(0,0,0,0.29250000000000004)'
    header-icon-hover-color: 'rgba(0,0,0,0.5720000000000001)'
    expand-icon-half-inner: '7px'
    expand-icon-size: '17px'
    expand-icon-scale: '0.9411764705882353'
  tabs:
    card-bg: '{colors.fill-quaternary}'
    card-height: '40px'
    card-height-sm: '32px'
    card-height-lg: '48px'
    card-padding: '8px 16px'
    card-padding-sm: '4px 8px'
    card-padding-lg: '11px 16px'
    title-font-size: '{typography.label-md}'
    title-font-size-lg: '{typography.label-lg}'
    title-font-size-sm: '{typography.label-md}'
    ink-bar-color: '{colors.info-text}'
    horizontal-margin: '0 0 16px 0'
    horizontal-item-gutter: '32px'
    horizontal-item-margin: ''
    horizontal-item-margin-rtl: ''
    horizontal-item-padding: '12px 0'
    horizontal-item-padding-sm: '8px 0'
    horizontal-item-padding-lg: '16px 0'
    vertical-item-padding: '8px 24px'
    vertical-item-margin: '16px 0 0 0'
    item-color: '{colors.icon-hover}'
    item-selected-color: '{colors.info-text}'
    item-hover-color: '{colors.primary-hover}'
    item-active-color: '{colors.primary-active}'
    card-gutter: '{rounded.xs}'
  tag:
    default-bg: '{colors.bg-layout}'
    default-color: '{colors.icon-hover}'
    solid-text-color: '{colors.text-light-solid}'
  tooltip:
    max-width: '250px'
    arrow-offset-horizontal: '{rounded.xl}'
    arrow-offset-vertical: '{rounded.lg}'
    arrow-shadow-width: '8.970562748477143px'
  typography:
    title-margin-top: '1.2em'
    title-margin-bottom: '0.5em'
---

## 概述 {#overview}

Ant Design 是一套企业级 UI 设计语言和 React 组件库，建立在四个设计价值观之上：**自然**、**确定性**、**意义感**和**生长性**。这些价值观指导从 Token 命名到交互模式的每一个决策，确保系统直觉易用、行为可预测、目标明确且可扩展。主题定制通过 `ConfigProvider` 管理，它包裹你的应用并将设计 Token 沿组件树向下传递。Token 系统分为四层：

- **种子 Token**（如 `colorPrimary`、`fontSize`）是定制的入口点。
- **映射 Token** 将种子值转换为中间梯度（例如 `#1677ff` 生成包含 hover、active 和背景变体的完整色板）。
- **别名 Token** 提供语义化名称，将 Token 映射到其角色（如 `colorText`、`colorBgContainer`）。
- **组件 Token** 在组件级别覆盖别名和映射 Token，实现精细控制。提供三种算法预设：`default`（亮色主题）、`dark`（暗色主题）和 `compact`（紧凑布局）。你也可以通过组合预设创建自定义算法。支持 CSS Variables 模式（`cssVar: true`），可用于运行时主题切换和 SSR 水合。

**核心特性：**

- 种子驱动：修改一个颜色，自动推导完整 10 级色板
- 语义化 Token 名称，描述用途而非外观
- 组件级 Token 覆盖，实现精确定制
- 内置暗色模式算法，自动颜色反转
- 紧凑算法，适合空间高效布局
- CSS Variables 支持，运行时主题切换
- RTL 感知的布局 Token

## 色彩 {#colors}

| Token                      | CSS 变量                             | 默认值             | 分类 |
| -------------------------- | ------------------------------------ | ------------------ | ---- |
| `colorPrimary`             | `--ant-color-primary`                | `#1677ff`          | 品牌 |
| `colorPrimaryHover`        | `--ant-color-primary-hover`          | `#4096ff`          | 品牌 |
| `colorPrimaryActive`       | `--ant-color-primary-active`         | `#0958d9`          | 品牌 |
| `colorPrimaryBg`           | `--ant-color-primary-bg`             | `#e6f4ff`          | 品牌 |
| `colorPrimaryBgHover`      | `--ant-color-primary-bg-hover`       | `#bae0ff`          | 品牌 |
| `colorPrimaryBorder`       | `--ant-color-primary-border`         | `#91caff`          | 品牌 |
| `colorPrimaryBorderHover`  | `--ant-color-primary-border-hover`   | `#69b1ff`          | 品牌 |
| `colorPrimaryText`         | `--ant-color-primary-text`           | `#1677ff`          | 品牌 |
| `colorPrimaryTextHover`    | `--ant-color-primary-text-hover`     | `#4096ff`          | 品牌 |
| `colorPrimaryTextActive`   | `--ant-color-primary-text-active`    | `#0958d9`          | 品牌 |
| `colorError`               | `--ant-color-error`                  | `#ff4d4f`          | 功能 |
| `colorErrorHover`          | `--ant-color-error-hover`            | `#ff7875`          | 功能 |
| `colorErrorActive`         | `--ant-color-error-active`           | `#d9363e`          | 功能 |
| `colorErrorBg`             | `--ant-color-error-bg`               | `#fff2f0`          | 功能 |
| `colorErrorBorder`         | `--ant-color-error-border`           | `#ffccc7`          | 功能 |
| `colorErrorText`           | `--ant-color-error-text`             | `#ff4d4f`          | 功能 |
| `colorWarning`             | `--ant-color-warning`                | `#faad14`          | 功能 |
| `colorWarningHover`        | `--ant-color-warning-hover`          | `#ffd666`          | 功能 |
| `colorWarningActive`       | `--ant-color-warning-active`         | `#d48806`          | 功能 |
| `colorWarningBg`           | `--ant-color-warning-bg`             | `#fffbe6`          | 功能 |
| `colorWarningBorder`       | `--ant-color-warning-border`         | `#ffe58f`          | 功能 |
| `colorWarningText`         | `--ant-color-warning-text`           | `#faad14`          | 功能 |
| `colorSuccess`             | `--ant-color-success`                | `#52c41a`          | 功能 |
| `colorSuccessHover`        | `--ant-color-success-hover`          | `#95de64`          | 功能 |
| `colorSuccessActive`       | `--ant-color-success-active`         | `#389e0d`          | 功能 |
| `colorSuccessBg`           | `--ant-color-success-bg`             | `#f6ffed`          | 功能 |
| `colorSuccessBorder`       | `--ant-color-success-border`         | `#b7eb8f`          | 功能 |
| `colorSuccessText`         | `--ant-color-success-text`           | `#52c41a`          | 功能 |
| `colorInfo`                | `--ant-color-info`                   | `#1677ff`          | 功能 |
| `colorInfoHover`           | `--ant-color-info-hover`             | `#69b1ff`          | 功能 |
| `colorInfoActive`          | `--ant-color-info-active`            | `#0958d9`          | 功能 |
| `colorInfoBg`              | `--ant-color-info-bg`                | `#e6f4ff`          | 功能 |
| `colorInfoBorder`          | `--ant-color-info-border`            | `#91caff`          | 功能 |
| `colorInfoText`            | `--ant-color-info-text`              | `#1677ff`          | 功能 |
| `colorText`                | `--ant-color-text`                   | `rgba(0,0,0,0.88)` | 文本 |
| `colorTextSecondary`       | `--ant-color-text-secondary`         | `rgba(0,0,0,0.65)` | 文本 |
| `colorTextTertiary`        | `--ant-color-text-tertiary`          | `rgba(0,0,0,0.45)` | 文本 |
| `colorTextQuaternary`      | `--ant-color-text-quaternary`        | `rgba(0,0,0,0.25)` | 文本 |
| `colorTextLightSolid`      | `--ant-color-text-light-solid`       | `#fff`             | 文本 |
| `colorTextHeading`         | `--ant-color-text-heading`           | `rgba(0,0,0,0.88)` | 文本 |
| `colorTextLabel`           | `--ant-color-text-label`             | `rgba(0,0,0,0.65)` | 文本 |
| `colorTextDescription`     | `--ant-color-text-description`       | `rgba(0,0,0,0.45)` | 文本 |
| `colorTextDisabled`        | `--ant-color-text-disabled`          | `rgba(0,0,0,0.25)` | 文本 |
| `colorTextPlaceholder`     | `--ant-color-text-placeholder`       | `rgba(0,0,0,0.25)` | 文本 |
| `colorBgContainer`         | `--ant-color-bg-container`           | `#ffffff`          | 背景 |
| `colorBgElevated`          | `--ant-color-bg-elevated`            | `#ffffff`          | 背景 |
| `colorBgLayout`            | `--ant-color-bg-layout`              | `#f5f5f5`          | 背景 |
| `colorBgSpotlight`         | `--ant-color-bg-spotlight`           | `rgba(0,0,0,0.85)` | 背景 |
| `colorBgMask`              | `--ant-color-bg-mask`                | `rgba(0,0,0,0.45)` | 背景 |
| `colorBorder`              | `--ant-color-border`                 | `#d9d9d9`          | 边框 |
| `colorBorderSecondary`     | `--ant-color-border-secondary`       | `#f0f0f0`          | 边框 |
| `colorBorderDisabled`      | `--ant-color-border-disabled`        | `#d9d9d9`          | 边框 |
| `colorFill`                | `--ant-color-fill`                   | `rgba(0,0,0,0.15)` | 填充 |
| `colorFillSecondary`       | `--ant-color-fill-secondary`         | `rgba(0,0,0,0.06)` | 填充 |
| `colorFillTertiary`        | `--ant-color-fill-tertiary`          | `rgba(0,0,0,0.04)` | 填充 |
| `colorFillQuaternary`      | `--ant-color-fill-quaternary`        | `rgba(0,0,0,0.02)` | 填充 |
| `colorFillContent`         | `--ant-color-fill-content`           | `rgba(0,0,0,0.06)` | 填充 |
| `colorFillContentHover`    | `--ant-color-fill-content-hover`     | `rgba(0,0,0,0.15)` | 填充 |
| `colorFillAlter`           | `--ant-color-fill-alter`             | `rgba(0,0,0,0.02)` | 填充 |
| `colorLink`                | `--ant-color-link`                   | `#1677ff`          | 链接 |
| `colorLinkHover`           | `--ant-color-link-hover`             | `#69b1ff`          | 链接 |
| `colorLinkActive`          | `--ant-color-link-active`            | `#0958d9`          | 链接 |
| `colorHighlight`           | `--ant-color-highlight`              | `#ff4d4f`          | 高亮 |
| `colorIcon`                | `--ant-color-icon`                   | `rgba(0,0,0,0.45)` | 图标 |
| `colorIconHover`           | `--ant-color-icon-hover`             | `rgba(0,0,0,0.88)` | 图标 |
| `controlItemBgHover`       | `--ant-control-item-bg-hover`        | `rgba(0,0,0,0.04)` | 控件 |
| `controlItemBgActive`      | `--ant-control-item-bg-active`       | `#e6f4ff`          | 控件 |
| `controlItemBgActiveHover` | `--ant-control-item-bg-active-hover` | `#bae0ff`          | 控件 |

色彩系统从一个种子颜色（`colorPrimary`）自动推导所有色板。默认算法使用基于 HSL 的亮度偏移生成每个色相的 10 级色阶，确保 hover、active 和背景状态之间的对比度一致。要自定义，只需在 `ConfigProvider` 的 theme token 中设置 `colorPrimary`，整个色板将自动重新计算。功能色（`colorError`、`colorWarning`、`colorSuccess`、`colorInfo`）遵循相同的推导算法，可以独立覆盖。

## 排版 {#typography}

| 层级        | 字体         | 大小   | 字重 | 行高               | 字间距 | 备注                |
| ----------- | ------------ | ------ | ---- | ------------------ | ------ | ------------------- |
| `heading-1` | {fonts.sans} | `38px` | 700  | 1.2105263157894737 | normal | H1 / 页面标题       |
| `heading-2` | {fonts.sans} | `30px` | 600  | 1.2666666666666666 | normal | H2 / 章节标题       |
| `heading-3` | {fonts.sans} | `24px` | 600  | 1.3333333333333333 | normal | H3 / 子章节标题     |
| `heading-4` | {fonts.sans} | `20px` | 600  | 1.4                | normal | H4 / 分组标题       |
| `heading-5` | {fonts.sans} | `16px` | 600  | 1.5                | normal | H5 / 次要标题       |
| `body-lg`   | {fonts.sans} | `16px` | 400  | 1.5                | -      | 大号正文            |
| `body-md`   | {fonts.sans} | `14px` | 400  | 1.5714285714285714 | -      | 默认正文            |
| `body-sm`   | {fonts.sans} | `12px` | 400  | 1.6666666666666667 | -      | 小号正文 / 辅助文本 |
| `label-lg`  | {fonts.sans} | `16px` | 600  | 1.5                | -      | 大号标签            |
| `label-md`  | {fonts.sans} | `14px` | 600  | 1.5714285714285714 | -      | 默认标签            |
| `label-sm`  | {fonts.sans} | `12px` | 600  | 1.6666666666666667 | -      | 小号标签            |

默认字体栈优先使用系统字体以确保各平台最佳渲染效果：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'。代码块和行内代码使用等宽字体栈：`'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`。

## 布局与间距 {#layout}

| Token        | CSS 变量            | 值     |
| ------------ | ------------------- | ------ |
| `paddingXXS` | `--ant-padding-xxs` | `4px`  |
| `paddingXS`  | `--ant-padding-xs`  | `8px`  |
| `paddingSM`  | `--ant-padding-sm`  | `12px` |
| `padding`    | `--ant-padding`     | `16px` |
| `paddingLG`  | `--ant-padding-lg`  | `24px` |
| `paddingXL`  | `--ant-padding-xl`  | `32px` |
| `marginXXL`  | `--ant-margin-xxl`  | `48px` |

### 响应式断点

| 断点 | 宽度      |
| ---- | --------- |
| xs   | >= 480px  |
| sm   | >= 576px  |
| md   | >= 768px  |
| lg   | >= 992px  |
| xl   | >= 1200px |
| xxl  | >= 1600px |

### 背景层级

Ant Design 使用三层背景系统传达视觉层级：

- **`colorBgLayout`**（`#f5f5f5`）— 最外层画布，位于所有容器之后。
- **`colorBgContainer`**（`#ffffff`）— 默认容器表面，用于卡片、面板和输入框。
- **`colorBgElevated`**（`#ffffff`）— 浮层表面，如下拉菜单、工具提示和气泡卡片，出现在容器层之上。

## 层级与深度 {#elevation}

| 级别 | Token | CSS 变量 | 默认值 |
| --- | --- | --- | --- |
| 默认 | `boxShadow` | `--ant-box-shadow` | `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)` |
| 二级 | `boxShadowSecondary` | `--ant-box-shadow-secondary` | `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)` |
| 三级 | `boxShadowTertiary` | `--ant-box-shadow-tertiary` | `0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)` |
| 卡片 | `boxShadowCard` | `--ant-box-shadow-card` | `0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 12px 4px rgba(0,0,0,0.09)` |

### 阴影哲学

阴影传达层级感。默认阴影（`boxShadow`）用于气泡卡片和浮动元素。`boxShadowSecondary` 为弹窗和抽屉增加深度。`boxShadowTertiary` 为行内凸起元素提供最轻微的提升。`boxShadowCard` 针对卡片表面调优。保持阴影最小化——过多的深度会造成视觉噪音。

### 遮罩层体系

当 Modal、Drawer 或 Popconfirm 处于活动状态时，半透明遮罩覆盖底层内容。遮罩默认使用 `colorBgMask`（rgba(0,0,0,0.45)）。启用 CSS Variables 模式后，该值变为 `--ant-color-bg-mask`。Modal、Drawer 和 Popconfirm 各自有独立的 z-index token，分层叠加在遮罩之上（起点为 `zIndexPopupBase: 1000`）。

### 动效

| Token | CSS 变量 | 默认值 |
| --- | --- | --- |
| `motionDurationFast` | `--ant-motion-duration-fast` | `0.1s` |
| `motionDurationMid` | `--ant-motion-duration-mid` | `0.2s` |
| `motionDurationSlow` | `--ant-motion-duration-slow` | `0.3s` |
| `motionEaseInOut` | `--ant-motion-ease-in-out` | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| `motionEaseOut` | `--ant-motion-ease-out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| `motionEaseInBack` | `--ant-motion-ease-in-back` | `cubic-bezier(0.71, -0.46, 0.88, 0.6)` |
| `motionEaseOutBack` | `--ant-motion-ease-out-back` | `cubic-bezier(0.12, 0.4, 0.29, 1.46)` |
| `motionEaseOutCirc` | `--ant-motion-ease-out-circ` | `cubic-bezier(0.08, 0.82, 0.17, 1)` |
| `motionEaseInOutCirc` | `--ant-motion-ease-in-out-circ` | `cubic-bezier(0.78, 0.14, 0.15, 0.86)` |
| `motionEaseOutQuint` | `--ant-motion-ease-out-quint` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `motionEaseInQuint` | `--ant-motion-ease-in-quint` | `cubic-bezier(0.755, 0.05, 0.855, 0.06)` |

- **快速**（`0.1s`）：微交互——悬停高亮、开关切换、聚焦环。
- **中等**（`0.2s`）：标准过渡——折叠展开、标签切换、下拉菜单出现。
- **缓慢**（`0.3s`）：重要布局变化——弹窗进入、抽屉滑入、页面过渡。

元素进入视口时使用 **ease-out** 曲线，连续或可逆动画使用 **ease-in-out** 曲线。`ease-in-back`/`ease-out-back` 组合产生轻微的过冲效果，适合展开/折叠模式。

### 常见过渡模式

- **展开/折叠**：`motionDurationMid` + `motionEaseOutQuad` 或 `motionEaseOutBack`
- **淡入淡出**：`motionDurationFast` + `motionEaseOut`
- **滑动**：`motionDurationMid` + `motionEaseOutCirc`
- **遮罩层**：`motionDurationSlow` + `motionEaseOutQuint`

## 形状 {#shapes}

| 档位    | Token            | 值    |
| ------- | ---------------- | ----- |
| none    | `-`              | `0`   |
| xs      | `borderRadiusXS` | `2px` |
| sm      | `borderRadiusSM` | `4px` |
| DEFAULT | `borderRadius`   | `6px` |
| lg      | `borderRadiusLG` | `8px` |

### 组件形状指南

- **按钮、输入框、选择器**：使用 `borderRadius`（默认值）以保持表单元素外观一致。
- **卡片、弹窗**：使用 `borderRadiusLG`，适用于较大的容器元素。
- **标签、徽标、头像**：使用 `borderRadiusSM`，适用于小型行内元素；或 `borderRadiusXS` 产生轻微圆角。
- **工具提示、气泡卡片**：使用 `borderRadiusLG`，以区分浮动面板与行内元素。

## 组件 {#components}

> 所有组件均支持 `classNames` 和 `styles` 属性，用于子元素级别的自定义。

### Alert

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `withDescriptionIconSize` | `--ant-alert-with-description-icon-size` | 24px | 带有描述时的图标尺寸 |
| `defaultPadding` | `--ant-alert-default-padding` | 8px 12px | 默认内间距 |
| `withDescriptionPadding` | `--ant-alert-with-description-padding` | 20px 24px | 带有描述的内间距 |

### Avatar

| Token              | CSS 变量                          | 默认值  | 描述             |
| ------------------ | --------------------------------- | ------- | ---------------- |
| `containerSize`    | `--ant-avatar-container-size`     | 32px    | 头像尺寸         |
| `containerSizeLG`  | `--ant-avatar-container-size-lg`  | 40px    | 大号头像尺寸     |
| `containerSizeSM`  | `--ant-avatar-container-size-sm`  | 24px    | 小号头像尺寸     |
| `textFontSize`     | `--ant-avatar-text-font-size`     | 14px    | 头像文字大小     |
| `textFontSizeLG`   | `--ant-avatar-text-font-size-lg`  | 14px    | 大号头像文字大小 |
| `textFontSizeSM`   | `--ant-avatar-text-font-size-sm`  | 14px    | 小号头像文字大小 |
| `iconFontSize`     | `--ant-avatar-icon-font-size`     | 18px    | 头像图标大小     |
| `iconFontSizeLG`   | `--ant-avatar-icon-font-size-lg`  | 24px    | 大号头像图标大小 |
| `iconFontSizeSM`   | `--ant-avatar-icon-font-size-sm`  | 14px    | 小号头像图标大小 |
| `groupSpace`       | `--ant-avatar-group-space`        | 4px     | 头像组间距       |
| `groupOverlapping` | `--ant-avatar-group-overlapping`  | -8px    | 头像组重叠宽度   |
| `groupBorderColor` | `--ant-avatar-group-border-color` | #ffffff | 头像组边框颜色   |

### Badge

| Token               | CSS 变量                          | 默认值 | 描述             |
| ------------------- | --------------------------------- | ------ | ---------------- |
| `indicatorZIndex`   | `--ant-badge-indicator-zindex`    | auto   | 徽标 z-index     |
| `indicatorHeight`   | `--ant-badge-indicator-height`    | 20px   | 徽标高度         |
| `indicatorHeightSM` | `--ant-badge-indicator-height-sm` | 14px   | 小号徽标高度     |
| `dotSize`           | `--ant-badge-dot-size`            | 6px    | 点状徽标尺寸     |
| `textFontSize`      | `--ant-badge-text-font-size`      | 12px   | 徽标文本尺寸     |
| `textFontSizeSM`    | `--ant-badge-text-font-size-sm`   | 12px   | 小号徽标文本尺寸 |
| `textFontWeight`    | `--ant-badge-text-font-weight`    | normal | 徽标文本粗细     |
| `statusSize`        | `--ant-badge-status-size`         | 6px    | 状态徽标尺寸     |

### Breadcrumb

| Token             | CSS 变量                            | 默认值           | 描述             |
| ----------------- | ----------------------------------- | ---------------- | ---------------- |
| `itemColor`       | `--ant-breadcrumb-item-color`       | rgba(0,0,0,0.45) | 面包屑项文字颜色 |
| `lastItemColor`   | `--ant-breadcrumb-last-item-color`  | rgba(0,0,0,0.88) | 最后一项文字颜色 |
| `iconFontSize`    | `--ant-breadcrumb-icon-font-size`   | 14px             | 图标大小         |
| `linkColor`       | `--ant-breadcrumb-link-color`       | rgba(0,0,0,0.45) | 链接文字颜色     |
| `linkHoverColor`  | `--ant-breadcrumb-link-hover-color` | rgba(0,0,0,0.88) | 链接文字悬浮颜色 |
| `separatorColor`  | `--ant-breadcrumb-separator-color`  | rgba(0,0,0,0.45) | 分隔符颜色       |
| `separatorMargin` | `--ant-breadcrumb-separator-margin` | 8px              | 分隔符外间距     |

### Button

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `blueShadowColor` | `--ant-button-blue-shadow-color` | 0 2px 0 rgba(5,145,255,0.1) |  |
| `purpleShadowColor` | `--ant-button-purple-shadow-color` | 0 2px 0 rgba(155,5,255,0.06) |  |
| `cyanShadowColor` | `--ant-button-cyan-shadow-color` | 0 2px 0 rgba(5,255,215,0.1) |  |
| `greenShadowColor` | `--ant-button-green-shadow-color` | 0 2px 0 rgba(142,255,30,0.08) |  |
| `magentaShadowColor` | `--ant-button-magenta-shadow-color` | 0 2px 0 rgba(255,5,105,0.06) |  |
| `pinkShadowColor` | `--ant-button-pink-shadow-color` | 0 2px 0 rgba(255,5,105,0.06) |  |
| `redShadowColor` | `--ant-button-red-shadow-color` | 0 2px 0 rgba(255,22,5,0.06) |  |
| `orangeShadowColor` | `--ant-button-orange-shadow-color` | 0 2px 0 rgba(255,175,5,0.1) |  |
| `yellowShadowColor` | `--ant-button-yellow-shadow-color` | 0 2px 0 rgba(245,255,5,0.1) |  |
| `volcanoShadowColor` | `--ant-button-volcano-shadow-color` | 0 2px 0 rgba(255,125,25,0.1) |  |
| `geekblueShadowColor` | `--ant-button-geekblue-shadow-color` | 0 2px 0 rgba(5,88,255,0.06) |  |
| `limeShadowColor` | `--ant-button-lime-shadow-color` | 0 2px 0 rgba(225,255,5,0.1) |  |
| `goldShadowColor` | `--ant-button-gold-shadow-color` | 0 2px 0 rgba(255,215,5,0.1) |  |
| `fontWeight` | `--ant-button-font-weight` | 400 | 文字字重 |
| `iconGap` | `--ant-button-icon-gap` | 8px | 图标文字间距 |
| `defaultShadow` | `--ant-button-default-shadow` | 0 2px 0 rgba(0,0,0,0.02) | 默认按钮阴影 |
| `primaryShadow` | `--ant-button-primary-shadow` | 0 2px 0 rgba(5,145,255,0.1) | 主要按钮阴影 |
| `dangerShadow` | `--ant-button-danger-shadow` | 0 2px 0 rgba(255,38,5,0.06) | 危险按钮阴影 |
| `primaryColor` | `--ant-button-primary-color` | #fff | 主要按钮文本颜色 |
| `dangerColor` | `--ant-button-danger-color` | #fff | 危险按钮文本颜色 |
| `borderColorDisabled` | `--ant-button-border-color-disabled` | #d9d9d9 |  |
| `defaultGhostColor` | `--ant-button-default-ghost-color` | #ffffff | 默认幽灵按钮文本颜色 |
| `ghostBg` | `--ant-button-ghost-bg` | transparent | 幽灵按钮背景色 |
| `defaultGhostBorderColor` | `--ant-button-default-ghost-border-color` | #ffffff | 默认幽灵按钮边框颜色 |
| `paddingInline` | `--ant-button-padding-inline` | 15px | 按钮横向内间距 |
| `paddingInlineLG` | `--ant-button-padding-inline-lg` | 15px | 大号按钮横向内间距 |
| `paddingInlineSM` | `--ant-button-padding-inline-sm` | 7px | 小号按钮横向内间距 |
| `onlyIconSize` | `--ant-button-only-icon-size` | inherit | 只有图标的按钮图标尺寸 |
| `onlyIconSizeSM` | `--ant-button-only-icon-size-sm` | inherit | 小号只有图标的按钮图标尺寸 |
| `onlyIconSizeLG` | `--ant-button-only-icon-size-lg` | inherit | 大号只有图标的按钮图标尺寸 |
| `groupBorderColor` | `--ant-button-group-border-color` | #4096ff |  |
| `linkHoverBg` | `--ant-button-link-hover-bg` | transparent | 链接按钮悬浮态背景色 |
| `textTextColor` | `--ant-button-text-text-color` | rgba(0,0,0,0.88) | 默认文本按钮的文本色 |
| `textTextHoverColor` | `--ant-button-text-text-hover-color` | rgba(0,0,0,0.88) | 默认文本按钮悬浮态文本颜色 |
| `textTextActiveColor` | `--ant-button-text-text-active-color` | rgba(0,0,0,0.88) | 默认文本按钮激活态文字颜色 |
| `textHoverBg` | `--ant-button-text-hover-bg` | rgba(0,0,0,0.04) | 文本按钮悬浮态背景色 |
| `defaultColor` | `--ant-button-default-color` | rgba(0,0,0,0.88) | 默认按钮文本颜色 |
| `defaultBg` | `--ant-button-default-bg` | #ffffff | 默认按钮背景色 |
| `defaultBorderColor` | `--ant-button-default-border-color` | #d9d9d9 | 默认按钮边框颜色 |
| `defaultBorderColorDisabled` | `--ant-button-default-border-color-disabled` | #d9d9d9 |  |
| `defaultHoverBg` | `--ant-button-default-hover-bg` | #ffffff | 默认按钮悬浮态背景色 |
| `defaultHoverColor` | `--ant-button-default-hover-color` | #4096ff | 默认按钮悬浮态文本颜色 |
| `defaultHoverBorderColor` | `--ant-button-default-hover-border-color` | #4096ff | 默认按钮悬浮态边框颜色 |
| `defaultActiveBg` | `--ant-button-default-active-bg` | #ffffff | 默认按钮激活态背景色 |
| `defaultActiveColor` | `--ant-button-default-active-color` | #0958d9 | 默认按钮激活态文字颜色 |
| `defaultActiveBorderColor` | `--ant-button-default-active-border-color` | #0958d9 | 默认按钮激活态边框颜色 |
| `solidTextColor` | `--ant-button-solid-text-color` | #fff | 默认实心按钮的文本色 |
| `contentFontSize` | `--ant-button-content-font-size` | 14px | 按钮内容字体大小 |
| `contentFontSizeSM` | `--ant-button-content-font-size-sm` | 14px | 小号按钮内容字体大小 |
| `contentFontSizeLG` | `--ant-button-content-font-size-lg` | 16px | 大号按钮内容字体大小 |
| `contentLineHeight` | `--ant-button-content-line-height` | 1.5714285714285714 |  |
| `contentLineHeightSM` | `--ant-button-content-line-height-sm` | 1.5714285714285714 |  |
| `contentLineHeightLG` | `--ant-button-content-line-height-lg` | 1.5 |  |
| `paddingBlock` | `--ant-button-padding-block` | 4px |  |
| `paddingBlockSM` | `--ant-button-padding-block-sm` | 0px |  |
| `paddingBlockLG` | `--ant-button-padding-block-lg` | 7px |  |
| `defaultBgDisabled` | `--ant-button-default-bg-disabled` | rgba(0,0,0,0.04) | type='default' 禁用状态下的背景颜色 |
| `dashedBgDisabled` | `--ant-button-dashed-bg-disabled` | rgba(0,0,0,0.04) | type='dashed' 禁用状态下的背景颜色 |

### Card

| Token              | CSS 变量                         | 默认值           | 描述                 |
| ------------------ | -------------------------------- | ---------------- | -------------------- |
| `headerBg`         | `--ant-card-header-bg`           | transparent      | 卡片头部背景色       |
| `headerFontSize`   | `--ant-card-header-font-size`    | 16px             | 卡片头部文字大小     |
| `headerFontSizeSM` | `--ant-card-header-font-size-sm` | 14px             | 小号卡片头部文字大小 |
| `headerHeight`     | `--ant-card-header-height`       | 56px             | 卡片头部高度         |
| `headerHeightSM`   | `--ant-card-header-height-sm`    | 38px             | 小号卡片头部高度     |
| `actionsBg`        | `--ant-card-actions-bg`          | #ffffff          | 操作区背景色         |
| `actionsLiMargin`  | `--ant-card-actions-li-margin`   | 12px 0           | 操作区每一项的外间距 |
| `tabsMarginBottom` | `--ant-card-tabs-margin-bottom`  | -17px            | 内置标签页组件下间距 |
| `extraColor`       | `--ant-card-extra-color`         | rgba(0,0,0,0.88) | 额外区文字颜色       |
| `bodyPaddingSM`    | `--ant-card-body-padding-sm`     | 12px             | 小号卡片内边距       |
| `headerPaddingSM`  | `--ant-card-header-padding-sm`   | 12px             | 小号卡片头部内边距   |
| `bodyPadding`      | `--ant-card-body-padding`        | 24px             | 卡片内边距           |
| `headerPadding`    | `--ant-card-header-padding`      | 24px             | 卡片头部内边距       |

### Checkbox

_暂无组件 Token。_

### Collapse

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `headerPadding` | `--ant-collapse-header-padding` | 12px 16px | 折叠面板头部内边距 |
| `headerBg` | `--ant-collapse-header-bg` | rgba(0,0,0,0.02) | 折叠面板头部背景 |
| `contentPadding` | `--ant-collapse-content-padding` | 16px 16px | 折叠面板内容内边距 |
| `contentBg` | `--ant-collapse-content-bg` | #ffffff | 折叠面板内容背景 |
| `borderlessContentPadding` | `--ant-collapse-borderless-content-padding` | 4px 16px 16px | 简约风格折叠面板的内容内边距 |
| `borderlessContentBg` | `--ant-collapse-borderless-content-bg` | transparent | 简约风格折叠面板的内容背景 |

### DatePicker

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `paddingBlock` | `--ant-date-picker-padding-block` | 4px | 输入框纵向内边距 |
| `paddingBlockSM` | `--ant-date-picker-padding-block-sm` | 0px | 小号输入框纵向内边距 |
| `paddingBlockLG` | `--ant-date-picker-padding-block-lg` | 7px | 大号输入框纵向内边距 |
| `paddingInline` | `--ant-date-picker-padding-inline` | 11px | 输入框横向内边距 |
| `paddingInlineSM` | `--ant-date-picker-padding-inline-sm` | 7px | 小号输入框横向内边距 |
| `paddingInlineLG` | `--ant-date-picker-padding-inline-lg` | 11px | 大号输入框横向内边距 |
| `addonBg` | `--ant-date-picker-addon-bg` | rgba(0,0,0,0.02) | 前/后置标签背景色 |
| `activeBorderColor` | `--ant-date-picker-active-border-color` | #1677ff | 激活态边框色 |
| `hoverBorderColor` | `--ant-date-picker-hover-border-color` | #4096ff | 悬浮态边框色 |
| `activeShadow` | `--ant-date-picker-active-shadow` | 0 0 0 2px rgba(5,145,255,0.1) | 激活态阴影 |
| `errorActiveShadow` | `--ant-date-picker-error-active-shadow` | 0 0 0 2px rgba(255,38,5,0.06) | 错误状态时激活态阴影 |
| `warningActiveShadow` | `--ant-date-picker-warning-active-shadow` | 0 0 0 2px rgba(255,215,5,0.1) | 警告状态时激活态阴影 |
| `hoverBg` | `--ant-date-picker-hover-bg` | #ffffff | 输入框hover状态时背景颜色 |
| `activeBg` | `--ant-date-picker-active-bg` | #ffffff | 输入框激活状态时背景颜色 |
| `inputFontSize` | `--ant-date-picker-input-font-size` | 14px | 字体大小 |
| `inputFontSizeLG` | `--ant-date-picker-input-font-size-lg` | 16px | 大号字体大小 |
| `inputFontSizeSM` | `--ant-date-picker-input-font-size-sm` | 14px | 小号字体大小 |
| `cellHoverBg` | `--ant-date-picker-cell-hover-bg` | rgba(0,0,0,0.04) | 单元格悬浮态背景色 |
| `cellActiveWithRangeBg` | `--ant-date-picker-cell-active-with-range-bg` | #e6f4ff | 选取范围内的单元格背景色 |
| `cellHoverWithRangeBg` | `--ant-date-picker-cell-hover-with-range-bg` | #cbe0fd | 选取范围内的单元格悬浮态背景色 |
| `cellRangeBorderColor` | `--ant-date-picker-cell-range-border-color` | #82b4f9 | 选取范围时单元格边框色 |
| `cellBgDisabled` | `--ant-date-picker-cell-bg-disabled` | rgba(0,0,0,0.04) | 单元格禁用态背景色 |
| `timeColumnWidth` | `--ant-date-picker-time-column-width` | 56px | 时间列宽度 |
| `timeColumnHeight` | `--ant-date-picker-time-column-height` | 224px | 时间列高度 |
| `timeCellHeight` | `--ant-date-picker-time-cell-height` | 28px | 时间单元格高度 |
| `cellWidth` | `--ant-date-picker-cell-width` | 36px | 单元格宽度 |
| `cellHeight` | `--ant-date-picker-cell-height` | 24px | 单元格高度 |
| `textHeight` | `--ant-date-picker-text-height` | 40px | 单元格文本高度 |
| `withoutTimeCellHeight` | `--ant-date-picker-without-time-cell-height` | 66px | 十年/年/季/月/周单元格高度 |
| `multipleItemBg` | `--ant-date-picker-multiple-item-bg` | rgba(0,0,0,0.06) | 多选标签背景色 |
| `multipleItemBorderColor` | `--ant-date-picker-multiple-item-border-color` | transparent | 多选标签边框色 |
| `multipleItemHeight` | `--ant-date-picker-multiple-item-height` | 24px | 多选标签高度 |
| `multipleItemHeightSM` | `--ant-date-picker-multiple-item-height-sm` | 16px | 小号多选标签高度 |
| `multipleItemHeightLG` | `--ant-date-picker-multiple-item-height-lg` | 32px | 大号多选标签高度 |
| `multipleSelectorBgDisabled` | `--ant-date-picker-multiple-selector-bg-disabled` | rgba(0,0,0,0.04) | 多选框禁用背景 |
| `multipleItemColorDisabled` | `--ant-date-picker-multiple-item-color-disabled` | rgba(0,0,0,0.25) | 多选标签禁用文本颜色 |
| `multipleItemBorderColorDisabled` | `--ant-date-picker-multiple-item-border-color-disabled` | transparent | 多选标签禁用边框色 |
| `arrowShadowWidth` | `--ant-date-picker-arrow-shadow-width` | 8.970562748477143px |  |
| `presetsWidth` | `--ant-date-picker-presets-width` | 120px | 预设区域宽度 |
| `presetsMaxWidth` | `--ant-date-picker-presets-max-width` | 200px | 预设区域最大宽度 |

### Drawer

| Token                 | CSS 变量                             | 默认值 | 描述               |
| --------------------- | ------------------------------------ | ------ | ------------------ |
| `footerPaddingBlock`  | `--ant-drawer-footer-padding-block`  | 8px    | 底部区域纵向内间距 |
| `footerPaddingInline` | `--ant-drawer-footer-padding-inline` | 16px   | 底部区域横向内间距 |
| `draggerSize`         | `--ant-drawer-dragger-size`          | 4px    | 拖拽手柄大小       |

### Dropdown

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `paddingBlock` | `--ant-dropdown-padding-block` | 5px | 下拉菜单纵向内边距 |
| `arrowOffsetHorizontal` | `--ant-dropdown-arrow-offset-horizontal` | 12px |  |
| `arrowOffsetVertical` | `--ant-dropdown-arrow-offset-vertical` | 8px |  |
| `arrowShadowWidth` | `--ant-dropdown-arrow-shadow-width` | 8.970562748477143px |  |

### Form

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `labelRequiredMarkColor` | `--ant-form-label-required-mark-color` | #ff4d4f | 必填项标记颜色 |
| `labelColor` | `--ant-form-label-color` | rgba(0,0,0,0.88) | 标签颜色 |
| `labelFontSize` | `--ant-form-label-font-size` | 14px | 标签字体大小 |
| `labelHeight` | `--ant-form-label-height` | 32px | 标签高度 |
| `labelColonMarginInlineStart` | `--ant-form-label-colon-margin-inline-start` | 2px | 标签冒号前间距 |
| `labelColonMarginInlineEnd` | `--ant-form-label-colon-margin-inline-end` | 8px | 标签冒号后间距 |
| `itemMarginBottom` | `--ant-form-item-margin-bottom` | 24px | 表单项间距 |
| `verticalLabelPadding` | `--ant-form-vertical-label-padding` | 0 0 8px | 垂直布局标签内边距 |
| `verticalLabelMargin` | `--ant-form-vertical-label-margin` | 0px | 垂直布局标签外边距 |
| `inlineItemMarginBottom` | `--ant-form-inline-item-margin-bottom` | 0px | 行内布局表单项间距 |

### Input

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `paddingBlock` | `--ant-input-padding-block` | 4px | 输入框纵向内边距 |
| `paddingBlockSM` | `--ant-input-padding-block-sm` | 0px | 小号输入框纵向内边距 |
| `paddingBlockLG` | `--ant-input-padding-block-lg` | 7px | 大号输入框纵向内边距 |
| `paddingInline` | `--ant-input-padding-inline` | 11px | 输入框横向内边距 |
| `paddingInlineSM` | `--ant-input-padding-inline-sm` | 7px | 小号输入框横向内边距 |
| `paddingInlineLG` | `--ant-input-padding-inline-lg` | 11px | 大号输入框横向内边距 |
| `addonBg` | `--ant-input-addon-bg` | rgba(0,0,0,0.02) | 前/后置标签背景色 |
| `activeBorderColor` | `--ant-input-active-border-color` | #1677ff | 激活态边框色 |
| `hoverBorderColor` | `--ant-input-hover-border-color` | #4096ff | 悬浮态边框色 |
| `activeShadow` | `--ant-input-active-shadow` | 0 0 0 2px rgba(5,145,255,0.1) | 激活态阴影 |
| `errorActiveShadow` | `--ant-input-error-active-shadow` | 0 0 0 2px rgba(255,38,5,0.06) | 错误状态时激活态阴影 |
| `warningActiveShadow` | `--ant-input-warning-active-shadow` | 0 0 0 2px rgba(255,215,5,0.1) | 警告状态时激活态阴影 |
| `hoverBg` | `--ant-input-hover-bg` | #ffffff | 输入框hover状态时背景颜色 |
| `activeBg` | `--ant-input-active-bg` | #ffffff | 输入框激活状态时背景颜色 |
| `inputFontSize` | `--ant-input-input-font-size` | 14px | 字体大小 |
| `inputFontSizeLG` | `--ant-input-input-font-size-lg` | 16px | 大号字体大小 |
| `inputFontSizeSM` | `--ant-input-input-font-size-sm` | 14px | 小号字体大小 |

### Menu

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `dropdownWidth` | `--ant-menu-dropdown-width` | 160px | 弹出菜单的宽度 |
| `radiusItem` | `--ant-menu-radius-item` | 8px |  |
| `itemBorderRadius` | `--ant-menu-item-border-radius` | 8px | 菜单项的圆角 |
| `radiusSubMenuItem` | `--ant-menu-radius-sub-menu-item` | 4px |  |
| `subMenuItemBorderRadius` | `--ant-menu-sub-menu-item-border-radius` | 4px | 子菜单项的圆角 |
| `colorItemText` | `--ant-menu-color-item-text` | rgba(0,0,0,0.88) |  |
| `itemColor` | `--ant-menu-item-color` | rgba(0,0,0,0.88) | 菜单项文字颜色 |
| `colorItemTextHover` | `--ant-menu-color-item-text-hover` | rgba(0,0,0,0.88) |  |
| `itemHoverColor` | `--ant-menu-item-hover-color` | rgba(0,0,0,0.88) | 菜单项文字悬浮颜色 |
| `colorItemTextHoverHorizontal` | `--ant-menu-color-item-text-hover-horizontal` | #1677ff |  |
| `horizontalItemHoverColor` | `--ant-menu-horizontal-item-hover-color` | #1677ff | 水平菜单项文字悬浮颜色 |
| `colorGroupTitle` | `--ant-menu-color-group-title` | rgba(0,0,0,0.45) |  |
| `groupTitleColor` | `--ant-menu-group-title-color` | rgba(0,0,0,0.45) | 分组标题文字颜色 |
| `colorItemTextSelected` | `--ant-menu-color-item-text-selected` | #1677ff |  |
| `itemSelectedColor` | `--ant-menu-item-selected-color` | #1677ff | 菜单项文字选中颜色 |
| `subMenuItemSelectedColor` | `--ant-menu-sub-menu-item-selected-color` | #1677ff | 子菜单内有选中项时，子菜单标题色 |
| `colorItemTextSelectedHorizontal` | `--ant-menu-color-item-text-selected-horizontal` | #1677ff |  |
| `horizontalItemSelectedColor` | `--ant-menu-horizontal-item-selected-color` | #1677ff | 水平菜单项文字选中颜色 |
| `colorItemBg` | `--ant-menu-color-item-bg` | #ffffff |  |
| `itemBg` | `--ant-menu-item-bg` | #ffffff | 菜单项背景色 |
| `colorItemBgHover` | `--ant-menu-color-item-bg-hover` | rgba(0,0,0,0.06) |  |
| `itemHoverBg` | `--ant-menu-item-hover-bg` | rgba(0,0,0,0.06) | 菜单项悬浮态背景色 |
| `colorItemBgActive` | `--ant-menu-color-item-bg-active` | rgba(0,0,0,0.06) |  |
| `itemActiveBg` | `--ant-menu-item-active-bg` | #e6f4ff | 菜单项激活态背景色 |
| `colorSubItemBg` | `--ant-menu-color-sub-item-bg` | rgba(0,0,0,0.02) |  |
| `subMenuItemBg` | `--ant-menu-sub-menu-item-bg` | rgba(0,0,0,0.02) | 子菜单项背景色 |
| `colorItemBgSelected` | `--ant-menu-color-item-bg-selected` | #e6f4ff |  |
| `itemSelectedBg` | `--ant-menu-item-selected-bg` | #e6f4ff | 菜单项选中态背景色 |
| `colorItemBgSelectedHorizontal` | `--ant-menu-color-item-bg-selected-horizontal` | transparent |  |
| `horizontalItemSelectedBg` | `--ant-menu-horizontal-item-selected-bg` | transparent | 水平菜单项选中态背景色 |
| `colorActiveBarWidth` | `--ant-menu-color-active-bar-width` | 0px |  |
| `activeBarWidth` | `--ant-menu-active-bar-width` | 0px | 菜单项指示条宽度 |
| `colorActiveBarHeight` | `--ant-menu-color-active-bar-height` | 2px |  |
| `activeBarHeight` | `--ant-menu-active-bar-height` | 2px | 菜单项指示条高度 |
| `colorActiveBarBorderSize` | `--ant-menu-color-active-bar-border-size` | 1px |  |
| `activeBarBorderWidth` | `--ant-menu-active-bar-border-width` | 1px | 菜单项指示条边框宽度 |
| `colorItemTextDisabled` | `--ant-menu-color-item-text-disabled` | rgba(0,0,0,0.25) |  |
| `itemDisabledColor` | `--ant-menu-item-disabled-color` | rgba(0,0,0,0.25) | 菜单项文字禁用颜色 |
| `colorDangerItemText` | `--ant-menu-color-danger-item-text` | #ff4d4f |  |
| `dangerItemColor` | `--ant-menu-danger-item-color` | #ff4d4f | 危险菜单项文字颜色 |
| `colorDangerItemTextHover` | `--ant-menu-color-danger-item-text-hover` | #ff4d4f |  |
| `dangerItemHoverColor` | `--ant-menu-danger-item-hover-color` | #ff4d4f | 危险菜单项文字悬浮颜色 |
| `colorDangerItemTextSelected` | `--ant-menu-color-danger-item-text-selected` | #ff4d4f |  |
| `dangerItemSelectedColor` | `--ant-menu-danger-item-selected-color` | #ff4d4f | 危险菜单项文字选中颜色 |
| `colorDangerItemBgActive` | `--ant-menu-color-danger-item-bg-active` | #fff2f0 |  |
| `dangerItemActiveBg` | `--ant-menu-danger-item-active-bg` | #fff2f0 | 危险菜单项激活态背景色 |
| `colorDangerItemBgSelected` | `--ant-menu-color-danger-item-bg-selected` | #fff2f0 |  |
| `dangerItemSelectedBg` | `--ant-menu-danger-item-selected-bg` | #fff2f0 | 危险菜单项选中背景色 |
| `itemMarginInline` | `--ant-menu-item-margin-inline` | 4px | 菜单项横向外间距 |
| `horizontalItemBorderRadius` | `--ant-menu-horizontal-item-border-radius` | 0px | 横向菜单项圆角 |
| `horizontalItemHoverBg` | `--ant-menu-horizontal-item-hover-bg` | transparent | 横向菜单项横悬浮态背景色 |
| `itemHeight` | `--ant-menu-item-height` | 40px | 菜单项高度 |
| `groupTitleLineHeight` | `--ant-menu-group-title-line-height` | 1.5714285714285714 | 分组标题文字高度 |
| `collapsedWidth` | `--ant-menu-collapsed-width` | 80px | 收起后的宽度 |
| `popupBg` | `--ant-menu-popup-bg` | #ffffff | 弹出框背景色 |
| `itemMarginBlock` | `--ant-menu-item-margin-block` | 4px | 菜单项纵向外间距 |
| `itemPaddingInline` | `--ant-menu-item-padding-inline` | 16px | 菜单项横向内间距 |
| `horizontalLineHeight` | `--ant-menu-horizontal-line-height` | 46px | 横向菜单行高 |
| `iconSize` | `--ant-menu-icon-size` | 14px | 图标尺寸 |
| `iconMarginInlineEnd` | `--ant-menu-icon-margin-inline-end` | 10px | 图标与文字间距 |
| `collapsedIconSize` | `--ant-menu-collapsed-icon-size` | 16px | 收起时图标尺寸 |
| `groupTitleFontSize` | `--ant-menu-group-title-font-size` | 14px | 分组标题文字大小 |
| `itemWidth` | `--ant-menu-item-width` | calc(100% - 8px) |  |

### Modal

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `footerBg` | `--ant-modal-footer-bg` | transparent | 底部区域背景色 |
| `headerBg` | `--ant-modal-header-bg` | transparent | 顶部背景色 |
| `titleLineHeight` | `--ant-modal-title-line-height` | 1.5 | 标题行高 |
| `titleFontSize` | `--ant-modal-title-font-size` | 16px | 标题字体大小 |
| `contentBg` | `--ant-modal-content-bg` | #ffffff | 内容区域背景色 |
| `titleColor` | `--ant-modal-title-color` | rgba(0,0,0,0.88) | 标题字体颜色 |
| `contentPadding` | `--ant-modal-content-padding` | 0px |  |
| `headerPadding` | `--ant-modal-header-padding` | 16px 24px |  |
| `headerBorderBottom` | `--ant-modal-header-border-bottom` | 1px solid rgba(5,5,5,0.06) |  |
| `headerMarginBottom` | `--ant-modal-header-margin-bottom` | 0px |  |
| `bodyPadding` | `--ant-modal-body-padding` | 24px |  |
| `footerPadding` | `--ant-modal-footer-padding` | 8px 16px |  |
| `footerBorderTop` | `--ant-modal-footer-border-top` | 1px solid rgba(5,5,5,0.06) |  |
| `footerBorderRadius` | `--ant-modal-footer-border-radius` | 0 0 8px 8px |  |
| `footerMarginTop` | `--ant-modal-footer-margin-top` | 0px |  |
| `confirmBodyPadding` | `--ant-modal-confirm-body-padding` | 32px 32px 24px |  |
| `confirmIconMarginInlineEnd` | `--ant-modal-confirm-icon-margin-inline-end` | 16px |  |
| `confirmBtnsMarginTop` | `--ant-modal-confirm-btns-margin-top` | 24px |  |
| `mask` | `--ant-modal-mask` | true |  |

### Notification

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `width` | `--ant-notification-width` | 384px | 提醒框宽度 |
| `progressBg` | `--ant-notification-progress-bg` | linear-gradient(90deg, #69b1ff, #1677ff) | 提醒框进度条背景色 |

### Pagination

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `itemBg` | `--ant-pagination-item-bg` | #ffffff | 页码选项背景色 |
| `itemSize` | `--ant-pagination-item-size` | 32px | 页码尺寸 |
| `itemSizeSM` | `--ant-pagination-item-size-sm` | 24px | 小号页码尺寸 |
| `itemSizeLG` | `--ant-pagination-item-size-lg` | 40px | 大号页码尺寸 |
| `itemActiveBg` | `--ant-pagination-item-active-bg` | #ffffff | 页码激活态背景色 |
| `itemActiveColor` | `--ant-pagination-item-active-color` | #1677ff | 页码激活态文字颜色 |
| `itemActiveColorHover` | `--ant-pagination-item-active-color-hover` | #4096ff | 页码激活态文字颜色悬停态 |
| `itemLinkBg` | `--ant-pagination-item-link-bg` | #ffffff | 页码链接背景色 |
| `itemActiveColorDisabled` | `--ant-pagination-item-active-color-disabled` | rgba(0,0,0,0.25) | 页码激活态禁用状态文字颜色 |
| `itemActiveBgDisabled` | `--ant-pagination-item-active-bg-disabled` | rgba(0,0,0,0.15) | 页码激活态禁用状态背景色 |
| `itemInputBg` | `--ant-pagination-item-input-bg` | #ffffff | 输入框背景色 |
| `miniOptionsSizeChangerTop` | `--ant-pagination-mini-options-size-changer-top` | 0px | 每页展示数量选择器 top |
| `paddingBlock` | `--ant-pagination-padding-block` | 4px |  |
| `paddingBlockSM` | `--ant-pagination-padding-block-sm` | 0px |  |
| `paddingBlockLG` | `--ant-pagination-padding-block-lg` | 7px |  |
| `paddingInline` | `--ant-pagination-padding-inline` | 11px |  |
| `paddingInlineSM` | `--ant-pagination-padding-inline-sm` | 7px |  |
| `paddingInlineLG` | `--ant-pagination-padding-inline-lg` | 11px |  |
| `addonBg` | `--ant-pagination-addon-bg` | rgba(0,0,0,0.02) |  |
| `activeBorderColor` | `--ant-pagination-active-border-color` | #1677ff |  |
| `hoverBorderColor` | `--ant-pagination-hover-border-color` | #4096ff |  |
| `activeShadow` | `--ant-pagination-active-shadow` | 0 0 0 2px rgba(5,145,255,0.1) |  |
| `errorActiveShadow` | `--ant-pagination-error-active-shadow` | 0 0 0 2px rgba(255,38,5,0.06) |  |
| `warningActiveShadow` | `--ant-pagination-warning-active-shadow` | 0 0 0 2px rgba(255,215,5,0.1) |  |
| `hoverBg` | `--ant-pagination-hover-bg` | #ffffff |  |
| `activeBg` | `--ant-pagination-active-bg` | #ffffff |  |
| `inputFontSize` | `--ant-pagination-input-font-size` | 14px |  |
| `inputFontSizeLG` | `--ant-pagination-input-font-size-lg` | 16px |  |
| `inputFontSizeSM` | `--ant-pagination-input-font-size-sm` | 14px |  |

### Popover

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `titleMinWidth` | `--ant-popover-title-min-width` | 177px | 气泡卡片标题最小宽度 |
| `arrowShadowWidth` | `--ant-popover-arrow-shadow-width` | 8.970562748477143px |  |
| `arrowOffsetHorizontal` | `--ant-popover-arrow-offset-horizontal` | 12px |  |
| `arrowOffsetVertical` | `--ant-popover-arrow-offset-vertical` | 8px |  |
| `innerPadding` | `--ant-popover-inner-padding` | 0px |  |
| `titleMarginBottom` | `--ant-popover-title-margin-bottom` | 0px |  |
| `titlePadding` | `--ant-popover-title-padding` | 5px 16px 4px |  |
| `titleBorderBottom` | `--ant-popover-title-border-bottom` | 1px solid rgba(5,5,5,0.06) |  |
| `innerContentPadding` | `--ant-popover-inner-content-padding` | 12px 16px |  |

### Progress

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `circleTextColor` | `--ant-progress-circle-text-color` | rgba(0,0,0,0.88) | 圆形进度条文字颜色 |
| `defaultColor` | `--ant-progress-default-color` | #1677ff | 进度条默认颜色 |
| `remainingColor` | `--ant-progress-remaining-color` | rgba(0,0,0,0.06) | 进度条剩余部分颜色 |
| `lineBorderRadius` | `--ant-progress-line-border-radius` | 100px | 条状进度条圆角 |
| `circleTextFontSize` | `--ant-progress-circle-text-font-size` | 1em | 圆形进度条文本大小 |
| `circleIconFontSize` | `--ant-progress-circle-icon-font-size` | 1.1666666666666667em | 圆形进度条图标大小 |

### Radio

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `radioSize` | `--ant-radio-radio-size` | 16px | 单选框大小 |
| `dotSize` | `--ant-radio-dot-size` | 8px | 单选框圆点大小 |
| `dotColorDisabled` | `--ant-radio-dot-color-disabled` | rgba(0,0,0,0.25) | 单选框圆点禁用颜色 |
| `buttonSolidCheckedColor` | `--ant-radio-button-solid-checked-color` | #fff | 单选框实色按钮选中时的文本颜色 |
| `buttonSolidCheckedBg` | `--ant-radio-button-solid-checked-bg` | #1677ff | 单选框实色按钮选中时的背景色 |
| `buttonSolidCheckedHoverBg` | `--ant-radio-button-solid-checked-hover-bg` | #4096ff | 单选框实色按钮选中时的悬浮态背景色 |
| `buttonSolidCheckedActiveBg` | `--ant-radio-button-solid-checked-active-bg` | #0958d9 | 单选框实色按钮选中时的激活态背景色 |
| `buttonBg` | `--ant-radio-button-bg` | #ffffff | 单选框按钮背景色 |
| `buttonCheckedBg` | `--ant-radio-button-checked-bg` | #ffffff | 单选框按钮选中背景色 |
| `buttonColor` | `--ant-radio-button-color` | rgba(0,0,0,0.88) | 单选框按钮文本颜色 |
| `buttonCheckedBgDisabled` | `--ant-radio-button-checked-bg-disabled` | rgba(0,0,0,0.15) | 单选框按钮选中并禁用时的背景色 |
| `buttonCheckedColorDisabled` | `--ant-radio-button-checked-color-disabled` | rgba(0,0,0,0.25) | 单选框按钮选中并禁用时的文本颜色 |
| `buttonPaddingInline` | `--ant-radio-button-padding-inline` | 15px | 单选框按钮横向内间距 |
| `wrapperMarginInlineEnd` | `--ant-radio-wrapper-margin-inline-end` | 8px | 单选框右间距 |
| `radioColor` | `--ant-radio-radio-color` | #1677ff |  |
| `radioBgColor` | `--ant-radio-radio-bg-color` | #ffffff |  |

### Select

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `optionSelectedColor` | `--ant-select-option-selected-color` | rgba(0,0,0,0.88) | 选项选中时文本颜色 |
| `optionSelectedFontWeight` | `--ant-select-option-selected-font-weight` | 600 | 选项选中时文本字重 |
| `optionSelectedBg` | `--ant-select-option-selected-bg` | #e6f4ff | 选项选中时背景色 |
| `optionActiveBg` | `--ant-select-option-active-bg` | rgba(0,0,0,0.04) | 选项激活态时背景色 |
| `optionPadding` | `--ant-select-option-padding` | 5px 12px | 选项内间距 |
| `optionFontSize` | `--ant-select-option-font-size` | 14px | 选项字体大小 |
| `optionLineHeight` | `--ant-select-option-line-height` | 1.5714285714285714 | 选项行高 |
| `optionHeight` | `--ant-select-option-height` | 32px | 选项高度 |
| `selectorBg` | `--ant-select-selector-bg` | #ffffff | 选框背景色 |
| `clearBg` | `--ant-select-clear-bg` | #ffffff | 清空按钮背景色 |
| `singleItemHeightLG` | `--ant-select-single-item-height-lg` | 40px | 单选大号回填项高度 |
| `multipleItemBg` | `--ant-select-multiple-item-bg` | rgba(0,0,0,0.06) | 多选标签背景色 |
| `multipleItemBorderColor` | `--ant-select-multiple-item-border-color` | transparent | 多选标签边框色 |
| `multipleItemHeight` | `--ant-select-multiple-item-height` | 24px | 多选标签高度 |
| `multipleItemHeightSM` | `--ant-select-multiple-item-height-sm` | 16px | 小号多选标签高度 |
| `multipleItemHeightLG` | `--ant-select-multiple-item-height-lg` | 32px | 大号多选标签高度 |
| `multipleSelectorBgDisabled` | `--ant-select-multiple-selector-bg-disabled` | rgba(0,0,0,0.04) | 多选框禁用背景 |
| `multipleItemColorDisabled` | `--ant-select-multiple-item-color-disabled` | rgba(0,0,0,0.25) | 多选标签禁用文本颜色 |
| `multipleItemBorderColorDisabled` | `--ant-select-multiple-item-border-color-disabled` | transparent | 多选标签禁用边框色 |
| `showArrowPaddingInlineEnd` | `--ant-select-show-arrow-padding-inline-end` | 18px | 箭头的行末内边距 |
| `hoverBorderColor` | `--ant-select-hover-border-color` | #4096ff | 悬浮态边框色 |
| `activeBorderColor` | `--ant-select-active-border-color` | #1677ff | 激活态边框色 |
| `activeOutlineColor` | `--ant-select-active-outline-color` | rgba(5,145,255,0.1) | 激活态 outline 颜色 |
| `selectAffixPadding` | `--ant-select-select-affix-padding` | 4px |  |

### Slider

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `controlSize` | `--ant-slider-control-size` | 10px | 滑动输入高度 |
| `railSize` | `--ant-slider-rail-size` | 4px | 轨道高度 |
| `handleSize` | `--ant-slider-handle-size` | 10px | 滑块尺寸 |
| `handleSizeHover` | `--ant-slider-handle-size-hover` | 12px | 滑块尺寸（悬浮态） |
| `dotSize` | `--ant-slider-dot-size` | 8px | 滑块圆点尺寸 |
| `handleLineWidth` | `--ant-slider-handle-line-width` | 2px | 滑块边框宽度 |
| `handleLineWidthHover` | `--ant-slider-handle-line-width-hover` | 2.5px | 滑块边框宽度（悬浮态） |
| `railBg` | `--ant-slider-rail-bg` | rgba(0,0,0,0.04) | 轨道背景色 |
| `railHoverBg` | `--ant-slider-rail-hover-bg` | rgba(0,0,0,0.06) | 轨道背景色（悬浮态） |
| `trackBg` | `--ant-slider-track-bg` | #91caff | 轨道已覆盖部分背景色 |
| `trackHoverBg` | `--ant-slider-track-hover-bg` | #69b1ff | 轨道已覆盖部分背景色（悬浮态） |
| `handleColor` | `--ant-slider-handle-color` | #91caff | 滑块颜色 |
| `handleActiveColor` | `--ant-slider-handle-active-color` | #1677ff | 滑块激活态边框色 |
| `handleActiveOutlineColor` | `--ant-slider-handle-active-outline-color` | rgba(22,119,255,0.2) | 滑块激活态外框色 |
| `handleColorDisabled` | `--ant-slider-handle-color-disabled` | #bfbfbf | 滑块禁用颜色 |
| `dotBorderColor` | `--ant-slider-dot-border-color` | #f0f0f0 | 圆点边框颜色 |
| `dotActiveBorderColor` | `--ant-slider-dot-active-border-color` | #91caff | 圆点激活态边框颜色 |
| `trackBgDisabled` | `--ant-slider-track-bg-disabled` | rgba(0,0,0,0.04) | 轨道禁用态背景色 |

### Steps

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `titleLineHeight` | `--ant-steps-title-line-height` | 32px |  |
| `customIconSize` | `--ant-steps-custom-icon-size` | 32px | 自定义图标容器尺寸 |
| `customIconTop` | `--ant-steps-custom-icon-top` | 0px | 自定义图标 top |
| `customIconFontSize` | `--ant-steps-custom-icon-font-size` | 24px | 自定义图标大小 |
| `iconSize` | `--ant-steps-icon-size` | 32px | 图标容器尺寸 |
| `iconTop` | `--ant-steps-icon-top` | -0.5px | 图标 top |
| `iconFontSize` | `--ant-steps-icon-font-size` | 14px | 图标大小 |
| `iconSizeSM` | `--ant-steps-icon-size-sm` | 24px | 小号步骤条图标大小 |
| `dotSize` | `--ant-steps-dot-size` | 8px | 点状步骤点大小 |
| `dotCurrentSize` | `--ant-steps-dot-current-size` | 10px | 点状步骤点当前大小 |
| `navArrowColor` | `--ant-steps-nav-arrow-color` | rgba(0,0,0,0.25) | 可跳转步骤条箭头颜色 |
| `navContentMaxWidth` | `--ant-steps-nav-content-max-width` | unset | 可跳转步骤条内容最大宽度 |
| `waitIconColor` | `--ant-steps-wait-icon-color` | rgba(0,0,0,0.25) |  |
| `waitIconBgColor` | `--ant-steps-wait-icon-bg-color` | #ffffff |  |
| `waitIconBorderColor` | `--ant-steps-wait-icon-border-color` | rgba(0,0,0,0.25) |  |
| `finishIconBgColor` | `--ant-steps-finish-icon-bg-color` | #ffffff |  |
| `finishIconBorderColor` | `--ant-steps-finish-icon-border-color` | #1677ff |  |

### Switch

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `trackHeight` | `--ant-switch-track-height` | 22px | 开关高度 |
| `trackHeightSM` | `--ant-switch-track-height-sm` | 16px | 小号开关高度 |
| `trackMinWidth` | `--ant-switch-track-min-width` | 44px | 开关最小宽度 |
| `trackMinWidthSM` | `--ant-switch-track-min-width-sm` | 28px | 小号开关最小宽度 |
| `trackPadding` | `--ant-switch-track-padding` | 2px | 开关内边距 |
| `handleBg` | `--ant-switch-handle-bg` | #fff | 开关把手背景色 |
| `handleSize` | `--ant-switch-handle-size` | 18px | 开关把手大小 |
| `handleSizeSM` | `--ant-switch-handle-size-sm` | 12px | 小号开关把手大小 |
| `handleShadow` | `--ant-switch-handle-shadow` | 0 2px 4px 0 rgba(0,35,11,0.2) | 开关把手阴影 |
| `innerMinMargin` | `--ant-switch-inner-min-margin` | 9px | 内容区域最小边距 |
| `innerMaxMargin` | `--ant-switch-inner-max-margin` | 24px | 内容区域最大边距 |
| `innerMinMarginSM` | `--ant-switch-inner-min-margin-sm` | 6px | 小号开关内容区域最小边距 |
| `innerMaxMarginSM` | `--ant-switch-inner-max-margin-sm` | 18px | 小号开关内容区域最大边距 |

### Table

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `headerBg` | `--ant-table-header-bg` | #fafafa | 表头背景 |
| `headerColor` | `--ant-table-header-color` | rgba(0,0,0,0.88) | 表头文字颜色 |
| `headerSortActiveBg` | `--ant-table-header-sort-active-bg` | #f0f0f0 | 表头排序激活态背景色 |
| `headerSortHoverBg` | `--ant-table-header-sort-hover-bg` | #f0f0f0 | 表头排序激活态悬浮背景色 |
| `bodySortBg` | `--ant-table-body-sort-bg` | #fafafa | 表格排序列背景色 |
| `rowHoverBg` | `--ant-table-row-hover-bg` | #fafafa | 表格行悬浮背景色 |
| `rowSelectedBg` | `--ant-table-row-selected-bg` | #e6f4ff | 表格行选中背景色 |
| `rowSelectedHoverBg` | `--ant-table-row-selected-hover-bg` | #bae0ff | 表格行选中悬浮背景色 |
| `rowExpandedBg` | `--ant-table-row-expanded-bg` | rgba(0,0,0,0.02) | 表格行展开背景色 |
| `cellPaddingBlock` | `--ant-table-cell-padding-block` | 16px | 单元格纵向内间距 |
| `cellPaddingInline` | `--ant-table-cell-padding-inline` | 16px | 单元格横向内间距（默认大尺寸） |
| `cellPaddingBlockMD` | `--ant-table-cell-padding-block-md` | 12px | 单元格纵向内间距（中等尺寸） |
| `cellPaddingInlineMD` | `--ant-table-cell-padding-inline-md` | 8px | 单元格横向内间距（中等尺寸） |
| `cellPaddingBlockSM` | `--ant-table-cell-padding-block-sm` | 8px | 单元格纵向内间距（小尺寸） |
| `cellPaddingInlineSM` | `--ant-table-cell-padding-inline-sm` | 8px | 单元格横向内间距（小尺寸） |
| `borderColor` | `--ant-table-border-color` | #f0f0f0 | 表格边框/分割线颜色 |
| `headerBorderRadius` | `--ant-table-header-border-radius` | 8px | 表头圆角 |
| `footerBg` | `--ant-table-footer-bg` | #fafafa | 表格底部背景色 |
| `footerColor` | `--ant-table-footer-color` | rgba(0,0,0,0.88) | 表格底部文字颜色 |
| `cellFontSize` | `--ant-table-cell-font-size` | 14px | 单元格文字大小（默认大尺寸） |
| `cellFontSizeMD` | `--ant-table-cell-font-size-md` | 14px | 单元格文字大小（中等尺寸） |
| `cellFontSizeSM` | `--ant-table-cell-font-size-sm` | 14px | 单元格文字大小（小尺寸） |
| `headerSplitColor` | `--ant-table-header-split-color` | #f0f0f0 | 表头分割线颜色 |
| `fixedHeaderSortActiveBg` | `--ant-table-fixed-header-sort-active-bg` | #f0f0f0 | 固定表头排序激活态背景色 |
| `headerFilterHoverBg` | `--ant-table-header-filter-hover-bg` | rgba(0,0,0,0.06) | 表头过滤按钮悬浮背景色 |
| `filterDropdownMenuBg` | `--ant-table-filter-dropdown-menu-bg` | #ffffff | 过滤下拉菜单选项背景 |
| `filterDropdownBg` | `--ant-table-filter-dropdown-bg` | #ffffff | 过滤下拉菜单颜色 |
| `expandIconBg` | `--ant-table-expand-icon-bg` | #ffffff | 展开按钮背景色 |
| `selectionColumnWidth` | `--ant-table-selection-column-width` | 32px | 选择列宽度 |
| `stickyScrollBarBg` | `--ant-table-sticky-scroll-bar-bg` | rgba(0,0,0,0.25) | Sticky 模式下滚动条背景色 |
| `stickyScrollBarBorderRadius` | `--ant-table-sticky-scroll-bar-border-radius` | 100px | Sticky 模式下滚动条圆角 |
| `expandIconMarginTop` | `--ant-table-expand-icon-margin-top` | 2.5px |  |
| `headerIconColor` | `--ant-table-header-icon-color` | rgba(0,0,0,0.29250000000000004) |  |
| `headerIconHoverColor` | `--ant-table-header-icon-hover-color` | rgba(0,0,0,0.5720000000000001) |  |
| `expandIconHalfInner` | `--ant-table-expand-icon-half-inner` | 7px |  |
| `expandIconSize` | `--ant-table-expand-icon-size` | 17px |  |
| `expandIconScale` | `--ant-table-expand-icon-scale` | 0.9411764705882353 |  |

### Tabs

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `cardBg` | `--ant-tabs-card-bg` | rgba(0,0,0,0.02) | 卡片标签页背景色 |
| `cardHeight` | `--ant-tabs-card-height` | 40px | 卡片标签页高度 |
| `cardHeightSM` | `--ant-tabs-card-height-sm` | 32px | 小尺寸卡片标签页高度 |
| `cardHeightLG` | `--ant-tabs-card-height-lg` | 48px | 大尺寸卡片标签页高度 |
| `cardPadding` | `--ant-tabs-card-padding` | 8px 16px | 卡片标签页内间距 |
| `cardPaddingSM` | `--ant-tabs-card-padding-sm` | 4px 8px | 小号卡片标签页内间距 |
| `cardPaddingLG` | `--ant-tabs-card-padding-lg` | 11px 16px | 大号卡片标签页内间距 |
| `titleFontSize` | `--ant-tabs-title-font-size` | 14px | 标签页标题文本大小 |
| `titleFontSizeLG` | `--ant-tabs-title-font-size-lg` | 16px | 大号标签页标题文本大小 |
| `titleFontSizeSM` | `--ant-tabs-title-font-size-sm` | 14px | 小号标签页标题文本大小 |
| `inkBarColor` | `--ant-tabs-ink-bar-color` | #1677ff | 指示条颜色 |
| `horizontalMargin` | `--ant-tabs-horizontal-margin` | 0 0 16px 0 | 横向标签页外间距 |
| `horizontalItemGutter` | `--ant-tabs-horizontal-item-gutter` | 32px | 横向标签页标签间距 |
| `horizontalItemMargin` | `--ant-tabs-horizontal-item-margin` |  | 横向标签页标签外间距 |
| `horizontalItemMarginRTL` | `--ant-tabs-horizontal-item-margin-rtl` |  | 横向标签页标签外间距（RTL） |
| `horizontalItemPadding` | `--ant-tabs-horizontal-item-padding` | 12px 0 | 横向标签页标签内间距 |
| `horizontalItemPaddingSM` | `--ant-tabs-horizontal-item-padding-sm` | 8px 0 | 小号横向标签页标签内间距 |
| `horizontalItemPaddingLG` | `--ant-tabs-horizontal-item-padding-lg` | 16px 0 | 大号横向标签页标签内间距 |
| `verticalItemPadding` | `--ant-tabs-vertical-item-padding` | 8px 24px | 纵向标签页标签内间距 |
| `verticalItemMargin` | `--ant-tabs-vertical-item-margin` | 16px 0 0 0 | 纵向标签页标签外间距 |
| `itemColor` | `--ant-tabs-item-color` | rgba(0,0,0,0.88) | 标签文本颜色 |
| `itemSelectedColor` | `--ant-tabs-item-selected-color` | #1677ff | 标签选中态文本颜色 |
| `itemHoverColor` | `--ant-tabs-item-hover-color` | #4096ff | 标签悬浮态文本颜色 |
| `itemActiveColor` | `--ant-tabs-item-active-color` | #0958d9 | 标签激活态文本颜色 |
| `cardGutter` | `--ant-tabs-card-gutter` | 2px | 卡片标签间距 |

### Tag

| Token            | CSS 变量                     | 默认值           | 描述                 |
| ---------------- | ---------------------------- | ---------------- | -------------------- |
| `defaultBg`      | `--ant-tag-default-bg`       | #f5f5f5          | 默认背景色           |
| `defaultColor`   | `--ant-tag-default-color`    | rgba(0,0,0,0.88) | 默认文字颜色         |
| `solidTextColor` | `--ant-tag-solid-text-color` | #fff             | 默认实心标签的文本色 |

### Tooltip

| Token | CSS 变量 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `maxWidth` | `--ant-tooltip-max-width` | 250px | 文字提示最大宽度 |
| `arrowOffsetHorizontal` | `--ant-tooltip-arrow-offset-horizontal` | 12px |  |
| `arrowOffsetVertical` | `--ant-tooltip-arrow-offset-vertical` | 8px |  |
| `arrowShadowWidth` | `--ant-tooltip-arrow-shadow-width` | 8.970562748477143px |  |

### Typography

| Token               | CSS 变量                               | 默认值 | 描述       |
| ------------------- | -------------------------------------- | ------ | ---------- |
| `titleMarginTop`    | `--ant-typography-title-margin-top`    | 1.2em  | 标题上间距 |
| `titleMarginBottom` | `--ant-typography-title-margin-bottom` | 0.5em  | 标题下间距 |

## 最佳实践 {#dos-and-donts}

- ✅ **推荐**：让算法从 `colorPrimary` 自动推导色板。仅在算法无法满足特定品牌色需求时才手动覆盖。
- ❌ **避免**：为 hover、active 或背景状态硬编码十六进制值。始终使用推导的语义化 Token，以确保暗色模式正常工作。
- ✅ **推荐**：使用语义化 Token（`colorText`、`colorBgContainer`）而非原始颜色值。语义化 Token 能自动适应算法变化。
- ❌ **避免**：在同一视觉区域创建多个不同主题的 `ConfigProvider` 实例。建议在应用根节点使用单一 Provider。
- ✅ **推荐**：在应用根节点使用单一 `ConfigProvider` 集中管理主题。仅在需要明确的主题区域时使用嵌套 Provider。
- ❌ **避免**：引用以 `INTERNAL_` 开头的内部或私有 Token 名称。这些是实现细节，可能在版本间变更。
- ✅ **推荐**：使用圆角梯度（`borderRadiusXS` 至 `borderRadiusLG`）而非任意像素值，以保持一致性。
- ❌ **避免**：使用超过 `motionDurationSlow`（0.3s）的动画时长。过长的时长会降低感知响应速度。
- ✅ **推荐**：保持阴影微妙。轻微提升优先使用 `boxShadowTertiary`，将 `boxShadow` 留给气泡卡片和浮层。
- ❌ **避免**：自定义颜色时跳过对比度测试。同时覆盖 `colorText`、`colorBgContainer` 和功能色，然后验证 WCAG 2.1 AA 合规性。

## AI 代理指南 {#agent-prompt-guide}

### 快速颜色参考

| 名称       | Token                | 默认值             |
| ---------- | -------------------- | ------------------ |
| 品牌色     | `colorPrimary`       | `#1677ff`          |
| 错误色     | `colorError`         | `#ff4d4f`          |
| 警告色     | `colorWarning`       | `#faad14`          |
| 成功色     | `colorSuccess`       | `#52c41a`          |
| 信息色     | `colorInfo`          | `#1677ff`          |
| 文本色     | `colorText`          | `rgba(0,0,0,0.88)` |
| 次要文本色 | `colorTextSecondary` | `rgba(0,0,0,0.65)` |
| 容器背景   | `colorBgContainer`   | `#ffffff`          |
| 布局背景   | `colorBgLayout`      | `#f5f5f5`          |
| 边框色     | `colorBorder`        | `#d9d9d9`          |

### 组件提示示例

1. `创建一个主色为 #722ed1 的 Button，通过 ConfigProvider 设置 colorPrimary，并覆盖 Button.componentToken 控制 padding。`
2. `构建一个交替行色的数据 Table，使用 token colorFillAlter，并通过 Table.componentToken.headerBg 自定义表头样式。`
3. `设计一个暗色模式 Dashboard，使用 algorithm: theme.darkAlgorithm，覆盖 colorBgLayout 为 #141414，并调整 Card token 适配浮层表面。`
4. `实现紧凑表单布局，使用 algorithm: theme.compactAlgorithm，然后微调 Input.componentToken.paddingBlockSM 缩小间距。`
5. `创建通知系统，使用 Notification.componentToken 自定义宽度、添加自定义内边距，并与品牌 colorPrimary 保持一致。`

### 不可协商的迭代规则

1. 绝不绕过 ConfigProvider 进行主题设置——始终通过 Provider 树传递 Token。
2. 始终从种子颜色算法推导 hover/active/背景变体，而非硬编码单独的色阶。
3. 添加新表面时维持三层背景层级（布局 → 容器 → 浮层）。
4. 所有动画使用动效 Token——绝不内联硬编码时长或缓动值。
5. 遵循圆角梯度；不在 5 级体系之外引入任意 border-radius 值。
6. 发布前在亮色和暗色算法下测试所有自定义主题。
7. 保持组件 Token 覆盖最小化——优先通过全局 Token 变更实现广泛一致性。
8. 自定义文本或背景颜色时确保 WCAG 2.1 AA 对比度（普通文本 4.5:1）。
9. 添加新组件时遵循 Token 命名约定：组件范围 Token 以组件名的 camelCase 形式为前缀。
