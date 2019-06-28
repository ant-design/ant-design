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
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用 | FieldData\[] | - |
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

### FormInstance

| 名称 | 说明 |
| ---- | ---- |


<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:last-child {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
