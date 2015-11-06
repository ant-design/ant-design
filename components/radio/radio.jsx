import Radio from 'rc-radio';
import React from 'react';

const AntRadio = React.createClass({
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
    if (this.props.disabled) {
      classString += ' ' + this.props.className + '-disabled';
    }
    return (
      <label className={classString}>
        <Radio {...this.props} children={null} />
        {this.props.children}
      </label>
    );
  }
});

export default AntRadio;
