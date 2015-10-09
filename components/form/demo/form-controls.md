# 表单控件

- order: 3

展示所有支持的表单控件。

`注`： 输入框：只有正确设置了 type 属性的输入控件才能被赋予正确的样式。

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var Select = antd.Select;
var Option = Select.Option;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;

function handleSelectChange(value) {
  console.log('selected ' + value);
}

React.render(
<Form horizontal>
  <FormItem
    label="输入框："
    labelClassName="col-6"
    wrapperClassName="col-14">
    <Input type="text" id="control-input" placeholder="Please enter..." />
  </FormItem>

  <FormItem
    label="文本域："
    labelClassName="col-6"
    wrapperClassName="col-14">
    <Input type="textarea" id="control-textarea"/>
  </FormItem>

  <FormItem
    label="Select 选择器："
    labelClassName="col-6"
    wrapperClassName="col-14">
    <Select size="large" defaultValue="lucy" style={{width:200}} onChange={handleSelectChange}>
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
      <Option value="disabled" disabled>disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </FormItem>

  <FormItem
    label="Checkbox 多选框："
    labelClassName="col-6"
    wrapperClassName="col-18"
    isCompact>
      <label className="ant-checkbox-vertical">
        <Checkbox />选项一
      </label>
      <label className="ant-checkbox-vertical">
        <Checkbox />选项二
      </label>
      <label className="ant-checkbox-vertical">
        <Checkbox disabled={true} />选项三（不可选）
      </label>
  </FormItem>

  <FormItem
    label="Checkbox 多选框："
    labelClassName="col-6"
    wrapperClassName="col-18"
    isCompact>
      <label className="ant-checkbox-inline">
        <Checkbox />选项一
      </label>
      <label className="ant-checkbox-inline">
        <Checkbox />选项二
      </label>
      <label className="ant-checkbox-inline">
        <Checkbox />选项三
      </label>
  </FormItem>

  <FormItem
    label="Radio 单选框："
    labelClassName="col-6"
    wrapperClassName="col-18"
    isCompact>
      <RadioGroup value="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </RadioGroup>
  </FormItem>
</Form>
, document.getElementById('components-form-demo-form-controls'));
````
