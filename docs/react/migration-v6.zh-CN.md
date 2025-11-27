---
group:
  title: 迁移
  order: 2
order: 0
title: 从 v5 到 v6
---

本文档将帮助你从 antd `5.x` 版本升级到 antd `6.x` 版本。本次升级为一次技术升级，虽然组件 API 保持兼容，但在升级前您需要确保您的环境满足新的要求。

## 升级准备

1. 请先升级到 **v5 最新版本**，按照控制台 warning 信息处理已废弃 API。
2. 确认项目可以运行在 **React 18 及以上**版本，v6 不再支持 React 17 及以下。
3. v6 仅支持现代浏览器，并默认使用 **CSS variables**，因此不再支持 IE。

```bash
npm install --save antd@6
# 或
yarn add antd@6
# 或
pnpm add antd@6
```

## v6 有哪些不兼容的变化

### React 版本支持调整

- `antd@6` 要求 React 版本 >= 18，不再支持 React 17 及以下。
- 不再需要 `@ant-design/v5-patch-for-react-19` 来兼容 React 19，如果使用可以移除该依赖。

```diff
- import '@ant-design/v5-patch-for-react-19';
```

### @ant-design/icons 版本升级

- `antd@6` 要求 `@ant-design/icons` 版本 >= 6.0.0。
- ⚠️ **重要**：`@ant-design/icons@6` 与 `antd@5` 不兼容，请确保同时升级两个包。
- 如果你的项目显式依赖 `@ant-design/icons`，需要同步升级到 v6 版本。

```bash
npm install --save @ant-design/icons@6
# 或
yarn add @ant-design/icons@6
# 或
pnpm add @ant-design/icons@6
```

如果你在升级过程中遇到构建错误，请检查 `@ant-design/icons` 版本是否与 `antd` 版本匹配。

### DOM 调整

- v6 对大量组件的 DOM 结构进行了升级和优化，以提升可维护性和一致性。
- 对于大多数正常使用 antd 样式的项目，这不会产生影响。
- ⚠️ 如果你的项目中存在针对组件内部 DOM 节点的自定义样式（例如依赖特定选择器或层级结构），升级后可能需要手动检查并调整样式。

### API 调整

- `Alert`
  - `closeText` 弃用，变为 `closable.closeIcon`
  - `message` 弃用，变为 `title`

- `Anchor`
  - `Anchor children` 弃用，变为 `items`

- `AutoComplete`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`
  - `dropdownStyle` 弃用，变为 `styles.popup.root`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`
  - `popupClassName` 弃用，变为 `classNames.popup.root`
  - `dropdownRender` 弃用，变为 `popupRender`
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`
  - `dataSource` 弃用，变为 `options`

- `Avatar.Group`
  - `maxCount` 弃用，变为 `max={{ count: number }}`
  - `maxStyle` 弃用，变为 `max={{ style: CSSProperties }}`
  - `maxPopoverPlacement` 弃用，变为 `max={{ popover: PopoverProps }}`
  - `maxPopoverTrigger` 弃用，变为 `max={{ popover: PopoverProps }}`

- `BackTop`
  - `BackTop` 弃用，变为 `FloatButton.BackTop`

- `Breadcrumb`
  - `routes` 弃用，变为 `items`
  - `Breadcrumb.Item` and `Breadcrumb.Separator` 弃用，变为 `items`

- `Button.Group`
  - `Button.Group` 弃用，变为 `Space.Compact`

- `Button`
  - `iconPosition` 弃用，变为 `iconPlacement`

- `Calendar`
  - `dateFullCellRender` 弃用，变为 `fullCellRender`
  - `dateCellRender` 弃用，变为 `cellRender`
  - `monthFullCellRender` 弃用，变为 `fullCellRender`
  - `monthCellRender` 弃用，变为 `cellRender`

- `Card`
  - `headStyle` 弃用，变为 `styles.header`
  - `bodyStyle` 弃用，变为 `styles.body`
  - `bordered` 弃用，变为 `variant`

- `Carousel`
  - `dotPosition` 弃用，变为 `dotPlacement`

- `Cascader`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`
  - `dropdownStyle` 弃用，变为 `styles.popup.root`
  - `dropdownRender` 弃用，变为 `popupRender`
  - `dropdownMenuColumnStyle` 弃用，变为 `popupMenuColumnStyle`
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`
  - `onPopupVisibleChange` 弃用，变为 `onOpenChange`
  - `bordered` 弃用，变为 `variant`

- `Collapse`
  - `destroyInactivePanel` 弃用，变为 `destroyOnHidden`
  - `expandIconPosition` 弃用，变为 `expandIconPlacement`

- `Collapse.Panel`
  - `disabled` 弃用，变为 `collapsible="disabled"`

- `ConfigProvider`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`

