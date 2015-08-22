# Datepicker

- category: Components
- chinese: 日期选择框
- type: 表单

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
| defaultValue | 默认日期       | string   | 无           |
| format       | 展示的日期格式 | string   | "yyyy-MM-dd" |
| disabledDate | 不可选择的日期 | function | 无           |
| onSelect     | 选择日期的回调 | function | 无           |
| showTime     | 显示时间选择条 | boolean  | false        |
| disabled     | 禁用           | bool     | false        |
| size         | 输入框大小，`large`代表高为32px，`small`代表高为22px，默认28px      | string   | 无        |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 12px 12px 0;
}
</style>
