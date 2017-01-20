---
order: 1
title:
  zh-CN: 其他提示类型
  en-US: Other types of message
---

## zh-CN

包括成功、失败、警告。

## en-US

Messages of success, error and warning types.

````__react
import { message, Button } from 'antd';

const success = function () {
  message.success('This is a message of success');
};

const error = function () {
  message.error('This is a message of error');
};

const warning = function () {
  message.warning('This is message of warning');
};

ReactDOM.render(<div>
  <Button onClick={success}>Success</Button>
  <Button onClick={error}>Error</Button>
  <Button onClick={warning}>Warning</Button>
</div>, mountNode);
````

<style>
#components-message-demo-other .ant-btn {
  margin-right: 8px;
}
</style>
