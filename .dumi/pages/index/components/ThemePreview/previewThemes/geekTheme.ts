import { useMemo } from 'react';
import { theme } from 'antd';
import { createStyles } from 'antd-style';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => ({
  container: css({}),
}));

const useGeekTheme: UseTheme = () => {
  const styles = useStyles();

  return useMemo(
    () => ({
      theme: {
        algorithm: theme.darkAlgorithm,
      },
      modal: {
        styles: {
          container: {
            border: '1px solid red',
          },
        },
      },
    }),
    [],
  );
};
export default useGeekTheme;
