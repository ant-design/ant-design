import * as React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import { RadioGroupProps, RadioChangeEvent, RadioGroupButtonStyle } from './interface';
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
    const Component = component;
    const groupPrefixCls = `${prefixCls}-group`;
    let childrenToRender = children;
    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      childrenToRender = options.map(option => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Component
              key={option}
              prefixCls={prefixCls}
              disabled={disabled}
              value={option}
              checked={value === option}
            >
              {option}
            </Component>
          );
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Component
            key={`radio-group-value-options-${option.value}`}
            prefixCls={prefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}
            style={option.style}
          >
            {option.label}
          </Component>
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
  component: Radio,
};

export default React.memo(RadioGroup);
