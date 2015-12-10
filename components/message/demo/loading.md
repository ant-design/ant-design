# 加载中

- order: 3

进行全局 loading，异步自行移除。

---

````jsx
import { message, Button } from 'antd';

const success = function() {
  let hide = message.loading('正在执行中...', 0);
  // 异步手动移除
  setTimeout(hide, 2500);
};

ReactDOM.render(<Button onClick={success}>显示加载中...</Button>
, document.getElementById('components-message-demo-loading'));
````
