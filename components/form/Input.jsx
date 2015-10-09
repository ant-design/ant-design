import React from 'react';

function prefixClsFn(prefixCls, ...args) {
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

class Group extends React.Component {
  render() {
    return (
      <div className={this.props.className} key="ant-input-group">
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
  // TODO
  getInputDOMNode() {
    return this.refs.input;
  }

  // TODO
  getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      return this.getInputDOMNode().value;
    }

    throw new Error('Cannot use getValue without specifying input type.');
  }

  renderLabledInput(children) {
    const props = this.props;
    const wrapperClassName = prefixClsFn(props.prefixCls, 'input-group');
    const addonClassName = prefixClsFn(wrapperClassName, 'addon');
    const addonBefore = props.addonBefore ? (
      <span className={addonClassName} key="addonBefore">
        {props.addonBefore}
      </span>
    ) : null;

    const addonAfter = props.addonAfter ? (
      <span className={addonClassName} key="addonAfter">
        {props.addonAfter}
      </span>
    ) : null;

    return addonBefore || addonAfter ? (
      <div className={wrapperClassName} key="ant-input-group">
        {addonBefore}
        {children}
        {addonAfter}
      </div>
    ) : children;
  }

  renderInput() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const inputClassName = prefixClsFn(prefixCls, 'input');
    if (!props.type) {
      return props.children;
    }

    // let inputClass;
    // switch (props.size) {
    // case 'small': inputClass = prefixClsFn(inputClassName, 'sm'); break;
    // case 'large': inputClass = prefixClsFn(inputClassName, 'lg'); break;
    // default:
    // }

    switch (props.type) {
    case 'textarea':
      return <textarea {...props} className={inputClassName} ref="input" />;
    case 'static':
      return (
        <p id={props.id} className={prefixClsFn(prefixCls, 'form-text')} ref="input">
          {props.value}
        </p>
      );
    default:
      return <input {...props} className={inputClassName} ref="input" key="input"/>;
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
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: React.PropTypes.bool,
  value: React.PropTypes.any,
  defaultValue: React.PropTypes.any,
  className: React.PropTypes.string,
  addonBefore: React.PropTypes.node,
  addonAfter: React.PropTypes.node,
  children: React.PropTypes.any,
  prefixCls: React.PropTypes.string,
};

Input.defaultProps = {
  defaultValue: '',
  disabled: false,
  prefixCls: 'ant',
};

module.exports = Input;
module.exports.Group = Group;
