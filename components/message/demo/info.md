---
order: 0
title:
  zh-CN: 普通提示
  en-US: Normal prompt
---

## zh-CN

信息提醒反馈。

## en-US

Normal messages as feedbacks.

````__react
import { message, Button } from 'antd';

const info = function () {
  message.info('This is a normal message');
};

ReactDOM.render(<Button type="primary" onClick={info}>Display normal message</Button>
, mountNode);
````
