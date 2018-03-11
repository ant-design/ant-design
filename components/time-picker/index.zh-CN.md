---
category: Components
subtitle: 时间选择框
type: Data Entry
title: TimePicker
---

输入或选择时间的控件。

## 何时使用

* * *

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## API

* * *

```jsx
import moment from 'moment';
<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addon | 选择框底部显示自定义的内容 | function | 无 |
| allowEmpty | 是否展示清除按钮 | boolean | true |
| autoFocus | 自动获取焦点 | boolean | false |
| className | 选择器类名 | string | '' |
| clearText | 清除按钮的提示文案 | string | clear |
| defaultOpenValue | 当 defaultValue/value 不存在时，可以设置面板打开时默认选中的值 | [moment](http://momentjs.com/) | moment() |
| defaultValue | 默认时间 | [moment](http://momentjs.com/) | 无 |
| disabled | 禁用全部操作 | boolean | false |
| disabledHours | 禁止选择部分小时选项 | function() | 无 |
| disabledMinutes | 禁止选择部分分钟选项 | function(selectedHour) | 无 |
| disabledSeconds | 禁止选择部分秒选项 | function(selectedHour, selectedMinute) | 无 |
| format | 展示的时间格式 | string | "HH:mm:ss" |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| hideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |
| hourStep | 小时选项间隔 | number | 1 |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘）| boolean | false |
| minuteStep | 分钟选项间隔 | number | 1 |
| open | 面板是否打开 | boolean | false |
| placeholder | 没有值的时候显示的内容 | string | "请选择时间" |
| popupClassName | 弹出层类名 | string | '' |
| secondStep | 秒选项间隔 | number | 1 |
| use12Hours | 使用 12 小时制，为 true 时 `format` 默认为 `h:mm:ss a` | boolean | false |
| value | 当前时间 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调 | function(time: moment, timeString: string): void | 无 |
| onOpenChange | 面板打开/关闭时的回调 | (open: boolean): void | 无 |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
