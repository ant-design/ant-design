import React from 'react';
import { InputNumber, Slider, Space } from 'antd';

export interface RadiusPickerProps {
  id?: string;
  value?: number;
  onChange?: (value: number | null) => void;
}

export default function RadiusPicker({ value, onChange, id }: RadiusPickerProps) {
  return (
    <Space size="large">
      <InputNumber
        value={value}
        onChange={onChange}
        style={{ width: 120 }}
        min={0}
        formatter={(val) => `${val}px`}
        parser={(str) => (str ? parseFloat(str) : (str as any))}
        id={id}
      />

      <Slider
        tooltip={{ open: false }}
        style={{ width: 128 }}
        min={0}
        value={value}
        max={20}
        onChange={onChange}
      />
    </Space>
  );
}
