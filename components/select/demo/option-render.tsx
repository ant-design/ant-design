import React from 'react';
import { Radio, Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [
  {
    label: 'Beijing',
    value: 1,
  },
  {
    label: 'Shanghai',
    value: 2,
  },
  {
    label: 'Guangzhou',
    value: 3,
  },
  {
    label: 'Hangzhou',
    value: 4,
  },
];

const App: React.FC = () => {
  const [value, setValue] = React.useState<number>();
  return (
    <Select
      style={{ width: '100%' }}
      options={options}
      placeholder="Please select"
      value={value}
      onChange={setValue}
      optionRender={(oriOption) => (
        <Space>
          <Radio checked={value === oriOption.value} />
          <span>{oriOption.label}</span>
        </Space>
      )}
    />
  );
};

export default App;