- `DatePicker.RangePicker`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`
  - `popupClassName` 弃用，变为 `classNames.popup.root`
  - `popupStyle` 弃用，变为 `styles.popup.root`
  - `bordered` 弃用，变为 `variant`
  - `onSelect` 弃用，变为 `onCalendarChange`

- `DatePicker`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`
  - `popupClassName` 弃用，变为 `classNames.popup.root`
  - `popupStyle` 弃用，变为 `styles.popup.root`
  - `bordered` 弃用，变为 `variant`
  - `onSelect` 弃用，变为 `onCalendarChange`

- `Descriptions`
  - `labelStyle` 弃用，变为 `styles.label`
  - `contentStyle` 弃用，变为 `styles.content`

- `Divider`
  - `type` 弃用，变为 `orientation`
  - `orientationMargin` 弃用，变为 `styles.content.margin`

- `Drawer`
  - `headerStyle` 弃用，变为 `styles.header`
  - `bodyStyle` 弃用，变为 `styles.body`
  - `footerStyle` 弃用，变为 `styles.footer`
  - `contentWrapperStyle` 弃用，变为 `styles.wrapper`
  - `maskStyle` 弃用，变为 `styles.mask`
  - `drawerStyle` 弃用，变为 `styles.section`
  - `destroyInactivePanel` 弃用，变为 `destroyOnHidden`
  - `width` 弃用，变为 `size`
  - `height` 弃用，变为 `size`

- `Dropdown.Button`
  - `Dropdown.Button` 弃用，变为 `Space.Compact + Dropdown + Button`

- `Dropdown`
  - `dropdownRender` 弃用，变为 `popupRender`
  - `destroyPopupOnHide` 弃用，变为 `destroyOnHidden`
  - `overlayClassName` 弃用，变为 `classNames.root`
  - `overlayStyle` 弃用，变为 `styles.root`
  - `placement: *xxx*Center` 弃用，变为 `placement: _xxx_`

- `Empty`
  - `imageStyle` 弃用，变为 `styles.image`

- `FloatButton`
  - `description` 弃用，变为 `content`

- `Image`
  - `wrapperStyle` 弃用，变为 `styles.root`
  - `visible` 弃用，变为 `open`
  - `onVisibleChange` 弃用，变为 `onOpenChange`
  - `maskClassName` 弃用，变为 `classNames.cover`
  - `rootClassName` 弃用，变为 `classNames.root`
  - `toolbarRender` 弃用，变为 `actionsRender`

- `Input.Group`
  - `Input.Group` 弃用，变为 `Space.Compact`

- `InputNumber`
  - `bordered` 弃用，变为 `variant`
  - `addonAfter` 弃用，变为 `Space.Compact`
  - `addonBefore` 弃用，变为 `Space.Compact`

- `Mentions`
  - `Mentions.Option` 弃用，变为 `options`

- `Menu`
  - `children` 弃用，变为 `items`

- `Modal`
  - `bodyStyle` 弃用，变为 `styles.body`
  - `maskStyle` 弃用，变为 `styles.mask`
  - `destroyOnClose` 弃用，变为 `destroyOnHidden`

- `Notification`
  - `btn` 弃用，变为 `actions`
  - `message` 弃用，变为 `title`

- `Progress`
  - `strokeWidth` 弃用，变为 `size`
  - `width` 弃用，变为 `size`
  - `trailColor` 弃用，变为 `railColor`
  - `gapPosition` 弃用，变为 `gapPlacement`

