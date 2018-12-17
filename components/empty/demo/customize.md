---
order: 2
title:
  zh-CN: 自定义
  en-US: Customize
---

## zh-CN

自定义图片、描述、页脚。

## en-US

Customize image, description and footer.

```jsx
import { Empty, Button } from 'antd';

ReactDOM.render(
  <Empty
    image="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
    footer={
      <Button type="primary">立即创建</Button>
    }
  />,
  mountNode
);
```
