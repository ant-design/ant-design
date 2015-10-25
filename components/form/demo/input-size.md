# Input 尺寸

- order: 6

我们为 `<input />` 输入框定义了三种尺寸（大、默认、小）。

css 样式引用： 定义 `.ant-input` 类的基础上加上 `.ant-input-lg .ant-input-sm` 即可。 

`<Form.Input />` 组件引用需要声明 `site` 属性即可，属性值为 ['small', 'default', 'large']。

注意： 在 `<form>` 表单里面，我们只使用**大尺寸**， 即高度为 **32px**，作为唯一的尺寸。

---


````jsx
var Form = antd.Form;

ReactDOM.render(
  <div className="row">
    <Form.InputGroup>
      <div className="col-6">
        <Form.Input type="text" id="largeInput" size="large" placeholder="大尺寸" />
      </div>
      <div className="col-6">
        <Form.Input type="text" id="defaultInput" placeholder="默认尺寸" />
      </div>
      <div className="col-6">
        <Form.Input type="text" id="smallInput" placeholder="小尺寸" size="small" />
      </div>
    </Form.InputGroup>
  </div>
, document.getElementById('components-form-demo-input-size'));
````
