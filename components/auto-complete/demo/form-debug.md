---
order: 999
title:
  zh-CN: 在 Form 中 Debug
  en-US: Debug in Form
debug: true
---

```jsx
import { Input, AutoComplete, Form, TreeSelect } from 'antd';
import { Search } from '@ant-design/icons';

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
    <Form.Item label="添加Input.Group正常" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} />
        <AutoComplete />
      </Input.Group>
    </Form.Item>
    <Form.Item label="包含search图标正常" {...formItemLayout}>
      <AutoComplete>
        <Input suffix={<Search />} />
      </AutoComplete>
    </Form.Item>
    <Form.Item label="同时有Input.Group和图标发生移位" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} />
        <AutoComplete>
          <Input suffix={<Search />} />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="同时有Input.Group和Search组件发生移位" {...formItemLayout}>
      <Input.Group compact>
        <TreeSelect style={{ width: '30%' }} />
        <AutoComplete>
          <Input.Search />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
  </Form>,
  mountNode,
);
```
