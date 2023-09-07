---
category: Components
subtitle: 开关
group: 数据录入
title: Switch
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rtArRpBNDZcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*al07RK8SGf4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox` 的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/disabled.tsx">不可用</code>
<code src="./demo/text.tsx">文字和图标</code>
<code src="./demo/size.tsx">两种大小</code>
<code src="./demo/loading.tsx">加载中</code>
<code src="./demo/component-token.tsx" debug>自定义组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 组件自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| checkedChildren | 选中时的内容 | ReactNode | - |
| className | Switch 器类名 | string | - |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| loading | 加载中的开关 | boolean | false |
| size | 开关大小，可选值：`default` `small` | string | `default` |
| unCheckedChildren | 非选中时的内容 | ReactNode | - |
| onChange | 变化时的回调函数 | function(checked: boolean, event: Event) | - |
| onClick | 点击时的回调函数 | function(checked: boolean, event: Event) | - |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

## 主题变量（Design Token）

<ComponentTokenTable component="Switch"></ComponentTokenTable>

## FAQ

### 为什么在 Form.Item 下不能绑定数据？

Form.Item 默认绑定值属性到 `value` 上，而 Switch 的值属性为 `checked`。你可以通过 `valuePropName` 来修改绑定的值属性。

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Switch />
</Form.Item>
```
