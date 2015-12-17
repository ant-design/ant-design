# 升级指南

- category: 3
- order: 3

---

## 0.10 => 0.11 升级指南

`0.11.x` 版本有大量更新，其中部分为不兼容更新。以下列表为其中不兼容的更新，及对应升级方案。如果您在升级过程中遇到下面没有提到的情况，可以到 Github 上面咨询。

### Timepicker、Datepicker 重命名

`0.11.0` 中，`Timepicker` 被重命名为 `TimePicker`，`Datepicker` 被重命名为 `DatePicker`，所以需要做以下改动：

```jsx
<Timepicker />
  ==>
<TimePicker />
```


```jsx
<Datepicker />
  ==>
<DatePicker />
```

### 受控的 DatePicker

由于 `DatePicker` 已改为 [受控组件](https://facebook.github.io/react/docs/forms.html#controlled-components)，所以 `DatePicker` 显示的值必然与其 `value` 一致。

如果无法理解受控组件，只须在发现在选中日期后 `Datepicker` 显示的值不变的情况后，把其 `value` 属性改为 `defaultValue` 即可。

### 其它

- `Table` 的 `dataSource` 远程模式被移除，用户应该自行实现数据获取方式，具体方案参见 [演示](TODO)。


## 0.9 => 0.10 升级指南

`0.10.x` 版本有大量改动，是一个不完全向下兼容的版本。以下文档尽力列出了 `0.9.x` 到 `0.10.x` 的不兼容变动，以帮助开发者升级。

- `0.10.x` 文档：http://ant.design
- `0.9.x` 文档：http://09x.ant.design

### 升级 React

新版本推荐使用 react@0.14.x 及以上版本，并增加了对低版本 react 的警告。建议进行同步升级，参考官方的[升级文档](http://facebook.github.io/react/blog/2015/10/07/react-v0.14.html)。

### 组件化改造

此版本对 [Button](/components/button/)、[Iconfont](/components/icon/)、[Layout](/components/layout/)、[Form](/components/form/)、[Input](/components/form/#demo-input) 模块进行了 React 组件化的改造，请基于新的使用方式修改，原有的书写方式理论上无影响。

例如：

```html
<button className="ant-btn ant-btn-primary">按 钮</button>
  ==>
<Button type="primary">按钮</Button>
```

```html
<i className="anticon anticon-appstore"></i>
  ==>
<Icon type="appstore" />
```

### size 属性统一

原有组件的 `size` 属性统一为大中小：`large` `default` `small`，包括 `Button` `Table` `Tabs` `Steps` `Select` `Pagination` `InputNumber` `Datepicker`。

例如：

```html
<Tabs size="mini"> ... </Tabs>
  ==>
<Tabs size="small"> ... </Tabs>
```

详情可参考：https://github.com/ant-design/ant-design/issues/415

### 其他

- [enter-animation](http://09x.ant.design/components/enter-animation) 组件下线， 请使用 [queue-anim](/components/queue-anim) 来代替。
- Carousel 升级依赖，参考新的[新的 API 和使用方式](/components/carousel/)进行修改。
- `antd.Notification()` 修改为小写的 `antd.notification()`。
- Datepicker 的 `onSelect` 属性修改为 `onChange` 属性。
- Datepicker 的 `calendarStyle` 属性修改为 `popupStyle` 属性。
- Dropdown 的 `onSelect` 属性应修正为 `onClick` 属性，因为原有的 onSelect 只在变化时触发。
- Slider 的 `withDots` `isIncluded` 属性修改为 `dots` `included`。
- iconfont 的基线更新，可能导致原有图标的位置偏移。

新版本变化较大，以上升级指南可能有遗漏，全部改动可以参考 [Changelog](/changelog)。在升级过程中遇到问题，欢迎 [报告](https://github.com/ant-design/ant-design/issues/new) 给我们。
