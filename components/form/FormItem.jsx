import React from 'react';
import classNames from 'classnames';

function prefixClsFn(prefixCls, ...args) {
  return args.map((s) => {
    return prefixCls + '-' + s;
  }).join(' ');
}

class FormItem extends React.Component {
  _getLayoutClass(colDef) {
    if (!colDef) {
      return '';
    }
    const { span, offset } = colDef;
    const col = span ? 'col-' + span : '';
    const offsetCol = offset ? ' col-offset-' + offset : '';
    return col + offsetCol;
  }

  getHelpMsg() {
    const context = this.context;
    const props = this.props;
    if (props.help === undefined && context.form) {
      return (context.form.getFieldError(props.id) || []).join(', ');
    }

    return props.help;
  }

  renderHelp() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const help = this.getHelpMsg();
    return (
      <div className={!!help ? prefixClsFn(prefixCls, 'explain') : ''}
        key="help">
        { help }
      </div>
    );
  }

  getValidateStatus() {
    const { isFieldValidating, getFieldError, getFieldValue } = this.context.form;
    const field = this.props.id;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }

  renderValidateWrapper(c1, c2) {
    let classes = '';
    const form = this.context.form;
    const props = this.props;
    const validateStatus = (props.validateStatus === undefined && form) ?
            this.getValidateStatus() :
            props.validateStatus;

    if (validateStatus) {
      classes = classNames(
        {
          'has-feedback': props.hasFeedback,
          'has-success': validateStatus === 'success',
          'has-warning': validateStatus === 'warning',
          'has-error': validateStatus === 'error',
          'is-validating': validateStatus === 'validating',
        }
      );
    }
    return (
      <div className={this.props.prefixCls + '-item-control ' + classes}>
        {c1}{c2}
      </div>
    );
  }

  renderWrapper(children) {
    const wrapperCol = this.props.wrapperCol;
    return (
      <div className={this._getLayoutClass(wrapperCol)} key="wrapper">
        {children}
      </div>
    );
  }

  isRequired() {
    const options = this.props.options;
    if (options === undefined) return false;

    const allRules = (options.validate || []).concat({
      rules: options.rules || [],
    });
    return allRules.some((item) => {
      return item.rules.some((rule) => rule.required);
    });
  }

  renderLabel() {
    const props = this.props;
    const labelCol = props.labelCol;
    const required = props.required === undefined ?
            this.isRequired() :
            props.required;

    return props.label ? (
      <label htmlFor={props.id} className={this._getLayoutClass(labelCol)}
        required={required} key="label">
        {props.label}
      </label>
    ) : null;
  }

  renderChildren() {
    const context = this.context;
    const props = this.props;
    let children = props.children;
    if (context.form && props.id && props.options) {
      children = React.cloneElement(
        React.Children.only(children),
        { ...context.form.getFieldProps(props.id, props.options), id: props.id }
      );
    }
    return [
      this.renderLabel(),
      this.renderWrapper(
        this.renderValidateWrapper(
          children,
          this.renderHelp()
        )
      ),
    ];
  }

  // 判断是否要 `.ant-form-item-compact` 样式类
  _isCompact(children) {
    const compactControls = ['checkbox', 'radio', 'radio-group', 'static', 'file'];
    let isCompact = false;

    const childrenArray = Array.isArray(children) ? children : [children];
    childrenArray.map((child) => {
      const type = child.props && child.props.type;
      let prefixCls = child.props && child.props.prefixCls;
      prefixCls = prefixCls ? prefixCls.substring(prefixCls.indexOf('-') + 1) : '';

      if ((type && compactControls.indexOf(type) > -1) ||
          (prefixCls && compactControls.indexOf(prefixCls) > -1)) {
        isCompact = true;
      } else if (child.props && typeof child.props.children === 'object') {
        isCompact = this._isCompact(child.props.children);
      }
    });

    return isCompact;
  }

  renderFormItem(children) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-compact`]: this._isCompact(props.children),
      [`${prefixCls}-item-with-help`]: !!props.help,
      [`${props.className}`]: !!props.className,
    };

    return (
      <div className={classNames(itemClassName)}>
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
  labelCol: React.PropTypes.object,
  help: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
  validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
  hasFeedback: React.PropTypes.bool,
  wrapperCol: React.PropTypes.object,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  options: React.PropTypes.object,
  children: React.PropTypes.node,
};

FormItem.defaultProps = {
  hasFeedback: false,
  prefixCls: 'ant-form',
};

FormItem.contextTypes = {
  form: React.PropTypes.object,
};

module.exports = FormItem;
