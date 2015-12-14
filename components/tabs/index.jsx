import Tabs from 'rc-tabs';
import React from 'react';
import classNames from 'classnames';

class AntTabs extends React.Component {
  render() {
    let { prefixCls, size, tabPosition, animation, type } = this.props;
    let className = classNames({
      [this.props.className]: !!this. props.className,
      [prefixCls + '-mini']: size === 'small' || size === 'mini',
      [prefixCls + '-vertical']: tabPosition === 'left' || tabPosition === 'right',
      [prefixCls + '-' + type]: true,
    });
    if (tabPosition === 'left' || tabPosition === 'right' || type === 'card') {
      animation = null;
    }
    return <Tabs {...this.props} className={className} animation={animation} />;
  }
}

AntTabs.defaultProps = {
  prefixCls: 'ant-tabs',
  size: 'default',
  animation: 'slide-horizontal',
  type: 'line', // or 'card',
  closable: false,
};

AntTabs.TabPane = Tabs.TabPane;

export default AntTabs;
