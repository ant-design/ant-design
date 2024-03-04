import React from 'react';
import { Select } from 'antd';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Select
    defaultValue="lucy"
    style={{ width: 200 }}
    onChange={handleChange}
    options={[
      {
        label: <span>manager</span>,
        title: 'manager',
        options: [
          { label: <span>Jack</span>, value: 'Jack' },
          { label: <span>Lucy</span>, value: 'Lucy' },
        ],
      },
      {
        label: <span>engineer</span>,
        title: 'engineer',
        options: [
          { label: <span>Chloe</span>, value: 'Chloe' },
          { label: <span>Lucas</span>, value: 'Lucas' },
        ],
      },
    ]}
  />
);

export default App;
