---
order: 3.2
title:
  zh-CN: 表单标签可换行
  en-US: label can wrap
version: 4.18.0
---

## zh-CN

使用 `labelWrap` 可以开启 `label` 换行。

## en-US

Turn on `labelWrap` to wrap label if text is long.

```tsx
import { Button, Form, Input } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
  >
    <Form.Item label="正常标签文案" name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label="超长标签文案超长标签文案" name="password" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
```
