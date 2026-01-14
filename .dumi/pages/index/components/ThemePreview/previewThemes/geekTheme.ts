import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  const sharedBoxShadow = {
    boxShadow: `0 0 5px ${cssVar.colorPrimary}, inset 0 0 10px ${cssVar.colorPrimary}`,
  };

  return {
    app: css({
      textShadow: `0 0 3px ${cssVar.colorPrimary}, 0 0 5px ${cssVar.colorPrimary}`,
    }),
    modalContainer: css(`
    border: ${cssVar.lineWidth} solid ${cssVar.colorPrimary};
    box-shadow: 0 0 10px ${cssVar.colorPrimary}, inset 0 0 10px ${cssVar.colorPrimary};
    padding: 0;
    `),
    modalHeader: css(`
    padding: ${cssVar.padding} ${cssVar.paddingLG};
    margin: 0;
    position: relative;

    &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${cssVar.lineWidth};
    background: ${cssVar.colorPrimary};
    box-shadow: 0 0 5px 1px ${cssVar.colorPrimary};
    }
    `),
    modalBody: css(`
    padding: ${cssVar.padding} ${cssVar.paddingLG};
    `),
    modalFooter: css(`
    padding: ${cssVar.padding} ${cssVar.paddingLG};
    `),

    buttonRoot: css(`
    box-shadow: 0 0 5px ${cssVar.colorPrimary};
    border: ${cssVar.lineWidth} solid ${cssVar.colorPrimary};
    `),
    buttonRootSolid: css(`color: ${cssVar.colorBgContainer}; border: none;`),
  };
});

const useGeekTheme: UseTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.darkAlgorithm,
        token: {
          borderRadius: 0,
          lineWidth: 2,
          colorPrimary: '#39ff14',
          colorText: '#39ff14',
        },
      },
      app: {
        className: styles.app,
      },
      modal: {
        classNames: {
          container: styles.modalContainer,
          header: styles.modalHeader,
          body: styles.modalBody,
          footer: styles.modalFooter,
        },
      },
      button: {
        classNames: ({ props }) => ({
          root: clsx(styles.buttonRoot, props.variant === 'solid' && styles.buttonRootSolid),
        }),
      },
    }),
    [],
  );
};
export default useGeekTheme;
