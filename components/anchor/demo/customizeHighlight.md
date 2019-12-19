---
order: 4
title:
  zh-CN: 自定义锚点高亮
  en-US: Customize the anchor highlight
---

## zh-CN

自定义锚点高亮。

## en-US

Customize the anchor highlight.

```jsx
import { Anchor } from 'antd';

const { Link } = Anchor;

const getCurrentAnchor = () => {
  return '#components-anchor-demo-static';
};

ReactDOM.render(
  <Anchor affix={false} getCurrentAnchor={getCurrentAnchor}>
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
