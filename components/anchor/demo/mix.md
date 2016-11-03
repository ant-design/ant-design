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
const { AnchorLink } = Anchor;

ReactDOM.render(
  <Anchor offsetTop={100}>
    <AnchorLink href="#components-anchor-demo-basic" title="基本">
      <AnchorLink href="#components-anchor-demo-mix" title="嵌套的 AnchorLink" />
    </AnchorLink>
    <AnchorLink href="#components-anchor-demo-independ" title="独立使用" />
  </Anchor>
, mountNode);
```