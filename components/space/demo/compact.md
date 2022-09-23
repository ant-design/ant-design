---
order: 3
title:
  zh-CN: 紧凑布局
  en-US: Compact Mode
---

## zh-CN

紧凑布局。

## en-US

Space.Compact example.

```tsx
import { CopyOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    <h3>Input</h3>
    <Space.Compact size="large" block>
      <Input style={{ width: '20%' }} defaultValue="0571" />
      <Input style={{ width: '30%' }} defaultValue="26888888" />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue="github.com:ant-design/ant-design"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        addonBefore="git@"
        defaultValue="github.com:ant-design/ant-design"
        addonAfter=".git"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <h3>Input.Search</h3>
    <Space.Compact block>
      <Input.Search allowClear defaultValue="0571" />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input.Search allowClear defaultValue="0571" />
      <Input.Search allowClear defaultValue="26888888" />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input.Search
        addonBefore="+86"
        addonAfter="00"
        allowClear
        style={{ width: '40%' }}
        defaultValue="0571"
      />
      <Input.Search allowClear style={{ width: '40%' }} defaultValue="26888888" />
    </Space.Compact>
  </div>
);

export default App;
```

```css
.site-input-group-wrapper .site-input-split {
  background-color: #fff;
}

.site-input-group-wrapper .site-input-right {
  border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
  border-left-width: 1px;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right {
  border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
  border-right-width: 1px;
}
```

<style>
[data-theme="dark"] .site-input-group-wrapper .site-input-split {
  background-color: transparent;
}
</style>
