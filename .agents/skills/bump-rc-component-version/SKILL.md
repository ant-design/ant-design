---
name: antd-bump-rc-component-version
description: 升级 ant-design 中 @rc-component/* 依赖的版本。在用户提到升级 rc-component、更新 rc 依赖版本、bump rc-component、或处理 rc-component 版本冲突时使用。覆盖从判断版本类型到提交 PR 的完整流程。
---

# Ant Design 升级 rc-component 版本规范

## 目标

一、帮助维护者正确、安全地升级 `@rc-component/*` 依赖版本。

二、区分 patch 自动更新和 minor/major 手动升级的不同处理方式。

三、确保版本升级后组件功能正常、测试通过、无 breaking change。

## 触发场景

当用户提到以下场景时使用：

- 升级 rc-component 版本
- bump rc-component
- 更新 rc 依赖
- rc-component 版本冲突
- 升级 @rc-component/*

## 核心原则

### 一、理解版本策略

ant-design 对 `@rc-component/*` 使用两种版本范围：

| 符号 | 含义 | 示例 | 自动更新范围 |
|---|---|---|---|
| `~` (tilde) | 允许 patch 更新 | `~1.14.0` | `1.14.x` |
| `^` (caret) | 允许 minor 更新 | `^3.9.0` | `3.x.0` |

**大多数 rc-component 使用 `~`（tilde），意味着 patch 版本会在 `npm install` 时自动更新。**

### 二、Patch 更新通常无需手动处理

对于使用 `~` 的依赖，当 `@rc-component/*` 发布 patch 版本时：

```bash
# 清理并重新安装即可获取最新 patch
git clean -fdx && npm install
```

不需要手动修改 `package.json` 中的版本号。

### 三、Minor/Major 升级需要手动处理

当需要升级到新的 minor 或 major 版本时：

1. 必须手动更新 `package.json`
2. 必须验证兼容性
3. 必须通过所有测试
4. 必须创建单独的 PR

## 完整流程

### 场景一：Patch 版本自动更新

这是最常见的场景。ant-design 的 `~` 版本范围会自动获取 patch 更新。

**步骤：**

```bash
# 1. 清理构建产物和 node_modules
git clean -fdx

# 2. 重新安装依赖（会自动获取最新 patch）
npm install

# 3. 检查 package-lock.json 中实际安装的版本
npm ls @rc-component/table  # 替换为具体包名

# 4. 运行测试确认无问题
npm test
```

**不需要提交 PR**，因为 `package-lock.json` 不在版本控制中（已在 `.gitignore` 中）。

### 场景二：手动升级 Minor/Major 版本

当 `@rc-component/*` 发布了新的 minor 或 major 版本，且需要升级时使用此流程。

#### 1. 确认升级必要性

- 检查 `@rc-component/*` 的 changelog 或 release notes
- 确认新版本包含需要的修复或功能
- 评估 breaking change 风险

```bash
# 查看某个 rc-component 的所有可用版本
npm view @rc-component/table versions --json

# 查看最新版本信息
npm view @rc-component/table
```

#### 2. 检查 rc-component 的变更

查看目标 rc-component 仓库的变更：

```bash
# 查看 changelog
gh api repos/react-component/table/releases --jq '.[].tag_name'

# 或查看 package.json 中的变更
npm view @rc-component/table@latest --json
```

#### 3. 更新 package.json

在 `package.json` 中找到对应的 `@rc-component/*` 依赖并更新版本号：

```json
{
  "dependencies": {
    "@rc-component/table": "~1.9.1"
  }
}
```

**版本号选择原则：**

- 如果不确定，使用 `~` 加最新的 minor 版本，例如 `~1.10.0`
- 如果 rc-component 有重大变更，评估是否需要调整 antd 侧的代码
- 保持与同类型 rc-component 的版本策略一致

#### 4. 重新安装依赖

```bash
rm -rf node_modules
npm install
```

#### 5. 运行测试

```bash
# 运行完整测试
npm test

# 如果改动集中在特定组件，可先运行相关测试
npm test -- components/table
```

#### 6. 检查 TypeScript 类型

```bash
npm run tsc
```

如果 rc-component 的类型定义有变化，可能需要调整 antd 侧的类型定义。

#### 7. 检查组件行为

重点关注：

- 公开 API 是否仍然兼容
- 组件行为是否有 breaking change
- 样式是否正常
- Demo 是否正常工作

#### 8. 提交 PR

- 分支命名：`deps/rc-component-name-version`（例如 `deps/rc-table-1.10.0`）
- PR 标题：`deps: bump @rc-component/table to ~1.10.0`
- PR 正文说明升级原因和影响范围

## @rc-component/* 依赖完整列表

以下是 ant-design `package.json` 中所有的 `@rc-component/*` 依赖：

| 包名 | 版本范围 | 更新策略 | 对应组件 |
|---|---|---|---|
| `@rc-component/cascader` | `~1.14.0` | patch | Cascader |
| `@rc-component/checkbox` | `~2.0.0` | patch | Checkbox |
| `@rc-component/collapse` | `~1.2.0` | patch | Collapse |
| `@rc-component/color-picker` | `~3.1.1` | patch | ColorPicker |
| `@rc-component/dialog` | `~1.8.4` | patch | Modal, Drawer |
| `@rc-component/drawer` | `~1.4.2` | patch | Drawer |
| `@rc-component/dropdown` | `~1.0.2` | patch | Dropdown |
| `@rc-component/form` | `~1.8.0` | patch | Form |
| `@rc-component/image` | `~1.8.0` | patch | Image |
| `@rc-component/input` | `~1.1.2` | patch | Input |
| `@rc-component/input-number` | `~1.6.2` | patch | InputNumber |
| `@rc-component/mentions` | `~1.6.0` | patch | Mentions |
| `@rc-component/menu` | `~1.2.0` | patch | Menu |
| `@rc-component/motion` | `^1.3.2` | minor | 动画系统 |
| `@rc-component/mutate-observer` | `^2.0.1` | minor | ResizeObserver |
| `@rc-component/notification` | `~1.2.0` | patch | Notification |
| `@rc-component/pagination` | `~1.2.0` | patch | Pagination |
| `@rc-component/picker` | `~1.9.1` | patch | DatePicker, TimePicker |
| `@rc-component/progress` | `~1.0.2` | patch | Progress |
| `@rc-component/qrcode` | `~1.1.1` | patch | QRCode |
| `@rc-component/rate` | `~1.0.1` | patch | Rate |
| `@rc-component/resize-observer` | `^1.1.2` | minor | ResizeObserver |
| `@rc-component/segmented` | `~1.3.0` | patch | Segmented |
| `@rc-component/select` | `~1.6.15` | patch | Select, TreeSelect, Mentions |
| `@rc-component/slider` | `~1.0.1` | patch | Slider |
| `@rc-component/steps` | `~1.2.2` | patch | Steps |
| `@rc-component/switch` | `~1.0.3` | patch | Switch |
| `@rc-component/table` | `~1.9.1` | patch | Table |
| `@rc-component/tabs` | `~1.7.0` | patch | Tabs |
| `@rc-component/textarea` | `~1.1.2` | patch | Input.TextArea |
| `@rc-component/tooltip` | `~1.4.0` | patch | Tooltip |
| `@rc-component/tour` | `~2.3.0` | patch | Tour |
| `@rc-component/tree` | `~1.2.4` | patch | Tree |
| `@rc-component/tree-select` | `~1.8.0` | patch | TreeSelect |
| `@rc-component/trigger` | `^3.9.0` | minor | Tooltip, Popover, Dropdown |
| `@rc-component/upload` | `~1.1.0` | patch | Upload |
| `@rc-component/util` | `^1.10.0` | minor | 通用工具 |

## 本地开发调试

如果需要在 antd 中测试尚未发布的 rc-component 改动：

### 方法一：npm link

```bash
# 1. 在 rc-component 仓库中
cd /path/to/rc-component
npm link

# 2. 在 antd 仓库中
cd /path/to/ant-design
npm link @rc-component/table  # 替换为具体包名
```

### 方法二：overrides/resolutions

在 `package.json` 中使用 `overrides`（npm）或 `resolutions`（pnpm/yarn）：

```json
{
  "overrides": {
    "@rc-component/table": "file:../table"
  }
}
```

### 清理 link

```bash
npm unlink @rc-component/table
npm install
```

## 注意事项

- 不要同时升级多个 `@rc-component/*` 包，每次 PR 只升级一个
- 升级后必须运行完整测试套件
- 如果有 breaking change，需要评估对 antd 组件的影响
- 升级 `@rc-component/picker` 或 `@rc-component/pagination` 时，需同步检查 locale 文件
- 使用 `^` 的包（motion、trigger、util 等）会自动获取 minor 更新，但仍需定期验证
- 不要锁定具体的 patch 版本号，保持 `~x.y.0` 的格式
