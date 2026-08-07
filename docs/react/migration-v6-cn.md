---
group:
  title: 迁移
  order: 2
order: 0
title: 从 v5 到 v6
---

本文档将帮助你从 antd `5.x` 版本升级到 antd `6.x` 版本。本次升级为一次技术升级，虽然组件 API 保持兼容，但在升级前您需要确保您的环境满足新的要求。

## 推荐使用 CLI 辅助升级 {#use-cli}

在手动核对下方清单前，推荐先使用 [Ant Design CLI](/docs/react/cli-cn) 辅助升级。CLI 可以基于项目代码检查废弃 API、组件用法与版本差异，避免只依赖文档逐项对照而遗漏。具体安装与使用方式请参考 [CLI 文档](/docs/react/cli-cn)。

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

⚠️ 下列 API 已被标记为**废弃（Deprecated）**。尽管这些属性当前仍可使用，但控制台会提示弃用警告，并将在 7.0 中被移除。为保持代码的可维护性和兼容性，**建议尽快迁移到对应的替代属性**。

> 以下废弃项自 v6.0.0 起生效，另有标注的除外。

- `Alert`
  - `closeText` 弃用，变为 `closable.closeIcon`。
  - `closeIcon` 弃用，变为 `closable.closeIcon`。
  - `message` 弃用，变为 `title`。
  - `onClose` 弃用，变为 `closable.onClose`。
  - `afterClose` 弃用，变为 `closable.afterClose`。

- `Anchor`
  - `Anchor children` 弃用，变为 `items`。

- `AutoComplete`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`。
  - `dropdownStyle` 弃用，变为 `styles.popup.root`。
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`。
  - `popupClassName` 弃用，变为 `classNames.popup.root`。
  - `dropdownRender` 弃用，变为 `popupRender`。
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`。
  - `dataSource` 弃用，变为 `options`。

- `Avatar`
  - `size="default"` 弃用，变为 `size="medium"`。（6.3.0）

- `Avatar.Group`
  - `maxCount` 弃用，变为 `max={{ count: number }}`。
  - `maxStyle` 弃用，变为 `max={{ style: CSSProperties }}`。
  - `maxPopoverPlacement` 弃用，变为 `max={{ popover: PopoverProps }}`。
  - `maxPopoverTrigger` 弃用，变为 `max={{ popover: PopoverProps }}`。

- `BackTop`
  - `BackTop` 弃用，变为 `FloatButton.BackTop`。

- `Badge`
  - `size="default"` 弃用，变为 `size="medium"`。（6.3.2）

- `Breadcrumb`
  - `routes` 弃用，变为 `items`。
  - `Breadcrumb.Item` 和 `Breadcrumb.Separator` 弃用，变为 `items`。
  - `breadcrumbName` 弃用，变为 `title`。
  - `items.children` 弃用，变为 `menu`。

- `Button.Group`
  - `Button.Group` 弃用，变为 `Space.Compact`。

- `Button`
  - `iconPosition` 弃用，变为 `iconPlacement`。

- `Calendar`
  - `dateFullCellRender` 弃用，变为 `fullCellRender`。
  - `dateCellRender` 弃用，变为 `cellRender`。
  - `monthFullCellRender` 弃用，变为 `fullCellRender`。
  - `monthCellRender` 弃用，变为 `cellRender`。

- `Card`
  - `headStyle` 弃用，变为 `styles.header`。
  - `bodyStyle` 弃用，变为 `styles.body`。
  - `bordered` 弃用，变为 `variant`。
  - `tab` 弃用，变为 `label`。

- `Carousel`
  - `dotPosition` 弃用，变为 `dotPlacement`。

- `Cascader`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`。
  - `dropdownStyle` 弃用，变为 `styles.popup.root`。
  - `dropdownRender` 弃用，变为 `popupRender`。
  - `dropdownMenuColumnStyle` 弃用，变为 `styles.popup.listItem`。
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`。
  - `onPopupVisibleChange` 弃用，变为 `onOpenChange`。
  - `bordered` 弃用，变为 `variant`。
  - `showArrow` 弃用，将变为默认行为，可通过设置 `suffixIcon` 为 `null` 隐藏。

- `Collapse`
  - `destroyInactivePanel` 弃用，变为 `destroyOnHidden`。
  - `expandIconPosition` 弃用，变为 `expandIconPlacement`。

- `Collapse.Panel`
  - `disabled` 弃用，变为 `collapsible="disabled"`。

- `ConfigProvider`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`。

