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
    const classString = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
      [className]: !!className,
    });
    return (
      <label className={classString} style={style}>
        <RcRadio {...this.props} style={null} children={null} />
        {children ? <span>{children}</span> : null}
      </label>
    );
  }
}
