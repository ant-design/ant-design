---
order: 99
title:
  zh-CN: 紧凑布局嵌套
  en-US: Nested Space Compact
debug: true
---

## zh-CN

嵌套使用的紧凑布局

## en-US

Nested `Space.Compact`

```tsx
import { CopyOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Space.Compact block>
      <Space.Compact>
        <Input placeholder="Please input something" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Space.Compact>
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Space.Compact>
        <Input defaultValue="mysite" />
        <Button icon={<CopyOutlined />} />
      </Space.Compact>
    </Space.Compact>
  </>
);

export default App;
```

```css
[data-theme='compact'] .select-before {
  width: 71px;
}

[data-theme='compact'] .select-after {
  width: 65px;
}
```
