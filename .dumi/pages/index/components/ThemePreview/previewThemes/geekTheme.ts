import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import { withPriority } from './styleUtils';

const useStyles = createStyles(({ css, cssVar }) => {
  const lightBorder = {
    border: `${cssVar.lineWidth} solid ${cssVar.colorPrimary}`,
    boxShadow: `0 0 3px ${cssVar.colorPrimary}, inset 0 0 10px ${cssVar.colorPrimary}`,
  };

  return {
    lightBorder: withPriority(css, lightBorder),
    app: css({
      textShadow: `0 0 5px color-mix(in srgb, currentColor 50%, transparent)`,
    }),
    modalContainer: withPriority(css, {
      ...lightBorder,
      padding: 0,
    }),
    modalHeader: withPriority(css, {
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
        border: 0,
        height: cssVar.lineWidth,
        background: cssVar.colorPrimary,
      },
    }),
    modalBody: withPriority(css, {
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    }),
    modalFooter: withPriority(css, {
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    }),

    buttonRoot: withPriority(css, {
      ...lightBorder,
      border: undefined,
      borderWidth: cssVar.lineWidth,
      borderColor: cssVar.colorPrimary,
    }),
    buttonRootSolid: withPriority(css, {
      color: cssVar.colorBgContainer,
      border: 'none',
      fontWeight: 'bolder',
    }),
    buttonRootSolidDanger: withPriority(css, {
      boxShadow: `0 0 5px ${cssVar.colorError}`,
    }),

    colorPickerBody: withPriority(css, {
      pointerEvents: 'none',
    }),
    tooltipRoot: css({
      padding: cssVar.padding,
    }),
    tooltipContainer: css({
      ...lightBorder,
      color: cssVar.colorPrimary,
    }),
    progressTrack: withPriority(css, {
      backgroundColor: cssVar.colorPrimary,
    }),
  };
});

const useGeekTheme = () => {
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
          colorInfo: '#39ff14',
          controlHeightSM: 26,
          controlHeight: 34,
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
          root: clsx(
            styles.buttonRoot,
            props.variant === 'solid' && styles.buttonRootSolid,
            props.variant === 'solid' && props.danger && styles.buttonRootSolidDanger,
          ),
        }),
      },

      alert: {
        className: styles.lightBorder,
      },
      colorPicker: {
        classNames: {
          root: styles.lightBorder,
          body: styles.colorPickerBody,
        },
        arrow: false,
      },
      select: {
        classNames: {
          root: styles.lightBorder,
        },
      },
      datePicker: {
        classNames: {
          root: styles.lightBorder,
        },
      },
      input: {
        classNames: {
          root: styles.lightBorder,
        },
      },
      inputNumber: {
        classNames: {
          root: styles.lightBorder,
        },
      },
      tooltip: {
        arrow: false,
        classNames: {
          root: styles.tooltipRoot,
          container: styles.tooltipContainer,
        },
      },
      progress: {
        classNames: {
          track: styles.progressTrack,
        },
      },
    }),
    [],
  );
};
export default useGeekTheme;
