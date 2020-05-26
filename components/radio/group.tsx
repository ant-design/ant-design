import * as React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import { RadioGroupProps, RadioChangeEvent, RadioGroupButtonStyle } from './interface';
import { ConfigContext } from '../config-provider';
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

const RadioGroup: React.FC<RadioGroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  let initValue;
  if (props.value !== undefined) {
    initValue = props.value;
  } else if (props.defaultValue !== undefined) {
    initValue = props.defaultValue;
  } else {
    const checkedValue = getCheckedValue(props.children);
    initValue = checkedValue && checkedValue.value;
  }
  const [value, setValue] = React.useState(initValue);
  const [prevPropValue, setPrevPropValue] = React.useState(props.value);

  React.useEffect(() => {
    if (props.value !== undefined || prevPropValue !== props.value) {
      setValue(props.value);
      setPrevPropValue(props.value);
    } else {
      const checkedValue = getCheckedValue(props.children);
      if (checkedValue) {
        setValue(checkedValue.value);
      }
    }
  }, [props.value, props.children]);

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const val = ev.target;
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
              disabled={props.disabled}
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
            disabled={option.disabled || props.disabled}
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
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        id={props.id}
      >
        {children}
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
};

export default React.memo(RadioGroup);
