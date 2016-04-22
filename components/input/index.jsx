import React from 'react';
import assign from 'object-assign';
import classNames from 'classnames';

function ieGT9() {
  if (typeof document === 'undefined') {
    return false;
  }
  const documentMode = document.documentMode || 0;
  return documentMode > 9;
}

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

class Group extends React.Component {
  render() {
    const className = classNames({
      'ant-input-group': true,
      [this.props.className]: !!this.props.className,
    });
    return (
      <span className={className} style={this.props.style}>
        {this.props.children}
      </span>
    );
  }
}

Group.propTypes = {
  children: React.PropTypes.any,
};

class Input extends React.Component {
  renderLabledInput(children) {
    const props = this.props;
    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
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

    const className = classNames({
      [`${props.prefixCls}-wrapper`]: true,
      [wrapperClassName]: (addonBefore || addonAfter),
    });

    return (
      <span className={className}>
        {addonBefore}
        {children}
        {addonAfter}
      </span>
    );
  }

  renderInput() {
    const props = assign({}, this.props);
    const prefixCls = props.prefixCls;
    if (!props.type) {
      return props.children;
    }

    const inputClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-sm`]: props.size === 'small',
      [`${prefixCls}-lg`]: props.size === 'large',
      [props.className]: !!props.className,
    });

    let placeholder = props.placeholder;
    if (placeholder && ieGT9()) {
      placeholder = null;
    }
    if ('value' in props) {
      props.value = fixControlledValue(props.value);
    }
    switch (props.type) {
      case 'textarea':
        return <textarea {...props} placeholder={placeholder} className={inputClassName} ref="input" />;
      default:
        return <input {...props} placeholder={placeholder} className={inputClassName} ref="input" />;
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
  prefixCls: 'ant-input',
  type: 'text',
};

module.exports = Input;
module.exports.Group = Group;
