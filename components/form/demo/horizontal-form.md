# 水平排列的表单

- order: 0

**注意**：在我们的设计里，表单域为静态文本、`checkbox`、`radio`以及`input[type="file"]`的，其高度不同于一般的表单域，**需要将 `<Form.Item>` 的 `isCompact` 设置为 true**。

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var Button = antd.Button;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;
var Button = antd.Button;

React.render(
<Form horizontal>
  <FormItem
    label="用户名："
    labelClassName="col-6"
    wrapperClassName="col-6"
    required={true}
    isCompact={true}>
    <Input type="static" value="大眼萌 minion" id="userName" />
  </FormItem>
  <FormItem
    label="密码："
    labelClassName="col-6"
    wrapperClassName="col-14"
    required={true} >
    <Input type="password" id="password" placeholder="请输入密码" />
  </FormItem>
  <FormItem
    label="您的性别："
    labelClassName="col-6"
    wrapperClassName="col-14"
    required={true}
    isCompact={true}>
      <RadioGroup value="male">
        <Radio value="male">男的</Radio>
        <Radio value="female">女的</Radio>
      </RadioGroup>
  </FormItem>
  <FormItem
    label="备注："
    labelClassName="col-6"
    wrapperClassName="col-14"
    required={true}
    help="随便写点什么" >
    <Input type="textarea" placeholder="随便写" id="remark" />
  </FormItem>
  <FormItem
    wrapperClassName="col-14 col-offset-6">
    <label>
      <Checkbox /> 同意
    </label>
  </FormItem>
  <div className="row">
    <div className="col-16 col-offset-6">
      <Button type="primary">确定</Button>
    </div>
  </div>
</Form>

, document.getElementById('components-form-demo-horizontal-form'));
````
