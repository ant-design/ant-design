---
order: 3.3
version: 4.20.0
title:
  zh-CN: 字段监听 Hooks
  en-US: Watch Hooks
---

## zh-CN

`useWatch` 允许你监听字段变化，同时仅当改字段变化时重新渲染。

## en-US

`useWatch` helps watch the field change and only re-render for the value change.

```tsx
import React from 'react';
import { Form, Input, Typography } from 'antd';

const Demo = () => {
  const [form] = Form.useForm<{ field1: string; field2: string }>();
  const nameValue = Form.useWatch(['field1'], form);

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="field1" label="Field 1 (Watch to trigger rerender)">
          <Input />
        </Form.Item>
        <Form.Item name="field2" label="Field 2 (Not Watch)">
          <Input />
        </Form.Item>
      </Form>

      <Typography>
        <pre>Field 1 Value: {nameValue}</pre>
      </Typography>
    </>
  );
};

export default Demo;
```
