---
order: 1
title:
  zh-CN: 嵌套的 AnchorLink
  en-US: Mixed AnchorLink
---

## zh-CN

最简单的用法。

## en-US

The simplest usage.

```jsx
import { Anchor } from 'antd';
const { Link } = Anchor;

ReactDOM.render(
  <Anchor offsetTop={100}>
    <Link href="#components-anchor-demo-basic" title="Bacis">
      <Link href="#components-anchor-demo-mix" title="Mixed AnchorLink" />
    </Link>
    <Link href="#components-anchor-demo-independ" title="Independent AnchorLink" />
  </Anchor>
, mountNode);
```