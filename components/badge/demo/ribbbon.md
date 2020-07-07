---
order: 0
title:
  zh-CN: 缎带
  en-US: Ribbon
---

## zh-CN

## en-US

```jsx
import { Badge, Card } from 'antd';

ReactDOM.render(
  <div>
    <Badge.Ribbon text="中文 English">
      <Card>666</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="中文 English" color="purple">
      <Card>666</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="中文 English" color="#2db7f5">
      <Card>666</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="中文 English" color="#2db7f5" placement="left">
      <Card>Left</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="中文 English" color="#2db7f5" placement="right">
      <Card>Right</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="中文 English" color="#2db7f5" placement="start">
      <Card>Start</Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="中文 English" color="#2db7f5" placement="end">
      <Card>End</Card>
    </Badge.Ribbon>
  </div>,
  mountNode,
);
```
