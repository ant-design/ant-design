# 偏移

- order: 1

达到一定的偏移量才触发。

---

````jsx
var Affix = antd.Affix;
var Button = antd.Button;

React.render(
  <Affix offset={75}>
    <Button type="primary">固定在距离顶部 75px 的位置</Button>
  </Affix>
, document.getElementById('components-affix-demo-offset'));
````
