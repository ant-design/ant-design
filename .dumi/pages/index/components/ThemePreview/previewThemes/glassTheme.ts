import { useMemo } from 'react';
import { theme } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import type { UseTheme } from '.';

const useStyles = createStyles(({ css, cssVar }) => {
  // const glassBorder = {
  //   border: `${cssVar.lineWidth} solid rgba(255,255,255,0.3)`,
  //   boxShadow: `0 4px 32px 0 rgba(31, 38, 135, 0.37)`,
  //   backdropFilter: 'blur(8px)',
  //   background: 'rgba(255,255,255,0.15)',
  // };

  return {
    // glassBorder,
    // app: css({
    //   background: 'rgba(255,255,255,0.10)',
    //   backdropFilter: 'blur(4px)',
    //   color: cssVar.colorText,
    // }),
    // modalContainer: css({
    //   ...glassBorder,
    //   padding: 0,
    //   borderRadius: 16,
    // }),
    // modalHeader: css({
    //   padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    //   margin: 0,
    //   position: 'relative',
    //   background: 'rgba(255,255,255,0.20)',
    //   '&:after': {
    //     ...glassBorder,
    //     content: '""',
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     border: 0,
    //     height: cssVar.lineWidth,
    //     background: 'rgba(255,255,255,0.3)',
    //   },
    // }),
    // modalBody: css({
    //   padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    //   background: 'rgba(255,255,255,0.10)',
    // }),
    // modalFooter: css({
    //   padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    //   background: 'rgba(255,255,255,0.10)',
    // }),
    // buttonRoot: css({
    //   ...glassBorder,
    //   border: undefined,
    //   borderWidth: cssVar.lineWidth,
    //   borderColor: 'rgba(255,255,255,0.3)',
    //   background: 'rgba(255,255,255,0.20)',
    //   color: cssVar.colorText,
    //   fontWeight: 500,
    // }),
    // buttonRootSolid: css({
    //   color: '#fff',
    //   background: 'rgba(31, 38, 135, 0.37)',
    //   border: 'none',
    //   fontWeight: 'bolder',
    //   boxShadow: '0 2px 8px rgba(31, 38, 135, 0.15)',
    // }),
    // buttonRootSolidDanger: css({
    //   boxShadow: `0 0 5px ${cssVar.colorError}`,
    // }),
    // colorPickerBody: css({
    //   pointerEvents: 'none',
    // }),
    // tooltipRoot: css({
    //   ...glassBorder,
    //   color: cssVar.colorText,
    //   background: 'rgba(255,255,255,0.20)',
    // }),
    // progressTrack: css({
    //   backgroundColor: 'rgba(255,255,255,0.3)',
    // }),
  };
});

const useGlassTheme: UseTheme = () => {
  const { styles } = useStyles();

  return useMemo<ConfigProviderProps>(
    () => ({
      theme: {
        algorithm: theme.defaultAlgorithm,
        token: {
          // borderRadius: 16,
          // lineWidth: 1,
          // colorPrimary: '#ffffff',
          // colorText: '#222',
          // controlHeightSM: 26,
          // controlHeight: 34,
        },
      },
      // app: {
      //   className: styles.app,
      // },
      // modal: {
      //   classNames: {
      //     container: styles.modalContainer,
      //     header: styles.modalHeader,
      //     body: styles.modalBody,
      //     footer: styles.modalFooter,
      //   },
      // },
      // button: {
      //   classNames: ({ props }) => ({
      //     root: clsx(
      //       styles.buttonRoot,
      //       props.variant === 'solid' && styles.buttonRootSolid,
      //       props.variant === 'solid' && props.danger && styles.buttonRootSolidDanger,
      //     ),
      //   }),
      // },
      // alert: {
      //   className: styles.glassBorder,
      // },
      // colorPicker: {
      //   classNames: {
      //     root: styles.glassBorder,
      //     body: styles.colorPickerBody,
      //   },
      //   arrow: false,
      // },
      // select: {
      //   classNames: {
      //     root: styles.glassBorder,
      //   },
      // },
      // input: {
      //   classNames: {
      //     root: styles.glassBorder,
      //   },
      // },
      // inputNumber: {
      //   classNames: {
      //     root: styles.glassBorder,
      //   },
      // },
      // tooltip: {
      //   arrow: false,
      //   classNames: {
      //     container: styles.tooltipRoot,
      //   },
      // },
      // progress: {
      //   classNames: {
      //     track: styles.progressTrack,
      //   },
      // },
    }),
    [],
  );
};
export default useGlassTheme;
