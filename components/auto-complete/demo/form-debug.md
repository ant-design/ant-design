---
order: 999
title:
  zh-CN: 在 Form 中 Debug
  en-US: Debug in Form
debug: true
---

```tsx
import { Input, AutoComplete, Form, TreeSelect, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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

ReactDOM.render(
  <Form style={{ margin: '0 auto' }}>
    <Form.Item label="单独 AutoComplete" {...formItemLayout}>
      <AutoComplete />
    </Form.Item>
    <Form.Item label="单独 TreeSelect" {...formItemLayout}>
      <TreeSelect />
    </Form.Item>
    <Form.Item label="添加 Input.Group 正常" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} />
        <AutoComplete />
      </Input.Group>
    </Form.Item>
    <Form.Item label="包含 search 图标正常" {...formItemLayout}>
      <AutoComplete>
        <Input suffix={<SearchOutlined />} />
      </AutoComplete>
    </Form.Item>
    <Form.Item label="同时有 Input.Group 和图标发生移位" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} />
        <AutoComplete>
          <Input suffix={<SearchOutlined />} />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="同时有 Input.Group 和 Search 组件发生移位" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} />
        <AutoComplete>
          <Input.Search />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="Input Group 和 Button 结合" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '20%' }} />
        <AutoComplete>
          <Input.Search />
        </AutoComplete>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Input.Group>
    </Form.Item>
  </Form>,
  mountNode,
);
```
