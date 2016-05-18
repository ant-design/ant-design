---
category: Components
chinese: 级联选择
type: Form Control
english: Cascader
---

级联选择框。


## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

```html
<Cascader options={options} onChange={onChange} />
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 可选项数据源 | object | - |
| defaultValue | 默认的选中项 | array  |[] |
| value | 指定选中项 | array  | - |
| onChange | 选择完成后的回调 | `function(value, selectedOptions)` | - |
| displayRender | 选择后展示的渲染函数 | `function(label, selectedOptions)` | `label => label.join(' / ')` |
| style | 自定义样式 | string | - |
| className | 自定义类名 | string | - |
| popupClassName | 自定义浮层类名 | string | - |
| popupPlacement | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` |
| placeholder | 输入框占位文本 | string | '请选择' |
| size | 输入框大小，可选 `large` `default` `small` | string | `default` |
| disabled | 禁用 | boolean | false |
| allowClear | 是否支持清除 | boolean | true |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | string | 'click' |
| changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示 | boolean | false |
