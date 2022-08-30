---
order: 8
title: 从 v4 到 v5
---

本文档将帮助你从 antd `4.x` 版本升级到 antd `5.x` 版本，如果你是 `3.x` 或者更老的版本，请先参考之前的[升级文档](/docs/react/migration-v4-cn)升级到 4.x。

## 升级准备

1. 请先升级到 4.x 的最新版本，按照控制台 warning 信息移除/修改相关的 API。

## 5.0 有哪些不兼容的变化

### 设计规范调整

- 基础圆角调整，由统一的 `2px` 改为四级圆角，分别为 `2px` `4px` `6px` `8px`，分别应用于不同场景，比如默认尺寸的 Button 的圆角调整为了 `6px`。
- 主色调整，由 <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #1890ff; vertical-align: text-bottom;" /> `#1890ff` 改为 <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #1677ff; vertical-align: text-bottom;" /> `#1677ff`。
- 整体阴影调整，由原本的三级阴影调整为两级，分别用于常驻页面的组件（如 Card）和交互反馈（如 Dropdown）。
- 部分组件内间距调整。
- 整体去线框化。

### 技术调整

- 弃用 less，采用 CSS-in-JS，更好地支持动态主题。底层使用 [@ant-design/cssinjs](https://github.com/ant-design/cssinjs) 作为解决方案。
  - 所有 less 文件全部废弃，less 变量不再支持透出。
  - 产物中不再包含 css 文件。由于 CSS-in-JS 支持按需引入，原本的 `antd/dist/antd.css` 也已经废弃，如果需要重置一些基本样式请引入 `antd/dist/reset.css`。
- 废弃 css variables 以及在此之上构筑的动态主题方案。
- 废弃 `lib` 产物，只提供 `dist` 和 `es` 产物。

### 兼容性调整

- 不再支持 IE 浏览器。

#### 组件 API 调整

- 组件弹框的 classname API 统一为 `popupClassName`，`dropdownClassName` 等类似 API 都会被替换。
  - AutoComplete 组件
  - Cascader 组件
  - Select 组件
  - TreeSelect 组件
  - TimePicker 组件
  - DatePicker 组件
- 组件弹框的受控可见 API 统一为 `open`，`visible` 等类似 API 都会被替换。
  - Drawer 组件 `visible` 变为 `open`。
  - Modal 组件 `visible` 变为 `open`。
  - Dropdown 组件 `visible` 变为 `open`。
  - Tooltip 组件 `visible` 变为 `open`。
  - Tag 组件 `visible` 已废弃。
  - Slider 组件 `tooltip` 相关 API 收敛到 `tooltip` 属性中。
  - Table 组件 `filterDropdownVisible` 变为 `filterDropdownOpen`。
- `getPopupContainer`: 所有的 `getPopupContainer` 都需要保证返回的是唯一的 div。React 18 concurrent 下会反复调用该方法。
- Dropdown
  - 魔改包裹元素样式移除，请使用 Space 组件。
  - Dropdown.Button 的 `prefixCls` 改为 `dropdown`。
- Upload List 结构变化。
- Notification
  - 静态方法不在允许在 `open` 中动态设置 `prefixCls` `maxCount` `top` `bottom` `getContainer`，Notification 静态方法现在将只有一个实例。如果需要不同配置，请使用 `useNotification`。
  - `close` 改名为 `destroy` 和 message 保持一致。
- Drawer
  - `style` & `className` 迁移至 Drawer Panel 中，原属性替换为 `rootClassName` 和 `rootStyle`。

#### 组件重构与废弃

- PageHeader 和 Comment 组件在 ant-design 中废弃，移至 [pro-components](https://github.com/ant-design/pro-components) 中维护，如果仍需使用可以从兼容包中引入。

## 开始升级

#### 安装兼容包

安装 `@ant-design/compatible` 通过指定 `v5-compatible-v4` tag 确认为 v5 兼容 v4 版本：

```bash
npm install --save @ant-design/compatible@v5-compatible-v4
```

#### 将已废弃的 `PageHeader` 和 `Comment` 组件通过 `@ant-design/compatible` 包引入

```diff
- import { PageHeader, Comment, Input, Button } from 'antd';
+ import { PageHeader, Comment } from '@ant-design/compatible';
+ import '@ant-design/compatible/assets/index.css';
+ import { Input, Button } from 'antd';

  const App: React.FC = () => (
    <div>
      <PageHeader />
      <Comment />
    </div>
  );

  export default App;
```

## 遇到问题

如果你在升级过程中遇到了问题，请到 [GitHub issues](http://new-issue.ant.design/) 进行反馈。我们会尽快响应和相应改进这篇文档。
