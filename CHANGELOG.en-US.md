---
order: 6
title: Changelog
timeline: true
tag: vVERSION
---

`antd` follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfixes (anytime for an urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking changes and new features.

---

## 6.3.3

`2026-03-16`

- Image
  - 💄 Improve Image preview mask blur transition for `backdrop-filter` to reduce flicker perception. [#57299](https://github.com/ant-design/ant-design/pull/57299) [@mango766](https://github.com/mango766)
  - 🐞 Fix Image showing move cursor when `movable={false}`. [#57288](https://github.com/ant-design/ant-design/pull/57288) [@ug-hero](https://github.com/ug-hero)
- ⌨️ Improve App link `:focus-visible` outline to enhance keyboard accessibility. [#57266](https://github.com/ant-design/ant-design/pull/57266) [@ug-hero](https://github.com/ug-hero)
- 🐞 Fix Form required mark using hardcoded `SimSun` font. [#57273](https://github.com/ant-design/ant-design/pull/57273) [@mavericusdev](https://github.com/mavericusdev)
- 🐞 Fix Grid media size mapping issue for `xxxl` breakpoint. [#57246](https://github.com/ant-design/ant-design/pull/57246) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 Fix Tree scrolling to top when clicking node. [#57242](https://github.com/ant-design/ant-design/pull/57242) [@aojunhao123](https://github.com/aojunhao123)

## 6.3.2

`2026-03-09`

- 🐞 Fix Form.Item validation failure caused by a timing issue when using dynamic `rules` and `dependencies` together. [#57147](https://github.com/ant-design/ant-design/pull/57147) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix InputNumber height in `borderless` variant when using with Input or Select. [#57162](https://github.com/ant-design/ant-design/pull/57162) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix Radio.Group radio button width when options text has different length or breaks. [#57171](https://github.com/ant-design/ant-design/pull/57171) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix Skeleton.Avatar, Skeleton.Button, Skeleton.Input, Rate and Spin cannot take effect when `componentSize` is set globally. [#57093](https://github.com/ant-design/ant-design/pull/57093) [#57106](https://github.com/ant-design/ant-design/pull/57106) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix Splitter may calculate wrong `size` if some panel in controlled mode. [#57142](https://github.com/ant-design/ant-design/pull/57142) [@js0753](https://github.com/js0753)
- 🐞 Fix Tree and TreeSelect line alignment problem when customizing `titleHeight` property. [#56785](https://github.com/ant-design/ant-design/pull/56785) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Fix Checkbox.Group checkbox width when options text has different length or breaks. [#57144](https://github.com/ant-design/ant-design/pull/57144) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Fix ConfigProvider `csp` not taking effect on all the dynamic style. [#57159](https://github.com/ant-design/ant-design/pull/57159) [@zombieJ](https://github.com/zombieJ)
- Select
  - 💄 Fix Select text jumping problem in Firefox browser. [#57030](https://github.com/ant-design/ant-design/pull/57030) [@pierreeurope](https://github.com/pierreeurope)
  - 💄 Fix Select cannot set `visibility: hidden` via `style` property. [#56720](https://github.com/ant-design/ant-design/pull/56720) [@claytonlin1110](https://github.com/claytonlin1110)
- Upload
  - 💄 Fix Upload has invalid blank area in `picture-card` mode with empty data. [#57157](https://github.com/ant-design/ant-design/pull/57157) [@QDyanbing](https://github.com/QDyanbing)
  - ⌨️ Improve Upload to always show item action area on non-hover or coarse-pointer devices. [#57156](https://github.com/ant-design/ant-design/pull/57156) [@Arktomson](https://github.com/Arktomson)
- 🌐 Add `es_US` locale preset. [#57137](https://github.com/ant-design/ant-design/pull/57137) [@yuriidumych-max](https://github.com/yuriidumych-max)
- 🛠 Unify `size` enumeration, replace `default` with `medium` for Badge, Card, Progress, Steps, Switch and Spin, replace `middle` and `default` with `medium` and `large` for Descriptions, replace `middle` with `medium` for Table and Divider. [#57127](https://github.com/ant-design/ant-design/pull/57127) [#57106](https://github.com/ant-design/ant-design/pull/57106) [@QDyanbing](https://github.com/QDyanbing)
- 🛠 Unify `size` className for all components DOM. [#57106](https://github.com/ant-design/ant-design/pull/57106) [@QDyanbing](https://github.com/QDyanbing)
- TypeScript
  - 🤖 Add Upload.Dragger generic type definition support. [#57103](https://github.com/ant-design/ant-design/pull/57103) [@fnoopv](https://github.com/fnoopv)
  - 🤖 Fix Modal `KeyboardEvent` type definition for the arguments of `onCancel` event handler. [#57048](https://github.com/ant-design/ant-design/pull/57048) [@eureka928](https://github.com/eureka928)

## 6.3.1

`2026-02-24`

- Select
  - 🐞 Fix Select incorrect dropdown height when `value` is an empty string. [#56976](https://github.com/ant-design/ant-design/pull/56976) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Fix Select value echo issue when `value` is an empty string. [#56966](https://github.com/ant-design/ant-design/pull/56966) [@luozz1994](https://github.com/luozz1994)
  - 🐞 Fix Select & TreeSelect selected value text still visible when searching. [#56946](https://github.com/ant-design/ant-design/pull/56946)
- 🐞 Fix TreeSelect Checkbox being compressed when multi-line text is present. [#56961](https://github.com/ant-design/ant-design/pull/56961) [@luozz1994](https://github.com/luozz1994)
- 🐞 Fix Typography hovering copy button triggering ellipsis tooltip when both `copyable` and `ellipsis` are enabled; fix ellipsis tooltip not appearing after moving back from copy button. [#56855](https://github.com/ant-design/ant-design/pull/56855) [@claytonlin1110](https://github.com/claytonlin1110)
- 🐞 Fix Progress animation overflow when `status="active"`. [#56972](https://github.com/ant-design/ant-design/pull/56972) [@aibayanyu20](https://github.com/aibayanyu20)
- 🐞 Fix Upload picture-wall mode list overflow and overlap when file count exceeds one row. [#56945](https://github.com/ant-design/ant-design/pull/56945) [@xbsheng](https://github.com/xbsheng)
- 🐞 Fix Image flickering in some browsers when opening preview. [#56937](https://github.com/ant-design/ant-design/pull/56937) [@zombieJ](https://github.com/zombieJ)
- ⌨️ ♿ Add `prefers-reduced-motion` media query support for Button, Checkbox, Radio, Switch, Segmented to disable transitions for improved accessibility. [#56902](https://github.com/ant-design/ant-design/pull/56902) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Input height inconsistency with Select when using `variant="borderless"`. [#57014](https://github.com/ant-design/ant-design/pull/57014) [@njlazzar-su](https://github.com/njlazzar-su)
- 🐞 Fix Modal `confirm` method layout whitespace when `icon` is empty. [#57024](https://github.com/ant-design/ant-design/pull/57024) [@Arktomson](https://github.com/Arktomson)
- 🐞 Add `aria-disabled` attribute for disabled options in Select component.[#57049](https://github.com/ant-design/ant-design/pull/57049) [@meet-student](https://github.com/meet-student)

## 6.3.0

`2026-02-10`

- ConfigProvider
  - 🆕 Support ConfigProvider global configuration of `maskClosable` for Modal and Drawer. [#56739](https://github.com/ant-design/ant-design/pull/56739) [@luozz1994](https://github.com/luozz1994)
  - 🆕 Support ConfigProvider `suffixIcon` global configuration for DatePicker and TimePicker. [#56709](https://github.com/ant-design/ant-design/pull/56709) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Support ConfigProvider `expandIcon` and `loadingIcon` global configuration for Cascader. [#56482](https://github.com/ant-design/ant-design/pull/56482) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Support ConfigProvider `scroll` global configuration for Table. [#56628](https://github.com/ant-design/ant-design/pull/56628) [@Clayton](https://github.com/Clayton)
  - 🆕 Support ConfigProvider `className` and `style` configuration for App, and `arrow` prop for ColorPicker. [#56573](https://github.com/ant-design/ant-design/pull/56573) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Support ConfigProvider `loadingIcon` global configuration for Button. [#56439](https://github.com/ant-design/ant-design/pull/56439) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Support ConfigProvider `rangePicker.separator` global configuration. [#56499](https://github.com/ant-design/ant-design/pull/56499) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Support ConfigProvider `tooltipIcon` and `tooltipProps` global configuration for Form. [#56372](https://github.com/ant-design/ant-design/pull/56372) [@guoyunhe](https://github.com/guoyunhe)
- Upload
  - 🆕 Add Upload `classNames.trigger` and `styles.trigger` props. [#56578](https://github.com/ant-design/ant-design/pull/56578) [@QdabuliuQ](https://github.com/QdabuliuQ)
  - 🆕 Support Upload.Dragger `onDoubleClick` event. [#56579](https://github.com/ant-design/ant-design/pull/56579) [@ug-hero](https://github.com/ug-hero)
  - 🐞 Fix Upload missing default height for `picture-card` / `picture-circle` parent nodes. [#56864](https://github.com/ant-design/ant-design/pull/56864) [@wanpan11](https://github.com/wanpan11)
- 🆕 Add Grid `xxxl` (1920px) breakpoint to adapt to FHD screens. [#56825](https://github.com/ant-design/ant-design/pull/56825) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Support Switch `indicator` customization for semantic structure. [#56710](https://github.com/ant-design/ant-design/pull/56710) [@zombieJ](https://github.com/zombieJ)
- Button
  - 🐞 Fix Button reversed `hover` and `active` colors for `color` in dark theme. [#56872](https://github.com/ant-design/ant-design/pull/56872) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Fix Button border size not following Design Token `lineWidth`. [#56683](https://github.com/ant-design/ant-design/pull/56683) [@zombieJ](https://github.com/zombieJ)
- Select
  - 💄 Remove Select redundant `-content-value` div DOM in single mode to optimize semantic structure, allowing override via `classNames` and `styles`. [#56811](https://github.com/ant-design/ant-design/pull/56811) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Fix Select `notFoundContent` not taking effect. [#56756](https://github.com/ant-design/ant-design/pull/56756) [@QdabuliuQ](https://github.com/QdabuliuQ)
- Radio
  - 🐞 Fix Radio.Group extra right margin for radio items when vertically aligned. [#56909](https://github.com/ant-design/ant-design/pull/56909) [@jany55555](https://github.com/jany55555)
  - 💄 Remove Radio `-inner` DOM node of `icon` sub-element for better semantic structure adaptation. [#56783](https://github.com/ant-design/ant-design/pull/56783) [@zombieJ](https://github.com/zombieJ)
- 💄 Disable Modal & Drawer mask blur effect by default. [#56781](https://github.com/ant-design/ant-design/pull/56781) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 Fix Tooltip & Popover popup animation starting position being shifted to the left. [#56887](https://github.com/ant-design/ant-design/pull/56887) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix List color-related tokens not working for deprecated component config. [#56913](https://github.com/ant-design/ant-design/pull/56913) [@zombieJ](https://github.com/zombieJ)
- 🛠 Refactor Spin DOM structure to align across different scenarios and support full Semantic Structure. [#56852](https://github.com/ant-design/ant-design/pull/56852) [@zombieJ](https://github.com/zombieJ)
- ⌨️ ♿ Add Icon accessibility names to the search icon SVG to improve screen reader support. [#56521](https://github.com/ant-design/ant-design/pull/56521) [@huangkevin-apr](https://github.com/huangkevin-apr)
- 🐞 Fix Cascader filter list resetting immediately when closing on selection in search mode, affecting UX. [#56764](https://github.com/ant-design/ant-design/pull/56764) [@zombieJ](https://github.com/zombieJ)
- ⌨️ ♿ Improve Tree accessibility support. [#56716](https://github.com/ant-design/ant-design/pull/56716) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 Support ColorPicker semantic structure for selection block, and fix `root` semantic being incorrectly applied to popup elements. [#56607](https://github.com/ant-design/ant-design/pull/56607) [@zombieJ](https://github.com/zombieJ)
- 💄 Change Avatar default value of `size` from `default` to `medium` for consistency. [#56440](https://github.com/ant-design/ant-design/pull/56440) [@guoyunhe](https://github.com/guoyunhe)
- 💄 Remove Checkbox `-inner` DOM node of `icon` sub-element for better semantic structure adaptation. [#56783](https://github.com/ant-design/ant-design/pull/56783) [@zombieJ](https://github.com/zombieJ)
- MISC
  - 🐞 MISC: Fix React Compiler compatibility in UMD version, now disabled by default. [#56830](https://github.com/ant-design/ant-design/pull/56830) [@zombieJ](https://github.com/zombieJ)
  - 🛠 Streamline `styles` and `classNames` type definitions for better standardization. [#56758](https://github.com/ant-design/ant-design/pull/56758) [@crazyair](https://github.com/crazyair)

## 6.2.3

`2026-02-02`

- Button
  - 🐞 Fix Button `defaultBg`, `defaultColor`, `defaultHoverColor` and `defaultActiveColor` tokens not taking effect. [#56238](https://github.com/ant-design/ant-design/pull/56238) [@ug-hero](https://github.com/ug-hero)
  - 🐞 Fix Button default tokens not taking effect. [#56719](https://github.com/ant-design/ant-design/pull/56719) [@unknowntocka](https://github.com/unknowntocka)
  - 🐞 Fix Button `variant="solid"` borders displaying incorrectly inside Space.Compact. [#56486](https://github.com/ant-design/ant-design/pull/56486) [@Pareder](https://github.com/Pareder)
- 🐞 Fix Input.TextArea ref missing `nativeElement` property. [#56803](https://github.com/ant-design/ant-design/pull/56803) [@smith3816](https://github.com/smith3816)
- 🐞 Fix Flex default `align` not taking effect when using `orientation`. [#55950](https://github.com/ant-design/ant-design/pull/55950) [@YingtaoMo](https://github.com/YingtaoMo)
- 🐞 Fix Typography link selector specificity being too low causing styles to be overridden. [#56759](https://github.com/ant-design/ant-design/pull/56759) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix ColorPicker HEX input allowing invalid characters. [#56752](https://github.com/ant-design/ant-design/pull/56752) [@treephesians](https://github.com/treephesians)

## 6.2.2

`2026-01-26`

- 🐞 Fix Button with href wrapped by Typography showing incorrect color and flickering outline on hover. [#56619](https://github.com/ant-design/ant-design/pull/56619) [@QdabuliuQ](https://github.com/QdabuliuQ)
- 🐞 Fix component token not taking effect for Button with `type="text"`. [#56291](https://github.com/ant-design/ant-design/pull/56291) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix where components within the Popover were affected by the state association with Form.Item. [#56728](https://github.com/ant-design/ant-design/pull/56728)
- 🐞 Fix the placeholders displayed incorrectly when selecting multiple items in Select. [#56675](https://github.com/ant-design/ant-design/pull/56675)
- 💄 Fix misaligned elements in Pagination when the global `fontSize` is increased. [#56715](https://github.com/ant-design/ant-design/pull/56715) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Fix incorrect Drawer dragger position in RTL mode. [#56693](https://github.com/ant-design/ant-design/pull/56693) [@QdabuliuQ](https://github.com/QdabuliuQ)

## 6.2.1

`2026-01-20`

- 🐞 Fix Button child element's `className` be cleared if it contains two Chinese characters. [#56593](https://github.com/ant-design/ant-design/pull/56593) [@QdabuliuQ](https://github.com/QdabuliuQ)
- 🐞 Fix DatePicker DOM not updated bug after update `suffixIcon` as `null`. [#56637](https://github.com/ant-design/ant-design/pull/56637) [@AlanQtten](https://github.com/AlanQtten)
- 🐞 Fix Table content area border radius when set border radius for container. [#56478](https://github.com/ant-design/ant-design/pull/56478) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Fix Card unexpected border radius for Body area. [#56653](https://github.com/ant-design/ant-design/pull/56653) [@ug-hero](https://github.com/ug-hero)
- 💄 MISC: Fix unexpected `undefined` and `null` in the injected styles. [#56636](https://github.com/ant-design/ant-design/pull/56636) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 MISC: Improve `background` transition to `background-color` for all components. [#56598](https://github.com/ant-design/ant-design/pull/56598) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Improve Grid use `genCssVar` method to generate more stable CSS variable names. [#56635](https://github.com/ant-design/ant-design/pull/56635) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Improve @ant-design/icons usage to avoid depend on full package since externals. [#56639](https://github.com/ant-design/ant-design/pull/56639) [@ShenHongFei](https://github.com/ShenHongFei)


## 6.2.0

`2026-01-13`

- 🛠 Button, Masonry, Mentions, Select, Space, Splitter, Steps and other components batch use `genCssVar` method to generate more stable CSS variable names. [#56562](https://github.com/ant-design/ant-design/pull/56562) [#56559](https://github.com/ant-design/ant-design/pull/56559) [#56557](https://github.com/ant-design/ant-design/pull/56557) [#56555](https://github.com/ant-design/ant-design/pull/56555) [#56550](https://github.com/ant-design/ant-design/pull/56550) [#56547](https://github.com/ant-design/ant-design/pull/56547) [#56546](https://github.com/ant-design/ant-design/pull/56546) [#56529](https://github.com/ant-design/ant-design/pull/56529) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 QRCode adds `marginSize` property for displaying QR code margin area. [#56569](https://github.com/ant-design/ant-design/pull/56569) [@afc163](https://github.com/afc163)
- 🆕 Tour adds `keyboard` property to configure keyboard operations. [#56581](https://github.com/ant-design/ant-design/pull/56581) [@cactuser-Lu](https://github.com/cactuser-Lu)
- Tooltip
  - 🆕 Tooltip adds `maxWidth` design token. [#56540](https://github.com/ant-design/ant-design/pull/56540) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Tooltip/Popover/Popconfirm can be closed with ESC by default. [#56492](https://github.com/ant-design/ant-design/pull/56492) [@aojunhao123](https://github.com/aojunhao123)
- 🛠 Steps remove useless styles. [#56565](https://github.com/ant-design/ant-design/pull/56565) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Form supports `tel` type validation. [#56533](https://github.com/ant-design/ant-design/pull/56533) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 Fix Badge `ref` not working when using `text` property. [#56532](https://github.com/ant-design/ant-design/pull/56532) [@zombieJ](https://github.com/zombieJ)
- 🆕 Calendar and DatePicker `locale` configuration now supports partial content filling. [#56376](https://github.com/ant-design/ant-design/pull/56376) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix ConfigProvider `theme.cssVar` configuration not working for icons. [#56504](https://github.com/ant-design/ant-design/pull/56504) [@seanparmelee](https://github.com/seanparmelee)
- 🐞 Fix Collapse `items` semantic properties not working. [#56517](https://github.com/ant-design/ant-design/pull/56517) [@zombieJ](https://github.com/zombieJ)
- Modal
  - 🆕 Modal supports `focusable.trap` to configure whether to lock focus within the Modal. [#56500](https://github.com/ant-design/ant-design/pull/56500) [@zombieJ](https://github.com/zombieJ)
  - 🛠 Remove useless DOM structure from Modal and optimize focus capture to prevent accidental focus escape outside the Modal. [#56142](https://github.com/ant-design/ant-design/pull/56142) [@zombieJ](https://github.com/zombieJ)
- ConfigProvider
  - 🆕 ConfigProvider supports `pagination` configuration for `totalBoundary` and `showSizeChanger` properties. [#56475](https://github.com/ant-design/ant-design/pull/56475) [@chiaweilee](https://github.com/chiaweilee)
  - 🆕 ConfigProvider supports configuring Alert global icons. [#56241](https://github.com/ant-design/ant-design/pull/56241) [@guoyunhe](https://github.com/guoyunhe)
- Drawer
  - 🆕 Drawer adds `focusable` to configure focus behavior after opening, supporting focus locking within the container and focus returning after closing. [#56463](https://github.com/ant-design/ant-design/pull/56463) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Fix Drawer `size` definition not supporting string type. [#56358](https://github.com/ant-design/ant-design/pull/56358) [@ug-hero](https://github.com/ug-hero)
- 🐞 Fix Image nested in Modal cannot be closed sequentially with Esc. [#56386](https://github.com/ant-design/ant-design/pull/56386) [@aojunhao123](https://github.com/aojunhao123)
- 🆕 Pagination supports `size` property. [#56009](https://github.com/ant-design/ant-design/pull/56009) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Breadcrumb supports `dropdownIcon` customization. [#56250](https://github.com/ant-design/ant-design/pull/56250) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Checkbox.Group supports `role` configuration. [#56126](https://github.com/ant-design/ant-design/pull/56126) [@Pareder](https://github.com/Pareder)
- 💄 Mentions fix invalid style `padding: undefined` in different sizes. [#56564](https://github.com/ant-design/ant-design/pull/56564) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Select clear button alignment issue when `size="small"`. [#56525](https://github.com/ant-design/ant-design/pull/56525) [@QDyanbing](https://github.com/QDyanbing)

## 6.1.4

`2026-01-05`

- 🐞 Fix Select with multiple `aria-` attributes in DOM. [#56451](https://github.com/ant-design/ant-design/pull/56451) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix Table where hidden measure headers could mount interactive filter dropdowns and trigger unexpected close events when `scroll.y` is enabled. [#56425](https://github.com/ant-design/ant-design/pull/56425) [@QDyanbing](https://github.com/QDyanbing)

## 6.1.3

`2025-12-29`

- 🐞 Fix Drawer.PurePanel failing to respond to mouse interactions. [#56387](https://github.com/ant-design/ant-design/pull/56387) [@wanpan11](https://github.com/wanpan11)
- 🐞 Fix Select `options` props leaking to DOM elements and causing React unknown-prop warnings. [#56341](https://github.com/ant-design/ant-design/pull/56341) [@afc163](https://github.com/afc163)

## 6.1.2

`2025-12-24`

- 🐞 Button fix missing wave effect and the issue where the component could not show Dropdown on hover immediately after clicking. [#56273](https://github.com/ant-design/ant-design/pull/56273) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix Form.List with `useWatch` causing double rendering on item removal, with the first render showing an incorrect intermediate state. [#56319](https://github.com/ant-design/ant-design/pull/56319) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Breadcrumb fix style issue when using a custom `itemRender`. [#56253](https://github.com/ant-design/ant-design/pull/56253) [@guoyunhe](https://github.com/guoyunhe)
- Transfer
  - 💄 Remove Transfer className for the selected state when the component is `disabled`. [#56316](https://github.com/ant-design/ant-design/pull/56316) [@zenggpzqbx](https://github.com/zenggpzqbx)
  - 🐞 Transfer prioritize using the `disabled` property of the component. [#56280](https://github.com/ant-design/ant-design/pull/56280) [#56093](https://github.com/ant-design/ant-design/pull/56093) [@zenggpzqbx](https://github.com/zenggpzqbx)
- Select
  - 🐞 Fix Select missing semantic DOM names. [#56322](https://github.com/ant-design/ant-design/pull/56322) [@seanparmelee](https://github.com/seanparmelee)
  - 🐞 Fix Select wrong hover cursor style when in search mode. [#56130](https://github.com/ant-design/ant-design/pull/56130) [@fpsqdb](https://github.com/fpsqdb)
  - 🐞 Fix Select cursor style when disabled with `showSearch` enabled. [#56340](https://github.com/ant-design/ant-design/pull/56340) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Card fix style issue where an unexpected border radius is displayed when using `Card.Grid` without a header. [#56214](https://github.com/ant-design/ant-design/pull/56214) [@DDDDD12138](https://github.com/DDDDD12138)
- 💄 Tag deepen default background to improve borderless contrast. [#56326](https://github.com/ant-design/ant-design/pull/56326) [@QDyanbing](https://github.com/QDyanbing)
- ⌨ Segmented fix duplicate `role` and unnecessary `aria-` attributes on items. [#56278](https://github.com/ant-design/ant-design/pull/56278) [@aojunhao123](https://github.com/aojunhao123)

## 6.1.1

`2025-12-15`

- 🐞 Fix DatePicker cannot support webpack 4: Can't resolve '@rc-component/picker/locale/en_US'. [#56219](https://github.com/ant-design/ant-design/pull/56219) [@afc163](https://github.com/afc163)
- 🐞 Fix ColorPicker inconsistent input heights. [#56220](https://github.com/ant-design/ant-design/pull/56220) [@ug-hero](https://github.com/ug-hero)
- 🐞 Fix notification default background color not white when cssVar is disabled. [#56169](https://github.com/ant-design/ant-design/pull/56169) [@wanpan11](https://github.com/wanpan11)
- 🐞 Fix Input border missing when focused on Space.Compact with `allowClear` prop. [#56105](https://github.com/ant-design/ant-design/pull/56105) [@tuzixiangs](https://github.com/tuzixiangs)
- 🐞 Fix vertical Splitter incorrect collapse behavior in RTL mode, RTL flipping is now applied only to horizontal layouts [#56179](https://github.com/ant-design/ant-design/pull/56179) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 Fix Result not passing through `data-*` and `aria-*` attributes to the root DOM element. [#56165](https://github.com/ant-design/ant-design/pull/56165) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 MISC: `theme.cssVar.prefix` and `theme.cssVar.key` now respect empty string value. [#56146](https://github.com/ant-design/ant-design/pull/56146) [@QDyanbing](https://github.com/QDyanbing)
- 💄 Lift Breadcrumb link style priority. [#56137](https://github.com/ant-design/ant-design/pull/56137) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 Fix ConfigProvider `closable.placement` not working. [#55985](https://github.com/ant-design/ant-design/pull/55985) [@meet-student](https://github.com/meet-student)
- 🐞 Fix Form `onValuesChange` params missing Form.List nested content. [#56129](https://github.com/ant-design/ant-design/pull/56129) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix Select `selectorBg` token not working. [#56052](https://github.com/ant-design/ant-design/pull/56052) [@ug-hero](https://github.com/ug-hero)
- 🐞 Fix Upload incorrect progress position style. [#56194](https://github.com/ant-design/ant-design/pull/56194) [@QDyanbing](https://github.com/QDyanbing)

## 6.1.0

`2025-12-08`

- 🆕 ConfigProvider supports configuring the `trigger` property for Tooltip, Popover, and Popconfirm. [#55932](https://github.com/ant-design/ant-design/pull/55932) [@aojunhao123](https://github.com/aojunhao123)
- 🆕 Alert add semantic close button element. [#55815](https://github.com/ant-design/ant-design/pull/55815) [@coding-ice](https://github.com/coding-ice)
- Drawer
  - 🆕 Drawer add semantic close button element. [#55816](https://github.com/ant-design/ant-design/pull/55816) [@coding-ice](https://github.com/coding-ice)
  - 🆕 Drawer add boolean type setting for `resizable`. [#55861](https://github.com/ant-design/ant-design/pull/55861) [@cactuser-Lu](https://github.com/cactuser-Lu)
- Select
  - 🆕 Select add multi-field search functionality to `optionFilterProp`. [#56057](https://github.com/ant-design/ant-design/pull/56057) [@ug-hero](https://github.com/ug-hero)
  - 🐞 Fix Select input cursor displayed in non-search mode. [#56067](https://github.com/ant-design/ant-design/pull/56067) [@afc163](https://github.com/afc163)
  - 🐞 Fix the「Select」option was not enabled when Select contained interactive content. [#56054](https://github.com/ant-design/ant-design/pull/56054) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix Table `cellFontSizeSM` and `cellFontSizeLG` tokens not working. [#55770](https://github.com/ant-design/ant-design/pull/55770) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 Fix Button tokens (primaryColor, dangerColor, defaultHoverBg, defaultActiveBg) not working with specific variants (solid, outlined, dashed). [#55934](https://github.com/ant-design/ant-design/pull/55934) [@tuzixiangs](https://github.com/tuzixiangs)
- 💄 Fix Menu item styles not taking effect. [#56041](https://github.com/ant-design/ant-design/pull/56041) [@Wxh16144](https://github.com/Wxh16144)
- 🛠 MISC: `@ant-design/react-slick` remove `classnames`. [#56080](https://github.com/ant-design/ant-design/pull/56080) [@yoyo837](https://github.com/yoyo837)
- 🛠 MISC: Migrate `rc-overflow` to `@rc-component/overflow`, `rc-virtual-list` to `@rc-component/virtual-list` in order to remove `rc-util`. [#56074](https://github.com/ant-design/ant-design/pull/56074) [@yoyo837](https://github.com/yoyo837)
- TypeScript
  - 🤖 Alert now exports ErrorBoundaryProps type. [#55974](https://github.com/ant-design/ant-design/pull/55974) [@guoyunhe](https://github.com/guoyunhe)
  - 🤖 ConfigProvider supports passing a function as a Table `rowKey`. [#56095](https://github.com/ant-design/ant-design/pull/56095) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 The `title` attribute of the notification has been changed to be optional. [#56027](https://github.com/ant-design/ant-design/pull/56027) [@afc163](https://github.com/afc163)

## 6.0.1

`2025-12-02`

- Flex
  - 🐞 Fix Flex cannot pass `0` for `flex` property. [#55829](https://github.com/ant-design/ant-design/pull/55829) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🐞 Fix Flex cannot pass `0` for `gap` property. [#55803](https://github.com/ant-design/ant-design/pull/55803) [@li-jia-nan](https://github.com/li-jia-nan)
- Input
  - 🐞 Fix Input `colorText` token does not work with `filled` variant without affix. [#56019](https://github.com/ant-design/ant-design/pull/56019) [@ug-hero](https://github.com/ug-hero)
  - 🐞 Fix Input.OTP empty slots can be skipped when typing. [#56001](https://github.com/ant-design/ant-design/pull/56001) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 Fix Anchor scroll problem when click same link rapidly. [#55814](https://github.com/ant-design/ant-design/pull/55814) [@tuzixiangs](https://github.com/tuzixiangs)
- 🐞 Fix Button hover text color in `solid` variant. [#55825](https://github.com/ant-design/ant-design/pull/55825) [@andriib-ship-it](https://github.com/andriib-ship-it)
- 🐞 Fix Cascader page scroll to top on first open with defaultValue. [#55890](https://github.com/ant-design/ant-design/pull/55890) [@tuzixiangs](https://github.com/tuzixiangs)
- 🐞 Fix DatePicker `borderRadiusSM` and `borderRadiusLG` token not working bug. [#56018](https://github.com/ant-design/ant-design/pull/56018) [@ug-hero](https://github.com/ug-hero)
- 🐞 Fix InputNumber text clipping bug with ColorPicker. [#55966](https://github.com/ant-design/ant-design/pull/55966) [@DDDDD12138](https://github.com/DDDDD12138)
- 🐞 Fix Select text color for search input in dark mode. [#55914](https://github.com/ant-design/ant-design/pull/55914) [@divyeshagrawal](https://github.com/divyeshagrawal)
- 🐞 Fix Splitter failing to fill its container when the sum of panel proportions is not 1. [#56025](https://github.com/ant-design/ant-design/pull/56025) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix Wave memory leak risk since RAF not clean up. [#55962](https://github.com/ant-design/ant-design/pull/55962) [@Copilot](https://github.com/Copilot)
- 🐞 Fix Modal/Image/Drawer that the `colorBgMask` token does not take effect. [#56031](https://github.com/ant-design/ant-design/pull/56031) [@ug-hero](https://github.com/ug-hero)
- 💄 Fix ConfigProvider default not config `theme.hashed` is `true` which will cause style conflict with multiple versions. [#55880](https://github.com/ant-design/ant-design/pull/55880) [@zombieJ](https://github.com/zombieJ)
- 💄 Fix Layout.Sider styles lost when zeroRuntime enabled. [#55864](https://github.com/ant-design/ant-design/pull/55864) [@wanpan11](https://github.com/wanpan11)
- 🛠 MISC: Fix that could not build with pnpm `hoist: false`. [#55938](https://github.com/ant-design/ant-design/pull/55938) [@afc163](https://github.com/afc163)
- TypeScript
  - 🤖 Fix ConfigProvider type missing for Table `className` and `styles` config. [#55984](https://github.com/ant-design/ant-design/pull/55984) [@meet-student](https://github.com/meet-student)
  - 🤖 Fix DatePicker props type definition. [#55826](https://github.com/ant-design/ant-design/pull/55826) [@divyeshagrawal](https://github.com/divyeshagrawal)

## 6.0.0

`2025-11-22`

🏆 Ant Design 6.0.0 is released.

#### Read it before migration

🌟 If you want to migrate to Ant Design 6.0, please check [V5 to V6](/docs/react/migration-v6).

#### Major Changes

- 🔥 Semantic structure, Refer to [Discover the Delicate Beauty of Components with Semantic Design](/docs/blog/semantic-beauty) for details.
    <details>
    <summary>🔥 antd components support semantic structure and ConfigProvider config, spearheaded by <a href="https://github.com/thinkasany" target="_blank">@thinkasany</a>.</summary>

    - feat(Result): support `classNames` and `styles` for component and ConfigProvider [#52171](https://github.com/ant-design/ant-design/pull/52171)
    - feat(Statistic): support `classNames` and `styles` for component and ConfigProvider [#52141](https://github.com/ant-design/ant-design/pull/52141)
    - feat(Collapse): support `classNames` and `styles` for component and ConfigProvider [#52258](https://github.com/ant-design/ant-design/pull/52258)
    - feat(Badge.Ribbon): support ConfigProvider [#52303](https://github.com/ant-design/ant-design/pull/52303)
    - feat(Segmented): support `classNames` and `styles` for component and ConfigProvider [#52376](https://github.com/ant-design/ant-design/pull/52376)
    - feat(Modal): support `classNames` and `styles` for component and ConfigProvider [#52340](https://github.com/ant-design/ant-design/pull/52340)
    - feat(Alert): support `classNames` and `styles` for component and ConfigProvider [#52669](https://github.com/ant-design/ant-design/pull/52669)
    - feat(Skeleton): support `classNames` and `styles` [#52470](https://github.com/ant-design/ant-design/pull/52470) [@coding-ice](https://github.com/coding-ice)
    - feat(Notification): support `classNames` and `styles` for component and ConfigProvider [#52759](https://github.com/ant-design/ant-design/pull/52759)
    - feat(Tag): support `classNames` and `styles` for component and ConfigProvider [#52764](https://github.com/ant-design/ant-design/pull/52764)
    - feat(Affix): support `classNames` and `styles` for component and ConfigProvider [#52745](https://github.com/ant-design/ant-design/pull/52745)
    - feat(Checkbox): support `classNames` and `styles` for component and ConfigProvider [#52781](https://github.com/ant-design/ant-design/pull/52781)
    - feat(Radio): support `classNames` and `styles` for component and ConfigProvider [#52780](https://github.com/ant-design/ant-design/pull/52780)
    - feat(Message): support `classNames` and `styles` for component and ConfigProvider [#52793](https://github.com/ant-design/ant-design/pull/52793)
    - feat(Watermark): support `classNames` and `styles` for component and ConfigProvider [#52811](https://github.com/ant-design/ant-design/pull/52811)
    - feat(Spin): support `classNames` and `styles` for component and ConfigProvider [#52823](https://github.com/ant-design/ant-design/pull/52823)
    - feat(Switch): support `classNames` and `styles` for component and ConfigProvider [#52849](https://github.com/ant-design/ant-design/pull/52849)
    - feat(Breadcrumb): support `classNames` and `styles` for component and ConfigProvider [#52859](https://github.com/ant-design/ant-design/pull/52859)
    - feat(Anchor): support `classNames` and `styles` for component and ConfigProvider [#52866](https://github.com/ant-design/ant-design/pull/52866)
    - feat(Pagination): support `classNames` and `styles` for component and ConfigProvider [#52893](https://github.com/ant-design/ant-design/pull/52893)
    - feat(Tabs): support `classNames` and `styles` for component and ConfigProvider [#52895](https://github.com/ant-design/ant-design/pull/52895)
    - feat(Timeline): support `classNames` and `styles` for component and ConfigProvider [#52976](https://github.com/ant-design/ant-design/pull/52976)
    - feat(Mentions): support `classNames` and `styles` for component and ConfigProvider [#52961](https://github.com/ant-design/ant-design/pull/52961)
    - feat(Upload): support `classNames` and `styles` for component and ConfigProvider [#52972](https://github.com/ant-design/ant-design/pull/52972)
    - feat(Tour): support ConfigProvider [#52250](https://github.com/ant-design/ant-design/pull/52250)
    - feat(Button): support `classNames` and `styles` for component and ConfigProvider [#53055](https://github.com/ant-design/ant-design/pull/53055)
    - feat(Select): support `classNames` and `styles` for component and ConfigProvider [#52948](https://github.com/ant-design/ant-design/pull/52948)
    - feat(Image): support `classNames` and `styles` for component and ConfigProvider [#53028](https://github.com/ant-design/ant-design/pull/53028)
    - feat(Tree): support `classNames` and `styles` for component and ConfigProvider [#53174](https://github.com/ant-design/ant-design/pull/53174)
    - feat(AutoComplete): support `classNames` and `styles` for component and ConfigProvider [#53150](https://github.com/ant-design/ant-design/pull/53150)
    - feat(Splitter): support `classNames` and `styles` [#53225](https://github.com/ant-design/ant-design/pull/53225) [@wanpan11](https://github.com/wanpan11)
    - feat(Form): support `classNames` and `styles` for component and ConfigProvider [#53226](https://github.com/ant-design/ant-design/pull/53226)
    - feat(Calendar): support `classNames` and `styles` for component and ConfigProvider [#53159](https://github.com/ant-design/ant-design/pull/53159)
    - feat(TreeSelect): support `classNames` and `styles` for component and ConfigProvider [#53229](https://github.com/ant-design/ant-design/pull/53229)
    - feat(ColorPicker): support `classNames` and `styles` for component and ConfigProvider [#53303](https://github.com/ant-design/ant-design/pull/53303)
    - feat(Transfer): support `classNames` and `styles` for component and ConfigProvider [#53429](https://github.com/ant-design/ant-design/pull/53429) [@zombieJ](https://github.com/zombieJ)
    - feat(QRCode): support ConfigProvider [#52172](https://github.com/ant-design/ant-design/pull/52172)
    - feat(Progress): support `classNames` and `styles` for component and ConfigProvider [#53535](https://github.com/ant-design/ant-design/pull/53535) [@zombieJ](https://github.com/zombieJ)
    - feat(TimePicker, DatePicker): support `classNames` and `styles` for components and ConfigProvider [#53489](https://github.com/ant-design/ant-design/pull/53489)
    - feat(Menu): support `classNames` and `styles` for component and ConfigProvider [#53324](https://github.com/ant-design/ant-design/pull/53324)
    - feat(Dropdown): support `classNames` and `styles` for component and ConfigProvider [#53272](https://github.com/ant-design/ant-design/pull/53272)
    - feat(Cascader): support `classNames` and `styles` for component and ConfigProvider [#53694](https://github.com/ant-design/ant-design/pull/53694)
    - feat(InputNumber): support `classNames` and `styles` for component and ConfigProvider [#53698](https://github.com/ant-design/ant-design/pull/53698)
    - feat(Steps): support `classNames` and `styles` for component and ConfigProvider [#53789](https://github.com/ant-design/ant-design/pull/53789) [@zombieJ](https://github.com/zombieJ)
    - feat(Table): support `classNames` and `styles` for component and ConfigProvider [#53659](https://github.com/ant-design/ant-design/pull/53659)
    - feat(Divider): support `classNames` and `styles` for component and ConfigProvider [#53890](https://github.com/ant-design/ant-design/pull/53890)
    - feat(Input): support semantic DOM [#53958](https://github.com/ant-design/ant-design/pull/53958) [@aojunhao123](https://github.com/aojunhao123)
    - feat(FloatButton): support semantic structure and support ConfigProvider to pass related props [#54145](https://github.com/ant-design/ant-design/pull/54145) [@zombieJ](https://github.com/zombieJ)
    - refactor(Select): support semantic structure [#55430](https://github.com/ant-design/ant-design/pull/55430) [@zombieJ](https://github.com/zombieJ)

  </details>

  <details>
    <summary>🔥 antd components support dynamic semantic structure generation via function, spearheaded by <a href="https://github.com/meet-student" target="_blank">@meet-student</a>.</summary>

    - feat(button): Support better customization with semantic classNames/styles as  function [#54813](https://github.com/ant-design/ant-design/pull/54813)
    - feat(input): Support better customization with semantic classNames/styles as function [#54919](https://github.com/ant-design/ant-design/pull/54919)
    - feat(float-button): Support better customization with semantic classNames/styles as  function [#54917](https://github.com/ant-design/ant-design/pull/54917)
    - feat(divider): Support better customization with semantic classNames/styles as function [#54949](https://github.com/ant-design/ant-design/pull/54949)
    - feat(breadcrumb): Support better customization with semantic classNames/styles as function [#54950](https://github.com/ant-design/ant-design/pull/54950)
    - feat(anchor): Support better customization with semantic classNames/styles as function [#54948](https://github.com/ant-design/ant-design/pull/54948)
    - feat(masonry): Support better customization with semantic classNames/styles as function [#55032](https://github.com/ant-design/ant-design/pull/55032)
    - feat(Progress): Support better customization with semantic classNames & styles [#55058](https://github.com/ant-design/ant-design/pull/55058) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(menu): Support better customization with semantic classNames/styles as function [#54955](https://github.com/ant-design/ant-design/pull/54955)
    - feat(space): Support better customization with semantic classNames/styles as function [#55031](https://github.com/ant-design/ant-design/pull/55031) [@hcjlxl](https://github.com/hcjlxl)
    - feat(tabs): Support better customization with semantic classNames/styles as function [#54958](https://github.com/ant-design/ant-design/pull/54958)
    - feat(splitter): Support better customization with semantic classNames/styles as function [#55013](https://github.com/ant-design/ant-design/pull/55013) [@hcjlxl](https://github.com/hcjlxl)
    - feat(pagination): Support better customization with semantic classNames/styles as function [#54957](https://github.com/ant-design/ant-design/pull/54957)
    - feat(steps): Support better customization with semantic classNames/styles as function [#54956](https://github.com/ant-design/ant-design/pull/54956)
    - feat(dropdown): Support better customization with semantic classNames/styles as function [#55114](https://github.com/ant-design/ant-design/pull/55114) [@Arktomson](https://github.com/Arktomson)
    - feat(checkbox_radio): Support better customization with semantic classNames/styles as function [#55056](https://github.com/ant-design/ant-design/pull/55056)
    - feat(auto-complete): Support better customization with semantic classNames/styles as function [#54959](https://github.com/ant-design/ant-design/pull/54959)
    - feat(form): Support better customization with semantic classNames/styles as function [#55126](https://github.com/ant-design/ant-design/pull/55126)
    - feat(date-picker_time-picker): Support better customization with semantic classNames/styles as function [#54969](https://github.com/ant-design/ant-design/pull/54969)
    - feat(InputNumber): Support better customization with semantic classNames/styles as function [#54996](https://github.com/ant-design/ant-design/pull/54996) [@zjr222](https://github.com/zjr222)
    - feat(input-otp_textarea_search): Support better customization with semantic classNames/styles as function [#55109](https://github.com/ant-design/ant-design/pull/55109) [@Arktomson](https://github.com/Arktomson)
    - feat(mentions): Support better customization with semantic classNames/styles as function [#54963](https://github.com/ant-design/ant-design/pull/54963)
    - feat(select): Support better customization with semantic classNames/styles as function [#55101](https://github.com/ant-design/ant-design/pull/55101) [@Linkodt](https://github.com/Linkodt)
    - feat(slider): Support better customization with semantic classNames/styles as function [#54965](https://github.com/ant-design/ant-design/pull/54965)
    - feat(switch): Support better customization with semantic classNames/styles as function [#54994](https://github.com/ant-design/ant-design/pull/54994) [@xkhanhan](https://github.com/xkhanhan)
    - feat(transfer): Support better customization with semantic classNames/styles as function [#54966](https://github.com/ant-design/ant-design/pull/54966)
    - feat(upload): Support better customization with semantic classNames/styles as function [#54968](https://github.com/ant-design/ant-design/pull/54968)
    - feat(calendar): Support better customization with semantic classNames/styles as function [#54978](https://github.com/ant-design/ant-design/pull/54978)
    - feat(descriptions): Support better customization with semantic classNames/styles [#55118](https://github.com/ant-design/ant-design/pull/55118) [@tanjiahao24](https://github.com/tanjiahao24)
    - feat(empty): Support better customization with semantic classNames/styles as function [#55007](https://github.com/ant-design/ant-design/pull/55007) [@Susuperli](https://github.com/Susuperli)
    - refactor: semantic of Descriptions [#55190](https://github.com/ant-design/ant-design/pull/55190)
    - feat(qr-code): Support better customization with semantic classNames/styles as function [#54982](https://github.com/ant-design/ant-design/pull/54982)
    - feat(statistic): Support better customization with semantic classNames/styles as function [#55117](https://github.com/ant-design/ant-design/pull/55117) [@Arktomson](https://github.com/Arktomson)
    - feat(table): Support better customization with semantic classNames/styles as function [#54983](https://github.com/ant-design/ant-design/pull/54983)
    - feat(tag): Support better customization with semantic classNames/styles as function [#54984](https://github.com/ant-design/ant-design/pull/54984)
    - feat(alert): Support better customization with semantic classNames/styles [#55060](https://github.com/ant-design/ant-design/pull/55060) [@ccc1018](https://github.com/ccc1018)
    - feat(result): Support better customization with semantic classNames/styles as function [#55044](https://github.com/ant-design/ant-design/pull/55044) [@ccc1018](https://github.com/ccc1018)
    - feat(Drawer): Support better customization with semantic classNames & styles [#55096](https://github.com/ant-design/ant-design/pull/55096) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(Modal): Support better customization with semantic classNames & styles [#55081](https://github.com/ant-design/ant-design/pull/55081) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(notification): Support better customization with semantic classNames/styles as function [#55021](https://github.com/ant-design/ant-design/pull/55021) [@GinWU05](https://github.com/GinWU05)
    - feat(spin): Support better customization with semantic classNames/styles as function [#55157](https://github.com/ant-design/ant-design/pull/55157) [@Susuperli](https://github.com/Susuperli)
    - feat(card): Support better customization with semantic classNames/styles as function [#55161](https://github.com/ant-design/ant-design/pull/55161) [@lovelts](https://github.com/lovelts)
    - feat(collapse): Support better customization with semantic classNames/styles as function [#54979](https://github.com/ant-design/ant-design/pull/54979)
    - feat(message): support better customization with semantic classNames/styles [#55054](https://github.com/ant-design/ant-design/pull/55054) [@nmsn](https://github.com/nmsn)
    - feat(image): Support better customization with semantic classNames/styles as function [#54980](https://github.com/ant-design/ant-design/pull/54980)
    - feat(segmented): Support better customization with semantic classNames/styles as function [#55119](https://github.com/ant-design/ant-design/pull/55119) [@Arktomson](https://github.com/Arktomson)
    - feat(timeline): Support better customization with semantic classNames/styles as function [#54985](https://github.com/ant-design/ant-design/pull/54985)
    - refactor: semantic of message and notification [#55199](https://github.com/ant-design/ant-design/pull/55199)
    - feat(tour): Support better customization with semantic classNames/styles as function [#54987](https://github.com/ant-design/ant-design/pull/54987)
    - feat(tree): Support better customization with semantic classNames/styles as function [#54988](https://github.com/ant-design/ant-design/pull/54988)
    - feat(Popover/Tooltip/Popconfirm): Support better customization with semantic classNames/styles as function [#54986](https://github.com/ant-design/ant-design/pull/54986)
    - feat(Skeleton): Support better customization with semantic classNames & styles [#55099](https://github.com/ant-design/ant-design/pull/55099) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(cascader): Support better customization with semantic classNames/styles as function [#54960](https://github.com/ant-design/ant-design/pull/54960)
    - feat(color-picker): Support better customization with semantic classNames/styles as function [#54962](https://github.com/ant-design/ant-design/pull/54962)
    - feat(badge): Support better customization with semantic classNames/styles as function [#54977](https://github.com/ant-design/ant-design/pull/54977)
    - feat(tree-select): Support better customization with semantic classNames/styles as function [#54967](https://github.com/ant-design/ant-design/pull/54967)
    - feat(CheckableTagGroup): Support better customization with semantic classNames/styles as function [#55796](https://github.com/ant-design/ant-design/pull/55796)

  </details>

- 🔥 New Masonry component. [#52162](https://github.com/ant-design/ant-design/pull/52162) [@OysterD3](https://github.com/OysterD3)
- ConfigProvider
  - 🆕 ConfigProvider support Table `rowKey` global config. [#52751](https://github.com/ant-design/ant-design/pull/52751) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 ConfigProvider support Card.Meta config. [#52214](https://github.com/ant-design/ant-design/pull/52214) [@thinkasany](https://github.com/thinkasany)
  - 🆕 ConfigProvider support arrow for Tooltip, Popover, Popconfirm. [#52434](https://github.com/ant-design/ant-design/pull/52434) [@thinkasany](https://github.com/thinkasany)
  - 🆕 ConfigProvider support `root` config for Space. [#52248](https://github.com/ant-design/ant-design/pull/52248) [@thinkasany](https://github.com/thinkasany)
- Tooltip
  - 🔥 ConfigProvider supports configuring `tooltip.unique` to enable Tooltip smooth movement. [#55154](https://github.com/ant-design/ant-design/pull/55154) [@zombieJ](https://github.com/zombieJ)
  - ⚡️ Optimize Tooltip dev render performance(~40%) to enhance developer experience. [#53844](https://github.com/ant-design/ant-design/pull/53844) [@zombieJ](https://github.com/zombieJ)
- Input
  - 🔥 InputNumber support `mode="spinner"`. [#55592](https://github.com/ant-design/ant-design/pull/55592) [@guoyunhe](https://github.com/guoyunhe)
  - 🗑 Input.Search refactor to remove `addon*` code and use Space.Compact instead. [#55705](https://github.com/ant-design/ant-design/pull/55705) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 Fix Input.TextArea `styles.textarea` unable to override built-in styles. [#55579](https://github.com/ant-design/ant-design/pull/55579) [@meet-student](https://github.com/meet-student)
- 🆕 Pagination quick jumper now accept numberic value only. [#55700](https://github.com/ant-design/ant-design/pull/55700) [@afc163](https://github.com/afc163)
- Mentions
  - 🛠 Refactor Mentions DOM structure to support `suffix` semantic and `size` props. [#55638](https://github.com/ant-design/ant-design/pull/55638) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Fix Mentions `autoResize=false` can not drag to resize the box. [#54039](https://github.com/ant-design/ant-design/pull/54039) [@jin19980928](https://github.com/jin19980928)
- 🆕 Watermark support `onRemove` callback when delete by manully. [#55551](https://github.com/ant-design/ant-design/pull/55551) [@984507092](https://github.com/984507092)
- 🆕 Breadcrumb supports ConfigProvider `separator` global configuration. [#54680](https://github.com/ant-design/ant-design/pull/54680) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Alert `closable` supports onClose and afterClose methods. [#54735](https://github.com/ant-design/ant-design/pull/54735) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Radio.Group supports `vertical` layout syntax sugar. [#54727](https://github.com/ant-design/ant-design/pull/54727) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- Cascader
  - 🆕 Cascader support `aria-*` & `data-*` props. [#53910](https://github.com/ant-design/ant-design/pull/53910) [@kiner-tang](https://github.com/kiner-tang)
  - 🆕 Cascader.Panel adds optionRender to allow custom option rendering. [#54843](https://github.com/ant-design/ant-design/pull/54843) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Upload `accept` config supports custom filtering logic. [#55543](https://github.com/ant-design/ant-design/pull/55543) [@zombieJ](https://github.com/zombieJ)
- Rate
  - 🆕 Rate supports `size` to configure dimensions. [#55028](https://github.com/ant-design/ant-design/pull/55028) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Rate `tooltips` support all config. [07b1610](https://github.com/ant-design/ant-design/commit/07b1610) [@Jerryqun](https://github.com/Jerryqun)
- 🆕 Select support `onActive` keyboard and mouse interaction. [#53931](https://github.com/ant-design/ant-design/pull/53931) [@Wxh16144](https://github.com/Wxh16144)
- 🆕 Typography `copyable` supports HTTP environment. [#55073](https://github.com/ant-design/ant-design/pull/55073) [@JeeekXY](https://github.com/JeeekXY)
- Form
  - 🔥 Form `useWatch` support dynamic name path. [#54260](https://github.com/ant-design/ant-design/pull/54260) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Form now excludes unregistered field values from `Form.List` when getting values. [#55526](https://github.com/ant-design/ant-design/pull/55526) [@crazyair](https://github.com/crazyair)
  - ⚡️ Optimize Form `useWatch` perf when lots of Form.Item unmounted. [#54212](https://github.com/ant-design/ant-design/pull/54212) [@zombieJ](https://github.com/zombieJ)
- 🆕 Flex support `orientation` for layout. [#53648](https://github.com/ant-design/ant-design/pull/53648) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- DatePicker
  - 🆕 DatePicker semantic structure adds panel `container` support. [#55388](https://github.com/ant-design/ant-design/pull/55388) [@meet-student](https://github.com/meet-student)
  - 🆕 DatePicker adds `previewValue` to control whether to display preview value in input when hovering over options. [#55258](https://github.com/ant-design/ant-design/pull/55258) [@meet-student](https://github.com/meet-student)
  - 🐞 Fix DatePicker `onChange` parameter `dateString` returning incorrect value when clearing. [#55155](https://github.com/ant-design/ant-design/pull/55155) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- Drawer
  - 🆕 Drawer adds `resizable` to support drag capability. [#54883](https://github.com/ant-design/ant-design/pull/54883) [@cactuser-Lu](https://github.com/cactuser-Lu)
  - 💄 Drawer mask adds blur effect. [#54707](https://github.com/ant-design/ant-design/pull/54707) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 ColorPicker `presets` support linear gradient color. [#53250](https://github.com/ant-design/ant-design/pull/53250) [@zombieJ](https://github.com/zombieJ)
- Collapse
  - 🆕 Collapse `expandIconPosition` replaced with `expandIconPlacement` and use logical position to improve RTL experience. [#54311](https://github.com/ant-design/ant-design/pull/54311) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 Fix Collapse semantic structure `icon` targeting incorrect element. [#55499](https://github.com/ant-design/ant-design/pull/55499) [@thinkasany](https://github.com/thinkasany)
  - 🐞 Fix Collapse dynamic modification of semantic icon not taking effect. [#55452](https://github.com/ant-design/ant-design/pull/55452) [@thinkasany](https://github.com/thinkasany)
- Table
  - 🆕 Table `scrollTo` support `offset` to adjust scroll position. [#54385](https://github.com/ant-design/ant-design/pull/54385) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Table use `pagination.placement` instead of `pagination.position`. [#54338](https://github.com/ant-design/ant-design/pull/54338) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - ⌨️ Improve Table a11y behavior by adding `aria-description` when column is sortable. [#53087](https://github.com/ant-design/ant-design/pull/53087) [@jon-cullison](https://github.com/jon-cullison)
  - 🆕 Refactor Table `column.fixed` to use `start` & `end` to support logical position. [#53114](https://github.com/ant-design/ant-design/pull/53114) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Fix Table showing duplicate filter dropdowns and tooltips when using `sticky` or `scroll.y`. Fix Table column headers not displaying during initial render phase. [#54910](https://github.com/ant-design/ant-design/pull/54910) [@afc163](https://github.com/afc163)
  - 🐞 Fix Table data not refreshing when dynamically modifying `childrenColumnName`. [#55559](https://github.com/ant-design/ant-design/pull/55559) [@li-jia-nan](https://github.com/li-jia-nan)
- Progress
  - 🆕 Progress use `gapPlacement` instead `gapPosition` and replace `left` and `right` with `start` and `end`. [#54329](https://github.com/ant-design/ant-design/pull/54329) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 Fix Progress indicator content not updating when props change. [#55554](https://github.com/ant-design/ant-design/pull/55554) [@thinkasany](https://github.com/thinkasany)
- 🛠 Grid use CSS logical position to improve RTL experience. [#52560](https://github.com/ant-design/ant-design/pull/52560) [@li-jia-nan](https://github.com/li-jia-nan)
- Notification
  - 🛠 Notification support `closable` to take `onClose` & `closeIcon` into it. [#54645](https://github.com/ant-design/ant-design/pull/54645) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 Notification support custom progress bar color. [#52964](https://github.com/ant-design/ant-design/pull/52964) [@yellowryan](https://github.com/yellowryan)
  - 🆕 Notification adds new `title` property to replace the `message` property, and deprecates `message`. [#52759](https://github.com/ant-design/ant-design/pull/52759) [@thinkasany](https://github.com/thinkasany)
- Image
  - 🆕 Image `cover` support placement. [#54492](https://github.com/ant-design/ant-design/pull/54492) [@kiner-tang](https://github.com/kiner-tang)
  - 🛠 Image remove default cover icon & text (Still can use `cover` to config). [#54379](https://github.com/ant-design/ant-design/pull/54379) [@765477020](https://github.com/765477020)
  - 🐞 Fix Image preview text issue when in RTL. [#53596](https://github.com/ant-design/ant-design/pull/53596) [@aojunhao123](https://github.com/aojunhao123)
- Modal
  - 🆕 Modal `closable` support `onClose` props that trigger by any type of close. [#54607](https://github.com/ant-design/ant-design/pull/54607) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
    - 🆕 ConfigProvider support config Modal `okButtonProps` & `cancelButtonProps`. [#53684](https://github.com/ant-design/ant-design/pull/53684) [@guoyunhe](https://github.com/guoyunhe)
  - 🛠 Modal adjust DOM `className` to be align with semantic structure standard. [#54472](https://github.com/ant-design/ant-design/pull/54472) [@thinkasany](https://github.com/thinkasany)
  - ⌨️ Apply Modal `closable.aria-*` attribute on the close button. [#53289](https://github.com/ant-design/ant-design/pull/53289) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 Fix Modal quick switch `open` state will make screen operation frozen. [#52753](https://github.com/ant-design/ant-design/pull/52753) [@zombieJ](https://github.com/zombieJ)
- Theme
  - 🔥 Support `zeroRuntime` mode in `theme` prop of ConfigProvider, in order to avoid runtime style generation. [#54334](https://github.com/ant-design/ant-design/pull/54334) [@MadCcc](https://github.com/MadCcc)
  - 🆕 MISC: CSS-in-JS support `autoPrefixTransformer` to add browser style prefix. [#54427](https://github.com/ant-design/ant-design/pull/54427) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Design Token export cssVar in `useToken`. [#53195](https://github.com/ant-design/ant-design/pull/53195) [@MadCcc](https://github.com/MadCcc)
  - 💄 MISC: Remove mark style from reset.css. [#52974](https://github.com/ant-design/ant-design/pull/52974) [@afc163](https://github.com/afc163)
  - 🔥 MISC: Use CSS variables by default. [#52671](https://github.com/ant-design/ant-design/pull/52671) [@MadCcc](https://github.com/MadCcc)
  - 💄 Design Token add `colorBorderDisabled` token to unify border color in disabled state. [#52421](https://github.com/ant-design/ant-design/pull/52421) [@aojunhao123](https://github.com/aojunhao123)
- Segmented
  - 🆕 Segmented support `items.tooltip`. [#54273](https://github.com/ant-design/ant-design/pull/54273) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 Segmented support `orientation` for layout. [#53664](https://github.com/ant-design/ant-design/pull/53664) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🛠 Improve Segmented accessibility. [#52618](https://github.com/ant-design/ant-design/pull/52618) [@aojunhao123](https://github.com/aojunhao123)
- Tabs
  - 🆕 Tabs use `tabPlacement` instead `tabPosition` and replace `left` and `right` with `start` and `end`. [#54358](https://github.com/ant-design/ant-design/pull/54358) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 💄 Tabs remove active text shadow. [#53617](https://github.com/ant-design/ant-design/pull/53617) [@guoyunhe](https://github.com/guoyunhe)
  - 🐞 Fix Tabs focus behavior for empty TabPane to improve accessibility. [#52856](https://github.com/ant-design/ant-design/pull/52856) [@aojunhao123](https://github.com/aojunhao123)
  - 🛠 Remove Tabs deprecated API. [#52768](https://github.com/ant-design/ant-design/pull/52768) [@aojunhao123](https://github.com/aojunhao123)
- 🛠 Replace Steps `labelPlacement` to `titlePlacement` to unify the API. [#53873](https://github.com/ant-design/ant-design/pull/53873) [@zombieJ](https://github.com/zombieJ)
- Space
  - 🛠 Space use `separator` instead of `split`. [#53983](https://github.com/ant-design/ant-design/pull/53983) [@thinkasany](https://github.com/thinkasany)
  - 🛠 Space use `orientation` instead of `direction`. [#53669](https://github.com/ant-design/ant-design/pull/53669) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Spin support `styles.wrapper`. [#53448](https://github.com/ant-design/ant-design/pull/53448) [@crazyair](https://github.com/crazyair)
- Splitter
  - 🆕 Splitter use `orientation` instead of `layout` and support `vertical` prop. [#53670](https://github.com/ant-design/ant-design/pull/53670) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 Splitter support customize handle elements and style. [#52216](https://github.com/ant-design/ant-design/pull/52216) [@wanpan11](https://github.com/wanpan11)
- Tour
  - 🐞 Fix Tour DOM structure `panel` className typo. [#55178](https://github.com/ant-design/ant-design/pull/55178) [@thinkasany](https://github.com/thinkasany)
  - 🐞 Fix Tour popup not follow when scroll. [#53140](https://github.com/ant-design/ant-design/pull/53140) [@dependabot](https://github.com/dependabot)
- Button
  - 🆕 Button `iconPosition` replaced with `iconPlacement` and support logical position. [#54279](https://github.com/ant-design/ant-design/pull/54279) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🛠 Button `variant` & `color` refactor with css variables version to reduce bundle size. [#54100](https://github.com/ant-design/ant-design/pull/54100) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Button add custom default and dashed type button background color in disabled state. [#52839](https://github.com/ant-design/ant-design/pull/52839) [@yellowryan](https://github.com/yellowryan)
- Tag
  - 🆕 Tag support CheckableTagGroup sub component. [#53256](https://github.com/ant-design/ant-design/pull/53256) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Tag custom color support variants. [#53097](https://github.com/ant-design/ant-design/pull/53097) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Tag support `disabled` and `href`. [#52229](https://github.com/ant-design/ant-design/pull/52229) [@aojunhao123](https://github.com/aojunhao123)
  - 🐞 Fix Tag not updating when modifying `variant` via ConfigProvider. [#55555](https://github.com/ant-design/ant-design/pull/55555) [@thinkasany](https://github.com/thinkasany)
  - 💄 Remove Tag `margin` style. [#52123](https://github.com/ant-design/ant-design/pull/52123) [@li-jia-nan](https://github.com/li-jia-nan)
- Timeline
  - 🆕 Timeline support `titleSpan` to config the size of `title`. [#54072](https://github.com/ant-design/ant-design/pull/54072) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Timeline support `orientation=horizontal` layout. [#54031](https://github.com/ant-design/ant-design/pull/54031) [@zombieJ](https://github.com/zombieJ)
- 🆕 Timeline `items.position` replaced with `items.placement` and using logical position description to improve RTL experience. [#54382](https://github.com/ant-design/ant-design/pull/54382) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Transfer add `actions` prop which accept ReactNode array. [#54104](https://github.com/ant-design/ant-design/pull/54104) [@afc163](https://github.com/afc163)
- 🆕 Carousel use `dotPlacement` instead of `dotPosition`  and support`start` and `end` logical position. [#54294](https://github.com/ant-design/ant-design/pull/54294) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Divider use `orientation` instead of `type` and support `vertical` syntax sugar. [#53645](https://github.com/ant-design/ant-design/pull/53645) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🛠 AutoComplete merge search related props into `showSearch`. [#54184](https://github.com/ant-design/ant-design/pull/54184) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Menu support `popupRender` for popup customization. [#53566](https://github.com/ant-design/ant-design/pull/53566) [@Zyf665](https://github.com/Zyf665)
- 🆕 Message support `pauseOnHover` that pause count down when user hover on it. [#53785](https://github.com/ant-design/ant-design/pull/53785) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 💄 `reset.css` removes IE compatibility. [#55108](https://github.com/ant-design/ant-design/pull/55108) [@thinkasany](https://github.com/thinkasany)
- 🛠 Slider support `orientation` to config layout. [#53671](https://github.com/ant-design/ant-design/pull/53671) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 💄 Remove InputNumber mobile default hidden controls. [#54900](https://github.com/ant-design/ant-design/pull/54900) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Image mask adds blur effect. [#54714](https://github.com/ant-design/ant-design/pull/54714) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 💄 Modal mask adds blur effect. [#54670](https://github.com/ant-design/ant-design/pull/54670) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🛠 Deprecated List component and removed from document. [#54182](https://github.com/ant-design/ant-design/pull/54182) [@zombieJ](https://github.com/zombieJ)
- 🐞 Fix Statistic.Timer `onFinish` & `onChange` not trigger when window is inactive. [#53894](https://github.com/ant-design/ant-design/pull/53894) [@Psiphonc](https://github.com/Psiphonc)
- 🛠 Badge refactor `offset` style offset to CSS logical position. [#55245](https://github.com/ant-design/ant-design/pull/55245) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 BackTop has been removed. [#52206](https://github.com/ant-design/ant-design/pull/52206) [@li-jia-nan](https://github.com/li-jia-nan)
- 🗑 Icon has been removed. [#52241](https://github.com/ant-design/ant-design/pull/52241) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Remove Dropdown.Button, please use Space.Compact instead. [#53793](https://github.com/ant-design/ant-design/pull/53793) [@Meet-student](https://github.com/Meet-student)
- 🛠 MISC: Replace `classNames` library with `clsx`. [0246702](https://github.com/ant-design/ant-design/commit/0246702) [#55164](https://github.com/ant-design/ant-design/pull/55164) [@lijianan](https://github.com/lijianan)
- 🛠 MISC: Remove MediaQueryList compatibility code for legacy browsers. [#55396](https://github.com/ant-design/ant-design/pull/55396) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 MISC: Remove React 19 compatibility code, antd now supports React 19 by default. [#55274](https://github.com/ant-design/ant-design/pull/55274) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 MISC: Remove `copy-to-clipboard` deps. [#54448](https://github.com/ant-design/ant-design/pull/54448) [@765477020](https://github.com/765477020)
- 🔥 MISC: Raise build target which will not support IE anymore. [#53390](https://github.com/ant-design/ant-design/pull/53390) [@zombieJ](https://github.com/zombieJ)
- 🔥 MISC: Enabled `React Compiler` in the bundled outputs `antd.js` and `antd.min.js` to improve performance. Users in CJS/ESM environments can choose to enable it as needed. For more details, refer to the [React documentation](https://react.dev/learn/react-compiler). [#55781](https://github.com/ant-design/ant-design/pull/55781) [@li-jia-nan](https://github.com/li-jia-nan)
- 🔥 MISC: Color-related components now support preset color names (e.g., `red`, `blue`, `green`, etc.). [#53241](https://github.com/ant-design/ant-design/pull/53241) [@zombieJ](https://github.com/zombieJ)
- 🌐 Add Marathi locale translation. [#55179](https://github.com/ant-design/ant-design/pull/55179) [@divyeshagrawal](https://github.com/divyeshagrawal)
- TypeScript
  - 🤖 Optimize Notification `duration` definition, now disable close is `false`. [#55580](https://github.com/ant-design/ant-design/pull/55580) [@wanpan11](https://github.com/wanpan11)

## 5.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/5.x-stable/CHANGELOG.en-US.md) to read `5.x` change logs.

## 4.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.en-US.md) to read `4.x` change logs.

## 3.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.en-US.md) to read `3.x` change logs.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
