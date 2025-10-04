import * as React from 'react';
import { useControlledState } from '@rc-component/util';
import useId from '@rc-component/util/lib/hooks/useId';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import useOrientation from '../_util/hooks/useOrientation';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext } from '../form/context';
import { toNamePathStr } from '../form/hooks/useForm';
import { RadioGroupContextProvider } from './context';
import type {
  RadioChangeEvent,
  RadioGroupButtonStyle,
  RadioGroupContextProps,
  RadioGroupProps,
} from './interface';
import Radio from './radio';
import useStyle from './style';

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { name: formItemName } = React.useContext(FormItemInputContext);

  const defaultName = useId(toNamePathStr(formItemName));

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
    optionType,
    name = defaultName,
    defaultValue,
    value: customizedValue,
    block = false,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    orientation,
    vertical,
  } = props;

  const [value, setValue] = useControlledState(defaultValue, customizedValue);

  const onRadioChange = React.useCallback(
    (event: RadioChangeEvent) => {
      const lastValue = value;
      const val = event.target.value;
      if (!('value' in props)) {
        setValue(val);
      }
      if (val !== lastValue) {
        onChange?.(event);
      }
    },
    [value, setValue, onChange],
  );

  const prefixCls = getPrefixCls('radio', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

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
          className={option.className} // 👈 5.25.0+
          id={option.id}
          required={option.required}
        >
          {option.label}
        </Radio>
      );
    });
  }

  const mergedSize = useSize(customizeSize);
  const [, mergedVertical] = useOrientation(orientation, vertical);
  const classString = clsx(
    groupPrefixCls,
    `${groupPrefixCls}-${buttonStyle}`,
    {
      [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      [`${groupPrefixCls}-block`]: block,
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
    rootCls,
  );

  const memoizedValue = React.useMemo<RadioGroupContextProps>(
    () => ({ onChange: onRadioChange, value, disabled, name, optionType, block }),
    [onRadioChange, value, disabled, name, optionType, block],
  );

  return (
    <div
      {...pickAttrs(props, { aria: true, data: true })}
      className={clsx(classString, { [`${prefixCls}-group-vertical`]: mergedVertical })}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
      ref={ref}
    >
      <RadioGroupContextProvider value={memoizedValue}>
        {childrenToRender}
      </RadioGroupContextProvider>
    </div>
  );
});

export default React.memo(RadioGroup);
