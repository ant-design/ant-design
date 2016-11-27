import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';

export interface SiderProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  right?: boolean;
  flexible?: boolean;
  collapsed?: boolean;
  onSwitch?: React.MouseEventHandler<any>;
  trigger?: React.ReactNode;
  width?: number;
}

export default class Sider extends React.Component<SiderProps, any> {

  static defaultProps = {
    prefixCls: 'ant-layout-sider',
    right: false,
    flexible: false,
    collapsed: false,
    width: '20%',
    collapsedWidth: '6%',
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
    };
  }

  onSwitch = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, () => {
      if (this.props.onSwitch) {
        this.props.onSwitch(this.state.collapsed);
      }
    });
  }

  render() {
    const [{
      prefixCls, className, right, flexible, trigger, style, width, collapsedWidth,
    }, others] = splitObject(this.props,
      ['prefixCls', 'className', 'right', 'flexible', 'trigger', 'style', 'width', 'collapsedWidth']);
    const divProps = omit(others, ['collapsed', 'onSwitch']);
    const siderCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-right`]: !!right,
      [`${prefixCls}-collapsed`]: !!this.state.collapsed,
      [className]: className,
    });
    const divStyle = assign({}, style, {
      flex: `0 0 ${this.state.collapsed ? collapsedWidth : width}`,
    });
    const iconObj = {
      'left-expanded': <Icon type="left" />,
      'left-collapsed': <Icon type="right" />,
      'right-expanded': <Icon type="right" />,
      'right-collapsed': <Icon type="left" />,
    };
    const pos = right ? 'right' : 'left';
    const status = this.state.collapsed ? 'collapsed' : 'expanded';
    const defaultTrigger = iconObj[`${pos}-${status}`];
    const triggerDom = (
      <div className={`${prefixCls}-trigger`} onClick={this.onSwitch}>
        {trigger ? trigger : defaultTrigger}
      </div>
    );
    return (
      <div className={siderCls} {...divProps} style={divStyle}>
        {this.props.children}
        {flexible && triggerDom}
      </div>
    );
  }
}