- `Select`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`
  - `dropdownStyle` 弃用，变为 `styles.popup.root`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`
  - `popupClassName` 弃用，变为 `classNames.popup.root`
  - `dropdownRender` 弃用，变为 `popupRender`
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`
  - `bordered` 弃用，变为 `variant`

- `Slider`
  - `tooltipPrefixCls` 弃用，变为 `tooltip.prefixCls`
  - `getTooltipPopupContainer` 弃用，变为 `tooltip.getPopupContainer`
  - `tipFormatter` 弃用，变为 `tooltip.formatter`
  - `tooltipPlacement` 弃用，变为 `tooltip.placement`
  - `tooltipVisible` 弃用，变为 `tooltip.open`

- `Space.Compact`
  - `direction` 弃用，变为 `orientation`

- `Space`
  - `direction` 弃用，变为 `orientation`
  - `split` 弃用，变为 `separator`

- `Splitter`
  - `layout` 弃用，变为 `orientation`

- `Countdown`
  - `<Statistic.Countdown />` 弃用，变为 `<Statistic.Timer type="countdown" />`

- `Statistic`
  - `valueStyle` 弃用，变为 `styles.content`

- `Steps`
  - `labelPlacement` 弃用，变为 `titlePlacement`
  - `progressDot` 弃用，变为 `type="dot"`
  - `direction` 弃用，变为 `orientation`
  - `items.description` 弃用，变为 `items.content`

- `Table`
  - `pagination.position` 弃用，变为 `pagination.placement`
  - `onSelectInvert` 弃用，变为 `onChange`
  - `filterDropdownOpen` 弃用，变为 `filterDropdownProps.open`
  - `onFilterDropdownOpenChange` 弃用，变为 `filterDropdownProps.onOpenChange`
  - `filterCheckall` 弃用，变为 `locale.filterCheckAll`

- `Tabs`
  - `popupClassName` 弃用，变为 `classNames.popup`
  - `tabPosition` 弃用，变为 `tabPlacement`
  - `destroyInactiveTabPane` 弃用，变为 `destroyOnHidden`
  - `Tabs.TabPane` 弃用，变为 `items`

- `Tag`
  - `bordered={false}` 弃用，变为 `variant="filled"`
  - `color="xxx-inverse"` 弃用，变为 `variant="solid"`

- `TimePicker`
  - `addon` 弃用，变为 `renderExtraFooter`

- `Timeline`
  - `Timeline.Item` 弃用，变为 `items`
  - `pending` 弃用，变为 `items`
  - `pendingDot` 弃用，变为 `items`
  - `mode=left|right` 弃用，变为 `mode=start|end`

- `Tooltip`
  - `overlayStyle` 弃用，变为 `styles.root`
  - `overlayInnerStyle` 弃用，变为 `styles.container`
  - `overlayClassName` 弃用，变为 `classNames.root`
  - `destroyTooltipOnHide` 弃用，变为 `destroyOnHidden`

- `Transfer`
  - `listStyle` 弃用，变为 `styles.section`
  - `operationStyle` 弃用，变为 `styles.actions`
  - `operations` 弃用，变为 `actions`

- `TreeSelect`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`
  - `dropdownStyle` 弃用，变为 `styles.popup.root`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`
  - `popupClassName` 弃用，变为 `classNames.popup.root`
  - `dropdownRender` 弃用，变为 `popupRender`
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`
  - `bordered` 弃用，变为 `variant`

### 弹层类组件（Modal、Drawer 等）

- 新增 `mask` 蒙层功能，并支持模糊效果。
- 默认开启，可通过以下方式关闭模糊：

```tsx
import { ConfigProvider, Drawer, Modal } from 'antd';

export default () => (
  <ConfigProvider
    modal={{
      mask: {
        blur: false,
      },
    }}
    drawer={{
      mask: {
        blur: false,
      },
    }}
  >
    <Modal />
    <Drawer />
  </ConfigProvider>
);
```

### Tag margin 调整

v6 移除了 `Tag` 组件末尾的默认外边距（以前 Tag 末尾会额外留出一段 `margin-inline-end`）。如果你的布局或自定义样式依赖这一行为，请使用 `ConfigProvider` 的 `tag.styles` 进行补充：

```tsx
import { ConfigProvider, Tag } from 'antd';

export default () => (
  <ConfigProvider
    tag={{
      styles: {
        root: {
          marginInlineEnd: 8,
        },
      },
    }}
  >
    <Tag>Tag A</Tag>
    <Tag>Tag B</Tag>
    <Tag>Tag C</Tag>
  </ConfigProvider>
);
```

### Form `onFinish` 取值不再包含 Form.List 全部数据

v5 版本中，Form.List 会被认为是一个 Field，以至于提交时会包含 Form.List 下的所有数据结构即便其子元素的 Form.Item 没有注册过。在 v6 中，Form.List 不再包含未注册的子项数据。因而你不再需要通过 `getFieldsValue({ strict: true })` 来过滤未注册字段。

```diff
    const onFinish = (values) => {
--    const realValues = getFieldsValue({ strict: true });
++    const realValues = values;

      // ...
    }

    <Form onFinish={onFinish} />
```

### 浏览器支持调整

- 默认开启 **CSS variables**，仅支持现代浏览器。
- IE 浏览器不再支持，部分旧版国产浏览器可能存在兼容性问题，请在应用发布前确认目标浏览器的支持情况。

## 升级影响排查 Checklist

为了确保升级到 v6 后项目正常运行，请参考以下检查清单逐项确认：

- **React 版本**：确认项目使用的 React 版本 >= 18，并且不再引入 `@ant-design/v5-patch-for-react-19`。
- **@ant-design/icons 版本**：确认 `@ant-design/icons` 版本已升级到 >= 6.0.0，与 `antd@6` 匹配。
- **浏览器兼容性**：确认目标用户浏览器均为现代浏览器，且支持 CSS variables。
- **自定义样式检查**：如果有针对组件内部 DOM 节点的 CSS 定制，验证在 v6 下是否依然生效。
- **弹层蒙层配置**：Modal、Drawer 等弹层是否需要关闭 `mask` 的模糊效果，如不需要可保持默认。
- **构建工具配置**：确认升级后构建无报错，CSS 变量和 CSS-in-JS 能正常工作。
- **控制台 warning**：运行应用并观察控制台，处理所有 `legacy API` 的提示。

## 遇到问题

如果您在升级过程中遇到问题，请到 [GitHub issues](https://new-issue.ant.design/) 进行反馈。我们会尽快响应并在文档中完善相关说明。
