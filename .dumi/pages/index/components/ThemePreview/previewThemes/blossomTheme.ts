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
            bodyBg: '#fff4fa',
            footerBg: '#fff4fa',
            headerBg: '#ffffff',
            headerColor: '#3f2330',
            siderBg: '#fff7fb',
            triggerBg: '#ffe4f0',
            triggerColor: '#ED4192',
          },
          Menu: {
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
