import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

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
    const [{ prefixCls = 'ant-tag', className = '', checked }, restProps ] = splitObject(
        this.props, ['prefixCls', 'className', 'checked']
      );
    const cls = classNames(prefixCls, {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked,
    }, className);

    delete restProps.onChange;
    return <div {...restProps} className={cls} onClick={this.handleClick} />;
  }
}
