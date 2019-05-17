import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export default class CheckableTag extends React.Component<CheckableTagProps> {
  handleClick = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  };
  renderCheckableTag = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, checked, ...restProps } = this.props;
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}-checkable`]: true,
        [`${prefixCls}-checkable-checked`]: checked,
      },
      className,
    );

    delete (restProps as any).onChange; // TypeScript cannot check delete now.
    return <div {...restProps as any} className={cls} onClick={this.handleClick} />;
  };

  render() {
    return <ConfigConsumer>{this.renderCheckableTag}</ConfigConsumer>;
  }
}
