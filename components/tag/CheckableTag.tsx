import React from 'react';
import classNames from 'classnames';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked: boolean;
  onChange?: (checked: Boolean) => void;
}

export default class CheckableTag extends React.Component<CheckableTagProps, any> {
  handleClick = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  }
  render() {
    const { prefixCls = 'ant-tag', className, checked, ...restProps } = this.props;
    const cls = classNames(prefixCls, {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked,
    }, className);

    delete restProps.onChange; // TypeScript cannot check delete now.
    return <div {...restProps as any} className={cls} onClick={this.handleClick} />;
  }
}
