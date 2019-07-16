---
order: 4
title:
  zh-CN: 默认高亮
  en-US: Default Active
---

## zh-CN

如果没有高亮设置默认高亮

## en-US

if not active set default.

```jsx
import { Anchor } from 'antd';

const { Link } = Anchor;

ReactDOM.render(
  <Anchor defaultActive="#components-anchor-demo-basic">
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#API" title="API">
      <Link href="#Anchor-Props" title="Anchor Props" />
      <Link href="#Link-Props" title="Link Props" />
    </Link>
  </Anchor>,
  mountNode,
);
```
