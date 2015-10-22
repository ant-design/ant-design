# 表单动画进出场

- order: 6

表单组合的进场与出场动画。

---

````jsx
var EnterAnimation = antd.EnterAnimation;
var Select = antd.Select;
var Option = Select.Option;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;
var Button = antd.Button;

var Test = React.createClass({
  getInitialState() {
    return {
      enter: {
        type: 'right',
        callback: null,
        interval: 0.1
      },
      leave: {
        type: 'left',
        reverse: true,
        interval: 0.05,
        ease:'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        callback: ()=> {
          console.log('出场结束')
        }
      },
      show: true
    }
  },
  onClick() {
    this.setState({
      show: !this.state.show
    })
  },
  render() {
    return (
      <div>
        <div style={{marginBottom: 20, textAlign: 'center'}}>
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </div>
        <EnterAnimation enter={this.state.enter} leave={this.state.leave} component='form' className="ant-form-horizontal">
          {this.state.show ? <div key='from'>
            <div className="ant-form-item ant-form-item-compact">
              <label htmlFor="userName" className="col-6" required>用户名：</label>
              <div className="col-6">
                <p className="ant-form-text">大眼萌 minion</p>
              </div>
            </div>
            <div className="ant-form-item">
              <label htmlFor="password" className="col-6" required>密码：</label>
              <div className="col-14">
                <input className="ant-input" type="password" id="password" placeholder="请输入密码"/>
              </div>
            </div>
            <div className="ant-form-item ant-form-item-compact">
              <label  className="col-6" required>您的性别：</label>
              <div className="col-14">
                <RadioGroup value="male">
                  <Radio value="male">男的</Radio>
                  <Radio value="female">女的</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className="ant-form-item">
              <label htmlFor="remark" className="col-6" required>备注：</label>
              <div className="col-14">
                <textarea className="ant-input" id="remark" placeholder="随便写"></textarea>
                <p className="ant-form-explain">随便写点什么</p>
              </div>
            </div>
            <div className="ant-form-item ant-form-item-compact">
              <div className="col-14 col-offset-6">
                <label>
                  <Checkbox />
                  同意
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-16 col-offset-6">
                <Button type="primary">确定</Button>
              </div>
            </div>
          </div> : null}
        </EnterAnimation>
      </div>
    )
  }
});

ReactDOM.render(<Test />
, document.getElementById('components-enter-animation-demo-form'));
````

