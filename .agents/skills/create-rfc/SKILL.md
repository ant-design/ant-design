---
name: antd-create-rfc
description: 创建和管理 ant-design 仓库的 RFC（Request for Comments）提案。在用户提到 RFC、提案、功能设计、API 设计、重大架构变更、或需要在社区征求意见时使用。RFC 通过 GitHub Discussions 进行，不在仓库内创建 RFC 文件。
---

# Ant Design RFC 创建规范

## 目标

一、帮助维护者通过 GitHub Discussions 发起结构化的 RFC 提案，收集社区反馈。

二、确保 RFC 内容清晰、范围明确、有足够的背景信息和可操作的讨论方向。

三、在 RFC 达成共识后，协助推进实现阶段（创建 Issue、PR 等）。

## 触发场景

当用户提到以下场景时使用：

- 创建 RFC
- 发起提案
- 功能设计讨论
- API 设计讨论
- 重大架构变更讨论
- 社区征求意见
- 技术方案评审

## 核心原则

### 一、RFC 通过 GitHub Discussions 进行

ant-design 不使用仓库内的 RFC 目录或 RFC 模板文件。所有 RFC 均通过 **GitHub Discussions** 发布：

- URL: `https://github.com/ant-design/ant-design/discussions`
- 选择 "Ideas" 或 "General" 类别
- 标题使用 `[RFC]` 前缀

### 二、RFC 不是 Issue

- RFC 用于**讨论和征求意见**，使用 Discussions
- Issue 用于**具体的 Bug 报告和功能请求**，已有明确实现方案后创建
- 不要在 Issues 区发起 RFC 讨论

### 三、RFC 应先讨论后实现

RFC 阶段重点在于：

1. 明确问题和需求
2. 提出可行的解决方案
3. 收集社区反馈并迭代方案
4. 达成共识后再进入实现阶段

不要跳过 RFC 直接创建实现 PR。

## RFC 模板结构

每个 RFC 应包含以下部分：

### 标题格式

```
[RFC] 简短描述要讨论的内容
```

示例：

- `[RFC] Add virtual scroll support for List component`
- `[RFC] Redesign Form validation API`
- `[RFC] Support CSS variable theme system`

### 正文结构

```markdown
## Summary

简要概述本 RFC 要讨论什么，一两句话说明核心议题。

## Motivation

为什么要做这个变更？当前有什么问题？

- 现有方案的不足
- 用户需求或场景缺口
- 技术债务或性能瓶颈

## Proposed Solution

详细描述提议的解决方案：

### API 设计

如果是 API 变更，展示新旧对比：

```tsx
// 当前用法
<Component oldProp={value} />

// 提议的用法
<Component newProp={value} />
```

### 技术方案

- 实现思路
- 涉及哪些组件或模块
- 是否需要 `@rc-component/*` 层面的配合
- 是否有 breaking change

### 兼容方案

- 如何保持向下兼容
- 是否需要 deprecation 周期
- 迁移指南概要

## Alternatives Considered

列出考虑过的其他方案，以及为什么不选择它们：

1. **方案 A**：描述 + 不采用的原因
2. **方案 B**：描述 + 不采用的原因

## Impact

### 对使用者的影响

- API 变化
- 行为变化
- 是否需要迁移

### 对包体积的影响

- 是否引入新依赖
- 预计增加多少体积

### 对性能的影响

- 预期性能提升或损耗
- 是否有 benchmark 数据

## Discussion Points

明确列出希望社区讨论和反馈的具体问题：

1. API 设计是否合理？
2. 是否有遗漏的边界情况？
3. 兼容方案是否足够？

## References

- 相关 Issue 链接
- 相关 PR 链接
- 类似功能的业界方案
- 历史讨论链接（如有）
```

## 执行步骤

### 1. 确认 RFC 的必要性

在创建 RFC 前，先检查：

- 是否已有相关 Discussions 或 Issues
- 是否已有相关 PR
- 该变动是否足够小（小改动不需要 RFC）

```bash
# 搜索已有 Discussions
gh search discussions --repo ant-design/ant-design --match title "<关键词>"

# 搜索已有 Issues
gh search issues --repo ant-design/ant-design "<关键词>"
```

如果已有相关讨论，优先在现有讨论中参与，而不是重复创建。

### 2. 判断是否需要 RFC

**需要 RFC 的场景**：

- 新增或修改公开 API
- 组件架构调整（如 DOM 结构变化）
- 引入新的依赖或技术选型
- Breaking change
- 影响多个组件的系统级变更

**不需要 RFC 的场景**：

- 单个组件的 Bug 修复
- 文档更新
- 样式微调
- 已有 API 的补充（非变更）

### 3. 撰写 RFC 草稿

按照上方模板结构撰写 RFC。注意：

- 使用英文（GitHub Discussions 的通用语言）
- 代码示例要可运行、简洁
- 对比图或表格有助于理解
- 保持客观，列出优缺点

### 4. 创建 Discussion

```bash
gh api repos/ant-design/ant-design/discussions \
  --method POST \
  --field title="[RFC] Your Title Here" \
  --field body="$(cat rfc-draft.md)" \
  --field category_id="<ideas-category-id>"
```

或使用浏览器手动创建：

1. 访问 `https://github.com/ant-design/ant-design/discussions/new/choose`
2. 选择 "Ideas" 类别
3. 粘贴 RFC 内容
4. 提交

### 5. 跟进讨论

- 关注社区反馈和评论
- 根据反馈迭代 RFC 内容
- 记录讨论中的关键决策点
- 适时更新 RFC 正文（编辑原帖）

### 6. 达成共识后的下一步

当 RFC 讨论趋于稳定、主要问题已解决时：

1. 在 RFC 正文顶部添加 **"Status: Accepted"** 或 **"Status: Implemented"**
2. 创建对应的 Issue 跟踪实现进度
3. 按照 `create-pr` skill 创建实现 PR
4. 在 PR 中引用 RFC Discussion 链接

## RFC 状态标记

在 RFC 正文顶部使用状态标记：

| 状态 | 含义 |
|---|---|
| `Status: Draft` | 初稿，正在收集意见 |
| `Status: In Discussion` | 社区讨论中 |
| `Status: Accepted` | 已达成共识，准备实现 |
| `Status: Implemented` | 已实现并合并 |
| `Status: Rejected` | 讨论后决定不采用 |
| `Status: Superseded` | 被其他方案替代 |

## 历史 RFC 参考

ant-design 已有的一些 RFC 示例：

| 主题 | 链接 |
|---|---|
| StaticTable 虚拟滚动 | https://github.com/ant-design/ant-design/discussions/41500 |
| CSS Variable 主题 | https://github.com/ant-design/ant-design/discussions/44654 |
| Static Extract Style (SSR) | https://github.com/ant-design/ant-design/discussions/40985 |
| Warning Filter | https://github.com/ant-design/ant-design/discussions/44551 |
| Listy 组件 | https://github.com/ant-design/ant-design/discussions/54458 |

## 注意事项

- RFC 使用英文撰写，面向全球社区
- 保持开放心态，接受不同意见
- 不要急于推进，给社区足够的讨论时间
- RFC 不是最终决策，而是讨论起点
- 实现阶段应忠实反映 RFC 中的共识，如有偏离需重新讨论
- 组件文档中应链接到相关 RFC（如 `components/list/index.en-US.md` 中的 "RFC Discussion" 章节）
