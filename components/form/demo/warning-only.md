---
order: 3.2
version: 4.17.0
title:
  zh-CN: 非阻塞校验
  en-US: No block rule
---

## zh-CN

`rule` 添加 `warningOnly` 后校验不再阻塞表单提交。

## en-US

`rule` with `warningOnly` will not block form submit.

```tsx
import { Button, Form, Input, message, Space } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFill = () => {
    form.setFieldsValue({
      url: 'https://taobao.com/',
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="url"
        label="URL"
        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onFill}>
            Fill
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
```
