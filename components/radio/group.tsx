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
    }
    this.state = {
      value,
      prevPropValue: props.value,
    };
  }

  onRadioChange = (ev: RadioChangeEvent) => {
    const { value: lastValue } = this.state;
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
    const {
      prefixCls: customizePrefixCls,
      className = '',
      options,
      buttonStyle,
      disabled,
      children,
      size: customizeSize,
      style,
      id,
      onMouseEnter,
      onMouseLeave,
    } = this.props;
    const { value } = this.state;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;
    let childrenToRender = children;
    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      childrenToRender = options.map(option => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option}
              prefixCls={prefixCls}
              disabled={disabled}
              value={option}
              checked={value === option}
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
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}
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
              style={style}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              id={id}
            >
              {childrenToRender}
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
