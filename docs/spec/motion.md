---
category:
  zh-CN: 设计基础
  en-US: Design Fundamental
order: 5
title:
  zh-CN: 组件动画
  en-US: Motion
---

依据『巧用过渡』的设计原则，Ant Design 提供了一些预设的组件动画和缓动函数。更多动画可参考 [Ant Motion](https://motion.ant.design/)

> 示例延长了动画时长以便展示。

`````__react
const cssAnimation = require('css-animation');
const antd = require('antd');
const Select = antd.Select;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

let motions = [];
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
  name: '右方滑出',
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

var leave = '-leave';
var Test = React.createClass({
  handleChange(e) {
    var value = e;
    if (value) {
      this.demoNode.style.visibility = '';
      cssAnimation(this.demoNode, value, () => {
        if (value.slice(-leave.length) === leave) {
          this.demoNode.style.visibility = 'hidden';
        }
      });
    }
  },
  componentDidMount() {
    this.demoNode = ReactDOM.findDOMNode(this.refs.demo);
  },
  render() {
    const options = [<Option value="" key="placeholder">请选择预设动画</Option>].concat(motions.map(function (m, groupIndex) {
      const opts = m.map(function (m2, optIndex) {
        return <Option key={optIndex} value={m2.value + "-" + m2.direction}>{m2.name + " " + m2.value}</Option>
      });
      return <OptGroup key={groupIndex} label={m[0].type}>{opts}</OptGroup>;
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

ReactDOM.render(<Test key="motion" />, mountNode);
`````

## 组件动画

| 组件         | 中文名              | 采用动画                                        |
|--------------|--------------------|-------------------------------------------------|
| Popover      | 气泡浮出            | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| Popconfirm   | 气泡确认            | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| Tooltip      | 文字提示            | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| Modal        | 弹出框              | `zoom`                                          |
| Badge        | 徽标数              | `zoom`                                          |
| message      | 信息提示条          | `move-up`                                       |
| notification | 通知框              | `move-right` & `slide-up`                       |
| Dropdown     | 下拉菜单            | `slide-up`                                      |
| Select       | 选择框              | `slide-up`                                      |
| Cascader     | 级联选择框          | `slide-up`                                      |
| TreeSelect   | 树选择框            | `slide-up`                                      |
| DatePicker   | 日期选择框          | `slide-up`                                      |
| TatePicker   | 日期选择框          | `slide-up`                                      |
| Alert        | 警告提示            | `slide-up`                                      |
| Menu         | 导航菜单            | `slide-up`                                      |

在 React 的前端实现中，可以使用 [rc-animate](https://github.com/react-component/animate) 的 [transitionName](http://react-component.github.io/animate/examples/simple.html) 属性来给任意元素指定动画。

## 缓动函数

> `move@enter` 表示 `移动@进入`。

| 名称                | 参数                                     | 说明                | 应用动画    |
| -------------------|------------------------------------------|--------------------|------------|
| @ease-out          | `cubic-bezier(0.215,0.61,0.355,1);`      | 默认后缓动           |            |
| @ease-in           | `cubic-bezier(0.55,0.055,0.675,0.19);`   | 默认前缓动           |            |
| @ease-in-out       | `cubic-bezier(0.645,0.045,0.355,1);`     | 默认前后缓动         |            |
| @ease-out-back     | `cubic-bezier(0.18,0.89,0.32,1.28);`     | 结束回动             |            |
| @ease-in-back      | `cubic-bezier(0.6,-0.3,0.74,0.05);`      | 开始回动             |            |
| @ease-in-out-back  | `cubic-bezier(0.68,-0.55,0.27,1.55);`    | 前后回动             |            |
| @ease-out-circ     | `cubic-bezier(0.08,0.82,0.17,1);`        | 圆形后缓动           | `move@enter` `zoom@enter` |
| @ease-in-circ      | `cubic-bezier(0.6,0.04,0.98,0.34);`      | 圆形前缓动           | `move@leave` |
| @ease-in-out-circ  | `cubic-bezier(0.78,0.14,0.15,0.86);`     | 圆形前后缓动          | `zoom@leave` |
| @ease-out-quint    | `cubic-bezier(0.23, 1, 0.32, 1);`        | quint 后缓动         | `slide@enter`  |
| @ease-in-quint     | `cubic-bezier(0.755, 0.05, 0.855, 0.06);`| quint 前缓动         | `slide@leave` |
| @ease-in-out-quint | `cubic-bezier(0.86, 0, 0.07, 1);`        | quint 前后缓动       |             |