- `DatePicker.RangePicker`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`。
  - `popupClassName` 弃用，变为 `classNames.popup.root`。
  - `popupStyle` 弃用，变为 `styles.popup.root`。
  - `bordered` 弃用，变为 `variant`。
  - `onSelect` 弃用，变为 `onCalendarChange`。

- `DatePicker`
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`。
  - `popupClassName` 弃用，变为 `classNames.popup.root`。
  - `popupStyle` 弃用，变为 `styles.popup.root`。
  - `bordered` 弃用，变为 `variant`。
  - `onSelect` 弃用，变为 `onCalendarChange`。

- `Descriptions`
  - `children` 弃用，变为 `items`。
  - `labelStyle` 弃用，变为 `styles.label`。
  - `contentStyle` 弃用，变为 `styles.content`。
  - `size="default"` 弃用，变为 `size="large"`。（6.3.2）
  - `size="middle"` 弃用，变为 `size="medium"`。（6.3.2）

- `Divider`
  - `type` 弃用，变为 `orientation`。
  - `orientationMargin` 弃用，变为 `styles.content.margin`。

- `Drawer`
  - `headerStyle` 弃用，变为 `styles.header`。
  - `bodyStyle` 弃用，变为 `styles.body`。
  - `footerStyle` 弃用，变为 `styles.footer`。
  - `contentWrapperStyle` 弃用，变为 `styles.wrapper`。
  - `maskStyle` 弃用，变为 `styles.mask`。
  - `drawerStyle` 弃用，变为 `styles.section`。
  - `classNames.content` 弃用，变为 `classNames.section`。
  - `styles.content` 弃用，变为 `styles.section`。
  - `maskClosable` 弃用，变为 `mask.closable`。（6.3.0）
  - `destroyInactivePanel` 弃用，变为 `destroyOnHidden`。
  - `width` 弃用，变为 `size`。
  - `height` 弃用，变为 `size`。

- `Dropdown.Button`
  - `Dropdown.Button` 弃用，变为 `Space.Compact + Dropdown + Button`。

- `Dropdown`
  - `dropdownRender` 弃用，变为 `popupRender`。
  - `destroyPopupOnHide` 弃用，变为 `destroyOnHidden`。
  - `overlayClassName` 弃用，变为 `classNames.root`。
  - `overlayStyle` 弃用，变为 `styles.root`。
  - `placement: xxxCenter` 弃用，变为 `placement: xxx`。

- `Empty`
  - `imageStyle` 弃用，变为 `styles.image`。

- `FloatButton`
  - `description` 弃用，变为 `content`。

- `Image`
  - `wrapperStyle` 弃用，变为 `styles.root`。
  - `visible` 弃用，变为 `open`。
  - `onVisibleChange` 弃用，变为 `onOpenChange`。
  - `maskClassName` 弃用，变为 `classNames.cover`。
  - `rootClassName` 弃用，变为 `classNames.root`。
  - `toolbarRender` 弃用，变为 `actionsRender`。

- `Input.Group`
  - `Input.Group` 弃用，变为 `Space.Compact`。

- `Input`
  - `bordered` 弃用，变为 `variant`。

- `InputNumber`
  - `bordered` 弃用，变为 `variant`。
  - `addonAfter` 弃用，变为 `Space.Compact`。
  - `addonBefore` 弃用，变为 `Space.Compact`。

- `Mentions`
  - `Mentions.Option` 弃用，变为 `options`。

- `Menu`
  - `children` 弃用，变为 `items`。

