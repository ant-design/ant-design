var Collapse = require('rc-collapse');
var React = require('react');
var prefixCls = 'ant-collapse';

class AntCollapse extends React.Component {
  render() {
    return <Collapse {...this.props} />;
  }
}

AntCollapse.defaultProps = {
  prefixCls: prefixCls
};

AntCollapse.Panel = Collapse.Panel;

module.exports = AntCollapse;
