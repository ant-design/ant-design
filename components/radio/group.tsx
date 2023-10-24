import * as React from 'react';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import pickAttrs from 'rc-util/lib/pickAttrs';

import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import { RadioGroupContextProvider } from './context';
import type { RadioChangeEvent, RadioGroupButtonStyle, RadioGroupProps } from './interface';
import Radio from './radio';
import useStyle from './style';

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const [value, setValue] = useMergedState(props.defaultValue, {
    value: props.value,
  });

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

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    options,
    buttonStyle = 'outline' as RadioGroupButtonStyle,
    disabled,
    children,
    size: customizeSize,
    style,
    id,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  } = props;
  const prefixCls = getPrefixCls('radio', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  let childrenToRender = children;
  // 如果存在 options, 优先使用
  if (options && options.length > 0) {
    childrenToRender = options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        // 此处类型自动推导为 string
        return (
          <Radio
            key={option.toString()}
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
          title={option.title}
          style={option.style}
          id={option.id}
        >
          {option.label}
        </Radio>
      );
    });
  }

  const mergedSize = useSize(customizeSize);

  const classString = classNames(
    groupPrefixCls,
    `${groupPrefixCls}-${buttonStyle}`,
    {
      [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );
  return wrapSSR(
    <div
      {...pickAttrs(props, { aria: true, data: true })}
      className={classString}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
      ref={ref}
    >
      <RadioGroupContextProvider
        value={{
          onChange: onRadioChange,
          value,
          disabled: props.disabled,
          name: props.name,
          optionType: props.optionType,
        }}
      >
        {childrenToRender}
      </RadioGroupContextProvider>
    </div>,
  );
});

export default React.memo(RadioGroup);
