---
order: 3
title:
  zh-CN: Button 紧凑布局
  en-US: Button Compact Mode
---

## zh-CN

紧凑布局。

## en-US

Space.Compact example.

```tsx
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    <Space.Compact size="small" block>
      <Button type="primary">Button 1</Button>
    </Space.Compact>
    <br />
    <Space.Compact size="small" block>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact size="large" block>
      <Button type="primary">Button 1</Button>
      <Button>Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact size="large" block>
      <Button>default Button 1</Button>
      <Button>default Button 2</Button>
      <Button>default Button 3</Button>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact size="large" block>
      <Button>default Button</Button>
      <Button danger>danger Button</Button>
      <Button type="dashed">dashed Button</Button>
      <Button type="text">text Button</Button>
      <Button type="link">Link Button</Button>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} disabled />
      </Tooltip>
    </Space.Compact>
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
