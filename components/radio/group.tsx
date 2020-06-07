import * as React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import {
  RadioGroupProps,
  RadioChangeEvent,
  RadioGroupComponent,
  RadioGroupButtonStyle,
} from './interface';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import { RadioGroupContextProvider } from './context';

const RadioGroup: React.FC<RadioGroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  let initValue;
  if (props.value !== undefined) {
    initValue = props.value;
  } else if (props.defaultValue !== undefined) {
    initValue = props.defaultValue;
  }
  const [value, setValue] = React.useState(initValue);
  const [prevPropValue, setPrevPropValue] = React.useState(props.value);

  React.useEffect(() => {
    setPrevPropValue(props.value);
    if (props.value !== undefined || prevPropValue !== props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }
    const { onChange } = props;
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };

  const renderGroup = () => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      options,
      component,
      buttonStyle,
      disabled,
      children,
      size: customizeSize,
      style,
      id,
      onMouseEnter,
      onMouseLeave,
    } = props;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const optionsPrefixCls = component === 'button' ? `${prefixCls}-button` : prefixCls;
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
              prefixCls={optionsPrefixCls}
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
            prefixCls={optionsPrefixCls}
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
  };

  return (
    <RadioGroupContextProvider
      value={{
        onChange: onRadioChange,
        value,
        disabled: props.disabled,
        name: props.name,
      }}
    >
      {renderGroup()}
    </RadioGroupContextProvider>
  );
};

RadioGroup.defaultProps = {
  buttonStyle: 'outline' as RadioGroupButtonStyle,
  component: 'default' as RadioGroupComponent,
};

export default React.memo(RadioGroup);
