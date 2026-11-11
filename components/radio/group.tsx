import * as React from 'react';
import { pickAttrs, useControlledState, useId } from '@rc-component/util';
import { clsx } from 'clsx';

import { useOrientation } from '../_util/hooks';
import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import { isNumber } from '../_util/is';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
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
  RadioGroupSemanticAllType,
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
    classNames,
    styles,
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
    role = 'radiogroup',
  } = props;

  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;

  const [value, setValue] = useControlledState(defaultValue, customizedValue);

  const onRadioChange = React.useCallback(
    (event: RadioChangeEvent) => {
      const lastValue = value;
      const val = event.target.value;
      setValue(val);
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
      if (typeof option === 'string' || isNumber(option)) {
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
          onChange={option.onChange}
        >
          {option.label}
        </Radio>
      );
    });
  }

  const mergedSize = useSize(customizeSize);
  const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical);

  const mergedProps: RadioGroupProps = {
    ...props,
    value,
    disabled: mergedDisabled,
    size: mergedSize,
    buttonStyle,
    block,
    name,
    optionType: optionType ?? 'default',
    orientation: mergedOrientation,
    vertical: mergedVertical,
  };

  const styleRoot = useSemanticRootStyle(style);
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    RadioGroupSemanticAllType['classNames'],
    RadioGroupSemanticAllType['styles'],
    RadioGroupProps
  >([classNames], [styles, styleRoot], {
    props: mergedProps,
  });

  const classString = clsx(
    groupPrefixCls,
    `${groupPrefixCls}-${buttonStyle}`,
    {
      [`${groupPrefixCls}-large`]: mergedSize === 'large',
      [`${groupPrefixCls}-small`]: mergedSize === 'small',
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      [`${groupPrefixCls}-block`]: block,
    },
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
    rootCls,
  );

  const memoizedValue = React.useMemo<RadioGroupContextProps>(
    () => ({
      onChange: onRadioChange,
      value,
      disabled,
      name,
      optionType,
      block,
      classNames: {
        root: mergedClassNames.item,
        icon: mergedClassNames.itemIcon,
        label: mergedClassNames.itemLabel,
      },
      styles: {
        root: mergedStyles.item,
        icon: mergedStyles.itemIcon,
        label: mergedStyles.itemLabel,
      },
    }),
    [onRadioChange, value, disabled, name, optionType, block, mergedClassNames, mergedStyles],
  );

  return (
    <div
      {...pickAttrs(props, { aria: true, data: true })}
      role={role}
      className={clsx(classString, { [`${prefixCls}-group-vertical`]: mergedVertical })}
      style={mergedStyles.root}
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
