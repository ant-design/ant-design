---
name: antd-code-review
description: ant-design 仓库的代码审查清单。在 review PR、diff 或代码改动时使用。覆盖兼容性、测试、样式与 token、文档、国际化以及 ant-design 特有的 demo、测试、changelog 等约束。输出语言应跟随使用者的语言习惯。
---

# Ant Design Code Review 指南

## 开始前

1. 先读 `AGENTS.md`，确认仓库规则。
2. 先拿到 diff，不要只看文件名猜：
   - `git diff`
   - `git diff origin/master...HEAD`
   - 新特性分支可额外看 `git diff origin/feature...HEAD`
3. 对每条 finding，都要回看对应文件的完整上下文，不能只凭 diff 片段下结论。

## 检查清单

### 正确性与兼容性

- 是否遵循现有组件模式，而不是引入一次性的特殊逻辑？
- 涉及受控/非受控时，两种模式是否都正确？
- 空值、禁用、加载、嵌套使用等边界情况是否考虑到？
- 是否遗留 `console.log`、`console.debug` 或临时调试代码？
- 是否破坏了公开 API、事件、`className`、ref 或现有行为兼容性？
- 如果是有意改行为，文档和版本信息是否同步更新？

### React 与运行时安全

- effect、ref、事件逻辑在 Strict Mode 或重复挂载/卸载下是否有问题？
- 是否直接访问 DOM，导致 SSR 或未挂载阶段出错？
- `window`、`document`、`ResizeObserver`、`matchMedia` 等是否做了保护？
- 是否存在不稳定 key、闭包过期、异步更新与卸载竞争问题？

### 样式、Token 与主题

- 新样式是否遵循 `style/index.ts` 和 token 驱动的 CSS-in-JS 方式？
- 是否引入了本可用 token 替代的硬编码颜色、间距、圆角、阴影、z-index？
- 如果样式变了，是否也需要同步检查组件 token 或 `prepareComponentToken`？
- 是否会影响暗色主题、紧凑主题、组合场景下的样式表现？

### RTL、语义化 DOM 与结构

- margin、padding、placement、图标方向等是否兼容 RTL？
- 结构调整是否影响 `classNames`、`styles` 等语义化 DOM 能力？
- 如果改了 semantic DOM，demo、快照和文档是否也同步？
- token 或算法调整是否会破坏全局 token 覆盖与组件 token 继承？

### API、类型与文档

- 新增或修改的 prop 命名是否符合 Ant Design 习惯，并和同类组件保持一致？
- 类型调整是否意外收窄了公开 API 或破坏了原有推导？
- 新增 prop、方法、语义节点时，中英文文档和 `Version` 是否补齐？
- 删除或重命名 API 时，是否已经构成 breaking change？

### 测试

- Bug 修复是否补了对应测试？
- 新增逻辑分支是否有合理覆盖？
- 快照变更是否真反映行为变化，而不只是“快照更新了”？
- `components/**/__tests__/` 下是否仍使用相对路径导入？
- 涉及样式、semantic DOM、RTL、弹层、键盘交互、焦点管理时，是否有针对性测试？

### Demo、国际化与发布面

- `components/**/demo/` 和 `.dumi/` 是否使用了绝对导入，而不是相对引用内部实现？
- demo 是否展示公开推荐用法，而不是内部捷径？
- 新的用户可见文案是否需要走 locale，而不是直接硬编码？
- 改了 `components/locale/` 时，是否同步了所有语言和 `components/locale/index.tsx`？
- 用户可感知改动是否同步更新了 `index.en-US.md`、`index.zh-CN.md`、以及必要的 changelog？

### 无障碍与性能

- 键盘交互、焦点管理、ARIA 是否有回归？
- 弹层、下拉、模态框是否保持 escape、焦点返回等行为？
- 是否引入不必要的重渲染、重复测量或明显重复逻辑？

## 重点关注场景

- 弹层与 Portal：placement、container、滚动、层级、嵌套弹层
- Form 体系：值流转、校验状态、`Form.Item` 联动
- CSS-in-JS：token 派生、SSR、css variables、hash 样式
- semantic DOM / design token：代码、demo、快照、文档通常要一起看

## 输出格式

本地 CLI review 默认按以下格式输出：

1. 按顺序编号列出 findings
2. 标明优先级：`[high]`、`[medium]`、`[low]`
3. 每条都带文件路径和行号
4. 只写问题，不写表扬和总结
5. 输出前重新核对一遍对应源码
6. 最后一行输出 `All findings verified.`

输出语言要跟随使用者的语言习惯：

- 用户主要用中文，就用中文写 findings
- 用户主要用英文，就用英文写 findings
- 如果用户明确指定输出语言，按用户指定执行

如果没有发现问题，输出：

`No findings. Residual risk: <简短说明>.`
