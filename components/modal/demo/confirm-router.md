---
order: 8
title:
  zh-CN:   销毁确认对话框
  en-US: destroy confirmation modal dialog
---

## zh-CN

使用 `Modal.destroy()` 可以销毁弹出的确认窗。通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题。

## en-US

`Modal.destroy()` could destroy all confirmation modal dialogs. Usually, you can use it in router change event to destroy confirm modal dialog automatically

```jsx
import { Modal, Button } from 'antd';
import { browserHistory } from 'react-router';

// router change
browserHistory.listen(() => {
  Modal.destroy();
});

const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'confirm dialog',
    content: 'click the browser [go back] button，this confirm modal dialog will destroy Automatically',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

ReactDOM.render(
  <div>
    <Button onClick={showConfirm}>Confirm</Button>
  </div>, mountNode
);
```
