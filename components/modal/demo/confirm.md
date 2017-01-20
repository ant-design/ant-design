---
order: 3
title:
  zh-CN: 确认对话框
  en-US: Confirmation modal dialog
---

## zh-CN

使用 `confirm()` 可以快捷地弹出确认框。

## en-US

To use `confirm()` to popup a confirmation modal dialog.

````__react
import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'Want to delete these items?',
    content: 'some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {},
  });
}

ReactDOM.render(
  <Button onClick={showConfirm}>
    confirmation modal dialog
  </Button>
, mountNode);
````
