import type { FC } from 'react';
import React, { useState } from 'react';
import { clsx } from 'clsx';

import type { InputNumberProps } from '../../input-number';
import InputNumber from '../../input-number';

interface ColorSteppersProps {
  prefixCls: string;
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number | null) => void;
  className?: string;
  prefix?: (prefixCls: string) => React.ReactNode;
  formatter?: InputNumberProps<number>['formatter'];
}

const ColorSteppers: FC<ColorSteppersProps> = ({
  prefixCls,
  min = 0,
  max = 100,
  value,
  disabled,
  onChange,
  className,
  formatter,
}) => {
  const colorSteppersPrefixCls = `${prefixCls}-steppers`;
  const [internalValue, setInternalValue] = useState<number | undefined>(0);

  const stepValue = !Number.isNaN(value) ? value : internalValue;

  return (
    <InputNumber
      className={clsx(colorSteppersPrefixCls, className)}
      min={min}
      max={max}
      value={stepValue}
      formatter={formatter}
      disabled={disabled}
      size="small"
      onChange={(step) => {
        if (disabled) {
          return;
        }

        setInternalValue(step || 0);
        onChange?.(step);
      }}
    />
  );
};

export default ColorSteppers;
