import React from 'react';
import { Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'Short', value: 'a' },
  { label: 'Long label that may wrap in narrow container', value: 'b' },
  { label: 'Medium', value: 'c' },
];

const App: React.FC = () => (
  <div style={{ width: 280, border: '1px solid #eee', padding: 16 }}>
    <Radio.Group options={options} defaultValue="a" />
  </div>
);

export default App;
