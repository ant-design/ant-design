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
    var close = this.props.closable ?
      <i className="anticon anticon-cross" onClick={this.destroy.bind(this)}></i> : '';
    return <div className={this.props.prefixCls}>
      <span className={this.props.prefixCls + '-text'}>
        {this.props.children}
      </span>
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
