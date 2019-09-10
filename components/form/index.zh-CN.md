---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 表单

我们为 `form` 提供了以下三种排列方式：

- 水平排列：标签和表单控件水平排列；（默认）
- 垂直排列：标签和表单控件上下垂直排列；
- 行内排列：表单项水平行内排列。

## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们封装了表单域 `<Form.Item />` 。

```jsx
<Form.Item {...props}>{children}</Form.Item>
```

## API

### Form

**更多示例参考 [rc-form](http://react-component.github.io/form/)**。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| form | 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性 | object | - |  |
| hideRequiredMark | 隐藏所有表单项的必选标记 | Boolean | false |  |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' | 3.15.0 |
| labelCol | （3.14.0 新增，之前的版本只能设置到 FormItem 上。）label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col) |  | 3.14.0 |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |  |
| onSubmit | 数据验证成功后回调事件 | Function(e:Event) |  |  |
| wrapperCol | （3.14.0 新增，之前的版本只能设置到 FormItem 上。）需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](https://ant.design/components/grid-cn/#Col) |  | 3.14.0 |
| colon | 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效) | boolean | true | 3.15.0 |

### Form.create(options)

使用方式如下：

```jsx
class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);
```

`options` 的配置项如下。

| 参数 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| mapPropsToFields | 把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 [`Form.createFormField`](#Form.createFormField) 标记，注意表单项将变成受控组件, error 等也需要一并手动传入 | (props) => ({ \[fieldName\]: FormField { value } }) |  |
| name | 设置表单域内字段 id 的前缀 | - | 3.12.0 |
| validateMessages | 默认校验信息，可用于把默认错误信息改为中文等，格式与 [newMessages](https://github.com/yiminghe/async-validator/blob/master/src/messages.js) 返回值一致 | Object { \[nested.path]: String } |  |
| onFieldsChange | 当 `Form.Item` 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store | Function(props, changedFields, allFields) |  |
| onValuesChange | 任一表单域的值发生改变时的回调 | (props, changedValues, allValues) => void |  |

经过 `Form.create` 之后如果要拿到 `ref`，可以使用 `rc-form` 提供的 `wrappedComponentRef`，[详细内容可以查看这里](https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140)。

```jsx
class CustomizedForm extends React.Component { ... }

// use wrappedComponentRef
const EnhancedForm =  Form.create()(CustomizedForm);
<EnhancedForm wrappedComponentRef={(form) => this.form = form} />
this.form // => The instance of CustomizedForm
```

经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性，`this.props.form` 提供的 API 如下：

> 注意：使用 `getFieldsValue` `getFieldValue` `setFieldsValue` 等时，应确保对应的 field 已经用 `getFieldDecorator` 注册过了。

| 方法 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| getFieldDecorator | 用于和表单进行双向绑定，详见下方描述 |  |  |
| getFieldError | 获取某个输入控件的 Error | Function(name) |  |
| getFieldsError | 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error | Function(\[names: string\[]]) |  |
| getFieldsValue | 获取一组输入控件的值，如不传入参数，则获取全部组件的值 | Function(\[fieldNames: string\[]]) |  |
| getFieldValue | 获取一个输入控件的值 | Function(fieldName: string) |  |
| isFieldsTouched | 判断是否任一输入控件经历过 `getFieldDecorator` 的值收集时机 `options.trigger` | (names?: string\[]) => boolean |  |
| isFieldTouched | 判断一个输入控件是否经历过 `getFieldDecorator` 的值收集时机 `options.trigger` | (name: string) => boolean |  |
| isFieldValidating | 判断一个输入控件是否在校验状态 | Function(name) |  |
| resetFields | 重置一组输入控件的值（为 `initialValue`）与状态，如不传入参数，则重置所有组件 | Function(\[names: string\[]]) |  |
| setFields | 设置一组输入控件的值与错误状态：[代码](https://github.com/react-component/form/blob/3b9959b57ab30b41d8890ff30c79a7e7c383cad3/examples/server-validate.js#L74-L79) | ({<br />&nbsp;&nbsp;\[fieldName\]: {value: any, errors: \[Error\] }<br />}) => void |  |
| setFieldsValue | 设置一组输入控件的值（注意：不要在 `componentWillReceiveProps` 内使用，否则会导致死循环，[原因](https://github.com/ant-design/ant-design/issues/2985)） | (<br />&nbsp;&nbsp;{ \[fieldName\]&#x3A; value },<br />&nbsp;&nbsp;callback: Function<br />) => void |  |
| validateFields | 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件 | (<br />&nbsp;&nbsp;\[fieldNames: string\[]],<br />&nbsp;&nbsp;\[options: object\],<br />&nbsp;&nbsp;callback(errors, values)<br />) => void |  |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 | 参考 `validateFields` |  |

### validateFields/validateFieldsAndScroll

```jsx
const {
  form: { validateFields },
} = this.props;
validateFields((errors, values) => {
  // ...
});
validateFields(['field1', 'field2'], (errors, values) => {
  // ...
});
validateFields(['field1', 'field2'], options, (errors, values) => {
  // ...
});
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| options.first | 若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验 | boolean | false | 3.9.3 |
| options.firstFields | 指定表单域会在碰到第一个失败了的校验规则后停止校验 | String\[] | \[] | 3.9.3 |
| options.force | 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验 | boolean | false | 3.9.3 |
| options.scroll | 定义 validateFieldsAndScroll 的滚动行为，详细配置见 [dom-scroll-into-view config](https://github.com/yiminghe/dom-scroll-into-view#function-parameter) | Object | {} | 3.9.3 |

#### validateFields 的 callback 参数示例

- `errors`:

  ```js
  {
    "username": {
      "errors": [
        {
          "message": "Please input your username!",
          "field": "username"
        }
      ]
    },
    "password": {
      "errors": [
        {
          "message": "Please input your Password!",
          "field": "password"
        }
      ]
    }
  }
  ```

- `values`:

  ```js
  {
    "username": "username",
    "password": "password",
  }
  ```

### Form.createFormField

用于标记 `mapPropsToFields` 返回的表单域数据，[例子](#components-form-demo-global-state)。

### this.props.form.getFieldDecorator(id, options)

经过 `getFieldDecorator` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件。
2. 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。
3. 你不应该用 `setState`，可以使用 `this.props.form.setFieldsValue` 来动态改变表单值。

#### 特别注意

如果使用的是 `react@<15.3.0`，则 `getFieldDecorator` 调用不能位于纯函数组件中: <https://github.com/facebook/react/pull/6534>

#### getFieldDecorator(id, options) 参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| id | 必填输入控件唯一标志。支持嵌套式的[写法](https://github.com/react-component/form/pull/48)。 | string |  |  |
| options.getValueFromEvent | 可以把 onChange 的参数（如 event）转化为控件的值 | function(..args) | [reference](https://github.com/react-component/form#option-object) |  |
| options.initialValue | 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 `===` 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量)) |  |  |  |
| options.normalize | 转换默认的 value 给控件，[一个选择全部的例子](https://codepen.io/afc163/pen/JJVXzG?editors=001) | function(value, prevValue, allValues): any | - |  |
| options.preserve | 即便字段不再使用，也保留该字段的值 | boolean | - | 3.12.0 |
| options.rules | 校验规则，参考下方文档 | object\[] |  |  |
| options.trigger | 收集子节点的值的时机 | string | 'onChange' |  |
| options.validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验 | boolean | false |  |
| options.validateTrigger | 校验子节点值的时机 | string\|string\[] | 'onChange' |  |
| options.valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | 'value' |  |

更多参数请查看 [rc-form option](https://github.com/react-component/form#option-object)。

### Form.Item

注意：一个 Form.Item 建议只放一个被 getFieldDecorator 装饰过的 child，当有多个被装饰过的 child 时，`help` `required` `validateStatus` 无法自动生成。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | boolean | true |  |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|ReactNode |  |  |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |  |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|ReactNode |  |  |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string |  | 3.17.0 |
| label | label 标签的文本 | string\|ReactNode |  |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。在 3.14.0 之后，你可以通过 Form 的 labelCol 进行统一设置。当和 Form 同时设置时，以 FormItem 为准。 | [object](https://ant.design/components/grid/#Col) |  |  |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | false |  |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string |  |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。在 3.14.0 之后，你可以通过 Form 的 wrapperCol 进行统一设置。当和 Form 同时设置时，以 FormItem 为准。 | [object](https://ant.design/components/grid/#Col) |  |  |

### 校验规则

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| enum | 枚举类型 | string | - |  |
| len | 字段长度 | number | - |  |
| max | 最大长度 | number | - |  |
| message | 校验文案 | string\|ReactNode | - |  |
| min | 最小长度 | number | - |  |
| pattern | 正则表达式校验 | RegExp | - |  |
| required | 是否必选 | boolean | `false` |  |
| transform | 校验前转换字段值 | function(value) => transformedValue:any | - |  |
| type | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | string | 'string' |  |
| validator | 自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） | function(rule, value, callback) | - |  |
| whitespace | 必选时，空格是否会被视为错误 | boolean | `false` |  |

更多高级用法可研究 [async-validator](https://github.com/yiminghe/async-validator)。

## 在 TypeScript 中使用

```tsx
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface UserFormProps extends FormComponentProps {
  age: number;
  name: string;
}

class UserForm extends React.Component<UserFormProps, any> {
  // ...
}

const App = Form.create<UserFormProps>({
  // ...
})(UserForm);
```

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:last-child {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>

## FAQ

### 自定义 validator 没有效果

这是由于你的 `validator` 有错误导致 `callback` 没有执行到。你可以选择通过 `async` 返回一个 promise 或者使用 `try...catch` 进行错误捕获：

```jsx
validator: async (rule, value) => {
  throw new Error('Something wrong!');
}

// or

validator(rule, value, callback) => {
  try {
    throw new Error('Something wrong!');
  } catch (err) {
    callback(err);
  }
}
```
