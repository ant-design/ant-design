import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  const glassBorder = {
    border: `${cssVar.lineWidth} solid rgba(255,255,255,0.3)`,
    boxShadow: [
      `${cssVar.boxShadowSecondary}`,
      `inset 0 0 5px 2px rgba(255, 255, 255, 0.3)`,
      `inset 0 5px 2px rgba(255, 255, 255, 0.2)`,
    ].join(','),
  };

  const glassBox = {
    ...glassBorder,
    background: `color-mix(in srgb, ${cssVar.colorBgContainer} 15%, transparent)`,
    backdropFilter: 'blur(12px)',
  };

  return {
    glassBorder,
    glassBox,
    notBackdropFilter: css({
      backdropFilter: 'none',
    }),
    app: css({
      textShadow: '0 1px rgba(0,0,0,0.1)',
    }),
    cardRoot: css({
      ...glassBox,
      backgroundColor: `color-mix(in srgb, ${cssVar.colorBgContainer} 40%, transparent)`,
    }),
    modalContainer: css({
      ...glassBox,
      backdropFilter: 'none',
    }),
    buttonRoot: css({
      ...glassBorder,
    }),
    buttonRootDefaultColor: css({
      background: 'transparent',
      color: cssVar.colorText,

      '&:hover': {
        background: 'rgba(255,255,255,0.2)',
        color: `color-mix(in srgb, ${cssVar.colorText} 90%, transparent)`,
      },

      '&:active': {
        background: 'rgba(255,255,255,0.1)',
        color: `color-mix(in srgb, ${cssVar.colorText} 80%, transparent)`,
      },
    }),

    dropdownRoot: css({
      ...glassBox,
      borderRadius: cssVar.borderRadiusLG,

      ul: {
        background: 'transparent',
      },
    }),
    switchRoot: css({ ...glassBorder, border: 'none' }),
  };
});

const useGlassTheme: UseTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          borderRadius: 12,
          borderRadiusLG: 12,
          borderRadiusSM: 12,
          borderRadiusXS: 12,
          motionDurationSlow: '0.2s',
          motionDurationMid: '0.1s',
          motionDurationFast: '0.05s',
        },
      },
      app: {
        className: styles.app,
      },
      card: {
        classNames: {
          root: styles.cardRoot,
        },
      },
      modal: {
        classNames: {
          container: styles.modalContainer,
        },
      },
      button: {
        classNames: ({ props }) => ({
          root: clsx(
            styles.buttonRoot,
            (props.variant !== 'solid' || props.color === 'default' || props.type === 'default') &&
              styles.buttonRootDefaultColor,
          ),
        }),
      },
      alert: {
        className: clsx(styles.glassBox, styles.notBackdropFilter),
      },
      colorPicker: {
        arrow: false,
      },
      dropdown: {
        classNames: {
          root: styles.dropdownRoot,
        },
      },
      select: {
        classNames: {
          root: clsx(styles.glassBox, styles.notBackdropFilter),
          popup: {
            root: styles.glassBox,
          },
        },
      },
      popover: {
        classNames: {
          container: styles.glassBox,
        },
      },
      switch: {
        classNames: {
          root: styles.switchRoot,
        },
      },
      progress: {
        classNames: {
          track: styles.glassBorder,
        },
        styles: {
          track: {
            height: 12,
          },
          rail: {
            height: 12,
          },
        },
      },
    }),
    [],
  );
};
export default useGlassTheme;
