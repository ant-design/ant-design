import * as React from 'react';
import classNames from 'classnames';
import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import RcDrawer from 'rc-drawer';
import type { Placement } from 'rc-drawer/lib/Drawer';
import type { CSSMotionProps } from 'rc-motion';

import ContextIsolator from '../_util/ContextIsolator';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import { usePanelRef } from '../watermark/context';
import type { DrawerClassNames, DrawerPanelProps, DrawerStyles } from './DrawerPanel';
import DrawerPanel from './DrawerPanel';
import useStyle from './style';

const _SizeTypes = ['default', 'large'] as const;
type sizeType = (typeof _SizeTypes)[number];

export interface PushState {
  distance: string | number;
}

// Drawer diff props: 'open' | 'motion' | 'maskMotion' | 'wrapperClassName'
export interface DrawerProps
  extends Omit<RcDrawerProps, 'maskStyle'>,
    Omit<DrawerPanelProps, 'prefixCls'> {
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
    maskStyle,
    drawerStyle,
    contentWrapperStyle,

    ...rest
  } = props;

  const {
    getPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('drawer');

  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

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
    cssVarCls,
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
      ['contentWrapperStyle', 'styles.wrapper'],
      ['maskStyle', 'styles.mask'],
      ['drawerStyle', 'styles.content'],
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
  // Select `ant-drawer-content` by `panelRef`
  const panelRef = usePanelRef();

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Drawer', rest.zIndex);

  // =========================== Render ===========================
  const { classNames: propClassNames = {}, styles: propStyles = {} } = rest;

  return wrapCSSVar(
    <ContextIsolator form space>
      <zIndexContext.Provider value={contextZIndex}>
        <RcDrawer
          prefixCls={prefixCls}
          onClose={onClose}
          maskMotion={maskMotion}
          motion={panelMotion}
          {...rest}
          classNames={{
            mask: classNames(propClassNames.mask, contextClassNames.mask),
            content: classNames(propClassNames.content, contextClassNames.content),
            wrapper: classNames(propClassNames.wrapper, contextClassNames.wrapper),
          }}
          styles={{
            mask: {
              ...propStyles.mask,
              ...maskStyle,
              ...contextStyles.mask,
            },
            content: {
              ...propStyles.content,
              ...drawerStyle,
              ...contextStyles.content,
            },
            wrapper: {
              ...propStyles.wrapper,
              ...contentWrapperStyle,
              ...contextStyles.wrapper,
            },
          }}
          open={open ?? visible}
          mask={mask}
          push={push}
          width={mergedWidth}
          height={mergedHeight}
          style={{ ...contextStyle, ...style }}
          className={classNames(contextClassName, className)}
          rootClassName={drawerClassName}
          getContainer={getContainer}
          afterOpenChange={afterOpenChange ?? afterVisibleChange}
          panelRef={panelRef}
          zIndex={zIndex}
        >
          <DrawerPanel prefixCls={prefixCls} {...rest} onClose={onClose} />
        </RcDrawer>
      </zIndexContext.Provider>
    </ContextIsolator>,
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

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const cls = classNames(
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-${placement}`,
    hashId,
    cssVarCls,
    className,
  );

  return wrapCSSVar(
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
