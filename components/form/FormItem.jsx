import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Row from '../row';
import Col from '../col';
import { FIELD_META_PROP } from './constants';

export default class FormItem extends React.Component {
  static defaultProps = {
    hasFeedback: false,
    prefixCls: 'ant-form',
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    label: React.PropTypes.node,
    labelCol: React.PropTypes.object,
    help: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
    validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: React.PropTypes.bool,
    wrapperCol: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    children: React.PropTypes.node,
  }

  static contextTypes = {
    form: React.PropTypes.object,
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getHelpMsg() {
    const context = this.context;
    const props = this.props;
    if (props.help === undefined && context.form) {
      return this.getId() ? (context.form.getFieldError(this.getId()) || []).join(', ') : '';
    }

    return props.help;
  }

  getOnlyControl() {
    const children = React.Children.toArray(this.props.children);
    const child = children.filter((c) => {
      return c.props && FIELD_META_PROP in c.props;
    })[0];
    return child !== undefined ? child : null;
  }

  getChildProp(prop) {
    const child = this.getOnlyControl();
    return child && child.props && child.props[prop];
  }

  getId() {
    return this.getChildProp('id');
  }

  getMeta() {
    return this.getChildProp(FIELD_META_PROP);
  }

  renderHelp() {
    const prefixCls = this.props.prefixCls;
    const help = this.getHelpMsg();
    return help ? (
      <div className={`${prefixCls}-explain`} key="help">
        {help}
      </div>
    ) : null;
  }

  renderExtra() {
    const { prefixCls, extra } = this.props;
    return extra ? (
      <span className={`${prefixCls}-extra`}>{extra}</span>
    ) : null;
  }

  getValidateStatus() {
    const { isFieldValidating, getFieldError, getFieldValue } = this.context.form;
    const field = this.getId();
    if (!field) {
      return '';
    }
    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field) !== undefined) {
      return 'success';
    }
    return '';
  }

  renderValidateWrapper(c1, c2, c3) {
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
      <div className={`${this.props.prefixCls}-item-control ${classes}`}>
        {c1}{c2}{c3}
      </div>
    );
  }

  renderWrapper(children) {
    const wrapperCol = this.props.wrapperCol;
    return (
      <Col {...wrapperCol} key="wrapper">
        {children}
      </Col>
    );
  }

  isRequired() {
    if (this.context.form) {
      const meta = this.getMeta() || {};
      const validate = (meta.validate || []);

      return validate.filter((item) => !!item.rules).some((item) => {
        return item.rules.some((rule) => rule.required);
      });
    }
    return false;
  }

  renderLabel() {
    const props = this.props;
    const labelCol = props.labelCol;
    const required = props.required === undefined ?
      this.isRequired() :
      props.required;

    const className = classNames({
      [`${props.prefixCls}-item-required`]: required,
    });

    // remove user input colon
    let label = props.label;
    if (typeof label === 'string' && label.trim() !== '') {
      label = props.label.replace(/[：|:]\s*$/, '');
    }

    return props.label ? (
      <Col {...labelCol} key="label" className={`${props.prefixCls}-item-label`}>
        <label htmlFor={props.id || this.getId()} className={className}>
          {label}
        </label>
      </Col>
    ) : null;
  }

  renderChildren() {
    const props = this.props;
    const children = React.Children.map(props.children, (child) => {
      if (child && typeof child.type === 'function' && !child.props.size) {
        return React.cloneElement(child, { size: 'large' });
      }
      return child;
    });
    return [
      this.renderLabel(),
      this.renderWrapper(
        this.renderValidateWrapper(
          children,
          this.renderHelp(),
          this.renderExtra()
        )
      ),
    ];
  }

  renderFormItem(children) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const style = props.style;
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: !!this.getHelpMsg(),
      [`${props.className}`]: !!props.className,
    };

    return (
      <Row className={classNames(itemClassName)} style={style}>
        {children}
      </Row>
    );
  }

  render() {
    const children = this.renderChildren();
    return this.renderFormItem(children);
  }
}
