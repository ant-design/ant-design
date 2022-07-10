import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import RcDrawer from 'rc-drawer';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { tuple } from '../_util/type';

type DrawerRef = {
  push(): void;
  pull(): void;
};

const DrawerContext = React.createContext<DrawerRef | null>(null);

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

const Drawer = React.forwardRef<DrawerRef, DrawerProps>(
  (
    {
      width,
      height,
      size = 'default',
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
      className,
      visible: propsVisible,
      forceRender,
      children,
      zIndex,
      destroyOnClose,
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
    },
    ref,
  ) => {
    const [internalPush, setPush] = React.useState(false);
    const parentDrawer = React.useContext(DrawerContext);
    const destroyCloseRef = React.useRef<boolean>(false);

    const [load, setLoad] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (propsVisible) {
        setLoad(true);
      } else {
        setVisible(false);
      }
    }, [propsVisible]);

    React.useEffect(() => {
      if (load && propsVisible) {
        setVisible(true);
      }
    }, [load, propsVisible]);

    const { getPopupContainer, getPrefixCls, direction } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('drawer', customizePrefixCls);
    const getContainer =
      // 有可能为 false，所以不能直接判断
      customizeGetContainer === undefined && getPopupContainer
        ? () => getPopupContainer(document.body)
        : customizeGetContainer;

    React.useEffect(() => {
      // fix: delete drawer in child and re-render, no push started.
      // <Drawer>{show && <Drawer />}</Drawer>
      if (propsVisible && parentDrawer) {
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

    const getOffsetStyle = () => {
      // https://github.com/ant-design/ant-design/issues/24287
      if (!visible && !mask) {
        return {};
      }
      const offsetStyle: any = {};
      if (placement === 'left' || placement === 'right') {
        const defaultWidth = size === 'large' ? 736 : 378;
        offsetStyle.width = typeof width === 'undefined' ? defaultWidth : width;
      } else {
        const defaultHeight = size === 'large' ? 736 : 378;
        offsetStyle.height = typeof height === 'undefined' ? defaultHeight : height;
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

    // render drawer body dom
    const renderBody = () => {
      // destroyCloseRef.current =false Load the body only once by default
      if (destroyCloseRef.current && !forceRender && !propsVisible) {
        return null;
      }

      return (
        <div className={`${prefixCls}-wrapper-body`} style={{ ...drawerStyle }}>
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
        <NoFormStyle status override>
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
              forceRender,
              ...rest,
            }}
            {...offsetStyle}
            open={visible || propsVisible}
            showMask={mask}
            style={getRcDrawerStyle()}
            className={drawerClassName}
            getContainer={getContainer}
            afterVisibleChange={open => {
              if (open) {
                destroyCloseRef.current = false;
              } else if (destroyOnClose) {
                destroyCloseRef.current = true;
                setLoad(false);
              }
              afterVisibleChange?.(open);
            }}
          >
            {renderBody()}
          </RcDrawer>
        </NoFormStyle>
      </DrawerContext.Provider>
    );
  },
);
if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

export default Drawer;
