---
order: 2
title:
  zh-CN: 修改动画
  en-US: Customize transitionName
---

## zh-CN

自定义动画 `fade`，默认为 `move-up`。

## en-US

Customize message appearance animation from default `move-up` to `fade`.

````jsx
import { message, Button } from 'antd';

const transitionName = () => {
  message.config({ transitionName: 'fade' });
  message.success('This is a prompt message for success, and it will fade in', () => {
    message.config({ transitionName: 'move-up' });
  });
};

ReactDOM.render(
  <Button onClick={transitionName}>Customized transitionName</Button>
, mountNode);
````
