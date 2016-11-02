---
order: 3
title: Change Log
toc: false
timeline: true
---

If you want to read change logs before `2.0.0`, please visit [GitHub](https://github.com/ant-design/ant-design/releases?after=2.0.0).

---

## 2.2.1

`2016-11-02`

* Fix controlled DatePicker[showTime] not working bug. [#3665](https://github.com/ant-design/ant-design/issues/3665)

## 2.2.0

`2016-10-28`

* Supports TypeScript@2.0. [@AlbertZheng](https://github.com/AlbertZheng) [#3358](https://github.com/ant-design/ant-design/issues/3358)
* Not rely on specific version of React now. [#3627](https://github.com/ant-design/ant-design/pull/3627)
* Alert supports `className` `style`.
* DatePicker & MonthPicker & RangePicker allow developers to set whether to show the clear button. [#3618](https://github.com/ant-design/ant-design/issues/3618)
* Form.Item can generate `validateStatus` & `help` for nested form control automatically. [#3212](https://github.com/ant-design/ant-design/issues/3212)
* RangePicker can set some hours or minutes or seconds to be not selectable. [#](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date)
* Switch
  * The width of Switch will resize automatically, according to `checkedChildren/unCheckedChildren`. [#3380](https://github.com/ant-design/ant-design/issues/3380)
  * Improve the switch animation.
* Upload can [customized request](https://github.com/react-component/upload#customrequest) now. [@edgji](https://github.com/edgji)
* Icon
  * New icons `bulb` `select` `like-o` `dislike-o`.
  * Adjust existing icons `loading` `like` `dislike`.
* Improve the TypeScript definition of Card & DatePicker & Icon & Table. [@infeng](https://github.com/infeng) [3468](https://github.com/ant-design/ant-design/pull/3468) [#3603](https://github.com/ant-design/ant-design/pull/3603) [#3531](https://github.com/ant-design/ant-design/pull/3531)

* Fix Cascader `defaultValue` should work. [#3470](https://github.com/ant-design/ant-design/issues/3470)
* Fix the alignment of Button & Input & DatePicker & Select. [#3481](https://github.com/ant-design/ant-design/issues/3481)
* DatePicker
  * Fix wrong timing of triggering `onChange` while `DatePicker[showTime]` is set. [#3523](https://github.com/ant-design/ant-design/issues/3523)
* Fix `Dropdown.Button[disabled]` doesn't works for behaviour. [#3535](https://github.com/ant-design/ant-design/issues/3535)
* Menu
  * Fix errors in SSR, thanks to  [@xpcode](https://github.com/xpcode) to find the solution. [#2061](https://github.com/ant-design/ant-design/issues/2061) [#2406](https://github.com/ant-design/ant-design/issues/2406) [#3293](https://github.com/ant-design/ant-design/issues/3293)
  * Fix children don't support `null`. [#3599](https://github.com/ant-design/ant-design/issues/3599)
* Fix loading status animation for message.[#3536](https://github.com/ant-design/ant-design/issues/3536)
* Form
  * Fix style issue while using `Form[inline]` and `Input[addonBefore|addonAfter]` together. [#3524](https://github.com/ant-design/ant-design/issues/3524)
  * Fix style issue for Radio.Button in Form.Item.
  * Fix style issue for search button in Form.Item. [#3630](https://github.com/ant-design/ant-design/issues/3630)
  * Fix Form.Item should not treat no user input as validate success. [#3613](https://github.com/ant-design/ant-design/issues/3613)
* Should not limit the min width of Popover while `Popover[title]` is not set.
* Table
  * Fix style of fixed header of Table while `dataSource` is empty.[#3567](https://github.com/ant-design/ant-design/issues/3567)
  * Fix Table will overlap SubMenu while `dataSource` is empty. [#3521](https://github.com/ant-design/ant-design/issues/3521)
* Tabs
  * Height of header of `Tabs[type="card|editable-card"]` should follow design.
  * Fix height of TabPane should follow height of its content. [#3304](https://github.com/ant-design/ant-design/issues/3304)
* Fix style of `TreeSelect[showSearch]`. [#3520](https://github.com/ant-design/ant-design/issues/3520)

## 2.1.0

`2016-10-16`

- Supports spinning Icon.
- Tabs's switch animation could be disabled now. [#3324](https://github.com/ant-design/ant-design/issues/3324)
- Add Spanish localization for LocaleProvider. @Danjavia
- Update Russian localization for LocaleProvider. @plandem
- Add `onSelect` event for AutoComplete.
- Improve style of Modal.
- Improve animation of Tooltip.
- Improve style of Transfer's buttons.
- Improve style of Tree.
- Fix some less variables.
- Fix errors while import the whole antd in SSR.
- Fix errors while render Affix and BackTop on server. [#3283](https://github.com/ant-design/ant-design/issues/3283) [#3343](https://github.com/ant-design/ant-design/issues/3343)
- Fix conflicts between Cascader search mode and browser's autocomplete behaviour. [#3350](https://github.com/ant-design/ant-design/issues/3350)
- Fix bug that `h3` cannot be the value of Card[title]. [#3388](https://github.com/ant-design/ant-design/issues/3388)
- DatePicker
  - Fix bug that `onChange` will be trigger twice when `showTime` is set. [#3376](https://github.com/ant-design/ant-design/issues/3376)
  - Fix differences between overlay's and trigger's date format. [#3405](https://github.com/ant-design/ant-design/issues/3405) [#3298](https://github.com/ant-design/ant-design/issues/3298)
  - Fix style conflicts with TimePicker. [#3312](https://github.com/ant-design/ant-design/issues/3312) [#3307](https://github.com/ant-design/ant-design/issues/3307)
- Fix overflow issue for Form.Item label.
- Fix that Icon should not show border in Safari.
- Fix infinite loop while inc/dec InputNubmer with keyboard. [#3239](https://github.com/ant-design/ant-design/issues/3239)
- Fix the style of the arrow of Popover.
- Fix bug Popover and Popconfirm `arrowPointAtCenter` doesn't work.
- Select
  - Fix bug that styles of Select are imported twice. [#3332](https://github.com/ant-design/ant-design/issues/3332)
  - Fix bug `notFoundContent` cannot be set as `''`. [#3345](https://github.com/ant-design/ant-design/issues/3345)
  - Fix the unstable width of table cell with Select[showSearch]. [#3413](https://github.com/ant-design/ant-design/issues/3413)
- Fix style conflicts while use `border` & `title` & `footer` of Table at the same time. [#3301](https://github.com/ant-design/ant-design/issues/3301)
- Fix that the height of TabPane doesn't follow height of content. [#3377](https://github.com/ant-design/ant-design/issues/3377)
- Fix bug Transfer[titles] is not under the control of LocaleProvider. [#3264](https://github.com/ant-design/ant-design/pull/3264)
- Upload
  - Fix bug users' `onRemove` will override default behaviour. [#3317](https://github.com/ant-design/ant-design/issues/3317)
  - Fix style for `listType='picture-card'`.[#3316](https://github.com/ant-design/ant-design/issues/3316)
- Fix bug that moment locales is not found while built. [#3204](https://github.com/ant-design/ant-design/issues/3204) [#3411](https://github.com/ant-design/ant-design/issues/3411)

## 2.0.1

`2016-10-01`

- Fix developers cannot call methods of react-slick. [#3164](https://github.com/ant-design/ant-design/issues/3164)
- Fix Steps.Step[icon] should support React.ReactNode. [#3159](https://github.com/ant-design/ant-design/issues/3159)
- Fix server-side render for Affix. [#3216](https://github.com/ant-design/ant-design/issues/3216)
- Fix Mention should supoort `onSelect` `placeholder`. [#3236](https://github.com/ant-design/ant-design/issues/3236) [#3226](https://github.com/ant-design/ant-design/issues/3226)
- Fix Transfer cannot work with `getFieldDecorator`.
- Fix LocaleProvider doesn't work for time-related components.
- Fix Cascader doesn't show search text in search mode.
- Fix the animation & text Spin should be placed in vertical middle.
- Fix styles of RangePicker Modal Tag Progress.

## 2.0.0

`2016-09-28`

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
* Parameters of type `Date/GregorianCalendar` of functions such as `onChange` and `onPanelChange`, plus other callback functions had been changed to type moment. Please consult [APIs of gregorian-calendar](https://github.com/yiminghe/gregorian-calendar) and [APIs of moment](http://momentjs.com/docs/), and update your code accordingly. And you can consult this [commit](https://github.com/ant-design/ant-design/commit/5a4ebe535f0353089b30ac331bc4fb7877963371) to see how to upate.

  Because the return value of `JSON.stringy(date: moment)` will lost time zone, we should use `.format` to convert date to string first, see related issue [#3082](https://github.com/ant-design/ant-design/issues/3082) for details:
  ```js
  handleSubmit() {
    const values = this.props.form.getFieldsValue();
    values.date = values.date.format('YYYY-MM-DD HH:mm:ss'); // or other format
    const data = JSON.stringify(values);
    // send data to server
  }
  ```
* For the value of time-related components becomes an instance of `moment`, you should replace `type: 'date'` with `type: 'object'` in form validation.
* The `format` of time-related components is changed from [gregorian-calendar-format](https://github.com/yiminghe/gregorian-calendar-format#api) to [moment  format](http://momentjs.com/docs/#/parsing/string-format/) now, for instance the format `yyyy-MM-dd` should change to `YYYY-MM-DD`.
* `linkRender` and `nameRender` of Breadcrumb are removed, please use `itemRender`.
* `onClose` and `onOpen` of Menu are removed, please use `onOpenChange`. As being totally different, please check [this demo](http://beta.ant.design/components/menu/#components-menu-demo-sider-current) first.
* Paging columns of Table were removed, please use [fixed columns](http://ant.design/components/table/#components-table-demo-fixed-columns).
* `Popover[overlay]` is removed, please use `Popover[content]` instead.

The following change will throw some warnings in the console and it will still work, but we recommend to update your code.

* `getFieldProps` of Form is deprecated, please use `getFieldDecorator`:

  ```diff
  -  <Input placeholder="text" {...getFieldProps('userName', { ... })} />
  +  {getFieldDecorator('userName', { ... })(
  +    <Input placeholder="text" />
  +  )}
  ```

  Look up to [#1533](https://github.com/ant-design/ant-design/issues/1533) for related discussion.

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

* [dva@1.0.0](https://github.com/dvajs/dva) is published and it is officially recommended framework [in real world](http://ant.design/docs/react/practical-projects).
* The officially recommended scaffold is [dva-cli](https://github.com/dvajs/dva-cli) now, the old `antd-init` is just for studying and demo.

## 1.0.0

Visit [GitHub](https://github.com/ant-design/ant-design/releases?after=2.0.0) to read change logs from `0.x` to `1.x`。
