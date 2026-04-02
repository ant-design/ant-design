## 类型勾选建议

优先勾选最贴近主目的的 1 项；确实跨两类时可勾选 2 项，但不要把多个小改动全都勾上。

常见对应关系：

- 新增组件能力或公开 API：`🆕 New feature` / `🆕 新特性提交`
- 修复缺陷：`🐞 Bug fix` / `🐞 Bug 修复`
- 站点文档、官网页面、主题页、说明文字：`📝 Site / documentation improvement` / `📝 站点、文档改进`
- demo 调整：`📽️ Demo improvement` / `📽️ 演示代码改进`
- 样式或交互微调：`💄 Component style improvement` / `💄 组件样式/交互改进`
- 类型修正：`🤖 TypeScript definition improvement` / `🤖 TypeScript 定义更新`
- 性能问题：`⚡️ Performance optimization` / `⚡️ 性能优化`
- 重构但无外部行为变化：`🛠 Refactoring` / `🛠 重构`
- 测试补充：`✅ Test Case` / `✅ 测试用例`
- CI / workflow / action：通常归到 `⏩ Workflow`、`❓ Other`，或标题使用 `ci:`

## 类型判断补充说明

不要因为 diff 里包含逻辑代码就直接判成 `fix`。先看“最终在修什么”。

优先判断：

1. **site / docs / demo / ci 优先于 fix**
   - 若主要改的是官网、文档、演示、脚本、workflow，即使涉及一些逻辑代码，也通常不该写成组件 `fix`
2. **fix 只用于真实缺陷修复**
   - 组件行为异常、渲染错误、交互不符合预期、样式 bug，才优先用 `fix`
3. **feat 只用于对外新增能力**
   - 不是“内部代码变多了”就算 feat，而是用户真的获得了新能力

示例：

- 修官网主题页按钮逻辑 -> `site: ...`
- 修文档描述错误 -> `docs: ...`
- 修 demo 的展示逻辑 -> `demo: ...`
- 修 GitHub Actions 校验 -> `ci: ...`
- 修 Select 真正的组件行为 bug -> `fix(Select): ...`

## Related Issues 写法

有明确 issue 时：

- `close #12345`
- `fix #12345`
- `ref #12345`

没有 issue 时：

- 简单写需求来源，如 `Requested in discussion #xxxx`
- 若确实没有，写 `None`

不要编造 issue 编号。

## Background and Solution 写法

推荐控制在 2 到 5 行，回答这几件事：

1. 原先哪里有问题
2. 这次怎么改
3. 是否有 API、UI、交互或行为变化

英文示例：

```markdown
### 💡 Background and Solution

The Select dropdown could jump when the option list changed during search. This PR keeps the scroll position stable after options are updated. No public API changes are introduced.
```

中文示例：

```markdown
### 💡 需求背景和解决方案

Select 在搜索过程中更新选项后，下拉列表会出现滚动位置跳动。这个 PR 在选项变更后保持滚动位置稳定。不涉及公开 API 变更。
```

## Change Log 写法

### 1) 需要写实质 changelog 的场景

当改动会影响：

- 组件使用方式
- 公开 API
- 交互行为
- UI / 视觉表现
- 用户实际可感知结果

可写成：

```markdown
### 📝 Change Log

| Language   | Changelog                                        |
| ---------- | ------------------------------------------------ |
| 🇺🇸 English | Fix Select dropdown scroll jumping during search |
| 🇨🇳 Chinese | 修复 Select 搜索时下拉列表滚动位置跳动问题       |
```

### 2) 无需 changelog 的场景

常见包括：

- `site`
- `docs`
- `demo`
- `ci`
- 纯测试
- 内部维护或重构，且无外部可感知变化

这类场景不要硬写影响描述，可直接使用占位：

英文：

```markdown
### 📝 Change Log

| Language   | Changelog             |
| ---------- | --------------------- |
| 🇺🇸 English | No changelog required |
| 🇨🇳 Chinese | 无需更新日志          |
```

中文：

```markdown
### 📝 更新日志

| 语言    | 更新描述              |
| ------- | --------------------- |
| 🇺🇸 英文 | No changelog required |
| 🇨🇳 中文 | 无需更新日志          |
```

也可以更短，直接写：

- `N/A`
- `No changelog required`
- `无需更新日志`

前提是保留模板 section，不要直接删掉整个 changelog 区块。

## 基线分支判断建议

目标是尽量推断“当前分支实际从哪里切出来”，而不是拍脑袋默认 `master`。

建议顺序：

1. 用户明确指定了 `base branch` -> 直接使用
2. 查看当前分支是否能从 `reflog` 看出 checkout 来源
3. 查看 `git branch -vv` 的 tracking / upstream 作为辅助线索
4. 必要时结合 `merge-base` 比较候选分支
5. 若仍无法确定，再退回远端默认分支或仓库默认分支

建议命令：

```bash
git branch --show-current
git branch -vv
git reflog show --date=local $(git branch --show-current)
git remote show origin
git merge-base HEAD <candidate-branch>
```

注意：

- upstream 不是绝对父分支，只是候选线索
- `reflog` 最接近真实答案，但不一定一直存在
- 不确定时要明确告诉用户“这是推断值”

## 创建 PR 前确认话术建议

在真正执行 `gh pr create` 之前，应该先给用户一个确认版草稿，例如：

```markdown
我先整理了一版待提交的 PR 草稿，请你确认：

- Base branch: `feature-x`
- PR title: `site: adjust token panel interaction on theme preview page`
- PR type: `📝 Site / documentation improvement`
- Change Log: `No changelog required`

如果没问题，我再继续创建 PR；如果你想改 title、type、base 或正文，我先帮你改。
```

## PR 标题示例

`ant-design` 的 PR 标题应固定使用英文，并遵循本 skill 约定的模式：

- `<type>: <subject>`
- `<type>(<scope>): <subject>`

常见 `type`：

- `feat`
- `fix`
- `docs`
- `refactor`
- `type`
- `site`
- `demo`
- `test`
- `ci`
- `chore`
- `perf`

英文：

- `fix: improve TreeSelect code`
- `docs: add CLAUDE.md for AI assistant context`
- `refactor(Image): extract normalizePlaceholder to usePlaceholderConfig hook`
- `site: fix ThemePreview copy button in dark theme`
- `feat: add Typography.Shimmer component`
- `ci: adjust pull request label workflow`

更贴近当前分支时，可写成：

- `fix(Select): keep dropdown scroll position stable during search`
- `docs: clarify Upload beforeUpload return behavior`
- `refactor(Table): simplify sticky offset calculation`
- `site: refine AI theme page empty state copy`

不要这样写：

- `修复 Select 搜索后下拉滚动跳动问题`
- `update select`
- `fix issues`
- `some improvements`
