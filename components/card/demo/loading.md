# 预加载的卡片

- order: 4

数据读入前会有文本块样式。

---

````jsx
import { Card } from 'antd';

const App = React.createClass({
  render() {
    return (
      <Card loading title="卡片标题" style={{ width: 300 }}>
        Whatever content
      </Card>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
