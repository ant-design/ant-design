import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';

const useLarkTheme = () => {
  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00B96B',
          borderRadius: 4,
        },
        components: {
          Layout: {
            bodyBg: '#f7fbf8',
            footerBg: '#f7fbf8',
            headerBg: '#ffffff',
            headerColor: '#1f2329',
            siderBg: '#ffffff',
            triggerBg: '#eff7f2',
            triggerColor: '#1f2329',
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
          Progress: {
            circleTextColor: '#1f2329',
            defaultColor: '#00B96B',
            remainingColor: 'rgba(0, 185, 107, 0.12)',
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

export default useLarkTheme;
