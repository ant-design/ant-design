---
order: 3
title:
  zh-CN: Button 垂直方向紧凑布局
  en-US: Button vertical Compact Mode
---

## zh-CN

Button 垂直方向紧凑布局。

## en-US

Space.Compact vertical example for Button.

```tsx
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    <Space.Compact size="small" direction="vertical">
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
      <Button type="primary">Button 4</Button>
    </Space.Compact>
    <br />
    <br />
    <Space.Compact size="small" direction="vertical">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </Space.Compact>
    <br />
    <br />
    <Space.Compact size="large" direction="vertical">
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
      <Button type="primary">Button 4</Button>
    </Space.Compact>
    <br />
    <br />
    <Space.Compact size="large" direction="vertical">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </Space.Compact>
    <br />
    <br />

    <Space.Compact block>
      <Button type="primary">Button 1</Button>
      <Dropdown
        placement="bottomRight"
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: '1st item',
              },
              {
                key: '2',
                label: '2nd item',
              },
              {
                key: '3',
                label: '3rd item',
              },
            ]}
          />
        }
        trigger={['click']}
      >
        <Button type="primary" icon={<EllipsisOutlined />} />
      </Dropdown>
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
