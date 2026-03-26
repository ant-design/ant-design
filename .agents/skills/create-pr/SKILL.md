---
name: antd-create-pr
description: Create pull requests for ant-design using the repository's official PR templates. Use when the user asks to create a PR, open a pull request, write PR title/body, summarize branch changes for a PR, or prepare an ant-design PR in Chinese or English. The skill must choose `.github/PULL_REQUEST_TEMPLATE_CN.md` or `.github/PULL_REQUEST_TEMPLATE.md` based on the user's language habit and keep the content aligned with ant-design's PR sections.
---

# Ant Design PR 创建规范

## 目标

一、基于当前分支相对基线分支的全部改动生成 PR，不只看最后一个 commit。

二、严格使用 `ant-design` 仓库自带模板，不自行发明 PR 结构。

三、根据用户语言习惯选择中文或英文模板，但 PR 标题始终使用英文，并遵循本文档约定的命名格式。

四、真正执行 `gh pr create` 之前，必须先把 `base`、`title`、`body` 给用户确认，确认后才能创建 PR。

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
- `PR title` 要符合本文档的标题规范
- `PR body` 才跟随模板语言

### 三、先分析分支，再写 PR

创建 PR 前，必须先看：

- 当前分支名
- 基线分支
- 当前分支相对基线分支的 commit 列表
- `base...HEAD` 的完整 diff

不要只根据工作区未提交内容写 PR，也不要只根据最近一个 commit 写 PR。

### 四、先给草稿，后创建 PR

无论用户是否说“直接帮我创建 PR”，都要先完成以下步骤：

1. 生成 `base`、`title`、`body` 草稿
2. 明确告诉用户：这是准备提交的 PR 内容
3. 让用户确认是否继续创建，或先修改
4. 只有用户明确确认后，才能真正执行 `gh pr create`

若用户中途要求修改标题、类型、changelog、目标分支等，应先更新草稿，再次确认。

### 五、标题和正文要分工明确

- PR 标题：用英文一句话概括本分支最主要的变动
- PR 正文：说明背景、改法、关联 issue、更新日志影响

正文不是逐文件流水账。要归纳“为什么改”和“改完后对开发者/用户有什么影响”。

### 六、信息不足时不要硬写

若以下内容缺失且无法从分支改动中可靠推断：

- 基线分支
- 关联 issue
- 变动性质
- 测试或验证方式

可以先给出草稿，并把无法确认的地方保留为待补充项；若用户要求直接创建 PR，也必须先说明缺失项并等待确认。

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

不要默认就用 `master`。按以下顺序判断：

1. 用户明确指定了 `base branch` -> 直接使用
2. 若当前分支存在可用的“来源线索”，优先根据真实 Git 信息推断：
   - `git branch -vv` 查看 tracking / upstream
   - `git reflog show <current-branch>` 查看是否能看出“从哪条分支 checkout 出来”
   - 必要时结合 `git merge-base HEAD <candidate-branch>` 比较分叉点
3. 若能较可靠判断“当前分支是从某条分支切出来的”，优先使用该分支作为 `base`
4. 若无法可靠推断，再退回远端默认分支或仓库默认分支

建议查看：

```bash
git branch --show-current
git branch -vv
git reflog show --date=local $(git branch --show-current)
git remote show origin
```

注意：

- tracking / upstream 只能作为线索，不等于绝对正确的“父分支”
- `reflog` 若已清理，可能无法得到结果
- 若推断结果不够确定，要在草稿中明确标注为“推断值”

#### 新功能分支的额外提醒

如果改动性质判断为 `feat` / 新功能，且当前基线不是明显的功能分支（如 `feature/*`），应额外提醒用户：

- 这个改动看起来像新功能
- 请确认是否应该提交到对应的 `feature` 分支，而不是默认开发主分支

此提醒只用于确认工作流，不要擅自改 base。

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

### 4. 判断模板语言

根据“语言由用户习惯决定”的规则，二选一：

- 中文模板：`.github/PULL_REQUEST_TEMPLATE_CN.md`
- 英文模板：`.github/PULL_REQUEST_TEMPLATE.md`

读取对应模板后再填写，避免凭记忆手写 section。

### 5. 判断 PR 类型

必须根据“主目的”判断，不要仅因为改动里包含逻辑变更就默认写成 `fix`。

优先判断顺序：

