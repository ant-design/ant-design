---
order: 0
title:
  zh-CN: 独立使用
  en-US: Standalone
---

## zh-CN

不包裹任何元素即是独立使用，可自定样式展现。

> 在右上角的 badge 则限定为红色。

## en-US

Used in standalone when children is empty.

````jsx
import { Badge } from 'antd';

ReactDOM.render(<div>
  <Badge count={25} />
  <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
  <Badge count={109} style={{ backgroundColor: '#87d068' }} />
</div>, mountNode);
````
