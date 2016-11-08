---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The simplest usage.

```jsx
import { Anchor } from 'antd';
const { Link } = Anchor;

ReactDOM.render(
  <Anchor>
    <Link href="#components-anchor-demo-basic" title="Basic" />
    <Link href="#components-anchor-demo-independ" title="Independent AnchorLink" />
  </Anchor>
, mountNode);
```