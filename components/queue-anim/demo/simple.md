# 默认

- order: 0

最简单的进场例子。

---

````jsx
var QueueAnim = antd.QueueAnim;
console.log(<QueueAnim><div key='abc'>dd</div></QueueAnim>)
React.render(
  <QueueAnim interval={100} delay={1000} duration={1000}>
    <div key='a'>依次进场</div>
    <div key='b'>依次进场</div>
    <div key='c'>依次进场</div>
    <div key='d'>依次进场</div>
    <div key='e'>依次进场</div>
  </QueueAnim>
, document.getElementById('components-queue-anim-demo-simple'));
````

