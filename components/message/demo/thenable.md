---
order: 5
title:
  zh-CN: Then 接口
  en-US: Thenable interface
---

## zh-CN

可以通过 then 接口在关闭后运行 callback

## en-US
`message` provides `then` interface for `onClose`.

````jsx
import { message, Button } from 'antd';

const success = () => {
  message.loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished').promise)
    .then(() => message.info('Loading finished is finished').promise);
};

ReactDOM.render(
  <Button onClick={success}>Display a loading indicator</Button>
, mountNode);
````