1. 是否主要是站点、文档、示例、演示、说明文本、主题页、官网交互等改动
   - 是：优先考虑 `site` / `docs` / `demo`
2. 是否主要是 CI、workflow、脚本、发布流程、校验流程等改动
   - 是：优先考虑 `ci` / `chore`
3. 是否主要是组件缺陷修复、行为异常修复、样式问题修复
   - 是：考虑 `fix`
4. 是否主要是公开能力新增
   - 是：考虑 `feat`
5. 是否主要是重构、测试、类型、性能等专项改动
   - 是：使用 `refactor` / `test` / `type` / `perf`

判断时以“用户感知的主结果”为准，不要被单个文件或单个 commit 干扰。

例如：

- 官网主题页按钮异常 -> 更偏 `site`，不是组件 `fix`
- 文档说明修正 -> `docs`
- demo 行为调整但不影响组件实现 -> `demo`
- workflow / action 调整 -> `ci`
- 组件真实行为 bug -> `fix`

### 6. 归纳 PR 的核心信息

至少整理出：

- 变动性质：勾选最贴近的一项，必要时可勾选多项，但不要滥选
- Related Issues：填 issue 链接或 `close #xxxx` / `fix #xxxx`
- Background and Solution：说明问题背景、处理方式、是否有 UI/API 变化
- Change Log：写“影响”，不要写实现流水账

### 7. 处理 Change Log

对于以下场景，通常无需写实质 changelog：

- `site`
- `docs`
- `demo`
- `ci`
- 纯测试
- 仅内部维护、无用户可感知变化的调整

这类场景：

- 不要硬编 changelog 文案
- 保留模板 section
- 使用简洁占位即可，例如：
  - `N/A`
  - `No changelog required`
  - `无需更新日志`

只有当改动确实会影响组件使用者、公开 API、交互行为、视觉表现或发布内容时，才写实质 changelog。

### 8. 生成 PR 标题

标题要求：

- 按下方“写法要求 -> 标题”生成
- 覆盖整条分支的主要目标
- 不要照搬单个 commit message
- `type` 要与第 5 步判断一致

### 9. 按模板产出 PR 正文草稿

填写时遵守：

- 删除模板注释和说明性文字
- 保留 section 标题
- 勾选最合适的类型
- 内容尽量具体，但不要写成长篇说明
- 若涉及 UI 变化，提醒可补截图或 GIF
- 若某信息尚未确认，要显式标出来，不要假装确定

### 10. 先给用户确认

输出时至少包含：

- `Base branch`
- `PR title`
- `PR body`
- 需要用户补充或确认的点

明确询问用户是否：

- 直接创建 PR
- 先修改后再创建

没有明确确认前，不得执行 `gh pr create`。

### 11. 创建 PR

只有在用户明确确认后，才执行。

执行前再次检查：

```bash
git branch -vv
git remote -v
gh repo view --json nameWithOwner
```

要求：

1. 确认当前分支的 tracking remote 和远端分支正确
2. 确认 PR 的目标仓库是 `ant-design/ant-design`，不要依赖 `gh` 默认推断
3. 若 tracking remote 缺失、指向不明确、或不是预期 fork，先向用户确认，不要默认推送
4. 只有在推送目标 remote 明确无误时，才推送当前分支
5. 使用已确认过的标题和正文执行 `gh pr create`

若需要推送，优先使用明确的远端与分支名，例如：

```bash
git push -u <remote> HEAD
```

建议形式：

```bash
gh pr create --repo ant-design/ant-design --base <base> --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

创建成功后，返回 PR 链接。

## 写法要求

### 标题

- 必须是英文
- 默认先判断 `type`，再决定是否需要 `scope`
- 优先使用 `type: subject` 或 `type(scope): subject`
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
- `perf`：性能优化

`scope` 使用规则：

- 改动集中在单个组件或模块时再加，如 `refactor(Image): ...`
- 若没有明显聚焦对象，就不要硬加 `scope`
- 不要把目录名机械塞进 `scope`

### Background and Solution

- 先写要解决的问题
- 再写采用了什么方案
- 若涉及 API、交互或视觉变化，点明外部可感知差异

### Change Log

- 有真实用户影响时再写
- `site` / `docs` / `demo` / `ci` / 纯测试等无须强写
- 无需 changelog 时保留 section，但使用简洁占位

## 参考

更多类型判断、基线分支建议、确认话术与标题示例见 `references/template-notes-and-examples.md`。
