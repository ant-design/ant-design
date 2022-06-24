---
order: 3.3
version: 4.20.0
title:
  zh-CN: 字段监听 Hooks
  en-US: Watch Hooks
---

## zh-CN

`useWatch` 允许你监听字段变化，同时仅当改字段变化时重新渲染。API 文档请[查阅此处](#Form.useWatch)。

## en-US

`useWatch` helps watch the field change and only re-render for the value change. [API Ref](#Form.useWatch).

```tsx
import React from 'react';
import { Form, Input, InputNumber, Typography } from 'antd';

const Demo = () => {
  const [form] = Form.useForm<{ name: string; age: number }>();
  const nameValue = Form.useWatch('name', form);

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="name" label="Name (Watch to trigger rerender)">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age (Not Watch)">
          <InputNumber />
        </Form.Item>
      </Form>

      <Typography>
        <pre>Name Value: {nameValue}</pre>
      </Typography>
    </>
  );
};

export default Demo;
```
