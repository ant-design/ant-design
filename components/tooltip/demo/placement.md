# 位置

- order: 1

位置有 12 个方向。

---

````jsx
import { Tooltip } from 'antd';
const text = <span>提示文字</span>;

ReactDOM.render(
  <div>
    <div style={{margin:10}}>
      <Tooltip placement="left" title={text}>
        <a href="#">左边 要对齐</a>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <a href="#">上边 要对齐</a>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>
        <a href="#">下边 要对齐</a>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <a href="#">右边 要对齐</a>
      </Tooltip>
    </div>
    <div style={{margin:10}}>
      <Tooltip placement="leftTop" title={text}>
        <a href="#">左上 要对齐</a>
      </Tooltip>
      <Tooltip placement="leftBottom" title={text}>
        <a href="#">左下 要对齐</a>
      </Tooltip>
      <Tooltip placement="rightTop" title={text}>
        <a href="#">右上 要对齐</a>
      </Tooltip>
      <Tooltip placement="rightBottom" title={text}>
        <a href="#">右下 要对齐</a>
      </Tooltip>
    </div>
    <div style={{margin:10}}>
      <Tooltip placement="topLeft" title={text}>
        <a href="#">上左 要对齐</a>
      </Tooltip>
      <Tooltip placement="topRight" title={text}>
        <a href="#">上右 要对齐</a>
      </Tooltip>
      <Tooltip placement="bottomLeft" title={text}>
        <a href="#">下左 要对齐</a>
      </Tooltip>
      <Tooltip placement="bottomRight" title={text}>
        <a href="#">下右 要对齐</a>
      </Tooltip>
    </div>
  </div>
, document.getElementById('components-tooltip-demo-placement'));
````

<style>
#components-tooltip-demo-placement a {
  margin-right: 1em;
}
</style>
