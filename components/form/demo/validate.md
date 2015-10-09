# 校验提示

- order: 4

我们为表单控件的校验状态定义了样式，共有三种校验状态类：

`.has-success` `.has-error` `.has-warning`, 分别代表校验成功、校验失败、有警告。

将以上三种校验状态类添加到这些控件的父级元素即可。

另外为输入框添加反馈图标，可以更好地反馈当前的校验状态，使用 `.has-feedback` 类包裹 input 输入框即可，在这里校验状态类就要和 `.has-feedback` 类同级。

**注意**: 反馈图标只能使用在文本输入框 `<input class="ant-input">` 元素上。

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var InputGroup = Input.Group;

React.render(
<Form horizontal>
  <FormItem
    label="失败校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    validateStatus="error"
    help="请输入数字和字母组合">
    <Input type="text" value="无效选择" id="error" />
  </FormItem>

  <FormItem
    label="警告校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    validateStatus="warning">
    <Input type="text" value="前方高能预警" id="warning" />
  </FormItem>
  <FormItem
    label="校验中："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="validating"
    help="信息审核中...">
    <Input type="text" value="我是被校验的内容" id="validating" />
  </FormItem>

  <FormItem
    label="成功校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="success">
    <Input type="text" value="我是正文" id="success" />
  </FormItem>

  <FormItem
    label="失败校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="error"
    help="请输入数字和字母组合">
    <Input type="text" value="无效选择" id="error" />
  </FormItem>

  <FormItem
    label="警告校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="warning">
    <Input type="text" value="前方高能预警" id="warning" />
  </FormItem>
</Form>
, document.getElementById('components-form-demo-validate'));
````
