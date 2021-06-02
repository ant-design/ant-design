---
order: 3.2
title:
  zh-CN: 非阻塞校验
  en-US: No block rule
only: true
---

## zh-CN

`rule` 添加 `warningOnly` 后校验不再阻塞表单提交。

## en-US

`rule` with `warningOnly` will not block form submit.

```tsx
import React from 'react';
import { Form, Input, message, Button } from 'antd';

const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('Submit success!');
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="url"
        label="URL"
        rules={[
          { type: 'url', warningOnly: true },
          { type: 'string', min: 6 },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
