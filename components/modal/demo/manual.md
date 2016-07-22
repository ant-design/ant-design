---
order: 7
title: 手动移除
---

手动关闭modal。

````jsx
import { Modal, Button } from 'antd';

function success() {
  const modal = Modal.success({
    title: '这是一条通知信息',
    content: '一秒后自动移除',
  });
  setTimeout(() => modal.destroy(), 1000);
}


ReactDOM.render(<div>
  <Button onClick={success}>成功提示</Button>
</div>, mountNode);
````
