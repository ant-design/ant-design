# 位置

- order: 1

位置有 12 个方向。

---

````jsx
import { Tooltip } from 'antd';
const text = <span>提示文字</span>;

ReactDOM.render(
  <div>
    <Tooltip placement="left" title={text}>
      <a href="#">左边</a>
    </Tooltip>
    <Tooltip placement="top" title={text}>
      <a href="#">上边</a>
    </Tooltip>
    <Tooltip placement="bottom" title={text}>
      <a href="#">下边</a>
    </Tooltip>
    <Tooltip placement="right" title={text}>
      <a href="#">右边</a>
    </Tooltip>
    <br />
    <Tooltip placement="leftTop" title={text}>
      <a href="#">左上</a>
    </Tooltip>
    <Tooltip placement="leftBottom" title={text}>
      <a href="#">左下</a>
    </Tooltip>
    <Tooltip placement="rightTop" title={text}>
      <a href="#">右上</a>
    </Tooltip>
    <Tooltip placement="rightBottom" title={text}>
      <a href="#">右下</a>
    </Tooltip>
    <br />
    <Tooltip placement="topLeft" title={text}>
      <a href="#">上左</a>
    </Tooltip>
    <Tooltip placement="topRight" title={text}>
      <a href="#">上右</a>
    </Tooltip>
    <Tooltip placement="bottomLeft" title={text}>
      <a href="#">下左</a>
    </Tooltip>
    <Tooltip placement="bottomRight" title={text}>
      <a href="#">下右</a>
    </Tooltip>
  </div>
, document.getElementById('components-tooltip-demo-placement'));
````

<style>
#components-tooltip-demo-placement a {
  display: inline-block;
  line-height: 40px;
  height: 40px;
  width: 80px;
  text-align: center;
  background: #f6f6f6;
  margin-right: 1em;
  margin-bottom: 1em;
  border-radius: 6px;
}
</style>
