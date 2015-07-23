import Collapse from 'rc-collapse';
import React from 'react';
const prefixCls = 'ant-collapse';

class AntCollapse extends React.Component {
  render() {
    return <Collapse {...this.props} />;
  }
}

AntCollapse.defaultProps = {
  prefixCls: prefixCls
};

AntCollapse.Panel = Collapse.Panel;

export default AntCollapse;
