import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';

const dimensionMap = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1600px',
};

export interface SiderProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  trigger?: React.ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  widthBelow?: number | string;
  onResponse?: (below: boolean) => void;
}

export default class Sider extends React.Component<SiderProps, any> {
  static __ANT_LAYOUT_SIDER: any = true;

  static defaultProps = {
    prefixCls: 'ant-layout-sider',
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 64,
    style: {},
  };

  constructor(props) {
    super(props);
    let collapsed;
    if ('collapsed' in props) {
      collapsed = props.collapsed;
    } else {
      collapsed = props.defaultCollapsed;
    }
    this.state = {
      collapsed,
      below: false,
      belowShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('collapsed' in nextProps) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
    }
  }

  componentDidMount() {
    const matchMedia = window.matchMedia;
    const props = this.props;
    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
      const mql = matchMedia(`(max-width: ${dimensionMap[props.breakpoint]})`);
      mql.addListener(this.responsiveHandler);
      this.responsiveHandler(mql);
    }
  }

  responsiveHandler = (mql) => {
    this.setState({ below: mql.matches });
    const { onResponse } = this.props;
    if (onResponse) {
      onResponse(mql.matches);
    }
  }

  setCollapsed = (collapsed) => {
    if (!('collapsed' in this.props)) {
      this.setState({
        collapsed,
      });
    }
    const { onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }

  toggle = () => {
    const collapsed = !this.state.collapsed;
    this.setCollapsed(collapsed);
  }

  belowShowChange = () => {
    this.setState({ belowShow: !this.state.belowShow });
  }

  render() {
    const { prefixCls, className,
      collapsible, reverseArrow, trigger, style, width, collapsedWidth, widthBelow,
      ...others,
    } = this.props;
    const divProps = omit(others, ['collapsed',
      'defaultCollapsed', 'onCollapse', 'breakpoint', 'onResponse']);
    let siderWidth;
    let belowTrigger;
    if (this.state.below) {
      if (this.state.belowShow) {
        siderWidth = width;
      } else {
        // priority(higher -> lower): widthBelow(if set) -> collapsedWidth(if collapsible) -> 0
        // belowTrigger will show only if siderWidth === 0
        if (widthBelow || widthBelow === 0) {
          siderWidth = widthBelow;
        } else {
          siderWidth = collapsible ? collapsedWidth : 0;
        }
      }
      if (!widthBelow && !collapsible || widthBelow === 0) {
        belowTrigger = (
          <span onClick={this.belowShowChange} className={`${prefixCls}-below-default-trigger`}>
            <Icon type="bars" />
          </span>);
      }
    } else {
      siderWidth = this.state.collapsed ? collapsedWidth : width;
    }
    const divStyle = {
      ...style,
      flex: `0 0 ${siderWidth}px`,
      width: `${siderWidth}px`,
    };
    const siderCls = classNames(className, prefixCls, {
      [`${prefixCls}-collapsed`]: !!this.state.collapsed,
      [`${prefixCls}-has-trigger`]: !!trigger,
      [`${prefixCls}-below`]: !!this.state.below,
      [`${prefixCls}-below-default`]: !!this.state.below && !siderWidth,
    });
    const iconObj = {
      'expanded': reverseArrow ? <Icon type="right" /> : <Icon type="left" />,
      'collapsed': reverseArrow ? <Icon type="left" /> : <Icon type="right" />,
    };
    const status = this.state.collapsed ? 'collapsed' : 'expanded';
    const defaultTrigger = iconObj[status];
    const triggerDom = (
      trigger !== null ?
      (<div className={`${prefixCls}-trigger`} onClick={this.toggle}>
        {trigger || defaultTrigger}
      </div>)
      : null
    );
    return (
      <div className={siderCls} {...divProps} style={divStyle}>
        {this.props.children}
        {!this.state.below && collapsible && triggerDom}
        {belowTrigger || null}
      </div>
    );
  }
}
