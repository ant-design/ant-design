import { useMemo } from 'react';
import { defaultAlgorithm, defaultTheme } from '@ant-design/compatible';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';

const useV4Theme = () => {
  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: [theme.defaultAlgorithm, defaultAlgorithm],
        token: defaultTheme.token,
        components: {
          ...defaultTheme.components,
          Layout: {
            ...defaultTheme.components?.Layout,
            bodyBg: '#f0f2f5',
            footerBg: '#f0f2f5',
            headerBg: '#001529',
            headerColor: '#ffffff',
            siderBg: '#ffffff',
            triggerBg: '#e6f4ff',
            triggerColor: '#000000d9',
          },
          Menu: {
            ...defaultTheme.components?.Menu,
            activeBarBorderWidth: 0,
            itemBg: 'transparent',
            subMenuItemBg: 'transparent',
          },
          Button: {},
          Alert: {},
          Modal: {},
          Card: {},
          Tooltip: {},
          Checkbox: {},
          Radio: {},
          Select: {},
          Input: {},
          Switch: {},
          Progress: {
            ...defaultTheme.components?.Progress,
            circleTextColor: '#000000d9',
            defaultColor: defaultTheme.token?.colorPrimary ?? '#1890ff',
            remainingColor: '#f5f5f5',
          },
          Steps: {},
          Slider: {},
          ColorPicker: {},
          Notification: {},
        },
      },
      wave: {},
      app: {},
      card: {},
      modal: {},
      button: {},
      alert: {},
      colorPicker: {},
      checkbox: {},
      dropdown: {},
      select: {},
      datePicker: {},
      input: {},
      inputNumber: {},
      popover: {},
      tooltip: {},
      notification: {},
      switch: {},
      radio: {},
      segmented: {},
      progress: {},
    }),
    [],
  );
};

export default useV4Theme;
