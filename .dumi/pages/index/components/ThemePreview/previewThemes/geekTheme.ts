import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  const lightBorder = {
    border: `${cssVar.lineWidth} solid ${cssVar.colorPrimary}`,
    boxShadow: `0 0 5px ${cssVar.colorPrimary}, inset 0 0 10px ${cssVar.colorPrimary}`,
  };

  return {
    lightBorder,
    app: css({
      textShadow: `0 0 2px ${cssVar.colorPrimary}, 0 0 5px ${cssVar.colorPrimary}`,
    }),
    modalContainer: css({
      ...lightBorder,
      padding: 0,
    }),
    modalHeader: css({
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
      margin: 0,
      position: 'relative',

      '&:after': {
        ...lightBorder,
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: cssVar.lineWidth,
        background: cssVar.colorPrimary,
      },
    }),
    modalBody: css({
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    }),
    modalFooter: css({
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    }),

    buttonRootSolid: css({
      color: cssVar.colorBgContainer,
      border: 'none',
      fontWeight: 'bolder',
    }),

    colorPickerBody: css({
      pointerEvents: 'none',
    }),
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
          root: clsx(styles.lightBorder, props.variant === 'solid' && styles.buttonRootSolid),
        }),
      },

      alert: {
        className: styles.lightBorder,
      },
      colorPicker: {
        classNames: {
          root: styles.lightBorder,
          body: styles.colorPickerBody,
          popup: {
            root: styles.lightBorder,
          },
        },
        arrow: false,
      },
    }),
    [],
  );
};
export default useGeekTheme;
