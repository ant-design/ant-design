---
name: 'Ant Design'
description: 'Enterprise-class UI design language and React component library'
themeConfig:
  antdVersion: '6.x'
  provider: 'ConfigProvider'
  algorithm: [default, dark, compact]
  customizable: true
  tokenLayers: [seed, map, alias, component]
  cssVar: true
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
  text: rgba(0,0,0,0.88)
  text-secondary: rgba(0,0,0,0.65)
  text-tertiary: rgba(0,0,0,0.45)
  text-quaternary: rgba(0,0,0,0.25)
  text-light-solid: '#fff'
  text-heading: rgba(0,0,0,0.88)
  text-label: rgba(0,0,0,0.65)
  text-description: rgba(0,0,0,0.45)
  text-disabled: rgba(0,0,0,0.25)
  text-placeholder: rgba(0,0,0,0.25)
  # Background
  bg-container: '#ffffff'
  bg-elevated: '#ffffff'
  bg-layout: '#f5f5f5'
  bg-spotlight: rgba(0,0,0,0.85)
  bg-mask: rgba(0,0,0,0.45)
  # Border
  border: '#d9d9d9'
  border-secondary: '#f0f0f0'
  border-disabled: '#d9d9d9'
  # Fill
  fill: rgba(0,0,0,0.15)
  fill-secondary: rgba(0,0,0,0.06)
  fill-tertiary: rgba(0,0,0,0.04)
  fill-quaternary: rgba(0,0,0,0.02)
  fill-content: rgba(0,0,0,0.06)
  fill-content-hover: rgba(0,0,0,0.15)
  fill-alter: rgba(0,0,0,0.02)
  # Link
  link: '#1677ff'
  link-hover: '#69b1ff'
  link-active: '#0958d9'
  # Highlight
  highlight: '#ff4d4f'
  # Icon
  icon: rgba(0,0,0,0.45)
  icon-hover: rgba(0,0,0,0.88)
  # Control
  control-item-bg-hover: rgba(0,0,0,0.04)
  control-item-bg-active: '#e6f4ff'
  control-item-bg-active-hover: '#bae0ff'
typography:
  heading-1:
    fontFamily: '{fonts.sans}'
    fontSize: '38px'
    fontWeight: 700
    lineHeight: 1.2105263157894737
  heading-2:
    fontFamily: '{fonts.sans}'
    fontSize: '30px'
    fontWeight: 600
    lineHeight: 1.2666666666666666
  heading-3:
    fontFamily: '{fonts.sans}'
    fontSize: '24px'
    fontWeight: 600
    lineHeight: 1.3333333333333333
  heading-4:
    fontFamily: '{fonts.sans}'
    fontSize: '20px'
    fontWeight: 600
    lineHeight: 1.4
  heading-5:
    fontFamily: '{fonts.sans}'
    fontSize: '16px'
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: '{fonts.sans}'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: '{fonts.sans}'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.5714285714285714
  body-sm:
    fontFamily: '{fonts.sans}'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: 1.6666666666666667
  label-lg:
    fontFamily: '{fonts.sans}'
    fontSize: '16px'
    fontWeight: 600
    lineHeight: 1.5
  label-md:
    fontFamily: '{fonts.sans}'
    fontSize: '14px'
    fontWeight: 600
    lineHeight: 1.5714285714285714
  label-sm:
    fontFamily: '{fonts.sans}'
    fontSize: '12px'
    fontWeight: 600
    lineHeight: 1.6666666666666667
rounded:
  none: 0
  xs: '2px'
  sm: '4px'
  DEFAULT: '6px'
  lg: '8px'
spacing:
  xxs: '4px'
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  xxl: '48px'
motion:
  duration-fast: 0.1s
  duration-mid: 0.2s
  duration-slow: 0.3s
  ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1)
  ease-out: cubic-bezier(0.215, 0.61, 0.355, 1)
  ease-in-back: cubic-bezier(0.71, -0.46, 0.88, 0.6)
  ease-out-back: cubic-bezier(0.12, 0.4, 0.29, 1.46)
  ease-out-circ: cubic-bezier(0.08, 0.82, 0.17, 1)
  ease-in-out-circ: cubic-bezier(0.78, 0.14, 0.15, 0.86)
  ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1)
  ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06)
shadows:
  default: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)
  secondary: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)
  tertiary: 0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)
  card: 0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 12px 4px rgba(0,0,0,0.09)
