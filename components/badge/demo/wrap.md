---
order: 8
title:
  zh-CN: Badge wrapper
  en-US: Badge wrapper
---

## zh-CN

The badge can be wrapped by `wrapBadge` callback with custom elements, for example to add a `Popover`.

## en-US

The badge can be wrapped by `wrapBadge` callback with custom elements, for example to add a `Popover`.

````jsx
import { Badge, Popover } from 'antd';

const wrapBadge = (children, badgeProps) => (
  <Popover content={<div>Wrapper for badge. Count is {badgeProps.count}</div>}>
    {children}
  </Popover>);

ReactDOM.render(
  <div>
    <Badge count={5} wrapBadge={wrapBadge}>
      <a href="#" className="head-example" />
    </Badge>
  </div>,
  mountNode);
````
