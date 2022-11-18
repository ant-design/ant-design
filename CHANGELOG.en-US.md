---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 5.0.0

`2022-11-18`

- 🏆 Ant Design 5.0.0 is out!

**Read it before migration**

- 🌟 If you want to migrate to Ant Design 5.0, please check [V4 to V5](/docs/react/migration-v5).

**Major Changes**

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
- 🆕 ConfigProvider support `theme` prop to modify theme configuration. For more: [Customize Theme](https://ant.design/docs/react/customize-theme-v5).
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
