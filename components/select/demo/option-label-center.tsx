import React from 'react';
import { Select, Space, Cascader, Typography, TreeSelect } from 'antd';

const options = [
  { value: 'long', label: <Typography>long, long, long piece of text</Typography> },
  { value: 'short', label: <Typography>short</Typography> },
  { value: 'normal', label: <div>normal</div> },
];

const App: React.FC = () => (
  <Space wrap>
    <Select
      defaultValue="long, long, long piece of text"
      style={{ width: 120 }}
      allowClear
      options={options}
    />

    <Select
      placeholder="Select a option"
      style={{ width: 120, height: 60 }}
      allowClear
      options={options}
    />

    <Select
      defaultValue="normal"
      placeholder="Select a option"
      style={{ width: 120 }}
      allowClear
      options={options}
    />

    <Select
      defaultValue={['normal']}
      mode="multiple"
      placeholder="Select a option"
      style={{ width: 120 }}
      allowClear
      options={options}
    />

    <Select
      mode="multiple"
      placeholder="Select a option"
      style={{ width: 120, height: 60 }}
      allowClear
      options={options}
    />

    <Cascader
      placeholder="Select a option"
      style={{ width: 120, height: 60 }}
      allowClear
      options={options}
    />

    <TreeSelect
      showSearch
      style={{ width: 120, height: 60 }}
      placeholder="Please select"
      allowClear
      popupMatchSelectWidth={false}
      treeDefaultExpandAll
      treeData={[
        {
          value: 'parent 1',
          title: 'parent 1',
          children: options,
        },
      ]}
    />
  </Space>
);

export default App;
