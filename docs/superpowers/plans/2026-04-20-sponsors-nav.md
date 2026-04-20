# Sponsors 导航条实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在导航条右侧新增 Sponsors 胶囊（圆形 logo + Tooltip），同步优化搜索框、版本选择框宽度和图标间距。

**Architecture:** 新建 `sponsors.ts` 静态数据文件，新建 `SponsorsNav.tsx` 独立组件，在 `Header/index.tsx` 中引入并插入 `menu` 数组，配套调整现有样式。

**Tech Stack:** React, antd（Tooltip），antd-style（createStyles + Design Token），TypeScript

---

## 文件结构

| 操作 | 文件                                       | 职责                                    |
| ---- | ------------------------------------------ | --------------------------------------- |
| 新建 | `.dumi/theme/slots/Header/sponsors.ts`     | 赞助商静态数据，未来新增/移除只改此文件 |
| 新建 | `.dumi/theme/slots/Header/SponsorsNav.tsx` | 胶囊 UI 组件，读取 sponsors 数据渲染    |
| 修改 | `.dumi/theme/slots/Header/index.tsx`       | 引入 SponsorsNav，插入 menu，调整样式   |

---

### Task 1: 创建 sponsors.ts 数据文件

**Files:**

- Create: `.dumi/theme/slots/Header/sponsors.ts`

- [ ] **Step 1: 创建文件**

```ts
// .dumi/theme/slots/Header/sponsors.ts

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

- [ ] **Step 2: 确认 TypeScript 无报错**

```bash
npx tsc --noEmit 2>&1 | grep sponsors || echo "no errors"
```

- [ ] **Step 3: Commit**

```bash
git add .dumi/theme/slots/Header/sponsors.ts
git commit -m "feat: add sponsors static data file"
```

---

### Task 2: 创建 SponsorsNav 组件

**Files:**

- Create: `.dumi/theme/slots/Header/SponsorsNav.tsx`

- [ ] **Step 1: 创建组件文件**

```tsx
// .dumi/theme/slots/Header/SponsorsNav.tsx
import React from 'react';
import { Tooltip } from 'antd';
import { createStyles } from 'antd-style';

import { sponsors } from './sponsors';

