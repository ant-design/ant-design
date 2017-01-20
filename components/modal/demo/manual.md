---
order: 7
debug: true
title:
  zh-CN: 手动移除
  en-US: Manual to destroy
---

## zh-CN

手动关闭modal。

## en-US

Manually destroying a modal.

````__react
import { Modal, Button } from 'antd';

function success() {
  const modal = Modal.success({
    title: 'This is a notification message',
    content: 'This modal will be destroyed after 1 second',
  });
  setTimeout(() => modal.destroy(), 1000);
}


ReactDOM.render(<div>
  <Button onClick={success}>Success</Button>
</div>, mountNode);
````
