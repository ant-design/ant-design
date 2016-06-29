import RcRadio from 'rc-radio';
import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Radio extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-radio',
  }
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const { prefixCls, children, checked, disabled, className, style } = this.props;
    const wrapperClassString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: checked,
      [`${prefixCls}-wrapper-disabled`]: disabled,
      [className]: !!className,
    });
    const classString = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    });
    return (
      <label className={wrapperClassString} style={style}>
        <RcRadio {...this.props} className={classString} style={null} children={null} />
        {children ? <span>{children}</span> : null}
      </label>
    );
  }
}
