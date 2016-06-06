---
order: 5
title: 信息提示
---

各种类型的信息提示，只提供一个按钮用于关闭。

````jsx
import { Modal, Button } from 'antd';

function info() {
  Modal.info({
    title: '这是一条通知信息',
    content: (
      <div>
        <p>一些附加信息一些附加信息一些附加信息</p>
        <p>一些附加信息一些附加信息一些附加信息</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息',
  });
}

function error() {
  Modal.error({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息',
  });
}

function warning() {
  Modal.warning({
    title: '这是一条警告信息',
    content: '一些附加信息一些附加信息一些附加信息',
  });
}

ReactDOM.render(<div>
  <Button onClick={info}>信息提示</Button>
  <Button onClick={success}>成功提示</Button>
  <Button onClick={error}>失败提示</Button>
  <Button onClick={warning}>警告提示</Button>
</div>, mountNode);
````
