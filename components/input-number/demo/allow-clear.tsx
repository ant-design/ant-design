import React, { useState } from 'react';
import { InputNumber } from 'antd';

const Demo: React.FC = () => {
  const [value1, setValue1] = useState<number | null>(100);
  const [value2, setValue2] = useState<number | null>(null);
  const [value3, setValue3] = useState<number | null>(42);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputNumber
        placeholder="Basic usage"
        allowClear
        value={value1}
        onChange={setValue1}
        style={{ width: 200 }}
      />

      <InputNumber
        placeholder="Initially empty"
        allowClear
        value={value2}
        onChange={setValue2}
        style={{ width: 200 }}
      />

      <InputNumber
        placeholder="With custom clear icon"
        allowClear={{ clearIcon: '🧹' }}
        value={value3}
        onChange={setValue3}
        style={{ width: 200 }}
      />

      <InputNumber
        placeholder="Disabled clear"
        allowClear
        disabled
        defaultValue={50}
        style={{ width: 200 }}
      />

      <InputNumber
        placeholder="Readonly with clear"
        allowClear
        readOnly
        defaultValue={75}
        style={{ width: 200 }}
      />

      <InputNumber
        placeholder="Zero value (no clear button)"
        allowClear
        defaultValue={0}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default Demo;
