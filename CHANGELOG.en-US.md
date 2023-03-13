---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 5.3.1

`2023-03-13`

- 🐞 Update DatePicker deps to fix laggy in Safari and support align with `transform scale`. [#41090](https://github.com/ant-design/ant-design/pull/41090)
- 🐞 Fix Menu collapse, Tooltip sometime show with unexpected. [#41081](https://github.com/ant-design/ant-design/issues/41081)
- 🐞 Fix Modal.confirm has additional node which makes height not correct. [#41173](https://github.com/ant-design/ant-design/pull/41173) [@Svudec](https://github.com/Svudec)
- 🐞 Fixed InputNumber `disabled` text color not correct. [#41167](https://github.com/ant-design/ant-design/pull/41167) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Anchor highlighting not working when dynamically updating `items`. [#40743](https://github.com/ant-design/ant-design/pull/40743) [@zqran](https://github.com/zqran)
- 🛠 Update Mentions deps to support align with `transform scale`. [#41160](https://github.com/ant-design/ant-design/pull/41160) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 Fix Form with manually called `validateFields` not show success status when `hasFeedback` is on. [#41116](https://github.com/ant-design/ant-design/pull/41116) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Cascader sub panel not close when hover to leaf node. [#41134](https://github.com/ant-design/ant-design/issues/41134)
- 🐞 Fix Popconfirm using `Promise` to close will not exist `loading` state even when open again. [#41121](https://github.com/ant-design/ant-design/pull/41121)
- 🐞 Fix Upload `onChange` sometime not sync when in React 18. [#41082](https://github.com/ant-design/ant-design/pull/41082) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛎 Update demo with Space.Compact instead of legacy one and patch warning info. [#41080](https://github.com/ant-design/ant-design/pull/41080) [@Yuiai01](https://github.com/Yuiai01)
- 🌐 Update ko_KR、Added Amharic Language. [#41103](https://github.com/ant-design/ant-design/pull/41103) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.3.0

`2023-03-06`

- 🆕 Tooltip support `arrow.pointAtCenter` and deprecate `arrow.arrowPointAtCenter`. [#40989](https://github.com/ant-design/ant-design/pull/40989) [@MadCcc](https://github.com/MadCcc)
- 🆕 Progress support custom `size`. [#40903](https://github.com/ant-design/ant-design/pull/40903) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Tour support custom `zIndex`. [#40982](https://github.com/ant-design/ant-design/pull/40982) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Table `onHeaderCell` support customize `colSpan` and `rowSpan`. [#40885](https://github.com/ant-design/ant-design/pull/40885)
- 🆕 Image.Group support `onChange` callback. [#40857](https://github.com/ant-design/ant-design/pull/40857) [@kiner-tang](https://github.com/kiner-tang)
- App
  - 🆕 App support `style` props. [#40708](https://github.com/ant-design/ant-design/pull/40708) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 App support `message` and `notification` options. [#40458](https://github.com/ant-design/ant-design/pull/40458) [@luo3house](https://github.com/luo3house)
- 🆕 ConfigProvider support `useConfig` hook to get `size` and `disabled` in context. [#40215](https://github.com/ant-design/ant-design/pull/40215) [@xliez](https://github.com/xliez)
- 🆕 Breadcrumb support `items` prop. [#40543](https://github.com/ant-design/ant-design/pull/40543) [@heiyu4585](https://github.com/heiyu4585)
- 🛠 Breadcrumb separators are unified into `li` elements. [#40887](https://github.com/ant-design/ant-design/pull/40887) [@heiyu4585](https://github.com/heiyu4585)
- 🛠 Tooltip support auto arrow position &amp; adjust position if possible. `destroyTooltipOnHide.keepParent` is deprecated since it will be always auto destroy unnecessary container now. [#40632](https://github.com/ant-design/ant-design/pull/40632)
- 🛠 Rename preset colors in token, .e.g `blue-1` to `blue1`, and deprecate tokens before. [#41071](https://github.com/ant-design/ant-design/pull/41071)
- 💄 Message use `colorText` in style. [#41047](https://github.com/ant-design/ant-design/pull/41047) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fix Select, TreeSelect, Cascader popup align position not correct when parent has `transform: scale` style. [#41013](https://github.com/ant-design/ant-design/pull/41013)
- 💄 Optimize `rowScope` style for Table. [#40304](https://github.com/ant-design/ant-design/pull/40304) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Provide new AliasToken `lineWidthFocus` for `outline-width` of focused component. [#40840](https://github.com/ant-design/ant-design/pull/40840) [@MadCcc](https://github.com/MadCcc)
- 💄 WeekPicker support hover style. [#40772](https://github.com/ant-design/ant-design/pull/40772)
- 💄 Adjust Select, TreeSelect, Cascader always show the `arrow` by default when multiple. [#41028](https://github.com/ant-design/ant-design/pull/41028)
- 🐞 Fix Form `Form.Item.useStatus` problem with sever-side-rendering. [#40977](https://github.com/ant-design/ant-design/pull/40977) [@AndyBoat](https://github.com/AndyBoat)
- 🐞 Fix arrow shape in some components. [#40971](https://github.com/ant-design/ant-design/pull/40971) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Layout throw `React does not recognize the `suffixCls` prop on a DOM element` warning. [#40969](https://github.com/ant-design/ant-design/pull/40969)
- 🐞 Fix Watermark that text will be displayed when the picture loads abnormally. [#40770](https://github.com/ant-design/ant-design/pull/40770) [@OriginRing](https://github.com/OriginRing)
- 🐞 Image support flip function in preview mode. Fix Image `fallback` when used in ssr. [#40660](https://github.com/ant-design/ant-design/pull/40660)
- 🐞 Fix Typography component is not centered in the Select component. [#40422](https://github.com/ant-design/ant-design/pull/40422) [@Yuiai01](https://github.com/Yuiai01)
- 🌐 Update locale `vi_VN` adding Vietnamese translation for Form component validation. [#40992](https://github.com/ant-design/ant-design/pull/40992) [@lamvananh](https://github.com/lamvananh)
- RTL
  - 💄 FloatButton support `rtl` mode. [#40990](https://github.com/ant-design/ant-design/pull/40990) [@li-jia-nan](https://github.com/li-jia-nan)
- TypeScript
  - 🤖 Fix Cascader that generics should not be necessary. [#40961](https://github.com/ant-design/ant-design/pull/40961) [@crazyair](https://github.com/crazyair)

## 5.2.3

`2023-02-27`

- 🐞 Fix for setting `percent` and `success.percent` at the same time for `Progress`, the progress text does not change as `percent` changes. [#40922](https://github.com/ant-design/ant-design/pull/40922)
- 🐞 Fixed Image preview icon was misaligned.[#40911](https://github.com/ant-design/ant-design/pull/40911)
- 🐞 Fix ConfigProvider validation message template override Form configure template sometime. [#40533](https://github.com/ant-design/ant-design/pull/40533) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fixed Confirm Modal `onOk` event could be triggered twice when close. [#40719](https://github.com/ant-design/ant-design/pull/40719) [@Rafael-Martins](https://github.com/Rafael-Martins)
- 🛠 Rewrote the `useLocale` method and exposed `localeCode` to the public. [#40884](https://github.com/ant-design/ant-design/pull/40884) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fixed Segmented component items were unresponsive to mouse events. [#40894](https://github.com/ant-design/ant-design/pull/40894) [@MadCcc](https://github.com/MadCcc)
- 🛠 Refactored: replaced the LocaleReceiver component with `useLocale` and removed the LocaleReceiver component. [#40870](https://github.com/ant-design/ant-design/pull/40870) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fixed `getPopupContainer` property injected by ConfigProvider did not work. [#40871](https://github.com/ant-design/ant-design/pull/40871) [@RedJue](https://github.com/RedJue)
- 🐞 Fixed where Descriptions did not accept `data-_` and `aria-_` attributes. [#40859](https://github.com/ant-design/ant-design/pull/40859) [@goveo](https://github.com/goveo)
- 🛠 Changed the Separator's DOM element from `span` to `li`. [#40867](https://github.com/ant-design/ant-design/pull/40867) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix token of `Layout.colorBgHeader` not work when single use Layout.Header directly. [#40933](https://github.com/ant-design/ant-design/pull/40933)
- 💄 Changed the component's focus `outline` to the default `4px`.[#40839](https://github.com/ant-design/ant-design/pull/40839) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fixed the Badge color was displayed abnormally. [#40848](https://github.com/ant-design/ant-design/pull/40848) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fixed an issue with the Timeline item's `className`. [#40835](https://github.com/ant-design/ant-design/pull/40835) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fixed the interaction style of the Rate component in the disabled state.[#40836](https://github.com/ant-design/ant-design/pull/40836) [@Yuiai01](https://github.com/Yuiai01)
- 🇮🇷 Added Iranian localization. [#40895](https://github.com/ant-design/ant-design/pull/40895) [@majidsadr](https://github.com/majidsadr)

## 5.2.2

`2023-02-19`

- DatePicker
  - 💄 Optimize DatePicker date panel style. [#40768](https://github.com/ant-design/ant-design/pull/40768)
  - 🐞 Fix RangePicker hover style on wrong date. [#40785](https://github.com/ant-design/ant-design/pull/40785) [@Yuiai01](https://github.com/Yuiai01)
- Form
  - 🐞 Fixed inconsistency between Checkbox and Radio in table when Form is `disabled`. [#40728](https://github.com/ant-design/ant-design/pull/40728) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 Fix Radio/Checkbox under Form `disabled` property don't works correctly. [#40741](https://github.com/ant-design/ant-design/pull/40741) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix List extra padding when enable `grid` property. [#40806](https://github.com/ant-design/ant-design/pull/40806)
- 🐞 Fix Upload actions icon alignment issue. [#40805](https://github.com/ant-design/ant-design/pull/40805)
- 💄 Tweak Table filter dropdown radius style. [#40802](https://github.com/ant-design/ant-design/pull/40802)
- 🐞 Fix Button `loading.delay` not delay at first time. [#40759](https://github.com/ant-design/ant-design/pull/40759) [@RedJue](https://github.com/RedJue)
- 🐞 Fix Input status style when using `addonAfter` and `addonBefore`. [#40744](https://github.com/ant-design/ant-design/pull/40744) [@carla-cn](https://github.com/carla-cn)
- 🐞 Fix Skeleton `active` flicky animation in Safari. [#40692](https://github.com/ant-design/ant-design/pull/40692) [@slotDumpling](https://github.com/slotDumpling)
- Locales
  - 🇫🇷 Added french locale for Tour component. [#40750](https://github.com/ant-design/ant-design/pull/40750) [@RedJue](https://github.com/RedJue)
  - 🇰🇷 Update ko_KR locale. [#40716](https://github.com/ant-design/ant-design/pull/40716) [@owjs3901](https://github.com/owjs3901)

## 5.2.1

`2023-02-13`

- 🛠 Rewrite `panelRender` in Tour to function component。[#40670](https://github.com/ant-design/ant-design/pull/40670) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix `className` property wrongly passed to child nodes in TimeLine。[#40700](https://github.com/ant-design/ant-design/pull/40700) [@any1024](https://github.com/any1024)
- 🐞 Fix Slider dot to trigger click and hover correctly. [#40679](https://github.com/ant-design/ant-design/pull/40679) [@LongHaoo](https://github.com/LongHaoo)
- 🐞 Fix Tour that should support `0` as element. [#40631](https://github.com/ant-design/ant-design/pull/40631) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix DataPicker.RangePicker hover range style. [#40607](https://github.com/ant-design/ant-design/pull/40607) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Optimize Steps custom `icon` size. [#40672](https://github.com/ant-design/ant-design/pull/40672) [@MadCcc](https://github.com/MadCcc)
- TypeScript
  - 🤖 Update Upload to support generic types. [#40634](https://github.com/ant-design/ant-design/pull/40634) [@riyadelberkawy](https://github.com/riyadelberkawy)
- 🌐 Localization
  - 🇷🇺/🇺🇦 add missing translations for ru_RU and uk_UA. [#40656](https://github.com/ant-design/ant-design/pull/40656) [@eldarcodes](https://github.com/eldarcodes)

## 5.2.0

`2023-02-08`

- 🔥 Add `picture-circle` to Upload's `listType` prop. [#40134](https://github.com/ant-design/ant-design/pull/40134) [@ds1371dani](https://github.com/ds1371dani)
- 🔥 Anchor component add `direction`, which supports vertical. [#39372](https://github.com/ant-design/ant-design/pull/39372) [@foryuki](https://github.com/foryuki)
- 🆕 Tooltip support `arrow` to change arrow's visible state and whether the arrow is pointed at the center of target. [#40234](https://github.com/ant-design/ant-design/pull/40234) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Added list pagination `align` option. [#39858](https://github.com/ant-design/ant-design/pull/39858) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Timeline added `items` to support option configuration. [#40424](https://github.com/ant-design/ant-design/pull/40424)
- Collapse
  - 🆕 Collapse supports setting `size`. [#40286](https://github.com/ant-design/ant-design/pull/40286) [@Yuiai01](https://github.com/Yuiai01)
  - 🆕 Add ref for Collapse and Panel. [#40443](https://github.com/ant-design/ant-design/pull/40443) [@any1024](https://github.com/any1024)
- Slider
  - 🆕 Slider add `railStyle` for custom style. [#40579](https://github.com/ant-design/ant-design/pull/40579) [@david-cord](https://github.com/david-cord)
  - 🆕 Slider add support for disable `keyboard` events. [#40526](https://github.com/ant-design/ant-design/pull/40526)
  - 🐞 Fix Slider missing Tooltip appear motion. [#39857](https://github.com/ant-design/ant-design/pull/39857)
- Dropdown
  - 🆕 Dropdown support `autoAdjustOverflow` option. [#39735](https://github.com/ant-design/ant-design/pull/39735)
  - 💄 Fix Dropdown component `danger` and `disabled` style priority issue. [#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- Tour
  - 🆕 Tour added `indicatorsRender` to support custom indicators. [#40613](https://github.com/ant-design/ant-design/pull/40613)
  - 🆕 Tour support `scrollIntoViewOptions` to change scrollIntoView options. [#39980](https://github.com/ant-design/ant-design/pull/39980) [@kiner-tang](https://github.com/kiner-tang)
  - 🆕 Tour masks support passing custom styles and fill colors. [#39919](https://github.com/ant-design/ant-design/pull/39919) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fixed `findDomNode` method warning thrown by the tour component when called in strict mode. [#40160](https://github.com/ant-design/ant-design/pull/40160) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Deleted margin of the last indicator. [#40624](https://github.com/ant-design/ant-design/pull/40624)
- 🆕 Adds Design token `fontFamilyCode` and apply to Typography `code` `kbd` `pre` elements. [#39823](https://github.com/ant-design/ant-design/pull/39823)
- 🆕 ConfigProvider add Form `scrollToFirstError`。[#39509](https://github.com/ant-design/ant-design/pull/39509) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fill rest `rootClassName` for all components. [#40217](https://github.com/ant-design/ant-design/pull/40217)
- 🐞 Fix Empty descriptions text color in default theme and dark theme. [#40584](https://github.com/ant-design/ant-design/pull/40584) [@MuxinFeng](https://github.com/MuxinFeng)
- Table
  - 🐞 Fix `aria-label` and `role="presentation"` cannot be used together in Table row. [#40413](https://github.com/ant-design/ant-design/pull/40413) [@Ke1sy](https://github.com/Ke1sy)
  - 🐞 Fix uncontrolled `filtered` update not working. [#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 Fix the problem that the header filter is invalid in the case of group headers. [#40463](https://github.com/ant-design/ant-design/pull/40463) [@roman40a](https://github.com/roman40a)
  - 🐞 Fix selection column cover by other cell when fixed. [#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fix Sorted/Filtered table fixed column transparent background unreadable. [#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Optimize Table hover style to fix problems with border. [#40469](https://github.com/ant-design/ant-design/pull/40469)
- DatePicker
  - 🐞 Fix DatePicker that have status style when disabled. [#40608](https://github.com/ant-design/ant-design/pull/40608)
  - 💄 Optimize the DatePicker input box style. [#40549](https://github.com/ant-design/ant-design/pull/40549) [@Wxh16144](https://github.com/Wxh16144)
  - 💄 Optimize DatePicker Dropdown arrow style. [#40521](https://github.com/ant-design/ant-design/pull/40521)
- 🐞 Fix Space `ant-space-item` selector bug. [#40554](https://github.com/ant-design/ant-design/pull/40554) [@cncolder](https://github.com/cncolder)
- 🐞 Fix not close Spin immediately when using `delay`. [#40475](https://github.com/ant-design/ant-design/pull/40475) [@3Alan](https://github.com/3Alan)
- 🐞 Fix Modal `useModal` default confirm button text logic. [#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 🛠 Refactored the water ripple visual effect to trigger multiple water ripples at the same time. [#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Refactor Input.TextArea and Mentions. [#40045](https://github.com/ant-design/ant-design/pull/40045)
- 🛠 Refactor Affix Calendar to use React.createRef instead of function. [#40538](https://github.com/ant-design/ant-design/pull/40538) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Tabs more button unexpected height. [#40488](https://github.com/ant-design/ant-design/pull/40488)
- 💄 Resolve Image preview style conflict with TailwindCSS. [#39914](https://github.com/ant-design/ant-design/pull/39914)
- 💄 Fix Progress that `transition` of success bar is missing. [#40487](https://github.com/ant-design/ant-design/pull/40487)
- 💄 Fix the misalignment of Input.Group when zooming the screen under windows. [#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 💄 Fix Select placeholder style issue. [#40477](https://github.com/ant-design/ant-design/pull/40477) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Adjust Descriptions label style for more readable. [#40085](https://github.com/ant-design/ant-design/pull/40085)
- 💄 Optimize QRCode expiration display style. [#39849](https://github.com/ant-design/ant-design/pull/39849)
- 💄 Optimize `boxShadow` tokens. [#40516](https://github.com/ant-design/ant-design/pull/40516)
- TypeScript
  - 🤖 Optimize Badge Tag Tooltip `color` type definition. [#39871](https://github.com/ant-design/ant-design/pull/39871)
  - 🤖 Add `Breakpoint` `ThmeConfig` `GlobalToken` type export. [#40508](https://github.com/ant-design/ant-design/pull/40508) [@Kamahl19](https://github.com/Kamahl19)
  - 🤖 Update Upload `fileList` type. [#40585](https://github.com/ant-design/ant-design/pull/40585)
  - 🤖 Remove Tour ForwardRefRenderFunction. [#39924](https://github.com/ant-design/ant-design/pull/39924)
- 🌐 Localization
  - 🇮🇳 Add `ta_IN` local. [#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.7

`2023-01-31`

- Input
  - 🐞 Fix Input that unexpected cancel button is shown when `type="search"`. [#40457](https://github.com/ant-design/ant-design/pull/40457) [@MadCcc](https://github.com/MadCcc)
  - 🐞 Fix Input suffix color does not update bug when component status changed. [#40344](https://github.com/ant-design/ant-design/pull/40344) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Switch text layout problem in Safari and Chrome <= 84 with compatible mode. [#40453](https://github.com/ant-design/ant-design/pull/40453) [@Ifeinstein](https://github.com/Ifeinstein)
- 🐞 Fix Progress that throw error when `percent` is `null`. [#40378](https://github.com/ant-design/ant-design/pull/40378) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix List title and avatar be rendered in the wrong position. [#40395](https://github.com/ant-design/ant-design/pull/40395) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Dropdown submenu wrong position. [#40349](https://github.com/ant-design/ant-design/pull/40349)
- 🐞 Fix Badge throw `findDOMNode` warning in StrictMode when `dot` switch. [#40347](https://github.com/ant-design/ant-design/pull/40347)
- 🐞 Fix Message wrong icon color problem. [#40471](https://github.com/ant-design/ant-design/pull/40471) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Adjust Empty component default style in dark theme. [#40447](https://github.com/ant-design/ant-design/pull/40447)
- RTL
  - 💄 Fix Table scroll shadow in RTL mode. [#40441](https://github.com/ant-design/ant-design/pull/40441) [@ds1371dani](https://github.com/ds1371dani)
- TypeScript
  - 🤖 Export ConfigProvider's ThemeConfig type. [#40370](https://github.com/ant-design/ant-design/pull/40370) [@Kamahl19](https://github.com/Kamahl19)

## 5.1.6

`2023-01-20`

- 🐞 Fix DatePicker animation timing function. [#40133](https://github.com/ant-design/ant-design/pull/40133) [@MadCcc](https://github.com/MadCcc)
- Menu
  - 🐞 Fix Tooltip incorrectly shown when Menu collapsed. [#40328](https://github.com/ant-design/ant-design/pull/40328)
  - 🐞 Fix Menu split line style error. [#40268](https://github.com/ant-design/ant-design/pull/40268) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix the console warning of wave effect when bind component unmount before wave effect trigger. [#40307](https://github.com/ant-design/ant-design/pull/40307) [@luo3house](https://github.com/luo3house)
- 🐞 Fix Breadcrumb throw wrong overlay deprecation warning when use `menu` prop. [#40211](https://github.com/ant-design/ant-design/pull/40211) [@candy4290](https://github.com/candy4290)
- 🐞 Fix Modal.useModal hooks `destroyAll` not work as expect. [#40281](https://github.com/ant-design/ant-design/pull/40281) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix `message` global static method `config` setting `duration` not working. [#40232](https://github.com/ant-design/ant-design/pull/40232) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Button text color when containing an `a` tag. [#40269](https://github.com/ant-design/ant-design/pull/40269) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix Radio displaying wrong text color and cursor when `disabled`. [#40273](https://github.com/ant-design/ant-design/pull/40273) [@ds1371dani](https://github.com/ds1371dani)
- 💄 Optimize the calculation logic of focus `outline`, replace `lineWidth` with `lineWidthBold`. [#40291](https://github.com/ant-design/ant-design/pull/40291) [@simonpfish](https://github.com/simonpfish)
- 💄 Rewrite part component style to compatible the browser that not support concat `:not` selector. [#40264](https://github.com/ant-design/ant-design/pull/40264)
- 🌐 Fix missing translation for `pt_BR`. [#40270](https://github.com/ant-design/ant-design/pull/40270) [@rafaelncarvalho](https://github.com/rafaelncarvalho)

## 5.1.5

`2023-01-15`

- 🐞 Fix Checkbox that label not aligned with checkbox. [#40208](https://github.com/ant-design/ant-design/pull/40208)
- 🐞 Fix Button wave effect sometime makes layout shaking. [#40192](https://github.com/ant-design/ant-design/pull/40192)
- 🐞 Fix Select crash problem. [#40158](https://github.com/ant-design/ant-design/pull/40158) [@helloqian12138](https://github.com/helloqian12138)
- 🐞 Fix Timeline custom color displaying wrong classname &amp; alignment overflow. [#39394](https://github.com/ant-design/ant-design/pull/39394) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Breadcrumb last item color. [#40119](https://github.com/ant-design/ant-design/pull/40119) [@messaooudi](https://github.com/messaooudi)
- 💄 Fix Table sticky table header shadow style. [#40171](https://github.com/ant-design/ant-design/pull/40171) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix Segmented item hover radius style. [#40175](https://github.com/ant-design/ant-design/pull/40175) [#40179](https://github.com/ant-design/ant-design/pull/40179)
- TypeScript
  - 🤖 Fix Tabs `onEdit` Callback parameter type problem. [#39926](https://github.com/ant-design/ant-design/pull/39926) [@RSS1102](https://github.com/RSS1102)
- RTL
  - 💄 Fix DatePicker's next &amp; prev icons in RTL mode. [#40238](https://github.com/ant-design/ant-design/pull/40238) [@ds1371dani](https://github.com/ds1371dani)
  - 💄 Fix Badge RTL style when wrap a block element. [#40125](https://github.com/ant-design/ant-design/pull/40125)

## 5.1.4

`2023-01-09`

- 🐞 Fix missing locale file. [#40116](https://github.com/ant-design/ant-design/pull/40116)
- 🐞 Fix Cascader dropdown `placement` in RTL mode. [#40109](https://github.com/ant-design/ant-design/pull/40109) [@3hson](https://github.com/3hson)
- 🐞 Fix animation flicking in some components. [react-component/motion#39](https://github.com/react-component/motion/pull/39)

## 5.1.3

`2023-01-09`

- Table
  - 🛠 Optimize the Table `shouldCellUpdate` logic to increase the secondary rendering speed. [#40063](https://github.com/ant-design/ant-design/pull/40063)
  - 🐞 Fix Table `columns.render` not trigger re-render when render function use closure data. [#40004](https://github.com/ant-design/ant-design/pull/40004)
  - 🐞 Fix when Table filter, the border will be black. [#39938](https://github.com/ant-design/ant-design/pull/39938) [@JarvisArt](https://github.com/JarvisArt)
- Button
  - 🐞 Fix Button wave effect not following screen scroll. [#39954](https://github.com/ant-design/ant-design/pull/39954)
  - 🐞 Fix Button `block` props not work. [#39992](https://github.com/ant-design/ant-design/pull/39992) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Menu custom expand icon cannot be hidden. [#40071](https://github.com/ant-design/ant-design/pull/40071) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix circular Progress text not being displayed in rtl mode. [#40103](https://github.com/ant-design/ant-design/pull/40103)
- 💄 Fix horizontal Menu style with `theme="dark"`. [#40105](https://github.com/ant-design/ant-design/pull/40105)
- 🐞 Fix Cascader `notFoundContent` cannot be clicked. [#40067](https://github.com/ant-design/ant-design/pull/40067)
- 🐞 Fix Transfer Checkbox not disabled when itemsLits is empty. [#40038](https://github.com/ant-design/ant-design/pull/40038) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Checkbox style with `disabled` and `indeterminate`. [#39974](https://github.com/ant-design/ant-design/pull/39974) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix Alert.ErrorBoundary description overflow bug. [#40033](https://github.com/ant-design/ant-design/pull/40033)
- 💄 Fix Tag onClick as undefined, click the mouse to display the border style. [#40023](https://github.com/ant-design/ant-design/pull/40023) [@crazyair](https://github.com/crazyair)
- 💄 Fix Avatar.Group item margin when item is wrapped by other elements. [#39993](https://github.com/ant-design/ant-design/pull/39993)
- 🐞 Fix Submenu arrow transition. [#39945](https://github.com/ant-design/ant-design/pull/39945) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix selection column cover by other cell when fixed. [#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
- 🌐 Add missing ta_IN translations. [#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.2

`2022-12-30`

- 🆕 Theme Editor supports uploading themes. [#39621](https://github.com/ant-design/ant-design/pull/39621) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Refactor wave effect that can now trigger multiple times. [#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- Table
  - 🐞 Fix Table `column.filtered` cannot be updated. [#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 Fix Table fixed column which is sorted or filtered transparent background bug. [#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Image preview style conflict with TailwindCSS. [#39914](https://github.com/ant-design/ant-design/pull/39914)
- 🐞 Fix Dropdown `danger` and `disabled` style priority bug. [#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix App.useApp `modal` default `okText`. [#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Fix Input.Group misplace style when zoom up in windows. [#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix Slider missing Tooltip appear motion. [#39857](https://github.com/ant-design/ant-design/pull/39857)
- 🐞 Fix QRCode missing expired style. [#39849](https://github.com/ant-design/ant-design/pull/39849) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Tree switcher's background display unexpected in dark theme. [#39838](https://github.com/ant-design/ant-design/pull/39838) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Menu slide bar style issue when `border` is reset by preset. [#39819](https://github.com/ant-design/ant-design/pull/39819) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Checkbox not support Tooltip or Popover when it is `disabled`. [#39829](https://github.com/ant-design/ant-design/pull/39829)

## 5.1.1

`2022-12-26`

- 📦 Remove IE and other legacy browsers from browserslist to reduce bundle size.[#38779](https://github.com/ant-design/ant-design/pull/38779)
- ⚡️ Improve Transfer performance when selecting and moving nodes with large data.[#39465](https://github.com/ant-design/ant-design/pull/39465) [@wqs576222103](https://github.com/wqs576222103)
- 🐞 Fix wrong `font-family` of components. [#39806](https://github.com/ant-design/ant-design/pull/39806)
- 🐞 Fix Drawer default props not working when `placement` `open` `width` are `undefined`. [#39782](https://github.com/ant-design/ant-design/pull/39782)
- 🐞 Fix Menu icon animation when collapse it. [#39800](https://github.com/ant-design/ant-design/pull/39800) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Image preview operation bar is covered during the animation. [#39788](https://github.com/ant-design/ant-design/pull/39788) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix List crash when `pagination.pageSize` is undefined. [#39681](https://github.com/ant-design/ant-design/pull/39681) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Space `align="baseline"` not working. [#39748](https://github.com/ant-design/ant-design/pull/39748) [@candy4290](https://github.com/candy4290)
- Table
  - 🐞 Fix Table expandable row header has no top left border radius. [#39781](https://github.com/ant-design/ant-design/pull/39781) [@chunsch](https://github.com/chunsch)
  - 🐞 Fix Table header radius missing when has fixed header and columns. [#39723](https://github.com/ant-design/ant-design/pull/39723)
  - 🐞 Fix Table missing `border-bottom` in merged cell and unexpected border color if overlapping。. [#39729](https://github.com/ant-design/ant-design/pull/39729)
  - ⌨️ Improve Table a11y by appling aria-props to table element. [#39700](https://github.com/ant-design/ant-design/pull/39700)
  - ⌨️ Reset `aria-label` in Table column. [#39738](https://github.com/ant-design/ant-design/pull/39738) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Adds transition animation for Table border. [#39713](https://github.com/ant-design/ant-design/pull/39713) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Tabs add button color invisible in dark mode. [#39724](https://github.com/ant-design/ant-design/pull/39724)
- 🐞 Fix the problem that the height of the title bar is not enough when Card only has `extra`. [#39646](https://github.com/ant-design/ant-design/pull/39646) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix `justify` and `align` properties are not reactive in Row. [#39704](https://github.com/ant-design/ant-design/pull/39704) [@candy4290](https://github.com/candy4290)
- 🐞 Fix warning in App about two children with the same key. [#39695](https://github.com/ant-design/ant-design/pull/39695) [@Kamahl19](https://github.com/Kamahl19), [#39701](https://github.com/ant-design/ant-design/pull/39701) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Image preview interactive optimization. [#39812](https://github.com/ant-design/ant-design/pull/39812) [@JarvisArt](https://github.com/JarvisArt)
- 💄 Fix Table filter dropdown wrong active background and dropdown shadow style. [#39805](https://github.com/ant-design/ant-design/pull/39805)
- TypeScript
  - 🤖 Fix missing type defination for Design Token. [#39754](https://github.com/ant-design/ant-design/pull/39754)

## 5.1.0

`2022-12-20`

- 🔥 New App Component which provide global style & static function replacement. [#39046](https://github.com/ant-design/ant-design/pull/39046)
- 🔥 New QRCode Component. [#38948](https://github.com/ant-design/ant-design/pull/38948)
- 🔥 New Watermark Component. [#39064](https://github.com/ant-design/ant-design/pull/39064) [@JarvisArt](https://github.com/JarvisArt)
- 🆕 Mentions support `options` prop. [#38630](https://github.com/ant-design/ant-design/pull/38630) [@heiyu4585](https://github.com/heiyu4585)
- 🆕 FloatButton support `clickOutAutoClose`. [#39501](https://github.com/ant-design/ant-design/pull/39501) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Popconfirm support `description` prop. [#39250](https://github.com/ant-design/ant-design/pull/39250) [@xhh0223](https://github.com/xhh0223)
- 🆕 Modal.confirm support `footer` prop. [#39048](https://github.com/ant-design/ant-design/pull/39048) [@owjs3901](https://github.com/owjs3901)
- 🆕 Table support `rowScope` to set the column range. [#39571](https://github.com/ant-design/ant-design/pull/39571)
- 🆕 Anchor support `items` data configuration option content, which supports nesting through children. [#39034](https://github.com/ant-design/ant-design/pull/39034) [@foryuki](https://github.com/foryuki)
- 🆕 Breakpoints can now follow theme token config. [#39105](https://github.com/ant-design/ant-design/pull/39105) [@azro352](https://github.com/azro352)
- 🆕 Tour prevButtonProps nextButtonProps support `style` `classname` prop. [#38939](https://github.com/ant-design/ant-design/pull/38939) [@ONLY-yours](https://github.com/ONLY-yours)
- 🆕 ConfigProvider support config `select.showSearch`. [#39531](https://github.com/ant-design/ant-design/pull/39531) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 Fix Tabs `inkBar` not show in StrictMode. [#39653](https://github.com/ant-design/ant-design/pull/39653)
- 🐞 Fix Badge component width not being affected by parent element. [#39605](https://github.com/ant-design/ant-design/pull/39605) [@AydenGen](https://github.com/AydenGen)
- Select
  - 🐞 Fix wrong usage of icon color token in Select. [#39644](https://github.com/ant-design/ant-design/pull/39644)
  - 💄 Optimize Select a11y to bind real option element when `virtual=false`. [#39550](https://github.com/ant-design/ant-design/pull/39550)
- 🐞 Fix Tour steps set type=‘primary’ not work. [#39382](https://github.com/ant-design/ant-design/pull/39382) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix disabled style miss when has href on Button. [#39456](https://github.com/ant-design/ant-design/pull/39456) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 Fix Segmented icon unexpected margin. [#39575](https://github.com/ant-design/ant-design/pull/39575)
- 🐞 Fix Drawer unexpected warning about `DefaultProps`. [#39562](https://github.com/ant-design/ant-design/pull/39562)
- Menu
  - 🐞 Fix Menu.Submenu will flicker when use `createRoot` to render. [#38855](https://github.com/ant-design/ant-design/pull/38855) [@JarvisArt](https://github.com/JarvisArt)
  - 🛠 Refactor MenuItem to Function Component. [#38751](https://github.com/ant-design/ant-design/pull/38751)
  - 💄 Optimize Menu item style when selected. [#39439](https://github.com/ant-design/ant-design/pull/39439)
- 🛠 LocaleProvider has been deprecated in 4.x (use `<ConfigProvider locale />` instead), we removed the related folder antd/es/locale-provider and antd/lib/locale-provider in 5.x. [#39373](https://github.com/ant-design/ant-design/pull/39373)
- 🛠 Simplified lodash method introduction. [#39599](https://github.com/ant-design/ant-design/pull/39599) [#39602](https://github.com/ant-design/ant-design/pull/39602)
- TypeScript
  - 🤖 Optimize Button DropDown Modal Popconfirm Select Transfer mouse event type definition. [#39533](https://github.com/ant-design/ant-design/pull/39533)
  - 🤖 New export type `FloatButtonGroupProps`. [#39553](https://github.com/ant-design/ant-design/pull/39553)
- 🌐 Localization
  - 🇧🇪 Add `fr_BE` locale. [#39415](https://github.com/ant-design/ant-design/pull/39415) [@azro352](https://github.com/azro352)
  - 🇨🇦 Add `fr_CA` locale. [#39416](https://github.com/ant-design/ant-design/pull/39416) [@azro352](https://github.com/azro352)
  - 🇪🇸 Add `eu_ES` locale. [#39371](https://github.com/ant-design/ant-design/pull/39371) [@Ian-Inizias](https://github.com/Ian-Inizias)

## 5.0.7

`2022-12-13`

- 🐞 Fix Slider's Tooltip missing animation. [#39463](https://github.com/ant-design/ant-design/pull/39463) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 Fix Table unexpected horizontal scroll bar when empty and bordered. [#39455](https://github.com/ant-design/ant-design/pull/39455) [@zjfresh](https://github.com/zjfresh)
- 🐞 Fix Popover arrow background color with customized `color`. [#39517](https://github.com/ant-design/ant-design/pull/39517)
- 🐞 Fix Modal hooks not pass ConfigProvider config correctly. [#39513](https://github.com/ant-design/ant-design/pull/39513)
- 🐞 Fix Radio align issue with custom size. [#39476](https://github.com/ant-design/ant-design/pull/39476)

## 5.0.6

`2022-12-12`

- 🐞 Fix FloatButton `tooltip` property is not support `0` value. [#39425](https://github.com/ant-design/ant-design/pull/39425) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Space wrapped Select not display clear icon problem when mouse hover. [#39468](https://github.com/ant-design/ant-design/pull/39468) [@foryuki](https://github.com/foryuki)
- 💄 Fix Cascader ul has unexpected margin value. [#39436](https://github.com/ant-design/ant-design/pull/39436) [@ZN1996](https://github.com/ZN1996)
- 💄 Fix Input has unexpected padding problem in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Optimize Message padding in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Radio.Button has unexpected text color in dark mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Select has unexpected padding problem in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Slider has unexpected size for marking dot. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Optimize Switch color in dark mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)

## 5.0.5

`2022-12-08`

- 🐞 Fix button hover style in Space.Compact. [#39157](https://github.com/ant-design/ant-design/pull/39157) [@foryuki](https://github.com/foryuki)
- 🐞 Fix Tabs active bar missing sometimes in windows Chrome. [#39352](https://github.com/ant-design/ant-design/pull/39352) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix Divider `horizontal` align issue in flex layout. [#39339](https://github.com/ant-design/ant-design/pull/39339)
- 🐞 Fix Popover width in rtl mode. [#39311](https://github.com/ant-design/ant-design/pull/39311)
- 🐞 Fix Popconfirm padding style issue when `wireframe` is `true`. [#39313](https://github.com/ant-design/ant-design/pull/39313) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Select search input with white space style issue. [#39299](https://github.com/ant-design/ant-design/pull/39299) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Tree missing selection style. [#39292](https://github.com/ant-design/ant-design/pull/39292)
- 🐞 Fix FloatButton content not align when customize size. [#39282](https://github.com/ant-design/ant-design/pull/39282) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix RangePicker cell hover style. [#39266](https://github.com/ant-design/ant-design/pull/39266)
- 💄 Optimize Button style under Space.Compact. [#39241](https://github.com/ant-design/ant-design/pull/39241) [@foryuki](https://github.com/foryuki)
- 🌐 Fix `vi_VN` i18n mistake. [#39279](https://github.com/ant-design/ant-design/pull/39279) [@nghiepdev](https://github.com/nghiepdev)
- 🌐 Fix `he_IL` i18n mistake. [#39280](https://github.com/ant-design/ant-design/pull/39280) [@Ran-Sagy](https://github.com/Ran-Sagy)
- TypeScript
  - 🤖 Optimize Anchor `onClick` event definition. [#39305](https://github.com/ant-design/ant-design/pull/39305) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.0.4

`2022-12-05`

- Modal
  - 🐞 Fix Modal with long content exceed the panel. [#39249](https://github.com/ant-design/ant-design/pull/39249) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🐞 Fix Modal.info content width when without icon. [#39047](https://github.com/ant-design/ant-design/pull/39047) [@owjs3901](https://github.com/owjs3901)
- 🐞 Fix Tree config `checkable` and `blockNode` not makes `title` stretch issue. [#39209](https://github.com/ant-design/ant-design/pull/39209) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Dropdown sub menu missing motion. [#39235](https://github.com/ant-design/ant-design/pull/39235)
- 💄 Fix RangePicker time panel padding style. [#39228](https://github.com/ant-design/ant-design/pull/39228)
- 🐞 Fix Card action button round style. [#39210](https://github.com/ant-design/ant-design/pull/39210) [@muxin](https://github.com/muxin)
- 🐞 Fix Badge wave effect color not follow `color`. [#39182](https://github.com/ant-design/ant-design/pull/39182) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Radio disabled status check style. [#39165](https://github.com/ant-design/ant-design/pull/39165) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fixed TextArea count style when `resize` is not `none`. [#39121](https://github.com/ant-design/ant-design/pull/39121) [@51wangping](https://github.com/51wangping)
- 🐞 Fix Transfer clicking the checkbox position cannot be unchecked and onSelectChange is triggered twice. [#39078](https://github.com/ant-design/ant-design/pull/39078) [@edc-hui](https://github.com/edc-hui)
- 🐞 Fix Steps set `size="small"` with progress not fully display. [#39100](https://github.com/ant-design/ant-design/pull/39100) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Form horizontal layout with `xs` responsive config not work. [#39130](https://github.com/ant-design/ant-design/pull/39130)
- 🐞 Fix message position not correct in RTL. [#39248](https://github.com/ant-design/ant-design/pull/39248) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Switch only set with `checkedChildren` or `unCheckedChildren` content not display. [#39262](https://github.com/ant-design/ant-design/pull/39262)

## 5.0.3

`2022-11-30`

- 🐞 Fix Spin alignment when using `tip`. [#38923](https://github.com/ant-design/ant-design/pull/38923) [@sribich](https://github.com/sribich)
- Menu
  - 🐞 Fix Menu Submenu style when overflowed. [#39093](https://github.com/ant-design/ant-design/pull/39093)
  - 🐞 Fix Menu.Item hover area when trigger active color change. [#39077](https://github.com/ant-design/ant-design/pull/39077) [@Pulset](https://github.com/Pulset)
- 🐞 Fix Input.TextArea resize behavior by adding reset style. [aa92f02](https://github.com/ant-design/ant-design/commit/aa92f02)
- 🐞 Fix Upload default icon color. [#39114](https://github.com/ant-design/ant-design/pull/39114) [@MARKX97](https://github.com/MARKX97)
- 🐞 Fix ssr warning in dev mode caused by dynamic hashId. [#39069](https://github.com/ant-design/ant-design/pull/39069)
- 🐞 Fix FloatButton.Group flicking on closing. [#39061](https://github.com/ant-design/ant-design/pull/39061)
- 🐞 Fix Card.Meta that width is not 100%. [#39026](https://github.com/ant-design/ant-design/pull/39026) [@justanotheranonymoususer](https://github.com/justanotheranonymoususer)

## 5.0.2

`2022-11-27`

- 💄 Fix Card radius style broken when customize `bodyStyle` background color. [#38973](https://github.com/ant-design/ant-design/pull/38973) [@Yukiniro](https://github.com/Yukiniro)
- 💄 Optimize default algorithm for error color. [#38933](https://github.com/ant-design/ant-design/pull/38933)
- 💄 Optimize the style issue in RTL mode. [#38829](https://github.com/ant-design/ant-design/pull/38829) [@Wxh16144](https://github.com/Wxh16144)
- Space.Compact
  - 💄 Optimize Space.Compact style when wrapping a single child component. [#38896](https://github.com/ant-design/ant-design/pull/38896) [@foryuki](https://github.com/foryuki)
  - 💄 Fix Space.Compact component style problem when wrapping Modal, Dropdown, Drawer and other components. [#38870](https://github.com/ant-design/ant-design/pull/38870) [@foryuki](https://github.com/foryuki)
- 🐞 Fix horizontal Menu that has wrong width when is overflow. [#38989](https://github.com/ant-design/ant-design/pull/38989)
- 🐞 Fix Table that the old filter state still takes effect when the list filter column changes. [#38982](https://github.com/ant-design/ant-design/pull/38982)
- 🐞 Fix Select and Pagination incorrect text color in dark theme. [#38979](https://github.com/ant-design/ant-design/pull/38979) [@Dunqing](https://github.com/Dunqing)
- 🐞 Fix that Mentions `options` props not working. [#38968](https://github.com/ant-design/ant-design/pull/38968) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix that `dist/reset.css` may be dropped in production. [#38956](https://github.com/ant-design/ant-design/pull/38956) [@passerV](https://github.com/passerV)
- 🐞 Fix Badge that `showZero` can't be used with custom color. [#38967](https://github.com/ant-design/ant-design/pull/38967) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Form validation motion flick issue. [#38962](https://github.com/ant-design/ant-design/pull/38962)
- 🐞 Fix Tabs dropdown motion not work. [#38892](https://github.com/ant-design/ant-design/pull/38892)
- 🐞 Fix ConfigProvider that `componentDisabled` is not work. [#38886](https://github.com/ant-design/ant-design/pull/38886) [@lidianhao123](https://github.com/lidianhao123)
- 🐞 Fix Button `block` prop is not working when `shape="round"`. [#38869](https://github.com/ant-design/ant-design/pull/38869) [@jjlstruggle](https://github.com/jjlstruggle)
- 🐞 Fix Dropdown.Button that `dropdownRender` is not executed. [#38862](https://github.com/ant-design/ant-design/pull/38862) [@imoctopus](https://github.com/imoctopus)

## 5.0.1

`2022-11-22`

- 💄 Optimize Empty svg color in dark theme. [#38785](https://github.com/ant-design/ant-design/pull/38785)
- 💄 Fix Form, Input, Select, Tree part style convert to CSS-in-JS missing. [#38742](https://github.com/ant-design/ant-design/pull/38742)
- 💄 Fix animation flick for some components in Firefox. [#38729](https://github.com/ant-design/ant-design/pull/38729)
- Menu
  - 🐞 Fix Menu SubMenu margin style. [#38714](https://github.com/ant-design/ant-design/pull/38714) [@JarvisArt](https://github.com/JarvisArt)
  - 🐞 Fix Menu height in dark theme. [#38741](https://github.com/ant-design/ant-design/pull/38741) [@LuciNyan](https://github.com/LuciNyan)
  - 🐞 Fix Menu SubMenu flicking when expanding. [#38748](https://github.com/ant-design/ant-design/pull/38748) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix that Table expanded icons are not aligned。[#38823](https://github.com/ant-design/ant-design/pull/38823) [@turdiyev](https://github.com/turdiyev)
- 🐞 Fix FloatButton.BackTop missing animation. [#38770](https://github.com/ant-design/ant-design/pull/38770) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Remove `Moment.js` dependency. [#38762](https://github.com/ant-design/ant-design/pull/38762)
- 🛠 Fix `CompoundedComponent` ts error。[#38666](https://github.com/ant-design/ant-design/pull/38666) [@wangcch](https://github.com/wangcch)
- 🛠 Rollback `lib` in package。[#38832](https://github.com/ant-design/ant-design/pull/38832) [@chunsch](https://github.com/chunsch)

## 5.0.0

`2022-11-18`

🏆 Ant Design 5.0.0 is released, see our [release note](https://github.com/ant-design/ant-design/issues/38671) for more details.

#### Read it before migration

🌟 If you want to migrate to Ant Design 5.0, please check [V4 to V5](/docs/react/migration-v5).

#### Major Changes

- 🔥 New Components
  - 🔥 FloatButton component, and refactor BackTop as child component of FloatButton. [#37520](https://github.com/ant-design/ant-design/pull/37520) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Tour component. [#37867](https://github.com/ant-design/ant-design/pull/37867) [#38469](https://github.com/ant-design/ant-design/pull/38469) [@heiyu4585](https://github.com/heiyu4585)
- 🔥 New Component Variants
  - 🔥 DatePicker add `presets` to support preset ranges for quick selection. [#38249](https://github.com/ant-design/ant-design/pull/38249)
  - 🔥 Progress `circle` type support responsive `format` text for small size. [#38231](https://github.com/ant-design/ant-design/pull/38231) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Steps add `inline` type. [#38311](https://github.com/ant-design/ant-design/pull/38311) [@JarvisArt](https://github.com/JarvisArt)
- 💄 New Design
  - 💄 Change primary color to `#1677ff`. [#37254](https://github.com/ant-design/ant-design/pull/37254)
  - 💄 Change basic border radius to `6px`, and support gradient radius. [#37146](https://github.com/ant-design/ant-design/pull/37146) [#37369](https://github.com/ant-design/ant-design/pull/37369)
  - 💄 Optimize transition duration. [#37438](https://github.com/ant-design/ant-design/pull/37438)
  - 💄 Optimize padding and remove border for some components. [#37283](https://github.com/ant-design/ant-design/pull/37283)
    - 💄 Pagination remove border. [#37441](https://github.com/ant-design/ant-design/pull/37441)
    - 💄 Optimize Timeline style. [#37465](https://github.com/ant-design/ant-design/pull/37465)
    - 💄 Optimize Steps style. [#37473](https://github.com/ant-design/ant-design/pull/37473)
  - 💄 Optimize focus style for some components. [#37483](https://github.com/ant-design/ant-design/pull/37483)
  - 💄 Optimize style with large border radius.
    - 💄 Optimize Table hover style. [#37370](https://github.com/ant-design/ant-design/pull/37370)
    - 💄 Optimize Segmented hover style. [#37498](https://github.com/ant-design/ant-design/pull/37498)
    - 💄 Optimize Dropdown hover style. [#37491](https://github.com/ant-design/ant-design/pull/37491)
    - 💄 Optimize close button style for some components like Modal. [#37634](https://github.com/ant-design/ant-design/pull/37634)
    - 💄 Optimize Menu style. [#38009](https://github.com/ant-design/ant-design/pull/38009)
    - 💄 Optimize hover style for some more components. [#37433](https://github.com/ant-design/ant-design/pull/37433)
  - 💄 Optimize Switch transition. [#37658](https://github.com/ant-design/ant-design/pull/37658)
  - 💄 Optimize Anchor ink ball style. [#38616](https://github.com/ant-design/ant-design/pull/38616)
- 🆕 Export object `theme` which contains hooks and algorithms related with theme. [#36302](https://github.com/ant-design/ant-design/pull/36302)
  - 🆕 Add `theme.useToken` hook to get Design Token in context. [#36267](https://github.com/ant-design/ant-design/pull/36267)
  - 🆕 Preset algorithm
    - 🆕 Default algorithm `theme.defaultAlgorithm`. [#36175](https://github.com/ant-design/ant-design/pull/36175)
    - 🆕 Dark algorithm `theme.darkAlgorithm`. [#36546](https://github.com/ant-design/ant-design/pull/36546) [#36656](https://github.com/ant-design/ant-design/pull/36656)
    - 🆕 Compact algorithm `theme.compactAlgorithm`. [#38105](https://github.com/ant-design/ant-design/pull/38105)
- 🆕 ConfigProvider support `theme` prop to modify theme configuration. For more: [Customize Theme](https://ant.design/docs/react/customize-theme).
  - 🆕 Support multiple `algorithm` pipeline. [#37082](https://github.com/ant-design/ant-design/pull/37082)
  - 🆕 Support switching wireframe style. [#37507](https://github.com/ant-design/ant-design/pull/37507)
  - 🆕 Support override Design Token for single component. [#37568](https://github.com/ant-design/ant-design/pull/37568)
- 🆕 Add `locale` directory in package, which contains commonjs locale files. [#38194](https://github.com/ant-design/ant-design/pull/38194) [@chunsch](https://github.com/chunsch)
- 🗑 Do not support IE browser anymore.
- 🗑 Remove package `antd/lib`. [#36362](https://github.com/ant-design/ant-design/pull/36362)
  - 🛠 Change `main` in `package.json` to `dist/antd.js`. [eb8835f](https://github.com/ant-design/ant-design/commit/eb8835fe29b39767c0f5e310f5c69619a75d5840)
- 🗑 Remove `dist/antd.css`, and add `dist/reset.css` to override common styles. [#36224](https://github.com/ant-design/ant-design/pull/36224)
- 🗑 Deprecate `visible` and provide `open` instead in components below. [@yykoypj](https://github.com/yykoypj)
  - 🗑 Tag deprecate `visible`. [#36671](https://github.com/ant-design/ant-design/pull/36671)
  - 🗑 Table deprecate `filterDropdownVisible` and provide `filterDropdownOpen`. [#36747](https://github.com/ant-design/ant-design/pull/36747)
  - 🗑 Drawer deprecate `visible` and provide `open` instead. [#36750](https://github.com/ant-design/ant-design/pull/36750)
  - 🗑 Modal deprecate `visible` and provide `open` instead. [#36774](https://github.com/ant-design/ant-design/pull/36774)
  - 🗑 Dropdown deprecate `visible` and provide `open` instead. [#36799](https://github.com/ant-design/ant-design/pull/36799)
  - 🗑 Tooltip deprecate `visible` and provide `open` instead, Popover and Popconfirm. [#36807](https://github.com/ant-design/ant-design/pull/36807)
- 🗑 Deprecate `dropdownClassName` and provide `popupClassName` instead in components below. [@heiyu4585](https://github.com/heiyu4585)
  - 🗑 AutoComplete deprecate `dropdownClassName` and provide `popupClassName` instead. [#37087](https://github.com/ant-design/ant-design/pull/37087)
  - 🗑 Mentions deprecate `dropdownClassName` and provide `popupClassName` instead. [#37122](https://github.com/ant-design/ant-design/pull/37122)
  - 🗑 Cascader deprecate `dropdownClassName` and provide `popupClassName` instead. [#37089](https://github.com/ant-design/ant-design/pull/37089)
  - 🗑 Select deprecate `dropdownClassName` and provide `popupClassName` instead. [#37091](https://github.com/ant-design/ant-design/pull/37091)
  - 🗑 TreeSelect deprecate `dropdownClassName` and provide `popupClassName` instead. [#37092](https://github.com/ant-design/ant-design/pull/37092)
  - 🗑 DatePicker and TimePicker deprecate `dropdownClassName` and provide `popupClassName` instead. [#37207](https://github.com/ant-design/ant-design/pull/37207)
- 🛠 Refactor styles with CSS-in-JS for all components.
  - 🗑 Remove less and css in package. [#36244](https://github.com/ant-design/ant-design/pull/36244)
- 🛠 Change date library from Moment.js to Day.js, for more: [Use custom date library](https://ant.design/docs/react/use-custom-date-library). [b22815d](https://github.com/ant-design/ant-design/commit/b22815d4d223b80755b472e14d7888beab8dd1da) [@iamkun](https://github.com/iamkun)
- 🛠 React Notification to support React 18 concurrent mode and refactor useNotification hook，which is preferred instead of static function. [#35423](https://github.com/ant-design/ant-design/pull/35423) [#35568](https://github.com/ant-design/ant-design/pull/35568)
- 🛠 Slider props related with Tooltip are unified into `tooltip`. [#37043](https://github.com/ant-design/ant-design/pull/37043) [@yykoypj](https://github.com/yykoypj)
- 🛠 Migrate official site to [dumi@2](https://next.d.umijs.org/). [#38328](https://github.com/ant-design/ant-design/pull/38328)

## 4.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.en-US.md) to read `4.x` change logs.

## 3.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.en-US.md) to read `3.x` change logs.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
