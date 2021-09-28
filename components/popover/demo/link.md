---
order: 6
title:
  zh-CN: 带链接跳转
  en-US: have link
---

## zh-CN

可以自定义 content，使其带常用的 link 跳转

## en-US

You can customize the content to make it jump with frequently used links

```jsx
import { Popover, Button } from 'antd';

const Content = (
  <div>
    <span>popover</span>
    <a style={{ marginLeft: '10px' }}>Link</a>
  </div>
);

ReactDOM.render(
  <Popover content={Content} trigger="click">
    <Button type="primary">click me</Button>
  </Popover>,
  mountNode,
);
```
