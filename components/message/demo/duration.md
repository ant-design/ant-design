---
order: 2
title: 修改延时
---

自定义时长 `10s`，默认时长为 `1.5s`。

````jsx
import { message, Button } from 'antd';

const success = function () {
  message.success('这是一条成功的提示,并将于10秒后消失', 10);
};

ReactDOM.render(<Button onClick={success}>自定义时长提示</Button>
, mountNode);
````