components:
  alert:
    with-description-icon-size: { typography.heading-3 }
    default-padding: '8px 12px'
    with-description-padding: '20px 24px'
  avatar:
    container-size: '32px'
    container-size-lg: '40px'
    container-size-sm: { typography.heading-3 }
    text-font-size: { typography.label-md }
    text-font-size-lg: { typography.label-md }
    text-font-size-sm: { typography.label-md }
    icon-font-size: '18px'
    icon-font-size-lg: { typography.heading-3 }
    icon-font-size-sm: { typography.label-md }
    group-space: { rounded.sm }
    group-overlapping: '-8px'
    group-border-color: { colors.bg-container }
  badge:
    indicator-zindex: 'auto'
    indicator-height: { typography.heading-4 }
    indicator-height-sm: { typography.label-md }
    dot-size: { rounded.DEFAULT }
    text-font-size: { typography.label-sm }
    text-font-size-sm: { typography.label-sm }
    text-font-weight: 'normal'
    status-size: { rounded.DEFAULT }
  breadcrumb:
    item-color: { colors.icon }
    last-item-color: { colors.icon-hover }
    icon-font-size: { typography.label-md }
    link-color: { colors.icon }
    link-hover-color: { colors.icon-hover }
    separator-color: { colors.icon }
    separator-margin: { rounded.lg }
  button:
    blue-shadow-color: 0 2px 0 rgba(5,145,255,0.1)
    purple-shadow-color: 0 2px 0 rgba(155,5,255,0.06)
    cyan-shadow-color: 0 2px 0 rgba(5,255,215,0.1)
    green-shadow-color: 0 2px 0 rgba(142,255,30,0.08)
    magenta-shadow-color: 0 2px 0 rgba(255,5,105,0.06)
    pink-shadow-color: 0 2px 0 rgba(255,5,105,0.06)
    red-shadow-color: 0 2px 0 rgba(255,22,5,0.06)
    orange-shadow-color: 0 2px 0 rgba(255,175,5,0.1)
    yellow-shadow-color: 0 2px 0 rgba(245,255,5,0.1)
    volcano-shadow-color: 0 2px 0 rgba(255,125,25,0.1)
    geekblue-shadow-color: 0 2px 0 rgba(5,88,255,0.06)
    lime-shadow-color: 0 2px 0 rgba(225,255,5,0.1)
    gold-shadow-color: 0 2px 0 rgba(255,215,5,0.1)
    font-weight: 400
    icon-gap: { rounded.lg }
    default-shadow: 0 2px 0 rgba(0,0,0,0.02)
    primary-shadow: 0 2px 0 rgba(5,145,255,0.1)
    danger-shadow: 0 2px 0 rgba(255,38,5,0.06)
    primary-color: { colors.text-light-solid }
    danger-color: { colors.text-light-solid }
    border-color-disabled: { colors.border-disabled }
    default-ghost-color: { colors.bg-container }
    ghost-bg: 'transparent'
    default-ghost-border-color: { colors.bg-container }
    padding-inline: '15px'
    padding-inline-lg: '15px'
    padding-inline-sm: '7px'
    only-icon-size: 'inherit'
    only-icon-size-sm: 'inherit'
    only-icon-size-lg: 'inherit'
    group-border-color: { colors.primary-hover }
    link-hover-bg: 'transparent'
    text-text-color: { colors.icon-hover }
    text-text-hover-color: { colors.icon-hover }
    text-text-active-color: { colors.icon-hover }
    text-hover-bg: { colors.control-item-bg-hover }
    default-color: { colors.icon-hover }
    default-bg: { colors.bg-container }
    default-border-color: { colors.border-disabled }
    default-border-color-disabled: { colors.border-disabled }
    default-hover-bg: { colors.bg-container }
    default-hover-color: { colors.primary-hover }
    default-hover-border-color: { colors.primary-hover }
    default-active-bg: { colors.bg-container }
    default-active-color: { colors.primary-active }
    default-active-border-color: { colors.primary-active }
    solid-text-color: { colors.text-light-solid }
    content-font-size: { typography.label-md }
    content-font-size-sm: { typography.label-md }
    content-font-size-lg: { typography.label-lg }
    content-line-height: 1.5714285714285714
    content-line-height-sm: 1.5714285714285714
    content-line-height-lg: 1.5
    padding-block: { rounded.sm }
    padding-block-sm: { rounded.none }
    padding-block-lg: '7px'
    default-bg-disabled: { colors.control-item-bg-hover }
    dashed-bg-disabled: { colors.control-item-bg-hover }
  card:
    header-bg: 'transparent'
    header-font-size: { typography.label-lg }
    header-font-size-sm: { typography.label-md }
    header-height: '56px'
    header-height-sm: { typography.heading-1 }
    actions-bg: { colors.bg-container }
    actions-li-margin: '12px 0'
    tabs-margin-bottom: '-17px'
    extra-color: { colors.icon-hover }
    body-padding-sm: { typography.label-sm }
    header-padding-sm: { typography.label-sm }
    body-padding: { typography.heading-3 }
    header-padding: { typography.heading-3 }
  checkbox: {}
  collapse:
    header-padding: '12px 16px'
    header-bg: { colors.fill-quaternary }
    content-padding: '16px 16px'
    content-bg: { colors.bg-container }
    borderless-content-padding: '4px 16px 16px'
    borderless-content-bg: 'transparent'
  date-picker:
    padding-block: { rounded.sm }
    padding-block-sm: { rounded.none }
    padding-block-lg: '7px'
    padding-inline: '11px'
    padding-inline-sm: '7px'
    padding-inline-lg: '11px'
    addon-bg: { colors.fill-quaternary }
    active-border-color: { colors.info-text }
    hover-border-color: { colors.primary-hover }
    active-shadow: 0 0 0 2px rgba(5,145,255,0.1)
    error-active-shadow: 0 0 0 2px rgba(255,38,5,0.06)
    warning-active-shadow: 0 0 0 2px rgba(255,215,5,0.1)
    hover-bg: { colors.bg-container }
    active-bg: { colors.bg-container }
    input-font-size: { typography.label-md }
    input-font-size-lg: { typography.label-lg }
    input-font-size-sm: { typography.label-md }
    cell-hover-bg: { colors.control-item-bg-hover }
    cell-active-with-range-bg: { colors.control-item-bg-active }
    cell-hover-with-range-bg: '#cbe0fd'
    cell-range-border-color: '#82b4f9'
    cell-bg-disabled: { colors.control-item-bg-hover }
    time-column-width: '56px'
    time-column-height: '224px'
    time-cell-height: '28px'
    cell-width: '36px'
    cell-height: { typography.heading-3 }
    text-height: '40px'
    without-time-cell-height: '66px'
    multiple-item-bg: { colors.fill-secondary }
    multiple-item-border-color: 'transparent'
    multiple-item-height: { typography.heading-3 }
    multiple-item-height-sm: { typography.label-lg }
    multiple-item-height-lg: '32px'
    multiple-selector-bg-disabled: { colors.control-item-bg-hover }
    multiple-item-color-disabled: { colors.text-disabled }
    multiple-item-border-color-disabled: 'transparent'
    arrow-shadow-width: '8.970562748477143px'
    presets-width: '120px'
    presets-max-width: '200px'
  drawer:
    footer-padding-block: { rounded.lg }
    footer-padding-inline: { typography.label-lg }
    dragger-size: { rounded.sm }
  dropdown:
    padding-block: '5px'
    arrow-offset-horizontal: { typography.label-sm }
    arrow-offset-vertical: { rounded.lg }
    arrow-shadow-width: '8.970562748477143px'
  form:
    label-required-mark-color: { colors.highlight }
    label-color: { colors.icon-hover }
    label-font-size: { typography.label-md }
    label-height: '32px'
    label-colon-margin-inline-start: { rounded.xs }
    label-colon-margin-inline-end: { rounded.lg }
    item-margin-bottom: { typography.heading-3 }
    vertical-label-padding: '0 0 8px'
    vertical-label-margin: { rounded.none }
    inline-item-margin-bottom: { rounded.none }
  input:
    padding-block: { rounded.sm }
    padding-block-sm: { rounded.none }
    padding-block-lg: '7px'
    padding-inline: '11px'
    padding-inline-sm: '7px'
    padding-inline-lg: '11px'
    addon-bg: { colors.fill-quaternary }
    active-border-color: { colors.info-text }
    hover-border-color: { colors.primary-hover }
    active-shadow: 0 0 0 2px rgba(5,145,255,0.1)
    error-active-shadow: 0 0 0 2px rgba(255,38,5,0.06)
    warning-active-shadow: 0 0 0 2px rgba(255,215,5,0.1)
    hover-bg: { colors.bg-container }
    active-bg: { colors.bg-container }
    input-font-size: { typography.label-md }
    input-font-size-lg: { typography.label-lg }
    input-font-size-sm: { typography.label-md }
  menu:
    dropdown-width: '160px'
    radius-item: { rounded.lg }
    item-border-radius: { rounded.lg }
    radius-sub-menu-item: { rounded.sm }
    sub-menu-item-border-radius: { rounded.sm }
    color-item-text: { colors.icon-hover }
    item-color: { colors.icon-hover }
    color-item-text-hover: { colors.icon-hover }
    item-hover-color: { colors.icon-hover }
    color-item-text-hover-horizontal: { colors.info-text }
    horizontal-item-hover-color: { colors.info-text }
    color-group-title: { colors.icon }
    group-title-color: { colors.icon }
    color-item-text-selected: { colors.info-text }
    item-selected-color: { colors.info-text }
    sub-menu-item-selected-color: { colors.info-text }
    color-item-text-selected-horizontal: { colors.info-text }
    horizontal-item-selected-color: { colors.info-text }
    color-item-bg: { colors.bg-container }
    item-bg: { colors.bg-container }
    color-item-bg-hover: { colors.fill-secondary }
    item-hover-bg: { colors.fill-secondary }
    color-item-bg-active: { colors.fill-secondary }
    item-active-bg: { colors.control-item-bg-active }
    color-sub-item-bg: { colors.fill-quaternary }
    sub-menu-item-bg: { colors.fill-quaternary }
    color-item-bg-selected: { colors.control-item-bg-active }
    item-selected-bg: { colors.control-item-bg-active }
    color-item-bg-selected-horizontal: 'transparent'
    horizontal-item-selected-bg: 'transparent'
    color-active-bar-width: { rounded.none }
    active-bar-width: { rounded.none }
    color-active-bar-height: { rounded.xs }
    active-bar-height: { rounded.xs }
    color-active-bar-border-size: '1px'
    active-bar-border-width: '1px'
    color-item-text-disabled: { colors.text-disabled }
    item-disabled-color: { colors.text-disabled }
    color-danger-item-text: { colors.highlight }
    danger-item-color: { colors.highlight }
    color-danger-item-text-hover: { colors.highlight }
    danger-item-hover-color: { colors.highlight }
    color-danger-item-text-selected: { colors.highlight }
    danger-item-selected-color: { colors.highlight }
    color-danger-item-bg-active: { colors.error-bg }
    danger-item-active-bg: { colors.error-bg }
    color-danger-item-bg-selected: { colors.error-bg }
    danger-item-selected-bg: { colors.error-bg }
    item-margin-inline: { rounded.sm }
    horizontal-item-border-radius: { rounded.none }
    horizontal-item-hover-bg: 'transparent'
    item-height: '40px'
    group-title-line-height: 1.5714285714285714
    collapsed-width: '80px'
    popup-bg: { colors.bg-container }
    item-margin-block: { rounded.sm }
    item-padding-inline: { typography.label-lg }
    horizontal-line-height: '46px'
    icon-size: { typography.label-md }
    icon-margin-inline-end: '10px'
    collapsed-icon-size: { typography.label-lg }
    group-title-font-size: { typography.label-md }
    item-width: 'calc(100% - 8px)'
  modal:
    footer-bg: 'transparent'
    header-bg: 'transparent'
    title-line-height: 1.5
    title-font-size: { typography.label-lg }
    content-bg: { colors.bg-container }
    title-color: { colors.icon-hover }
    content-padding: { rounded.none }
    header-padding: '16px 24px'
    header-border-bottom: 1px solid rgba(5,5,5,0.06)
    header-margin-bottom: { rounded.none }
    body-padding: { typography.heading-3 }
    footer-padding: '8px 16px'
    footer-border-top: 1px solid rgba(5,5,5,0.06)
    footer-border-radius: '0 0 8px 8px'
    footer-margin-top: { rounded.none }
    confirm-body-padding: '32px 32px 24px'
    confirm-icon-margin-inline-end: { typography.label-lg }
    confirm-btns-margin-top: { typography.heading-3 }
    mask: true
  notification:
    width: '384px'
    progress-bg: 'linear-gradient(90deg, #69b1ff, #1677ff)'
  pagination:
    item-bg: { colors.bg-container }
    item-size: '32px'
    item-size-sm: { typography.heading-3 }
    item-size-lg: '40px'
    item-active-bg: { colors.bg-container }
    item-active-color: { colors.info-text }
    item-active-color-hover: { colors.primary-hover }
    item-link-bg: { colors.bg-container }
    item-active-color-disabled: { colors.text-disabled }
    item-active-bg-disabled: { colors.fill }
    item-input-bg: { colors.bg-container }
    mini-options-size-changer-top: { rounded.none }
    padding-block: { rounded.sm }
    padding-block-sm: { rounded.none }
    padding-block-lg: '7px'
    padding-inline: '11px'
    padding-inline-sm: '7px'
    padding-inline-lg: '11px'
    addon-bg: { colors.fill-quaternary }
    active-border-color: { colors.info-text }
    hover-border-color: { colors.primary-hover }
    active-shadow: 0 0 0 2px rgba(5,145,255,0.1)
    error-active-shadow: 0 0 0 2px rgba(255,38,5,0.06)
    warning-active-shadow: 0 0 0 2px rgba(255,215,5,0.1)
    hover-bg: { colors.bg-container }
    active-bg: { colors.bg-container }
    input-font-size: { typography.label-md }
    input-font-size-lg: { typography.label-lg }
    input-font-size-sm: { typography.label-md }
  popover:
    title-min-width: '177px'
    arrow-shadow-width: '8.970562748477143px'
    arrow-offset-horizontal: { typography.label-sm }
    arrow-offset-vertical: { rounded.lg }
    inner-padding: { rounded.none }
    title-margin-bottom: { rounded.none }
    title-padding: '5px 16px 4px'
    title-border-bottom: 1px solid rgba(5,5,5,0.06)
    inner-content-padding: '12px 16px'
  progress:
    circle-text-color: { colors.icon-hover }
    default-color: { colors.info-text }
    remaining-color: { colors.fill-secondary }
    line-border-radius: '100px'
    circle-text-font-size: '1em'
    circle-icon-font-size: '1.1666666666666667em'
  radio:
    radio-size: { typography.label-lg }
    dot-size: { rounded.lg }
    dot-color-disabled: { colors.text-disabled }
    button-solid-checked-color: { colors.text-light-solid }
    button-solid-checked-bg: { colors.info-text }
    button-solid-checked-hover-bg: { colors.primary-hover }
    button-solid-checked-active-bg: { colors.primary-active }
    button-bg: { colors.bg-container }
    button-checked-bg: { colors.bg-container }
    button-color: { colors.icon-hover }
    button-checked-bg-disabled: { colors.fill }
    button-checked-color-disabled: { colors.text-disabled }
    button-padding-inline: '15px'
    wrapper-margin-inline-end: { rounded.lg }
    radio-color: { colors.info-text }
    radio-bg-color: { colors.bg-container }
  select:
    option-selected-color: { colors.icon-hover }
    option-selected-font-weight: 600
    option-selected-bg: { colors.control-item-bg-active }
    option-active-bg: { colors.control-item-bg-hover }
    option-padding: '5px 12px'
    option-font-size: { typography.label-md }
    option-line-height: 1.5714285714285714
    option-height: '32px'
    selector-bg: { colors.bg-container }
    clear-bg: { colors.bg-container }
    single-item-height-lg: '40px'
    multiple-item-bg: { colors.fill-secondary }
    multiple-item-border-color: 'transparent'
    multiple-item-height: { typography.heading-3 }
    multiple-item-height-sm: { typography.label-lg }
    multiple-item-height-lg: '32px'
    multiple-selector-bg-disabled: { colors.control-item-bg-hover }
    multiple-item-color-disabled: { colors.text-disabled }
    multiple-item-border-color-disabled: 'transparent'
    show-arrow-padding-inline-end: '18px'
    hover-border-color: { colors.primary-hover }
    active-border-color: { colors.info-text }
    active-outline-color: rgba(5,145,255,0.1)
    select-affix-padding: { rounded.sm }
  slider:
    control-size: '10px'
    rail-size: { rounded.sm }
    handle-size: '10px'
    handle-size-hover: { typography.label-sm }
    dot-size: { rounded.lg }
    handle-line-width: { rounded.xs }
    handle-line-width-hover: '2.5px'
    rail-bg: { colors.control-item-bg-hover }
    rail-hover-bg: { colors.fill-secondary }
    track-bg: { colors.info-border }
    track-hover-bg: { colors.link-hover }
    handle-color: { colors.info-border }
    handle-active-color: { colors.info-text }
    handle-active-outline-color: rgba(22,119,255,0.2)
    handle-color-disabled: '#bfbfbf'
    dot-border-color: { colors.border-secondary }
    dot-active-border-color: { colors.info-border }
    track-bg-disabled: { colors.control-item-bg-hover }
  steps:
    title-line-height: '32px'
    custom-icon-size: '32px'
    custom-icon-top: { rounded.none }
    custom-icon-font-size: { typography.heading-3 }
    icon-size: '32px'
    icon-top: '-0.5px'
    icon-font-size: { typography.label-md }
    icon-size-sm: { typography.heading-3 }
    dot-size: { rounded.lg }
    dot-current-size: '10px'
    nav-arrow-color: { colors.text-disabled }
    nav-content-max-width: 'unset'
    wait-icon-color: { colors.text-disabled }
    wait-icon-bg-color: { colors.bg-container }
    wait-icon-border-color: { colors.text-disabled }
    finish-icon-bg-color: { colors.bg-container }
    finish-icon-border-color: { colors.info-text }
  switch:
    track-height: '22px'
    track-height-sm: { typography.label-lg }
    track-min-width: '44px'
    track-min-width-sm: '28px'
    track-padding: { rounded.xs }
    handle-bg: { colors.text-light-solid }
    handle-size: '18px'
    handle-size-sm: { typography.label-sm }
    handle-shadow: 0 2px 4px 0 rgba(0,35,11,0.2)
    inner-min-margin: '9px'
    inner-max-margin: { typography.heading-3 }
    inner-min-margin-sm: { rounded.DEFAULT }
    inner-max-margin-sm: '18px'
  table:
    header-bg: '#fafafa'
    header-color: { colors.icon-hover }
    header-sort-active-bg: { colors.border-secondary }
    header-sort-hover-bg: { colors.border-secondary }
    body-sort-bg: '#fafafa'
    row-hover-bg: '#fafafa'
    row-selected-bg: { colors.control-item-bg-active }
    row-selected-hover-bg: { colors.control-item-bg-active-hover }
    row-expanded-bg: { colors.fill-quaternary }
    cell-padding-block: { typography.label-lg }
    cell-padding-inline: { typography.label-lg }
    cell-padding-block-md: { typography.label-sm }
    cell-padding-inline-md: { rounded.lg }
    cell-padding-block-sm: { rounded.lg }
    cell-padding-inline-sm: { rounded.lg }
    border-color: { colors.border-secondary }
    header-border-radius: { rounded.lg }
    footer-bg: '#fafafa'
    footer-color: { colors.icon-hover }
    cell-font-size: { typography.label-md }
    cell-font-size-md: { typography.label-md }
    cell-font-size-sm: { typography.label-md }
    header-split-color: { colors.border-secondary }
    fixed-header-sort-active-bg: { colors.border-secondary }
    header-filter-hover-bg: { colors.fill-secondary }
    filter-dropdown-menu-bg: { colors.bg-container }
    filter-dropdown-bg: { colors.bg-container }
    expand-icon-bg: { colors.bg-container }
    selection-column-width: '32px'
    sticky-scroll-bar-bg: { colors.text-disabled }
    sticky-scroll-bar-border-radius: '100px'
    expand-icon-margin-top: '2.5px'
    header-icon-color: rgba(0,0,0,0.29250000000000004)
    header-icon-hover-color: rgba(0,0,0,0.5720000000000001)
    expand-icon-half-inner: '7px'
    expand-icon-size: '17px'
    expand-icon-scale: 0.9411764705882353
  tabs:
    card-bg: { colors.fill-quaternary }
    card-height: '40px'
    card-height-sm: '32px'
    card-height-lg: '48px'
    card-padding: '8px 16px'
    card-padding-sm: '4px 8px'
    card-padding-lg: '11px 16px'
    title-font-size: { typography.label-md }
    title-font-size-lg: { typography.label-lg }
    title-font-size-sm: { typography.label-md }
    ink-bar-color: { colors.info-text }
    horizontal-margin: '0 0 16px 0'
    horizontal-item-gutter: '32px'
    horizontal-item-margin: ''
    horizontal-item-margin-rtl: ''
    horizontal-item-padding: '12px 0'
    horizontal-item-padding-sm: '8px 0'
    horizontal-item-padding-lg: '16px 0'
    vertical-item-padding: '8px 24px'
    vertical-item-margin: '16px 0 0 0'
    item-color: { colors.icon-hover }
    item-selected-color: { colors.info-text }
    item-hover-color: { colors.primary-hover }
    item-active-color: { colors.primary-active }
    card-gutter: { rounded.xs }
  tag:
    default-bg: { colors.bg-layout }
    default-color: { colors.icon-hover }
    solid-text-color: { colors.text-light-solid }
  tooltip:
    max-width: '250px'
    arrow-offset-horizontal: { typography.label-sm }
    arrow-offset-vertical: { rounded.lg }
    arrow-shadow-width: '8.970562748477143px'
  typography:
    title-margin-top: '1.2em'
    title-margin-bottom: '0.5em'
