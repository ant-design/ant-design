import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  return {};
});

const useGeekTheme: UseTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {},
    }),
    [],
  );
};
export default useGeekTheme;
