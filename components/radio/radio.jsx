import Radio from 'rc-radio';
import React from 'react';

let AntRadio = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render() {
    let classString = this.props.className;
    if (classString) {
      classString += this.props.checked ? (' ' + classString + '-checked') : '';
    }
    return (
      <label className={classString}>
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
