import React, { useState } from 'react';
import { AutoComplete, Space } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <AutoComplete options={options} onSearch={onSearch} status="error" style={{ width: 200 }} />
      <AutoComplete options={options} onSearch={onSearch} status="warning" style={{ width: 200 }} />
    </Space>
  );
};

export default App;
