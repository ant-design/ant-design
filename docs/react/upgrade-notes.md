---
order: 4
title:
  zh-CN: 升级指南
  en-US: Upgrade Notes
---

此处着重列出升级中的不兼容变化和推荐改动。所有变动请见 [更新日志](/changelog)。

## 0.12 => 1.0

`1.0.0` 之后将不再单独提供升级指南，请参考对应版本 [更新日志](/changelog#1.0.0) 中的 `不兼容改动` 部分进行升级。

## 0.11 => 0.12

---

### 使用 Form 提供的校验功能代替 Validation

Validation 已经被废弃，并会在以后的版本完全移除，所以建议尽快使用 Form 自带的校验功能替换 Validation。具体使用方式可以查阅文档和例子（[#1](http://ant.design/components/form/#demo-validate-basic) [#2](http://ant.design/components/form/#demo-validate-other) [#3](http://ant.design/components/form/#demo-validate-customized)）。

### Progress `format` 属性的值改为函数

把使用了 `format` 属性的代码，如：

```jsx
<Progress.Circle percent={100} format={<Icon type="check" />} />
```

改为：

```jsx
<Progress.Circle percent={100} format={() => <Icon type="check" />} />
```
### Tree
- `onSelect` 回调函数，由原来的`一个`参数，变为`两个`，第一个为`selectedKeys`，第二个参数为原来第一个参数里的其余信息。另外`selectedKeys`里包含了当前选中的节点key，而原来的不包含。
- `onCheck` 回调函数，由原来的`一个`参数，变为`两个`，第一个为`checkedKeys`，第二个参数为原来第一个参数里的其余信息。另外`checkedKeys`里包含了当前选中的节点key，而原来的不包含（这样免去业务里自己组装key的工作）。
- 异步API中`onDataLoaded`重命名为`loadData`，其他不用改。


## 0.10 => 0.11

---

`0.11.x` 版本有大量更新，其中部分为不兼容更新。以下列表为其中不兼容的更新及对应升级方案。如果您在升级过程中遇到下面没有提到的情况，可以到 Github 上面咨询。

- `0.11.x` 文档：http://ant.design
- `0.10.x` 文档：http://010x.ant.design

### 默认加载样式

样式现在不再会在 `antd` 中默认加载，如果升级后没有样式，开发者需要手动自行引入样式。

```js
import 'antd/lib/index.css';
// 或者
import 'antd/style/index.less';
```

### 表格远程模式

`Table` 的 `dataSource` 远程模式被移除，用户需要自行实现数据获取方式，ajax 获取数据的演示可以参见 [演示](http://ant.design/components/table/#demo-ajax)。

### Timepicker、Datepicker 重命名

`Timepicker` 被重命名为 `TimePicker`，`Datepicker` 被重命名为 `DatePicker`，需要做以下改动：

```jsx
<Timepicker /> ==> <TimePicker />
```

```jsx
<Datepicker /> ==> <DatePicker />
```

相应的，两个组件的文档地址也改为 [/components/date-picker](/components/date-picker) 和 [/components/time-picker](/components/time-picker)。

### 受控的 DatePicker

由于 `DatePicker` 已改为 [受控组件](https://facebook.github.io/react/docs/forms.html#controlled-components)，所以 `DatePicker` 显示的值必然与其 `value` 一致。

如果无法理解受控组件，只须在发现在选中日期后 `Datepicker` 显示的值不变的情况后，把其 `value` 属性改为 `defaultValue` 即可。

### TimePicker locale 结构改变

属性 `locale` 结构发生了 [变化](https://github.com/ant-design/ant-design/commit/fd1312803fd49586ded9af39d923457540c515cc#diff-fe4bfc98d91fc3dab8f391e3258622d4L1)，需要将原有的属性改为现有的[结构](https://github.com/ant-design/ant-design/issues/1270#issuecomment-201181384)。

### 其他

- Alert 组件默认不展示样式，可以用 `showIcon` 属性添加图标。
- 在 `0.10.x` 中 Datepicker 已废弃的 `onSelect` 属性被删除，请使用 `onChange` 属性。。
- TimePicker 的 `hourOptions` `minuteOptions` `secondOptions` 属性已移除，可使用 `disabledHours` `disabledMinutes` `disabledSeconds` 配和 `hideDisabled` 属性来完成原有功能。[演示](http://ant.design/components/time-picker/#picker-demo-disable-options)


## 0.9 => 0.10

---

`0.10.x` 版本有大量改动，是一个不完全向下兼容的版本。以下文档尽力列出了 `0.9.x` 到 `0.10.x` 的不兼容变动，以帮助开发者升级。

- `0.10.x` 文档：http://010x.ant.design
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

新版本变化较大，以上升级指南可能有遗漏，全部改动可以参考 [更新日志](/changelog)。在升级过程中遇到问题，欢迎 [报告](https://github.com/ant-design/ant-design/issues/new) 给我们。
