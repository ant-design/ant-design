import React from 'react';
import classNames from 'classnames';

function ieGT9() {
  if (typeof document === undefined) {
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

export default class Input extends React.Component {
  static defaultProps = {
    defaultValue: '',
    disabled: false,
    prefixCls: 'ant-input',
    type: 'text',
  }

  static propTypes = {
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
  }

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
    const props = { ...this.props };
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
