import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import BarsOutlined from '@ant-design/icons/BarsOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';

import { LayoutContext, LayoutContextProps } from './layout';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import isNumeric from '../_util/isNumeric';

const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
};

export interface SiderContextProps {
  siderCollapsed?: boolean;
  collapsedWidth?: string | number;
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

type InternalSideProps = SiderProps & LayoutContextProps;

export interface SiderState {
  collapsed?: boolean;
  below: boolean;
}

const generateId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class InternalSider extends React.Component<InternalSideProps, SiderState> {
  static defaultProps = {
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80,
    style: {},
    theme: 'dark' as SiderTheme,
  };

  static getDerivedStateFromProps(nextProps: InternalSideProps) {
    if ('collapsed' in nextProps) {
      return {
        collapsed: nextProps.collapsed,
      };
    }
    return null;
  }

  private mql: MediaQueryList;

  private uniqueId: string;

  constructor(props: InternalSideProps) {
    super(props);
    this.uniqueId = generateId('ant-sider-');
    let matchMedia;
    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia;
    }
    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMaxMap) {
      this.mql = matchMedia(`(max-width: ${dimensionMaxMap[props.breakpoint]})`);
    }
    let collapsed;
    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = props.defaultCollapsed;
    }
    this.state = {
      collapsed,
      below: false,
    };
  }

  componentDidMount() {
    if (this.mql) {
      this.mql.addListener(this.responsiveHandler);
      this.responsiveHandler(this.mql);
    }

    if (this.props.siderHook) {
      this.props.siderHook.addSider(this.uniqueId);
    }
  }

  componentWillUnmount() {
    if (this.mql) {
      this.mql.removeListener(this.responsiveHandler as any);
    }

    if (this.props.siderHook) {
      this.props.siderHook.removeSider(this.uniqueId);
    }
  }

  responsiveHandler = (mql: MediaQueryListEvent | MediaQueryList) => {
    this.setState({ below: mql.matches });
    const { onBreakpoint } = this.props;
    if (onBreakpoint) {
      onBreakpoint(mql.matches);
    }
    if (this.state.collapsed !== mql.matches) {
      this.setCollapsed(mql.matches, 'responsive');
    }
  };

  setCollapsed = (collapsed: boolean, type: CollapseType) => {
    if (!('collapsed' in this.props)) {
      this.setState({
        collapsed,
      });
    }
    const { onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(collapsed, type);
    }
  };

  toggle = () => {
    const collapsed = !this.state.collapsed;
    this.setCollapsed(collapsed, 'clickTrigger');
  };

  renderSider = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      theme,
      collapsible,
      reverseArrow,
      trigger,
      style,
      width,
      collapsedWidth,
      zeroWidthTriggerStyle,
      children,
      ...others
    } = this.props;
    const { collapsed, below } = this.state;
    const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
    const divProps = omit(others, [
      'collapsed',
      'defaultCollapsed',
      'onCollapse',
      'breakpoint',
      'onBreakpoint',
      'siderHook',
      'zeroWidthTriggerStyle',
    ]);
    const rawWidth = collapsed ? collapsedWidth : width;
    // use "px" as fallback unit for width
    const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
    // special trigger when collapsedWidth == 0
    const zeroWidthTrigger =
      parseFloat(String(collapsedWidth || 0)) === 0 ? (
        <span
          onClick={this.toggle}
          className={classNames(
            `${prefixCls}-zero-width-trigger`,
            `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`,
          )}
          style={zeroWidthTriggerStyle}
        >
          {trigger || <BarsOutlined />}
        </span>
      ) : null;
    const iconObj = {
      expanded: reverseArrow ? <RightOutlined /> : <LeftOutlined />,
      collapsed: reverseArrow ? <LeftOutlined /> : <RightOutlined />,
    };
    const status = collapsed ? 'collapsed' : 'expanded';
    const defaultTrigger = iconObj[status];
    const triggerDom =
      trigger !== null
        ? zeroWidthTrigger || (
            <div
              className={`${prefixCls}-trigger`}
              onClick={this.toggle}
              style={{ width: siderWidth }}
            >
              {trigger || defaultTrigger}
            </div>
          )
        : null;
    const divStyle = {
      ...style,
      flex: `0 0 ${siderWidth}`,
      maxWidth: siderWidth, // Fix width transition bug in IE11
      minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
      width: siderWidth,
    };
    const siderCls = classNames(className, prefixCls, `${prefixCls}-${theme}`, {
      [`${prefixCls}-collapsed`]: !!collapsed,
      [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
      [`${prefixCls}-below`]: !!below,
      [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
    });
    return (
      <aside className={siderCls} {...divProps} style={divStyle}>
        <div className={`${prefixCls}-children`}>{children}</div>
        {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
      </aside>
    );
  };

  render() {
    const { collapsed } = this.state;
    const { collapsedWidth } = this.props;
    return (
      <SiderContext.Provider
        value={{
          siderCollapsed: collapsed,
          collapsedWidth,
        }}
      >
        <ConfigConsumer>{this.renderSider}</ConfigConsumer>
      </SiderContext.Provider>
    );
  }
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Sider extends React.Component {
  render() {
    return (
      <LayoutContext.Consumer>
        {(context: LayoutContextProps) => <InternalSider {...context} {...this.props} />}
      </LayoutContext.Consumer>
    );
  }
}
