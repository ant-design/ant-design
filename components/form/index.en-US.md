---
category: Components
type: Form Controls
cols: 1
english: Form
---

Forms are used to collect, validate and submit user input, forms contains form elements.
Forms elements are different types of checkboxes, radios, input elements, selectboxes, and more.

## Form

You can align controls of `form` use following methods：

- horizontal align：to horizontally align `label` tag with form control.
- inline align：to set the display property of form controls to `inline-block`. 

## Form field

Form must contains form field, form field could be input elements, standard elements,
tag, selectboxes, textareas, and more. 
We encapsulate form field in `<Form.Item />`.

```jsx
<Form.Item {...props}>
  {children}
</Form.Item>
```

> PS：Standard form always use large size control。

## API

### Form

**more example [rc-form](http://react-component.github.io/form/)**。

| Property  | Description                              | Type       | Default |
|-----------|------------------------------------------|------------|---------|
| form | Decorated by `Form.create()` will be automatically set `this.props.form` property, so just pass to form, you don't need to set it by yourself after 1.7.0 | object | No 
| horizontal | Horizontal align | boolean  | false    |
| inline | Inline align | boolean | false |
| onSubmit | Defines a function will be called if form data validation is successful | Function(e:Event) |  |
| prefixCls | This is the css class name of form component，default value is ant-form，generally you don't need to set it by yourself | string | 'ant-form' |

### Form.create(options)

How to use：

```jsx
class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);
```

To set `options` as follows.

| Property      | Description                                     | Type       |
|-----------|------------------------------------------|------------|
| onFieldsChange | Defines a function will called When the value of child of `Form.Item` changed, you can save filed value to Redux store in this function if you need. | Function(props, fields) |
| mapPropsToFields | Convert props to corresponding field value，you can read the values of Redux store in this function if you need | Function(props): Object{ fieldName: Object{ value } } |

If you the form has been decorated by `Form.create` then it has `this.props.form` property, `this.props.form` provides some APIs as follows:

| Property      | Description                                     | Type       |
|-----------|------------------------------------------|------------|
| getFieldsValue | get specified fields' value, if you don't specify any parameters, you will get all fields' value. | Function([fieldNames: string[]]) |
| getFieldValue | get specified field's value | Function(fieldName: string) |
| setFieldsValue | set specified fields' value | Function(obj: object) |
| setFields | set specified fields' value and Error | Function(obj: object) |
| validateFields | validate specified fields and get theirs value and Error | Function([fieldNames: string[]], [options: object], callback: Function(errors, values)) |
| validateFieldsAndScroll | This function is similar to `validateFields`, but after validation, if the target field is not in visible area of form, form will be automatically scrolled to the target field area | reference to `validateFields` |
| getFieldError | get specified field's Error | Function(name) |
| isFieldValidating | To check specified field is being validated | Function(name) |
| resetFields | reset specified fields' value and status, if you don't specify any parameters, it will reset all fields of form | Function([names: string[]]) |
| getFieldProps | two-way binding for form, please read below for details | |

### this.props.form.getFieldProps(id, options)

#### Special attention

Can't use `getFieldProps` in functional component: https://github.com/facebook/react/pull/6534

The return value of `getFieldProps` contains `id`、`value`(or any other props `valuePropName` that you specified),`ref`,`onChange`(or any other `trigger` `validateTrigger` that you specified), **shouldn't set same property again** in order to avoid conflict. If you concerntate on the details on return value, you can print them to console by `console.log`.

> Don't use `defaultValue` in form, please use `initialValue` instead of it.

#### getFieldProps options

| Property      | Description                                     | Type | Default |
|-----------|-----------------------------------------|-----|--------|
| options.id | The unique identity is required | string | |
| options.valuePropName | Props of children node, for exmaple, the prop of Switch is 'checked' | string | 'value' |
| options.initialValue | You can specify initial value, type, optional value of children node | | |
| options.trigger | When to collect the value of children node | string | 'onChange' |
| options.getValueFromEvent | To convert parameters of onChange to the value of control, for example, set value of DatePicker: `(date, dateString) => dateString` | function(..args) | [reference](https://github.com/react-component/form#optiongetvaluefromevent) |
| options.validateTrigger | When to validate the value of children node | string | 'onChange' |
| options.rules | validation rule，reference to [async-validator](https://github.com/yiminghe/async-validator) | array | |
| options.onXXX | Because `getFieldProps` will replace events like `onChange` (`trigger` `validateTrigger`, if you still wnat to bind these events, please set them in `options` | function | no |
| options.exclusive | Whether it is exclusive with other controls, particularly for Radio | boolean | false |

### Form.Item

> To put one child in Form.Item is recommended, if it has multiple children, `help` `required` `validateStatus` can't be generated automatically.

| Property      | Description                                     | Type       |  Optional | Default |
|-----------|------------------------------------------|-----------|-------|--------|
| label | Label text | string  |   |     |
| labelCol | The lay out of label, you can set `span` `offset` to something like `{span: 3, offset: 12}` that same with `<Col>` | object |  |  |
| wrapperCol | To set layout for input controls, reference to labelCol | object |  |  |
| help | Prompt message, if you don't specify it, the prompt message will be generated by validation rule | string |  |   |
| extra | Provide extra prompt message, it is similar to help, if you need to display error message and prompt message in the same time, please use this | string |  |   |
| required | Whether it is required, if you don't specify it, it will be generated by validation rule|  bool |  | false  |
| validateStatus | The validation status, if you don't specify it, it will be generated by validation rule | string | 'success' 'warning' 'error' 'validating'  |   |
| hasFeedback | To use this with validateStatus, display validation status icon, only use with Input component is recommended | bool |  | false  |
| prefixCls | This is the css class name of form component，default value is ant-form，generally you don't need to set it by yourself | string |  |  'ant-form' |

<style>
.code-box-demo .ant-form-horizontal {
  max-width: 540px;
}
</style>
