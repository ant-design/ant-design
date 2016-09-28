---
order: 3
title: Change Log
toc: false
timeline: true
---

If you want to read change logs before `2.0.0`, please visit [GitHub](https://github.com/ant-design/ant-design/releases?after=2.0.0).

---

After four months, `antd@2.0.0` is published. We had refactored code and improve functionalities and details of existing components. What's more, we provide English version of the documentation. The antd community help us a lot in developing `antd@2.0.0`.

If you meet any problem while you try to upgrade from `antd@1.0.0`, feel free to [create issues on GitHub](https://github.com/ant-design/ant-design/issues).

### 2.x Major changes

* Refactor components with TypeScript, and provide **`.d.ts` files which are officially supported**. Thanks to all the developers that contributed to [#1846](https://github.com/ant-design/ant-design/issues/1846) and @infeng.
* **Translate the documentation into English**, and we are going to provide both of Chinese and English versions of the documentation in the future. Thanks to all the translators and reviewers that contributed to [#1471](https://github.com/ant-design/ant-design/issues/1471).
* DatePicker, TimePicker, Calendar and other components that are designed to select time **are refactored to replace [gregorian-calendar](github.com/yiminghe/gregorian-calendar) with [moment](http://momentjs.com/)**.
* All the [icons](http://ant.design/components/icon/) are re-designed.
* New component [Mention](http://ant.design/components/mention/).
* New component [AutoComplete](http://ant.design/components/auto-complete/).
* The `getFieldProps` of Form is replaced with `getFieldDecorator` which will warn developers if they make mistakes. Related discussion [#1533](https://github.com/ant-design/ant-design/issues/1533).
* Table supports [grouping columns](http://ant.design/components/table/#components-table-demo-grouping-columns). @yesmeck
* Removed components and features which are deprecated in `antd@1.x`, such as QueueAnim, Validation, Form.ValueMixin, Progress.Line, Progress.Circle, Popover[overlay] and Slider[marks] will not support array any more.

### 2.x Breaking changes

There are some breaking changes in `antd@2.0.0`, and you need to modify your code to work with it.

* `value` and `defaultValue` of all the time-related components will not support type `String/Date`, please use [moment](http://momentjs.com/):
  ```diff
  - <TimePicker defaultValue="12:08:23" />
  + <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />

  - <DatePicker defaultValue="2015/01/01" />
  + <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} />

  - <Calendar defaultValue={new Date('2010-10-10')} />
  + <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')} />
  ```
* Parameters of type `Date/GregorianCalendar` of functions such as `onChange` and `onPanelChange`, plus other callback functions had been changed to type moment. Please consult [APIs of gregorian-calendar](https://github.com/yiminghe/gregorian-calendar) and [APIs of moment](http://momentjs.com/docs/), and update your code accordingly. Because the return value of `JSON.stringy(date: moment)` will lost time zone, we should use `.format` to convert date to string first, see related issue [#3082](https://github.com/ant-design/ant-design/issues/3082) for details:
  ```js
  handleSubmit() {
    const values = this.props.form.getFieldsValue();
    values.date = values.date.format('YYYY-MM-DD HH:mm:ss'); // or other format
    const data = JSON.stringify(values);
    // send data to server
  }
  ```
* The `format` of time-related components is the same as [moment's format](http://momentjs.com/docs/) now.
* `linkRender` and `nameRender` of Breadcrumb are removed, please use `itemRender`.
* `onClose` and `onOpen` of Menu are removed, please use `onOpenChange`. As being totally different, please check [this demo](http://beta.ant.design/components/menu/#components-menu-demo-sider-current) first.
* Paging columns of Table were removed, please use [fixed columns](http://ant.design/components/table/#components-table-demo-fixed-columns).

The following change will throw some warnings in the console and it will still work, but we recommend to update your code.

* `getFieldProps` of Form is deprecated, please use `getFieldDecorator`:
  ```diff
  + getFieldDecorator('userName', { ... })(
      <Input placeholder="请输入账户名"
  -     {...getFieldProps('userName', { ... })}
      />
  + )
  ```
* `toggleOpen` of DatePicker is deprecated, please use `onOpenChange`:
  ```diff
  - handleToggleOpen({ open }) {
  + handleOpenChange(open) {
    ...
  }
  ```

### 2.x Bug fixes

* Dropdown.Button[disabled] should work. [#3070](https://github.com/ant-design/ant-design/issues/3070)
* `option.withRef` of Form.create should work. [#2843](https://github.com/ant-design/ant-design/issues/2843)
* Fix slow response of expanding sub menu in Menu[inline] mode. [#2701](https://github.com/ant-design/ant-design/issues/2701)
* The button of Modal.confirm(and so on) should not be clickable while it is closed asynchronously. [#2684](https://github.com/ant-design/ant-design/issues/2684)
* `format` of DatePicker[showTime] should work. [#3123](https://github.com/ant-design/ant-design/issues/3123)
* Fix Table[dataSource] treat key whose value is `0` as inexisting. [#3166](https://github.com/ant-design/ant-design/pull/3166) @noonnightstorm
* Tree.Node should not show arrow if it has no child nodes. [#2616](https://github.com/ant-design/ant-design/issues/2616)
* Fix cursor style of arrows that are hidden of Tree.Node. [#2748](https://github.com/ant-design/ant-design/issues/2748)

### 2.x Other improvements

* Alert supports [`banner` mode](http://ant.design/components/alert/#components-alert-demo-banner).
* BackTop will scroll to top with animation.
* Badge supports [status dot mode](http://ant.design/components/badge/#components-badge-demo-status).
* Cascader supports [searching options directly](http://ant.design/components/cascader/#components-cascader-demo-search).
* Checkbox supports [indeterminate mode](http://ant.design/components/checkbox/#components-checkbox-demo-check-all).
* Form supports [vertical layout](http://ant.design/components/form/#components-form-demo-validate-customized).
* InputNumber supports long press to increase/decrease number. [#](http://ant.design/components/input-number/#components-input-number-demo-basic)
* notification supports [customized icon](http://ant.design/components/notification/#components-notification-demo-custom-icon).
* Spin allows [customized tips and animation work together](http://ant.design/components/spin/#components-spin-demo-tip). @jerrybendy
* Transfer can handle event while options are checked/unchecked. [#](http://ant.design/components/transfer/#components-transfer-demo-basic)
* Transfer can determine [whether an option is checkable](http://ant.design/components/transfer/#components-transfer-demo-basic).
* Improve style of Alert and notification.
* Modal.confirm(and so on) can be closed by keyboard. @Dafrok
* Improve the user experience of [selecting time in DatePicker](http://ant.design/components/date-picker/#components-date-picker-demo-time).
* Improve the status changed animation of [Spin](http://ant.design/components/spin/#components-spin-demo-nested ).
* Update [font-family](https://github.com/ant-design/ant-design/commit/2f308b0f995cfcb2a3c8feb1e35ffd3f0bf93cfc).

### 2.x Workflow

* [AntD Library](http://library.ant.design/) a collection of Axure files which includes components and patterns that follow Ant Design Specification.
* Rename `babel-plugin-antd` to [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import), and this means that `babel-plugin-import` becomes an common load-on-demand solution and not just for `antd`.
  Please update `package.json`:
  ```diff
  {
    "devDependencies": {
  -   "babel-plugin-antd": "^0.x.x",
  +   "babel-plugin-import": "^1.0.0",
    }
  }
  ```
  And update your babel config in `.babelrc` or other place:
  ```diff
  {
  -  "plugins": [["antd", { style: "css" }]]
  +  "plugins": [["import", { libraryName: "antd", style: "css" }]]
  }
  ```
* [`dva@1.0.0`](https://github.com/dvajs/dva) is published and it is officially recommended framework [in real world](http://ant.design/docs/react/practical-projects).
* The officially recommended scaffold is [`dva-cli`](https://github.com/dvajs/dva-cli) now, the old `antd-init` is just for studying and demo.

## 1.0.0

Visit [GitHub](https://github.com/ant-design/ant-design/releases?after=2.0.0) to read change logs from `0.x` to `1.x`。
