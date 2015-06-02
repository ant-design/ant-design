# Datepicker

- category: Components
- chinese: 日期选择框

---

点击标准输入框，弹出日期选择面板，选择日期和时间，支持键盘操作。

## API

```jsx
<DatePicker value="2015-01-01" />
```

- **value** `string`

  初始值，如 `2015-01-01`。

- **format** `string`

  显示的日期格式，默认为 `yyyy-MM-dd`。

- **showTime** `bollean`

  显示时间选择条，默认为 `false`。

- **disabled** `function`

  不可选择的日期。

- **onSelect** `function`

  选择日期的回调。

<style>
.rc-calendar-picker-input {
  width: 200px;
}
</style>
