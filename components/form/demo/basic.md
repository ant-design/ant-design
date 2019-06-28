---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本的表单数据域控制展示。

## en-US

Basic Form data control.

```tsx
import { Form, Input, Button } from 'antd';

const Demo = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form name="basic" onFinish={onFinish}>
      <Form.Item name="username">
        <Input />
      </Form.Item>

      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
