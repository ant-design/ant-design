# Sponsors 导航条入口设计文档

**日期：** 2026-04-20  
**状态：** 已批准

## 背景

Ant Design 通过 OpenCollective 接受企业赞助，当前已有独立赞助页面（`/docs/react/sponsor`），但站点首页和导航条缺乏对赞助商的可见曝光。本设计在导航条中增加 Sponsors 胶囊，直接展示赞助商 logo，提升赞助商曝光度。

## 范围

- 仅修改导航条（Header），不在首页新增 Sponsors 区块
- 不引入远程数据请求，赞助商数据静态维护

## 新增文件

### `.dumi/theme/slots/Header/sponsors.ts`

存放赞助商静态数据，未来新增/移除赞助商只改此文件。

```ts
export interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

export const sponsors: Sponsor[] = [
  {
    name: 'TRACTIAN',
    logo: 'https://images.opencollective.com/tractian/0235da9/logo/256.png',
    url: 'https://tractian.com',
  },
  {
    name: 'LobeHub',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@1.79.0/icons/lobehub-color.svg',
    url: 'https://lobehub.com',
  },
  {
    name: 'YouMind',
    logo: 'https://marketing-assets.youmind.com/logo-512.png',
    url: 'https://youmind.com',
  },
];
```

## 修改文件

### `.dumi/theme/slots/Header/index.tsx`

在 `menu` 数组中，紧靠 GitHub 图标**之前**插入 Sponsors 胶囊元素。

**胶囊容器样式：**

- `display: flex`，`align-items: center`，`gap: 4px`
- `padding: 3px 6px`，`border-radius: 20px`
- `border: 1px solid token.colorBorderSecondary`
- `background: token.colorFillQuaternary`（浅色背景，深色模式自适应）

**每个 Sponsor 元素：**

- `<Tooltip title={name}>`包裹 `<a href={url} target="_blank" rel="noreferrer">`
- `<img>` 圆形头像：`width: 20px`，`height: 20px`，`border-radius: 50%`，`object-fit: contain`
- `background: token.colorBgContainer`（保证透明 logo 在深色模式下可见）

**响应式行为：**

- 遵循现有 `windowWidth < RESPONSIVE_XS`（1120px）时 `menu` 的收起逻辑，不单独处理
- 移动端通过 Popover 菜单展示时，Sponsors 胶囊也包含在内

## 样式

使用 `createStyles` 添加到现有 `useStyle` 中，利用 Design Token，支持深色模式和 RTL。

```ts
sponsorsWrap: css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 20px;
  border: 1px solid ${cssVar.colorBorderSecondary};
  background: ${cssVar.colorFillQuaternary};
`,
sponsorAvatar: css`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: contain;
  background: ${cssVar.colorBgContainer};
`,
```

## 导航条配套 UI 调整

为配合 Sponsors 胶囊的加入，同步优化导航条横向空间与视觉和谐性。

### 1. Version 选择框宽度

- 当前宽度 `112px`，适当收窄（待测量具体版本号长度后定，预计 `90px` 左右）

### 2. 搜索框

- **去掉 cmd+k 快捷键提示**：完全隐藏 `.dumi-default-search-shortcut` 元素（`display: none`）
- **Hover 时变为 filled 风格**：搜索框整体 hover 时背景切换为 `token.colorFillSecondary`，过渡动画 `transition: background motionDurationSlow`

### 3. 右上角图标间距

- 当前 `menuRow` 的 `column-gap` 为 `paddingSM`，整体偏松
- 收紧为 `4px`，各图标按钮保持 `padding` 不变，整体更紧凑

## 不在范围内

- 首页 Sponsors 区块
- 赞助商数据动态化（远程接口）
- 点击跳转到 `/docs/react/sponsor` 页面（每个 logo 直接跳各自官网）
