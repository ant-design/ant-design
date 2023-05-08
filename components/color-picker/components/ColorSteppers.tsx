import classNames from 'classnames';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { InputNumberProps } from '../../input-number';
import InputNumber from '../../input-number';
import type { ColorPickerBaseProps } from '../interface';

interface ColorSteppersProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number | null) => void;
  className?: string;
  prefix?: (prefixCls: string) => React.ReactNode;
  formatter?: InputNumberProps<number>['formatter'];
}

const isNumber = (value: number | undefined) => typeof value === 'number' && !isNaN(value);

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
  const [stepValue, setStepValue] = useState(value);

  // Update step value
  useEffect(() => {
    if (isNumber(value)) {
      setStepValue(value);
    }
  }, [value]);

  return (
    <InputNumber
      className={classNames(colorSteppersPrefixCls, className)}
      min={min}
      max={max}
      value={stepValue}
      formatter={formatter}
      onChange={(step) => {
        if (!isNumber(value)) {
          setStepValue(step || 0);
        }
        onChange?.(step);
      }}
    />
  );
};

export default ColorSteppers;
