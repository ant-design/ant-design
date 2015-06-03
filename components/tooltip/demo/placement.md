# 位置

- order: 1

位置有四个方向。

---

````jsx
var Tooltip = antd.tooltip;
var text = <span>提示文字</span>;

React.render(
  <div>
    <Tooltip placement="left" title={text}>
      <a href="#">左边左边</a>
    </Tooltip>
    <Tooltip placement="right" title={text}>
      <a href="#">右边右边</a>
    </Tooltip>
    <Tooltip placement="top" title={text}>
      <a href="#">上边上边</a>
    </Tooltip>
    <Tooltip placement="bottom" title={text}>
      <a href="#">下边下边</a>
    </Tooltip>
  </div>
, document.getElementById('components-tooltip-demo-placement'));
````

<style>
#components-tooltip-demo-placement a {
  margin-right: 1em;
}
</style>
