import type { ConfigProviderProps, ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

export const mui: ThemeConfig = {
  token: {
    colorPrimary: '#1976d2',
    colorSuccess: '#2e7d32',
    colorWarning: '#ed6c02',
    colorError: '#d32f2f',
    colorInfo: '#0288d1',
    colorTextBase: '#212121',
    colorBgBase: '#fafafa',
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
    colorWarningBorder: '#ffcc02',
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
    colorText: 'rgba(33, 33, 33, 0.87)',
    colorTextSecondary: 'rgba(33, 33, 33, 0.6)',
    colorTextTertiary: 'rgba(33, 33, 33, 0.38)',
    colorTextQuaternary: 'rgba(33, 33, 33, 0.26)',
    colorTextDisabled: 'rgba(33, 33, 33, 0.38)',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: 'rgba(33, 33, 33, 0.85)',
    colorBgMask: 'rgba(33, 33, 33, 0.5)',
    colorBorder: '#e0e0e0',
    colorBorderSecondary: '#eeeeee',
    borderRadius: 4,
    borderRadiusXS: 1,
    borderRadiusSM: 2,
    borderRadiusLG: 6,
    padding: 16,
    paddingSM: 8,
    paddingLG: 24,
    margin: 16,
    marginSM: 8,
    marginLG: 24,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    boxShadowSecondary:
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  },
  components: {
    Button: {
      primaryShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      defaultShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      dangerShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      fontWeight: 500,
      defaultBorderColor: 'rgba(0, 0, 0, 0.23)',
      defaultColor: 'rgba(0, 0, 0, 0.87)',
      defaultBg: '#ffffff',
      defaultHoverBg: 'rgba(25, 118, 210, 0.04)',
      defaultHoverBorderColor: 'rgba(0, 0, 0, 0.23)',
      paddingInline: 16,
      paddingBlock: 6,
      contentFontSize: 14,
      borderRadius: 4,
    },
    Alert: {
      borderRadiusLG: 4,
    },
    Modal: {
      borderRadiusLG: 4,
    },
    Progress: {
      defaultColor: '#1976d2',
      remainingColor: 'rgba(25, 118, 210, 0.12)',
    },
    Steps: {
      iconSize: 24,
    },
    Checkbox: {
      borderRadiusSM: 2,
    },
    Slider: {
      trackBg: 'rgba(25, 118, 210, 0.26)',
      trackHoverBg: 'rgba(25, 118, 210, 0.38)',
      handleSize: 20,
      handleSizeHover: 20,
      railSize: 4,
    },
    ColorPicker: {
      borderRadius: 4,
    },
  },
};
export const muiLight: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: mui.token,
  components: mui.components,
};

export const muiDark: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...mui.token,
  },
  components: {
    ...mui.components,
    Message: {
      contentBg: '#212121',
      contentPadding: '8px 16px',
      zIndexPopup: 1010,
    },
  },
};

export const muiComponentConfig: Partial<ConfigProviderProps> = {
  button: {
    styles: (info) => {
      const { props } = info;
      if (props.type === 'primary') {
        return {
          root: {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            border: 'none',
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.02857em',
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        };
      }
      if (props.type === 'default') {
        return {
          root: {
            backgroundColor: '#ffffff',
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.02857em',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        };
      }
      if (props.danger) {
        return {
          root: {
            backgroundColor: '#d32f2f',
            color: '#ffffff',
            border: 'none',
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.02857em',
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          },
        };
      }
      return {};
    },
  },
  input: {
    styles: (info) => {
      const { props } = info;
      const baseStyle = {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.23)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        input: {
          color: 'rgba(0, 0, 0, 0.87)',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      };
      if (props.status === 'error') {
        return {
          ...baseStyle,
          root: {
            ...baseStyle.root,
            borderColor: '#d32f2f',
          },
        };
      }
      return baseStyle;
    },
  },
  select: {
    styles: {
      root: {
        borderColor: 'rgba(0, 0, 0, 0.23)',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      popup: {
        root: {
          borderRadius: 4,
          boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        },
      },
    },
  },
};
