# 基本

- order: 0

简单的标签展示，添加 closable 表示可关闭。

---

````jsx
import { Tag } from 'antd';

function onClose(e) {
  console.log(e, this);
}

ReactDOM.render(<div>
  <Tag>标签一</Tag>
  <Tag>标签二</Tag>
  <Tag closable onClose={onClose}>标签三</Tag>
  <a href="https://www.alipay.com/" target="_blank"><Tag>标签四（链接）</Tag></a>
</div>, mountNode);
````
