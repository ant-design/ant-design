# Select

- category: Components
- chinese: 选择器
- order: 3

---

类似 Select2 的选择器。

## 何时使用

弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

## API

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| value    | specify the default selected item(s) | string/Array<String>   |  无  |
| multiple   | can select more than one option |   | false |
| filterOption | whether filter options by input value |  | true     |
| tags | when tagging is enabled the user can select from pre-existing options or create a new tag by picking the first choice, which is what the user has typed into the search box so far. | |false |
| allowClear | show clear button | | false |
| combobox | enable combobox mode(can not set multiple at the same time) | | false |
| onSelect | called when a option is selected. param is option's value | function | 无   |
| onDeselect | called when a option is deselected. param is option's value. only called for multiple or tags | function | 无   |
| onChange | called when select an option or input value change(combobox) | function | 无 |

