## 类型勾选建议

优先勾选最贴近主目的的 1 项；确实跨两类时可勾选 2 项，但不要把多个小改动全都勾上。

常见对应关系：

- 新增组件能力或公开 API：`🆕 New feature` / `🆕 新特性提交`
- 修复缺陷：`🐞 Bug fix` / `🐞 Bug 修复`
- 站点文档、示例、说明文字：`📝 Site / documentation improvement` / `📝 站点、文档改进`
- demo 调整：`📽️ Demo improvement` / `📽️ 演示代码改进`
- 样式或交互微调：`💄 Component style improvement` / `💄 组件样式/交互改进`
- 类型修正：`🤖 TypeScript definition improvement` / `🤖 TypeScript 定义更新`
- 性能问题：`⚡️ Performance optimization` / `⚡️ 性能优化`
- 重构但无外部行为变化：`🛠 Refactoring` / `🛠 重构`
- 测试补充：`✅ Test Case` / `✅ 测试用例`

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

写“影响”，不要写实现步骤。

英文示例：

```markdown
### 📝 Change Log

| Language   | Changelog                                        |
| ---------- | ------------------------------------------------ |
| 🇺🇸 English | Fix Select dropdown scroll jumping during search |
| 🇨🇳 Chinese | 修复 Select 搜索时下拉列表滚动位置跳动问题       |
```

中文示例：

```markdown
### 📝 更新日志

| 语言    | 更新描述                                         |
| ------- | ------------------------------------------------ |
| 🇺🇸 英文 | Fix Select dropdown scroll jumping during search |
| 🇨🇳 中文 | 修复 Select 搜索时下拉列表滚动位置跳动问题       |
```

## PR 标题示例

`ant-design` 的 PR 标题应固定使用英文，并尽量贴近近期已合并 PR 的模式：

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

英文：

- `fix: improve TreeSelect code`
- `docs: add CLAUDE.md for AI assistant context`
- `refactor(Image): extract normalizePlaceholder to usePlaceholderConfig hook`
- `site: fix ThemePreview copy button in dark theme`
- `feat: add Typography.Shimmer component`

更贴近当前分支时，可写成：

- `fix(Select): keep dropdown scroll position stable during search`
- `docs: clarify Upload beforeUpload return behavior`
- `refactor(Table): simplify sticky offset calculation`

不要这样写：

- `修复 Select 搜索后下拉滚动跳动问题`
- `update select`
- `fix issues`
- `some improvements`
