# 位置

- order: 1

位置有 12 个方向。

---

````jsx
import { Tooltip } from 'antd';
const text = <span>提示文字</span>;

ReactDOM.render(
  <div>
    <div style={{marginLeft: 95}}>
      <Tooltip placement="topLeft" title={text}>
        <a href="#">上左 topLeft</a>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <a href="#">上边 top</a>
      </Tooltip>
      <Tooltip placement="topRight" title={text}>
        <a href="#">上右 topRight</a>
      </Tooltip>
    </div>
    <div style={{width: 100, float: 'left'}}>
      <Tooltip placement="leftTop" title={text}>
        <a href="#">左上</a>
      </Tooltip>
      <Tooltip placement="left" title={text}>
        <a href="#">左下</a>
      </Tooltip>
      <Tooltip placement="leftBottom" title={text}>
        <a href="#">左下</a>
      </Tooltip>
    </div>
    <div style={{width: 100, float: 'right'}}>
      <Tooltip placement="rightTop" title={text}>
        <a href="#">右上</a>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <a href="#">右边</a>
      </Tooltip>
      <Tooltip placement="rightBottom" title={text}>
        <a href="#">右下</a>
      </Tooltip>
    </div>
    <div style={{marginLeft: 95, clear: 'both'}}>
      <Tooltip placement="bottomLeft" title={text}>
        <a href="#">上右</a>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>
        <a href="#">下边</a>
      </Tooltip>
      <Tooltip placement="bottomRight" title={text}>
        <a href="#">下右</a>
      </Tooltip>
    </div>
  </div>
, document.getElementById('components-tooltip-demo-placement'));
````

<style>
#components-tooltip-demo-placement a {
  display: inline-block;
  line-height: 32px;
  height: 32px;
  width: 90px;
  font-size: 12px;
  text-align: center;
  background: #f5f5f5;
  margin-right: 1em;
  margin-bottom: 1em;
  border-radius: 6px;
}
</style>
