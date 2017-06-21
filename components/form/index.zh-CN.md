---
category: Components
subtitle: 表单
type: Data Entry
cols: 1
title: Form
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 表单

我们为 `form` 提供了以下三种排列方式：

- 水平排列：标签和表单控件水平排列；（默认）
- 垂直排列：标签和表单控件上下垂直排列；
- 行内排列：表单项水平行内排列。

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

**更多示例参考 [rc-form](http://react-component.github.io/form/)**。

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| form | 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性，直接传给 Form 即可。1.7.0 之后无需设置 | object | 无 |
| layout | 表单布局(2.8 之后支持) | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |
| horizontal | 水平排列布局(2.8 之后废弃) | boolean | true |
| vertical | 垂直排列布局(2.8 之后废弃) | boolean | false |
| inline | 行内排列布局(2.8 之后废弃) | boolean | false |
| onSubmit | 数据验证成功后回调事件 | Function(e:Event) |  |
| hideRequiredMark | 隐藏所有表单项的必选标记 | Boolean | false |

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
| onValuesChange | 任一表单域的值发生改变时的回调 | (props, values) => void |

经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性，`this.props.form` 提供的 API 如下：

> 注意：使用 `getFieldsValue` `getFieldValue` `setFieldsValue` 等时，应确保对应的 field 已经用 `getFieldDecorator` 注册过了。

| 参数      | 说明                                     | 类型       |
|-----------|------------------------------------------|------------|
| getFieldsValue | 获取一组输入控件的值，如不传入参数，则获取全部组件的值 | Function([fieldNames: string[]]) |
| getFieldValue | 获取一个输入控件的值 | Function(fieldName: string) |
| setFieldsValue | 设置一组输入控件的值（注意：不要在 `componentWillReceiveProps` 内使用，否则会导致死循环，[更多](https://github.com/ant-design/ant-design/issues/2985)） | Function({ [fieldName]: value } |
| setFields | 设置一组输入控件的值与 Error。 [代码](https://github.com/react-component/form/blob/3b9959b57ab30b41d8890ff30c79a7e7c383cad3/examples/server-validate.js#L74-L79) | Function({ [fieldName]: { value: any, errors: [Error] } }) |
| validateFields | 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件 | Function([fieldNames: string[]], [options: object], callback: Function(errors, values)) |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 | 参考 `validateFields` |
| getFieldError | 获取某个输入控件的 Error | Function(name) |
| getFieldsError | 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error | Function([names: string[]]) |
| isFieldValidating | 判断一个输入控件是否在校验状态 | Function(name) |
| isFieldTouched | 判断一个输入控件是否经历过 `getFieldDecorator` 的值收集时机 `options.trigger` | (name: string) => boolean |
| isFieldsTouched | 判断是否任一输入控件经历过 `getFieldDecorator` 的值收集时机 `options.trigger` | (names?: string[]) => boolean |
| resetFields | 重置一组输入控件的值（为 `initialValue`）与状态，如不传入参数，则重置所有组件 | Function([names: string[]]) |
| getFieldDecorator | 用于和表单进行双向绑定，详见下方描述 | |

### this.props.form.getFieldDecorator(id, options)

经过 `getFieldDecorator` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你不再需要用 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件。
2. 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。
3. 你不需要用 `setState`，可以使用 `this.props.form.setFieldsValue` 来动态改变表单值。

#### 特别注意

如果使用的是 `react@<15.3.0`，则 `getFieldDecorator` 调用不能位于纯函数组件中: https://github.com/facebook/react/pull/6534

#### getFieldDecorator(id, options) 参数

| 参数      | 说明                                     | 类型 | 默认值 |
|-----------|-----------------------------------------|-----|--------|
| id | 必填输入控件唯一标志。支持嵌套式的[写法](https://github.com/react-component/form/pull/48)。 | string | |
| options.valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | 'value' |
| options.initialValue | 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 `===` 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量)) | | |
| options.trigger | 收集子节点的值的时机 | string | 'onChange' |
| options.getValueFromEvent | 可以把 onChange 的参数转化为控件的值 | function(..args) | [reference](https://github.com/react-component/form#optiongetvaluefromevent) |
| options.validateTrigger | 校验子节点值的时机 | string\|string[] | 'onChange' |
| options.rules | 校验规则，参考下方文档 | object[] | |
| options.exclusive | 是否和其他控件互斥，特别用于 Radio 单选控件 | boolean | false |

### Form.Item

注意：
* 一个 Form.Item 建议只放一个被 getFieldDecorator 装饰过的 child，当有多个被装饰过的 child 时，`help` `required` `validateStatus` 无法自动生成。
* `2.2.0` 之前，只有当表单域为 Form.Item 的子元素时，才会自动生成 `help` `required` `validateStatus`，嵌套情况需要自行设置。

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|-----------------------------------------|-----------|--------|
| label | label 标签的文本 | string\|ReactNode |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col) | |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](https://ant.design/components/grid/#Col) | |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|ReactNode | |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|ReactNode | |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | false |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string |  |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false  |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | boolean | true |

### 校验规则

参数  | 说明  | 类型 | 默认值
-----|------|------|------
message | 校验文案 | string | -
type | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | string | 'string'
required | 是否必选 | boolean | `false`
whitespace | 必选时，空格是否会被视为错误 | boolean | `false`
len | 字段长度 | number | -
min | 最小长度 | number | -
max | 最大长度 | number | -
enum | 枚举类型 | string | -
pattern | 正则表达式校验 | RegExp | -
transform | 校验前转换字段值 | function(value) => transformedValue:any | -
validator | 自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） | function(rule, value, callback) | -

更多高级用法可研究 [async-validator](https://github.com/yiminghe/async-validator)。

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 540px;
}
</style>
