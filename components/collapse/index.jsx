import Collapse from 'rc-collapse';
import React from 'react';

class AntCollapse extends React.Component {
  render() {
    return <Collapse {...this.props} />;
  }
}

AntCollapse.defaultProps = {
  prefixCls: 'ant-collapse',
};

AntCollapse.Panel = Collapse.Panel;

export default AntCollapse;
