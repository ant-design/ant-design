import * as React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import {
  RadioGroupProps,
  RadioGroupState,
  RadioChangeEvent,
  RadioGroupButtonStyle,
} from './interface';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import { RadioGroupContextProvider } from './context';

function getCheckedValue(children: React.ReactNode) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio: any) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}

class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  static defaultProps = {
    buttonStyle: 'outline' as RadioGroupButtonStyle,
  };

  static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState) {
    const newState: Partial<RadioGroupState> = {
      prevPropValue: nextProps.value,
    };

    if (nextProps.value !== undefined || prevState.prevPropValue !== nextProps.value) {
      newState.value = nextProps.value;
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        newState.value = checkedValue.value;
      }
    }

    return newState;
  }

  constructor(props: RadioGroupProps) {
    super(props);
    let value;
    if (props.value !== undefined) {
      value = props.value;
    } else if (props.defaultValue !== undefined) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      value,
      prevPropValue: props.value,
    };
  }

  onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = this.state.value;
    const { value } = ev.target;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    const { onChange } = this.props;
    if (onChange && value !== lastValue) {
      onChange(ev);
    }
  };

  renderGroup = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { props } = this;
    const {
      prefixCls: customizePrefixCls,
      className = '',
      options,
      buttonStyle,
      size: customizeSize,
    } = props;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;
    let { children } = props;

    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      children = options.map(option => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option}
              prefixCls={prefixCls}
              disabled={this.props.disabled}
              value={option}
              checked={this.state.value === option}
            >
              {option}
            </Radio>
          );
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            prefixCls={prefixCls}
            disabled={option.disabled || this.props.disabled}
            value={option.value}
            checked={this.state.value === option.value}
            style={option.style}
          >
            {option.label}
          </Radio>
        );
      });
    }

    return (
      <SizeContext.Consumer>
        {size => {
          const mergedSize = customizeSize || size;
          const classString = classNames(
            groupPrefixCls,
            `${groupPrefixCls}-${buttonStyle}`,
            {
              [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
              [`${groupPrefixCls}-rtl`]: direction === 'rtl',
            },
            className,
          );

          return (
            <div
              className={classString}
              style={props.style}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              id={props.id}
            >
              {children}
            </div>
          );
        }}
      </SizeContext.Consumer>
    );
  };

  render() {
    return (
      <RadioGroupContextProvider
        value={{
          onChange: this.onRadioChange,
          value: this.state.value,
          disabled: this.props.disabled,
          name: this.props.name,
        }}
      >
        <ConfigConsumer>{this.renderGroup}</ConfigConsumer>
      </RadioGroupContextProvider>
    );
  }
}

export default RadioGroup;
