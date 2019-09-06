---
order: 6
title:
  zh-CN: 监听锚点链接改变
  en-US: Listening for anchor link change
---

## zh-CN

监听锚点链接改变

## en-US

Listening for anchor link change.

```jsx
import { Anchor } from 'antd';

const { Link } = Anchor;

const onChange = link => {
  console.log('Anchor:OnChange', link);
};

ReactDOM.render(
  <Anchor affix={false} onChange={onChange}>
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
