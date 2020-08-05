---
order: 15
title:
  zh-CN: 缎带
  en-US: Ribbon
---

## zh-CN

使用缎带型的徽标。

## en-US

Use ribbon badge.

```jsx
import { Card } from '@allenai/varnish';
import Badge from '..';
// TODO: put back after deploy // import { Badge, Card } from '@allenai/varnish';

ReactDOM.render(
  <Badge.Ribbon text="Pushes open the window">
    <Card>And raises the spyglass.</Card>
  </Badge.Ribbon>,
  mountNode,
);
```
