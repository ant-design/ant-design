# 封顶数字

- order: 6

超过 `overflowCount` 的会显示为 `${overflowCount}+`。

---

````jsx
import { Badge } from 'antd';

ReactDOM.render(<Badge count={99} overflowCount={10}>
  <a href="#" className="head-example"></a>
</Badge>, document.getElementById('components-badge-demo-overflow'));
````
