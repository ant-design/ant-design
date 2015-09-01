# 讨嫌的小红点

- order: 3

没有具体的数字。

---

````jsx
var Badge = antd.Badge;

React.render(
  <Badge dot={true}>
    <i className="anticon anticon-notification"></i>
  </Badge>
, document.getElementById('components-badge-demo-dot'));
````

<style>
.anticon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}
</style>
