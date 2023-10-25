import * as React from 'react';
import classNames from 'classnames';
import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import RcDrawer from 'rc-drawer';
import type { Placement } from 'rc-drawer/lib/Drawer';
import type { CSSMotionProps } from 'rc-motion';

import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
// CSSINJS
import { NoCompactStyle } from '../space/Compact';
import { usePanelRef } from '../watermark/context';
import type { DrawerClassNames, DrawerPanelProps, DrawerStyles } from './DrawerPanel';
import DrawerPanel from './DrawerPanel';
import useStyle from './style';
import zIndexContext from '../_util/zindexContext';

const SizeTypes = ['default', 'large'] as const;
type sizeType = typeof SizeTypes[number];

export interface PushState {
  distance: string | number;
}

// Drawer diff props: 'open' | 'motion' | 'maskMotion' | 'wrapperClassName'
export interface DrawerProps extends RcDrawerProps, Omit<DrawerPanelProps, 'prefixCls'> {
  size?: sizeType;

  open?: boolean;

  afterOpenChange?: (open: boolean) => void;

  // Deprecated
  /** @deprecated Please use `open` instead */
  visible?: boolean;
  /** @deprecated Please use `afterOpenChange` instead */
  afterVisibleChange?: (open: boolean) => void;
  classNames?: DrawerClassNames;
  styles?: DrawerStyles;
}

const defaultPushState: PushState = { distance: 180 };

const Drawer: React.FC<DrawerProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
} = (props) => {
  const {
    rootClassName,
    width,
    height,
    size = 'default',
    mask = true,
    push = defaultPushState,
    open,
    afterOpenChange,
    onClose,
    prefixCls: customizePrefixCls,
    getContainer: customizeGetContainer,
    style,
    className,

    // Deprecated
    visible,
    afterVisibleChange,

    ...rest
  } = props;

  const { getPopupContainer, getPrefixCls, direction, drawer } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const getContainer =
    // 有可能为 false，所以不能直接判断
    customizeGetContainer === undefined && getPopupContainer
      ? () => getPopupContainer(document.body)
      : customizeGetContainer;

  const drawerClassName = classNames(
    {
      'no-mask': !mask,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    rootClassName,
    hashId,
  );

  // ========================== Warning ===========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Drawer');

    [
      ['visible', 'open'],
      ['afterVisibleChange', 'afterOpenChange'],
      ['headerStyle', 'styles.header'],
      ['bodyStyle', 'styles.body'],
      ['footerStyle', 'styles.footer'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });

    if (getContainer !== undefined && props.style?.position === 'absolute') {
      warning(
        false,
        'breaking',
        '`style` is replaced by `rootStyle` in v5. Please check that `position: absolute` is necessary.',
      );
    }
  }

  // ============================ Size ============================
  const mergedWidth = React.useMemo<string | number>(
    () => width ?? (size === 'large' ? 736 : 378),
    [width, size],
  );

  const mergedHeight = React.useMemo<string | number>(
    () => height ?? (size === 'large' ? 736 : 378),
    [height, size],
  );

  // =========================== Motion ===========================
  const maskMotion: CSSMotionProps = {
    motionName: getTransitionName(prefixCls, 'mask-motion'),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500,
  };

  const panelMotion: RcDrawerProps['motion'] = (motionPlacement) => ({
    motionName: getTransitionName(prefixCls, `panel-motion-${motionPlacement}`),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500,
  });

  // ============================ Refs ============================
  // Select `ant-modal-content` by `panelRef`
  const panelRef = usePanelRef();

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Drawer', rest.zIndex);

  // =========================== Render ===========================
  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <zIndexContext.Provider value={contextZIndex}>
          <RcDrawer
            prefixCls={prefixCls}
            onClose={onClose}
            maskMotion={maskMotion}
            motion={panelMotion}
            {...rest}
            classNames={{
              mask: classNames(rest.classNames?.mask, drawer?.classNames?.mask),
              content: classNames(rest.classNames?.content, drawer?.classNames?.content),
            }}
            styles={{
              mask: {
                ...rest.styles?.mask,
                ...drawer?.styles?.mask,
              },
              content: {
                ...rest.styles?.content,
                ...drawer?.styles?.content,
              },
            }}
            open={open ?? visible}
            mask={mask}
            push={push}
            width={mergedWidth}
            height={mergedHeight}
            style={{ ...drawer?.style, ...style }}
            className={classNames(drawer?.className, className)}
            rootClassName={drawerClassName}
            getContainer={getContainer}
            afterOpenChange={afterOpenChange ?? afterVisibleChange}
            panelRef={panelRef}
            zIndex={zIndex}
          >
            <DrawerPanel prefixCls={prefixCls} {...rest} onClose={onClose} />
          </RcDrawer>
        </zIndexContext.Provider>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

interface PurePanelInterface {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  placement?: Placement;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<Omit<DrawerPanelProps, 'prefixCls'> & PurePanelInterface> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    placement = 'right',
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const cls = classNames(
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-${placement}`,
    hashId,
    className,
  );

  return wrapSSR(
    <div className={cls} style={style}>
      <DrawerPanel prefixCls={prefixCls} {...restProps} />
    </div>,
  );
};

Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

export default Drawer;