---

## Overview

Ant Design is an enterprise-class UI design language and React component library built on four design values: **Natural**, **Deterministic**, **Meaningful**, and **Growing**. These values guide every decision from token naming to interaction patterns, ensuring that the system feels intuitive, predictable, purposeful, and scalable. Theme customization is managed through `ConfigProvider`, which wraps your application and propagates design tokens down the component tree. The token system operates in four layers:

- **Seed tokens** (e.g., `colorPrimary`, `fontSize`) are the entry point for customization.
- **Map tokens** transform seed values into intermediate scales (e.g., `#1677ff` becomes a full palette of hover, active, and background variants).
- **Alias tokens** provide semantic names that map tokens to their role (e.g., `colorText`, `colorBgContainer`).
- **Component tokens** override alias and map tokens at the per-component level for fine-grained control. Three algorithm presets are available: `default` (light theme), `dark` (dark theme), and `compact` (dense layout). You can also compose custom algorithms by combining presets. CSS Variables mode (`cssVar: true`) is supported for runtime theming and SSR hydration.

**Key Characteristics:**

- Seed-driven: change one color, auto-derive a full 10-shade palette
- Semantic token names that describe purpose, not appearance
- Per-component token overrides for precise customization
- Built-in dark mode algorithm with automatic color inversion
- Compact algorithm for space-efficient layouts
- CSS Variables support for runtime theme switching
- RTL-aware layout tokens

## Colors

| Token | CSS Variable | Default | Category |
| --- | --- | --- | --- |
| `colorPrimary` | `--ant-color-primary` | `#1677ff` | Brand |
| `colorPrimaryHover` | `--ant-color-primary-hover` | `#4096ff` | Brand |
| `colorPrimaryActive` | `--ant-color-primary-active` | `#0958d9` | Brand |
| `colorPrimaryBg` | `--ant-color-primary-bg` | `#e6f4ff` | Brand |
| `colorPrimaryBgHover` | `--ant-color-primary-bg-hover` | `#bae0ff` | Brand |
| `colorPrimaryBorder` | `--ant-color-primary-border` | `#91caff` | Brand |
| `colorPrimaryBorderHover` | `--ant-color-primary-border-hover` | `#69b1ff` | Brand |
| `colorPrimaryText` | `--ant-color-primary-text` | `#1677ff` | Brand |
| `colorPrimaryTextHover` | `--ant-color-primary-text-hover` | `#4096ff` | Brand |
| `colorPrimaryTextActive` | `--ant-color-primary-text-active` | `#0958d9` | Brand |
| `colorError` | `--ant-color-error` | `#ff4d4f` | Functional |
| `colorErrorHover` | `--ant-color-error-hover` | `#ff7875` | Functional |
| `colorErrorActive` | `--ant-color-error-active` | `#d9363e` | Functional |
| `colorErrorBg` | `--ant-color-error-bg` | `#fff2f0` | Functional |
| `colorErrorBorder` | `--ant-color-error-border` | `#ffccc7` | Functional |
| `colorErrorText` | `--ant-color-error-text` | `#ff4d4f` | Functional |
| `colorWarning` | `--ant-color-warning` | `#faad14` | Functional |
| `colorWarningHover` | `--ant-color-warning-hover` | `#ffd666` | Functional |
| `colorWarningActive` | `--ant-color-warning-active` | `#d48806` | Functional |
| `colorWarningBg` | `--ant-color-warning-bg` | `#fffbe6` | Functional |
| `colorWarningBorder` | `--ant-color-warning-border` | `#ffe58f` | Functional |
| `colorWarningText` | `--ant-color-warning-text` | `#faad14` | Functional |
| `colorSuccess` | `--ant-color-success` | `#52c41a` | Functional |
| `colorSuccessHover` | `--ant-color-success-hover` | `#95de64` | Functional |
| `colorSuccessActive` | `--ant-color-success-active` | `#389e0d` | Functional |
| `colorSuccessBg` | `--ant-color-success-bg` | `#f6ffed` | Functional |
| `colorSuccessBorder` | `--ant-color-success-border` | `#b7eb8f` | Functional |
| `colorSuccessText` | `--ant-color-success-text` | `#52c41a` | Functional |
| `colorInfo` | `--ant-color-info` | `#1677ff` | Functional |
| `colorInfoHover` | `--ant-color-info-hover` | `#69b1ff` | Functional |
| `colorInfoActive` | `--ant-color-info-active` | `#0958d9` | Functional |
| `colorInfoBg` | `--ant-color-info-bg` | `#e6f4ff` | Functional |
| `colorInfoBorder` | `--ant-color-info-border` | `#91caff` | Functional |
| `colorInfoText` | `--ant-color-info-text` | `#1677ff` | Functional |
| `colorText` | `--ant-color-text` | `rgba(0,0,0,0.88)` | Text |
| `colorTextSecondary` | `--ant-color-text-secondary` | `rgba(0,0,0,0.65)` | Text |
| `colorTextTertiary` | `--ant-color-text-tertiary` | `rgba(0,0,0,0.45)` | Text |
| `colorTextQuaternary` | `--ant-color-text-quaternary` | `rgba(0,0,0,0.25)` | Text |
| `colorTextLightSolid` | `--ant-color-text-light-solid` | `#fff` | Text |
| `colorTextHeading` | `--ant-color-text-heading` | `rgba(0,0,0,0.88)` | Text |
| `colorTextLabel` | `--ant-color-text-label` | `rgba(0,0,0,0.65)` | Text |
| `colorTextDescription` | `--ant-color-text-description` | `rgba(0,0,0,0.45)` | Text |
| `colorTextDisabled` | `--ant-color-text-disabled` | `rgba(0,0,0,0.25)` | Text |
| `colorTextPlaceholder` | `--ant-color-text-placeholder` | `rgba(0,0,0,0.25)` | Text |
| `colorBgContainer` | `--ant-color-bg-container` | `#ffffff` | Background |
| `colorBgElevated` | `--ant-color-bg-elevated` | `#ffffff` | Background |
| `colorBgLayout` | `--ant-color-bg-layout` | `#f5f5f5` | Background |
| `colorBgSpotlight` | `--ant-color-bg-spotlight` | `rgba(0,0,0,0.85)` | Background |
| `colorBgMask` | `--ant-color-bg-mask` | `rgba(0,0,0,0.45)` | Background |
| `colorBorder` | `--ant-color-border` | `#d9d9d9` | Border |
| `colorBorderSecondary` | `--ant-color-border-secondary` | `#f0f0f0` | Border |
| `colorBorderDisabled` | `--ant-color-border-disabled` | `#d9d9d9` | Border |
| `colorFill` | `--ant-color-fill` | `rgba(0,0,0,0.15)` | Fill |
| `colorFillSecondary` | `--ant-color-fill-secondary` | `rgba(0,0,0,0.06)` | Fill |
| `colorFillTertiary` | `--ant-color-fill-tertiary` | `rgba(0,0,0,0.04)` | Fill |
| `colorFillQuaternary` | `--ant-color-fill-quaternary` | `rgba(0,0,0,0.02)` | Fill |
| `colorFillContent` | `--ant-color-fill-content` | `rgba(0,0,0,0.06)` | Fill |
| `colorFillContentHover` | `--ant-color-fill-content-hover` | `rgba(0,0,0,0.15)` | Fill |
| `colorFillAlter` | `--ant-color-fill-alter` | `rgba(0,0,0,0.02)` | Fill |
| `colorLink` | `--ant-color-link` | `#1677ff` | Link |
| `colorLinkHover` | `--ant-color-link-hover` | `#69b1ff` | Link |
| `colorLinkActive` | `--ant-color-link-active` | `#0958d9` | Link |
| `colorHighlight` | `--ant-color-highlight` | `#ff4d4f` | Highlight |
| `colorIcon` | `--ant-color-icon` | `rgba(0,0,0,0.45)` | Icon |
| `colorIconHover` | `--ant-color-icon-hover` | `rgba(0,0,0,0.88)` | Icon |
| `controlItemBgHover` | `--ant-control-item-bg-hover` | `rgba(0,0,0,0.04)` | Control |
| `controlItemBgActive` | `--ant-control-item-bg-active` | `#e6f4ff` | Control |
| `controlItemBgActiveHover` | `--ant-control-item-bg-active-hover` | `#bae0ff` | Control |

The color system derives all palettes from a single seed color (`colorPrimary`). The default algorithm generates 10 shades per hue using HSL-based lightness shifts, ensuring consistent contrast ratios across hover, active, and background states. To customize, set `colorPrimary` in your `ConfigProvider` theme token and the entire palette recalculates automatically. Functional colors (`colorError`, `colorWarning`, `colorSuccess`, `colorInfo`) follow the same derivation algorithm and can be overridden independently.

## Typography

| Level       | Font         | Size   | Weight | Line Height        |
| ----------- | ------------ | ------ | ------ | ------------------ |
| `heading-1` | {fonts.sans} | `38px` | 700    | 1.2105263157894737 |
| `heading-2` | {fonts.sans} | `30px` | 600    | 1.2666666666666666 |
| `heading-3` | {fonts.sans} | `24px` | 600    | 1.3333333333333333 |
| `heading-4` | {fonts.sans} | `20px` | 600    | 1.4                |
| `heading-5` | {fonts.sans} | `16px` | 600    | 1.5                |
| `body-lg`   | {fonts.sans} | `16px` | 400    | 1.5                |
| `body-md`   | {fonts.sans} | `14px` | 400    | 1.5714285714285714 |
| `body-sm`   | {fonts.sans} | `12px` | 400    | 1.6666666666666667 |
| `label-lg`  | {fonts.sans} | `16px` | 600    | 1.5                |
| `label-md`  | {fonts.sans} | `14px` | 600    | 1.5714285714285714 |
| `label-sm`  | {fonts.sans} | `12px` | 600    | 1.6666666666666667 |

The default font stack prioritizes system fonts for optimal rendering on each platform: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'. For code blocks and inline code, a monospace stack is used: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`.

## Layout & Spacing

| Token        | CSS Variable        | Value  |
| ------------ | ------------------- | ------ |
| `paddingXXS` | `--ant-padding-xxs` | `4px`  |
| `paddingXS`  | `--ant-padding-xs`  | `8px`  |
| `paddingSM`  | `--ant-padding-sm`  | `12px` |
| `padding`    | `--ant-padding`     | `16px` |
| `paddingLG`  | `--ant-padding-lg`  | `24px` |
| `paddingXL`  | `--ant-padding-xl`  | `32px` |
| `marginXXL`  | `--ant-margin-xxl`  | `48px` |

