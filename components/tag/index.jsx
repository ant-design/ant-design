import React from 'react';
const prefixCls = 'ant-tag';

class AntTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: false
    };
  }
  close(e) {
    this.setState({
      closed: true
    });
    this.props.onClose.call(this, e);
  }
  render() {
    let close = this.props.closable ?
      <i className="anticon anticon-cross" onClick={this.close.bind(this)}></i> : '';
    let colorClass = this.props.prefixCls + '-' + this.props.color;

    return this.state.closed ? null : <div className={this.props.prefixCls + ' ' + colorClass}>
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
