import React from 'react';
import classNames from 'classnames';

function prefixClsFn(prefixCls, ...args) {
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

class FormItem extends React.Component {
  _getLayoutClass(colDef) {
    if (!colDef) {
      return '';
    }
    const {span, offset} = colDef;
    const col = span ? 'col-' + span : '';
    const offsetCol = offset ? ' col-offset-' + offset : '';
    return col + offsetCol;
  }

  renderHelp() {
    const prefixCls = this.props.prefixCls;
    return (
      <div className={this.props.help ? prefixClsFn(prefixCls, 'explain') : ''} key="help">
        {this.props.help}
      </div>
    );
  }

  renderValidateWrapper(c1, c2) {
    let classes = '';
    if (this.props.validateStatus) {
      classes = classNames(
        {
          'has-feedback': this.props.hasFeedback,
          'has-success': this.props.validateStatus === 'success',
          'has-warning': this.props.validateStatus === 'warning',
          'has-error': this.props.validateStatus === 'error',
          'is-validating': this.props.validateStatus === 'validating',
        }
      );
    }
    return (
      <div className={classes}>
        {c1} {c2}
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

  renderLabel() {
    const labelCol = this.props.labelCol;
    const required = this.props.required ? 'required' : '';

    return this.props.label ? (
      <label htmlFor={this.props.id} className={this._getLayoutClass(labelCol)} required={required} key="label">
        {this.props.label}
      </label>
    ) : null;
  }

  renderChildren() {
    return [
      this.renderLabel(),
      this.renderWrapper(
        this.renderValidateWrapper(
          this.props.children,
          this.renderHelp()
        )
      ),
    ];
  }

  // 判断是否要 `.ant-form-item-compact` 样式类
  _isCompact(children) {
    const compactControls = ['checkbox', 'radio', 'radio-group', 'static', 'file'];
    let isCompact = false;

    if (!Array.isArray(children)) {
      children = [children];
    }
    children.map((child) => {
      const type = child.props && child.props.type;
      let prefixCls = child.props && child.props.prefixCls;
      prefixCls = prefixCls ? prefixCls.substring(prefixCls.indexOf('-') + 1) : '';

      if ((type && compactControls.indexOf(type) > -1) || (prefixCls && compactControls.indexOf(prefixCls) > -1)) {
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
  help: React.PropTypes.node,
  validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
  hasFeedback: React.PropTypes.bool,
  wrapperCol: React.PropTypes.object,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

FormItem.defaultProps = {
  hasFeedback: false,
  required: false,
  prefixCls: 'ant-form',
};

module.exports = FormItem;
