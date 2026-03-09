---
name: antd-create-pr
description: Create pull requests for ant-design using the repository's official PR templates. Use when the user asks to create a PR, open a pull request, write PR title/body, summarize branch changes for a PR, or prepare an ant-design PR in Chinese or English. The skill must choose `.github/PULL_REQUEST_TEMPLATE_CN.md` or `.github/PULL_REQUEST_TEMPLATE.md` based on the user's language habit and keep the content aligned with ant-design's PR sections.
---

# Ant Design PR 创建规范

## 目标

一、基于当前分支相对基线分支的全部改动生成 PR，不只看最后一个 commit。

二、严格使用 `ant-design` 仓库自带模板，不自行发明 PR 结构。

三、根据用户语言习惯选择中文或英文模板，但 PR 标题始终使用英文，并贴近 `ant-design` 已合并 PR 的命名方式。

## 触发场景

当用户提及以下任一情况时使用本 skill：

- 创建 PR、发起 pull request
- 写 PR 标题或 PR 描述
- 总结当前分支改动用于提 PR
- 用 `gh pr create` 为 `ant-design` 开 PR

## 基本规则

### 一、必须以仓库模板为准

始终使用以下模板之一：

- 中文：`.github/PULL_REQUEST_TEMPLATE_CN.md`
- 英文：`.github/PULL_REQUEST_TEMPLATE.md`

不要自己改 section 名称，不要删掉模板里已有的主结构。可以删掉模板中的注释和说明性占位文本，但保留最终要提交的 section。

### 二、模板语言由用户习惯决定，但标题固定英文

按以下顺序判断：

1. 用户当前请求主要是中文 -> 使用中文模板
2. 用户当前请求主要是英文 -> 使用英文模板
3. 若当前请求混合，但历史上下文明显偏中文 -> 使用中文模板
4. 若无法判断，再询问用户，不要猜

不要因为代码、分支名、commit message 或 issue 链接是英文，就强行改用英文模板。

但无论模板选中文还是英文：

- `PR title` 都必须是英文
- `PR title` 要符合仓库近期已合并 PR 的写法
- `PR body` 才跟随模板语言

### 三、先分析分支，再写 PR

创建 PR 前，必须先看：

- 当前分支名
- 基线分支（默认优先 `master`，若仓库实际工作流不同，再按当前仓库状态判断）
- 当前分支相对基线分支的 commit 列表
- `base...HEAD` 的完整 diff

不要只根据工作区未提交内容写 PR，也不要只根据最近一个 commit 写 PR。

### 四、标题和正文要分工明确

- PR 标题：用英文一句话概括本分支最主要的变动
- PR 正文：说明背景、改法、关联 issue、更新日志影响

正文不是逐文件流水账。要归纳“为什么改”和“改完后对开发者/用户有什么影响”。

### 五、信息不足时不要硬写

若以下内容缺失且无法从分支改动中可靠推断：

- 基线分支
- 关联 issue
- 变动性质
- 测试或验证方式

可以先给出草稿，并把无法确认的地方保留为待补充项；若用户要求直接创建 PR，则先向用户说明缺失项。

## 执行步骤

### 1. 检查仓库和 PR 环境

建议先确认：

```bash
git status --short
git branch --show-current
git remote -v
gh auth status
```

若 `gh` 不可用、未登录、当前不在 git 仓库、或当前分支不适合提 PR，应先说明问题，不要继续伪造结果。

### 2. 确定基线分支

按以下顺序判断：

1. 用户明确指定了 base branch -> 直接使用
2. 远端默认分支是 `master` -> 使用 `master`
3. 否则使用仓库默认分支

建议查看：

```bash
git remote show origin
git branch -vv
```

### 3. 收集本分支全部改动

至少查看：

```bash
git log --oneline <base>..HEAD
git diff --stat <base>...HEAD
git diff <base>...HEAD
```

必要时再看：

```bash
git diff --name-only <base>...HEAD
```

归纳时要覆盖该分支会进入 PR 的全部提交，而不是只写最后一次改动。

### 4. 先看近期已合并 PR 标题风格

生成标题前，必须参考仓库近期已合并 PR 的标题，而不是只参考 commit message。

优先查看最近已 merge 的标题样式，例如：

- `docs: add CLAUDE.md for AI assistant context`
- `refactor(Image): extract normalizePlaceholder to usePlaceholderConfig hook`
- `fix: fix config-prover path`
- `type: improve TreeSelect type`
- `site: fix ThemePreview copy button in dark theme`

