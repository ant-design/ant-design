---
order: 4
title: 表单动画进出场
---

表单组合的进场与出场动画。

````jsx
import { QueueAnim, Button, Radio, Input, Form, Row, Col } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Test = React.createClass({
  getInitialState() {
    return {
      show: true,
    };
  },
  onClick() {
    this.setState({
      show: !this.state.show,
    });
  },
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </p>
        <QueueAnim component={Form} className="ant-form ant-form-horizontal" type="bottom" leaveReverse>
          {this.state.show ? [
            <FormItem key="item1" {...formItemLayout} label="用户名：">
              <p className="ant-form-text">大眼萌 minion</p>
            </FormItem>,
            <FormItem key="item2" {...formItemLayout} label="密码：">
              <Input type="password" placeholder="请输入密码" />
            </FormItem>,
            <FormItem key="item3" {...formItemLayout} label="您的性别：">
              <RadioGroup>
                <Radio value="male">男的</Radio>
                <Radio value="female">女的</Radio>
              </RadioGroup>
            </FormItem>,
            <FormItem key="item4" {...formItemLayout} label="备注：">
              <Input type="textarea" placeholder="随便写" />
            </FormItem>,
            <Row key="submit">
              <Col span="16" offset="6">
                <Button type="primary" htmlType="submit">确定</Button>
              </Col>
            </Row>,
          ] : null}
        </QueueAnim>
      </div>
    );
  },
});

ReactDOM.render(<Test />, mountNode);
````
