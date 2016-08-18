---
order: 3
title: 条件触发
---

可以判断是否需要弹出。

````jsx
import { Popconfirm, Switch, message } from 'antd';

let App = React.createClass({
  getInitialState() {
    return {
      visible: false,
      condition: true,   // 是否满足条件，不满足则弹出确认框
    };
  },
  changeCondition(value) {
    this.setState({ condition: value });
  },
  confirm() {
    this.setState({ visible: false });
    message.success('进行下一步操作. next step.');
  },
  cancel() {
    this.setState({ visible: false });
    message.error('点击了取消');
  },
  handleVisibleChange(visible) {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // 打开前进行判断
    console.log(this.state.condition);
    if (this.state.condition) {
      this.confirm();  // 直接执行下一步
    } else {
      this.setState({ visible });  // 进行确认
    }
  },
  render() {
    return (
      <div>
        <Popconfirm title="确定要删除这个任务吗？"
          visible={this.state.visible} onVisibleChange={this.handleVisibleChange}
          onConfirm={this.confirm} onCancel={this.cancel}
        >
          <a href="#">删除某任务</a>
        </Popconfirm>
        <br />
        <br />
        点击是否直接执行：<Switch defaultChecked onChange={this.changeCondition} />
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
