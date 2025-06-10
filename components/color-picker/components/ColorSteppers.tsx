import type { FC } from 'react';
import React, { useState } from 'react';
import classNames from 'classnames';

import type { InputNumberProps } from '../../input-number';
import InputNumber from '../../input-number';

interface ColorSteppersProps {
  prefixCls: string;
  value?: number;
  min?: number;
  max?: number;
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
  onChange,
  className,
  formatter,
}) => {
  const colorSteppersPrefixCls = `${prefixCls}-steppers`;
  const [internalValue, setInternalValue] = useState<number | undefined>(0);

  const stepValue = !Number.isNaN(value) ? value : internalValue;

  return (
    <InputNumber
      className={classNames(colorSteppersPrefixCls, className)}
      min={min}
      max={max}
      value={stepValue}
      formatter={formatter}
      size="small"
      onChange={(step) => {
        setInternalValue(step || 0);
        onChange?.(step);
      }}
    />
  );
};

export default ColorSteppers;
