import { InputNumber, Space, Slider } from 'antd';
import React from 'react';

export interface RadiusPickerProps {
  value?: number;
  onChange?: (value: number | null) => void;
}

export default function RadiusPicker({ value, onChange }: RadiusPickerProps) {
  return (
    <Space size="large">
      <InputNumber
        value={value}
        onChange={onChange}
        style={{ width: 120 }}
        min={0}
        formatter={(val) => `${val}px`}
        parser={(str) => (str ? parseFloat(str) : (str as any))}
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
