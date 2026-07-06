import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';

const useBlossomTheme = () => {
  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#ED4192',
          borderRadius: 16,
        },
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

export default useBlossomTheme;
