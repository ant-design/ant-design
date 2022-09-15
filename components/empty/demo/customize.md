---
order: 2
title:
  zh-CN: 自定义
  en-US: Customize
---

## zh-CN

自定义图片链接、图片大小、描述、附属内容。

## en-US

Customize image source, image size, description and extra content.

```tsx
import { Button, Empty } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
  >
    <Button type="primary">Create Now</Button>
  </Empty>
);

export default App;
```
