import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input, TreeSelect } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const App: React.FC = () => (
  <Form style={{ margin: '0 auto' }} {...formItemLayout}>
    <Form.Item label="单独 AutoComplete">
      <AutoComplete aria-label="Autocomplete input" />
    </Form.Item>
    <Form.Item label="单独 TreeSelect">
      <TreeSelect aria-label="Tree select input" />
    </Form.Item>
    <Form.Item label="添加 Input.Group 正常">
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} aria-label="Tree select in group" />
        <AutoComplete aria-label="Autocomplete input" />
      </Input.Group>
    </Form.Item>
    <Form.Item label="包含 search 图标正常">
      <AutoComplete>
        <Input suffix={<SearchOutlined />} aria-label="Search input with icon" />
      </AutoComplete>
    </Form.Item>
    <Form.Item label="同时有 Input.Group 和图标发生移位">
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} aria-label="Tree select with icon" />
        <AutoComplete>
          <Input suffix={<SearchOutlined />} aria-label="Search input with icon in group" />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="同时有 Input.Group 和 Search 组件发生移位">
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} aria-label="Tree select with search" />
        <AutoComplete>
          <Input.Search aria-label="Search input in group" />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="Input Group 和 Button 结合">
      <Input.Group compact>
        <TreeSelect style={{ width: '20%' }} aria-label="Tree select with button" />
        <AutoComplete>
          <Input.Search aria-label="Search input with button" />
        </AutoComplete>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Input.Group>
    </Form.Item>
  </Form>
);

export default App;
