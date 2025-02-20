---
category: Components
group: 数据录入
title: Radio
subtitle: 单选框
description: 用于在多个备选项中选中单个状态。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mrPVRope68wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xPfTSphsiA0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

```tsx
// 使用 Radio.Group 组件时，推荐的写法 ✅
return (
  <Radio.Group
    value={value}
    options={[
      { value: 1, label: 'A' },
      { value: 2, label: 'B' },
      { value: 3, label: 'C' },
    ]}
  />
);

// 不推荐的写法 🙅🏻‍♀️
return (
  <Radio.Group value={value}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
  </Radio.Group>
);
```

## 代码演示

<!-- prettier-ignore-start -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/disabled.tsx">不可用</code>
<code src="./demo/radiogroup.tsx">单选组合</code>
<code src="./demo/radiogroup-more.tsx">Radio.Group 垂直</code>
<code src="./demo/radiogroup-block.tsx" version="5.21.0">Block 单选组合</code>
<code src="./demo/radiogroup-options.tsx">Radio.Group 组合 - 配置方式</code>
<code src="./demo/radiobutton.tsx">按钮样式</code>
<code src="./demo/radiogroup-with-name.tsx">单选组合 - 配合 name 使用</code>
<code src="./demo/size.tsx">大小</code>
<code src="./demo/radiobutton-solid.tsx">填底的按钮样式</code>
<code src="./demo/badge.tsx" debug>测试 Badge 的样式</code>
<code src="./demo/wireframe.tsx" debug>线框风格</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/debug-upload.tsx" debug>Upload Debug</code>
<!-- prettier-ignore-end -->

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Radio/Radio.Button

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 禁用 Radio | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any | - |

### Radio.Group

单选框组合，用于包裹一组 `Radio`。

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | `outline` \| `solid` | `outline` |  |  |
| defaultValue | 默认选中的值 | any | - |  |  |
| disabled | 禁选所有子单选器 | boolean | false |  |  |
| name | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性。若未设置，则将回退到随机生成的名称 | string | - |  |  |
| options | 以配置形式设置子元素 | string\[] \| number\[] \| Array&lt;[CheckboxOptionType](#checkboxoptiontype)> | - |  |  |
| optionType | 用于设置 Radio `options` 类型 | `default` \| `button` | `default` | 4.4.0 |  |
| size | 大小，只对按钮样式生效 | `large` \| `middle` \| `small` | - |  |  |
| value | 用于设置当前选中的值 | any | - |  |  |
| block | 将 RadioGroup 宽度调整为其父宽度的选项 | boolean | false | 5.21.0 |  |
| onChange | 选项变化时的回调函数 | function(e:Event) | - |  |  |

### CheckboxOptionType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| label | 用于作为 Radio 选项展示的文本 | `string` | - | 4.4.0 |
| value | 关联 Radio 选项的值 | `string` \| `number` \| `boolean` | - | 4.4.0 |
| style | 应用到 Radio 选项的 style | `React.CSSProperties` | - | 4.4.0 |
| disabled | 指定 Radio 选项是否要禁用 | `boolean` | `false` | 4.4.0 |
| title | 添加 Title 属性值 | `string` | - | 4.4.0 |
| id | 添加 Radio Id 属性值 | `string` | - | 4.4.0 |
| onChange | 当 Radio Group 的值发送改变时触发 | `(e: CheckboxChangeEvent) => void;` | - | 4.4.0 |
| required | 指定 Radio 选项是否必填 | `boolean` | `false` | 4.4.0 |

## 方法

### Radio

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Radio"></ComponentTokenTable>
