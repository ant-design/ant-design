# 表单动画进出场

- order: 4

表单组合的进场与出场动画。

---

````jsx
import { QueueAnim, Button, Checkbox, Radio } from 'antd';
const RadioGroup = Radio.Group;

const Test = React.createClass({
  getInitialState() {
    return {
      show: true
    };
  },
  onClick() {
    this.setState({
      show: !this.state.show
    });
  },
  render() {
    return (
      <div>
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </p>
        <QueueAnim component="form" className="ant-form-horizontal" type="bottom" leaveReverse>
          {this.state.show ? [
            <div className="ant-form-item ant-form-item-compact" key="name">
              <label htmlFor="userName" className="col-6" required>用户名：</label>
              <div className="col-6">
                <p className="ant-form-text">大眼萌 minion</p>
              </div>
            </div>,
            <div className="ant-form-item" key="password">
              <label htmlFor="password" className="col-6" required>密码：</label>
              <div className="col-14">
                <input className="ant-input" type="password" id="password" placeholder="请输入密码"/>
              </div>
            </div>,
            <div className="ant-form-item ant-form-item-compact" key="sex">
              <label className="col-6" required>您的性别：</label>
              <div className="col-14">
                <RadioGroup value="male">
                  <Radio value="male">男的</Radio>
                  <Radio value="female">女的</Radio>
                </RadioGroup>
              </div>
            </div>,
            <div className="ant-form-item" key="remark">
              <label htmlFor="remark" className="col-6" required>备注：</label>
              <div className="col-14">
                <textarea className="ant-input" id="remark" placeholder="随便写"></textarea>
                <p className="ant-form-explain">随便写点什么</p>
              </div>
            </div>,
            <div className="ant-form-item ant-form-item-compact" key="checkbox">
              <div className="col-14 col-offset-6">
                <label>
                  <Checkbox />
                  同意
                </label>
              </div>
            </div>,
            <div className="row" key="btn">
              <div className="col-16 col-offset-6">
                <Button type="primary">确定</Button>
              </div>
            </div>
          ] : null}
        </QueueAnim>
      </div>
    );
  }
});

ReactDOM.render(<Test />, document.getElementById('components-queue-anim-demo-form'));
````
