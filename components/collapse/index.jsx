import Collapse from 'rc-collapse';
import React from 'react';
import prefixCls from 'ant-collapse';

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
