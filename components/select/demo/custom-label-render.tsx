import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

type LabelRender = SelectProps['labelRender'];

const options = [
  { label: 'gold', value: 'gold' },
  { label: 'lime', value: 'lime' },
  { label: 'green', value: 'green' },
  { label: 'cyan', value: 'cyan' },
];

const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>当前 value 没有对应的选项</span>;
};

const App: React.FC = () => (
  <Select labelRender={labelRender} defaultValue="1" style={{ width: '100%' }} options={options} />
);

export default App;
