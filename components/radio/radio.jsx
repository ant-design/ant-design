import Radio from 'rc-radio';
import React from 'react';

let AntRadio = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render() {
    let checkedClassName = this.props.checked ? this.props.className + '-checked' : '';
    return (
      <label className={this.props.className + ' ' + checkedClassName}>
        <Radio {...this.props} children={null} />
        {this.props.children}
      </label>
    );
  }
});

let Button = React.createClass({
  getDefaultProps() {
    return {
      className: 'ant-radio-button'
    };
  },
  render() {
    return (
      <AntRadio {...this.props} />
    );
  }
});

AntRadio.Button = Button;

export default AntRadio;
