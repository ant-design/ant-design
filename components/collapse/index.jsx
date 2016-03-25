import RcCollapse from 'rc-collapse';
import React from 'react';

export default class Collapse extends React.Component {
  render() {
    return <RcCollapse {...this.props} />;
  }
}

Collapse.defaultProps = {
  prefixCls: 'ant-collapse',
};

Collapse.Panel = RcCollapse.Panel;
