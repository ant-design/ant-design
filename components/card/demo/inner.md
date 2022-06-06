---
order: 7
title:
  zh-CN: 内部卡片
  en-US: Inner card
---

## zh-CN

可以放在普通卡片内部，展示多层级结构的信息。

## en-US

It can be placed inside the ordinary card to display the information of the multilevel structure.

```tsx
import { Card } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Card title="Card title">
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>
  </Card>
);

export default App;
```
