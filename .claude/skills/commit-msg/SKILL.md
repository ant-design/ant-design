---
name: antd-commit-msg
description: Generate a single-line commit message for ant-design by reading the project's git staged area and recent commit style. Use when the user asks for a commit message, says "msg", "commit msg", "写提交信息", or wants one-line text that covers all staged changes. Output should match the repository's existing commit style and summarize all staged changes in one line.
---

# Ant Design Commit Message 生成规范

## 目标

**一、准确概括提交内容** - 基于当前 **git 暂存区** 生成一行 commit message，覆盖本次提交包含的全部改动。

**二、保持仓库风格一致** - 优先贴近仓库已有提交习惯，而不是机械套模板。

## 核心原则

> commit message 不是对 diff 的逐文件罗列，而是对这次提交意图的压缩表达。先读暂存区，再归纳，再输出一行。

## 触发场景

当用户提及以下任一情况时使用本 skill：

- 要写 commit message、提交信息
- 说「msg」且语境是 git 提交
- 需要根据当前改动生成一句提交说明
- 想让 agent 按 staged changes 总结一行提交标题

## 基本规则

### 一、默认只看暂存区

默认只根据 **staged changes** 生成 message，因为真正会被提交的是暂存区内容。

若用户明确说「包含未暂存内容」或「按全部改动写」，才额外查看 `git diff`。

### 二、必须先看仓库最近提交风格

生成 message 前，除了看暂存区，还要看最近提交，避免写出不符合仓库习惯的格式。

### 三、默认只输出最终一行

除非用户明确要求解释理由，否则最终回复只给 **一行 commit message**，不要附带分析、项目符号、代码块或引号。

## 执行步骤

### 1. 读取 git 状态、暂存区和最近提交

必须先获取以下信息，再生成 message。不要猜测，也不要只凭文件名写。

**建议执行的命令：**

```bash
git status --short
git diff --cached --stat
git diff --cached
git log --oneline -10
```

- `git status --short`：确认哪些文件已 stage，是否还有未 stage 内容。
- `git diff --cached --stat`：快速把握改动范围。
- `git diff --cached`：查看实际提交内容，这是生成 message 的依据。
- `git log --oneline -10`：检查仓库最近的提交风格、语言、type/scope 习惯。

### 2. 先判断是否能生成

若暂存区为空：

- 不要编造 message。
- 明确说明当前没有 staged changes，无法基于提交区生成准确的一行 commit message。

### 3. 归纳这次提交的主语义

根据 `git diff --cached` 的结果：

1. 找出本次提交的**主要目的**：新功能、修 bug、文档修改、重构、测试、脚本或依赖调整等。
2. 识别**主要影响范围**：组件、目录、站点、脚本、文档等。
3. 若包含多个文件或多类小改动，用一个更高层级的概括覆盖全部，不要逐项拼接成长句。

### 4. 对齐 ant-design 仓库风格

优先模仿仓库近期写法。对于 ant-design，通常可见这些形式：

- `fix(Component): ...`
- `docs: ...`
- `chore: ...`
- `ci: ...`
- `site: ...`

注意：

- 不要强行把所有提交都写成严格的 Conventional Commits。
- 如果仓库已有更自然的写法，优先贴近仓库已有习惯。
- 若改动主要在 `site`，可用 `site: ...`；若是明确修 bug，也可用 `fix(site): ...`。

### 5. 生成一行 message

输出应满足：

- **一行**
- **覆盖全部 staged changes**
- **简洁**
- **与仓库风格一致**
- **可直接拿去提交**

## 写法要求

### 标题格式

优先使用以下之一：

```text
<type>(<scope>): <subject>
```

或

```text
<scope>: <subject>
```

例如：

- `fix(Table): correct pagination when data is empty`
- `docs: update FAQ link in issue template`
- `site: add one-click copy theme code button`

### 标题规则

- 使用祈使语气，写现在要做什么，如 `add` / `fix` / `update`
- 首字母不要大写，除非 `scope` 是组件名，如 `Button`、`Table`
- 结尾不要句号
- 尽量控制在 **72 个字符内**
- 不要出现 `WIP`、`misc`、`update files` 这类空泛表述

### type 选择

常见类型：

- `feat`：新增功能
- `fix`：修复问题
- `docs`：文档改动
- `refactor`：重构
- `test`：测试改动
- `chore`：依赖、脚本、工程杂项
- `ci`：CI 流程改动
- `site`：站点展示、文档站交互、官网相关

不确定时：

- 有用户可见行为修正，优先 `fix`
- 只是文字、示例、说明更新，优先 `docs`
- 只是工具链、依赖、脚本调整，优先 `chore`

### scope 选择

- 改动集中在单个组件时，用组件名，如 `Button`、`Table`
- 改动集中在目录或模块时，用 `site`、`scripts`、`docs`
- 若没有明确 scope，允许省略

## 边界情况

### 多类改动混在一起

如果 staged changes 混合了文档、样式、类型、小修复等内容：

- 优先找**主目的**
- 如果没有单一主目的，用更上层的概括
- 目标是“诚实地覆盖全部改动”，不是把每个点都塞进标题

### 提交内容过于分散

若暂存区包含明显不相关的多组改动：

- 仍然给出一个尽量诚实的一行 message
- 不要假装这些改动只有一个很具体的目的
- 可使用较宽的概括，如 `chore(components): clean up styles, types and docs`

## 禁止

- 不读取 `git diff --cached` 就写 message
- 只根据文件名猜测内容
- 只描述部分文件或部分改动，忽略其它已 stage 内容
- 输出多行说明，把分析当成 commit message
- 为了套格式而违背仓库已有风格
- 写超过 72 个字符的冗长标题，除非很难避免

## 参考

更多 type、scope、antd 风格示例与边界情况见 `references/format-and-examples.md`。
