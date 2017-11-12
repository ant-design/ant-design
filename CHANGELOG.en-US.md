---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breadking change and new features.

If you want to read change logs before `2.0.0`, please visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md).

---

## 2.13.10

`2017-11-12`

- 📝 Add documentation of [Work with Us](http://ant.design/docs/resource/work-with-us).
- 📝 Refactor edit row demo of Table. [#8026](https://github.com/ant-design/ant-design/issues/8026)
- 🌟 Improve code of detecting Layout.Sider, now we can compose and nest the Sider without specify `__ANT_LAYOUT_SIDER` aattribute. [#8077](https://github.com/ant-design/ant-design/pull/8077/) [@yasinuslu](https://github.com/yasinuslu)
- 🐞 Fix align issue of `Input.Group` in Chrome 62. [ant-design/ant-design-pro#139](https://github.com/ant-design/ant-design-pro/issues/139)
- 🐞 Fix Cascader search not working when option.chidlren is `[]`. [#8130](https://github.com/ant-design/ant-design/issues/8130) [@jdz321](https://github.com/jdz321)
- 🐞 Fix broken padding of AutoComponent caused by style order conflict with Input. [#8081](https://github.com/ant-design/ant-design/issues/8081)
- 🐞 Fix Upload constructor error in IE9. [#7706](https://github.com/ant-design/ant-design/issues/7706)
- 🐞 Fix Select filterOption's TypeScript definition. [#8128](https://github.com/ant-design/ant-design/issues/8128)

## 2.13.9

`2017-11-06`

- 🌟 Published [Ant Design Pro](https://pro.ant.design/).
- 🐞 Fix that `Cascader[popupVisible]` doesn't work. [#8088](https://github.com/ant-design/ant-design/issues/8088)
- 🐞 Fix that native `input[type=checkbox|radio]` invisible issue. [7c3a483](https://github.com/ant-design/ant-design/commit/7c3a48319074a800c89935e728904933d503ee86)
- 🐞 Fix that `Input.Search[suffix]` doesn't work. [#7970](https://github.com/ant-design/ant-design/issues/7970)
- 🐞 Fix TypeScript definitions of Slider. [#8102](https://github.com/ant-design/ant-design/pull/8102) [@davschne](https://github.com/davschne)

## 2.13.8

`2017-10-27`

- 🌟 Add a mirror site in China: [http://ant-design.gitee.io](http://ant-design.gitee.io)
- 🐞 Fix `ref warning` of Menu in React 16. [#8037](https://github.com/ant-design/ant-design/pull/8037) [@vgeyi](https://github.com/vgeyi)
- 🐞 Fix extra padding of loading Card when it is too wide. [ad9809ec](https://github.com/ant-design/ant-design/commit/ad9809ec2e29275c9348537b04584dcfdc96659a)
- 📝 Add sorted API to enhance readability of docs. [#7896](https://github.com/ant-design/ant-design/pull/7896)[@monkindey](https://github.com/monkindey)
- 📝 Improve Modal docs of how to setting styles. [#7840](https://github.com/ant-design/ant-design/issues/7840) [@kossel](https://github.com/kossel)
- 🐞 Fix the inner shadow of Input on IOS. [#7974](https://github.com/ant-design/ant-design/pull/7974) [@cnahliu](https://github.com/cnahliu)

## 2.13.7

`2017-10-22`

- 🐞 Fix input height in AutoComplete. [#7918](https://github.com/ant-design/ant-design/issues/7918)
- 🐞 Fix Cascader `inputPrefixCls` can not be fully effective. [#7945](https://github.com/ant-design/ant-design/pull/7945) [@vgeyi](https://github.com/vgeyi)
- 🐞 Fix extra margin in sider Layout. [#7967](https://github.com/ant-design/ant-design/issues/7967)
- 🐞 Fix RangePicker can not close panel when click presetted ranges. [#7747](https://github.com/ant-design/ant-design/issues/7747)
- Table
  - 🐞 Fix Radio can not be centered in Table column. [#7969](https://github.com/ant-design/ant-design/issues/7969)
  - 🐞 Fix Table filter can't show after remove fixed setting. [#7909](https://github.com/ant-design/ant-design/issues/7909)
- 🌟 Add `scrollNumberPrefixCls` prop for Badge. [#7882](https://github.com/ant-design/ant-design/pull/7882) [@vgeyi](https://github.com/vgeyi)
- 🌟 Add some less variables. [#7886](https://github.com/ant-design/ant-design/issues/7886) [@syssam](https://github.com/syssam)

## 2.13.6

`2017-10-12`

- 🐞 Fix issue that `beforeUpload` will stop uploading when return undefined. [#7870](https://github.com/ant-design/ant-design/issues/7870)

## 2.13.5

`2017-10-11`

- 🐞 Fix issue resulting in FormItem throws error when use with reac-hot-loader. [#7775](https://github.com/ant-design/ant-design/issues/7775)
- 🐞 Fix not working less variable `@link-hover-decoration`. [#7821](https://github.com/ant-design/ant-design/issues/7821)
- 🐞 Fix issue resulting in Upload's `beforeUpload` method not returning promise properly. [#7833](https://github.com/ant-design/ant-design/issues/7833)
- 🐞 Fix issue resulting in Input.Search's search icon being covered with Form's feedback icon. [#7854](https://github.com/ant-design/ant-design/issues/7854)
- AutoComplete
  - 🐞 Fix circular reference with infinite children [#7742](https://github.com/ant-design/ant-design/pull/7742) [@menberg](https://github.com/ant-design/ant-design/pull/7742)
  - 🐞 Fix style when use with TextArea. [#7801](https://github.com/ant-design/ant-design/issues/7800)
- 🌟 Improve TypeScript definition. [cf788d7](https://github.com/ant-design/ant-design/commit/cf788d7b4dda58f61da91086ccfe0c67872fc709) [d4c75d43](https://github.com/ant-design/ant-design/commit/d4c75d43a1824d36583d9d8f9b209a4b9526a3af)
- 🌟 Add new less variable. [2e2acb5](https://github.com/ant-design/ant-design/commit/2e2acb5be9a171f217f2a1a143b34b2624b49b06)

## 2.13.4

`2017-09-29`

- 🐞 Fix missing Pagination `size="small"` style.
- 🐞 Fix Anchor missing padding. [#7712](https://github.com/ant-design/ant-design/issues/7712)
- 🐞 Fix TreeSelect extra select below search input. [#7703](https://github.com/ant-design/ant-design/issues/7703)
- 🐞 Fix the jumping problem of Form validate text. [#7730](https://github.com/ant-design/ant-design/issues/7730)
- 🐞 Fix Button Group loading style. [#7709](https://github.com/ant-design/ant-design/issues/7709)
- 🐞 Fix blur placeholder text color. [#7365](https://github.com/ant-design/ant-design/issues/7365)
- 🐞 Fix Mention `suggestion.toLowerCase is not a function` error. [#7696](https://github.com/ant-design/ant-design/issues/7696) [@kappa-gooner](https://github.com/kappa-gooner)
- 🐞 Fix a children height problem of Layout.Sider. [#7716](https://github.com/ant-design/ant-design/pull/7716) [@zheeeng](https://github.com/zheeeng)
- 🐞 Fix Dropdown menu group style.
- 🐞 Fix Table filter icon and dropdown style.
- 🐞 Fix a AutoComplete circular reference bug in Inferno. [#7742](https://github.com/ant-design/ant-design/pull/7742) [@menberg](https://github.com/menberg)
- 🐞 Fix Upload cannot upload file when using `beforeUpload`. [#7762](https://github.com/ant-design/ant-design/issues/7762) [#6983](https://github.com/ant-design/ant-design/issues/6983)
- TypeScript
  - 🐞 Fix Input `maxLength` definite. [#7744](https://github.com/ant-design/ant-design/pull/7744) [@delesseps](https://github.com/delesseps)
  - 🐞 Fix `disabledTime` definite of DatePicker. [#7740](https://github.com/ant-design/ant-design/pull/7740) [@778758944](https://github.com/778758944)

## 2.13.3

`2017-09-22`

- 🐞 Fix Affix scrolling bug when document's height minus viewport's height is smaller than the height of children of Affix. [#2349](https://github.com/ant-design/ant-design/issues/2349)
- 🐞 Fix broken style of header of Card when `Card[title]` is void and `Card[extra]` is set. [f46112d#commitcomment-24480417](https://github.com/ant-design/ant-design/commit/f46112d38561c89780eb44ecbba82347d2b912da#commitcomment-24480417)
- 🐞 Fix TypeScript definition of `Checkbox[children]`. [#7650](https://github.com/ant-design/ant-design/issues/7650) [@liaokaien](https://github.com/liaokaien)
- 🐞 Fix error when set nested name in `getFieldDecorator` and then click the label of `Form.Item`. [#7693](https://github.com/ant-design/ant-design/issues/7693)
- Input
  - 🐞 Fix broken style of `Input.Group[compat]` when it has `Select` as its children. [#7662](https://github.com/ant-design/ant-design/issues/7662)
  - 🐞 Fix TypeScript definition of `Input[autoComplete]`. [#7699](https://github.com/ant-design/ant-design/pull/7699) [@delesseps](https://github.com/delesseps)
- LocaleProvider
  - 🇵🇹 Support Portuguese. [#7449](https://github.com/ant-design/ant-design/pull/7449) [@taviroquai](https://github.com/taviroquai)
  - 🐞 Fix missing translations in Dutch locale. [#7694](https://github.com/ant-design/ant-design/pull/7694) [@kstiopin](https://github.com/kstiopin)
- Table
  - 🐞 Fix height of table header when `rowSelection` is set. [#7663](https://github.com/ant-design/ant-design/issues/7663)
  - 🐞 Fix bug that click on first two options will not trigger event when `rowSelection.hideDefaultselections` is set. [#7626](https://github.com/ant-design/ant-design/issues/7626) [@infeng](https://github.com/infeng)
  - 🐞 Fix TypeScript definition of `Table[scroll]`. [#7640](https://github.com/ant-design/ant-design/pull/7640) [@BlackGanglion](https://github.com/BlackGanglion)


## 2.13.2

`2017-09-15`

- 🐞 Fix title and extra content position of narrow Card. [#7604](https://github.com/ant-design/ant-design/issues/7604)
- 🐞 Fix inlineCollapsed style of MenuItemGroup. [#7109](https://github.com/ant-design/ant-design/issues/7109)
- 🐞 Revert [#7142](https://github.com/ant-design/ant-design/issues/7142) to fix empty data style of Table.
- 🐞 Fix Form `getFieldDecoratorOptions` missing types of `normalize` and `validateFirst`. [#7552](https://github.com/ant-design/ant-design/issues/7552) [@meteor91](https://github.com/meteor91) [@mitchelldemler](https://github.com/mitchelldemler)
- 🐞 Fix Modal `zIndex` type. [#7624](https://github.com/ant-design/ant-design/issues/7624)
- 🌟 Improve tree node loading icon position. [#7584](https://github.com/ant-design/ant-design/issues/7584)
- 🌟 Update a lot of components's English doc. [@khalibloo](https://github.com/khalibloo)

## 2.13.1

`2017-09-10`

- 🐞 Fix Card.Grid broken style. [commit/c7d6ce](https://github.com/ant-design/ant-design/commit/c7d6ce5d3f7bfae1f2252d702fb1bdf04fdc80cb)
- 🐞 Fix Cascader overlaping text. [#7475](https://github.com/ant-design/ant-design/issues/7475)
- 🐞 Fix simple mode Pagination prev and next button missing. [#7500](https://github.com/ant-design/ant-design/issues/7500)
- 🐞 Fix Slider typings. [#7532](https://github.com/ant-design/ant-design/issues/7532)
- Table
  - 🐞 Fix empty data scroll style. [#7457](https://github.com/ant-design/ant-design/issues/7457) [#7468](https://github.com/ant-design/ant-design/issues/7468) [#7470](https://github.com/ant-design/ant-design/issues/7470) [#7509](https://github.com/ant-design/ant-design/issues/7509)
  - 🌟 Make supplement for API docs. [#7525](https://github.com/ant-design/ant-design/pull/7525) [@hansnow](https://github.com/hansnow)
- 🐞 Fix Upload typings. [#7507](https://github.com/ant-design/ant-design/pull/7507) [@WingGao](https://github.com/WingGao)
- 🐞 Fix inlineCollapsed Menu when Submenu is opened. [#7514](https://github.com/ant-design/ant-design/issues/7514)
- 🐞 Fix validateStatus styles of some Form Controls. [#7498](https://github.com/ant-design/ant-design/issues/7498)
- 🐞 Fix @link-hover-decoration not working. [#7531](https://github.com/ant-design/ant-design/issues/7531)
- 🌟 Optimize the English documentation of some components. [@khalibloo](https://github.com/khalibloo)

## 2.13.0

`2017-09-01`

- 🌟 Add `okType` and `cancelType` prop to Popconfirm and Modal and it's related methods. [#6848](https://github.com/ant-design/ant-design/pull/6848) [@yociduo](https://github.com/yociduo)
- 🌟 Add `zIndex` prop to Modal and it's relatedt methos. [#6880](https://github.com/ant-design/ant-design/pull/6880) [@Alex1990](https://github.com/Alex1990)
- 🌟 Add `name` prop to RadioGroup. [#7009](https://github.com/ant-design/ant-design/pull/7009) [@djyde](https://github.com/djyde)
- 🌟 Add `hideDefaultSelections` props to Table. [#7295](https://github.com/ant-design/ant-design/issues/7295)
- Dropdown
  - 🌟 Add `disabled` prop. [#7102](https://github.com/ant-design/ant-design/pull/7102) [@yociduo](https://github.com/yociduo)
  - 🌟 Menu can not be selected defaultly now.
- 🌟 Add a third parameter `originalElement` to Pagination's `itemRender`.
- 🌟 Add `backfill` prop to AutoComplete, items are selected by keyborad will be backfilled to the search input. [#5764](https://github.com/ant-design/ant-design/issues/5764)
- 🌟 Add `firstActiveValue` prop to Select to allow specify active item when open select first time. [#6318](https://github.com/ant-design/ant-design/issues/6318) [@L-x-C](https://github.com/ant-design/ant-design/issues/6318)
- LocaleProvider
  - 🌟 Add Persian. [#6878](https://github.com/ant-design/ant-design/pull/6878) [@mkermani144](https://github.com/mkermani144)
  - 🌟 Add Greek. [#6928](https://github.com/ant-design/ant-design/pull/6928) [@michmach](https://github.com/michmach)
  - 🌟 Add Norwegian. [#7122](https://github.com/ant-design/ant-design/pull/7122) [@santi](https://github.com/santi)
  - 🌟 Add Serbian. [#7201](https://github.com/ant-design/ant-design/pull/7201) [@paunovic-stefan](https://github.com/paunovic-stefan)
- 🐞 Fix Menu's title can not be hidden when collapsing  Sider. [#7409](https://github.com/ant-design/ant-design/issues/7409)
- 🐞 Fix some TypeScript type definitions [#7355](https://github.com/ant-design/ant-design/pull/7355) [#7378](https://github.com/ant-design/ant-design/pull/7378) [#7384](https://github.com/ant-design/ant-design/pull/7384)
- 🐞 Fix some components can not use conditional rendering. [#6530](https://github.com/ant-design/ant-design/issues/6530)
- Website
  - 🌟 Add a shortcut `s` to focus the search input.
  - 🌟 Add a color picker to the footer to change primary color and preview lively.

## 2.12.8

`2017-08-27`

- 📖 Rewrite the [Use in create-react-app](/docs/react/use-with-create-react-app) documentation without ejecting.  [#7276](https://github.com/ant-design/ant-design/pull/7276)
- 🌟 Better empty data style for fixed-columns Table. [#7298](https://github.com/ant-design/ant-design/issues/7298)
- 🐞 Fix `disabled` logic of CheckboxGroup and Checkbox. [#7266](https://github.com/ant-design/ant-design/issues/7266) [@dilidili](https://github.com/dilidili)
- 🐞 Fix errors of rendering Spin and Carousel in react-snapshot or other jsdom environment. [#3308](https://github.com/ant-design/ant-design/issues/3308) [#7318](https://github.com/ant-design/ant-design/issues/7318)
- 🐞 Fix some details of Select, Tooltip and Menu.

## 2.12.7

`2017-08-21`

- antd of Angular@4.0, [ng-zorro-antd](https://ng.ant.design) is open sourcing.
- Affix supports more scenes. [01d4acb](https://github.com/ant-design/ant-design/commit/01d4acb7a9b030be3552b4ca19b4e899dc2bb7c7)
- Fix that AutoComplete children ref doesn't work. [#6814](https://github.com/ant-design/ant-design/issues/6814)
- Button
  - Improve the logic to insert space in Chinese characters. [59b11f3](https://github.com/ant-design/ant-design/commit/59b11f3b480d43cb32fb24e351cb4c4dd569243c)
  - Fix that `event.target` of click is not `button`. [#7034](https://github.com/ant-design/ant-design/issues/7034)
- Fix that Carousel's `innerSlider` doesn't exist. [#7191](https://github.com/ant-design/ant-design/issues/7191)
- Fix the style of button in DatePicker. [ad6dbcb](https://github.com/ant-design/ant-design/commit/ad6dbcb9c6dac407a38f2391d3e5fa1d8ae1cfab)
- Fix TypeScript definition of Form.[#7245](https://github.com/ant-design/ant-design/pull/7245)
- Fix TypeScript definition of InputNumber. [#7257](https://github.com/ant-design/ant-design/issues/7257)
- Fix missing collapse animation of `Layout.Sider` in IE11. [#6349](https://github.com/ant-design/ant-design/issues/6349)
- Fix typo of Spanish locale of LocaleProvider. [#7234](https://github.com/ant-design/ant-design/pull/7234) [@ramsesmoreno](https://github.com/ramsesmoreno)
- Fix that notification's default placement should not be overrided. [#5895](https://github.com/ant-design/ant-design/issues/5895)
- Fix disabled style of button in Pagination. [cf3c0aa](https://github.com/ant-design/ant-design/commit/cf3c0aac43e2825bfd85ca3b8abbf4742e504260)
- Fix that wrong exports of Select which cause webpack build error. [#7222](https://github.com/ant-design/ant-design/issues/7222)
- Fix that Tabs should show arrow buttons while resize its container. [#7231](https://github.com/ant-design/ant-design/issues/7231) [#7210](https://github.com/ant-design/ant-design/issues/7210)
- Fix style of Timeline which has only one `Timeline.Item`. [#7214](https://github.com/ant-design/ant-design/issues/7214)
- Fix wrong behavior of Upload when uid is 0. [#7269](https://github.com/ant-design/ant-design/issues/7269)

## 2.12.6

`2017-08-11`

- Fix Collapse arrow position in IE9/10/11. [af9dc73](https://github.com/ant-design/ant-design/commit/af9dc73eef2aac3e68fdfc99f9231153437f5068)
- Fix empty Table scrollBar's position. [#7142](https://github.com/ant-design/ant-design/issues/7142)
- Fix RangePicker Input's style of height. [47c5de2](https://github.com/ant-design/ant-design/commit/47c5de29f370a77fc19a6a8eda8ac57476f312a6)
- Card
  - Improve Card.Grid style of collapse border. [807b573](https://github.com/ant-design/ant-design/commit/807b573bff43bc71115afeb086f565561807a32d)
  - Fix the `no-animation` type's className. [#7185](https://github.com/ant-design/ant-design/issues/7185)
- Fix Input Safari text align. [#7135](https://github.com/ant-design/ant-design/issues/7135)
- Layout
  - Fix stretched layout by content. [500b222](https://github.com/ant-design/ant-design/commit/500b2225567f03397d9faec5f4e60a8f35fc4d28)
  - Fix the collapse trigger's position. [f689ede](https://github.com/ant-design/ant-design/commit/f689ede0fa836dd0d99f4e4d96e0c43d0ff19742)
- Fix Upload doesn't handle some error scenarios which response is not a string. [#6818](https://github.com/ant-design/ant-design/issues/6818)
- Form
  - Add `validateFirst` prop of docs. [#6959](https://github.com/ant-design/ant-design/issues/6959)
  - Fix `wrappedComponentRef`. [#6545](https://github.com/ant-design/ant-design/issues/6545)
  - Add FormCreateOption's generic type. [#7119](https://github.com/ant-design/ant-design/pull/7119) [@djyde](https://github.com/djyde)
  - Fix `square` font size to `@form-feedback-icon-size`. [9bcde59](https://github.com/ant-design/ant-design/commit/9bcde590015855a12fdee851cf4e4836d0195cd7)

## 2.12.5

`2017-08-07`

- Fix the `SelectPropTypes not found` issue under es mode. [#7123](https://github.com/ant-design/ant-design/issues/7123)
- Fix Row no wrap issue. [4f73a23](https://github.com/ant-design/ant-design/commit/4f73a23a103733a3c148bb04013493a042f90a8f)
- Fix broken style of InputNumber and RangePicker. [#7117](https://github.com/ant-design/ant-design/issues/7117) [#7126](https://github.com/ant-design/ant-design/issues/7126)

## 2.12.4

`2017-08-06`

- Fix Affix throw invalid calling object in IE. [#7060](https://github.com/ant-design/ant-design/issues/7060)
- Make optimization for title display behavior of Badge. [#7024](https://github.com/ant-design/ant-design/issues/7024)
- Card
  - Fix `noHovering` API typo. [#7078](https://github.com/ant-design/ant-design/issues/7078)
  - Fix `children` type definitions. [pull/7030](https://github.com/ant-design/ant-design/pull/7030) [@djyde](https://github.com/djyde)
- Fix Collapse `onChange` parameter type definitions. [pull/7084](https://github.com/ant-design/ant-design/pull/7084) [@davidctj](https://github.com/davidctj)
- Dropdown
  - Fix Dropdown.Button align issue. [#7070](https://github.com/ant-design/ant-design/issues/7070)
  - Add `size` prop for docs. [pull/7071](https://github.com/ant-design/ant-design/pull/7071) [@hansnow](https://github.com/hansnow)
- Input
  - Fix outline covered by addon. [commit/0f63c7](https://github.com/ant-design/ant-design/commit/0f63c7186ef3a5db36c01df9d9ebde9d5b3871ef)
  - Fix InputGroup demo. [pull/7089](https://github.com/ant-design/ant-design/pull/7089) [@jdz321](https://github.com/jdz321)
- Fix InputNumber Formatter demo issue. [pull/7098](https://github.com/ant-design/ant-design/pull/7098) [@tim-soft](https://github.com/tim-soft)
- Menu
  - Fix abnormal performance of inlineCollapsed Menu. [#7048](https://github.com/ant-design/ant-design/issues/7048) [#7063](https://github.com/ant-design/ant-design/issues/7063)
  - Fix SubMenu can't be highlighted if its children are selected. [pull/7042](https://github.com/ant-design/ant-design/pull/7042) [@atomgao](https://github.com/atomgao)
- Fix notification `type` type definitions. [#7073](https://github.com/ant-design/ant-design/issues/7073) [@marswong](https://github.com/marswong)
- Fix Pagination `showTotal` type definitions. [#7054](https://github.com/ant-design/ant-design/issues/7054)
- Fix RangePicker throw error after clear. [#7077](https://github.com/ant-design/ant-design/issues/7077)
- Adds `onFocus` and `onBlur` type definitions for Select. [pull/7082](https://github.com/ant-design/ant-design/pull/7082) [@troynt](https://github.com/troynt)
- Fix Tabs `tabBarExtraContent` style issue in vertical mode. Upgrade rc-tabs to 9.0.2, refactor the dom structure of TabBar `extraContent`. [#6578](https://github.com/ant-design/ant-design/issues/6578)
- Fix missing icon issue for TreeSelect. [#7020](https://github.com/ant-design/ant-design/issues/7020)
- Fix `error TS7016: Could not find a declaration file for module 'rc-util/lib/Dom/addEventListener'`. [#7033](https://github.com/ant-design/ant-design/issues/7033) [@djyde](https://github.com/djyde)
- Translate patterns/list. [list](https://ant.design/docs/pattern/list) [@zachguo](https://github.com/zachguo)

## 2.12.3

`2017-07-30`

- Fix indeterminate Checkbox style when it's disabled.
- Fix Card `this.container` may not exists issue. [#6976](https://github.com/ant-design/ant-design/pull/6976) [@neekey](https://github.com/neekey)
- Fix Button align issue when set base font to `14px`. [#7001](https://github.com/ant-design/ant-design/issues/7001)
- Dropdown
  - Fix Menu can be multiple cicked. [#6314](https://github.com/ant-design/ant-design/issues/6314)
  - Fix Menu dispears if it's hovered before it's shown. [#6949](https://github.com/ant-design/ant-design/issues/6949)
  - Fix align issue.
- Fix Grid Card padding.
- Improve Menu animation.[#6955](https://github.com/ant-design/ant-design/pull/6955)
- Twrak DatePicker icon position.
- Add new less variables.[e1a46cc](https://github.com/ant-design/ant-design/commit/e1a46cc419fb4975ae1782ba793b378c8e584057)
- Fix some issues of TypeScript definitions.

## 2.12.2

`2017-07-22`

- Longer message duration (1.5s to 3s).
- Fix Anchor links not highlighted. [#6473](https://github.com/ant-design/ant-design/issues/6473)
- Fix disabled style of Input.TextArea. [#6858](https://github.com/ant-design/ant-design/pull/6858) [@lyz810](https://github.com/lyz810)
- Fix disabled style of TimePicker. [#6918](https://github.com/ant-design/ant-design/issues/6918)
- Fix overlaped issue of form feedback icon and select arrow which is introduced in `2.12.1` again. [#4431](https://github.com/ant-design/ant-design/issues/4431)
- Fix vertical Tabs arrow style. [255eac9](https://github.com/ant-design/ant-design/commit/255eac907949ded5b79f216a29831dcf4afa9362)
- Update Polish locale. [#6869](https://github.com/ant-design/ant-design/pull/6869) [#6870](https://github.com/ant-design/ant-design/pull/6870) [#6871](https://github.com/ant-design/ant-design/pull/6871) [@imosapatryk](https://github.com/imosapatryk)
- Fix that `http` url incluced in source code. [#6893](https://github.com/ant-design/ant-design/issues/6893)
- Adjust vertical align of Menu icon and text.
- Fix `overlay is marked as required` warning of Tooltip. [#6897](https://github.com/ant-design/ant-design/issues/6897)
- Fix disabled style of Slider under colored background. [#6665](https://github.com/ant-design/ant-design/issues/6665)
- Adjust click area of TreeSelect item.
- Fix some issues of TypeScript definitions.

## 2.12.1

`2017-07-17`

- Fix typo in Bulgarian locales. [#6788](https://github.com/ant-design/ant-design/pull/6788) [@NoHomey](https://github.com/NoHomey)
- Fix broken style of `<Avatar src="..." />` when image cannot be loaded. [#6804](https://github.com/ant-design/ant-design/issues/6804)
- Fix broken style of loading icon button in `Button.Group`. [#6822](https://github.com/ant-design/ant-design/issues/6822)
- Fix TypeScript's definition of Checkbox. [#6768](https://github.com/ant-design/ant-design/issues/6768)
- Fix broken style of `Collapse.Panel[header]` when content is too long. [#6832](https://github.com/ant-design/ant-design/issues/6832)
- Input
  - Fix that `className` should be added to wrapper. [#6809](https://github.com/ant-design/ant-design/issues/6809)
  - Fix TypeScript's definition of `Input.Search`. [#6837](https://github.com/ant-design/ant-design/pull/6837) [@newraina](https://github.com/newraina)
  - Fix that value of `Input.TextArea` cannot be reset. [#6776](https://github.com/ant-design/ant-design/issues/6776)
  - Fix broken style of error status of Select in `Input.Group`.

    <img src="https://user-images.githubusercontent.com/507615/27983847-551ffe0a-63f9-11e7-81ba-8c3336ddafd0.png" />

- Fix that the implementation of Layout should not affect Anchor and BackTop. [#6817](https://github.com/ant-design/ant-design/issues/6817)
- Menu
  - Fix animation of inline menu.
  - Fix style of border of `Menu.Item`. [46ffda9](https://github.com/ant-design/ant-design/commit/46ffda9c9385ec54e0c78594ed6c280d40ef035d)
- Fix that RangePicker should show correct months in panels when `value|defaultValue` is set. [#6764 point 3](https://github.com/ant-design/ant-design/issues/6764)
- Fix alignment of Tooltip. [#6830](https://github.com/ant-design/ant-design/issues/6830)

## 2.12.0

`2017-07-08`

- Add Card `noHovering` and Card.Grid. [pull/6748](https://github.com/ant-design/ant-design/pull/6748)
- DatePicker, MonthPicker, RangePicker now support `className` prop. [pull/6584](https://github.com/ant-design/ant-design/pull/6584) [@EnrikoLabriko](https://github.com/EnrikoLabriko)
- Add Input.Textarea, Input[type='textArea'] will be deprecated. [pull/6138](https://github.com/ant-design/ant-design/pull/6138)
- LocaleProvider supporting Thai. [pull/6721](https://github.com/ant-design/ant-design/pull/6721) [@koobitor](https://github.com/koobitor)
- Mention support `focus` function. [#6135](https://github.com/ant-design/ant-design/issues/6135)
- Menu inline mode could be collapsed by `inlineCollapsed`, and use `context` to pass `collapsed` prop from Layout.Sider to Menu, don't need customized css code anymore. [pull/6686](https://github.com/ant-design/ant-design/pull/6686)
- Add Pagination `itemRender`, now you can customize the structure of page number. [25a603](https://github.com/ant-design/ant-design/commit/25a60322e5c6649522fb9f0d34919eba0ccb1f65)
- Add Tooltip `autoAdjustOverflow` prop, now the auto adjust feature can be disabled. [pull/6661](https://github.com/ant-design/ant-design/pull/6661) [@jdz321](https://github.com/jdz321)
- Fix errors in docs of Avatar. [pull/6711](https://github.com/ant-design/ant-design/pull/6711) [@llaski](https://github.com/llaski)
- DatePicker
  - Fix `onOk` type definitions. [pull/6619](https://github.com/ant-design/ant-design/pull/6619) [@newraina](https://github.com/newraina)
  - Improve icon style. [pull/6655](https://github.com/ant-design/ant-design/pull/6655) [@megawac](https://github.com/megawac)
- Form
  - Fix formItem `extra` content line height. [#6618](https://github.com/ant-design/ant-design/issues/6618)
  - Fix FormItem `labelCol` `wrapperCol` type definitions. [pull/6611](https://github.com/ant-design/ant-design/pull/6611) [@newraina](https://github.com/newraina)
- Fix autosize Input.Textarea scrollbar style issue. [#6609](https://github.com/ant-design/ant-design/issues/6609)
- Add missing TypeScript definition of `precision` in InputNumber. [#6715](https://github.com/ant-design/ant-design/issues/6715)
- Fix Select overflow issue. [#6621](https://github.com/ant-design/ant-design/issues/6621)
- Slider
  - Improve styles. [#6665](https://github.com/ant-design/ant-design/issues/6665)
  - Upgrade rc-slider to 8.2.0, add `dotStyle`, `activeDotStyle` props. [rc-slider/pull/292](https://github.com/react-component/slider/pull/292)
- Fix Spin z-index issue. [#6759](https://github.com/ant-design/ant-design/issues/6759)
- Fix nested Steps style issue. [#6754](https://github.com/ant-design/ant-design/issues/6754)
- Table
  - Fix expanded area background of fixed header Table. [#6657](https://github.com/ant-design/ant-design/issues/6657)
  - Add `onRowDoubleClick` prop for docs. [pull/6667](https://github.com/ant-design/ant-design/pull/6667) [@yurtaev](https://github.com/yurtaev)
  - Make supplement for `loading` docs. [pull/6763](https://github.com/ant-design/ant-design/pull/6763) [@hansnow](https://github.com/hansnow)
  - Upgrade rc-table to 5.4.0, support `onRowMouseEnter` and `onRowMouseLeave`. [rc-table/0db582](https://github.com/react-component/table/commit/0db582a75dfa119715eb4db8a59eacfca744c5a0)
- Improve TimePicker format support. [950c32](https://github.com/ant-design/ant-design/commit/950c321b25091ef31b130b83674478974590d7f3)
- Make style improvement or tweaking for many components, includes [Checkbox](https://ant.design/components/checkbox/), [Radio](https://ant.design/components/radio/), [Tabs](https://ant.design/components/tabs/), [Card](https://ant.design/components/card/) and etc.
- Now you can open demo in codepen. [#5140](https://github.com/ant-design/ant-design/issues/5140)

## 2.11.2

`2017-06-25`

- Dropdown.Button now support `getPopupContainer` function. [#6527](https://github.com/ant-design/ant-design/pull/6527)
- Fix disabled dropdown submenu style error. [#6548](https://github.com/ant-design/ant-design/issues/6548)
- Fix background color error of Calendar.  [aaf2a50](https://github.com/ant-design/ant-design/commit/aaf2a508bef96f81faf556036649b2a2fe5b635b)
- Select of Calendar now take place in header. [#6479](https://github.com/ant-design/ant-design/pull/6479)
- Fix horia horizontal scroll error of Input and Textarea. [#6577](https://github.com/ant-design/ant-design/issues/6577)
- Improve document of `disabled` attribute of Checkbox and Radio. [#6597](https://github.com/ant-design/ant-design/pull/6597)
- Increase click area of Table's sort and filter icon. [#6528](https://github.com/ant-design/ant-design/pull/6528)
- Add `event:Event` parameter of Table.props.onRowClick.  [e2a99f5](https://github.com/ant-design/ant-design/commit/e2a99f53f7a27bd7de4adf99d0e1ee755b537c72)

## 2.11.1

`2017-06-18`

- Fix setting `className` of Table's pagination not working issue. [#6416](https://github.com/ant-design/ant-design/issues/6416)
- Fix nested Tabs style issue.[#6431](https://github.com/ant-design/ant-design/issues/6431) [@sadmark](https://github.com/sadmark)
- Fix RadioButton wrapping leaves off the left border on small screen.[#6492](https://github.com/ant-design/ant-design/issues/6492) [@pierreneter](https://github.com/pierreneter)
- Fix RangePicker footer border.
- Improve Dropdown.Button's type definitions. [#6482](https://github.com/ant-design/ant-design/pull/6482) [@newraina](https://github.com/newraina)


## 2.11.0

`2017-06-07`

- New component [Avatar](https://ant.design/components/avatar/). 🌝
- LocaleProvider
  - Supporting Bulgarian. [#6297](https://github.com/ant-design/ant-design/pull/6297) [@dimitrov-adrian](https://github.com/dimitrov-adrian)
  - Supporting Polish. [#6326](https://github.com/ant-design/ant-design/pull/6326) [@longersson](https://github.com/longersson)
  - Supporting Britain English. [#6344](https://github.com/ant-design/ant-design/pull/6344) [@damiangreen](https://github.com/damiangreen)
  - Supporting Italian. [#6344](https://github.com/ant-design/ant-design/pull/6344) [@damiangreen](https://github.com/damiangreen)
  - Supporting French. [#6344](https://github.com/ant-design/ant-design/pull/6344) [@damiangreen](https://github.com/damiangreen)
  - Supporting Belgian. [#6344](https://github.com/ant-design/ant-design/pull/6344) [@damiangreen](https://github.com/damiangreen)
- Collapse.Panel can be disabled now, which makes users cannot toggle panel with mouse/keyboard. [#6119](https://github.com/ant-design/ant-design/issues/6119) [demo](https://ant.design/components/collapse/#components-collapse-demo-basic)
- DatePicker and RangePicker support customized footer. [#6122](https://github.com/ant-design/ant-design/issues/6122) [#5188](https://github.com/ant-design/ant-design/issues/5188) [demo](https://ant.design/components/date-picker/#components-date-picker-demo-extra-footer)
- InputNumber can set precision with property `precision`, this means that precision need not to follow `step`. [#5998](https://github.com/ant-design/ant-design/issues/5998)
- TreeSelect supports `allowClear` in multiple mode.

- Improve keyboard support of Pagination. [rc-pagination#83](https://github.com/react-component/pagination/pull/83) [@geramirez](https://github.com/geramirez)
- Improve style of Progress. [#6354](https://github.com/ant-design/ant-design/issues/6354)
- Improve ARIA support of Slider. [#6301](https://github.com/ant-design/ant-design/pull/6301)

- Fix that animating elements should not be clickable. [#6314](https://github.com/ant-design/ant-design/issues/6314)
- Fix `Cannot read property '0' of undefined` issue of DatePicker, TimePicker, and RangePicker. [#6334](https://github.com/ant-design/ant-design/issues/6334)
- DatePicker
  - Fix misplaced popup. [#6347](https://github.com/ant-design/ant-design/issues/6347)
  - Fix wrong format of tooltip of date cell. [#5724](https://github.com/ant-design/ant-design/issues/5724) [@zefj](https://github.com/zefj)
  - Fix that disabled date is selectable while using keyboard. [#6345](https://github.com/ant-design/ant-design/issues/6345)
- Fix nested fields support of Form `validateFieldsAndScroll`. [#5410](https://github.com/ant-design/ant-design/issues/5410)
- Input[addon]
  - Fix that style doesn't work. [#6379](https://github.com/ant-design/ant-design/issues/6379)
  - Fix vertical align issue. [#6403](https://github.com/ant-design/ant-design/issues/6403)
- Fix that confirm button not clickable when the returned promise of Modal.confirm is rejected. [#6183](https://github.com/ant-design/ant-design/issues/6183)
- Fix style of input of Pagination. [#6339](https://github.com/ant-design/ant-design/issues/6339)
- Fix that user input of Select should not be trimed in search mode. [#6382](https://github.com/ant-design/ant-design/issues/6382)
- Fix that timers of Spin should be removed correctly. [#6383](https://github.com/ant-design/ant-design/issues/6383)
- Fix onClick support of Switch. [#6373](https://github.com/ant-design/ant-design/issues/6373)
- Fix wrong TypeScript definition of Table.Column which will cause `error TS2304: Cannot find name 'T'`. [#6313](https://github.com/ant-design/ant-design/issues/6313)
- Fix error TypeScript definition of Timeline.Item and Dropdown.Button. [#6356](https://github.com/ant-design/ant-design/issues/6356)
- Fix broken style of disabled Tree and TreeSelect. [#6320](https://github.com/ant-design/ant-design/issues/6320)

## 2.10.4

`2017-06-01`

- Fix `rc-util` dependency. [#6310](https://github.com/ant-design/ant-design/pull/6311) [@bkniffler](https://github.com/bkniffler)
- Fix syntax error in es build. [#6310](https://github.com/ant-design/ant-design/issues/6310#issuecomment-305176273)

## 2.10.3

`2017-05-31`

- **Calendar**
  - Fix disabledDate not be supported, and make supplement for the types and documentation. [#6074](https://github.com/ant-design/ant-design/issues/6074)
  - Upgrade rc-calendar to 8.4.0, support Bulgarian, and user can select end date first. [commit/a4a6db](https://github.com/ant-design/ant-design/commit/a4a6db76de57ac2559a2be80208121ab5e168fbf)
- **Alert** Remove default margin-bottom. [commit/5ef482](https://github.com/ant-design/ant-design/commit/5ef48289747409b6d962f75627ddb11e2765f965)
- **Tabs** Fix inactive tab panel behavious. [#6237](https://github.com/ant-design/ant-design/issues/6237)
- **Layout** Fix children in the collapsed Sider not be hidden. [#6131](https://github.com/ant-design/ant-design/issues/6131)
- **Table** Fix table filter menu overflow issue. [#6245](https://github.com/ant-design/ant-design/issues/6245)
- **InputNumber** Fix hasFeedback misplaced validated icon. [#6289](https://github.com/ant-design/ant-design/issues/6289)
- **Typescript**
  - Upgrade TypeScript to 2.3.x. [#6263](https://github.com/ant-design/ant-design/issues/6263)
  - Add missing props in Table. [commit/acdc56](https://github.com/ant-design/ant-design/commit/acdc563a547c49960521b2b48cd5c707ac1e4cf2) [pull/6291](https://github.com/ant-design/ant-design/pull/6291) [@jch254](https://github.com/jch254)
  - Fix wrong type in Mention and Form. [pull/6268](https://github.com/ant-design/ant-design/pull/6268) [@jch254](https://github.com/jch254)
  - Fix wrong type in Badge. [pull/6291](https://github.com/ant-design/ant-design/pull/6291) [@jch254](https://github.com/jch254)
  - Add missing props in Input related Components. [pull/6276](https://github.com/ant-design/ant-design/pull/6276/commits/94901de2e8c0a2ed6f62f5aa50c98994aad71844) [@panjiesw](https://github.com/panjiesw)  [commit/220264](https://github.com/ant-design/ant-design/commit/2202648d6e1c53409ade2141955232922b0040d6#diff-26cb6da96d10397e18e7dbd6c5d8f7a1L265) [@clinyong](https://github.com/clinyong)

## 2.10.2

`2017-05-23`

- Fix `prop-types` warnings which due to upgrading React. [#5678](https://github.com/ant-design/ant-design/issues/5678)
- Fix `defaultValue` issue of DatePicker and RangePicker in showTime mode. [#6160](https://github.com/ant-design/ant-design/pull/6160)
- Fix style issue of TreeSelect. [#6137](https://github.com/ant-design/ant-design/issues/6137)
- Fix style issue of Input with prefix and addon. [#6144](https://github.com/ant-design/ant-design/issues/6144)
- Fix some bugs of `notification.destroy`. [#6161](https://github.com/ant-design/ant-design/issues/6161)
- Fix missing translations of Upload and Table. [#6218](https://github.com/ant-design/ant-design/issues/6218)
- Fix style issue of Cascader inside Input.Group. [#6208](https://github.com/ant-design/ant-design/issues/6208)
- Increase click area of Tree icons. [#6120](https://github.com/ant-design/ant-design/issues/6120)

## 2.10.1

`2017-05-14`

- Upgrade normalize.css to 7.0.0.
- Fix AutoComplete style issue when use with Input.Group. [#6058](https://github.com/ant-design/ant-design/issues/6058)
- Fix Tabs cann't set `animated` when use `card` or `editable-card` type. [#6070](https://github.com/ant-design/ant-design/issues/6070)
- Fix Form style issue when zoom out scrren. [#6097](https://github.com/ant-design/ant-design/issues/6097)
- Fix RangePicker style issue in Safari. [#6061](https://github.com/ant-design/ant-design/issues/6061)
- Notification
  - Fix `getContainer` not working. [#6099](https://github.com/ant-design/ant-design/pull/6099) [@hardfist](https://github.com/hardfist)
  - Fix overlaping issue. [#5895](https://github.com/ant-design/ant-design/issues/5895) [@ystarlongzi](https://github.com/ystarlongzi)
- Add new `fork` icon.
- Add some less variables. [#6039](https://github.com/ant-design/ant-design/pull/6039) [#6038](https://github.com/ant-design/ant-design/pull/6038) [#6105](https://github.com/ant-design/ant-design/issues/6105) [#6040](https://github.com/ant-design/ant-design/pull/6040)

## 2.10.0

`2017-05-02`

- LocaleProvider
  - Support Traditional Chinese. [#5665](https://github.com/ant-design/ant-design/pull/5665) [@GeorgioWan](https://github.com/GeorgioWan)
  - Support Finnish. [#5699](https://github.com/ant-design/ant-design/pull/5699) [@kirbo](https://github.com/kirbo)
  - Support Vietnamese. [#5927](https://github.com/ant-design/ant-design/pull/5927) [@pnghai](https://github.com/pnghai)
  - Update Spanish. [#5932](https://github.com/ant-design/ant-design/pull/5932) [@ginodeise](https://github.com/ginodeis)
- AutoComplete supports to listen to search events by `onSearch`.
- Checkbox.Group can support more flexible layout with nested Checkbox. [demo](http://ant.design/components/checkbox-cn/#components-checkbox-demo-layout)
- Notification's inline style and className can be customized now. [#5893](https://github.com/ant-design/ant-design/issues/5893) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- TimePicker's open status can be controlled by `open` property. [#5913](https://github.com/ant-design/ant-design/pull/5913)
- The returned value of Upload `onRemove` could be a Promise to control remove logic asynchronously. [#5973](https://github.com/ant-design/ant-design/issues/5973) [@shlice](https://github.com/shlice)
- Adjust padding of popup of Dropdown. [#5088](https://github.com/ant-design/ant-design/issues/5088)
- AutoComplete
  - Fix inconsistent behavior between `dataSource: Object[]` and `dataSource: String[]`. [#5860](https://github.com/ant-design/ant-design/issues/5860)
  - Fix broken style of error style in Form. [#5834](https://github.com/ant-design/ant-design/issues/5834) [@kossel](https://github.com/kossel)
- Fix that Button should not insert space in Chinese characters while using Icon. [#5977](https://github.com/ant-design/ant-design/issues/5977)
- Fix broken style while using Cascader in Card[title]. [#5952](https://github.com/ant-design/ant-design/issues/5952)
- Fix broken disabled style of Checkbox Radio. [#5935](https://github.com/ant-design/ant-design/issues/5935)
- Fix broken style of DatePicker with nested TimePicker while using `use12Hours`. [#5959](https://github.com/ant-design/ant-design/issues/5959)
- Fix broken style while using AutoComplete, Cascader, Mention, TimePicker in Input.Group. [#5832](https://github.com/ant-design/ant-design/issues/5832)
- Fix missing TypeScript definition of `inlineIndent` Menu. [#5903](https://github.com/ant-design/ant-design/pull/5903) [@brookshi](https://github.com/brooksh)
- Mention
  - Fix missing properties, readOnly and disabled. [#5175](https://github.com/ant-design/ant-design/issues/5175)
  - Fix controlled mode. [#5788](https://github.com/ant-design/ant-design/issues/5788)
- Fix errors while using RangePicker with Form. [#5872](https://github.com/ant-design/ant-design/issues/5872)
- Fix that pagination is clickable when Table with loading status. [#5937](https://github.com/ant-design/ant-design/issues/5937)
- Tabs
  - Fix broken style while using Table or Form in Tabs. [#5953](https://github.com/ant-design/ant-design/issues/5953)
  - Fix broken style of vertical layout. [#5877](https://github.com/ant-design/ant-design/issues/5877)
- Transfer
  - Fix invisible search result list. [#5631](https://github.com/ant-design/ant-design/issues/5631)
  - Fix select all and unselect all logic in searching mode. [#5993](https://github.com/ant-design/ant-design/issues/5993)

## 2.9.3

`2017-04-24`

- **notification** Fix can't close itself after 4.5s. [#5869](https://github.com/ant-design/ant-design/issues/5869)
- **Tabs** Add transition for `ink-bar` width. [#5858](https://github.com/ant-design/ant-design/pull/5858) [@hlehmann](https://github.com/hlehmann)

## 2.9.2

`2017-04-22`

- **Alert** Fix props of banner mode can't be overrided. [#5800](https://github.com/ant-design/ant-design/issues/5800)
- **AutoComplete** Fix can't add `onKeyDown` event listener with customized input component. [#5487](https://github.com/ant-design/ant-design/issues/5487)
- **Button** New style for danger Button. [#5815](https://github.com/ant-design/ant-design/pull/5815)
- **DatePicker**
  - Improve user experience of RangePicker, rc-calendar upgrade to `~8.0.0`. [#4985](https://github.com/ant-design/ant-design/issues/4985)
  - Fix RangePicker not aligned after customizing the size of input. [pull/5718](https://github.com/ant-design/ant-design/pull/5718) [@leadream](https://github.com/leadream)
- **Form** Add a less variable to opt out of form item colons. [pull/5855](https://github.com/ant-design/ant-design/pull/5855) [@megawac](https://github.com/megawac)
- **Input**
  - Fix Input.Search style issue when be used in Input.Group. [#5743](https://github.com/ant-design/ant-design/issues/5743)
  - Fix AutoComplete style issue when be used in Input.Group. [#5832](https://github.com/ant-design/ant-design/issues/5832)
  - Fix Select size when be used in Input.Group. [#5754](https://github.com/ant-design/ant-design/issues/5754)
  - Change suffix color. [pull/5820](https://github.com/ant-design/ant-design/pull/5820) [@megawac](https://github.com/megawac)
- **InputNumber** Update docs and demos for how to use `parser` to work with `formatter`. [#5683](https://github.com/ant-design/ant-design/issues/5683)
- **Layout**
  - Add [Fixed-Sider](https://ant.design/components/layout/#components-layout-demo-fixed-sider) demo.
  - Fix style issue of responsive sider in firefox. [#5613](https://github.com/ant-design/ant-design/issues/5613)
- **LocaleProvider** Allow for seamless access to less variables. [#5712](https://github.com/ant-design/ant-design/issues/5712) [@lionkeng](https://github.com/lionkeng)
- **Menu** Override the default `a:focus` style when it nested in Menu component. [#5707](https://github.com/ant-design/ant-design/issues/5707)
- **Notification**  Auto adjust style for singleline message. [#5846](https://github.com/ant-design/ant-design/issues/5846)
- **Radio** Add less variables for setting color and background color of Radio.Button. [pull/5791](https://github.com/ant-design/ant-design/pull/5791) [@megawac](https://github.com/megawac)
- **Table**
  - Add less variables for setting head background color and row background hover color. [#5706](https://github.com/ant-design/ant-design/issues/5706) [@kappa-gooner](https://github.com/kappa-gooner)
  - Improve the `Grouping table head` demo style. [#5697](https://github.com/ant-design/ant-design/issues/5697)
- **Tabs** Fix the position of the scrolling arrow in `vertical` mode. [#5765](https://github.com/ant-design/ant-design/issues/5765) [@dicklwm](https://github.com/dicklwm)
- **TreeSelect** Fix arrow rotate bug. [#5693](https://github.com/ant-design/ant-design/issues/5693)
- **TypeScript**
  - Add missing props in InputNumber. [#5717](https://github.com/ant-design/ant-design/issues/5717)  [@whtang906](https://github.com/whtang906)
- **Global Optimization**
  - Fix deprecation warning of `React.PropTypes` due to React upgrading to v15.5.0. [pull/5723](https://github.com/ant-design/ant-design/pull/5723)  [@manjitkumar](https://github.com/manjitkumar)
- **Site**
  - Add native English translation for [icons spec](https://ant.design/docs/spec/icon). [@kenaniah](https://github.com/kenaniah)
  - Add [English gitter chat room](https://gitter.im/ant-design/ant-design-english).

## 2.9.1

`2017-04-09`

- Step
  - Add more less variables. [#5624](https://github.com/ant-design/ant-design/pull/5624) [@megawac](https://github.com/megawac)
  - Fix style issue. [#5623](https://github.com/ant-design/ant-design/issues/5623)
- Button won't lose focus after click. [#5597](https://github.com/ant-design/ant-design/pull/5597) [@kenaniah](https://github.com/kenaniah)
- Add underline to focused link.  [#5587](https://github.com/ant-design/ant-design/pull/5597) [@kenaniah](https://github.com/kenaniah)
- Fix Dropdown.Button can't use `placement` issue. [#5594](https://github.com/ant-design/ant-design/issues/5594)
- Fix Pagination alignment issue. [#5632](https://github.com/ant-design/ant-design/issues/5632)
- Fix AutoComplete style issue when use `allowClear`. [#5634](https://github.com/ant-design/ant-design/issues/5634)
- Fix DatePicker style issue when  set `showToday` to `false`. [#5620](https://github.com/ant-design/ant-design/issues/5620)
- Fix Select shows Chinese defaultly. [#5661](https://github.com/ant-design/ant-design/pull/5661) [@LeeHarlan](https://github.com/LeeHarlan)

## 2.9.0

`2017-04-01` 👻

- Change the default font family to be monospaced for numbers. [b526083](https://github.com/ant-design/ant-design/commit/b526083fa6a619113a3d26c4f4f092a8648f3bd4)
- Select
  - Add `mode` prop, deprecate the `tags|combobox|multiple` properties, replaced by `mode={tags|combobox|multiple}`.
  - `tags|multiple` now supports `allowClear`. [#4843](https://github.com/ant-design/ant-design/issues/4843)
- Add a new type `dashboard` of Progress. [#5225](https://github.com/ant-design/ant-design/issues/5225) [@qiaolb](https://github.com/qiaolb)
- Add `showLine` prop of Tree, for connecting line style in tree nodes. [#3854](https://github.com/ant-design/ant-design/issues/3854)
- TimePicker now supports 12 hours via `use12Hours`. [#4063](https://github.com/ant-design/ant-design/issues/4063)
- Add `column.filterIcon` prop of Table, which can be used to customize filter icon. [#5293](https://github.com/ant-design/ant-design/pull/5293)
- Add `wrapperClassName` prop of Spin. [#5425](https://github.com/ant-design/ant-design/pull/5425) [@aaronplanell](https://github.com/aaronplanell)
- Add `onPrevClick` `onNextClick` props of Tabs. [#4395](https://github.com/ant-design/ant-design/issues/4395)
- Add `parser` prop of InputNumber, to extract value from formatter. [#5178](https://github.com/ant-design/ant-design/pull/5178#issuecomment-284557933)
- New locales support:
  - Japanese [#5529](https://github.com/ant-design/ant-design/pull/5529)  [@novi](https://github.com/novi)
  - Slovak [#5304](https://github.com/ant-design/ant-design/pull/5304) [@Kamahl19](https://github.com/Kamahl19)
  - Estonian [#5266](https://github.com/ant-design/ant-design/pull/5266) [@madisvain](https://github.com/madisvain)
  - Turkish [#5536](https://github.com/ant-design/ant-design/pull/5536) [@c0b41](https://github.com/c0b41)
- TypeScript
  - Fix definitions of Carousel following react-slick
  - Fix some definitions of Form.
  - Fix `getPopupContainer` definitions.
- Allow to disable animation of inkBar and panes of Tabs separately. [#5089](https://github.com/ant-design/ant-design/issues/5089) [@xieguanglei](https://github.com/xieguanglei)
- Button `loading` prop now supports like `{ delay: 1000 }`, removed the default loading delay. [#5365](https://github.com/ant-design/ant-design/issues/5365)
- Add less variables for Card header. [#5354](https://github.com/ant-design/ant-design/pull/5354) [@kossel](https://github.com/kossel)
- Fix extra separator of Breadcrumb without `breadcrumbName`.
- Fix `Unknown prop placement` warning of Dropdown.Button. [#5594](https://github.com/ant-design/ant-design/issues/5594)
- Fix RangePicker and InputNumber placeholder color.
- Fix that Cascader search can't use [Backspace]. [#5340](https://github.com/ant-design/ant-design/issues/5340)
- Fix that LocaleProvider can't affect `Modal.confirm` sometimes. [#5493](https://github.com/ant-design/ant-design/issues/5493) [@hargasinski](https://github.com/hargasinski)
- Fix scroll animation of BackTop which specifies the `target` prop. [#5564](https://github.com/ant-design/ant-design/issues/5564)
- Optimize the block style of Pagination. [#5557](https://github.com/ant-design/ant-design/issues/5557)

## 2.8.3

`2017-03-27`

- TypeScript
  - Fixed missing definition of `AutoComplete[filterOption]`. [#5393](https://github.com/ant-design/ant-design/pull/5393) [@mitchelldemler](https://github.com/mitchelldemler)
  - Improve definition of `getPopupContainer` `getCalendarContainer` `getTooltipContainer` `getSuggestionContainer`, etc. [322e9ef](https://github.com/ant-design/ant-design/commit/322e9efdc9db28bd92230fc690f1fdf5a72cf7cd)
  - Improve definition of `Form.create`. [#5420](https://github.com/ant-design/ant-design/pull/5420) [@infeng](https://github.com/infeng)
- Fixed Badge should work in Maxthon. [#5477](https://github.com/ant-design/ant-design/issues/5477)
- Fixed Button cannot work with `null` `undefined` as children. [#5472](https://github.com/ant-design/ant-design/issues/5472) [@blade254353074](https://github.com/blade254353074)
- Breadcrumb are not rely on `route.breadcrumbName` now. [ac1c7f3](https://github.com/ant-design/ant-design/commit/ac1c7f312bc46ba6ef7aacace43e4ac99b87dd54)
- Fixed `Form.Item[hasFeedback]` will lost styles while using with `Input[prefix]`. [#5456](https://github.com/ant-design/ant-design/issues/5456) [@william-yz](https://github.com/william-yz)
- Fixed Layout.Content will show scrollbar while using with Carousel. [#5415](https://github.com/ant-design/ant-design/issues/5415)
- LocaleProvider
  - Fixed missing locales of German. [#5387](https://github.com/ant-design/ant-design/pull/5387) [@Knacktus](https://github.com/Knacktus)
  - Fixed missing locales of Russian. [#5406](https://github.com/ant-design/ant-design/pull/5406) [@plandem](https://github.com/plandem)
  - Fixed it doesn't work with Upload. [#5388](https://github.com/ant-design/ant-design/pull/5388) [@natergj](https://github.com/natergj)
- Fixed inconsistet animation of Menu Icon and text. [#5495](https://github.com/ant-design/ant-design/issues/5495)
- Fixed `Modal[footer]` cannot be set to `null`. [#5462](https://github.com/ant-design/ant-design/issues/5462)
- Fixed Pagination will lost styles in `IE<=10` which is introduced in `2.8.2`. [#5484](https://github.com/ant-design/ant-design/issues/5484)
- Fixed Popover will be closed by mistake while using Table in it. [#5407](https://github.com/ant-design/ant-design/issues/5407)
- Remove restriction that Radio can only be direct chidlren of Radio.Group. [#5443](https://github.com/ant-design/ant-design/issues/5443)
- Fixed warning while using Switch in Form.Item. [#5368](https://github.com/ant-design/ant-design/issues/5368)
- Now we defaultly hide the Table's "Select All" dropdown icon, display it when set `selections` to true. [#5246](https://github.com/ant-design/ant-design/issues/5246) [@infeng](https://github.com/infeng)
- New theme variable `@info-color`. [#5442](https://github.com/ant-design/ant-design/issues/5442)
- Supporting suppress warning(You are using a whole package of antd...) with `NODE_ENV=test` while testing. [#5345](https://github.com/ant-design/ant-design/issues/5345)
- Upgrade moment to `2.18.0`.

## 2.8.2

`2017-03-11`

- New [design specification documentation](https://ant.design/docs/spec/colors).
- Fix error of Modal.confirm. [#5269](https://github.com/ant-design/ant-design/issues/5269)
- Fix mask style of Upload. [#5275](https://github.com/ant-design/ant-design/issues/5275)
- Fix progress not showing of Upload. [#5323](https://github.com/ant-design/ant-design/issues/5323)
- Fix a pagination showTotal wrong data issue of Table. [#5259](https://github.com/ant-design/ant-design/issues/5259)
- Fix a style issue while using Popconfirm and Button together. [#5301](https://github.com/ant-design/ant-design/issues/5301)
- Fix a style issue of Radio. [#5336](https://github.com/ant-design/ant-design/pull/5336)
- Fix a issue that `getContainer` of Message didn't work. [#5380](https://github.com/ant-design/ant-design/issues/5380)
- Fix text alignment of Checkbox and Radio.  [696a3c0](https://github.com/ant-design/ant-design/commit/696a3c0e34156d78e87d629a3f0f8703af1f03ec)
- Tweak animation and blur style of Spin.  [fa1e031](https://github.com/ant-design/ant-design/commit/fa1e031a7396c61fa9709a0c46fe63200c35d232)
- Tweak some styles of Mention.  [240a93c](https://github.com/ant-design/ant-design/commit/240a93cee25bc8c6ad4520cd907a14a7b22ed773)

## 2.8.1

`2017-03-11`

- **DatePicker** Fix can't select time when new props are passed, and improve the selection behavior of `DatePicker[showTime]`. [#5189](https://github.com/ant-design/ant-design/issues/5189) [@megawac](https://github.com/megawac)
- **Form**
  - Add document for validate rules. [#5201](https://github.com/ant-design/ant-design/issues/5201)
  - Fix some style issues. [#5196](https://github.com/ant-design/ant-design/issues/5196) [#5236](https://github.com/ant-design/ant-design/issues/5236) [#5222](https://github.com/ant-design/ant-design/issues/5222)
- **Icon** Add iconfont `shake` and `android-o`. [commit/941782](https://github.com/ant-design/ant-design/commit/941782f7ec000a9054c3bc945ab887f93ab46749)
- **Input** Fix `hasFeedback` not work with `addonBefore`. [#5228](https://github.com/ant-design/ant-design/issues/5228)
- **InputNumber** Add typings for props `formatter`. [#5240](https://github.com/ant-design/ant-design/issues/5240) [@hlehmann](https://github.com/hlehmann)
- **Modal** Call `onCancel` when pressing esc key. [#5203](https://github.com/ant-design/ant-design/issues/5203) [@elios264](https://github.com/elios264)
- **Table**
  - Fix implicit type issue. [#5206](https://github.com/ant-design/ant-design/issues/5206) [@kvey](https://github.com/kvey)
  - Fix right border not visible with no data in `small` size. [#5237](https://github.com/ant-design/ant-design/issues/5237)
  - Fix sort not working when using grouping column. [#5158](https://github.com/ant-design/ant-design/issues/5158)
- **Tooltip** Fix layout style on disabled Button. [#5254](https://github.com/ant-design/ant-design/issues/5254)
- **Upload**
  - Fix long name of upload item style. [commit/0a3519](https://github.com/ant-design/ant-design/commit/0a35197a35513ca45308bb7163c8243b75dd6f8d)
  - Fix and improve animation. [pull/5210](https://github.com/ant-design/ant-design/pull/5210)
  - Allow override `onProgress`. [pull/5260](https://github.com/ant-design/ant-design/pull/5260) [@minwe](https://github.com/minwe)
- **Global Optimization**
  - Fix Cannot resolve module `lodash.debounce`. [#5230](https://github.com/ant-design/ant-design/issues/5230)
- **Site**
  - Fix safari language check. [pull/5245](https://github.com/ant-design/ant-design/pull/5245)
  - Add ability to copy color when clicking on palette. [pull/5247](https://github.com/ant-design/ant-design/pull/5247) [@bsheikh](https://github.com/bsheikh)
  - Add boilerplate samples. [commit/f2f786](https://github.com/ant-design/ant-design/commit/f2f786d66d75eebef8406a72db8a15e1640cea1f)

## 2.8.0

`2017-03-06`

- Tabs
  - Added `tabBarStyle` to allow customize style of tab bar. [#4966](https://github.com/ant-design/ant-design/issues/4966)
  - Added `TabPane[closable]` to allow config whether to show delete icon or not. [#4807](https://github.com/ant-design/ant-design/pull/4807) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- Anchor
  - Added `showInkInFixed` to allow config whether to show circle icon or not when anchor is fixed. [#4960](https://github.com/ant-design/ant-design/pull/4960)
  - Fix issue resulting in Anchor throw errors when `children` is not AnchorLink. [#5129](https://github.com/ant-design/ant-design/issues/5129)
- Table
  - Added invert selection feature. [demo](https://ant.design/components/table-cn/#components-table-demo-row-selection-custom) [#4962](https://github.com/ant-design/ant-design/pull/4962)
  - `spin` now spport Spin props. [#4824](https://github.com/ant-design/ant-design/pull/4824) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
  - Fix issue resulting header's bottom border doesn't show when `size` is `small`. [#5182](https://github.com/ant-design/ant-design/issues/5182)
- Mention added custom trigger character support. [demo](https://ant.design/components/mention-cn/#components-mention-demo-multiple-trigger)
  - ![Mention animation](https://zos.alipayobjects.com/rmsportal/QDYwAbwKrqOUOykRaNai.gif)
- Rate
  - Support custom character. [demo](https://ant.design/components/rate-cn/#components-rate-demo-character)
  - Added new `className` prop.
- Layout
  - Added a new `Header Sider` demo. [demo](http://ant.design/components/layout-cn/#components-layout-demo-top-side-2)
  - Added a new `Fixed Header` demo. [demo](https://ant.design/components/layout-cn/#components-layout-demo-fixed)
  - Added `Sider[breakpoint]` to allow config responsive breakpoint. [#4931](https://github.com/ant-design/ant-design/pull/4931)
- Form
  - Added `layout` to replace the original `horizontal`, `vertical`, `inline`. [#5056](https://github.com/ant-design/ant-design/issues/5056)
- Calendar
  - Added `dateFullCellRender` and `monthFullCellRender` to allow override the content of cell. [#5138](https://github.com/ant-design/ant-design/pull/5138) [@wonyun](https://github.com/wonyun)
  - Added  `onSelect` for date selection. [demo](https://ant.design/components/calendar-cn/#components-calendar-demo-select)
- AutoComplete
  - Fix alignment issue in Form.Item. [#5139](https://github.com/ant-design/ant-design/issues/5139)
  - Adde a newd `Uncertain Category` demo. [demo](https://ant.design/components/auto-complete-cn/#components-auto-complete-demo-uncertain-category)
- Col added `xl` to support 1600px breakpoint. [#4796](https://github.com/ant-design/ant-design/pull/4796) [@hjin-me](https://github.com/hjin-me)
- Upload added `locale` to support i18n. [#4697](https://github.com/ant-design/ant-design/issues/4697)
- Transfer added `onScroll` to support load data dynamically. [#4188](https://github.com/ant-design/ant-design/issues/4188)
- `message` and `notification` add `getContainer` to allow config the render container. [#5019](https://github.com/ant-design/ant-design/issues/5019)
- Badge added `showZero` to allow config whether to show `0` or not. [#4251](https://github.com/ant-design/ant-design/issues/4251)
- InputNumber
  - Added `formatter` to allow format the value to present.
  - Added ctrl and shift key support. [detail](https://github.com/react-component/input-number#keyboard-navigation)
- Added some new icons. [#5107](https://github.com/ant-design/ant-design/pull/5107)
- New locale support:
  - Dutch [#4785](https://github.com/ant-design/ant-design/pull/4785) [@corneyl](https://github.com/corneyl)
  - Catalan [#4929](https://github.com/ant-design/ant-design/pull/4929) [@aaronplanell](https://github.com/aaronplanell)
  - Czech [#5169](https://github.com/ant-design/ant-design/pull/5169) [@martinnov92](https://github.com/ant-design/ant-design/pull/5169)
  - Korean [#5141](https://github.com/ant-design/ant-design/pull/5141) [@minsungryu](https://github.com/ant-design/ant-design/pull/5141)
- Improve Spin display position. [#4722](https://github.com/ant-design/ant-design/issues/4722)
- Fix Checkbox comatible issue with `browser-sync`. [#2744](https://github.com/ant-design/ant-design/issues/2744)
- Fix Steps width issue when resize window. [#5083](https://github.com/ant-design/ant-design/issues/5083)
- Fix Upload.Dragger unmount error. [#5162](https://github.com/ant-design/ant-design/issues/5162)
- Fix Button shifting during click in IE issue.
- FIx Input prefix and suffix vertical alignment.

## 2.7.4

`2017-02-28`

- Fix TreeSelect cannot display bug. [#5092](https://github.com/ant-design/ant-design/issues/5092)
- Fix Anchor `e.stopPreventDefault is not a function` error. [#5080](https://github.com/ant-design/ant-design/issues/5080)
- Fix some detail styles of Input, Cascader, Upload.

## 2.7.3

`2017-02-25`

- Unify demo code to ES6 class. [#4878](https://github.com/ant-design/ant-design/issues/4878)
- TypeScript
  - Fix that `Cannot find module '../../package.json'` error. [#4935](https://github.com/ant-design/ant-design/issues/4935)
  - Fix definitions of Table, RangePicker and Upload.
- Fix lack of event argument for Modal `onOk` `afterClose` and Popconfirm `onConfirm` `onCancel`. [#4787](https://github.com/ant-design/ant-design/issues/4787)
- Improve animation of Menu inline mode and Collapse.
- Improve Checkbox and Radio vertical align style.
- Table
  - Fix misplace header when fix column. [#4936](https://github.com/ant-design/ant-design/issues/4936)
  - Fix not clearing float issue. [#4945](https://github.com/ant-design/ant-design/issues/4945)
  - Fix submenu of filter. [#4975](https://github.com/ant-design/ant-design/issues/4975)
  - Fix that filterDropdown of fixed column cannot be interacted with. [#5010](https://github.com/ant-design/ant-design/issues/5010)
  - Fix that arguments of `pagination.onChange` do not match Pagination `onChange`.
  - Fix that table loading animation is not smoothing. [#4934](https://github.com/ant-design/ant-design/issues/4934)
- Improve multiple message display. [#3543](https://github.com/ant-design/ant-design/issues/3543)
- Fix Carousel autoplay not working after resize window. [#2550](https://github.com/ant-design/ant-design/issues/2550)
- Fix that controlled InputNumber cannot input number like `1.01` `1.001`. [#5012](https://github.com/ant-design/ant-design/issues/5012)
- Improve Button loading switching.[#4913](https://github.com/ant-design/ant-design/issues/4913)
- Fix Dropdown selected menu style and `Menu[theme="dark"]` style. [#5013](https://github.com/ant-design/ant-design/issues/5013) [#4903](https://github.com/ant-design/ant-design/issues/4903)
- Fix Menu submenu `z-index` issue. [#4937](https://github.com/ant-design/ant-design/issues/4937)
- Fix that DatePicker and RangePicker width cannot be reset below `300px` issue. [#4920](https://github.com/ant-design/ant-design/issues/4920)
- Fix style of Spin nested in Spin. [#4971](https://github.com/ant-design/ant-design/issues/4971)
- Fix that lack of Button style when import Popconfirm by babel-plugin-import.
- Fix that less variables cannot work on circle Progress. [#5002](https://github.com/ant-design/ant-design/issues/5002)
- Fix falsy children of Breadcrumb. [#5015](https://github.com/ant-design/ant-design/issues/5015)
- Fix blinking tooltip of Slider. [#5003](https://github.com/ant-design/ant-design/issues/5003)
- Fix that Transfer disabled option can be moved. [#4981](https://github.com/ant-design/ant-design/pull/4981) [@tianlizhao](https://github.com/tianlizhao)
- Documentation
  - Fix and improve site for mobile devices.
  - Improve 1.x to 2.x compatibility instruction.

## 2.7.2

`2017-02-17`

- Fix that `antd.version` doesn't work as expected. [#4844](https://github.com/ant-design/ant-design/issues/4844)
- Fix that dist files don't include locales. [#4910](https://github.com/ant-design/ant-design/pull/4910)
- Fix that disabled option is selectable in search mode of Cascader. [#4699](https://github.com/ant-design/ant-design/issues/4699)
- **Button**
  - Fix click animation of `Button[type=danger]`.
  - Fix broken style with `loading`. [#4875](https://github.com/ant-design/ant-design/issues/4875)
- **Menu**
  - Fix that `openKeys` should be controlled property in `vertical` mode. [#4876](https://github.com/ant-design/ant-design/issues/4876)
  - Fix selected animation of Menu.Item.
  - Fix broken style of Menu.SubMenu. [#4906](https://github.com/ant-design/ant-design/issues/4906)
- **Table**
  - Fix broken style of table which use small size and fixed header. [#4850](https://github.com/ant-design/ant-design/issues/4850)
  - Fix placeholder style. [#4851](https://github.com/ant-design/ant-design/pull/4851)
  - Simplify DOM structure. [#4868](https://github.com/ant-design/ant-design/issues/4868)
- Fix that Radio should support number `0` as children. [#4874](https://github.com/ant-design/ant-design/issues/4874) [@HQidea](https://github.com/HQidea)
- Fix that RangePicker should work with `style.width` which is small than 300. [#4920](https://github.com/ant-design/ant-design/issues/4920)
- Fix CSS compile error caused by Spin. [#4915](https://github.com/ant-design/ant-design/issues/4915)
- Fix that Tooltip should work with disabled button in Chrome. [#4865](https://github.com/ant-design/ant-design/pull/4865)
- Fix UX of Tree while dragging. [#4858](https://github.com/ant-design/ant-design/issues/4858)
- Fix failed style of Upload. [#4810](https://github.com/ant-design/ant-design/issues/4810)
- Fix that `Menu[vertical]`'s SubMenu cannot popup in Layout.Sider. [#4890](https://github.com/ant-design/ant-design/issues/4890)
- Improve animation of Button and `Badge[status=processing]`.

![Badge animation](https://camo.githubusercontent.com/6874b2333f2fac3fac346404c6e70684e4dafc1a/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f73516b72756c716346734b4e54785158615971512e676966)
![Button animation](https://camo.githubusercontent.com/3963d12b45de4f522c2799361dbc3177e7bd93d1/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f46624b776d636f766d795364666c557468494e522e676966)

## 2.7.1

`2017-02-10`

- **Affix**
  - Fix the problem of element been hidden when hover on. [#4800](https://github.com/ant-design/ant-design/issues/4800)
  - Fix event listener can not be removed. [#4755](https://github.com/ant-design/ant-design/issues/4755)
  - Fix can not be unfixed when scrolling fastly. [#4760](https://github.com/ant-design/ant-design/issues/4760)
- **Anchor** Fix the location problem when offsetTop has been set. [#4706](https://github.com/ant-design/ant-design/issues/4706)
- **AutoComplete**
  - Fix the wrong size. [#4766](https://github.com/ant-design/ant-design/issues/4766)
  - Fix adding error character automatically. [#4778](https://github.com/ant-design/ant-design/issues/4778)
- **Dropdown** Add the documentation and demo about positioning of Dropdown menus. [#4811](https://github.com/ant-design/ant-design/issues/4811)
- **Layout** Improve Sider's animation effect. [#4752](https://github.com/ant-design/ant-design/issues/4752)
- **LocaleProvider** Fix issues with the new Swedish locale provider. [pull-4762](https://github.com/ant-design/ant-design/pull/4762) [@JesperWe](https://github.com/JesperWe)
- **RangePicker** Fix the overlapping problem about the date icon. [#4783](https://github.com/ant-design/ant-design/issues/4783) [@zhenzong](https://github.com/zhenzong)
- **Table**
  - Add the missing value 'middle' for size definition. [#4819](https://github.com/ant-design/ant-design/pull/4819) [@warrenseymour](https://github.com/warrenseymour)
  - Fix controlled filter does not work with JSX style. [#4759](https://github.com/ant-design/ant-design/issues/4759)
  - Fix switch pagination problem. [#4779](https://github.com/ant-design/ant-design/issues/4779)
- **Tabs** Fix content missing problem since the second tab pane under IE9. [#4795](https://github.com/ant-design/ant-design/issues/4795)
- **rc-pagination** Upgrade to ~1.7.0, add pageSize as onChange's second argument.
- **Global optimization**
  - Make some bugfixes and optimizations about documentation, link and style.
  - Use stylelint instead of lesslint, and fix some lint issues. [#2179](https://github.com/ant-design/ant-design/issues/2179)
  - Unify border radius to 4px. [#4772](https://github.com/ant-design/ant-design/issues/4772)
  - Support `import { version } from 'antd'`. [#4751](https://github.com/ant-design/ant-design/pull/4751)
- **Site**
  - Add default locale looking-up in Home Page. [#4552](https://github.com/ant-design/ant-design/issues/4552)
  - Can search with Google. [#4814](https://github.com/ant-design/ant-design/issues/4814)
  - Change the position of version switch. [pull-4799](https://github.com/ant-design/ant-design/pull/4799)

## 2.7.0

`2017-02-03`

* Added `danger` button and `ghost` button style. [#4679](https://github.com/ant-design/ant-design/pull/4679)
* Input element of AutoComplete can be customized. [#4483](https://github.com/ant-design/ant-design/pull/4483)
* Upgrade rc-cascader to `0.11.0`, keyborad interactions supported. [#4411](https://github.com/ant-design/ant-design/pull/4411)
* More popup directions are supported in notification. [#4732](https://github.com/ant-design/ant-design/pull/4700)
* Upgrade rc-steps to `2.3.0`, added `progressDot` property of Steps, which allows users to customize the display for Steps with progress dot style.
* Upgrade rc-input-number to `3.0.0`
  * Input behavious will trigger `onChange` callback now.[#4265](https://github.com/ant-design/ant-design/pull/4265)
  * Fixed `onKeyUp`. [#4717](https://github.com/ant-design/ant-design/issues/4717)
* Added `vertical` mode of Slider. [#4473](https://github.com/ant-design/ant-design/pull/4473)
* Tag
  * Added preset colors. [#4571](https://github.com/ant-design/ant-design/pull/4571)
  * Improvement vertical-align and margin.
* Add German localization for LocaleProvider.[#4686](https://github.com/ant-design/ant-design/pull/4686)
* Add Swedish localization for LocaleProvider. [#4455](https://github.com/ant-design/ant-design/pull/4455)
* Add French localization for LocaleProvider. [#4538](https://github.com/ant-design/ant-design/pull/4538)
* Added `onSearchChange` callback of Transfer. [#4464](https://github.com/ant-design/ant-design/pull/4464)
* Added `maskClosable` property of Modal.confirm. [#4488](https://github.com/ant-design/ant-design/pull/4488), [#4488](https://github.com/ant-design/ant-design/pull/4490)
* Form
  * Added `options.onValuesChange` option, because `options.onFieldsChange` would be triggered multiply. [#2934](https://github.com/ant-design/ant-design/pull/2934)
  * Added `props.form.getFieldsError` `props.form.isFieldTouched` `props.form.isFieldsTouched` options that can be used to disable submit button. [#4374](https://github.com/ant-design/ant-design/issues/4374)
  * Added `hideRequiredMark` property. [#4732](https://github.com/ant-design/ant-design/pull/4732)
* Improvement upload list of Upload. [#4516](https://github.com/ant-design/ant-design/pull/4516)
* Upgrade rc-select to `6.7.1`.
  * Fixed duplication `onChange` callback. [#156@rc-select](https://github.com/react-component/select/pull/156)
  * Fixed displaying of initial value. [#152@rc-select](https://github.com/react-component/select/pull/152)
* Upgrade rc-tree-select to `1.9.0`.
  * Added `treeDefaultExpandedKeys` property.[#43@rc-tree-select](https://github.com/react-component/tree-select/pull/43)
  * Fixed an overflow-wrap issue. [#42@rc-tree-select](https://github.com/react-component/tree-select/pull/42)
* Added less variables: `@border-style-base` `@border-width-base` `@btn-danger-color` `@btn-danger-bg` and etc.
* Fixed Badge misplace issue when browser zoom above 100%. [#4747](https://github.com/ant-design/ant-design/issues/4747) [#4290](https://github.com/ant-design/ant-design/issues/4290)
* Fixed a mis-align issue of fixed header Table. [#4750](https://github.com/ant-design/ant-design/issues/4750)
* Fixed Table scrolling lag issue in IE. [#4522](https://github.com/ant-design/ant-design/issues/4522)
* Add icon aliases: `addfile` => `file-add`, `addfolder` => `folder-open`, and the old type names are still working. [#4758](https://github.com/ant-design/ant-design/issues/4758)

## 2.6.4

`2017-01-20`

* Improve RangePicker when selecting a preset date.[#4561](https://github.com/ant-design/ant-design/issues/4561)
* Fix DatePicker select time scroll issue.[#4412](https://github.com/ant-design/ant-design/issues/4412)
* Fix issue resulting in vertical Menu can't be controlled.[#3783](https://github.com/ant-design/ant-design/issues/3783)
* Fix Cascader's style when it's disabled.[#4648](https://github.com/ant-design/ant-design/issues/4648)
* Table
  * Improve Table fixed header's scrollbar style.[#4637](https://github.com/ant-design/ant-design/issues/4637)
  * Fix issue resulting in Table's header flashes when `loading` is true in Safari.[#4622](https://github.com/ant-design/ant-design/issues/4622)
  * Fix multiple border issues. [#4647](https://github.com/ant-design/ant-design/issues/4647), [#4635](https://github.com/ant-design/ant-design/issues/4635)
  * Fix `showHeader`'s default value.[#4658](https://github.com/ant-design/ant-design/issues/4658)
  * Fix missing `TableColumnConfig` type.[#4660](https://github.com/ant-design/ant-design/issues/4660)

## 2.6.3

`2017-01-15`

* Fixed issue introduced in `2.6.2` that Popconfirm is not working. [#4606](https://github.com/ant-design/ant-design/issues/4606)

## 2.6.2

`2017-01-14`

* Added a Third-Party Library Page for recommending other greet react components. [Link](/docs/react/recommendation)
* Fixed misplaced Sider of Layout. [#4459](https://github.com/ant-design/ant-design/issues/4459)
* Fixed Input.Search wrong block layout and misplaced icon. [#4540](https://github.com/ant-design/ant-design/issues/4540)
* Added a customize Collapse panel demo. [Link](/components/collapse/#components-collapse-demo-custom)
* Table
  * Enlarged the width of selection column and expand column.
  * Fixed not-available pagination issue when property `pagination` is changed. [#4532](https://github.com/ant-design/ant-design/issues/4532)
  * Fixed that three level filter menu is not working. [#4541](https://github.com/ant-design/ant-design/issues/4541)
  * Fixed `column.filteredValue` issue of cannot being set to `null`.
* Now Carousel is undragglble and text-selectable defaultly.
* Added warnings when non-BreadcrumbItem node is nested under Breadcrumb. [#4403](https://github.com/ant-design/ant-design/issues/4403)
* Fixed Tooltip hidden issue when `onVisibleChange(visible)` return `true`. [#4579](https://github.com/ant-design/ant-design/issues/4579)
* Make TreeSelect panel default height smaller than screen height. [#4537](https://github.com/ant-design/ant-design/pull/4537)
* Added less variables of TimePicker and Spin.
* Replaced arrows of DatePicker year panel by year text. [#4415](https://github.com/ant-design/ant-design/issues/4415)
* Fixed TypeScript definites of AutoComplete and Form `[options.validateTrigger]`.
* Improved the animation details of Spin and Progress.

## 2.6.1

`2017-1-6`

* Fix style problem for Menu dark theme. [#4440](https://github.com/ant-design/ant-design/issues/4440)
* Fix TypeScript interface definition for `Select[tokenSeparators]` `Modal[afterClose]` `Input[name]` and so on. [#4441](https://github.com/ant-design/ant-design/pull/4441) [@eddhannay](https://github.com/eddhannay)
* Fix that `TimePicker[placeholder]` cannot be set to empty string. [#4446](https://github.com/ant-design/ant-design/pull/4446) [@jialeicui](https://github.com/jialeicui)
* Fix style problem in DatePicker year panel. [#4415](https://github.com/ant-design/ant-design/issues/4415)
* Fix that Table loading doesn't mask Pagination. [#4461](https://github.com/ant-design/ant-design/issues/4461)
* Fix align style for `Input[prefix|suffix]`. [commit](https://github.com/ant-design/ant-design/commit/c4ac4d1eca53ae2f6f4a1e15210b43745f283534)
* Fix align style for Cascader. [commit](https://github.com/ant-design/ant-design/commit/1fbebd4ecfff432e1b2261c9dfee4b9f471e7b1f)

## 2.6.0

`2017-1-2`

- Brand new color system. [pull/4426](https://github.com/ant-design/ant-design/pull/4426)
  - Brand new color algorithm replacing the tint/shade system.
  - Brand new color palattes generated by new algorithm. [Link](http://ant.design/docs/spec/colors)
  - Change default font color.
- Add Layout component. [#3534](https://github.com/ant-design/ant-design/issues/3534)
- Add Grid playground demo. [commit/ee17ab](https://github.com/ant-design/ant-design/commit/ee17abfa9d0362c6f9baab4a9a09e57574583246)
- Input
  - Support prefix and suffix. [#4226](https://github.com/ant-design/ant-design/issues/4226) [@ystarlongzi](https://github.com/ystarlongzi)
  - InputGroup support compact display mode. [pull/4309](https://github.com/ant-design/ant-design/pull/4309)
- Spin support delayed display. [#4306](https://github.com/ant-design/ant-design/issues/4306)
- Fix the dislocation problem of Pagination in low resolution. [#4349](https://github.com/ant-design/ant-design/issues/4349)
- Fix wrapping display of Dropdown.Button. [pull/4355](https://github.com/ant-design/ant-design/pull/4355) [@Morhaus](https://github.com/Morhaus)
- Fix wrong background color of Cascader in disabled status. [#4434](https://github.com/ant-design/ant-design/issues/4434)
- Fix MonthPicker[monthCellContentRender] doesn't work, and some documentation errors. [#4394](https://github.com/ant-design/ant-design/issues/4394)
- Fix the extra border of ButtonGroup. [#4382](https://github.com/ant-design/ant-design/pull/4382) [@ystarlongzi](https://github.com/ystarlongzi)
- Fix wrong background color of the Submenu(horizontal mode). [#4414](https://github.com/ant-design/ant-design/issues/4414)
- Fix overlapping graphics with Select/Cascader in Form.Item with hasFeedback. [#4431](https://github.com/ant-design/ant-design/issues/4431) [@JesperWe](https://github.com/JesperWe)
- Reset border-radius of the first row in Table without header. [#4373](https://github.com/ant-design/ant-design/issues/4373)
- Improve the drag performance of Tree. [#4371](https://github.com/ant-design/ant-design/issues/4371)
- Improve official website and documentation, fix some bugs.
- Update rc-form to support nested style of getFieldDecorator[id].

## 2.5.3

`2016-12-24` 🎄🎄🎄

* Supports TypeScript@2.1. [#4208](https://github.com/ant-design/ant-design/issues/4208)
* Fix style issue resulting in nested Tabs. [#4317](https://github.com/ant-design/ant-design/issues/4317)
* Fix `onChange` callback issue resulting in Radio. [#4242](https://github.com/ant-design/ant-design/issues/4242) [@ystarlongzi](https://github.com/ystarlongzi)
* Fix a FormItem mis-aligin bug. [#4271](https://github.com/ant-design/ant-design/issues/4271)
* Fix background issue resulting in selected element of veritcal Menu.[#4253](https://github.com/ant-design/ant-design/issues/4253)
* Improve arguments type of `onVisibleChange` callback of  Dropdown.[#4236](https://github.com/ant-design/ant-design/issues/4236) [@bang88](https://github.com/bang88)
* Improve first argument type of `onChange` callback of Cascader.[#4231](https://github.com/ant-design/ant-design/issues/4231) [@bang88](https://github.com/bang88)
* Improve default width of Datepicker[showTime]. [b912f1c](https://github.com/ant-design/ant-design/commit/b912f1cea6f470c16b8dd90554883460161cef47)

## 2.5.2

`2016-12-10`

* Improve selected item style of Menu.
* Fix issue resulting in Mention not responses `onFocus` and `onBlur`. [#4163](https://github.com/ant-design/ant-design/issues/4163)
* Fix issue resulting in there is a redundant shadow between `disabled` and `checked` Radio. [#4114](https://github.com/ant-design/ant-design/pull/4114) @jdz321
* Fix error when setting Momment `defaultValue` or `value` on RangePicker, TimePicker, Calendar. [#4147](https://github.com/ant-design/ant-design/issues/4147)
* Fix issue resulting in Affix disappears when it's uesed in animated Tabs. [#3943](https://github.com/ant-design/ant-design/issues/3943)
* Fix issue resulting in Cascader passes different `selectedOptions` to `onChange` when manually selecting and selecting by search. [#4096](https://github.com/ant-design/ant-design/issues/4096)
* Fix issue resulting in Tabs get offset, when too many tabs are opening. [#3637](https://github.com/ant-design/ant-design/issues/3637)
* Table
  * Align text of grouped parent header to center.
  * Fix issue resulting in `filterDropdownVisible` can't be set correctly. [#4162](https://github.com/ant-design/ant-design/issues/4162)

## 2.5.1

`2016-12-03`

* Improve website experience on mobile devices.
* Add some migrate warnings for `1.x` to `2.x`.
* ToolTip, Popover, Popconfirm support to wrap text node and multiple node directly now. [#3924](https://github.com/ant-design/ant-design/issues/3924)
* Anchor
  * Fix current position bug when scroll fastly. [#4053](https://github.com/ant-design/ant-design/issues/4053)
  * Fix a bug of parent component ref node is undefined. [#4037](https://github.com/ant-design/ant-design/issues/4037)
* Table
  * Fix a selection problem when setting defaultChecked in rowSelection. [#4020](https://github.com/ant-design/ant-design/issues/4020)
  * Fix grouping column title cannot work with filters. [#4099](https://github.com/ant-design/ant-design/issues/4099)
* Fix a misplace bug when using Popover over `Input[type="textarea"]`. [#4092](https://github.com/ant-design/ant-design/issues/4092)
* Fix Popconfirm `visible` is not-working problem. [#4068](https://github.com/ant-design/ant-design/issues/4068)
* Fix TimePicker can not override width by `style.width`.
* Unify Steps icon size. [#3817](https://github.com/ant-design/ant-design/issues/3817)
* Fix style details of Form, Button, Slider, Table.

## 2.5.0

`2016-11-25`

* Change the default theme to Alipay style and improve lots of style details.
* Supports server-side rendering. (`Mention` will throw warning for [draft-js](https://github.com/facebook/draft-js/issues/385)' issue)
* Introduce [Jest Snapshot](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing) to test the structure of components and SSR issues.
* Improve official website and documentation.
* Add [document](https://ant.design/docs/react/customize-theme) for customizing theme.
* Add [Sketch template files](https://ant.design/docs/resource/download).
* `LocaleProvider` supports Brazilian. [#4004](https://github.com/ant-design/ant-design/pull/4004) [@nathantn](https://github.com/nathantn)
* DatePicker
  * DatePicker can determine whether to show "Today" button. [commit](https://github.com/ant-design/ant-design/commit/bbef274aae169d142e3e7e3ea0af922d48e6dd64)
  * RangePicker can set presetted ranges. [demo](https://ant.design/components/date-picker/#components-date-picker-demo-presetted-ranges)
  * Fix "Now" button doesn't work while `DatePicker[showTime]` is set. [#3748](https://github.com/ant-design/ant-design/issues/3748)
  * Fix `RangePicker[format]` should work. [#3808](https://github.com/ant-design/ant-design/issues/3808)
  * Fix issue that RangePicker `placeholder=['xx', 'xx']` not working.
* Add and update some icons. [#3977](https://github.com/ant-design/ant-design/pull/3977)
* New component `Input.Search`. [demo](https://ant.design/components/input/#components-input-demo-search-input)
* Mention onSelect event will get complete record. [#3867](https://github.com/ant-design/ant-design/issues/3867)
* Pagination can get current range. [demo](https://ant.design/components/pagination/#components-pagination-demo-total)
* Table
  * We can control the visible of customized `filterDropdown`. [demo](https://ant.design/components/table/#components-table-demo-custom-filter-panel)
  * Supports JSX-style columns. [demo](https://ant.design/components/table/#components-table-demo-jsx)
  * Can listen the click event of table cell by `onCellClick`. [#3774](https://github.com/ant-design/ant-design/issues/3774)
  * Fix border radius of head of border-less table.
  * Fix that height of title and footer don't follow `Table[size]`. [commit](https://github.com/ant-design/ant-design/commit/9e6439b06cd099ab384a4a2f026f0def6e12bf23)
  * Fix issue with selected status. [#3900](https://github.com/ant-design/ant-design/issues/3900)
* Upload
  * Fix that children could not be `null`.
  * Fix logic of preview. [commit](https://github.com/ant-design/ant-design/commit/e552880c32aaa3f5b0fb09a5e1fb7454c24d5378)
* Fix `z-index` of Badge. [#3898](https://github.com/ant-design/ant-design/issues/3898)
* Fix alignment of multi-line Checkbox. [#3971](https://github.com/ant-design/ant-design/issues/3971) [@flashback313](https://github.com/flashback313)
* Fix alignment of InputNumber while using with other form controls. [#3866(comment)](https://github.com/ant-design/ant-design/issues/3866#issuecomment-261148256)
* Fix style of `Menu.Divider`. [#3813](https://github.com/ant-design/ant-design/issues/3813)
* Fix that Popover should support Checkbox and Radio as children. [#3455](https://github.com/ant-design/ant-design/issues/3455)
* Fix height of `Select[combobox]`. [#3855](https://github.com/ant-design/ant-design/issues/3855)
* Fix style of actived Switch. [#3838](https://github.com/ant-design/ant-design/issues/3838)
* Fix that Transfer doesn't show "Not Found" while there is no search result. [#3996](https://github.com/ant-design/ant-design/issues/3996)
* Fix style of placeholder of TreeSelect. [#3841](https://github.com/ant-design/ant-design/issues/3841)
* Fix compile errors in TypeScript. [#3969](https://github.com/ant-design/ant-design/pull/3969) [@AlbertZheng](https://github.com/AlbertZheng)
* Fix that feedback icon should not affect users' operation. [#3891](https://github.com/ant-design/ant-design/issues/3891)

## 2.4.3

`2016-11-17`

* Fix errors in `Anchor` about querySelector, and make some experience Optimization .[#3832](https://github.com/ant-design/ant-design/issues/3832) [#3844](https://github.com/ant-design/ant-design/issues/3844)

## 2.4.2

`2016-11-13`

* Fix `Dropdown.Button` cannot popup menu.[#3815](https://github.com/ant-design/ant-design/issues/3815)

## 2.4.1

`2016-11-11`

* Fix `2.4.0` missing index files.

## 2.4.0

`2016-11-11`

* Adjust components structure.
* New [Anchor](https://ant.design/components/anchor) Component.
* Fix less variables `@font-size-base` and `@text-color`, add `@font-size-lg` `@text-color-secondary`.
* Add new props `selectedKeys` for `Transfer` component [#3729]. (https://github.com/ant-design/ant-design/issues/3729)
* Add `Tag` selected status.
* Fix `Dropdown.Button` not support `visible` and `onVisibleChange`. [#3779](https://github.com/ant-design/ant-design/issues/3779)
* Fix `Now` button of `DatePicker[showTime]`. [#3748](https://github.com/ant-design/ant-design/issues/3748)
* Fix style of `Steps` in vertical mode. [#3760](https://github.com/ant-design/ant-design/issues/3760)
* Fix style compatibility of `Spin` in IE10+.[#3755](https://github.com/ant-design/ant-design/issues/3755)
* Fix default style of `Carousel` component.
* Fix focus logic of `Mention` component. [#3801](https://github.com/ant-design/ant-design/issues/3801)
* Fix animate bug of `Progress` component. [#3784](https://github.com/ant-design/ant-design/issues/3784)
* Fix focus bug of `Select` component. [#3778](https://github.com/ant-design/ant-design/issues/3778)
* Fix `TimePicker` not support `format="HH"` bug. [#3793](https://github.com/ant-design/ant-design/issues/3793)
* Fix `Input` `suffix` mouse event responsive area. [#3714](https://github.com/ant-design/ant-design/issues/3714)
* Improve performance of `Table` selection. [#3757](https://github.com/ant-design/ant-design/pull/3757)
* Improve Carousel default UI style.
* Improve style of `Checkbox` and `Radio`. [#3590](https://github.com/ant-design/ant-design/issues/3590)
* Fix style of DatePickek, Form, Table.

## 2.3.2

`2016-11-09`

* Fix dead loop while using `getFieldProps`.

## 2.3.1

`2016-11-07`

* Add missing `dist/antd.css` back.

## 2.3.0

`2016-11-04`

* Upgrade normalize.css to 5.0.
* Point main file to `lib/index.js` in package.json. [#3397](https://github.com/ant-design/ant-design/pull/3397)
* A brand new `Spin` design.
* Add `addon` for `TimePicker` to allow render some addon to its bottom.
* Add `onDragEnd` for `Tree`.
* Add `bordered` for `Collapse`.
* Improve `Tabs` switch animation.
* Improve `Radio` and `Checkbox` style when it's disabled and mouse hovered. [#3590](https://github.com/ant-design/ant-design/issues/3590)
* Optimize `Transfer` performance.[#2860](https://github.com/ant-design/ant-design/issues/2860)
* Fix nested `Popover` style issue. [#3448](https://github.com/ant-design/ant-design/issues/3448)
* Fix issue resulting in server side render `Transfer` failed. [#3686](https://github.com/ant-design/ant-design/issues/3686)
* Fix issue resulting in preview image not display when `Upload` in `picture-card` mode. [#3706](https://github.com/ant-design/ant-design/pull/3706) [@denzw](https://github.com/denzw)
* DatePicker
  * `onChange` will be triggered when `DatePicker` in `showTime` mode on blur now.
  * Add `monthCellContentRender` for `MonthPicker`.
  * `Rangepicker` can input time manually now.[#3718](https://github.com/ant-design/ant-design/issues/3718)
  * Add czech locale/translations.
* Badge
  * Improve number over 99 displaying when mouse hovering. [#3645](https://github.com/ant-design/ant-design/issues/3645)
  * Fix moving animation when using `Badge` alone. [#3709](https://github.com/ant-design/ant-design/issues/3709)
* Mention
  * Fix issue resulting in `Mention` will be covered by `Table`. [#3588](https://github.com/ant-design/ant-design/issues/3588)
  * Add `getSuggestionContainer` to allow specify container. [#3658](https://github.com/ant-design/ant-design/pull/3658)
* Tag
  * Deprecate `color`. [#3560](https://github.com/ant-design/ant-design/issues/3560)
  * Add `type`. [#3560](https://github.com/ant-design/ant-design/issues/3560)
  * Add `checkable`. [#3560](https://github.com/ant-design/ant-design/issues/3560)
* Radio.Group
  * Add `className`.
  * `null` or `undefined` `children` will be ignored.
* Select
  * Add `tokenSeparators` to support automatic tokenization. [#2071](https://github.com/ant-design/ant-design/issues/2071)
  * Add `onFocus` callback. [#3587](https://github.com/ant-design/ant-design/issues/3587)
  * Fix issue resulting in Select can't display correct selected item text in `combobox` mode. [#3401](https://github.com/ant-design/ant-design/issues/3401)

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
- Fix Mention should support `onSelect` `placeholder`. [#3236](https://github.com/ant-design/ant-design/issues/3236) [#3226](https://github.com/ant-design/ant-design/issues/3226)
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

> We suggest you upgrade to lastest version of `2.x`.

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
* Parameters of type `Date/GregorianCalendar` of functions such as `onChange` and `onPanelChange`, plus other callback functions had been changed to type moment. Please consult [APIs of gregorian-calendar](https://github.com/yiminghe/gregorian-calendar) and [APIs of moment](http://momentjs.com/docs/), and update your code accordingly. And you can consult this [commit](https://github.com/ant-design/ant-design/commit/4026221d451b246956983bb42140142d4a48b7d7) to see how to update.

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

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
