---
order: 8
title:
  zh-CN: Badge wrapper
  en-US: Badge wrapper
---

## zh-CN

徽章可以通过指定 `wrapBadge` 属性来进行自定义渲染，例如可以通过此属性给徽章添加一个 `Popover`.

## en-US

The badge can be wrapped by `wrapBadge` callback, for example to

* replace it with a React component, or to
* apply a [`Popover`](/components/popover)

```jsx
import { Badge, Popover, Icon } from 'antd';

const replaceWithCustomContent = (scrollNumber, badgeProps) => (
  <sup className={scrollNumber.props.className} title={scrollNumber.props.title}>
    <Icon type="pushpin-o" />
    {badgeProps.count}
  </sup>
);

const wrapWithPopover = (scrollNumber, badgeProps) => (
  <Popover content={<div>We just wrapped the badge with a Popover. Count is {badgeProps.count}</div>}>
    {scrollNumber}
  </Popover>
);

ReactDOM.render(
  <div>
    <Badge count={1} wrapBadge={replaceWithCustomContent}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={2} wrapBadge={wrapWithPopover}>
      <a href="#" className="head-example" />
    </Badge>
  </div>,
  mountNode
);
```
