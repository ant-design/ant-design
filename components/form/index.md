---
category: Components
chinese: 表单
type: Form Control
cols: 1
english: Form
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。


## 表单

我们为 `form` 提供了以下两种排列方式：

- 水平排列：可以实现 `label` 标签和表单控件的水平排列；
- 行内排列：使其表现为 `inline-block` 级别的控件。

## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们封装了表单域 `<Form.Item />` 。

```jsx
<Form.Item {...props}>
  {children}
</Form.Item>
```

> 注：标准表单中一律使用大号控件。

## API

### Form

更多示例参考 [rc-form](http://react-component.github.io/form/)。

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| form | 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性，直接传给 Form 即可 | object | 无 |
| horizontal | 水平排列布局 | boolean  | false    |
| inline | 行内排列布局 | boolean | false |
| onSubmit | 数据验证成功后回调事件 | Function(e:Event) |  |
| prefixCls | 样式类名，默认为 ant-form，通常您不需要设置 | string | 'ant-form' |

### Form.create(options)

使用方式如下：

```jsx
class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);
```

`options` 的配置项如下。

| 参数      | 说明                                     | 类型       |
|-----------|------------------------------------------|------------|
| onFieldsChange | 当 `Form.Item` 子节点的值发生改变时触发，可以把对应的值转存到 Redux store | Function(props, fields) |
| mapPropsToFields | 把 props 转为对应的值，可用于把 Redux store 中的值读出 | Function(props): Object{ fieldName: Object{ value } } |

经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性，`this.props.form` 提供的 API 如下：

| 参数      | 说明                                     | 类型       |
|-----------|------------------------------------------|------------|
| getFieldsValue | 获取一组输入控件的值，如不传入参数，则获取全部组件的值 | Function([fieldNames: string[]]) |
| getFieldValue | 获取一个输入控件的值 | Function(fieldName: string) |
| setFieldsValue | 设置一组输入控件的值 | Function(obj: object) |
| setFields | 设置一组输入控件的值与 Error | Function(obj: object) |
| validateFields | 校验并获取一组输入域的值与 Error | Function([fieldNames: string[]], [options: object], callback: Function(errors, values)) |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 | 参考 `validateFields` |
| getFieldError | 获取某个输入控件的 Error | Function(name) |
| isFieldValidating | 判断一个输入控件是否在校验状态 | Function(name) |
| resetFields | 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 | Function([names: string[]]) |
| getFieldProps | 用于和表单进行双向绑定，详见下方描述 | |

#### this.props.form.getFieldProps(id, options)

##### 特别注意

`getFieldProps` 调用不能位于纯函数组件中: https://github.com/facebook/react/pull/6534

`getFieldProps` 返回的属性包括 `id`、`value`（或你设置的其它 `valuePropName`）、`ref`、`onChange`（或者你设置的其它 `trigger` `validateTrigger`），**所以不应再设置同样的属性**，以免冲突。如果对其返回值的细节有兴趣，可以 `console.log` 出来查看。

> 在表单中 `defaultValue` 也不应该被设置，请使用下面的 `initialValue`。

| 参数      | 说明                                     | 类型 | 默认值 |
|-----------|-----------------------------------------|-----|--------|
| options.id | 必填输入控件唯一标志 | string | |
| options.valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | 'value' |
| options.initialValue | 子节点的初始值，类型、可选值均由子节点决定  | | |
| options.trigger | 收集子节点的值的时机 | string | 'onChange' |
| options.getValueFromEvent | 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：`(date, dateString) => dateString` | function(..args) | [reference](https://github.com/react-component/form#optiongetvaluefromevent) |
| options.validateTrigger | 校验子节点值的时机 | string | 'onChange' |
| options.rules | 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) | array | |
| options.onXXX | 由于 `getFieldProps` 会占用 `onChange` 等事件（即你所设置的 `trigger` `validateTrigger`），所以如果仍需绑定事件，请在 `options` 内设置 | function | 无 |

### Form.Item

> 一个 Form.Item 建议只放一个 child，有多个 child 时，`help` `required` `validateStatus` 无法自动生成。

| 参数      | 说明                                     | 类型       |  可选值 | 默认值 |
|-----------|------------------------------------------|-----------|-------|--------|
| label | label 标签的文本 | string  |   |     |
| labelCol | label 标签布局，通 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` | object |  |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | object |  |  |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string |  |   |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string |  |   |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | bool |  | false  |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成 | string | 'success' 'warning' 'error' 'validating'  |   |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | bool |  | false  |
| prefixCls | 样式类名，默认为 ant-form，通常您不需要设置 | string |  |  'ant-form' |


<style>
.code-box-demo .ant-form-horizontal {
  max-width: 540px;
}
</style>
