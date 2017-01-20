---
order: 2
title:
  zh-CN: 修改延时
  en-US: Customize duration
---

## zh-CN

自定义时长 `10s`，默认时长为 `1.5s`。

## en-US

Customize message display duration from default `1.5s` to `10s`.

````__react
import { message, Button } from 'antd';

const success = function () {
  message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
};

ReactDOM.render(<Button onClick={success}>Customized display duration</Button>
, mountNode);
````