### Responsive Breakpoints

| Breakpoint | Width     |
| ---------- | --------- |
| xs         | >= 480px  |
| sm         | >= 576px  |
| md         | >= 768px  |
| lg         | >= 992px  |
| xl         | >= 1200px |
| xxl        | >= 1600px |

### Background Layers

Ant Design uses a three-layer background system to convey visual hierarchy:

- **`colorBgLayout`** (`#f5f5f5`) — The outermost canvas behind all containers.
- **`colorBgContainer`** (`#ffffff`) — The default container surface for cards, panels, and inputs.
- **`colorBgElevated`** (`#ffffff`) — Elevated surfaces such as dropdowns, tooltips, and popovers that appear above the container layer.

## Elevation & Depth

| Level | Token | CSS Variable | Default |
| --- | --- | --- | --- |
| default | `boxShadow` | `--ant-box-shadow` | `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)` |
| secondary | `boxShadowSecondary` | `--ant-box-shadow-secondary` | `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)` |
| tertiary | `boxShadowTertiary` | `--ant-box-shadow-tertiary` | `0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)` |
| card | `boxShadowCard` | `--ant-box-shadow-card` | `0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 12px 4px rgba(0,0,0,0.09)` |

### Shadow Philosophy

Shadows communicate elevation. The default shadow (`boxShadow`) is used for popovers and floating elements. `boxShadowSecondary` adds depth for modals and drawers. `boxShadowTertiary` provides the subtlest lift for inline raised elements. `boxShadowCard` is tuned for card surfaces. Keep shadows minimal—excessive depth creates visual noise.

### Motion

| Token | CSS Variable | Default |
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

- **Fast** (`0.1s`): Micro-interactions—hover highlights, toggle switches, focus rings.
- **Mid** (`0.2s`): Standard transitions—collapses, tab switches, dropdown appearance.
- **Slow** (`0.3s`): Significant layout changes—modal entrance, drawer slide, page transitions.

Use **ease-out** curves for elements entering the viewport and **ease-in-out** for continuous or reversible animations. The `ease-in-back`/`ease-out-back` pair creates a subtle overshoot effect suited to expand/collapse patterns.

### Common Transition Patterns

- **Expand/Collapse**: `motionDurationMid` + `motionEaseOutQuad` or `motionEaseOutBack`
- **Fade**: `motionDurationFast` + `motionEaseOut`
- **Slide**: `motionDurationMid` + `motionEaseOutCirc`
- **Overlay Mask**: `motionDurationSlow` + `motionEaseOutQuint`

## Shapes

| Scale   | Token            | Value |
| ------- | ---------------- | ----- |
| none    | `-`              | `0`   |
| xs      | `borderRadiusXS` | `2px` |
| sm      | `borderRadiusSM` | `4px` |
| DEFAULT | `borderRadius`   | `6px` |
| lg      | `borderRadiusLG` | `8px` |

### Per-Component Shape Guidance

- **Buttons, Inputs, Select**: Use `borderRadius` (default) for consistent form element appearance.
- **Cards, Modals**: Use `borderRadiusLG` for larger container elements.
- **Tags, Badges, Avatars**: Use `borderRadiusSM` for small inline elements, or `borderRadiusXS` for subtle rounding.
- **Tooltips, Popovers**: Use `borderRadiusLG` for floating panels to distinguish them from inline elements.

## Components

> All components support `classNames` and `styles` props for sub-element level customization.

### Alert

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `withDescriptionIconSize` | `--ant-alert-with-description-icon-size` | "24px" | Icon size with description |
| `defaultPadding` | `--ant-alert-default-padding` | "8px 12px" | Default padding |
| `withDescriptionPadding` | `--ant-alert-with-description-padding` | "20px 24px" | Padding with description |

### Avatar

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `containerSize` | `--ant-avatar-container-size` | "32px" | Size of Avatar |
| `containerSizeLG` | `--ant-avatar-container-size-lg` | "40px" | Size of large Avatar |
| `containerSizeSM` | `--ant-avatar-container-size-sm` | "24px" | Size of small Avatar |
| `textFontSize` | `--ant-avatar-text-font-size` | "14px" | Font size of Avatar |
| `textFontSizeLG` | `--ant-avatar-text-font-size-lg` | "14px" | Font size of large Avatar |
| `textFontSizeSM` | `--ant-avatar-text-font-size-sm` | "14px" | Font size of small Avatar |
| `iconFontSize` | `--ant-avatar-icon-font-size` | "18px" | Font size of Avatar icon |
| `iconFontSizeLG` | `--ant-avatar-icon-font-size-lg` | "24px" | Font size of large Avatar icon |
| `iconFontSizeSM` | `--ant-avatar-icon-font-size-sm` | "14px" | Font size of small Avatar icon |
| `groupSpace` | `--ant-avatar-group-space` | "4px" | Spacing between avatars in a group |
| `groupOverlapping` | `--ant-avatar-group-overlapping` | "-8px" | Overlapping of avatars in a group |
| `groupBorderColor` | `--ant-avatar-group-border-color` | "#ffffff" | Border color of avatars in a group |

### Badge

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `indicatorZIndex` | `--ant-badge-indicator-zindex` | "auto" | z-index of badge |
| `indicatorHeight` | `--ant-badge-indicator-height` | "20px" | Height of badge |
| `indicatorHeightSM` | `--ant-badge-indicator-height-sm` | "14px" | Height of small badge |
| `dotSize` | `--ant-badge-dot-size` | "6px" | Size of dot badge |
| `textFontSize` | `--ant-badge-text-font-size` | "12px" | Font size of badge text |
| `textFontSizeSM` | `--ant-badge-text-font-size-sm` | "12px" | Font size of small badge text |
| `textFontWeight` | `--ant-badge-text-font-weight` | "normal" | Font weight of badge text |
| `statusSize` | `--ant-badge-status-size` | "6px" | Size of status badge |

### Breadcrumb

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `itemColor` | `--ant-breadcrumb-item-color` | "rgba(0,0,0,0.45)" | Text color of Breadcrumb item |
| `lastItemColor` | `--ant-breadcrumb-last-item-color` | "rgba(0,0,0,0.88)" | Text color of the last item |
| `iconFontSize` | `--ant-breadcrumb-icon-font-size` | "14px" | Icon size |
| `linkColor` | `--ant-breadcrumb-link-color` | "rgba(0,0,0,0.45)" | Text color of link |
| `linkHoverColor` | `--ant-breadcrumb-link-hover-color` | "rgba(0,0,0,0.88)" | Color of hovered link |
| `separatorColor` | `--ant-breadcrumb-separator-color` | "rgba(0,0,0,0.45)" | Color of separator |
| `separatorMargin` | `--ant-breadcrumb-separator-margin` | "8px" | Margin of separator |

### Button

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `blueShadowColor` | `--ant-button-blue-shadow-color` | "0 2px 0 rgba(5,145,255,0.1)" |  |
| `purpleShadowColor` | `--ant-button-purple-shadow-color` | "0 2px 0 rgba(155,5,255,0.06)" |  |
| `cyanShadowColor` | `--ant-button-cyan-shadow-color` | "0 2px 0 rgba(5,255,215,0.1)" |  |
| `greenShadowColor` | `--ant-button-green-shadow-color` | "0 2px 0 rgba(142,255,30,0.08)" |  |
| `magentaShadowColor` | `--ant-button-magenta-shadow-color` | "0 2px 0 rgba(255,5,105,0.06)" |  |
| `pinkShadowColor` | `--ant-button-pink-shadow-color` | "0 2px 0 rgba(255,5,105,0.06)" |  |
| `redShadowColor` | `--ant-button-red-shadow-color` | "0 2px 0 rgba(255,22,5,0.06)" |  |
| `orangeShadowColor` | `--ant-button-orange-shadow-color` | "0 2px 0 rgba(255,175,5,0.1)" |  |
| `yellowShadowColor` | `--ant-button-yellow-shadow-color` | "0 2px 0 rgba(245,255,5,0.1)" |  |
| `volcanoShadowColor` | `--ant-button-volcano-shadow-color` | "0 2px 0 rgba(255,125,25,0.1)" |  |
| `geekblueShadowColor` | `--ant-button-geekblue-shadow-color` | "0 2px 0 rgba(5,88,255,0.06)" |  |
| `limeShadowColor` | `--ant-button-lime-shadow-color` | "0 2px 0 rgba(225,255,5,0.1)" |  |
| `goldShadowColor` | `--ant-button-gold-shadow-color` | "0 2px 0 rgba(255,215,5,0.1)" |  |
| `fontWeight` | `--ant-button-font-weight` | 400 | Font weight of text |
| `iconGap` | `--ant-button-icon-gap` | "8px" | Gap between icon and text |
| `defaultShadow` | `--ant-button-default-shadow` | "0 2px 0 rgba(0,0,0,0.02)" | Shadow of default button |
| `primaryShadow` | `--ant-button-primary-shadow` | "0 2px 0 rgba(5,145,255,0.1)" | Shadow of primary button |
| `dangerShadow` | `--ant-button-danger-shadow` | "0 2px 0 rgba(255,38,5,0.06)" | Shadow of danger button |
| `primaryColor` | `--ant-button-primary-color` | "#fff" | Text color of primary button |
| `dangerColor` | `--ant-button-danger-color` | "#fff" | Text color of danger button |
| `borderColorDisabled` | `--ant-button-border-color-disabled` | "#d9d9d9" |  |
| `defaultGhostColor` | `--ant-button-default-ghost-color` | "#ffffff" | Text color of default ghost button |
| `ghostBg` | `--ant-button-ghost-bg` | "transparent" | Background color of ghost button |
| `defaultGhostBorderColor` | `--ant-button-default-ghost-border-color` | "#ffffff" | Border color of default ghost button |
| `paddingInline` | `--ant-button-padding-inline` | "15px" | Horizontal padding of button |
| `paddingInlineLG` | `--ant-button-padding-inline-lg` | "15px" | Horizontal padding of large button |
| `paddingInlineSM` | `--ant-button-padding-inline-sm` | "7px" | Horizontal padding of small button |
| `onlyIconSize` | `--ant-button-only-icon-size` | "inherit" | Icon size of button which only contains icon |
| `onlyIconSizeSM` | `--ant-button-only-icon-size-sm` | "inherit" | Icon size of small button which only contains icon |
| `onlyIconSizeLG` | `--ant-button-only-icon-size-lg` | "inherit" | Icon size of large button which only contains icon |
| `groupBorderColor` | `--ant-button-group-border-color` | "#4096ff" |  |
| `linkHoverBg` | `--ant-button-link-hover-bg` | "transparent" | Background color of link button when hover |
| `textTextColor` | `--ant-button-text-text-color` | "rgba(0,0,0,0.88)" | Default text color for text buttons |
| `textTextHoverColor` | `--ant-button-text-text-hover-color` | "rgba(0,0,0,0.88)" | Default text color for text buttons on hover |
| `textTextActiveColor` | `--ant-button-text-text-active-color` | "rgba(0,0,0,0.88)" | Default text color for text buttons on active |
| `textHoverBg` | `--ant-button-text-hover-bg` | "rgba(0,0,0,0.04)" | Background color of text button when hover |
| `defaultColor` | `--ant-button-default-color` | "rgba(0,0,0,0.88)" | Text color of default button |
| `defaultBg` | `--ant-button-default-bg` | "#ffffff" | Background color of default button |
| `defaultBorderColor` | `--ant-button-default-border-color` | "#d9d9d9" | Border color of default button |
| `defaultBorderColorDisabled` | `--ant-button-default-border-color-disabled` | "#d9d9d9" |  |
| `defaultHoverBg` | `--ant-button-default-hover-bg` | "#ffffff" | Background color of default button when hover |
| `defaultHoverColor` | `--ant-button-default-hover-color` | "#4096ff" | Text color of default button when hover |
| `defaultHoverBorderColor` | `--ant-button-default-hover-border-color` | "#4096ff" | Border color of default button |
| `defaultActiveBg` | `--ant-button-default-active-bg` | "#ffffff" | Background color of default button when active |
| `defaultActiveColor` | `--ant-button-default-active-color` | "#0958d9" | Text color of default button when active |
| `defaultActiveBorderColor` | `--ant-button-default-active-border-color` | "#0958d9" | Border color of default button when active |
| `solidTextColor` | `--ant-button-solid-text-color` | "#fff" | Default text color for solid buttons. |
| `contentFontSize` | `--ant-button-content-font-size` | "14px" | Font size of button content |
| `contentFontSizeSM` | `--ant-button-content-font-size-sm` | "14px" | Font size of small button content |
| `contentFontSizeLG` | `--ant-button-content-font-size-lg` | "16px" | Font size of large button content |
| `contentLineHeight` | `--ant-button-content-line-height` | 1.5714285714285714 |  |
| `contentLineHeightSM` | `--ant-button-content-line-height-sm` | 1.5714285714285714 |  |
| `contentLineHeightLG` | `--ant-button-content-line-height-lg` | 1.5 |  |
| `paddingBlock` | `--ant-button-padding-block` | "4px" |  |
| `paddingBlockSM` | `--ant-button-padding-block-sm` | "0px" |  |
| `paddingBlockLG` | `--ant-button-padding-block-lg` | "7px" |  |
| `defaultBgDisabled` | `--ant-button-default-bg-disabled` | "rgba(0,0,0,0.04)" |  |
| `dashedBgDisabled` | `--ant-button-dashed-bg-disabled` | "rgba(0,0,0,0.04)" |  |

