import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import omit from 'object.omit';
import warning from 'warning';

export default class Form extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-form',
    onSubmit(e) {
      e.preventDefault();
    },
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    horizontal: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    children: React.PropTypes.any,
    onSubmit: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    warning(!props.form, 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  render() {
    const { prefixCls, className, inline, horizontal } = this.props;
    const formClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-horizontal`]: horizontal,
      [`${prefixCls}-inline`]: inline,
      [className]: !!className,
    });

    const formProps = omit(this.props, [
      'prefixCls',
      'className',
      'inline',
      'horizontal',
      'form',
    ]);

    return <form {...formProps} className={formClassName} />;
  }
}
