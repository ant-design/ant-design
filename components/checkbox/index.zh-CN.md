---
category: Components
subtitle: 多选框
type: 数据录入
title: Checkbox
---

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

### 属性

#### Checkbox

| 参数           | 说明                                    | 类型              | 默认值 | 版本  |
| -------------- | --------------------------------------- | ----------------- | ------ | ----- |
| autoFocus      | 自动获取焦点                            | boolean           | false  | 3.6.2 |
| checked        | 指定当前是否选中                        | boolean           | false  | 3.6.2 |
| defaultChecked | 初始是否选中                            | boolean           | false  | 3.6.2 |
| disabled       | 失效状态                                | boolean           | false  | 3.6.2 |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制 | boolean           | false  | 3.6.2 |
| onChange       | 变化时回调函数                          | Function(e:Event) | -      | 3.6.2 |

#### Checkbox Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认选中的选项 | string\[] | \[] | 3.6.2 |
| disabled | 整组失效 | boolean | false | 3.6.2 |
| name | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | string | - | 3.16.0 |
| options | 指定可选项 | string\[] \| Option\[] | \[] | 3.6.2 |
| value | 指定选中的选项 | string\[] | \[] | 3.6.2 |
| onChange | 变化时回调函数 | Function(checkedValue) | - | 3.6.2 |

##### Option

```typescript
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

### 方法

#### Checkbox

| 名称    | 描述     | 版本  |
| ------- | -------- | ----- |
| blur()  | 移除焦点 | 3.6.2 |
| focus() | 获取焦点 | 3.6.2 |
