# 信息提示

- order: 5

各种类型的信息提示，只提供一个按钮用于关闭。

---

````jsx
import { Modal, Button } from 'antd';

function info() {
  Modal.info({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息',
    onOk: function() {}
  });
}

function success() {
  Modal.success({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息'
  });
}

function error() {
  Modal.error({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息'
  });
}

ReactDOM.render(<div>
  <Button onClick={info}>信息提示</Button>
  <Button onClick={success}>成功提示</Button>
  <Button onClick={error}>失败提示</Button>
</div>, document.getElementById('components-modal-demo-info'));
````