### Card

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `headerBg` | `--ant-card-header-bg` | "transparent" | Background color of card header |
| `headerFontSize` | `--ant-card-header-font-size` | "16px" | Font size of card header |
| `headerFontSizeSM` | `--ant-card-header-font-size-sm` | "14px" | Font size of small card header |
| `headerHeight` | `--ant-card-header-height` | "56px" | Height of card header |
| `headerHeightSM` | `--ant-card-header-height-sm` | "38px" | Height of small card header |
| `actionsBg` | `--ant-card-actions-bg` | "#ffffff" | Background color of card actions |
| `actionsLiMargin` | `--ant-card-actions-li-margin` | "12px 0" | Margin of each item in card actions |
| `tabsMarginBottom` | `--ant-card-tabs-margin-bottom` | "-17px" | Margin bottom of tabs component |
| `extraColor` | `--ant-card-extra-color` | "rgba(0,0,0,0.88)" | Text color of extra area |
| `bodyPaddingSM` | `--ant-card-body-padding-sm` | "12px" | Padding of small card body |
| `headerPaddingSM` | `--ant-card-header-padding-sm` | "12px" | Padding of small card head |
| `bodyPadding` | `--ant-card-body-padding` | "24px" | Padding of card body |
| `headerPadding` | `--ant-card-header-padding` | "24px" | Padding of card head |

### Checkbox

_No component tokens available._

### Collapse

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `headerPadding` | `--ant-collapse-header-padding` | "12px 16px" | Padding of header |
| `headerBg` | `--ant-collapse-header-bg` | "rgba(0,0,0,0.02)" | Background of header |
| `contentPadding` | `--ant-collapse-content-padding` | "16px 16px" | Padding of content |
| `contentBg` | `--ant-collapse-content-bg` | "#ffffff" | Background of content |
| `borderlessContentPadding` | `--ant-collapse-borderless-content-padding` | "4px 16px 16px" | Padding of content in borderless style |
| `borderlessContentBg` | `--ant-collapse-borderless-content-bg` | "transparent" | Background of content in borderless style |

### DatePicker

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `paddingBlock` | `--ant-date-picker-padding-block` | "4px" | Vertical padding of input |
| `paddingBlockSM` | `--ant-date-picker-padding-block-sm` | "0px" | Vertical padding of small input |
| `paddingBlockLG` | `--ant-date-picker-padding-block-lg` | "7px" | Vertical padding of large input |
| `paddingInline` | `--ant-date-picker-padding-inline` | "11px" | Horizontal padding of input |
| `paddingInlineSM` | `--ant-date-picker-padding-inline-sm` | "7px" | Horizontal padding of small input |
| `paddingInlineLG` | `--ant-date-picker-padding-inline-lg` | "11px" | Horizontal padding of large input |
| `addonBg` | `--ant-date-picker-addon-bg` | "rgba(0,0,0,0.02)" | Background color of addon |
| `activeBorderColor` | `--ant-date-picker-active-border-color` | "#1677ff" | Active border color |
| `hoverBorderColor` | `--ant-date-picker-hover-border-color` | "#4096ff" | Hover border color |
| `activeShadow` | `--ant-date-picker-active-shadow` | "0 0 0 2px rgba(5,145,255,0.1)" | Box-shadow when active |
| `errorActiveShadow` | `--ant-date-picker-error-active-shadow` | "0 0 0 2px rgba(255,38,5,0.06)" | Box-shadow when active in error status |
| `warningActiveShadow` | `--ant-date-picker-warning-active-shadow` | "0 0 0 2px rgba(255,215,5,0.1)" | Box-shadow when active in warning status |
| `hoverBg` | `--ant-date-picker-hover-bg` | "#ffffff" | Background color when the input box hovers |
| `activeBg` | `--ant-date-picker-active-bg` | "#ffffff" | Background color when the input box is activated |
| `inputFontSize` | `--ant-date-picker-input-font-size` | "14px" | Font size |
| `inputFontSizeLG` | `--ant-date-picker-input-font-size-lg` | "16px" | Font size of large |
| `inputFontSizeSM` | `--ant-date-picker-input-font-size-sm` | "14px" | Font size of small |
| `cellHoverBg` | `--ant-date-picker-cell-hover-bg` | "rgba(0,0,0,0.04)" | Background color of cell hover state |
| `cellActiveWithRangeBg` | `--ant-date-picker-cell-active-with-range-bg` | "#e6f4ff" | Background color of cell in range |
| `cellHoverWithRangeBg` | `--ant-date-picker-cell-hover-with-range-bg` | "#cbe0fd" | Background color of hovered cell in range |
| `cellRangeBorderColor` | `--ant-date-picker-cell-range-border-color` | "#82b4f9" | Border color of cell in range when picking |
| `cellBgDisabled` | `--ant-date-picker-cell-bg-disabled` | "rgba(0,0,0,0.04)" | Background color of disabled cell |
| `timeColumnWidth` | `--ant-date-picker-time-column-width` | "56px" | Width of time column |
| `timeColumnHeight` | `--ant-date-picker-time-column-height` | "224px" | Height of time column |
| `timeCellHeight` | `--ant-date-picker-time-cell-height` | "28px" | Height of time cell |
| `cellWidth` | `--ant-date-picker-cell-width` | "36px" | Width of cell |
| `cellHeight` | `--ant-date-picker-cell-height` | "24px" | Height of cell |
| `textHeight` | `--ant-date-picker-text-height` | "40px" | Height of cell text |
| `withoutTimeCellHeight` | `--ant-date-picker-without-time-cell-height` | "66px" | Height of decade/year/quarter/month/week cell |
| `multipleItemBg` | `--ant-date-picker-multiple-item-bg` | "rgba(0,0,0,0.06)" | Background color of multiple tag |
| `multipleItemBorderColor` | `--ant-date-picker-multiple-item-border-color` | "transparent" | Border color of multiple tag |
| `multipleItemHeight` | `--ant-date-picker-multiple-item-height` | "24px" | Height of multiple tag |
| `multipleItemHeightSM` | `--ant-date-picker-multiple-item-height-sm` | "16px" | Height of multiple tag with small size |
| `multipleItemHeightLG` | `--ant-date-picker-multiple-item-height-lg` | "32px" | Height of multiple tag with large size |
| `multipleSelectorBgDisabled` | `--ant-date-picker-multiple-selector-bg-disabled` | "rgba(0,0,0,0.04)" | Background color of multiple selector when disabled |
| `multipleItemColorDisabled` | `--ant-date-picker-multiple-item-color-disabled` | "rgba(0,0,0,0.25)" | Text color of multiple tag when disabled |
| `multipleItemBorderColorDisabled` | `--ant-date-picker-multiple-item-border-color-disabled` | "transparent" | Border color of multiple tag when disabled |
| `arrowShadowWidth` | `--ant-date-picker-arrow-shadow-width` | "8.970562748477143px" |  |
| `presetsWidth` | `--ant-date-picker-presets-width` | "120px" | Width of preset area |
| `presetsMaxWidth` | `--ant-date-picker-presets-max-width` | "200px" | Max width of preset area |

### Drawer

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `footerPaddingBlock` | `--ant-drawer-footer-padding-block` | "8px" | Vertical padding of footer |
| `footerPaddingInline` | `--ant-drawer-footer-padding-inline` | "16px" | Horizontal padding of footer |
| `draggerSize` | `--ant-drawer-dragger-size` | "4px" | Size of resize handle |

### Dropdown

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `paddingBlock` | `--ant-dropdown-padding-block` | "5px" | Vertical padding of dropdown |
| `arrowOffsetHorizontal` | `--ant-dropdown-arrow-offset-horizontal` | "12px" |  |
| `arrowOffsetVertical` | `--ant-dropdown-arrow-offset-vertical` | "8px" |  |
| `arrowShadowWidth` | `--ant-dropdown-arrow-shadow-width` | "8.970562748477143px" |  |

### Form

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `labelRequiredMarkColor` | `--ant-form-label-required-mark-color` | "#ff4d4f" | Required mark color |
| `labelColor` | `--ant-form-label-color` | "rgba(0,0,0,0.88)" | Label color |
| `labelFontSize` | `--ant-form-label-font-size` | "14px" | Label font size |
| `labelHeight` | `--ant-form-label-height` | "32px" | Label height |
| `labelColonMarginInlineStart` | `--ant-form-label-colon-margin-inline-start` | "2px" | Label colon margin-inline-start |
| `labelColonMarginInlineEnd` | `--ant-form-label-colon-margin-inline-end` | "8px" | Label colon margin-inline-end |
| `itemMarginBottom` | `--ant-form-item-margin-bottom` | "24px" | Form item margin bottom |
| `verticalLabelPadding` | `--ant-form-vertical-label-padding` | "0 0 8px" | Vertical layout label padding |
| `verticalLabelMargin` | `--ant-form-vertical-label-margin` | "0px" | Vertical layout label margin |
| `inlineItemMarginBottom` | `--ant-form-inline-item-margin-bottom` | "0px" | Inline layout form item margin bottom |

### Input

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `paddingBlock` | `--ant-input-padding-block` | "4px" | Vertical padding of input |
| `paddingBlockSM` | `--ant-input-padding-block-sm` | "0px" | Vertical padding of small input |
| `paddingBlockLG` | `--ant-input-padding-block-lg` | "7px" | Vertical padding of large input |
| `paddingInline` | `--ant-input-padding-inline` | "11px" | Horizontal padding of input |
| `paddingInlineSM` | `--ant-input-padding-inline-sm` | "7px" | Horizontal padding of small input |
| `paddingInlineLG` | `--ant-input-padding-inline-lg` | "11px" | Horizontal padding of large input |
| `addonBg` | `--ant-input-addon-bg` | "rgba(0,0,0,0.02)" | Background color of addon |
| `activeBorderColor` | `--ant-input-active-border-color` | "#1677ff" | Active border color |
| `hoverBorderColor` | `--ant-input-hover-border-color` | "#4096ff" | Hover border color |
| `activeShadow` | `--ant-input-active-shadow` | "0 0 0 2px rgba(5,145,255,0.1)" | Box-shadow when active |
| `errorActiveShadow` | `--ant-input-error-active-shadow` | "0 0 0 2px rgba(255,38,5,0.06)" | Box-shadow when active in error status |
| `warningActiveShadow` | `--ant-input-warning-active-shadow` | "0 0 0 2px rgba(255,215,5,0.1)" | Box-shadow when active in warning status |
| `hoverBg` | `--ant-input-hover-bg` | "#ffffff" | Background color when the input box hovers |
| `activeBg` | `--ant-input-active-bg` | "#ffffff" | Background color when the input box is activated |
| `inputFontSize` | `--ant-input-input-font-size` | "14px" | Font size |
| `inputFontSizeLG` | `--ant-input-input-font-size-lg` | "16px" | Font size of large |
| `inputFontSizeSM` | `--ant-input-input-font-size-sm` | "14px" | Font size of small |