- `Modal`
  - `bodyStyle` 弃用，变为 `styles.body`。
  - `maskStyle` 弃用，变为 `styles.mask`。
  - `destroyOnClose` 弃用，变为 `destroyOnHidden`。
  - `maskClosable` 弃用，变为 `mask.closable`。（6.3.0）
  - `focusTriggerAfterClose` 弃用，变为 `focusable.focusTriggerAfterClose`。（6.2.0）

- `Notification`
  - `btn` 弃用，变为 `actions`。
  - `message` 弃用，变为 `title`。

- `Progress`
  - `strokeWidth` 弃用，变为 `size`。
  - `width` 弃用，变为 `size`。
  - `trailColor` 弃用，变为 `railColor`。
  - `gapPosition` 弃用，变为 `gapPlacement`。

- `Select`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`。
  - `dropdownStyle` 弃用，变为 `styles.popup.root`。
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`。
  - `popupClassName` 弃用，变为 `classNames.popup.root`。
  - `dropdownRender` 弃用，变为 `popupRender`。
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`。
  - `bordered` 弃用，变为 `variant`。
  - `showArrow` 弃用，将变为默认行为，可通过设置 `suffixIcon` 为 `null` 隐藏。

- `Slider`
  - `tooltipPrefixCls` 弃用，变为 `tooltip.prefixCls`。
  - `getTooltipPopupContainer` 弃用，变为 `tooltip.getPopupContainer`。
  - `tipFormatter` 弃用，变为 `tooltip.formatter`。
  - `tooltipPlacement` 弃用，变为 `tooltip.placement`。
  - `tooltipVisible` 弃用，变为 `tooltip.open`。
  - `onAfterChange` 弃用，变为 `onChangeComplete`。
  - `handleStyle` 弃用，变为 `styles.handle`。
  - `trackStyle` 弃用，变为 `styles.track`。
  - `railStyle` 弃用，变为 `styles.rail`。

- `Space.Compact`
  - `direction` 弃用，变为 `orientation`。

- `Space`
  - `direction` 弃用，变为 `orientation`。
  - `split` 弃用，变为 `separator`。

- `Spin`
  - `tip` 弃用，变为 `description`。（6.3.0）
  - `wrapperClassName` 弃用，变为 `classNames.root`。
  - `size="default"` 弃用，变为 `size="medium"`。（6.3.2）

- `Splitter`
  - `layout` 弃用，变为 `orientation`。

- `Countdown`
  - `<Statistic.Countdown />` 弃用，变为 `<Statistic.Timer type="countdown" />`。

- `Statistic`
  - `valueStyle` 弃用，变为 `styles.content`。

- `Steps`
  - `labelPlacement` 弃用，变为 `titlePlacement`。
  - `progressDot` 弃用，变为 `type="dot"`。
  - `direction` 弃用，变为 `orientation`。
  - `items.description` 弃用，变为 `items.content`。
  - `size="default"` 弃用，变为 `size="medium"`。（6.3.2）

- `Table`
  - `pagination.position` 弃用，变为 `pagination.placement`。
  - `onSelectInvert` 弃用，变为 `onChange`。
  - `filterDropdownOpen` 弃用，变为 `filterDropdownProps.open`。
  - `onFilterDropdownOpenChange` 弃用，变为 `filterDropdownProps.onOpenChange`。
  - `filterCheckall` 弃用，变为 `locale.filterCheckAll`。
  - `onSelectMultiple` 弃用，变为 `onChange`。
  - `onSelectAll` 弃用，变为 `onChange`。
  - `onSelectNone` 弃用，变为 `onChange`。

- `Tabs`
  - `popupClassName` 弃用，变为 `classNames.popup`。
  - `tabPosition` 弃用，变为 `tabPlacement`。
  - `destroyInactiveTabPane` 弃用，变为 `destroyOnHidden`。
  - `indicatorSize` 弃用，变为 `indicator={{ size: ... }}`。
  - `Tabs.TabPane` 弃用，变为 `items`。

- `Tag`
  - `bordered={false}` 弃用，变为 `variant="filled"`。
  - `color="xxx-inverse"` 弃用，变为 `variant="solid"`。

- `TimePicker`
  - `addon` 弃用，变为 `renderExtraFooter`。
  - `popupClassName` 弃用，变为 `classNames.popup`。
  - `popupStyle` 弃用，变为 `styles.popup`。

- `Timeline`
  - `Timeline.Item` 弃用，变为 `items`。
  - `Timeline.Item.position` 弃用，变为 `placement`，值 `left` / `right` 需改为 `start` / `end`。
  - `Timeline.Item.label` 弃用，变为 `title`。
  - `Timeline.Item.children` 弃用，变为 `content`。
  - `Timeline.Item.dot` 弃用，变为 `icon`。
  - `pending` 弃用，变为 `items`。
  - `pendingDot` 弃用，变为 `items`。
  - `mode=left|right` 弃用，变为 `mode=start|end`。

- `Tooltip`
  - `overlayStyle` 弃用，变为 `styles.root`。
  - `overlayInnerStyle` 弃用，变为 `styles.container`。
  - `overlayClassName` 弃用，变为 `classNames.root`。
  - `destroyTooltipOnHide` 弃用，变为 `destroyOnHidden`。

- `Transfer`
  - `listStyle` 弃用，变为 `styles.section`。
  - `operationStyle` 弃用，变为 `styles.actions`。
  - `operations` 弃用，变为 `actions`。

- `TreeSelect`
  - `dropdownMatchSelectWidth` 弃用，变为 `popupMatchSelectWidth`。
  - `dropdownStyle` 弃用，变为 `styles.popup.root`。
  - `dropdownClassName` 弃用，变为 `classNames.popup.root`。
  - `popupClassName` 弃用，变为 `classNames.popup.root`。
  - `dropdownRender` 弃用，变为 `popupRender`。
  - `onDropdownVisibleChange` 弃用，变为 `onOpenChange`。
  - `bordered` 弃用，变为 `variant`。
  - `showArrow` 弃用，将变为默认行为，可通过设置 `suffixIcon` 为 `null` 隐藏。

### 弹层类组件（Modal、Drawer 等）

- 新增 `mask` 蒙层功能，并支持模糊效果。
- v6.0.0 ~ v6.2.x 默认开启模糊，v6.3.0 起**改为默认关闭**。如需开启模糊：

```tsx
import { ConfigProvider, Drawer, Modal } from 'antd';

