import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  // const cartoonShadow = {
  //   boxShadow: `4px 4px 0 ${cssVar.colorPrimaryBorder}`,
  // };

  return {
    // cartoonShadow,
    // app: css({
    //   fontWeight: 500,
    // }),
  };
});

const useCartoonTheme: UseTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          colorBorder: '#225555',
          lineWidth: 2,
          lineWidthBold: 2,
          // borderRadius: 16,
          // borderRadiusLG: 20,
          // borderRadiusSM: 12,
          // lineWidth: 3,
          // colorPrimary: '#ff6b9d',
          // colorSuccess: '#52c41a',
          // colorWarning: '#faad14',
          // colorError: '#ff4d4f',
          // colorInfo: '#13c2c2',
          // fontSize: 15,
          // fontSizeHeading1: 42,
          // fontSizeHeading2: 36,
          // fontSizeHeading3: 28,
          controlHeight: 40,
          controlHeightSM: 32,
          controlHeightLG: 48,
        },
        components: {
          Button: {
            primaryShadow: 'none',
            dangerShadow: 'none',
            defaultShadow: 'none',
          },
          Modal: {
            boxShadow: 'none',
          },
        },
      },
      // app: {
      //   className: styles.app,
      // },
    }),
    [],
  );
};

export default useCartoonTheme;
