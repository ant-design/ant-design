import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import BarsOutlined from '@ant-design/icons/BarsOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import { LayoutContext } from './context';
import useStyle from './style/sider';

const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
};

const isNumeric = (val: any) =>
  !Number.isNaN(Number.parseFloat(val)) && Number.isFinite(Number(val));

export interface SiderContextProps {
  siderCollapsed?: boolean;
}

export const SiderContext: React.Context<SiderContextProps> = React.createContext({});

export type CollapseType = 'clickTrigger' | 'responsive';

export type SiderTheme = 'light' | 'dark';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  zeroWidthTriggerStyle?: React.CSSProperties;
  trigger?: React.ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  theme?: SiderTheme;
  onBreakpoint?: (broken: boolean) => void;
}

export interface SiderState {
  collapsed?: boolean;
  below: boolean;
}

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

const Sider = React.forwardRef<HTMLDivElement, SiderProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    trigger,
    children,
    defaultCollapsed = false,
    theme = 'dark',
    style = {},
    collapsible = false,
    reverseArrow = false,
    width = 200,
    collapsedWidth = 80,
    zeroWidthTriggerStyle,
    breakpoint,
    onCollapse,
    onBreakpoint,
    ...otherProps
  } = props;
  const { siderHook } = useContext(LayoutContext);

  const [collapsed, setCollapsed] = useState(
    'collapsed' in props ? props.collapsed : defaultCollapsed,
  );
  const [below, setBelow] = useState(false);

  useEffect(() => {
    if ('collapsed' in props) {
      setCollapsed(props.collapsed);
    }
  }, [props.collapsed]);

  const handleSetCollapsed = (value: boolean, type: CollapseType) => {
    if (!('collapsed' in props)) {
      setCollapsed(value);
    }
    onCollapse?.(value, type);
  };

  // =========================== Prefix ===========================
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ========================= Responsive =========================
  const responsiveHandlerRef = useRef<(mql: MediaQueryListEvent | MediaQueryList) => void>(null);
  responsiveHandlerRef.current = (mql: MediaQueryListEvent | MediaQueryList) => {
    setBelow(mql.matches);
    onBreakpoint?.(mql.matches);

    if (collapsed !== mql.matches) {
      handleSetCollapsed(mql.matches, 'responsive');
    }
  };

  useEffect(() => {
    function responsiveHandler(mql: MediaQueryListEvent | MediaQueryList) {
      return responsiveHandlerRef.current?.(mql);
    }
    let mql: MediaQueryList;
    if (typeof window?.matchMedia !== 'undefined' && breakpoint && breakpoint in dimensionMaxMap) {
      mql = window.matchMedia(`screen and (max-width: ${dimensionMaxMap[breakpoint]})`);
      if (typeof mql?.addEventListener === 'function') {
        mql.addEventListener('change', responsiveHandler);
      }
      responsiveHandler(mql);
    }
    return () => {
      if (typeof mql?.removeEventListener === 'function') {
        mql.removeEventListener('change', responsiveHandler);
      }
    };
  }, [breakpoint]); // in order to accept dynamic 'breakpoint' property, we need to add 'breakpoint' into dependency array.

  useEffect(() => {
    const uniqueId = generateId('ant-sider-');
    siderHook.addSider(uniqueId);
    return () => siderHook.removeSider(uniqueId);
  }, []);

  const toggle = () => {
    handleSetCollapsed(!collapsed, 'clickTrigger');
  };

  const divProps = omit(otherProps, ['collapsed']);
  const rawWidth = collapsed ? collapsedWidth : width;
  // use "px" as fallback unit for width
  const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
  // special trigger when collapsedWidth == 0
  const zeroWidthTrigger =
    Number.parseFloat(String(collapsedWidth || 0)) === 0 ? (
      <span
        onClick={toggle}
        className={clsx(
          `${prefixCls}-zero-width-trigger`,
          `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`,
        )}
        style={zeroWidthTriggerStyle}
      >
        {trigger || <BarsOutlined />}
      </span>
    ) : null;

  const reverseIcon = (direction === 'rtl') === !reverseArrow;

  const iconObj = {
    expanded: reverseIcon ? <RightOutlined /> : <LeftOutlined />,
    collapsed: reverseIcon ? <LeftOutlined /> : <RightOutlined />,
  };

  const status = collapsed ? 'collapsed' : 'expanded';
  const defaultTrigger = iconObj[status];
  const triggerDom =
    trigger !== null
      ? zeroWidthTrigger || (
          <div className={`${prefixCls}-trigger`} onClick={toggle} style={{ width: siderWidth }}>
            {trigger || defaultTrigger}
          </div>
        )
      : null;

  const divStyle: React.CSSProperties = {
    ...style,
    flex: `0 0 ${siderWidth}`,
    maxWidth: siderWidth, // Fix width transition bug in IE11
    minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
    width: siderWidth,
  };

  const siderCls = clsx(
    prefixCls,
    `${prefixCls}-${theme}`,
    {
      [`${prefixCls}-collapsed`]: !!collapsed,
      [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
      [`${prefixCls}-below`]: !!below,
      [`${prefixCls}-zero-width`]: Number.parseFloat(siderWidth) === 0,
    },
    className,
    hashId,
    cssVarCls,
  );

  const contextValue = React.useMemo<SiderContextProps>(
    () => ({ siderCollapsed: collapsed }),
    [collapsed],
  );

  return (
    <SiderContext.Provider value={contextValue}>
      <aside className={siderCls} {...divProps} style={divStyle} ref={ref}>
        <div className={`${prefixCls}-children`}>{children}</div>
        {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
      </aside>
    </SiderContext.Provider>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Sider.displayName = 'Sider';
}

export default Sider;
