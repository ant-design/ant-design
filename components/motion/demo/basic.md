# 基本

- order: 0

动画效果示例。

---

````jsx
var cssAnimation = require('css-animation');
var motions = [];
motions = motions.concat([[{
  name: '淡入',
  value: 'fade',
  direction: 'enter',
  type: '渐隐'
}, {
  name: '淡出',
  value: 'fade',
  direction: 'leave',
  type: '渐隐'
}]]);
motions = motions.concat([[{
  name: '中心放大',
  value: 'zoom',
  direction: 'enter',
  type: '缩放'
}, {
  name: '中心缩小',
  value: 'zoom',
  direction: 'leave',
  type: '缩放'
}, {
  name: '上方放大',
  value: 'zoom-up',
  direction: 'enter',
  type: '缩放'
}, {
  name: '上方缩小',
  value: 'zoom-up',
  direction: 'leave',
  type: '缩放'
}, {
  name: '下方放大',
  value: 'zoom-down',
  direction: 'enter',
  type: '缩放'
}, {
  name: '下方缩小',
  value: 'zoom-down',
  direction: 'leave',
  type: '缩放'
}, {
  name: '左方放大',
  value: 'zoom-left',
  direction: 'enter',
  type: '缩放'
}, {
  name: '左方缩小',
  value: 'zoom-left',
  direction: 'leave',
  type: '缩放'
}, {
  name: '右方放大',
  value: 'zoom-right',
  direction: 'enter',
  type: '缩放'
}, {
  name: '右方缩小',
  value: 'zoom-right',
  direction: 'leave',
  type: '缩放'
}]]);
motions = motions.concat([[{
  name: '上方滑入',
  value: 'move-up',
  direction: 'enter',
  type: '移动'
}, {
  name: '上方滑出',
  value: 'move-up',
  direction: 'leave',
  type: '移动'
}, {
  name: '下方滑入',
  value: 'move-down',
  direction: 'enter',
  type: '移动'
}, {
  name: '下方滑出',
  value: 'move-down',
  direction: 'leave',
  type: '移动'
}, {
  name: '左方滑入',
  value: 'move-left',
  direction: 'enter',
  type: '移动'
}, {
  name: '左方滑出',
  value: 'move-left',
  direction: 'leave',
  type: '移动'
}, {
  name: '右方滑入',
  value: 'move-right',
  direction: 'enter',
  type: '移动'
}, {
  name: '右方滑入',
  value: 'move-right',
  direction: 'leave',
  type: '移动'
}]]);
motions = motions.concat([[{
  name: '上方展开',
  value: 'slide-up',
  direction: 'enter',
  type: '伸缩'
}, {
  name: '上方缩回',
  value: 'slide-up',
  direction: 'leave',
  type: '伸缩'
}, {
  name: '下方展开',
  value: 'slide-down',
  direction: 'enter',
  type: '伸缩'
}, {
  name: '下方缩回',
  value: 'slide-down',
  direction: 'leave',
  type: '伸缩'
}, {
  name: '左方展开',
  value: 'slide-left',
  direction: 'enter',
  type: '伸缩'
}, {
  name: '左方缩回',
  value: 'slide-left',
  direction: 'leave',
  type: '伸缩'
}, {
  name: '右方展开',
  value: 'slide-right',
  direction: 'enter',
  type: '伸缩'
}, {
  name: '右方缩回',
  value: 'slide-right',
  direction: 'leave',
  type: '伸缩'
}]]);
motions = motions.concat([[{
  name: '摇摆',
  value: 'swing',
  direction: 'enter',
  type: '其他'
}]]);
var leave='-leave';
var Test = React.createClass({
  handleChange(e) {
    var value = e.target.value;
    if(value){
      this.demoNode.style.visibility='';
      cssAnimation(this.demoNode, value, () => {
        if(value.slice(-leave.length)===leave){
          this.demoNode.style.visibility='hidden';
        }
      });
    }
  },

  componentDidMount() {
    this.demoNode = React.findDOMNode(this.refs.demo);
  },

  render() {
    var options = [<option value="">请选择预设动画</option>].concat(motions.map(function (m) {
      var opts = m.map(function (m2) {
        return <option value={m2.value + "-" + m2.direction}>{m2.name + " " + m2.value}</option>
      });
      return <optgroup label={m[0].type}>{opts}</optgroup>;
    }));
    return <div>
      <div className="motion-container">
        <div ref="demo" className="motion-example">栗子</div>
      </div>
      <div className="motion-select">
        <select onChange={this.handleChange}>{options}</select>
      </div>
    </div>;
  }
});

React.render(<Test/>, document.getElementById('components-motion-demo-basic'));
````

<style>
.motion-container {
  height: 150px;
  line-height: 150px;
  text-align: center;
  margin-bottom: 20px;
}
.motion-example {
  background: #4AAFDE;
  width: 140px;
  height: 140px;
  line-height: 140px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  display: inline-block !important;
  border-radius: 8px;
  font-weight: bold;
}
.motion-select {
  text-align: center;
}
.code-boxes-col-2-1 {
  width:100%;
}
</style>