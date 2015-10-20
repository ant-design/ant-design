# Datepicker

- category: Components
- chinese: 日期选择框
- type: 表单

---

输入或选择日期/时间的控件。

## 何时使用

当用户需要输入一个日期/时间，可以点击标准输入框，弹出日期面板进行选择。支持键盘操作。

## API

```html
<Datepicker value="2015-01-01" />
```

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期           | string   | 无           |
| defaultValue | 默认日期       | string   | 无           |
| format       | 展示的日期格式 | string   | "yyyy-MM-dd" |
| disabledDate | 不可选择的日期 | function | 无           |
| onChange     | 日期发生变化的回调，发生在用户选择日期时 | function | 无           |
| showTime     | 显示时间选择条 | boolean  | false        |
| disabled     | 禁用           | bool     | false        |
| size         | 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px | string   | 无  |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 12px 12px 0;
}
</style>
