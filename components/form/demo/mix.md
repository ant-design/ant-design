# 表单组合

- order: 7

集中营，展示和表单相关的其他 ant-design 组件。

---

````jsx
var Form = antd.Form;
var Select = antd.Select;
var Option = Select.Option;
var InputNumber = antd.InputNumber;
var Datepicker = antd.Datepicker;
var Switch = antd.Switch;
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;
var Slider = antd.Slider;
var Icon = antd.Icon;
var Button = antd.Button;
var message = antd.message;

var Demo = React.createClass({
  mixins: [Form.ValueMixin],

  getInitialState() {
    return {
      formData: {
        inputNumber: undefined,
        static: "唧唧复唧唧木兰当户织呀",
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
    message.success("收到表单值~~~ ：" + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  },

  render() {
    var formData = this.state.formData;
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
        <Form.Item
          label="InputNumber 数字输入框："
          labelClassName="col-8"
          wrapperClassName="col-10"
          required={true} >
          <InputNumber size="large" min={1} max={10} style={{width:100}} defaultValue={3} name="inputNumber" onChange={this.setValue.bind(this, 'inputNumber')} value={formData.inputNumber} />
          <span className="ant-form-text"> 台机器</span>
        </Form.Item>

        <Form.Item
          label="我是标题："
          labelClassName="col-8"
          wrapperClassName="col-10"
          required={true} >
          <Form.Input type="static" id="static" name="static" onChange={this.setValue.bind(this, 'static')} value="唧唧复唧唧木兰当户织呀" />
          <p className="ant-form-text">
            <a href="javascript:;">链接文字</a>
          </p>
        </Form.Item>

        <Form.Item
          label="Switch 开关："
          labelClassName="col-8"
          wrapperClassName="col-10"
          required={true} >
          <Switch name="switch" onChange={this.setValue.bind(this, 'switch')} value={formData.switch} />
        </Form.Item>

        <Form.Item
          label="Slider 滑动输入条："
          labelClassName="col-8"
          wrapperClassName="col-10"
          required={true}>
          <Slider marks={["A","B","C","D","E","F","G"]} name="slider" onChange={this.setValue.bind(this, 'slider')} />
        </Form.Item>

        <Form.Item
          label="Select 选择器："
          labelClassName="col-8"
          wrapperClassName="col-16"
          required={true}>
          <Select size="large" defaultValue="lucy" style={{width:200}} name="select" onChange={this.setValue.bind(this, 'select')} value={formData.select}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Datepicker 日期选择框："
          labelClassName="col-8"
          required={true}>
          <div className="col-6">
            <Datepicker name="startDate" onChange={this.setValue.bind(this, 'startDate')} value={formData.startDate} />
          </div>
          <div className="col-1">
            <p className="ant-form-split">-</p>
          </div>
          <div className="col-6">
            <Datepicker name="endDate" onChange={this.setValue.bind(this, 'endDate')} value={formData.endDate} />
          </div>
        </Form.Item>
        <div className="row">
          <div className="col-16 col-offset-8">
            <Button type="primary" htmlType="submit">确定</Button>
          </div>
        </div>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-form-demo-mix'));
````
