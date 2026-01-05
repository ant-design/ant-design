import * as React from 'react';
import type { DrawerProps as RcDrawerProps } from '@rc-component/drawer';
import RcDrawer from '@rc-component/drawer';
import type { Placement } from '@rc-component/drawer/lib/Drawer';
import type { CSSMotionProps } from '@rc-component/motion';
import useId from '@rc-component/util/lib/hooks/useId';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import ContextIsolator from '../_util/ContextIsolator';
import { useMergedMask, useMergeSemantic, useZIndex } from '../_util/hooks';
import type { MaskType } from '../_util/hooks';
import { getTransitionName } from '../_util/motion';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import { usePanelRef } from '../watermark/context';
import type { DrawerClassNamesType, DrawerPanelProps, DrawerStylesType } from './DrawerPanel';
import DrawerPanel from './DrawerPanel';
import useStyle from './style';
import type { FocusableConfig, OmitFocusType } from './useFocusable';
import useFocusable from './useFocusable';

const _SizeTypes = ['default', 'large'] as const;

type sizeType = (typeof _SizeTypes)[number];

export interface PushState {
  distance: string | number;
}

export interface DrawerResizableConfig {
  onResize?: (size: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

// Drawer diff props: 'open' | 'motion' | 'maskMotion' | 'wrapperClassName'
export interface DrawerProps
  extends Omit<
      RcDrawerProps,
      | 'maskStyle'
      | 'destroyOnClose'
      | 'mask'
      | 'resizable'
      | 'classNames'
      | 'styles'
      | OmitFocusType
    >,
    Omit<DrawerPanelProps, 'prefixCls' | 'ariaId'> {
  size?: sizeType | number | string;
  resizable?: boolean | DrawerResizableConfig;
  open?: boolean;
  afterOpenChange?: (open: boolean) => void;
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyOnClose?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
  mask?: MaskType;

  focusable?: Omit<FocusableConfig, 'autoFocusButton'>;
}

const defaultPushState: PushState = { distance: 180 };

const DEFAULT_SIZE = 378;

const Drawer: React.FC<DrawerProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
} = (props) => {
  const {
    rootClassName,
    size,
    defaultSize = DEFAULT_SIZE,
    height,
    width,
    mask: drawerMask,
    push = defaultPushState,
    open,
    afterOpenChange,
    onClose,
    prefixCls: customizePrefixCls,
    getContainer: customizeGetContainer,
    panelRef = null,
    style,
    className,
    resizable,
    'aria-labelledby': ariaLabelledby,

    // Focus
    focusable,

    // Deprecated
    maskStyle,
    drawerStyle,
    contentWrapperStyle,
    destroyOnClose,
    destroyOnHidden,
    ...rest
  } = props;

  const { placement } = rest;
  const id = useId();
  const ariaId = rest.title ? id : undefined;

  const {
    getPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    mask: contextMask,
  } = useComponentConfig('drawer');

  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const getContainer =
    // 有可能为 false，所以不能直接判断
    customizeGetContainer === undefined && getPopupContainer
      ? () => getPopupContainer(document.body)
      : customizeGetContainer;

  // ========================== Warning ===========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Drawer');
    [
      ['headerStyle', 'styles.header'],
      ['bodyStyle', 'styles.body'],
      ['footerStyle', 'styles.footer'],
      ['contentWrapperStyle', 'styles.wrapper'],
      ['maskStyle', 'styles.mask'],
      ['drawerStyle', 'styles.section'],
      ['destroyInactivePanel', 'destroyOnHidden'],
      ['width', 'size'],
      ['height', 'size'],
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
  const drawerSize = React.useMemo<string | number | undefined>(() => {
    if (typeof size === 'number') {
      return size;
    }

    if (size === 'large') {
      return 736;
    }

    if (size === 'default') {
      return DEFAULT_SIZE;
    }

    if (typeof size === 'string') {
      if (/^\d+(\.\d+)?$/.test(size)) {
        return Number(size);
      }
      return size;
    }
    if (!placement || placement === 'left' || placement === 'right') {
      return width;
    }

    return height;
  }, [size, placement, width, height]);

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
  const innerPanelRef = usePanelRef();
  const mergedPanelRef = composeRef(panelRef, innerPanelRef) as React.Ref<HTMLDivElement>;

  // =========================== zIndex ===========================
  const [zIndex, contextZIndex] = useZIndex('Drawer', rest.zIndex);

  // ============================ Mask ============================
  const [mergedMask, maskBlurClassName] = useMergedMask(drawerMask, contextMask, prefixCls);

  // ========================== Focusable =========================
  const mergedFocusable = useFocusable(focusable, getContainer !== false && mergedMask);

  // =========================== Render ===========================
  const { classNames, styles, rootStyle } = rest;
  const mergedProps: DrawerProps = {
    ...props,
    zIndex,
    panelRef,
    mask: mergedMask,
    defaultSize,
    push,
    focusable: mergedFocusable,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DrawerClassNamesType,
    DrawerStylesType,
    DrawerProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const drawerClassName = clsx(
    {
      'no-mask': !mergedMask,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    rootClassName,
    hashId,
    cssVarCls,
    mergedClassNames.root,
  );

  return (
    <ContextIsolator form space>
      <zIndexContext.Provider value={contextZIndex}>
        <RcDrawer
          prefixCls={prefixCls}
          onClose={onClose}
          maskMotion={maskMotion}
          motion={panelMotion}
          {...rest}
          classNames={{
            mask: clsx(mergedClassNames.mask, maskBlurClassName.mask),
            section: mergedClassNames.section,
            wrapper: mergedClassNames.wrapper,
            dragger: mergedClassNames.dragger,
          }}
          styles={{
            mask: { ...mergedStyles.mask, ...maskStyle },
            section: { ...mergedStyles.section, ...drawerStyle },
            wrapper: { ...mergedStyles.wrapper, ...contentWrapperStyle },
            dragger: mergedStyles.dragger,
          }}
          open={open}
          mask={mergedMask}
          push={push}
          size={drawerSize}
          defaultSize={defaultSize}
          style={{ ...contextStyle, ...style }}
          rootStyle={{ ...rootStyle, ...mergedStyles.root }}
          className={clsx(contextClassName, className)}
          rootClassName={drawerClassName}
          getContainer={getContainer}
          afterOpenChange={afterOpenChange}
          panelRef={mergedPanelRef}
          zIndex={zIndex}
          {...(resizable ? { resizable } : {})}
          aria-labelledby={ariaLabelledby ?? ariaId}
          destroyOnHidden={destroyOnHidden ?? destroyOnClose}
          // Focusable
          focusTriggerAfterClose={mergedFocusable.focusTriggerAfterClose}
          focusTrap={mergedFocusable.trap}
        >
          <DrawerPanel
            prefixCls={prefixCls}
            size={size}
            {...rest}
            ariaId={ariaId}
            onClose={onClose}
          />
        </RcDrawer>
      </zIndexContext.Provider>
    </ContextIsolator>
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

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-${placement}`,
    hashId,
    cssVarCls,
    className,
  );

  return (
    <div className={cls} style={style}>
      <DrawerPanel prefixCls={prefixCls} {...restProps} />
    </div>
  );
};

Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

export default Drawer;
