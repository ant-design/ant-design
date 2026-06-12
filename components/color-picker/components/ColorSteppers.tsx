import type { FC } from 'react';
import React, { useState } from 'react';
import { clsx } from 'clsx';

import type { InputNumberProps } from '../../input-number';
import InputNumber from '../../input-number';

interface ColorSteppersProps extends InputNumberProps<number> {
  prefixCls: string;
}

const ColorSteppers: FC<ColorSteppersProps> = ({
  prefixCls,
  className,
  value,
  onChange,
  ...props
}) => {
  const colorSteppersPrefixCls = `${prefixCls}-steppers`;
  const [internalValue, setInternalValue] = useState<number | undefined>(0);

  const stepValue = !Number.isNaN(value) ? value : internalValue;

  return (
    <InputNumber
      {...props}
      className={clsx(colorSteppersPrefixCls, className)}
      value={stepValue}
      size="small"
      onChange={(step) => {
        setInternalValue(step || 0);
        onChange?.(step);
      }}
    />
  );
};

export default ColorSteppers;
