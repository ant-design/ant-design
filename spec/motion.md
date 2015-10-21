# 组件动画

- category: 动画
- order: 2

---

Ant Design 提供了一些预设的组件动画样式。

<div id="components-motion-demo-basic"></div>

## 组件动画

通过设置组件的 `transitionName` 指定组件动画。

| 组件         | 中文名              | 采用动画                                        |
|--------------|---------------------|-------------------------------------------------|
| popover      | 气泡浮出            | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| popconfirm   | 气泡确认            | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| tooltip      | 文字提示            | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| modal        | 弹出框              | `zoom`                                          |
| confirm      | 弹出确认框          | `zoom`                                          |
| message      | 信息提示条          | `move-up`                                       |
| notification | 通知框              | `move-right` & `slide-up`                       |
| dropdown     | 下拉菜单            | `slide-up`                                      |
| select       | 选择框              | `slide-up`                                      |
| datepicker   | 日期选择框          | `slide-up`                                      |
| alert        | 警告提示            | `slide-up`                                      |
| menu         | 导航菜单            | `slide-up`                                      |
| datepicker   | 日期选择框          | `slide-up`                                      |


`````jsx
var cssAnimation = require('css-animation');
var Select = antd.Select;
var Option = Select.Option;
var OptGroup = Select.OptGroup;


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
    var value = e;
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
    this.demoNode = ReactDOM.findDOMNode(this.refs.demo);
  },

  render() {
    var options = [<Option value="">请选择预设动画</Option>].concat(motions.map(function (m) {
      var opts = m.map(function (m2) {
        return <Option value={m2.value + "-" + m2.direction}>{m2.name + " " + m2.value}</Option>
      });
      return <OptGroup label={m[0].type}>{opts}</OptGroup>;
    }));
    return <div>
      <div className="motion-container">
        <div ref="demo" className="motion-example"></div>
      </div>
      <div className="motion-select-wrapper">
        <Select value="" className='motion-select' onChange={this.handleChange}>{options}</Select>
      </div>

    </div>;
  }
});

ReactDOM.render(<Test/>, document.getElementById('components-motion-demo-basic'));
`````

<style>
.motion-container {
  height: 190px;
  line-height: 190px;
  text-align: center;
  margin-bottom: 20px;
}
.motion-example {
  width: 180px;
  height: 180px;
  line-height: 180px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  display: inline-block !important;
  border-radius: 8px;
  font-weight: bold;
  background: url(https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg) center/230px;
}
.motion-select-wrapper{
  text-align: center;
}
.motion-select {
  text-align:left;
  width:180px;
}
</style>

