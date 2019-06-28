---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
---

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 设置 Form 渲染元素，为 `false` 则不创建 DOM 节点 | ComponentType \| false | form |
| colon | 配置 Form.Item 的 colon 的默认值 | boolean | true |
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用 | [FieldData](#FieldData)\[] | - |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance](#FormInstance) | - |
| hideRequiredMark | 隐藏所有表单项的必选标记 | boolean | false |
| initialValues | 默认值，只有初始化以及重置时生效 | object | - |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col) |  |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - |
| validateMessages | 验证提示模板 | [ValidateMessages](<(https://github.com/react-component/field-form/blob/master/src/utils/messages.ts)>) | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](https://ant.design/components/grid/#Col) |  |
| onFinish | 数据验证成功后回调事件 | Function(values) | - |
| onFieldsChange | 字段更新时触发回调事件 | Function(changedFields, allFields) | - |
| onValuesChange | 字段值更新时触发回调事件 | Function(changedValues, allValues) | - |

## Form.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colon | 配合 `label` 属性使用，表示是否显示 `label` 后面的冒号 | boolean | true |
| dependencies | 设置依赖字段，依赖变更时会触发重新渲染以及校验 | [NamePath](#NamePath)[] | - |
| extra | 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|ReactNode | - |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any[]) => any | - |
| hasFeedback | 配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|ReactNode | - |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string | - |
| label | `label` 标签的文本 | string\|ReactNode | - |
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 Form 的 `labelCol` 进行统一设置。当和 Form 同时设置时，以 Item 为准 | [object](/components/grid/#Col) | - |
| name | 字段名，支持数组 | [NamePath](#NamePath) | - |
| normalize | 转换字段值给控件 | (value, prevValue, prevValues) => any | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | false |
| rules | 校验规则 | [Rule](#Rule)[] | - |
| shouldUpdate | 随着表单数据变更强制更新 Item，只有在未设置 `name` 时有效 | boolean | false |
| trigger | 设置收集字段值变更的时机 | string | onChange |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string |  |
| validateTrigger | 设置字段校验的时机 | string \| string[] | onChange |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | value |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 Form 的 `wrapperCol` 进行统一设置。当和 Form 同时设置时，以 Item 为准。 | [object](/components/grid/#Col) |  |

### FormInstance

| 名称 | 说明 |
| --- | --- |
| getFieldValue | 获取对应字段名的值 | (name: [NamePath](#NamePath)) => any |
| getFieldsValue | 获取一组字段名对应的值，会按照对应结构返回 | (nameList?: [NamePath](#NamePath)[]) => any |
| getFieldError | 获取对应字段名的错误信息 | (name: [NamePath](#NamePath)) => string[] |
| getFieldsError | 获取一组字段名对应的错误信息，返回为数组形式 | (nameList?: [NamePath](#NamePath)[]) => FieldError[] |
| isFieldTouched | 检查对应字段是否被用户操作过 | (name: [NamePath](#NamePath)) => boolean |
| isFieldsTouched | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过 | (nameList?: [NamePath](#NamePath)[], allTouched?: boolean) => boolean |
| isFieldValidating | 检查一组字段是否正在校验 | (name: [NamePath](#NamePath)) => boolean |
| resetFields | 重置一组字段到 `initialValues` | (fields?: [NamePath](#NamePath)[]) => void |
| setFields | 设置一组字段状态 | (fields: FieldData[]) => void |
| setFieldsValue | 设置表单的值 | (values) => void |
| validateFields | 触发表单验证 | (nameList?: [NamePath](#NamePath)[]) => Promise |

### Interface

#### NamePath

`string | number | (string | number)[]`

#### FieldData

| Prop       | Type                                     |
| ---------- | ---------------------------------------- |
| touched    | boolean                                  |
| validating | boolean                                  |
| errors     | string[]                                 |
| name       | string \| number \| (string \| number)[] |
| value      | any                                      |

#### Rule

| Prop            | Type                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| enum            | any[]                                                                         |
| len             | number                                                                        |
| max             | number                                                                        |
| message         | string                                                                        |
| min             | number                                                                        |
| pattern         | RegExp                                                                        |
| required        | boolean                                                                       |
| transform       | (value) => any                                                                |
| type            | string                                                                        |
| validator       | ([rule](#Rule), value, callback: (error?: string) => void) => Promise \| void |
| whitespace      | boolean                                                                       |
| validateTrigger | string \| string[]                                                            |

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:last-child {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
