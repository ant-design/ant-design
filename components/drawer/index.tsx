import classNames from 'classnames';
import RcDrawer from 'rc-drawer';
import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import type { CSSMotionProps } from 'rc-motion';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { getTransitionName } from '../_util/motion';
import warning from '../_util/warning';
import DrawerPanel from './DrawerPanel';
import type { DrawerPanelProps } from './DrawerPanel';

// CSSINJS
import useStyle from './style';
import { NoCompactStyle } from '../space/Compact';

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
}

const defaultPushState: PushState = { distance: 180 };

function Drawer(props: DrawerProps) {
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

    // Deprecated
    visible,
    afterVisibleChange,

    ...rest
  } = props;

  const { getPopupContainer, getPrefixCls, direction } = React.useContext(ConfigContext);
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
    [
      ['visible', 'open'],
      ['afterVisibleChange', 'afterOpenChange'],
    ].forEach(([deprecatedName, newName]) => {
      warning(
        !(deprecatedName in props),
        'Drawer',
        `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`,
      );
    });

    if (getContainer !== undefined && props.style?.position === 'absolute') {
      warning(
        false,
        'Drawer',
        '`style` is replaced by `rootStyle` in v5. Please check that `position: absolute` is necessary.',
      );
    }
  }

  // ============================ Size ============================
  const mergedWidth = React.useMemo(() => width ?? (size === 'large' ? 736 : 378), [width, size]);
  const mergedHeight = React.useMemo(
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

  // =========================== Render ===========================
  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <RcDrawer
          prefixCls={prefixCls}
          onClose={onClose}
          maskMotion={maskMotion}
          motion={panelMotion}
          {...rest}
          open={open ?? visible}
          mask={mask}
          push={push}
          width={mergedWidth}
          height={mergedHeight}
          rootClassName={drawerClassName}
          getContainer={getContainer}
          afterOpenChange={afterOpenChange ?? afterVisibleChange}
        >
          <DrawerPanel prefixCls={prefixCls} {...rest} onClose={onClose} />
        </RcDrawer>
      </NoFormStyle>
    </NoCompactStyle>,
  );
}

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

function PurePanel({
  prefixCls: customizePrefixCls,
  style,
  className,
  placement = 'right',
  ...restProps
}: Omit<DrawerPanelProps, 'prefixCls' | 'drawerStyle'> & {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  placement?: DrawerProps['placement'];
}) {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div
      className={classNames(
        prefixCls,
        `${prefixCls}-pure`,
        `${prefixCls}-${placement}`,
        hashId,
        className,
      )}
      style={style}
    >
      <DrawerPanel prefixCls={prefixCls} {...restProps} />
    </div>,
  );
}

Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Drawer;