### Menu

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `dropdownWidth` | `--ant-menu-dropdown-width` | "160px" | Width of popup menu |
| `radiusItem` | `--ant-menu-radius-item` | "8px" |  |
| `itemBorderRadius` | `--ant-menu-item-border-radius` | "8px" | Radius of menu item |
| `radiusSubMenuItem` | `--ant-menu-radius-sub-menu-item` | "4px" |  |
| `subMenuItemBorderRadius` | `--ant-menu-sub-menu-item-border-radius` | "4px" | Radius of sub-menu item |
| `colorItemText` | `--ant-menu-color-item-text` | "rgba(0,0,0,0.88)" |  |
| `itemColor` | `--ant-menu-item-color` | "rgba(0,0,0,0.88)" | Color of menu item text |
| `colorItemTextHover` | `--ant-menu-color-item-text-hover` | "rgba(0,0,0,0.88)" |  |
| `itemHoverColor` | `--ant-menu-item-hover-color` | "rgba(0,0,0,0.88)" | Hover color of menu item text |
| `colorItemTextHoverHorizontal` | `--ant-menu-color-item-text-hover-horizontal` | "#1677ff" |  |
| `horizontalItemHoverColor` | `--ant-menu-horizontal-item-hover-color` | "#1677ff" | Hover color of horizontal menu item text |
| `colorGroupTitle` | `--ant-menu-color-group-title` | "rgba(0,0,0,0.45)" |  |
| `groupTitleColor` | `--ant-menu-group-title-color` | "rgba(0,0,0,0.45)" | Color of group title text |
| `colorItemTextSelected` | `--ant-menu-color-item-text-selected` | "#1677ff" |  |
| `itemSelectedColor` | `--ant-menu-item-selected-color` | "#1677ff" | Color of selected menu item text |
| `subMenuItemSelectedColor` | `--ant-menu-sub-menu-item-selected-color` | "#1677ff" | Color of submenu title when submenu has selected item |
| `colorItemTextSelectedHorizontal` | `--ant-menu-color-item-text-selected-horizontal` | "#1677ff" |  |
| `horizontalItemSelectedColor` | `--ant-menu-horizontal-item-selected-color` | "#1677ff" | Color of selected horizontal menu item text |
| `colorItemBg` | `--ant-menu-color-item-bg` | "#ffffff" |  |
| `itemBg` | `--ant-menu-item-bg` | "#ffffff" |  |
| `colorItemBgHover` | `--ant-menu-color-item-bg-hover` | "rgba(0,0,0,0.06)" |  |
| `itemHoverBg` | `--ant-menu-item-hover-bg` | "rgba(0,0,0,0.06)" | Background color of menu item when hover |
| `colorItemBgActive` | `--ant-menu-color-item-bg-active` | "rgba(0,0,0,0.06)" |  |
| `itemActiveBg` | `--ant-menu-item-active-bg` | "#e6f4ff" | Background color of menu item when active |
| `colorSubItemBg` | `--ant-menu-color-sub-item-bg` | "rgba(0,0,0,0.02)" |  |
| `subMenuItemBg` | `--ant-menu-sub-menu-item-bg` | "rgba(0,0,0,0.02)" | Background color of sub-menu item |
| `colorItemBgSelected` | `--ant-menu-color-item-bg-selected` | "#e6f4ff" |  |
| `itemSelectedBg` | `--ant-menu-item-selected-bg` | "#e6f4ff" | Background color of menu item when selected |
| `colorItemBgSelectedHorizontal` | `--ant-menu-color-item-bg-selected-horizontal` | "transparent" |  |
| `horizontalItemSelectedBg` | `--ant-menu-horizontal-item-selected-bg` | "transparent" | Background color of horizontal menu item when selected |
| `colorActiveBarWidth` | `--ant-menu-color-active-bar-width` | "0px" |  |
| `activeBarWidth` | `--ant-menu-active-bar-width` | "0px" | Width of menu item active bar |
| `colorActiveBarHeight` | `--ant-menu-color-active-bar-height` | "2px" |  |
| `activeBarHeight` | `--ant-menu-active-bar-height` | "2px" | Height of menu item active bar |
| `colorActiveBarBorderSize` | `--ant-menu-color-active-bar-border-size` | "1px" |  |
| `activeBarBorderWidth` | `--ant-menu-active-bar-border-width` | "1px" | Border width of menu item active bar |
| `colorItemTextDisabled` | `--ant-menu-color-item-text-disabled` | "rgba(0,0,0,0.25)" |  |
| `itemDisabledColor` | `--ant-menu-item-disabled-color` | "rgba(0,0,0,0.25)" | Color of disabled menu item text |
| `colorDangerItemText` | `--ant-menu-color-danger-item-text` | "#ff4d4f" |  |
| `dangerItemColor` | `--ant-menu-danger-item-color` | "#ff4d4f" | Color of danger menu item text |
| `colorDangerItemTextHover` | `--ant-menu-color-danger-item-text-hover` | "#ff4d4f" |  |
| `dangerItemHoverColor` | `--ant-menu-danger-item-hover-color` | "#ff4d4f" | Hover color of danger menu item text |
| `colorDangerItemTextSelected` | `--ant-menu-color-danger-item-text-selected` | "#ff4d4f" |  |
| `dangerItemSelectedColor` | `--ant-menu-danger-item-selected-color` | "#ff4d4f" | Color of selected danger menu item text |
| `colorDangerItemBgActive` | `--ant-menu-color-danger-item-bg-active` | "#fff2f0" |  |
| `dangerItemActiveBg` | `--ant-menu-danger-item-active-bg` | "#fff2f0" | Background color of danger menu item when active |
| `colorDangerItemBgSelected` | `--ant-menu-color-danger-item-bg-selected` | "#fff2f0" |  |
| `dangerItemSelectedBg` | `--ant-menu-danger-item-selected-bg` | "#fff2f0" | Background color of selected danger menu item |
| `itemMarginInline` | `--ant-menu-item-margin-inline` | "4px" | Horizontal margin of menu item |
| `horizontalItemBorderRadius` | `--ant-menu-horizontal-item-border-radius` | "0px" | Border radius of horizontal menu item |
| `horizontalItemHoverBg` | `--ant-menu-horizontal-item-hover-bg` | "transparent" | Background color of horizontal menu item when hover |
| `itemHeight` | `--ant-menu-item-height` | "40px" | Height of menu item |
| `groupTitleLineHeight` | `--ant-menu-group-title-line-height` | 1.5714285714285714 | line-height of group title |
| `collapsedWidth` | `--ant-menu-collapsed-width` | "80px" | Width when collapsed |
| `popupBg` | `--ant-menu-popup-bg` | "#ffffff" | Background color of popup |
| `itemMarginBlock` | `--ant-menu-item-margin-block` | "4px" | margin-block of menu item |
| `itemPaddingInline` | `--ant-menu-item-padding-inline` | "16px" | padding-inline of menu item |
| `horizontalLineHeight` | `--ant-menu-horizontal-line-height` | "46px" | LineHeight of horizontal menu item |
| `iconSize` | `--ant-menu-icon-size` | "14px" | Size of icon |
| `iconMarginInlineEnd` | `--ant-menu-icon-margin-inline-end` | "10px" | Spacing between icon and text |
| `collapsedIconSize` | `--ant-menu-collapsed-icon-size` | "16px" | Size of icon when collapsed |
| `groupTitleFontSize` | `--ant-menu-group-title-font-size` | "14px" | font-size of group title |
| `itemWidth` | `--ant-menu-item-width` | "calc(100% - 8px)" |  |

### Modal

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `footerBg` | `--ant-modal-footer-bg` | "transparent" | Background color of footer |
| `headerBg` | `--ant-modal-header-bg` | "transparent" | Background color of header |
| `titleLineHeight` | `--ant-modal-title-line-height` | 1.5 | Line height of title |
| `titleFontSize` | `--ant-modal-title-font-size` | "16px" | Font size of title |
| `contentBg` | `--ant-modal-content-bg` | "#ffffff" | Background color of content |
| `titleColor` | `--ant-modal-title-color` | "rgba(0,0,0,0.88)" | Font color of title |
| `contentPadding` | `--ant-modal-content-padding` | "0px" |  |
| `headerPadding` | `--ant-modal-header-padding` | "16px 24px" |  |
| `headerBorderBottom` | `--ant-modal-header-border-bottom` | "1px solid rgba(5,5,5,0.06)" |  |
| `headerMarginBottom` | `--ant-modal-header-margin-bottom` | "0px" |  |
| `bodyPadding` | `--ant-modal-body-padding` | "24px" |  |
| `footerPadding` | `--ant-modal-footer-padding` | "8px 16px" |  |
| `footerBorderTop` | `--ant-modal-footer-border-top` | "1px solid rgba(5,5,5,0.06)" |  |
| `footerBorderRadius` | `--ant-modal-footer-border-radius` | "0 0 8px 8px" |  |
| `footerMarginTop` | `--ant-modal-footer-margin-top` | "0px" |  |
| `confirmBodyPadding` | `--ant-modal-confirm-body-padding` | "32px 32px 24px" |  |
| `confirmIconMarginInlineEnd` | `--ant-modal-confirm-icon-margin-inline-end` | "16px" |  |
| `confirmBtnsMarginTop` | `--ant-modal-confirm-btns-margin-top` | "24px" |  |
| `mask` | `--ant-modal-mask` | true |  |

### Notification

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `width` | `--ant-notification-width` | "384px" | Width of Notification |
| `progressBg` | `--ant-notification-progress-bg` | "linear-gradient(90deg, #69b1ff, #1677ff)" | Background color of Notification progress bar |

### Pagination

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `itemBg` | `--ant-pagination-item-bg` | "#ffffff" | Background color of Pagination item |
| `itemSize` | `--ant-pagination-item-size` | "32px" | Size of Pagination item |
| `itemSizeSM` | `--ant-pagination-item-size-sm` | "24px" | Size of small Pagination item |
| `itemSizeLG` | `--ant-pagination-item-size-lg` | "40px" | Size of large Pagination item |
| `itemActiveBg` | `--ant-pagination-item-active-bg` | "#ffffff" | Background color of active Pagination item |
| `itemActiveColor` | `--ant-pagination-item-active-color` | "#1677ff" | Text color of active Pagination item |
| `itemActiveColorHover` | `--ant-pagination-item-active-color-hover` | "#4096ff" | Text color of active Pagination item hover |
| `itemLinkBg` | `--ant-pagination-item-link-bg` | "#ffffff" | Background color of Pagination item link |
| `itemActiveColorDisabled` | `--ant-pagination-item-active-color-disabled` | "rgba(0,0,0,0.25)" | Text color of disabled active Pagination item |
| `itemActiveBgDisabled` | `--ant-pagination-item-active-bg-disabled` | "rgba(0,0,0,0.15)" | Background color of disabled active Pagination item |
| `itemInputBg` | `--ant-pagination-item-input-bg` | "#ffffff" | Background color of input |
| `miniOptionsSizeChangerTop` | `--ant-pagination-mini-options-size-changer-top` | "0px" | Top of Pagination size changer |
| `paddingBlock` | `--ant-pagination-padding-block` | "4px" |  |
| `paddingBlockSM` | `--ant-pagination-padding-block-sm` | "0px" |  |
| `paddingBlockLG` | `--ant-pagination-padding-block-lg` | "7px" |  |
| `paddingInline` | `--ant-pagination-padding-inline` | "11px" |  |
| `paddingInlineSM` | `--ant-pagination-padding-inline-sm` | "7px" |  |
| `paddingInlineLG` | `--ant-pagination-padding-inline-lg` | "11px" |  |
| `addonBg` | `--ant-pagination-addon-bg` | "rgba(0,0,0,0.02)" |  |
| `activeBorderColor` | `--ant-pagination-active-border-color` | "#1677ff" |  |
| `hoverBorderColor` | `--ant-pagination-hover-border-color` | "#4096ff" |  |
| `activeShadow` | `--ant-pagination-active-shadow` | "0 0 0 2px rgba(5,145,255,0.1)" |  |
| `errorActiveShadow` | `--ant-pagination-error-active-shadow` | "0 0 0 2px rgba(255,38,5,0.06)" |  |
| `warningActiveShadow` | `--ant-pagination-warning-active-shadow` | "0 0 0 2px rgba(255,215,5,0.1)" |  |
| `hoverBg` | `--ant-pagination-hover-bg` | "#ffffff" |  |
| `activeBg` | `--ant-pagination-active-bg` | "#ffffff" |  |
| `inputFontSize` | `--ant-pagination-input-font-size` | "14px" |  |
| `inputFontSizeLG` | `--ant-pagination-input-font-size-lg` | "16px" |  |
| `inputFontSizeSM` | `--ant-pagination-input-font-size-sm` | "14px" |  |

