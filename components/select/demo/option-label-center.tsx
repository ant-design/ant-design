import React from 'react';
import { AutoComplete, Cascader, Form, Select, Space, TreeSelect, Typography } from 'antd';

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
    <Select
      prefix="Hello World"
      mode="multiple"
      allowClear
      placeholder="Select"
      style={{ minWidth: 200, height: 200 }}
      defaultValue={['long']}
      options={options}
    />
    <Select
      mode="multiple"
      style={{ width: 200 }}
      placeholder="请选择"
      maxTagCount="responsive"
      prefix="城市"
      options={options}
    />
    <Select
      style={{ width: 200 }}
      placeholder="请选择"
      prefix="城市"
      options={options}
      showSearch
      allowClear
    />
    <Form style={{ width: 200 }} layout="vertical">
      <Form.Item
        label="Label"
        name="bamboo"
        initialValue="Bamboo"
        style={{
          boxShadow: '0 0 0 1px red',
        }}
      >
        <Select options={options} allowClear placeholder="bamboo" />
      </Form.Item>
      <Form.Item
        label="Label"
        name="bamboo"
        initialValue="Bamboo"
        style={{
          boxShadow: '0 0 0 1px red',
        }}
      >
        <AutoComplete options={options} allowClear placeholder="bamboo" />
      </Form.Item>
    </Form>
  </Space>
);

export default App;
