import * as React from 'react';
import classNames from 'classnames';
import { PresetColorTypes } from '../_util/colors';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  checked: boolean;
  color?: string;
  unCheckedColor?: string;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

export default class CheckableTag extends React.Component<CheckableTagProps> {
  handleClick = () => {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  };

  renderCheckableTag = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, checked, color, ...restProps } = this.props;
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}-checkable`]: true,
        [`${prefixCls}-checkable-checked`]: checked,
        [`${prefixCls}-has-color`]: !!color,
        [`${prefixCls}-${color}`]: color && this.isPresetColor(color) ? !!color : false,
      },
      className,
    );

    Reflect.deleteProperty(restProps, 'onChange');
    Reflect.deleteProperty(restProps, 'unCheckedColor');

    return (
      <div
        {...restProps as any}
        style={this.getTagStyle()}
        className={cls}
        onClick={this.handleClick}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCheckableTag}</ConfigConsumer>;
  }

  getTagStyle() {
    const { color, unCheckedColor, style, checked } = this.props;
    const isPresetColor = this.isPresetColor(color);
    return {
      backgroundColor: color && !isPresetColor ? (checked ? color : unCheckedColor) : undefined,
      ...style,
    };
  }

  isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color);
  }
}
