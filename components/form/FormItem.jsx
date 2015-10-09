import React from 'react';
import rcUtil from 'rc-util';

const cx = rcUtil.classSet;

function prefixClsFn(prefixCls, ...args) {
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

class FormItem extends React.Component {
  renderHelp() {
    const prefixCls = this.props.prefixCls;
    return this.props.help ? (
      <div className={prefixClsFn(prefixCls, 'explain')} key="help">
        {this.props.help}
      </div>
    ) : null;
  }

  renderValidateWrapper(children) {
    if (this.props.validateStatus) {
      const classes = cx(
        {
          'has-feedback': this.props.hasFeedback,
          'has-success': this.props.validateStatus === 'success',
          'has-warning': this.props.validateStatus === 'warning',
          'has-error': this.props.validateStatus === 'error',
          'is-validating': this.props.validateStatus === 'validating',
        }
      );
      return (
        <div className={classes}>
          {children}
        </div>
      );
    }
    return children;
  }

  renderWrapper(children) {
    return this.props.wrapperClassName ? (
      <div className={this.props.wrapperClassName} key="wrapper">
        {children}
      </div>
    ) : children;
  }

  renderLabel() {
    const labelClassName = this.props.labelClassName;
    const required = this.props.required ? 'required' : '';

    return this.props.label ? (
      <label htmlFor={this.props.id} className={labelClassName} required={required} key="label">
        {this.props.label}
      </label>
    ) : '';
  }

  renderChildren() {
    return [
      this.renderLabel(),
      this.renderWrapper(
        this.renderValidateWrapper(
          [
            this.props.children,
            this.renderHelp(),
          ]
        )
      ),
    ];
  }

  renderFormItem(children) {
    const prefixCls = this.props.prefixCls;
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-compact`]: this.props.isCompact,
    };

    return (
      <div className={cx(itemClassName)} key="form-item">
        {children}
      </div>
    );
  }

  render() {
    const children = this.renderChildren();
    return this.renderFormItem(children);
  }
}

FormItem.propTypes = {
  prefixCls: React.PropTypes.string,
  label: React.PropTypes.node,
  labelClassName: React.PropTypes.string,
  help: React.PropTypes.node,
  validateStatus: React.PropTypes.oneOf(['success', 'warning', 'error', 'validating']),
  hasFeedback: React.PropTypes.bool,
  wrapperClassName: React.PropTypes.string,
  isCompact: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.any,
};

FormItem.defaultProps = {
  hasFeedback: false,
  isCompact: false,
  required: false,
  prefixCls: 'ant-form',
};

module.exports = FormItem;
