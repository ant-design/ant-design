import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';

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
  collapsedWidth?: number;
}

export default class Sider extends React.Component<SiderProps, any> {

  static defaultProps = {
    prefixCls: 'ant-layout-sider',
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 64,
    style: {},
    name: 'Sider',
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
    const {
      prefixCls, className, collapsible, reverseArrow, trigger, style, width, collapsedWidth,
      ...others,
    } = this.props;
    const divProps = omit(others, ['collapsed', 'defaultCollapsed', 'onCollapse', 'name']);
    const siderCls = classNames(className, prefixCls, {
      [`${prefixCls}-collapsed`]: !!this.state.collapsed,
      [`${prefixCls}-has-trigger`]: !!trigger,
    });
    const divStyle = {
      ...style,
      flex: `0 0 ${this.state.collapsed ? collapsedWidth : width}px`,
    };
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
        {collapsible && triggerDom}
      </div>
    );
  }
}
