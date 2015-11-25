import React from 'react';

function prefixClsFn(prefixCls, ...args) {
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

function ieGT9() {
  if (typeof document === undefined) {
    return false;
  }
  const documentMode = document.documentMode || 0;
  return documentMode > 9;
}

class Group extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

Group.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.any,
};

Group.defaultProps = {
  className: 'ant-input-group',
};


class Input extends React.Component {
  renderLabledInput(children) {
    const props = this.props;
    const wrapperClassName = prefixClsFn(props.prefixCls, 'input-group');
    const addonClassName = prefixClsFn(wrapperClassName, 'addon');
    const addonBefore = props.addonBefore ? (
      <span className={addonClassName}>
        {props.addonBefore}
      </span>
    ) : null;

    const addonAfter = props.addonAfter ? (
      <span className={addonClassName}>
        {props.addonAfter}
      </span>
    ) : null;

    return (
      <div className={(addonBefore || addonAfter) ? wrapperClassName : ''}>
        {addonBefore}
        {children}
        {addonAfter}
      </div>
    );
  }

  renderInput() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    let inputClassName = prefixClsFn(prefixCls, 'input');
    if (!props.type) {
      return props.children;
    }

    switch (props.size) {
    case 'small': inputClassName = prefixClsFn(prefixCls, 'input', 'input-sm'); break;
    case 'large': inputClassName = prefixClsFn(prefixCls, 'input', 'input-lg'); break;
    default:
    }
    let placeholder = props.placeholder;
    if(placeholder && ieGT9()){
      placeholder = null;
    }
    switch (props.type) {
    case 'textarea':
      return <textarea {...props} value={props.value || props.defaultValue} placeholder={placeholder} className={inputClassName} ref="input" />;
    default:
      inputClassName = props.className ? props.className : inputClassName;
      return <input {...props} placeholder={placeholder} className={inputClassName} ref="input"/>;
    }
  }

  render() {
    return this.renderLabledInput(this.renderInput());
  }
}

Input.propTypes = {
  type: React.PropTypes.string,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  size: React.PropTypes.oneOf(['small', 'default', 'large']),
  disabled: React.PropTypes.bool,
  value: React.PropTypes.any,
  defaultValue: React.PropTypes.any,
  className: React.PropTypes.string,
  addonBefore: React.PropTypes.node,
  addonAfter: React.PropTypes.node,
  prefixCls: React.PropTypes.string,
};

Input.defaultProps = {
  defaultValue: '',
  disabled: false,
  prefixCls: 'ant',
  type: 'text',
};

module.exports = Input;
module.exports.Group = Group;