### Popover

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `titleMinWidth` | `--ant-popover-title-min-width` | "177px" | Min width of Popover title |
| `arrowShadowWidth` | `--ant-popover-arrow-shadow-width` | "8.970562748477143px" |  |
| `arrowOffsetHorizontal` | `--ant-popover-arrow-offset-horizontal` | "12px" |  |
| `arrowOffsetVertical` | `--ant-popover-arrow-offset-vertical` | "8px" |  |
| `innerPadding` | `--ant-popover-inner-padding` | "0px" |  |
| `titleMarginBottom` | `--ant-popover-title-margin-bottom` | "0px" |  |
| `titlePadding` | `--ant-popover-title-padding` | "5px 16px 4px" |  |
| `titleBorderBottom` | `--ant-popover-title-border-bottom` | "1px solid rgba(5,5,5,0.06)" |  |
| `innerContentPadding` | `--ant-popover-inner-content-padding` | "12px 16px" |  |

### Progress

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `circleTextColor` | `--ant-progress-circle-text-color` | "rgba(0,0,0,0.88)" | Text color of circular progress bar |
| `defaultColor` | `--ant-progress-default-color` | "#1677ff" | Default color of progress bar |
| `remainingColor` | `--ant-progress-remaining-color` | "rgba(0,0,0,0.06)" | Color of remaining part of progress bar |
| `lineBorderRadius` | `--ant-progress-line-border-radius` | "100px" | Border radius of line progress bar |
| `circleTextFontSize` | `--ant-progress-circle-text-font-size` | "1em" | Text size of circular progress bar |
| `circleIconFontSize` | `--ant-progress-circle-icon-font-size` | "1.1666666666666667em" | Icon size of circular progress bar |

### Radio

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `radioSize` | `--ant-radio-radio-size` | "16px" | Radio size |
| `dotSize` | `--ant-radio-dot-size` | "8px" | Size of Radio dot |
| `dotColorDisabled` | `--ant-radio-dot-color-disabled` | "rgba(0,0,0,0.25)" | Color of disabled Radio dot |
| `buttonSolidCheckedColor` | `--ant-radio-button-solid-checked-color` | "#fff" | Color of checked solid Radio button text |
| `buttonSolidCheckedBg` | `--ant-radio-button-solid-checked-bg` | "#1677ff" | Background color of checked solid Radio button text |
| `buttonSolidCheckedHoverBg` | `--ant-radio-button-solid-checked-hover-bg` | "#4096ff" | Background color of checked solid Radio button text when hover |
| `buttonSolidCheckedActiveBg` | `--ant-radio-button-solid-checked-active-bg` | "#0958d9" | Background color of checked solid Radio button text when active |
| `buttonBg` | `--ant-radio-button-bg` | "#ffffff" | Background color of Radio button |
| `buttonCheckedBg` | `--ant-radio-button-checked-bg` | "#ffffff" | Background color of checked Radio button |
| `buttonColor` | `--ant-radio-button-color` | "rgba(0,0,0,0.88)" | Color of Radio button text |
| `buttonCheckedBgDisabled` | `--ant-radio-button-checked-bg-disabled` | "rgba(0,0,0,0.15)" | Background color of checked and disabled Radio button |
| `buttonCheckedColorDisabled` | `--ant-radio-button-checked-color-disabled` | "rgba(0,0,0,0.25)" | Color of checked and disabled Radio button text |
| `buttonPaddingInline` | `--ant-radio-button-padding-inline` | "15px" | Horizontal padding of Radio button |
| `wrapperMarginInlineEnd` | `--ant-radio-wrapper-margin-inline-end` | "8px" | Margin right of Radio button |
| `radioColor` | `--ant-radio-radio-color` | "#1677ff" |  |
| `radioBgColor` | `--ant-radio-radio-bg-color` | "#ffffff" |  |

### Select

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `optionSelectedColor` | `--ant-select-option-selected-color` | "rgba(0,0,0,0.88)" | Text color when option is selected |
| `optionSelectedFontWeight` | `--ant-select-option-selected-font-weight` | 600 | Font weight when option is selected |
| `optionSelectedBg` | `--ant-select-option-selected-bg` | "#e6f4ff" | Background color when option is selected |
| `optionActiveBg` | `--ant-select-option-active-bg` | "rgba(0,0,0,0.04)" | Background color when option is active |
| `optionPadding` | `--ant-select-option-padding` | "5px 12px" | Padding of option |
| `optionFontSize` | `--ant-select-option-font-size` | "14px" | Font size of option |
| `optionLineHeight` | `--ant-select-option-line-height` | 1.5714285714285714 | Line height of option |
| `optionHeight` | `--ant-select-option-height` | "32px" | Height of option |
| `selectorBg` | `--ant-select-selector-bg` | "#ffffff" | Background color of selector |
| `clearBg` | `--ant-select-clear-bg` | "#ffffff" | Background color of clear button |
| `singleItemHeightLG` | `--ant-select-single-item-height-lg` | "40px" | Height of single selected item with large size |
| `multipleItemBg` | `--ant-select-multiple-item-bg` | "rgba(0,0,0,0.06)" | Background color of multiple tag |
| `multipleItemBorderColor` | `--ant-select-multiple-item-border-color` | "transparent" | Border color of multiple tag |
| `multipleItemHeight` | `--ant-select-multiple-item-height` | "24px" | Height of multiple tag |
| `multipleItemHeightSM` | `--ant-select-multiple-item-height-sm` | "16px" | Height of multiple tag with small size |
| `multipleItemHeightLG` | `--ant-select-multiple-item-height-lg` | "32px" | Height of multiple tag with large size |
| `multipleSelectorBgDisabled` | `--ant-select-multiple-selector-bg-disabled` | "rgba(0,0,0,0.04)" | Background color of multiple selector when disabled |
| `multipleItemColorDisabled` | `--ant-select-multiple-item-color-disabled` | "rgba(0,0,0,0.25)" | Text color of multiple tag when disabled |
| `multipleItemBorderColorDisabled` | `--ant-select-multiple-item-border-color-disabled` | "transparent" | Border color of multiple tag when disabled |
| `showArrowPaddingInlineEnd` | `--ant-select-show-arrow-padding-inline-end` | "18px" | Inline end padding of arrow |
| `hoverBorderColor` | `--ant-select-hover-border-color` | "#4096ff" | Hover border color |
| `activeBorderColor` | `--ant-select-active-border-color` | "#1677ff" | Active border color |
| `activeOutlineColor` | `--ant-select-active-outline-color` | "rgba(5,145,255,0.1)" | Active outline color |
| `selectAffixPadding` | `--ant-select-select-affix-padding` | "4px" |  |

### Slider

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `controlSize` | `--ant-slider-control-size` | "10px" | Height of slider |
| `railSize` | `--ant-slider-rail-size` | "4px" | Height of rail |
| `handleSize` | `--ant-slider-handle-size` | "10px" | Size of handle |
| `handleSizeHover` | `--ant-slider-handle-size-hover` | "12px" | Size of handle when hover |
| `dotSize` | `--ant-slider-dot-size` | "8px" | Size of dot |
| `handleLineWidth` | `--ant-slider-handle-line-width` | "2px" | Border width of handle |
| `handleLineWidthHover` | `--ant-slider-handle-line-width-hover` | "2.5px" | Border width of handle when hover |
| `railBg` | `--ant-slider-rail-bg` | "rgba(0,0,0,0.04)" | Background color of rail |
| `railHoverBg` | `--ant-slider-rail-hover-bg` | "rgba(0,0,0,0.06)" | Background color of rail when hover |
| `trackBg` | `--ant-slider-track-bg` | "#91caff" | Background color of track |
| `trackHoverBg` | `--ant-slider-track-hover-bg` | "#69b1ff" | Background color of track when hover |
| `handleColor` | `--ant-slider-handle-color` | "#91caff" | Color of handle |
| `handleActiveColor` | `--ant-slider-handle-active-color` | "#1677ff" | Border color of handle when active |
| `handleActiveOutlineColor` | `--ant-slider-handle-active-outline-color` | "rgba(22,119,255,0.2)" | Outline color of handle when active |
| `handleColorDisabled` | `--ant-slider-handle-color-disabled` | "#bfbfbf" | Color of handle when disabled |
| `dotBorderColor` | `--ant-slider-dot-border-color` | "#f0f0f0" | Border color of dot |
| `dotActiveBorderColor` | `--ant-slider-dot-active-border-color` | "#91caff" | Border color of dot when active |
| `trackBgDisabled` | `--ant-slider-track-bg-disabled` | "rgba(0,0,0,0.04)" | Background color of track when disabled |

### Steps

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `titleLineHeight` | `--ant-steps-title-line-height` | "32px" |  |
| `customIconSize` | `--ant-steps-custom-icon-size` | "32px" | Size of custom icon container |
| `customIconTop` | `--ant-steps-custom-icon-top` | "0px" | Top of custom icon |
| `customIconFontSize` | `--ant-steps-custom-icon-font-size` | "24px" | Font size of custom icon |
| `iconSize` | `--ant-steps-icon-size` | "32px" | Size of icon container |
| `iconTop` | `--ant-steps-icon-top` | "-0.5px" | Top of icon |
| `iconFontSize` | `--ant-steps-icon-font-size` | "14px" | Size of icon |
| `iconSizeSM` | `--ant-steps-icon-size-sm` | "24px" | Size of small steps icon |
| `dotSize` | `--ant-steps-dot-size` | "8px" | Size of dot |
| `dotCurrentSize` | `--ant-steps-dot-current-size` | "10px" | Current size of dot |
| `navArrowColor` | `--ant-steps-nav-arrow-color` | "rgba(0,0,0,0.25)" | Color of arrow in nav |
| `navContentMaxWidth` | `--ant-steps-nav-content-max-width` | "unset" | Max width of nav content |
| `waitIconColor` | `--ant-steps-wait-icon-color` | "rgba(0,0,0,0.25)" |  |
| `waitIconBgColor` | `--ant-steps-wait-icon-bg-color` | "#ffffff" |  |
| `waitIconBorderColor` | `--ant-steps-wait-icon-border-color` | "rgba(0,0,0,0.25)" |  |
| `finishIconBgColor` | `--ant-steps-finish-icon-bg-color` | "#ffffff" |  |
| `finishIconBorderColor` | `--ant-steps-finish-icon-border-color` | "#1677ff" |  |

### Switch

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `trackHeight` | `--ant-switch-track-height` | "22px" | Height of Switch |
| `trackHeightSM` | `--ant-switch-track-height-sm` | "16px" | Height of small Switch |
| `trackMinWidth` | `--ant-switch-track-min-width` | "44px" | Minimum width of Switch |
| `trackMinWidthSM` | `--ant-switch-track-min-width-sm` | "28px" | Minimum width of small Switch |
| `trackPadding` | `--ant-switch-track-padding` | "2px" | Padding of Switch |
| `handleBg` | `--ant-switch-handle-bg` | "#fff" | Background color of Switch handle |
| `handleSize` | `--ant-switch-handle-size` | "18px" | Size of Switch handle |
| `handleSizeSM` | `--ant-switch-handle-size-sm` | "12px" | Size of small Switch handle |
| `handleShadow` | `--ant-switch-handle-shadow` | "0 2px 4px 0 rgba(0,35,11,0.2)" | Shadow of Switch handle |
| `innerMinMargin` | `--ant-switch-inner-min-margin` | "9px" | Minimum margin of content area |
| `innerMaxMargin` | `--ant-switch-inner-max-margin` | "24px" | Maximum margin of content area |
| `innerMinMarginSM` | `--ant-switch-inner-min-margin-sm` | "6px" | Minimum margin of content area of small Switch |
| `innerMaxMarginSM` | `--ant-switch-inner-max-margin-sm` | "18px" | Maximum margin of content area of small Switch |