export default () => (
  <ConfigProvider
    modal={{
      mask: {
        blur: true,
      },
    }}
    drawer={{
      mask: {
        blur: true,
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

### `size` 枚举值统一（6.3.0 ~ 6.3.2）{#size-enum-unify}

v6 逐步统一了组件 `size` 枚举值为 `'large' | 'medium' | 'small'`。使用旧值时控制台会出现废弃警告，旧值将在 v7 中移除。

- `Avatar`、`Badge`、`Card`、`Progress`、`Steps`、`Switch`、`Spin` 的 `size` 使用 `medium` 替代 `default`。
- `Descriptions` 的 `size` 使用 `medium` 替代 `middle`，`large` 替代 `default`。
- `Table`、`Divider` 的 `size` 使用 `medium` 替代 `middle`。

```diff
- <Switch size="default" />
+ <Switch size="medium" />

- <Descriptions size="default" />
+ <Descriptions size="large" />

- <Descriptions size="middle" />
+ <Descriptions size="medium" />

- <Table size="middle" />
+ <Table size="medium" />
```

### Splitter `collapsibleIcon` 废弃（6.4.0）{#splitter-collapsible-icon}

- `Splitter` 的 `collapsibleIcon` 弃用，变为 `collapsible.icon`。

### 浏览器支持调整

- 默认开启 **CSS variables**，仅支持现代浏览器。
- IE 浏览器不再支持，部分旧版国产浏览器可能存在兼容性问题，请在应用发布前确认目标浏览器的支持情况。

### 原子级通过别名安装 v6

- 如果你需要控制升级的影响范围，可以尝试[原子级迁移](https://github.com/ant-design/ant-design/discussions/55957)方案。请注意，这并非我们推荐的升级路径。

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
