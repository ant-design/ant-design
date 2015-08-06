# 表单控件

- order: 3

展示所有支持的表单控件。

`注`： 输入框：只有正确设置了 type 属性的输入控件才能被赋予正确的样式。

---

````jsx
var Select = antd.Select;
var Option = Select.Option;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.RadioGroup;

function handleSelectChange(value) {
  console.log('selected ' + value);
}

React.render(
<form className="ant-form-horizontal">
  <div className="ant-form-item">
    <label className="col-6">输入框：</label>
    <div className="col-14">
      <input type="text" className="ant-input" placeholder="Please enter..." />
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6">文本域：</label>
    <div className="col-14">
      <textarea className="ant-input"></textarea>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6">Select 选择器：</label>
    <div className="col-14">
      <Select value="lucy" style={{width:200}} onChange={handleSelectChange}>
        <Option value="jack">jack</Option>
        <Option value="lucy">lucy</Option>
        <Option value="disabled" disabled>disabled</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    </div>
  </div>
  <div className="ant-form-item ant-form-item-compact">
    <label className="col-6">Checkbox 多选框：</label>
    <div className="col-18">
      <label className="ant-checkbox-vertical">
        <Checkbox />选项一
      </label>
      <label className="ant-checkbox-vertical">
        <Checkbox />选项二
      </label>
      <label className="ant-checkbox-vertical">
        <Checkbox disabled={true} />选项三（不可选）
      </label>
    </div>
  </div>
  <div className="ant-form-item ant-form-item-compact">
    <label className="col-6">Checkbox 多选框：</label>
    <div className="col-18">
      <label className="ant-checkbox-inline">
        <Checkbox />选项一
      </label>
      <label className="ant-checkbox-inline">
        <Checkbox />选项二
      </label>
      <label className="ant-checkbox-inline">
        <Checkbox />选项三
      </label>
    </div>
  </div>
  <div className="ant-form-item ant-form-item-compact">
    <label className="col-6">Radio 单选框：</label>
    <div className="col-18">
      <RadioGroup value="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </RadioGroup>
    </div>
  </div>
</form>
, document.getElementById('components-form-demo-form-controls'));
````
