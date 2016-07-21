---
order: 3
title: 加载中
---

进行全局 loading，异步自行移除。

````jsx
import { message, Button } from 'antd';

const success = () => {
  const hide = message.loading('正在执行中...', 0);
  // 异步手动移除
  setTimeout(hide, 2500);
};

ReactDOM.render(<Button onClick={success}>显示加载中...</Button>
, mountNode);
````
