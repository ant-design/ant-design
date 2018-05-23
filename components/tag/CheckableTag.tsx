import * as React from 'react';
import classNames from 'classnames';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onTag?: React.DOMAttributes<HTMLDivElement>;
}

export default class CheckableTag extends React.Component<CheckableTagProps> {
  handleClick = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  }
  render() {
    const { prefixCls = 'ant-tag', className, checked, onTag, onChange: _onChange, ...divProps } = this.props;
    const cls = classNames(prefixCls, {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked,
    }, className);

    return <div {...divProps} {...onTag} className={cls} onClick={this.handleClick} />;
  }
}