可见 `ant-design` 当前常见模式是：

- `<type>: <subject>`
- `<type>(<scope>): <subject>`

其中：

- `type` 用英文小写，如 `fix`、`feat`、`docs`、`refactor`、`type`、`site`、`demo`、`test`、`ci`、`chore`
- `scope` 常用于组件名或模块名，可保留大小写，如 `Image`、`TreeSelect`
- `subject` 使用英文，直接描述改动结果

若可以访问 GitHub，建议查看最近已合并 PR 标题；若不能访问网络，也应至少遵守上面的命名模式。

### 5. 判断模板语言

根据“语言由用户习惯决定”的规则，二选一：

- 中文模板：`.github/PULL_REQUEST_TEMPLATE_CN.md`
- 英文模板：`.github/PULL_REQUEST_TEMPLATE.md`

读取对应模板后再填写，避免凭记忆手写 section。

### 5. 归纳 PR 的核心信息

至少整理出：

- 变动性质：勾选最贴近的一项，必要时可勾选多项，但不要滥选
- Related Issues：填 issue 链接或 `close #xxxx` / `fix #xxxx`
- Background and Solution：说明问题背景、处理方式、是否有 UI/API 变化
- Change Log：写“影响”，不要写实现流水账

如果没有 changelog 价值，不要编造影响，可以写简洁但诚实的描述。

### 6. 生成 PR 标题

标题要求：

- 必须是英文
- 优先使用 `<type>: <subject>` 或 `<type>(<scope>): <subject>`
- 覆盖整条分支的主要目标
- 简洁，不堆文件名
- 与仓库语气一致
- 优先贴近近期已合并 PR 的写法，而不是照搬 commit title

可参考这些风格：

- `fix: improve TreeSelect code`
- `docs: add CLAUDE.md for AI assistant context`
- `refactor(Image): extract normalizePlaceholder to usePlaceholderConfig hook`
- `site: fix ThemePreview copy button in dark theme`
- `feat: add Typography.Shimmer component`

### 7. 按模板产出 PR 正文

填写时遵守：

- 删除模板注释和说明性文字
- 保留 section 标题
- 勾选最合适的类型
- 内容尽量具体，但不要写成长篇说明
- 若涉及 UI 变化，提醒可补截图或 GIF

### 8. 创建 PR

若用户要求真正发起 PR：

1. 先确认当前分支已推送到远端；未推送则先推送
2. 使用 `gh pr create`
3. 标题和正文都使用已经整理好的内容

建议形式：

```bash
gh pr create --base <base> --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

创建成功后，返回 PR 链接。

## 写法要求

### 标题

- 必须是英文
- 默认先判断 `type`，再决定是否需要 `scope`
- 优先使用仓库里已经大量出现的 `type:` / `type(scope):` 格式
- 优先写结果，不写过程
- 避免 `update`, `fix issues`, `misc changes` 这类空话
- 若分支包含多类小改动，提炼一个更高层概括

常用 `type` 参考：

- `feat`：新增能力
- `fix`：修复问题
- `docs`：文档或说明
- `refactor`：重构
- `type`：类型修正
- `site`：站点相关改动
- `demo`：示例相关改动
- `test`：测试改动
- `ci`：CI 或 workflow
- `chore`：杂项维护

`scope` 使用规则：

- 改动集中在单个组件或模块时再加，如 `refactor(Image): ...`
- 若没有明显聚焦对象，就不要硬加 `scope`
- 不要把目录名机械塞进 `scope`

### Background and Solution

- 先写要解决的问题
- 再写采用了什么方案
- 若涉及 API、交互或视觉变化，点明外部可感知差异

### Change Log

- 写对开发者或用户的影响
- 不要把实现细节原样搬进 changelog
- 中英文两行内容应语义一致，不要只填其中一种

## 禁止

- 不读取 `base...HEAD` 的 commit 和 diff 就写 PR
- 不看模板，直接凭印象生成正文
- 用工作区未提交内容代替 PR 内容
- 只总结最后一个 commit
- 标题写成中文
- 标题不带 `type`，却伪装成符合仓库习惯
- 模板正文语言和所选模板不一致
- 编造 issue 编号、测试结果或发布影响

## 参考

更多勾选项建议、正文压缩写法和中英文示例见 `references/template-notes-and-examples.md`。
