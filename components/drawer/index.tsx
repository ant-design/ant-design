import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import RcDrawer from 'rc-drawer';
import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import type { CSSMotionProps } from 'rc-motion';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { getTransitionName } from '../_util/motion';
import { tuple } from '../_util/type';

// CSSINJS
import useStyle from './style';

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type getContainerFunc = () => HTMLElement;

type ILevelMove = number | [number, number];

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = typeof PlacementTypes[number];

const SizeTypes = tuple('default', 'large');
type sizeType = typeof SizeTypes[number];

export interface PushState {
  distance: string | number;
}
export interface DrawerProps {
  autoFocus?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  size?: sizeType;
  /** Wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  contentWrapperStyle?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean | PushState;
  placement?: placementType;
  onClose?: (e: EventType) => void;
  afterVisibleChange?: (visible: boolean) => void;
  className?: string;
  handler?: React.ReactNode;
  keyboard?: boolean;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  footerStyle?: React.CSSProperties;
  level?: string | string[] | null | undefined;
  levelMove?: ILevelMove | ((e: { target: HTMLElement; open: boolean }) => ILevelMove);
  children?: React.ReactNode;
}

const defaultPushState: PushState = { distance: 180 };

function Drawer({
  width,
  height,
  size = 'default',
  closable = true,
  mask = true,
  push = defaultPushState,
  closeIcon = <CloseOutlined />,
  bodyStyle,
  drawerStyle,
  className,
  visible,
  children,
  zIndex,
  style,
  title,
  headerStyle,
  onClose,
  footer,
  footerStyle,
  prefixCls: customizePrefixCls,
  getContainer: customizeGetContainer,
  extra,
  afterVisibleChange,
  ...rest
}: DrawerProps) {
  const { getPopupContainer, getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const getContainer =
    // 有可能为 false，所以不能直接判断
    customizeGetContainer === undefined && getPopupContainer
      ? () => getPopupContainer(document.body)
      : customizeGetContainer;

  const closeIconNode = closable && (
    <button type="button" onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
      {closeIcon}
    </button>
  );

  function renderHeader() {
    if (!title && !closable) {
      return null;
    }

    return (
      <div
        className={classNames(`${prefixCls}-header`, {
          [`${prefixCls}-header-close-only`]: closable && !title && !extra,
        })}
        style={headerStyle}
      >
        <div className={`${prefixCls}-header-title`}>
          {closeIconNode}
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
        </div>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    );
  }

  function renderFooter() {
    if (!footer) {
      return null;
    }

    const footerClassName = `${prefixCls}-footer`;
    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  }

  const drawerClassName = classNames(
    {
      'no-mask': !mask,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    hashId,
  );

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
  };

  const panelMotion: RcDrawerProps['motion'] = motionPlacement => ({
    motionName: getTransitionName(prefixCls, `panel-motion-${motionPlacement}`),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
  });

  // =========================== Render ===========================
  return wrapSSR(
    <NoFormStyle status override>
      <RcDrawer
        prefixCls={prefixCls}
        onClose={onClose}
        {...rest}
        open={visible}
        mask={mask}
        push={push}
        width={mergedWidth}
        height={mergedHeight}
        rootClassName={drawerClassName}
        getContainer={getContainer}
        afterOpenChange={open => {
          afterVisibleChange?.(open);
        }}
        maskMotion={maskMotion}
        motion={panelMotion}
        rootStyle={style}
      >
        <div className={`${prefixCls}-wrapper-body`} style={{ ...drawerStyle }}>
          {renderHeader()}
          <div className={`${prefixCls}-body`} style={bodyStyle}>
            {children}
          </div>
          {renderFooter()}
        </div>
      </RcDrawer>
    </NoFormStyle>,
  );
}

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

export default Drawer;
