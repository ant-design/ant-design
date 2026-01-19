import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  return {
    boxBorder: css({
      border: `${cssVar.lineWidth} ${cssVar.lineType} color-mix(in srgb,${cssVar.colorBorder} 80%, #000)`,
    }),
    alertRoot: css({
      color: cssVar.colorInfoText,
      textShadow: `0 1px 0 rgba(255, 255, 255, 0.8)`,
    }),

    modalContainer: css({
      padding: 0,
      borderRadius: cssVar.borderRadiusLG,
    }),
    modalHeader: css({
      borderBottom: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorSplit}`,
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    }),
    modalBody: css({
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    }),
    modalFooter: css({
      borderTop: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorSplit}`,
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
      backgroundColor: cssVar.colorBgContainerDisabled,
      boxShadow: `inset 0 1px 0 ${cssVar.colorBgContainer}`,
    }),
    buttonRoot: css({
      backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2))`,
      boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
      transition: 'none',
      borderColor: `rgba(0, 0, 0, 0.3)`,
      textShadow: `0 -1px 0 rgba(0, 0, 0, 0.2)`,

      '&:hover, &:active': {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15) 100%)`,
      },

      '&:active': {
        boxShadow: `inset 0 1px 3px rgba(0, 0, 0, 0.15)`,
      },
    }),
    buttonColorDefault: css({
      textShadow: 'none',
      color: cssVar.colorText,
      borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    }),
    dropdownRoot: css({
      borderRadius: cssVar.borderRadiusLG,
      backgroundColor: cssVar.colorBgContainer,

      ul: {
        paddingInline: 0,
      },
    }),
    dropdownItem: css({
      borderRadius: 0,
      transition: 'none',
      paddingBlock: cssVar.paddingXXS,
      paddingInline: cssVar.padding,

      '&:hover, &:active, &:focus': {
        backgroundImage: `linear-gradient(to bottom, ${cssVar.colorPrimaryHover}, ${cssVar.colorPrimary})`,
        color: cssVar.colorTextLightSolid,
      },
    }),
    selectPopupRoot: css({
      paddingInline: 0,
    }),
    switchRoot: css({
      boxShadow: `inset 0 1px 3px rgba(0, 0, 0, 0.4)`,
    }),
    progressTrack: css({
      backgroundImage: `linear-gradient(to bottom, ${cssVar.colorPrimaryHover}, ${cssVar.colorPrimary})`,
      borderRadius: cssVar.borderRadiusSM,
    }),
    progressRail: css({
      borderRadius: cssVar.borderRadiusSM,
    }),
  };
});

const useBootstrapTheme: UseTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          borderRadius: 4,
          borderRadiusLG: 6,
          colorInfo: '#3a87ad',
        },
        components: {
          Tooltip: {
            fontSize: 12,
          },
          Checkbox: {
            colorBorder: '#666',
            borderRadius: 2,
            algorithm: true,
          },
          Radio: {
            colorBorder: '#666',
            borderRadius: 2,
            algorithm: true,
          },
        },
      },
      wave: {
        showEffect: () => {},
      },

      modal: {
        classNames: {
          container: clsx(styles.boxBorder, styles.modalContainer),
          header: styles.modalHeader,
          body: styles.modalBody,
          footer: styles.modalFooter,
        },
      },
      button: {
        classNames: ({ props }) => ({
          root: clsx(styles.buttonRoot, props.color === 'default' && styles.buttonColorDefault),
        }),
      },

      alert: {
        className: styles.alertRoot,
      },
      colorPicker: {
        classNames: {
          root: styles.boxBorder,
        },
        arrow: false,
      },
      checkbox: {
        classNames: {},
      },
      dropdown: {
        classNames: {
          root: clsx(styles.boxBorder, styles.dropdownRoot),
          item: styles.dropdownItem,
        },
      },
      select: {
        classNames: {
          root: styles.boxBorder,
          popup: {
            root: clsx(styles.boxBorder, styles.selectPopupRoot),
            listItem: styles.dropdownItem,
          },
        },
      },
      switch: {
        classNames: {
          root: styles.switchRoot,
        },
      },
      progress: {
        classNames: {
          track: styles.progressTrack,
          rail: styles.progressRail,
        },
        styles: {
          rail: {
            height: 20,
          },
          track: { height: 20 },
        },
      },
    }),
    [],
  );
};
export default useBootstrapTheme;
