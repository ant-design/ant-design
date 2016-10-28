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

const { Anchor } = antd;

const { AnchorLink }  = Anchor;

ReactDOM.render(
  <Anchor>
    <AnchorLink href="#components-anchor-demo-basic">基本</AnchorLink>
    <AnchorLink href="#components-anchor-demo-independ">独立使用</AnchorLink>
  </Anchor>
, mountNode);
```