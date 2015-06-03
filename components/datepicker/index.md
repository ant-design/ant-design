# Datepicker

- category: Components
- chinese: 日期选择框

---

点击标准输入框，弹出日期选择面板，选择日期和时间，支持键盘操作。

```jsx
<DatePicker value="2015-01-01" />
```

## API

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| value    | 日期           | string   | 无           |
| format   | 展示的日期格式 | string   | "yyyy-MM-dd" |
| disabled | 不可选择的日期 | function | 无           |
| onSelect | 选择日期的回调 | function | 无           |
| showTime | 显示时间选择条 | boolean  | false        |

<style>
.code-box-demo .rc-calendar-picker-input {
  width: 200px;
}
</style>
