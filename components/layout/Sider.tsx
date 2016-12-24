import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';

export interface SiderProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  position?: 'left' | 'right';
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  trigger?: React.ReactNode;
  width?: number;
  collapsedWidth?: number;
}

export default class Sider extends React.Component<SiderProps, any> {

  static defaultProps = {
    prefixCls: 'ant-layout-sider',
    position: 'left',
    collapsible: false,
    defaultCollapsed: false,
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
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('collapsed' in nextProps) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
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

  render() {
    const { prefixCls, className, position, collapsible, trigger, style, width, collapsedWidth,
      ...others } = this.props;
    const divProps = omit(others, ['collapsed', 'defaultCollapsed', 'onCollapse']);
    const siderCls = classNames(className, prefixCls, {
      [`${prefixCls}-right`]: position === 'right',
      [`${prefixCls}-collapsed`]: !!this.state.collapsed,
    });
    const divStyle = assign({}, style, {
      flex: `0 0 ${this.state.collapsed ? collapsedWidth : width}px`,
    });
    const iconObj = {
      'left-expanded': <Icon type="left" />,
      'left-collapsed': <Icon type="right" />,
      'right-expanded': <Icon type="right" />,
      'right-collapsed': <Icon type="left" />,
    };
    const status = this.state.collapsed ? 'collapsed' : 'expanded';
    const defaultTrigger = iconObj[`${position}-${status}`];
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
        {collapsible && triggerDom}
      </div>
    );
  }
}
