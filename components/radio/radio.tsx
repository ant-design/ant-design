import * as React from 'react';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import RadioGroup from './group';
import RadioButton from './radioButton';
import { RadioProps, RadioChangeEvent } from './interface';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import RadioGroupContext from './context';

export default class Radio extends React.PureComponent<RadioProps, {}> {
  static Group: typeof RadioGroup;

  static Button: typeof RadioButton;

  static defaultProps = {
    type: 'radio',
  };

  static contextType = RadioGroupContext;

  private rcCheckbox: any;

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
  };

  onChange = (e: RadioChangeEvent) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    if (this.context?.onChange) {
      this.context.onChange(e);
    }
  };

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  renderRadio = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { props, context } = this;
    const { prefixCls: customizePrefixCls, className, children, style, ...restProps } = props;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const radioProps: RadioProps = { ...restProps };
    if (context) {
      radioProps.name = context.name;
      radioProps.onChange = this.onChange;
      radioProps.checked = props.value === context.value;
      radioProps.disabled = props.disabled || context.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    });

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcCheckbox {...radioProps} prefixCls={prefixCls} ref={this.saveCheckbox} />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderRadio}</ConfigConsumer>;
  }
}
