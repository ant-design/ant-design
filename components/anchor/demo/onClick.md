---
order: 3
title:
  zh-CN: 自定义 onClick 事件
  en-US: Customize the onClick event
---

## zh-CN

点击锚点不记录历史。

## en-US

Clicking on an anchor does not record history.

```jsx
import { Anchor } from 'antd';

const { Link } = Anchor;

const handleClick = (e, link) => {
  e.preventDefault();
  console.log(link);
};

ReactDOM.render(
  <Anchor affix={false} onClick={handleClick}>
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
