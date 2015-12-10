# 表单组合

- order: 5

集中营，展示和表单相关的其他 ant-design 组件。

---

````jsx
import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button, message, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const Demo = React.createClass({
  mixins: [Form.ValueMixin],

  getInitialState() {
    return {
      formData: {
        inputNumber: undefined,
        static: '唧唧复唧唧木兰当户织呀',
        switch: undefined,
        slider: undefined,
        select: undefined,
        startDate: undefined,
        endDate: undefined,
      }
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  },

  render() {
    const formData = this.state.formData;
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
        <FormItem
          label="InputNumber 数字输入框："
          labelCol={{span: 8}}
          wrapperCol={{span: 10}}
          required>
          <InputNumber size="large" min={1} max={10} style={{width:100}} defaultValue={3} name="inputNumber" onChange={this.setValue.bind(this, 'inputNumber')} value={formData.inputNumber} />
          <span className="ant-form-text"> 台机器</span>
        </FormItem>

        <FormItem
          label="我是标题："
          labelCol={{span: 8}}
          wrapperCol={{span: 10}}
          required>
          <p className="ant-form-text" id="static" name="static">唧唧复唧唧木兰当户织呀</p>
          <p className="ant-form-text">
            <a href="#">链接文字</a>
          </p>
        </FormItem>

        <FormItem
          label="Switch 开关："
          labelCol={{span: 8}}
          wrapperCol={{span: 10}}
          required>
          <Switch name="switch" onChange={this.setValue.bind(this, 'switch')} value={formData.switch} />
        </FormItem>

        <FormItem
          label="Slider 滑动输入条："
          labelCol={{span: 8}}
          wrapperCol={{span: 10}}
          required>
          <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} name="slider" onChange={this.setValue.bind(this, 'slider')} />
        </FormItem>

        <FormItem
          label="Select 选择器："
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          required>
          <Select size="large" defaultValue="lucy" style={{width:200}} name="select" onChange={this.setValue.bind(this, 'select')} value={formData.select}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem
          label="DatePicker 日期选择框："
          labelCol={{span: 8}}
          required>
          <Col span="6">
            <DatePicker name="startDate" onChange={this.setValue.bind(this, 'startDate')} value={formData.startDate} />
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="6">
            <DatePicker name="endDate" onChange={this.setValue.bind(this, 'endDate')} value={formData.endDate} />
          </Col>
        </FormItem>
        <Row>
          <Col span="16" offset="8">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-form-demo-mix'));
````
