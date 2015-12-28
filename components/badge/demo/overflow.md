# 封顶数字

- order: 6

超过 `overflowCount` 的会显示为 `${overflowCount}+`。

---

````jsx
import { Badge } from 'antd';

ReactDOM.render(<div>
  <Badge count={99} overflowCount={10}>
    <a href="#" className="head-example"></a>
  </Badge>
  <Badge count={1000} overflowCount={999}>
    <a href="#" className="head-example"></a>
  </Badge>
</div>, document.getElementById('components-badge-demo-overflow'));
````
