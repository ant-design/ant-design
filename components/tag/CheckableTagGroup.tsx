import React, { ReactNode, useMemo, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import CheckableTag from './CheckableTag';
import useStyle from './style';

export type CheckableTagOption<CheckableTagValue> = {
  value: CheckableTagValue;
  label: ReactNode;
};

interface CheckableTagGroupSingleProps<CheckableTagValue> {
  multiple?: false;
  value?: CheckableTagValue | null;
  defaultValue?: CheckableTagValue | null;
  onChange?: (value: CheckableTagValue | null) => void;
}

interface CheckableTagGroupMultipleProps<CheckableTagValue> {
  multiple: true;
  value?: CheckableTagValue[];
  defaultValue?: CheckableTagValue[];
  onChange?: (value: CheckableTagValue[]) => void;
}

export type CheckableTagGroupProps<CheckableTagValue> = {
  options?: (CheckableTagOption<CheckableTagValue> | CheckableTagValue)[];
  prefixCls?: string;
  disabled?: boolean;
} & (
  | CheckableTagGroupSingleProps<CheckableTagValue>
  | CheckableTagGroupMultipleProps<CheckableTagValue>
) &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'>;

export default function CheckableTagGroup<CheckableTagValue extends string | number>(
  props: CheckableTagGroupProps<CheckableTagValue>,
) {
  const {
    className,
    disabled,
    options,
    value,
    defaultValue,
    onChange,
    multiple,
    prefixCls: customizePrefixCls,
    ...rest
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-checkable-group`;

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const parsedOptions = useMemo(
    () =>
      options?.map((option) => ({
        value: typeof option === 'object' ? option.value : option,
        label: typeof option === 'object' ? option.label : option,
      })) || [],
    [options],
  );

  const [internalValue, setInternalValue] = useState(defaultValue);
  const mergedValue = value ?? internalValue;

  const handleChange = (checked: boolean, option: CheckableTagOption<CheckableTagValue>) => {
    if (multiple) {
      const newValue = checked
        ? [...(value || []), option.value]
        : (value || [])?.filter((item) => item !== option.value);
      setInternalValue(newValue);
      onChange?.(newValue);
    } else {
      const newValue = checked ? option.value : null;
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div
      {...rest}
      className={classNames(
        groupPrefixCls,
        { [`${groupPrefixCls}-disabled`]: disabled },
        hashId,
        cssVarCls,
        className,
      )}
    >
      {parsedOptions.map((option) => (
        <CheckableTag
          key={option.value}
          className={`${groupPrefixCls}-item`}
          checked={
            multiple
              ? ((mergedValue as CheckableTagValue[]) || []).includes(option.value)
              : mergedValue === option.value
          }
          onChange={(checked) => handleChange(checked, option)}
          disabled={disabled}
        >
          {option.label}
        </CheckableTag>
      ))}
    </div>
  );
}
