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
## 6.1.2

`2025-12-24`

- 🐞 Button fix missing wave effect and the issue where the component could not show Dropdown on hover immediately after clicking. [#56273](https://github.com/ant-design/ant-design/pull/56273) [@zombieJ](https://github.com/zombieJ)
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
