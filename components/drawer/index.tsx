import * as React from 'react';
import RcDrawer from 'rc-drawer';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import { ConfigContext, DirectionType } from '../config-provider';
import { tuple } from '../_util/type';
import useForceUpdate from '../_util/hooks/useForceUpdate';

type DrawerRef = {
  push(): void;
  pull(): void;
};

const DrawerContext = React.createContext<DrawerRef | null>(null);

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type getContainerFunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = typeof PlacementTypes[number];

export interface PushState {
  distance: string | number;
}
export interface DrawerProps {
  closable?: boolean;
  closeIcon?: React.ReactNode;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
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
  footer?: React.ReactNode;
  footerStyle?: React.CSSProperties;
  level?: string | string[] | null | undefined;
}

export interface IDrawerState {
  push?: boolean;
}

interface InternalDrawerProps extends DrawerProps {
  direction: DirectionType;
}

const defaultPushState: PushState = { distance: 180 };

const Drawer = React.forwardRef<DrawerRef, InternalDrawerProps>(
  (
    {
      width = 256,
      height = 256,
      closable = true,
      placement = 'right' as placementType,
      maskClosable = true,
      mask = true,
      level = null,
      keyboard = true,
      push = defaultPushState,
      closeIcon = <CloseOutlined />,
      bodyStyle,
      drawerStyle,
      prefixCls,
      className,
      direction,
      visible,
      children,
      zIndex,
      destroyOnClose,
      style,
      title,
      headerStyle,
      onClose,
      footer,
      footerStyle,
      ...rest
    },
    ref,
  ) => {
    const forceUpdate = useForceUpdate();
    const [internalPush, setPush] = React.useState(false);
    const parentDrawer = React.useContext(DrawerContext);
    const destroyClose = React.useRef<boolean>(false);

    React.useEffect(() => {
      // fix: delete drawer in child and re-render, no push started.
      // <Drawer>{show && <Drawer />}</Drawer>
      if (visible && parentDrawer) {
        parentDrawer.push();
      }

      return () => {
        if (parentDrawer) {
          parentDrawer.pull();
          // parentDrawer = null;
        }
      };
    }, []);

    React.useEffect(() => {
      if (parentDrawer) {
        if (visible) {
          parentDrawer.push();
        } else {
          parentDrawer.pull();
        }
      }
    }, [visible]);

    const operations = React.useMemo(
      () => ({
        push() {
          if (push) {
            setPush(true);
          }
        },
        pull() {
          if (push) {
            setPush(false);
          }
        },
      }),
      [push],
    );

    React.useImperativeHandle(ref, () => operations, [operations]);

    const isDestroyOnClose = destroyOnClose && !visible;

    const onDestroyTransitionEnd = () => {
      if (!isDestroyOnClose) {
        return;
      }
      if (!visible) {
        destroyClose.current = true;
        forceUpdate();
      }
    };

    const getOffsetStyle = () => {
      // https://github.com/ant-design/ant-design/issues/24287
      if (!visible && !mask) {
        return {};
      }
      const offsetStyle: any = {};
      if (placement === 'left' || placement === 'right') {
        offsetStyle.width = width;
      } else {
        offsetStyle.height = height;
      }
      return offsetStyle;
    };

    const getRcDrawerStyle = () => {
      // get drawer push width or height
      const getPushTransform = (_placement?: placementType) => {
        let distance: number | string;
        if (typeof push === 'boolean') {
          distance = push ? defaultPushState.distance : 0;
        } else {
          distance = push!.distance;
        }
        distance = parseFloat(String(distance || 0));

        if (_placement === 'left' || _placement === 'right') {
          return `translateX(${_placement === 'left' ? distance : -distance}px)`;
        }
        if (_placement === 'top' || _placement === 'bottom') {
          return `translateY(${_placement === 'top' ? distance : -distance}px)`;
        }
      };

      // 当无 mask 时，将 width 应用到外层容器上
      // 解决 https://github.com/ant-design/ant-design/issues/12401 的问题
      const offsetStyle = mask ? {} : getOffsetStyle();
      return {
        zIndex,
        transform: internalPush ? getPushTransform(placement) : undefined,
        ...offsetStyle,
        ...style,
      };
    };

    function renderCloseIcon() {
      return (
        closable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`${prefixCls}-close`}
            style={
              {
                '--scroll-bar': `${getScrollBarSize()}px`,
              } as any
            }
          >
            {closeIcon}
          </button>
        )
      );
    }

    function renderHeader() {
      if (!title && !closable) {
        return null;
      }

      const headerClassName = title ? `${prefixCls}-header` : `${prefixCls}-header-no-title`;
      return (
        <div className={headerClassName} style={headerStyle}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          {closable && renderCloseIcon()}
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

    // render drawer body dom
    const renderBody = () => {
      if (destroyClose.current && !visible) {
        return null;
      }
      destroyClose.current = false;

      const containerStyle: React.CSSProperties = {};

      if (isDestroyOnClose) {
        // Increase the opacity transition, delete children after closing.
        containerStyle.opacity = 0;
        containerStyle.transition = 'opacity .3s';
      }

      return (
        <div
          className={`${prefixCls}-wrapper-body`}
          style={{
            ...containerStyle,
            ...drawerStyle,
          }}
          onTransitionEnd={onDestroyTransitionEnd}
        >
          {renderHeader()}
          <div className={`${prefixCls}-body`} style={bodyStyle}>
            {children}
          </div>
          {renderFooter()}
        </div>
      );
    };

    const drawerClassName = classNames(
      {
        'no-mask': !mask,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );
    const offsetStyle = mask ? getOffsetStyle() : {};

    return (
      <DrawerContext.Provider value={operations}>
        <RcDrawer
          handler={false}
          {...{
            placement,
            prefixCls,
            maskClosable,
            level,
            keyboard,
            children,
            onClose,
            ...rest,
          }}
          {...offsetStyle}
          open={visible}
          showMask={mask}
          style={getRcDrawerStyle()}
          className={drawerClassName}
        >
          {renderBody()}
        </RcDrawer>
      </DrawerContext.Provider>
    );
  },
);

Drawer.displayName = 'Drawer';

const DrawerWrapper: React.FC<DrawerProps> = React.forwardRef<DrawerRef, DrawerProps>(
  (props, ref) => {
    const { prefixCls: customizePrefixCls, getContainer: customizeGetContainer } = props;
    const { getPopupContainer, getPrefixCls, direction } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls('drawer', customizePrefixCls);
    const getContainer =
      // 有可能为 false，所以不能直接判断
      customizeGetContainer === undefined && getPopupContainer
        ? () => getPopupContainer(document.body)
        : customizeGetContainer;

    return (
      <Drawer
        {...props}
        ref={ref}
        prefixCls={prefixCls}
        getContainer={getContainer}
        direction={direction}
      />
    );
  },
);

DrawerWrapper.displayName = 'DrawerWrapper';

export default DrawerWrapper;
