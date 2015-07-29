import React from 'react';
const prefixCls = 'ant-tag';

class AntTag extends React.Component {
  destroy() {
    let node = React.findDOMNode(this);
    React.unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
    this.props.onClose.call(this);
  }
  render() {
    let close = this.props.closable ?
      <i className="anticon anticon-cross" onClick={this.destroy.bind(this)}></i> : '';
    let colorClass = this.props.prefixCls + '-' + this.props.color;

    return <div className={this.props.prefixCls + ' ' + colorClass}>
      <a className={this.props.prefixCls + '-text'} {...this.props} />
      {close}
    </div>;
  }
}

AntTag.defaultProps = {
  prefixCls: prefixCls,
  closable: false,
  onClose: function() {}
};

export default AntTag;
