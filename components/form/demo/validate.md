# 校验提示

- order: 4

我们为表单控件定义了三种校验状态，为 `<Form.Item>` 定义 `validateStatus` 属性即可。

validateStatus: ['success', 'warning', 'error', 'validating']。

另外为输入框添加反馈图标，设置 `<Form.Item>` 的 `hasFeedback` 属性值为 `true` 即可。 

**注意**: 反馈图标只对 `<Form.Input>` 有效。

---

````jsx
var Form = antd.Form;
var Datepicker = antd.Datepicker;

ReactDOM.render(
<Form horizontal>
  <Form.Item
    label="失败校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    validateStatus="error"
    help="请输入数字和字母组合">
    <Form.Input type="text" value="无效选择" id="error" />
  </Form.Item>

  <Form.Item
    label="警告校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    validateStatus="warning">
    <Form.Input type="text" value="前方高能预警" id="warning" />
  </Form.Item>

  <Form.Item
    label="校验中："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="validating"
    help="信息审核中...">
    <Form.Input type="text" value="我是被校验的内容" id="validating" />
  </Form.Item>

  <Form.Item
    label="成功校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="success">
    <Form.Input type="text" value="我是正文" id="success" />
  </Form.Item>

  <Form.Item
    label="警告校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="warning">
    <Form.Input type="text" value="前方高能预警" id="warning" />
  </Form.Item>

  <Form.Item
    label="失败校验："
    labelClassName="col-5"
    wrapperClassName="col-12"
    hasFeedback={true}
    validateStatus="error"
    help="请输入数字和字母组合">
    <Form.Input type="text" value="无效选择" id="error" />
  </Form.Item>

  <Form.Item
    label="Datepicker 失败："
    labelClassName="col-5"
    validateStatus="error">
    <div className="col-6">
      <Datepicker />
    </div>
    <div className="col-1">
      <p className="ant-form-split">-</p>
    </div>
    <div className="col-6">
      <Datepicker />
    </div>
    <div className="col-19 col-offset-5">
      <p className="ant-form-explain">请输入正确选项</p>
    </div>
  </Form.Item>
</Form>
, document.getElementById('components-form-demo-validate'));
````
