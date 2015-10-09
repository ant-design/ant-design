# 表单组合

- order: 7

集中营，展示和表单相关的其他 ant-design 组件。

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var InputGroup = Input.Group;
var Select = antd.Select;
var Option = Select.Option;
var InputNumber = antd.InputNumber;
var Datepicker = antd.Datepicker;
var Switch = antd.Switch;
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;
var Slider = antd.Slider;
var Icon = antd.Icon;

var menu = <Menu>
  <Menu.Item>
    <a target="_blank" href="http://www.alipay.com/">.net</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.taobao.com/">.jp</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.tmall.com/">.org</a>
  </Menu.Item>
</Menu>;

function handleSelectChange(value) {
  console.log('selected ' + value);
}

function onInputNumberChange(v){
  console.log('changed',v);
}

React.render(
<Form horizontal>
  <FormItem
    label="InputNumber 数字输入框："
    labelClassName="col-8"
    wrapperClassName="col-10"
    required={true} >
    <InputNumber size="large" min={1} max={10} defaultValue={3} onChange={onInputNumberChange} style={{width:100}}/>
    <span className="ant-form-text"> 台机器</span>
  </FormItem>

  <FormItem
    label="我是标题："
    labelClassName="col-8"
    wrapperClassName="col-10"
    required={true}
    isCompact={true} >
    <p className="ant-form-text">唧唧复唧唧木兰当户织呀</p>
    <p className="ant-form-text">
      <a href="javascript:;">链接文字</a>
    </p>
  </FormItem>

  <FormItem
    label="Switch 开关："
    labelClassName="col-8"
    wrapperClassName="col-10"
    required={true}>
    <Switch />
  </FormItem>

  <FormItem
    label="Slider 滑动输入条："
    labelClassName="col-8"
    wrapperClassName="col-10"
    required={true}>
    <Slider marks={["A","B","C","D","E","F","G"]} />
  </FormItem>

  <FormItem
    label="Select 选择器："
    labelClassName="col-8"
    wrapperClassName="col-16"
    required={true}>
    <Select size="large" defaultValue="lucy" style={{width:200}} onChange={handleSelectChange}>
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
      <Option value="disabled" disabled>disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </FormItem>

  <FormItem
    label="Datepicker 日期选择框："
    labelClassName="col-8"
    required={true}>
    <div className="col-6">
      <Datepicker />
    </div>
    <div className="col-1">
      <p className="ant-form-split">-</p>
    </div>
    <div className="col-6">
      <Datepicker />
    </div>
  </FormItem>

  <FormItem
    label="Datepicker 校验："
    labelClassName="col-8"
    validateStatus="error"
    required={true}>
    <div className="col-6">
      <Datepicker />
    </div>
    <div className="col-1">
      <p className="ant-form-split">-</p>
    </div>
    <div className="col-6">
      <Datepicker />
    </div>
    <div className="col-19 col-offset-8">
      <p className="ant-form-explain">请输入正确选项</p>
    </div>
  </FormItem>
</Form>
, document.getElementById('components-form-demo-mix'));
````
