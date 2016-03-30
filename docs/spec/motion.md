# Motion

- category: 动画
- order: 2
- chinese: 组件动画

---

Ant Design 提供了一些预设的组件动画样式。

可以使用 [rc-animate](https://github.com/react-component/animate) 的 [transitionName](http://react-component.github.io/animate/examples/simple.html) 属性来给任意元素指定动画。

> 示例延长了动画时长以便展示。

`````__react
const cssAnimation = require('css-animation');
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
