---
order: 3
title:
  zh-CN: 讨嫌的小红点
  en-US: Red badge
---

## zh-CN

没有具体的数字。

## en-US

This will simply display a red badge, without a specific count. If count equals 0, it won't display the dot.

```jsx
import { Badge } from '@allenai/varnish';
import { NotificationOutlined } from '@ant-design/icons';

ReactDOM.render(
  <div>
    <Badge dot>
      <NotificationOutlined />
    </Badge>
    <Badge count={0} dot>
      <NotificationOutlined />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </div>,
  mountNode,
);
```

<style>
.anticon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}
</style>
