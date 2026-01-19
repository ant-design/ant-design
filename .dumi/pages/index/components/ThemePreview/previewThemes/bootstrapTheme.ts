import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  // const lightBorder = {
  //   border: `${cssVar.lineWidth} solid ${cssVar.colorPrimary}`,
  //   boxShadow: `0 0 3px ${cssVar.colorPrimary}, inset 0 0 10px ${cssVar.colorPrimary}`,
  // };

  // Bootstrap 垂直渐变色
  const verticalGradient = {
    // backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2))`,
    // boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
    // transition: 'none',
    // borderColor: `rgba(0, 0, 0, 0.3)`,
    // textShadow: `0 -1px 0 rgba(0, 0, 0, 0.2)`,
    // '&:hover, &:active': {
    //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15) 100%)`,
    // },
    // '&:active': {
    //   boxShadow: `inset 0 1px 3px rgba(0, 0, 0, 0.15)`,
    // },
  };

  return {
    boxBorder: css({
      border: `${cssVar.lineWidth} ${cssVar.lineType} color-mix(in srgb,${cssVar.colorBorder} 80%, #000)`,
    }),
    // lightBorder,
    // app: css({
    //   textShadow: `0 0 5px color-mix(in srgb, currentColor 50%, transparent)`,
    // }),
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
      //   margin: 0,
      //   position: 'relative',
      //   '&:after': {
      //     ...lightBorder,
      //     content: '""',
      //     position: 'absolute',
      //     left: 0,
      //     right: 0,
      //     bottom: 0,
      //     border: 0,
      //     height: cssVar.lineWidth,
      //     background: cssVar.colorPrimary,
      //   },
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
      ...verticalGradient,

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
    // buttonRootSolid: css({
    //   color: cssVar.colorBgContainer,
    //   border: 'none',
    //   fontWeight: 'bolder',
    // }),
    // buttonRootSolidDanger: css({
    //   boxShadow: `0 0 5px ${cssVar.colorError}`,
    // }),
    // colorPickerBody: css({
    //   pointerEvents: 'none',
    // }),
    // tooltipRoot: css({
    //   ...lightBorder,
    //   color: cssVar.colorPrimary,
    // }),
    // progressTrack: css({
    //   backgroundColor: cssVar.colorPrimary,
    // }),
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
      },
      wave: {
        showEffect: () => {},
      },

      // app: {
      //   className: styles.app,
      // },
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
          root: clsx(
            styles.buttonRoot,
            props.color === 'default' && styles.buttonColorDefault,
            //       props.variant === 'solid' && props.danger && styles.buttonRootSolidDanger,
          ),
        }),
      },

      alert: {
        className: styles.alertRoot,
      },
      colorPicker: {
        classNames: {
          root: styles.boxBorder,
          //     body: styles.colorPickerBody,
        },
        arrow: false,
      },
      dropdown: {
        classNames: {
          root: styles.boxBorder,
        },
      },
      // select: {
      //   classNames: {
      //     root: styles.lightBorder,
      //   },
      // },
      // input: {
      //   classNames: {
      //     root: styles.lightBorder,
      //   },
      // },
      // inputNumber: {
      //   classNames: {
      //     root: styles.lightBorder,
      //   },
      // },
      tooltip: {
        // arrow: false,
        classNames: {
          container: styles.boxBorder,
        },
      },
      // progress: {
      //   classNames: {
      //     track: styles.progressTrack,
      //   },
      // },
    }),
    [],
  );
};
export default useBootstrapTheme;
