import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import { clsx } from 'clsx';

import type { InputNumberProps } from '../../input-number';
import InputNumber from '../../input-number';
import { PanelPickerContext } from '../context';

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
  const { controls } = useContext(PanelPickerContext);

  const colorSteppersPrefixCls = `${prefixCls}-steppers`;
  const [internalValue, setInternalValue] = useState<number | undefined>(0);

  const stepValue = !Number.isNaN(value) ? value : internalValue;

  return (
    <InputNumber
      className={clsx(colorSteppersPrefixCls, className)}
      controls={controls}
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
