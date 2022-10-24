---
order: 3
iframe: 360
title:
  zh-CN: 描述
  en-US: Description
---

## zh-CN

可以通过 `description` 设置文字内容。

> 仅当 `shape` 属性为 `square` 时支持。由于空间较小，推荐使用比较精简的双数文字。

## en-US

Setting `description` prop to show FloatButton with description.

> supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.

```tsx
import React from 'react';
import { FloatButton } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP INFO"
      shape="square"
      style={{ right: 24 }}
    />
    <FloatButton description="HELP INFO" shape="square" style={{ right: 94 }} />
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP"
      shape="square"
      style={{ right: 164 }}
    />
  </>
);

export default App;
```
