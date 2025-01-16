import React, { useState } from 'react';
import {
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      options={[
        { value: 1, label: <LineChartOutlined style={{ fontSize: 18 }} /> },
        { value: 2, label: <DotChartOutlined style={{ fontSize: 18 }} /> },
        { value: 3, label: <BarChartOutlined style={{ fontSize: 18 }} /> },
        { value: 4, label: <PieChartOutlined style={{ fontSize: 18 }} /> },
      ]}
    />
  );
};

export default App;
