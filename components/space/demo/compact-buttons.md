---
order: 9
version: 4.24.0
title:
  zh-CN: Button 紧凑布局
  en-US: Button Compact Mode
---

## zh-CN

Button 组件紧凑排列的示例。

## en-US

Button component compact example.

```tsx
import {
  DownloadOutlined,
  EllipsisOutlined,
  HeartOutlined,
  StarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Button, Menu, Dropdown, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div>
    <Space.Compact block>
      <Tooltip title="Download">
        <Button icon={<DownloadOutlined />} />
      </Tooltip>
      <Tooltip title="Environment">
        <Button icon={<EnvironmentOutlined />} />
      </Tooltip>
      <Tooltip title="Star">
        <Button icon={<StarOutlined />} />
      </Tooltip>
      <Tooltip title="Heart">
        <Button icon={<HeartOutlined />} />
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
    <Space.Compact block>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} />
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
