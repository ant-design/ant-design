---
order: 2
title:
  zh-CN: 静态位置
  en-US: Static Anchor
---

## zh-CN

不浮动，状态不随页面滚动变化。

## en-US

Do not change state when page is scrolling.

```tsx
import { Anchor } from 'antd';
import React from 'react';

const { Link } = Anchor;

const App: React.FC = () => (
  <Anchor affix={false}>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#API" title="API">
      <Link href="#Anchor-Props" title="Anchor Props" />
      <Link href="#Link-Props" title="Link Props" />
    </Link>
  </Anchor>
);

export default App;
```
