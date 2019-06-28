---
order: 3
title:
  zh-CN: 表单验证
  en-US: Validate
---

## zh-CN

对字段添加验证规则，`onFinish` 事件只会在验证通过后触发。

## en-US

Add validate rules with field. `onFinish` is only trigger when validation passed.

```tsx
import { Form, Input, Button } from 'antd';

const Demo = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form name="validate" onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
