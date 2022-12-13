import React from 'react';
import { Select } from 'antd';

const App = () => (
  <Select
    value={20}
    options={Array(21)
      .fill(0)
      .map((_, item) => ({
        label: `${item}`,
        value: item,
      }))}
  />
);

export default App;
