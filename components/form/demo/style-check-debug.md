---
order: 99
title:
  zh-CN: 提交修改前看看这个对不对
  en-US: Please check this before commit
debug: true
---

## zh-CN

提交修改前看看这个对不对。

## en-US

Please check this before commit.

````jsx
import {
  Button, Modal, Form, Row, Col, Input, Select, InputNumber, Radio, DatePicker,
} from 'antd';

const RadioGroup = Radio.Group;
const ColSpan = {lg:12,md:24};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  handleClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((error, values) => {
      console.log(error, values);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { Item } = Form;
    const itemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const span = 12;

    return (
      <div>
        {/* Case 1: Form in modal */}
        <Button onClick={this.handleClick}>打开</Button>
        <Modal
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          title="弹出层"
          visible={this.state.visible}
        >
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <Row>
              <Col span={span}>
                <Item colon={false} {...itemLayout} label="测试字段">
                  {getFieldDecorator("item1", {
                    rules: [{ required: true, message: "请必须填写此字段" }],
                  })(<Input />)}
                </Item>
              </Col>
              <Col span={span}>
                <Item {...itemLayout} label="测试字段">
                  {getFieldDecorator("item2", {
                    rules: [{ required: true, message: "请必须填写此字段" }],
                  })(<Input />)}
                </Item>
              </Col>
              <Col span={span}>
                <Item {...itemLayout} label="测试字段">
                  {getFieldDecorator("item3")(<Input />)}
                </Item>
              </Col>
              <Col span={span}>
                <Item {...itemLayout} label="测试字段">
                  {getFieldDecorator("item4", {
                    rules: [{ required: true, message: "请必须填写此字段" }],
                  })(<Input />)}
                </Item>
              </Col>
              <Col span={span}>
                <Item {...itemLayout} label="测试字段">
                  {getFieldDecorator("item5", {
                    rules: [{ required: true, message: "请必须填写此字段" }],
                  })(<Input />)}
                </Item>
              </Col>
              <Col span={span}>
                <Item {...itemLayout} label="测试字段">
                  {getFieldDecorator("item6", {
                    rules: [{ required: true, message: "请必须填写此字段" }],
                  })(<Input />)}
                </Item>
              </Col>
            </Row>
          </Form>
        </Modal>

        {/* case 2: Form different item */}
        <Form>
            <Row gutter={16}>
                <Col {...ColSpan}>
                    <Item colon={false} label="input:64.5px">
                        <Input />
                    </Item>
                </Col>
                <Col {...ColSpan}>
                    <Item label="select:64px">
                        <Select />
                    </Item>
                </Col>
                <Col {...ColSpan}>
                    <Item label="InputNumber:64px">
                        <InputNumber />
                    </Item>
                </Col>
                <Col {...ColSpan}>
                    <Item label="DatePicker: 64.5px">
                        <DatePicker />
                    </Item>
                </Col>
                <Col {...ColSpan}>
                    <Item label="RadioGroup: 64px">
                        <RadioGroup>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </RadioGroup>
                    </Item>
                </Col>
            </Row>
        </Form>
      </div>
    );
  }
}

const WrapApp = Form.create()(App);

ReactDOM.render(<WrapApp />, mountNode);
````

