# 成功

- order: 0

操作成功反馈。

---

````jsx
import { message, Button } from 'antd';

const success = function() {
  message.success('这是一条成功的提示');
};

ReactDOM.render(<Button type="primary" onClick={success}>显示成功提示</Button>
, document.getElementById('components-message-demo-success'));
````

