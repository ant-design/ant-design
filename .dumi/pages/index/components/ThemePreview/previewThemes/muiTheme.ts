import { useMemo } from 'react';
import { raf } from '@rc-component/util';
import { theme } from 'antd';
import type { ConfigProviderProps, GetProp } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';

type WaveConfig = GetProp<ConfigProviderProps, 'wave'>;

const createHolder = (node: HTMLElement) => {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = Number.parseInt(borderWidth, 10);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = 'inherit';
  div.style.background = 'transparent';
  div.style.zIndex = '999';
  div.style.pointerEvents = 'none';
  div.style.overflow = 'hidden';
  node.appendChild(div);

  return div;
};

const createDot = (holder: HTMLElement, color: string, left: number, top: number, size = 0) => {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.insetInlineStart = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.transform = 'translate3d(-50%, -50%, 0)';
  dot.style.transition = 'all 375ms cubic-bezier(0.0, 0, 0.2, 1)';
  holder.appendChild(dot);
  return dot;
};

const showInsetEffect: WaveConfig['showEffect'] = (node, { event, component }) => {
  if (component !== 'Button') {
    return;
  }

  const holder = createHolder(node);
  const rect = holder.getBoundingClientRect();
  const dot = createDot(
    holder,
    'rgba(255, 255, 255, 0.55)',
    event.clientX - rect.left,
    event.clientY - rect.top,
  );

  raf(() => {
    dot.ontransitionend = () => {
      holder.remove();
    };

    dot.style.width = '200px';
    dot.style.height = '200px';
    dot.style.opacity = '0';
  });
};

const useStyles = createStyles(({ css }) => ({
  buttonRoot: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    letterSpacing: 0,
  }),
  buttonMinWidth: css({
    minWidth: 64,
  }),
  buttonLarge: css({
    fontSize: 15,
  }),
  buttonSmall: css({
    fontSize: 13,
  }),
  buttonMiddle: css({
    fontSize: 14,
  }),
  buttonEmphasis: css({
    fontWeight: 500,
    lineHeight: 1.75,
  }),
  buttonUppercase: css({
    textTransform: 'uppercase',
  }),
  buttonDashed: css({
    borderStyle: 'solid',
    borderColor: 'rgba(25, 118, 210, 0.5)',
    color: '#1976d2',
  }),
  buttonDangerText: css({
    color: '#d32f2f',
  }),
  buttonDangerSolid: css({
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
    color: '#fff',
  }),
  buttonElevation: css({
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  }),
  buttonIcon: css({
    fontSize: 18,
  }),
  buttonIconLarge: css({
    fontSize: 22,
  }),
  inputRoot: css({
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    boxShadow: 'none',
  }),
  inputRootError: css({
    borderColor: '#d32f2f',
  }),
  inputElement: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 1.4375,
  }),
  inputElementSmall: css({
    lineHeight: '32px',
  }),
  inputNumberRoot: css({
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    boxShadow: 'none',
    fontSize: 14,
    lineHeight: 1.43,
  }),
  fieldRoot: css({
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    boxShadow: 'none',
  }),
  fieldInput: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)',
  }),
  selectRoot: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }),
  selectPopupRoot: css({
    borderRadius: 4,
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    paddingBlock: 8,
  }),
  popupRoot: css({
    borderRadius: 4,
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  }),
  pickerPopupRoot: css({
    borderRadius: 4,
    filter: 'none',
    boxShadow: 'none',
  }),
  modalRoot: css({
    boxShadow: 'none',
  }),
  modalContainer: css({
    backgroundColor: '#fff',
    borderRadius: 4,
  }),
  modalContainerOpen: css({
    boxShadow:
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  }),
  modalContainerClosed: css({
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  }),
  modalMask: css({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }),
  alertRoot: css({
    borderRadius: 4,
    borderColor: 'transparent',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    lineHeight: 1.43,
  }),
  alertSuccess: css({
    color: 'rgb(30, 70, 32)',
    backgroundColor: 'rgb(237, 247, 237)',
  }),
  alertWarning: css({
    color: 'rgb(102, 60, 0)',
    backgroundColor: 'rgb(255, 244, 229)',
  }),
  alertError: css({
    color: 'rgb(95, 33, 32)',
    backgroundColor: 'rgb(253, 237, 237)',
  }),
  alertInfo: css({
    color: 'rgb(1, 67, 97)',
    backgroundColor: 'rgb(229, 246, 253)',
  }),
  alertTitle: css({
    color: 'inherit',
    fontWeight: 500,
  }),
  alertDescription: css({
    color: 'inherit',
  }),
  colorPickerRoot: css({
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    height: 36,
    minHeight: 36,
    fontSize: 14,
    lineHeight: '20px',
  }),
  colorPickerBody: css({
    flex: '0 0 28px',
    width: 28,
    height: 28,
    minWidth: 28,
    borderRadius: 2,
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.12)',
  }),
  colorPickerContent: css({
    borderRadius: 2,
  }),
  colorPickerDescription: css({
    marginInlineStart: 8,
    marginInlineEnd: 8,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: '20px',
  }),
  progressLine: css({
    height: 4,
  }),
  notificationRoot: css({
    borderRadius: 4,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }),
  notificationTitle: css({
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: 'rgba(0, 0, 0, 0.87)',
  }),
  notificationDescription: css({
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 1.43,
  }),
  otpInput: css({
    width: 36,
    height: 36,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    lineHeight: '20px',
  }),
  messageRoot: css({
    borderRadius: 4,
    backgroundColor: '#212121',
    color: '#fff',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }),
  tooltipRoot: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }),
  tooltipContainer: css({
    minHeight: 0,
    padding: '4px 8px',
    borderRadius: 4,
    backgroundColor: 'rgba(97, 97, 97, 0.92)',
    color: '#fff',
    fontSize: 11,
    lineHeight: '16px',
    boxShadow: 'none',
  }),
  popoverRoot: css({
    borderRadius: 4,
    filter: 'none',
    boxShadow: 'none',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }),
  popoverContainer: css({
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    lineHeight: 1.43,
  }),
  popoverTitle: css({
    padding: 0,
    borderBottom: 0,
    fontSize: 16,
    fontWeight: 500,
  }),
  popoverContent: css({
    padding: 0,
  }),
  popconfirmContainer: css({
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  }),
  layoutRoot: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#fff',
  }),
  tagRoot: css({
    borderRadius: 11,
  }),
  appRoot: css({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: 'rgba(0, 0, 0, 0.87)',
  }),
}));

const useMuiTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      popupMatchSelectWidth: false,
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1976d2',
          colorSuccess: '#2e7d32',
          colorWarning: '#ed6c02',
          colorError: '#d32f2f',
          colorInfo: '#0288d1',
          colorLink: '#1976d2',
          colorLinkHover: '#42a5f5',
          colorLinkActive: '#1565c0',

          colorTextBase: '#000',
          colorBgBase: '#fff',
          colorText: 'rgba(0, 0, 0, 0.87)',
          colorTextSecondary: 'rgba(0, 0, 0, 0.6)',
          colorTextTertiary: 'rgba(0, 0, 0, 0.38)',
          colorTextQuaternary: 'rgba(0, 0, 0, 0.26)',
          colorTextDisabled: 'rgba(0, 0, 0, 0.38)',
          colorTextPlaceholder: 'rgba(0, 0, 0, 0.38)',
          colorTextHeading: 'rgba(0, 0, 0, 0.87)',
          colorTextLabel: 'rgba(0, 0, 0, 0.6)',
          colorTextDescription: 'rgba(0, 0, 0, 0.6)',
          colorTextLightSolid: '#fff',
          colorIcon: 'rgba(0, 0, 0, 0.54)',
          colorIconHover: 'rgba(0, 0, 0, 0.87)',
          colorBgContainer: '#fff',
          colorBgElevated: '#fff',
          colorBgLayout: '#fff',
          colorBgSpotlight: 'rgba(97, 97, 97, 0.92)',
          colorBgMask: 'rgba(0, 0, 0, 0.5)',
          colorBgContainerDisabled: 'rgba(0, 0, 0, 0.12)',
          colorBgTextHover: 'rgba(0, 0, 0, 0.04)',
          colorBgTextActive: 'rgba(0, 0, 0, 0.08)',
          colorBorder: 'rgba(0, 0, 0, 0.12)',
          colorBorderSecondary: 'rgba(0, 0, 0, 0.12)',
          colorSplit: 'rgba(0, 0, 0, 0.12)',
          colorFill: 'rgba(0, 0, 0, 0.12)',
          colorFillSecondary: 'rgba(0, 0, 0, 0.08)',
          colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
          colorFillQuaternary: '#f5f5f5',
          colorFillContent: 'rgba(0, 0, 0, 0.04)',
          colorFillContentHover: 'rgba(0, 0, 0, 0.08)',
          colorFillAlter: '#f5f5f5',
          colorHighlight: '#d32f2f',

          colorPrimaryBg: '#e3f2fd',
          colorPrimaryBgHover: '#bbdefb',
          colorPrimaryBorder: '#90caf9',
          colorPrimaryBorderHover: '#64b5f6',
          colorPrimaryHover: '#42a5f5',
          colorPrimaryActive: '#1565c0',
          colorPrimaryText: '#1976d2',
          colorPrimaryTextHover: '#42a5f5',
          colorPrimaryTextActive: '#1565c0',
          colorSuccessBg: '#e8f5e9',
          colorSuccessBgHover: '#c8e6c9',
          colorSuccessBorder: '#a5d6a7',
          colorSuccessBorderHover: '#81c784',
          colorSuccessHover: '#4caf50',
          colorSuccessActive: '#1b5e20',
          colorSuccessText: '#2e7d32',
          colorSuccessTextHover: '#4caf50',
          colorSuccessTextActive: '#1b5e20',
          colorWarningBg: '#fff3e0',
          colorWarningBgHover: '#ffe0b2',
          colorWarningBorder: '#ffcc80',
          colorWarningBorderHover: '#ffb74d',
          colorWarningHover: '#ff9800',
          colorWarningActive: '#e65100',
          colorWarningText: '#ed6c02',
          colorWarningTextHover: '#ff9800',
          colorWarningTextActive: '#e65100',
          colorErrorBg: '#ffebee',
          colorErrorBgHover: '#ffcdd2',
          colorErrorBorder: '#ef9a9a',
          colorErrorBorderHover: '#e57373',
          colorErrorHover: '#ef5350',
          colorErrorActive: '#c62828',
          colorErrorText: '#d32f2f',
          colorErrorTextHover: '#ef5350',
          colorErrorTextActive: '#c62828',
          colorInfoBg: '#e1f5fe',
          colorInfoBgHover: '#b3e5fc',
          colorInfoBorder: '#81d4fa',
          colorInfoBorderHover: '#4fc3f7',
          colorInfoHover: '#03a9f4',
          colorInfoActive: '#01579b',
          colorInfoText: '#0288d1',
          colorInfoTextHover: '#03a9f4',
          colorInfoTextActive: '#01579b',

          controlHeight: 32,
          controlHeightSM: 24,
          controlHeightLG: 40,
          controlPaddingHorizontal: 14,
          controlPaddingHorizontalSM: 8,
          controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          controlItemBgActive: 'rgba(25, 118, 210, 0.08)',
          controlItemBgActiveHover: 'rgba(25, 118, 210, 0.12)',
          controlOutline: 'rgba(25, 118, 210, 0.12)',
          controlOutlineWidth: 2,
          colorErrorOutline: 'rgba(211, 47, 47, 0.12)',
          colorWarningOutline: 'rgba(237, 108, 2, 0.12)',

          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontFamilyCode: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
          fontSize: 14,
          fontSizeSM: 12,
          fontSizeLG: 16,
          fontSizeXL: 20,
          lineHeight: 1.43,
          lineHeightSM: 1.66,
          lineHeightLG: 1.5,
          fontWeightStrong: 500,

          lineWidth: 1,
          lineType: 'solid',
          borderRadius: 4,
          borderRadiusXS: 1,
          borderRadiusSM: 2,
          borderRadiusLG: 4,
          borderRadiusOuter: 4,
          sizeUnit: 4,
          sizeStep: 4,
          sizePopupArrow: 8,

          paddingXXS: 4,
          paddingXS: 8,
          paddingSM: 12,
          padding: 16,
          paddingMD: 16,
          paddingLG: 24,
          paddingXL: 32,
          paddingContentHorizontal: 16,
          paddingContentHorizontalLG: 24,
          paddingContentVertical: 8,
          paddingContentVerticalLG: 12,
          marginXXS: 4,
          marginXS: 8,
          marginSM: 12,
          margin: 16,
          marginMD: 16,
          marginLG: 24,
          marginXL: 32,

          boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          boxShadowSecondary:
            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
          boxShadowTertiary: '0px 1px 2px 0px rgba(0,0,0,0.12)',
          dropShadowPopover: 'none',

          motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          motionEaseOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
          motionEaseIn: 'cubic-bezier(0.4, 0, 1, 1)',
          motionDurationFast: '150ms',
          motionDurationMid: '200ms',
          motionDurationSlow: '300ms',
          zIndexBase: 0,
          zIndexPopupBase: 1300,
        },
        components: {
          Alert: {
            defaultPadding: '6px 16px',
            withDescriptionPadding: '16px',
            borderRadiusLG: 4,
          },
          Anchor: {
            colorPrimary: '#1976d2',
            colorText: 'rgba(0, 0, 0, 0.6)',
          },
          Avatar: {
            containerSize: 40,
            containerSizeLG: 56,
            containerSizeSM: 32,
            textFontSize: 20,
            textFontSizeLG: 24,
            textFontSizeSM: 14,
          },
          Badge: {
            indicatorHeight: 20,
            indicatorHeightSM: 14,
            dotSize: 8,
            textFontSize: 12,
            textFontSizeSM: 10,
            colorBgContainer: '#d32f2f',
            colorError: '#d32f2f',
            colorSuccess: '#2e7d32',
            colorWarning: '#ed6c02',
            colorInfo: '#1976d2',
          },
          Breadcrumb: {
            itemColor: 'rgba(0, 0, 0, 0.6)',
            lastItemColor: 'rgba(0, 0, 0, 0.87)',
            linkColor: 'rgba(0, 0, 0, 0.6)',
            linkHoverColor: 'rgba(0, 0, 0, 0.87)',
            separatorColor: 'rgba(0, 0, 0, 0.38)',
          },
          Button: {
            controlHeight: 36,
            controlHeightSM: 30,
            controlHeightLG: 40,
            fontWeight: 500,
            iconGap: 8,
            primaryColor: '#fff',
            primaryShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            defaultShadow: 'none',
            dangerColor: '#fff',
            dangerShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            textTextColor: '#1976d2',
            textTextHoverColor: '#1976d2',
            textTextActiveColor: '#1565c0',
            textHoverBg: 'rgba(25, 118, 210, 0.04)',
            linkHoverBg: 'rgba(25, 118, 210, 0.04)',
            paddingInline: 16,
            paddingInlineSM: 10,
            paddingInlineLG: 22,
            paddingBlock: 6,
            paddingBlockSM: 4,
            paddingBlockLG: 7,
            contentFontSize: 14,
            contentFontSizeSM: 13,
            contentFontSizeLG: 15,
            contentLineHeight: 1.75,
            contentLineHeightSM: 1.75,
            contentLineHeightLG: 1.75,
            onlyIconSize: 18,
            onlyIconSizeSM: 18,
            onlyIconSizeLG: 22,
            borderRadius: 4,
            borderRadiusSM: 4,
            borderRadiusLG: 4,
          },
          Calendar: {
            fullBg: '#fff',
            fullPanelBg: '#fff',
            itemActiveBg: 'rgba(25, 118, 210, 0.08)',
            colorPrimary: '#1976d2',
          },
          Card: {
            headerBg: '#fff',
            headerFontSize: 16,
            headerFontSizeSM: 14,
            headerHeight: 48,
            headerHeightSM: 40,
            headerPadding: 16,
            headerPaddingSM: 12,
            bodyPadding: 16,
            bodyPaddingSM: 12,
            actionsBg: '#fff',
            extraColor: 'rgba(0, 0, 0, 0.6)',
            borderRadiusLG: 4,
          },
          Cascader: {
            optionSelectedBg: 'rgba(25, 118, 210, 0.08)',
            optionSelectedColor: 'rgba(0, 0, 0, 0.87)',
            optionSelectedFontWeight: 400,
            optionPadding: '6px 16px',
            optionFontSize: 14,
            optionLineHeight: 1.5,
            optionHeight: 36,
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          },
          Checkbox: {
            colorPrimary: '#1976d2',
            colorPrimaryHover: '#1976d2',
            colorBorder: 'rgba(0, 0, 0, 0.54)',
            borderRadiusSM: 2,
          },
          Collapse: {
            headerBg: '#fff',
            contentBg: '#fff',
            headerPadding: '12px 16px',
            contentPadding: '16px',
            borderRadiusLG: 4,
          },
          ColorPicker: {
            colorBgElevated: '#fff',
            colorBorder: 'rgba(0, 0, 0, 0.23)',
            colorPrimaryHover: 'rgba(0, 0, 0, 0.87)',
            controlOutline: 'transparent',
            controlOutlineWidth: 0,
            borderRadius: 4,
            controlHeight: 36,
            controlHeightSM: 36,
            controlHeightLG: 40,
            fontSize: 14,
            fontSizeSM: 14,
            lineHeightSM: 1.43,
            boxShadowSecondary:
              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
          },
          DatePicker: {
            activeBorderColor: '#1976d2',
            hoverBorderColor: 'rgba(0, 0, 0, 0.87)',
            activeShadow: 'none',
            cellActiveWithRangeBg: 'rgba(25, 118, 210, 0.08)',
            cellHoverWithRangeBg: 'rgba(25, 118, 210, 0.04)',
            addonBg: '#fff',
            borderRadius: 4,
            controlHeight: 36,
            controlHeightSM: 36,
            controlHeightLG: 40,
            colorBorder: 'rgba(0, 0, 0, 0.23)',
            inputFontSize: 14,
            inputFontSizeLG: 16,
            inputFontSizeSM: 14,
            boxShadowSecondary:
              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
          },
          Descriptions: {
            labelBg: '#f5f5f5',
            titleMarginBottom: 16,
            itemPaddingBottom: 12,
          },
          Divider: {
            colorSplit: 'rgba(0, 0, 0, 0.12)',
            textPaddingInline: 16,
          },
          Drawer: {
            zIndexPopup: 1200,
            colorBgElevated: '#fff',
            boxShadow:
              '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
            footerPaddingBlock: 8,
            footerPaddingInline: 16,
          },
          Dropdown: {
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
            controlItemBgActive: 'rgba(25, 118, 210, 0.08)',
            paddingBlock: 8,
            borderRadiusLG: 4,
            boxShadowSecondary:
              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            zIndexPopup: 1500,
          },
          Empty: {
            colorTextDescription: 'rgba(0, 0, 0, 0.6)',
          },
          FloatButton: {
            colorBgElevated: '#1976d2',
            colorTextLightSolid: '#fff',
            boxShadowSecondary:
              '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
            borderRadiusLG: 28,
          },
          Form: {
            labelColor: 'rgba(0, 0, 0, 0.6)',
            labelFontSize: 14,
            itemMarginBottom: 24,
            verticalLabelPadding: '0 0 8px',
          },
          Image: {
            previewOperationColor: '#fff',
            previewOperationColorDisabled: 'rgba(255, 255, 255, 0.5)',
            zIndexPopup: 1300,
          },
          Input: {
            controlHeight: 36,
            controlHeightSM: 36,
            controlHeightLG: 40,
            activeShadow: 'none',
            hoverBorderColor: 'rgba(0, 0, 0, 0.87)',
            activeBorderColor: '#1976d2',
            errorActiveShadow: 'none',
            warningActiveShadow: 'none',
            paddingInline: 14,
            paddingInlineSM: 10,
            paddingInlineLG: 14,
            paddingBlock: 5,
            paddingBlockSM: 3,
            paddingBlockLG: 8,
            addonBg: '#f5f5f5',
            inputFontSize: 14,
            inputFontSizeLG: 16,
            inputFontSizeSM: 14,
            borderRadius: 4,
          },
          InputNumber: {
            controlHeight: 36,
            controlHeightSM: 36,
            controlHeightLG: 40,
            activeShadow: 'none',
            hoverBorderColor: 'rgba(0, 0, 0, 0.87)',
            activeBorderColor: '#1976d2',
            errorActiveShadow: 'none',
            warningActiveShadow: 'none',
            inputFontSize: 14,
            inputFontSizeLG: 16,
            inputFontSizeSM: 14,
            paddingInline: 14,
            paddingInlineSM: 10,
            paddingInlineLG: 14,
            paddingBlock: 5,
            paddingBlockSM: 3,
            paddingBlockLG: 8,
            addonBg: '#f5f5f5',
            handleHoverColor: '#1976d2',
            handleActiveBg: 'rgba(0, 0, 0, 0.08)',
            borderRadius: 4,
          },
          Layout: {
            bodyBg: '#fff',
            footerBg: '#fff',
            headerBg: '#fff',
            headerHeight: 64,
            headerPadding: '0 24px',
            headerColor: 'rgba(0, 0, 0, 0.87)',
            siderBg: '#fff',
            triggerBg: '#f5f5f5',
            triggerColor: 'rgba(0, 0, 0, 0.87)',
            lightSiderBg: '#fff',
            lightTriggerBg: '#f5f5f5',
            lightTriggerColor: 'rgba(0, 0, 0, 0.87)',
          },
          List: {
            itemPadding: '8px 16px',
            itemPaddingSM: '6px 16px',
            itemPaddingLG: '12px 24px',
          },
          Mentions: {
            activeShadow: 'none',
            hoverBorderColor: 'rgba(0, 0, 0, 0.87)',
            activeBorderColor: '#1976d2',
            errorActiveShadow: 'none',
            warningActiveShadow: 'none',
            paddingInline: 14,
            paddingBlock: 5,
            borderRadius: 4,
          },
          Menu: {
            fontSize: 14,
            activeBarBorderWidth: 0,
            activeBarHeight: 0,
            activeBarWidth: 0,
            itemBg: 'transparent',
            itemColor: 'rgba(0, 0, 0, 0.87)',
            itemHoverBg: 'rgba(0, 0, 0, 0.04)',
            itemHoverColor: 'rgba(0, 0, 0, 0.87)',
            itemActiveBg: 'rgba(0, 0, 0, 0.08)',
            itemSelectedBg: 'rgba(25, 118, 210, 0.08)',
            itemSelectedColor: '#1976d2',
            itemDisabledColor: 'rgba(0, 0, 0, 0.38)',
            subMenuItemBg: 'transparent',
            subMenuItemSelectedColor: '#1976d2',
            itemBorderRadius: 0,
            subMenuItemBorderRadius: 0,
            itemHeight: 40,
            itemMarginBlock: 0,
            itemMarginInline: 0,
            itemPaddingInline: 16,
            iconSize: 18,
            iconMarginInlineEnd: 12,
            groupTitleColor: 'rgba(0, 0, 0, 0.6)',
            groupTitleFontSize: 14,
            darkItemBg: '#212121',
            darkItemColor: 'rgba(255, 255, 255, 0.7)',
            darkItemHoverBg: 'rgba(255, 255, 255, 0.08)',
            darkItemHoverColor: '#fff',
            darkItemSelectedBg: 'rgba(25, 118, 210, 0.24)',
            darkItemSelectedColor: '#fff',
            darkSubMenuItemBg: 'transparent',
          },
          Message: {
            zIndexPopup: 1400,
            contentBg: '#212121',
            contentPadding: '6px 16px',
            borderRadiusLG: 4,
            boxShadow:
              '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
          },
          Modal: {
            titleColor: 'rgba(0, 0, 0, 0.87)',
            titleFontSize: 20,
            titleLineHeight: 1.6,
            borderRadiusLG: 4,
            boxShadow:
              '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
          },
          Notification: {
            width: 384,
            colorSuccessBg: 'rgb(237, 247, 237)',
            colorErrorBg: 'rgb(253, 237, 237)',
            colorInfoBg: 'rgb(229, 246, 253)',
            colorWarningBg: 'rgb(255, 244, 229)',
            progressBg: '#1976d2',
            zIndexPopup: 1400,
            borderRadiusLG: 4,
            boxShadow:
              '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          },
          Pagination: {
            itemActiveBg: '#1976d2',
            itemActiveColor: '#fff',
            itemBg: 'transparent',
            itemInputBg: '#fff',
            itemLinkBg: 'transparent',
            itemSize: 32,
            itemSizeSM: 26,
            borderRadius: 16,
          },
          Popconfirm: {
            colorBgElevated: '#fff',
            boxShadowSecondary:
              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            borderRadiusLG: 4,
            zIndexPopup: 1500,
          },
          Popover: {
            titleMinWidth: 0,
            colorBgElevated: '#fff',
            dropShadowPopover:
              'drop-shadow(0px 2px 1px rgba(0,0,0,0.2)) drop-shadow(0px 1px 1px rgba(0,0,0,0.14)) drop-shadow(0px 1px 3px rgba(0,0,0,0.12))',
            innerPadding: 16,
            titleMarginBottom: 8,
            titlePadding: 0,
            innerContentPadding: 0,
            boxShadowSecondary:
              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            borderRadiusLG: 4,
            zIndexPopup: 1500,
          },
          Progress: {
            circleTextColor: 'rgba(0, 0, 0, 0.87)',
            defaultColor: '#1976d2',
            remainingColor: '#a7caed',
            lineBorderRadius: 0,
          },
          QRCode: {
            colorText: 'rgba(0, 0, 0, 0.87)',
            colorBorder: 'rgba(0, 0, 0, 0.12)',
          },
          Radio: {
            buttonBg: '#fff',
            buttonCheckedBg: '#fff',
            buttonColor: 'rgba(0, 0, 0, 0.87)',
            buttonCheckedBgDisabled: 'rgba(0, 0, 0, 0.12)',
            buttonCheckedColorDisabled: 'rgba(0, 0, 0, 0.38)',
            colorPrimary: '#1976d2',
            colorPrimaryHover: '#1976d2',
            colorBorder: 'rgba(0, 0, 0, 0.54)',
            dotSize: 10,
            radioSize: 20,
            wrapperMarginInlineEnd: 16,
          },
          Rate: {
            starColor: '#faaf00',
            starBg: 'rgba(0, 0, 0, 0.12)',
            starSize: 20,
          },
          Result: {
            titleFontSize: 24,
            subtitleFontSize: 14,
            iconFontSize: 72,
          },
          Segmented: {
            itemColor: 'rgba(0, 0, 0, 0.54)',
            itemHoverColor: 'rgba(0, 0, 0, 0.87)',
            itemHoverBg: 'rgba(0, 0, 0, 0.04)',
            itemActiveBg: 'rgba(0, 0, 0, 0.08)',
            itemSelectedBg: 'rgba(0, 0, 0, 0.08)',
            itemSelectedColor: 'rgba(0, 0, 0, 0.87)',
            trackBg: 'rgba(0, 0, 0, 0.04)',
            trackPadding: 4,
            borderRadius: 20,
            borderRadiusSM: 16,
          },
          Select: {
            controlHeight: 36,
            controlHeightSM: 36,
            controlHeightLG: 40,
            fontSize: 14,
            colorBorder: 'rgba(0, 0, 0, 0.23)',
            activeBorderColor: '#1976d2',
            activeOutlineColor: 'transparent',
            hoverBorderColor: 'rgba(0, 0, 0, 0.87)',
            fontSizeSM: 14,
            optionSelectedColor: 'rgba(0, 0, 0, 0.87)',
            optionSelectedFontWeight: 400,
            optionSelectedBg: 'rgba(25, 118, 210, 0.08)',
            optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            optionPadding: '6px 16px',
            optionFontSize: 14,
            optionLineHeight: 1.5,
            optionHeight: 34,
            selectorBg: '#fff',
            clearBg: '#fff',
            multipleItemBg: '#eeeeee',
            multipleItemBorderColor: 'transparent',
            multipleItemHeight: 24,
            multipleItemHeightLG: 28,
            multipleItemHeightSM: 20,
            zIndexPopup: 1500,
            borderRadius: 4,
          },
          Skeleton: {
            gradientFromColor: '#f5f5f5',
            gradientToColor: '#eeeeee',
          },
          Slider: {
            railSize: 4,
            handleSize: 20,
            handleSizeHover: 20,
            handleLineWidth: 0,
            handleLineWidthHover: 0,
            dotSize: 0,
            railBg: 'rgba(25, 118, 210, 0.12)',
            railHoverBg: 'rgba(25, 118, 210, 0.16)',
            trackBg: '#1976d2',
            trackHoverBg: '#1976d2',
            handleColor: '#1976d2',
            handleActiveColor: '#1976d2',
            handleActiveOutlineColor: 'rgba(25, 118, 210, 0.12)',
            dotBorderColor: 'transparent',
            dotActiveBorderColor: 'transparent',
            trackBgDisabled: 'rgba(0, 0, 0, 0.12)',
            handleColorDisabled: 'rgba(0, 0, 0, 0.26)',
            controlSize: 30,
          },
          Spin: {
            colorPrimary: '#1976d2',
            dotSize: 24,
            dotSizeLG: 32,
            dotSizeSM: 16,
          },
          Statistic: {
            titleFontSize: 14,
            contentFontSize: 28,
            colorTextDescription: 'rgba(0, 0, 0, 0.6)',
          },
          Steps: {
            iconSize: 24,
            iconSizeSM: 20,
            iconTop: 0,
            titleLineHeight: 1.5,
            customIconSize: 24,
            customIconTop: 0,
            navArrowColor: 'rgba(0, 0, 0, 0.38)',
            colorPrimary: '#1976d2',
            colorText: 'rgba(0, 0, 0, 0.87)',
            colorTextDescription: 'rgba(0, 0, 0, 0.6)',
            colorTextDisabled: 'rgba(0, 0, 0, 0.38)',
          },
          Switch: {
            trackHeight: 22,
            trackHeightSM: 18,
            trackMinWidth: 42,
            trackMinWidthSM: 32,
            trackPadding: 2,
            handleBg: '#fff',
            handleShadow:
              '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            handleSize: 18,
            handleSizeSM: 14,
            innerMinMargin: 6,
            innerMaxMargin: 22,
            innerMinMarginSM: 4,
            innerMaxMarginSM: 18,
            colorPrimary: '#1976d2',
            colorTextQuaternary: 'rgba(0, 0, 0, 0.38)',
          },
          Table: {
            headerBg: '#fff',
            headerColor: 'rgba(0, 0, 0, 0.87)',
            headerSortActiveBg: 'rgba(0, 0, 0, 0.08)',
            headerSortHoverBg: 'rgba(0, 0, 0, 0.04)',
            bodySortBg: 'rgba(0, 0, 0, 0.04)',
            rowHoverBg: 'rgba(0, 0, 0, 0.04)',
            rowSelectedBg: 'rgba(25, 118, 210, 0.08)',
            rowSelectedHoverBg: 'rgba(25, 118, 210, 0.12)',
            rowExpandedBg: '#fafafa',
            cellPaddingBlock: 12,
            cellPaddingInline: 16,
            cellPaddingBlockMD: 10,
            cellPaddingInlineMD: 16,
            cellPaddingBlockSM: 8,
            cellPaddingInlineSM: 16,
            cellFontSize: 14,
            cellFontSizeMD: 14,
            cellFontSizeSM: 13,
            borderColor: 'rgba(0, 0, 0, 0.12)',
            headerBorderRadius: 0,
            headerSplitColor: 'rgba(0, 0, 0, 0.12)',
            footerBg: '#fff',
            footerColor: 'rgba(0, 0, 0, 0.6)',
            filterDropdownBg: '#fff',
            filterDropdownMenuBg: '#fff',
            stickyScrollBarBg: 'rgba(0, 0, 0, 0.12)',
            stickyScrollBarBorderRadius: 4,
          },
          Tabs: {
            horizontalItemGutter: 32,
            horizontalItemPadding: '12px 0',
            horizontalItemPaddingSM: '8px 0',
            horizontalItemPaddingLG: '16px 0',
            titleFontSize: 14,
            titleFontSizeLG: 14,
            titleFontSizeSM: 14,
            inkBarColor: '#1976d2',
            itemColor: 'rgba(0, 0, 0, 0.6)',
            itemHoverColor: '#1976d2',
            itemSelectedColor: '#1976d2',
            itemActiveColor: '#1565c0',
          },
          Tag: {
            defaultBg: '#f5f5f5',
            defaultColor: 'rgba(0, 0, 0, 0.87)',
            solidTextColor: '#fff',
            borderRadiusSM: 11,
          },
          Timeline: {
            dotBg: '#fff',
            dotBorderWidth: 2,
            tailColor: 'rgba(0, 0, 0, 0.12)',
            colorPrimary: '#1976d2',
          },
          Tooltip: {
            colorBgSpotlight: 'rgba(97, 97, 97, 0.92)',
            colorTextLightSolid: '#fff',
            borderRadius: 4,
            fontSize: 11,
            paddingXS: 4,
            paddingSM: 8,
            boxShadowSecondary: 'none',
            zIndexPopup: 1500,
          },
          Tour: {
            colorBgElevated: '#fff',
            boxShadowSecondary:
              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            borderRadiusLG: 4,
            zIndexPopup: 1500,
          },
          Transfer: {
            headerHeight: 48,
            itemHeight: 40,
            listHeight: 200,
            listWidth: 180,
            colorBgContainer: '#fff',
            colorBorder: 'rgba(0, 0, 0, 0.12)',
          },
          Tree: {
            nodeHoverBg: 'rgba(0, 0, 0, 0.04)',
            nodeSelectedBg: 'rgba(25, 118, 210, 0.08)',
            titleHeight: 32,
            indentSize: 24,
          },
          TreeSelect: {
            nodeHoverBg: 'rgba(0, 0, 0, 0.04)',
            nodeSelectedBg: 'rgba(25, 118, 210, 0.08)',
            titleHeight: 32,
            indentSize: 24,
            optionSelectedBg: 'rgba(25, 118, 210, 0.08)',
            optionActiveBg: 'rgba(0, 0, 0, 0.04)',
          },
          Typography: {
            titleMarginTop: '1.2em',
            titleMarginBottom: '0.35em',
          },
          Upload: {
            actionsColor: 'rgba(0, 0, 0, 0.6)',
            colorPrimaryHover: '#42a5f5',
          },
        },
      },
      wave: {
        showEffect: showInsetEffect,
      },
      button: {
        classNames: ({ props }) => ({
          root: clsx(
            styles.buttonRoot,
            {
              large: styles.buttonLarge,
              medium: styles.buttonMiddle,
              small: styles.buttonSmall,
              middle: styles.buttonMiddle,
            }[props.size ?? 'middle'],
            {
              primary: clsx(
                props.shape !== 'circle' && styles.buttonMinWidth,
                styles.buttonEmphasis,
                props.children && styles.buttonUppercase,
                styles.buttonElevation,
              ),
              dashed: clsx(
                props.shape !== 'circle' && styles.buttonMinWidth,
                styles.buttonEmphasis,
                props.children && styles.buttonUppercase,
                styles.buttonDashed,
              ),
              danger: clsx(
                props.shape !== 'circle' && styles.buttonMinWidth,
                styles.buttonEmphasis,
                props.children && styles.buttonUppercase,
                props.type === 'dashed' && styles.buttonDashed,
                props.children ? styles.buttonDangerSolid : styles.buttonDangerText,
                (props.type === 'primary' || props.children) && styles.buttonElevation,
              ),
              default: undefined,
            }[
              props.danger
                ? 'danger'
                : props.type === 'primary'
                  ? 'primary'
                  : props.type === 'dashed'
                    ? 'dashed'
                    : 'default'
            ],
          ),
          icon: props.size === 'large' ? styles.buttonIconLarge : styles.buttonIcon,
        }),
      },
      input: {
        classNames: ({ props }) => ({
          root: clsx(styles.inputRoot, props.status === 'error' && styles.inputRootError),
          input: clsx(styles.inputElement, props.size === 'small' && styles.inputElementSmall),
        }),
      },
      inputNumber: {
        classNames: {
          root: styles.inputNumberRoot,
          input: styles.fieldInput,
        },
      },
      textArea: {
        classNames: {
          root: styles.fieldRoot,
          input: styles.fieldInput,
        },
      },
      mentions: {
        classNames: {
          root: styles.fieldRoot,
          input: styles.fieldInput,
        },
      },
      select: {
        classNames: {
          root: styles.selectRoot,
          popup: {
            root: styles.selectPopupRoot,
          },
        },
      },
      cascader: {
        classNames: {
          root: styles.selectRoot,
          popup: {
            root: styles.popupRoot,
          },
        },
      },
      treeSelect: {
        classNames: {
          root: styles.selectRoot,
          popup: {
            root: styles.popupRoot,
          },
        },
      },
      datePicker: {
        classNames: {
          root: styles.fieldRoot,
          input: styles.fieldInput,
          popup: {
            root: styles.pickerPopupRoot,
          },
        },
      },
      timePicker: {
        classNames: {
          root: styles.fieldRoot,
          input: styles.fieldInput,
          popup: {
            root: styles.pickerPopupRoot,
          },
        },
      },
      dropdown: {},
      card: {},
      modal: {
        classNames: ({ props }) => ({
          root: styles.modalRoot,
          container: clsx(
            styles.modalContainer,
            props.open === true ? styles.modalContainerOpen : styles.modalContainerClosed,
          ),
          mask: styles.modalMask,
        }),
      },
      alert: {
        classNames: ({ props }) => ({
          root: clsx(
            styles.alertRoot,
            {
              success: styles.alertSuccess,
              warning: styles.alertWarning,
              error: styles.alertError,
              info: styles.alertInfo,
            }[props.type ?? 'info'],
          ),
          title: styles.alertTitle,
          description: styles.alertDescription,
        }),
      },
      colorPicker: {
        classNames: {
          root: styles.colorPickerRoot,
          body: styles.colorPickerBody,
          content: styles.colorPickerContent,
          description: styles.colorPickerDescription,
          popup: {
            root: styles.pickerPopupRoot,
          },
        },
      },
      segmented: {},
      progress: {
        classNames: ({ props }) => ({
          rail: props.type === 'line' ? styles.progressLine : undefined,
          track: props.type === 'line' ? styles.progressLine : undefined,
        }),
      },
      notification: {
        classNames: {
          root: styles.notificationRoot,
          title: styles.notificationTitle,
          description: styles.notificationDescription,
        },
      },
      otp: {
        classNames: {
          input: styles.otpInput,
        },
      },
      message: {
        classNames: {
          root: styles.messageRoot,
        },
      },
      tooltip: {
        arrow: false,
        classNames: {
          root: styles.tooltipRoot,
          container: styles.tooltipContainer,
        },
      },
      popover: {
        classNames: {
          root: styles.popoverRoot,
          container: styles.popoverContainer,
          title: styles.popoverTitle,
          content: styles.popoverContent,
        },
      },
      popconfirm: {
        classNames: {
          root: styles.popoverRoot,
          container: styles.popconfirmContainer,
        },
      },
      layout: {
        className: styles.layoutRoot,
      },
      tag: {
        classNames: {
          root: styles.tagRoot,
        },
      },
      app: {
        className: styles.appRoot,
      },
      avatar: {},
      badge: {},
      breadcrumb: {},
      calendar: {},
      carousel: {},
      checkbox: {},
      collapse: {},
      descriptions: {},
      divider: {},
      drawer: {},
      empty: {},
      floatButton: {},
      floatButtonGroup: {},
      form: {},
      image: {},
      list: {},
      menu: {},
      pagination: {},
      qrcode: {},
      radio: {},
      rate: {},
      result: {},
      ribbon: {},
      skeleton: {},
      slider: {},
      space: {},
      spin: {},
      statistic: {},
      steps: {},
      switch: {},
      table: {},
      tabs: {},
      timeline: {},
      tour: {},
      transfer: {},
      tree: {},
      typography: {},
      upload: {},
    }),
    [styles],
  );
};

export default useMuiTheme;
