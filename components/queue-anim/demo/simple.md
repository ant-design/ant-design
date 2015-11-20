# 默认

- order: 0

最简单的进场例子。

---

````jsx
import { QueueAnim } from 'antd';

ReactDOM.render(
  <QueueAnim delay={500}>
    <div key="a">依次进场</div>
    <div key="b">依次进场</div>
    <div key="c">依次进场</div>
    <div key="d">依次进场</div>
    <div key="e">依次进场</div>
    <div key="f">依次进场</div>
  </QueueAnim>
, document.getElementById('components-queue-anim-demo-simple'));
````

````css
.code-box-demo > div {
  overflow: hidden;
}

.code-box-demo .buttons {
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
}
````
