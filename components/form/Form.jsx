import React from 'react';
import classNames from 'classnames';

class Form extends React.Component {
  getChildContext() {
    return {
      form: this.props.form,
    };
  }

  render() {
    const { prefixCls, className } = this.props;
    const formClassName = classNames({
      [className]: !!className,
      [`${prefixCls}-horizontal`]: this.props.horizontal,
      [`${prefixCls}-inline`]: this.props.inline,
    });

    return (
      <form {...this.props} className={formClassName}>
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
  prefixCls: React.PropTypes.string,
  horizontal: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  form: React.PropTypes.object,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
};

Form.defaultProps = {
  prefixCls: 'ant-form',
};

Form.childContextTypes = {
  form: React.PropTypes.object,
};

module.exports = Form;
