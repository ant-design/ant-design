# 偏移

- order: 1

达到一定的偏移量才触发。

---

````jsx
var Affix = antd.Affix;

React.render(
  <Affix offset="75">
    <button className="ant-btn ant-btn-primary">固定在距离顶部 75px 的位置</button>
  </Affix>
, document.getElementById('components-affix-demo-offset'));
````
