# Cascader

- category: Components
- chinese: 级联选择
- type: 表单

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
| displayRender | 选择后展示的渲染函数 | `function(label)`` | `function(label) { return label.join(' / ') }` |
| style | 自定义样式 | string | - |
| popupClassName | 自定义浮层类名 | string | - |
| placeholder | 输入框占位文本 | string | '请选择' |
| size | 输入框大小，可选 `large` `default` `small` | string | `default` |
