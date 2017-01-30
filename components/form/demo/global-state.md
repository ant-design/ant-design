---
order: 8
title:
  zh-CN: 表单数据存储于上层组件
  en-US: Store Form Data into Upper Component
---

## zh-CN

通过使用 `onFieldsChange` 与 `mapPropsToFields`，可以把表单的数据存储到上层组件或者 [Redux](https://github.com/reactjs/redux)、[dva](https://github.com/dvajs/dva) 中。

## en-US

We can store form data into upper component or [Redux](https://github.com/reactjs/redux) or [dva](https://github.com/dvajs/dva) by using `onFieldsChange` and `mapPropsToFields`.

````__react
import { Form, Input } from 'antd';
const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: {
        ...props.username,
        value: props.username.value.toUpperCase(),
      },
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form inline>
      <FormItem label="Username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
    </Form>
  );
});

const Demo = React.createClass({
  getInitialState() {
    return {
      fields: {
        username: {
          value: 'benjycui',
        },
      },
    };
  },
  handleFormChange(changedFields) {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    });
  },
  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````

<style>
#components-form-demo-global-state .language-bash {
  max-width: 400px;
  border-radius: 6px;
  margin-top: 24px;
}
</style>
