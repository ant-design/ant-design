---
order: 99
title:
  zh-CN: 废弃的 Block 组
  en-US: Deprecated Button Group
debug: true
---

## zh-CN

Debug usage

## en-US

Debug usage

```tsx
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import type { ButtonGroupProps } from 'antd/es/button';
import React from 'react';

const getGroup = (props?: ButtonGroupProps) => (
  <div>
    <Button.Group {...props}>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Button.Group>
  </div>
);

const App: React.FC = () => (
  <>
    {getGroup({ size: 'small' })}
    <br />
    {getGroup()}
    <br />
    {getGroup({ size: 'large' })}
  </>
);

export default App;
```

```css
#components-button-demo-legacy-group .ant-btn {
  margin: 0;
}
```