### Table

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `headerBg` | `--ant-table-header-bg` | "#fafafa" | Background of table header |
| `headerColor` | `--ant-table-header-color` | "rgba(0,0,0,0.88)" | Color of table header text |
| `headerSortActiveBg` | `--ant-table-header-sort-active-bg` | "#f0f0f0" | Background color of table header when sorted |
| `headerSortHoverBg` | `--ant-table-header-sort-hover-bg` | "#f0f0f0" | Background color of table header when sorted and hovered |
| `bodySortBg` | `--ant-table-body-sort-bg` | "#fafafa" | Background color of table sorted column |
| `rowHoverBg` | `--ant-table-row-hover-bg` | "#fafafa" | Background color of table hovered row |
| `rowSelectedBg` | `--ant-table-row-selected-bg` | "#e6f4ff" | Background color of table selected row |
| `rowSelectedHoverBg` | `--ant-table-row-selected-hover-bg` | "#bae0ff" | Background color of table selected row when hovered |
| `rowExpandedBg` | `--ant-table-row-expanded-bg` | "rgba(0,0,0,0.02)" | Background color of table expanded row |
| `cellPaddingBlock` | `--ant-table-cell-padding-block` | "16px" | Vertical padding of table cell |
| `cellPaddingInline` | `--ant-table-cell-padding-inline` | "16px" | Horizontal padding of table cell (large size by default) |
| `cellPaddingBlockMD` | `--ant-table-cell-padding-block-md` | "12px" | Vertical padding of table cell (middle size) |
| `cellPaddingInlineMD` | `--ant-table-cell-padding-inline-md` | "8px" | Horizontal padding of table cell (middle size) |
| `cellPaddingBlockSM` | `--ant-table-cell-padding-block-sm` | "8px" | Vertical padding of table cell (small size) |
| `cellPaddingInlineSM` | `--ant-table-cell-padding-inline-sm` | "8px" | Horizontal padding of table cell (small size) |
| `borderColor` | `--ant-table-border-color` | "#f0f0f0" | Border color of table |
| `headerBorderRadius` | `--ant-table-header-border-radius` | "8px" | Border radius of table header |
| `footerBg` | `--ant-table-footer-bg` | "#fafafa" | Background of footer |
| `footerColor` | `--ant-table-footer-color` | "rgba(0,0,0,0.88)" | Color of footer text |
| `cellFontSize` | `--ant-table-cell-font-size` | "14px" | Font size of table cell (large size by default) |
| `cellFontSizeMD` | `--ant-table-cell-font-size-md` | "14px" | Font size of table cell (middle size) |
| `cellFontSizeSM` | `--ant-table-cell-font-size-sm` | "14px" | Font size of table cell (small size) |
| `headerSplitColor` | `--ant-table-header-split-color` | "#f0f0f0" | Split border color of table header |
| `fixedHeaderSortActiveBg` | `--ant-table-fixed-header-sort-active-bg` | "#f0f0f0" | Background color of fixed table header when sorted |
| `headerFilterHoverBg` | `--ant-table-header-filter-hover-bg` | "rgba(0,0,0,0.06)" | Background color of table header filter button when hovered |
| `filterDropdownMenuBg` | `--ant-table-filter-dropdown-menu-bg` | "#ffffff" | Background of filter dropdown menu item |
| `filterDropdownBg` | `--ant-table-filter-dropdown-bg` | "#ffffff" | Color of filter dropdown |
| `expandIconBg` | `--ant-table-expand-icon-bg` | "#ffffff" | Background of expand button |
| `selectionColumnWidth` | `--ant-table-selection-column-width` | "32px" | Width of selection column |
| `stickyScrollBarBg` | `--ant-table-sticky-scroll-bar-bg` | "rgba(0,0,0,0.25)" | Background of sticky scrollbar |
| `stickyScrollBarBorderRadius` | `--ant-table-sticky-scroll-bar-border-radius` | "100px" | Border radius of sticky scrollbar |
| `expandIconMarginTop` | `--ant-table-expand-icon-margin-top` | "2.5px" |  |
| `headerIconColor` | `--ant-table-header-icon-color` | "rgba(0,0,0,0.29250000000000004)" |  |
| `headerIconHoverColor` | `--ant-table-header-icon-hover-color` | "rgba(0,0,0,0.5720000000000001)" |  |
| `expandIconHalfInner` | `--ant-table-expand-icon-half-inner` | "7px" |  |
| `expandIconSize` | `--ant-table-expand-icon-size` | "17px" |  |
| `expandIconScale` | `--ant-table-expand-icon-scale` | 0.9411764705882353 |  |

### Tabs

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `cardBg` | `--ant-tabs-card-bg` | "rgba(0,0,0,0.02)" | Background color of card tab |
| `cardHeight` | `--ant-tabs-card-height` | "40px" | Height of card tab |
| `cardHeightSM` | `--ant-tabs-card-height-sm` | "32px" | Height of small card tab |
| `cardHeightLG` | `--ant-tabs-card-height-lg` | "48px" | Height of large card tab |
| `cardPadding` | `--ant-tabs-card-padding` | "8px 16px" | Padding of card tab |
| `cardPaddingSM` | `--ant-tabs-card-padding-sm` | "4px 8px" | Padding of small card tab |
| `cardPaddingLG` | `--ant-tabs-card-padding-lg` | "11px 16px" | Padding of large card tab |
| `titleFontSize` | `--ant-tabs-title-font-size` | "14px" | Font size of title |
| `titleFontSizeLG` | `--ant-tabs-title-font-size-lg` | "16px" | Font size of large title |
| `titleFontSizeSM` | `--ant-tabs-title-font-size-sm` | "14px" | Font size of small title |
| `inkBarColor` | `--ant-tabs-ink-bar-color` | "#1677ff" | Color of indicator |
| `horizontalMargin` | `--ant-tabs-horizontal-margin` | "0 0 16px 0" | Horizontal margin of horizontal tab |
| `horizontalItemGutter` | `--ant-tabs-horizontal-item-gutter` | "32px" | Horizontal gutter of horizontal tab |
| `horizontalItemMargin` | `--ant-tabs-horizontal-item-margin` | "" | Horizontal margin of horizontal tab item |
| `horizontalItemMarginRTL` | `--ant-tabs-horizontal-item-margin-rtl` | "" | Horizontal margin of horizontal tab item (RTL) |
| `horizontalItemPadding` | `--ant-tabs-horizontal-item-padding` | "12px 0" | Horizontal padding of horizontal tab item |
| `horizontalItemPaddingSM` | `--ant-tabs-horizontal-item-padding-sm` | "8px 0" | Horizontal padding of small horizontal tab item |
| `horizontalItemPaddingLG` | `--ant-tabs-horizontal-item-padding-lg` | "16px 0" | Horizontal padding of large horizontal tab item |
| `verticalItemPadding` | `--ant-tabs-vertical-item-padding` | "8px 24px" | Vertical padding of vertical tab item |
| `verticalItemMargin` | `--ant-tabs-vertical-item-margin` | "16px 0 0 0" | Vertical margin of vertical tab item |
| `itemColor` | `--ant-tabs-item-color` | "rgba(0,0,0,0.88)" | Text color of tab |
| `itemSelectedColor` | `--ant-tabs-item-selected-color` | "#1677ff" | Text color of selected tab |
| `itemHoverColor` | `--ant-tabs-item-hover-color` | "#4096ff" | Text color of hover tab |
| `itemActiveColor` | `--ant-tabs-item-active-color` | "#0958d9" | Text color of active tab |
| `cardGutter` | `--ant-tabs-card-gutter` | "2px" | Gutter of card tab |

### Tag

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `defaultBg` | `--ant-tag-default-bg` | "#f5f5f5" | Default background color |
| `defaultColor` | `--ant-tag-default-color` | "rgba(0,0,0,0.88)" | Default text color |
| `solidTextColor` | `--ant-tag-solid-text-color` | "#fff" | Default text color for solid tag. |

### Tooltip

| Token | CSS Variable | Default | Description |
| --- | --- | --- | --- |
| `maxWidth` | `--ant-tooltip-max-width` | "250px" | Max width of tooltip |
| `arrowOffsetHorizontal` | `--ant-tooltip-arrow-offset-horizontal` | "12px" |  |
| `arrowOffsetVertical` | `--ant-tooltip-arrow-offset-vertical` | "8px" |  |
| `arrowShadowWidth` | `--ant-tooltip-arrow-shadow-width` | "8.970562748477143px" |  |

### Typography

| Token               | CSS Variable                           | Default | Description            |
| ------------------- | -------------------------------------- | ------- | ---------------------- |
| `titleMarginTop`    | `--ant-typography-title-margin-top`    | "1.2em" | Margin top of title    |
| `titleMarginBottom` | `--ant-typography-title-margin-bottom` | "0.5em" | Margin bottom of title |

## Do's and Don'ts

- ✅ **Do**: Let the algorithm auto-derive palettes from `colorPrimary`. Override only when you need a specific brand color that the algorithm cannot produce.
- ❌ **Don't**: Hardcode hex values for hover, active, or background states. Always use the derived semantic tokens so dark mode works correctly.
- ✅ **Do**: Use semantic tokens (`colorText`, `colorBgContainer`) instead of raw color values. Semantic tokens adapt to algorithm changes.
- ❌ **Don't**: Create multiple `ConfigProvider` instances with different themes for the same visual area. Prefer a single provider at the app root.
- ✅ **Do**: Manage theme centrally with a single `ConfigProvider` at the app root. Use nested providers only for intentional theme zones.
- ❌ **Don't**: Reference internal or private token names that start with `INTERNAL_`. These are implementation details and may change between versions.
- ✅ **Do**: Use the rounded scale (`borderRadiusXS` through `borderRadiusLG`) instead of arbitrary pixel values for consistency.
- ❌ **Don't**: Use animation durations longer than `motionDurationSlow` (0.3s). Extended durations degrade perceived responsiveness.
- ✅ **Do**: Keep shadows subtle. Prefer `boxShadowTertiary` for slight elevation and reserve `boxShadow` for popovers and overlays.
- ❌ **Don't**: Skip contrast testing when customizing colors. Override `colorText`, `colorBgContainer`, and functional colors together, then verify WCAG 2.1 AA compliance.

## Agent Prompt Guide

### Quick Color Reference

| Name                 | Token                | Default            |
| -------------------- | -------------------- | ------------------ |
| Primary              | `colorPrimary`       | `#1677ff`          |
| Error                | `colorError`         | `#ff4d4f`          |
| Warning              | `colorWarning`       | `#faad14`          |
| Success              | `colorSuccess`       | `#52c41a`          |
| Info                 | `colorInfo`          | `#1677ff`          |
| Text                 | `colorText`          | `rgba(0,0,0,0.88)` |
| Text Secondary       | `colorTextSecondary` | `rgba(0,0,0,0.65)` |
| Background Container | `colorBgContainer`   | `#ffffff`          |
| Background Layout    | `colorBgLayout`      | `#f5f5f5`          |
| Border               | `colorBorder`        | `#d9d9d9`          |

### Example Component Prompts

1. `Create a primary Button with custom color #722ed1, using ConfigProvider to set colorPrimary and override Button.componentToken for padding control.`
2. `Build a data Table with alternating row colors using token colorFillAlter and customize header style via Table.componentToken.headerBg.`
3. `Design a dark-mode Dashboard using algorithm: theme.darkAlgorithm, override colorBgLayout to #141414, and adjust Card tokens for elevated surfaces.`
4. `Implement a compact form layout with algorithm: theme.compactAlgorithm, then fine-tune Input.componentToken.paddingBlockSM for tighter spacing.`
5. `Create a notification system using Notification.componentToken to customize width, add custom padding, and match the brand colorPrimary.`

### Non-Negotiable Iteration Rules

1. Never bypass ConfigProvider for theming—always propagate tokens through the provider tree.
2. Always derive hover/active/background variants from the seed color algorithm rather than hardcoding individual shades.
3. Maintain the 3-layer background hierarchy (layout → container → elevated) when adding new surfaces.
4. Use motion tokens for all animations—never hardcode durations or easing values inline.
5. Respect the rounded scale; do not introduce arbitrary border-radius values outside the 5-step system.
6. Test all custom themes in both light and dark algorithms before shipping.
7. Keep component token overrides minimal—prefer global token changes for broad consistency.
8. Ensure WCAG 2.1 AA contrast (4.5:1 for normal text) whenever customizing text or background colors.
9. When adding new components, follow the token naming convention: component-scoped tokens prefixed with the component name in camelCase.
