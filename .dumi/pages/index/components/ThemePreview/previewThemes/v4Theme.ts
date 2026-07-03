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
          Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
          },
          Menu: {
            itemBg: 'transparent',
            subMenuItemBg: 'transparent',
            activeBarBorderWidth: 0,
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
          Progress: {},
          Steps: {},
          Slider: {},
          ColorPicker: {},
          Notification: {},
          ...defaultTheme.components,
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
