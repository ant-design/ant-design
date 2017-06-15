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

````jsx
import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

ReactDOM.render(
  <Button onClick={showConfirm}>
    Confirm
  </Button>
, mountNode);
````
