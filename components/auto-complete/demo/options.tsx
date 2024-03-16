import React from 'react';
import { AutoComplete } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';

const App: React.FC = () => {
  const [options, setOptions] = React.useState<DefaultOptionType[]>([]);
  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return ['gmail.com', '163.com', 'qq.com'].map<DefaultOptionType>((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };
  return (
    <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      options={options}
    />
  );
};

export default App;
