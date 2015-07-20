# Datepicker

- category: Components
- chinese: 日期选择框
- order: 5

---

输入或选择日期/时间的控件。

## 何时使用

当用户需要输入一个日期/时间，可以点击标准输入框，弹出日期面板进行选择。支持键盘操作。

```html
<Datepicker value="2015-01-01" />
```

## API

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期           | string   | 无           |
| format       | 展示的日期格式 | string   | "yyyy-MM-dd" |
| disabledDate | 不可选择的日期 | function | 无           |
| onSelect     | 选择日期的回调 | function | 无           |
| showTime     | 显示时间选择条 | boolean  | false        |
| disabled     | 禁用           | bool     | false        |

<style>
.code-box-demo .ant-calendar-picker {
  width: 200px;
}
</style>
