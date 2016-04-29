---
order: 5
title: 自定义关闭
---

可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`。

````jsx
import { Alert } from 'antd';

ReactDOM.render(
  <Alert message="消息提示的文案" type="info" closeText="不再提醒" />
, mountNode);
````