const useStyle = createStyles(({ cssVar, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 6px;
    border-radius: 20px;
    border: 1px solid ${cssVar.colorBorderSecondary};
    background: ${cssVar.colorFillQuaternary};
  `,
  avatar: css`
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: contain;
    background: ${cssVar.colorBgContainer};
  `,
}));

const SponsorsNav: React.FC = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.wrap}>
      {sponsors.map((sponsor) => (
        <Tooltip key={sponsor.name} title={sponsor.name} destroyOnHidden>
          <a href={sponsor.url} target="_blank" rel="noreferrer">
            <img src={sponsor.logo} alt={sponsor.name} className={styles.avatar} />
          </a>
        </Tooltip>
      ))}
    </div>
  );
};

export default SponsorsNav;
```

- [ ] **Step 2: 确认 TypeScript 无报错**

```bash
npx tsc --noEmit 2>&1 | grep SponsorsNav || echo "no errors"
```

- [ ] **Step 3: Commit**

```bash
git add .dumi/theme/slots/Header/SponsorsNav.tsx
git commit -m "feat: add SponsorsNav component"
```

---

### Task 3: 在 Header 中引入 SponsorsNav

**Files:**

- Modify: `.dumi/theme/slots/Header/index.tsx`

- [ ] **Step 1: 在文件顶部 import SponsorsNav**

在 `import SwitchBtn from './SwitchBtn';` 下方添加：

```tsx
import SponsorsNav from './SponsorsNav';
```

- [ ] **Step 2: 在 menu 数组中插入，紧靠 GitHub 图标之前**

找到当前 menu 数组末尾的 GitHub `<a>` 元素：

```tsx
    <a
      key="github"
      href="https://github.com/ant-design/ant-design"
      ...
    >
```

在其**前面**插入：

```tsx
    <SponsorsNav key="sponsors" />,
```

完整 menu 数组末尾变为：

```tsx
    <SponsorsNav key="sponsors" />,
    <a
      key="github"
      href="https://github.com/ant-design/ant-design"
      target="_blank"
      rel="noreferrer"
    >
      <Tooltip title="GitHub" destroyOnHidden>
        <Button type="text" icon={<GithubOutlined />} style={{ fontSize: 16 }} />
      </Tooltip>
    </a>,
```

- [ ] **Step 3: 启动开发服务器确认渲染正常**

```bash
npm run dev
```

打开 http://localhost:8000，确认导航条右侧出现三个圆形 logo 胶囊，hover 显示品牌名 Tooltip，点击跳转官网（新标签页）。

- [ ] **Step 4: Commit**

```bash
git add .dumi/theme/slots/Header/index.tsx
git commit -m "feat: add SponsorsNav to header menu"
```

---

### Task 4: 调整搜索框样式

**Files:**

- Modify: `.dumi/theme/slots/Header/index.tsx`（`useStyle` 中的 `header` css）

- [ ] **Step 1: 隐藏 cmd+K 快捷键提示**

在 `useStyle` 的 `header` css 中，找到 `.dumi-default-search-shortcut` 规则（当前约第 74 行），将整块替换为：

```ts
        '.dumi-default-search-shortcut': css`
          display: none;
        `,
```

- [ ] **Step 2: 添加搜索框 hover filled 背景**

在 `header` css 中，在 `.dumi-default-search-bar` 规则内（`> input` 块之后）添加：

```ts
        '&:hover': css`
          background: ${cssVar.colorFillSecondary};
          border-radius: ${cssVar.borderRadiusSM};
          transition: background ${cssVar.motionDurationSlow};
        `,
```

- [ ] **Step 3: 视觉确认**

刷新 http://localhost:8000：

- 搜索框右侧的 `⌘K` 提示消失
- hover 搜索框时背景变为浅灰填充色

- [ ] **Step 4: Commit**

```bash
git add .dumi/theme/slots/Header/index.tsx
git commit -m "feat: update search bar style, hide cmd+k, add hover fill"
```

---

### Task 5: 收窄版本选择框 + 收紧图标间距

**Files:**

- Modify: `.dumi/theme/slots/Header/index.tsx`（`useStyle` 中 `versionSelect` 和 `menuRow`）

- [ ] **Step 1: 收窄版本选择框**

找到 `versionSelect` 样式（当前约第 136 行）：

```ts
    versionSelect: css`
      width: 112px;
      min-width: 112px; // 这个宽度需要和 Empty 状态的宽度保持一致
      ...
    `,
```

将 `width` 和 `min-width` 改为 `90px`：

```ts
    versionSelect: css`
      width: 90px;
      min-width: 90px;
      .rc-virtual-list {
        .rc-virtual-list-holder {
          scrollbar-width: thin;
          scrollbar-gutter: stable;
        }
      }
    `,
```

- [ ] **Step 2: 收紧右侧图标间距**

找到 `menuRow` 样式（当前约第 99 行），将 `column-gap` 从 `${cssVar.paddingSM}` 改为 `4px`：

```ts
    menuRow: css`
      display: flex;
      align-items: center;
      margin: 0;
      column-gap: 4px;
      padding-inline-end: ${cssVar.padding};

      > * {
        flex: none;
        margin: 0;
      }

      .ant-btn {
        font-family: sans-serif;
      }
    `,
```

- [ ] **Step 3: 视觉确认**

刷新 http://localhost:8000，检查：

- 版本号选择框宽度收窄，版本号（如 `5.x.x`）仍可完整显示
- 右侧各图标间距更紧凑，整体协调

如果版本号被截断，调大 `min-width`（90px → 96px），直到完整显示为止。

- [ ] **Step 4: Commit**

```bash
git add .dumi/theme/slots/Header/index.tsx
git commit -m "feat: tighten header nav spacing and version select width"
```
