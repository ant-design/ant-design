---
order: 100
title:
  zh-CN: debug 前置/后置标签
  en-US: debug Pre / Post tab
debug: true
---

## zh-CN

一些特殊的前置后置标签。

## en-US

Some special pre & post tabs example.

```tsx
import { SettingOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space direction="vertical">
    Input addon Button:
    <Input addonAfter={<Button type="primary">Submit</Button>} defaultValue="mysite" />
    <Input addonAfter={<Button>Submit</Button>} defaultValue="mysite" />
    <br />
    <br />
    Input addon Button icon:
    <Input
      addonAfter={
        <Button>
          <SettingOutlined />
        </Button>
      }
      defaultValue="mysite"
    />
  </Space>
);

export default App;
```
