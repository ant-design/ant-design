---
category: Components
chinese: 自动完成
type: Form Controls
cols: 1
english: AutoComplete
---

输入框自动完成功能。

## 何时使用

需要自动完成时。

## API

```jsx
const dataSource = ['12345', '23456', '34567'];
<AutoComplete dataSource={dataSource} />
```


| 参数           | 说明                             | 类型        | 默认值 |
|----------------|----------------------------------|------------|---------|
| dataSource          | 自动完成的数据源 | Array     |         | 
| value    | 指定当前选中的条目 | String/Array<String>/{key: String, label: React.Node}/Array<{key, label}>   |  无  |
| defaultValue | 指定默认选中的条目 | String/Array<String>/{key: String, label: React.Node}/Array<{key, label}>   |  无  |
| allowClear   | 支持清除, 单选模式有效 | boolean | false |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value) | 无 |
| disabled | 是否禁用 | boolean | false |