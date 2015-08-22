# Form

- category: Components
- chinese: 表单
- type: 表单

---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。


### 表单

我们为 `form` 提供了以下两种排列方式：

- 水平排列：`.ant-form-horizontal` 类可以实现 `label` 标签和表单控件的水平排列;
- 行内排列：`.ant-form-inline` 类可使其表现为 inline-block 级别的控件。

### 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

在这里，我们使用 `.ant-form-item` 类来表示表单域，它包含了一个标签和一个输入控件。

为了获得更好的排列，请将 `label` 标签和 `<input>`、`<textarea>`、`<select>` 控件包裹在 `.ant-form-item` 中。
