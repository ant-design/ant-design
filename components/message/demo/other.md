---
order: 1
title: 其他提示类型
---

包括成功、失败、警告。

````jsx
import { message, Button } from 'antd';

const success = function () {
  message.success('这是一条成功提示');
};

const error = function () {
  message.error('这是一条报错提示');
};

const warning = function () {
  message.warning('这是一条警告提示');
};

ReactDOM.render(<div>
  <Button onClick={success}>显示成功提示</Button>
  <Button onClick={error}>显示报错提示</Button>
  <Button onClick={warning}>显示警告提示</Button>
</div>, mountNode);
````

<style>
#components-message-demo-other .ant-btn {
  margin-right: 8px;
}
</style>
