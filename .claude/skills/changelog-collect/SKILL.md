# Changelog 收集工具

## 目标

帮助开发者收集 Ant Design 两个版本之间的 Changelog，处理临时文件并更新到官方 CHANGELOG.zh-CN.md 和 CHANGELOG.en-US.md 文件中。

## 触发方式

当用户提到以下关键词时使用此 skill：

- 收集 changelog
- 生成 changelog
- 更新 changelog
- 版本对比
- 处理 changelog

## 核心流程

### 阶段一：通过 gh CLI 收集 PR 信息

使用 GitHub CLI 直接收集两个版本/分支之间的 PR 信息。

#### 1.1 获取可用的 Tags

执行 `git fetch --tags` 确保最新，然后获取所有 tags：

```bash
git tag --list | grep -v -E '(experimental|alpha|resource)' | sort -V | tail -20
```

过滤规则：

- 排除包含 `experimental`、`alpha`、`resource` 的 tag
- 保留最近的 20 个有效版本 tag

#### 1.2 选择起始版本和目标分支

交互式询问用户：

```
🏷 请选择起始版本（tag）：
- [列表显示最近的 tag]
- [自定义输入]

🔀 请选择目标分支：
- master
- feature
- 自定义输入
```

#### 1.3 确定版本号

**重要：在开始收集 PR 信息之前，必须先确定版本号并写入 `~changelog.md` 的头部。**

根据起始版本自动计算新版本（默认按 minor 升级）：

```
当前选择: 6.3.1 → master

请确认版本号：
- [minor] 升级到 6.4.0（次版本号）
- [patch] 升级到 6.3.2（修订版本号）
- [自定义] 输入具体版本号
```

用户确认后，**立即初始化 `~changelog.md` 文件**，写入版本信息：

```markdown
# Changelog Temp File

# Version: 6.4.0

# Generated: 2026-03-09T...

---
```

这样在后续收集 PR 信息时，每次追加写入都能保证 `~changelog.md` 是完整可用的。

#### 1.4 获取 commit 列表

```bash
git log <from-tag>..<to-branch> --oneline
```

解析每个 commit，提取 PR 编号（匹配 `#12345` 格式）。

#### 1.5 获取每个 PR 的详情并实时写入

对每个 PR 编号执行：

```bash
gh pr view <pr-number> --json title,body,author
```

返回字段：

- `title`: PR 标题
- `body`: PR 描述（包含中英文 changelog）
- `author`: 提交者

**每获取一个 PR 的详情后，立即追加写入 `~changelog.md`**（而不是等全部遍历完毕）。

追加写入内容：

```markdown
## abc1234

- PR: 56976
- Committer: zombieJ
- Commit: fix: Select height issue
- Category: Select
- English: Fix Select incorrect height when value is empty
- Chinese: 修复 Select value 为空时高度不正确的问题
```

追加写入方式（Bash）：

```bash
cat >> ~changelog.md << 'EOF'

## abc1234

- PR: 56976
- Committer: zombieJ
- Commit: fix: Select height issue
- Category: Select
- English: Fix Select incorrect height when value is empty
- Chinese: 修复 Select value 为空时高度不正确的问题
EOF
```

或使用 Node.js：

```javascript
const content = `
## ${hash}

- PR: ${prNumber}
- Committer: ${committer}
- Commit: ${commitMessage}
- Category: ${category}
- English: ${english}
- Chinese: ${chinese}
`;

fs.appendFileSync('~changelog.md', content, 'utf8');
```

##### 从 PR body 提取中英文描述

PR body 中提取 changelog 的模式：

```
🇺🇸 English
- Fix Select incorrect height when value is empty

🇨🇳 Chinese
- 修复 Select value 为空时高度不正确的问题
```

或者：

```
English:
- Fix Select incorrect height when value is empty

Chinese:
- 修复 Select value 为空时高度不正确的问题
```

提取规则：

- 识别 `🇺🇸 English` 或 `English:` 标记后的 `- ` 行作为英文描述
- 识别 `🇨🇳 Chinese` 或 `Chinese:` 标记后的 `- ` 行作为中文描述

如果 PR body 中没有明确的中英文描述，则查询完整 commit 内容，自动生成。

##### 识别组件 Category

从 PR title 和 body 中识别组件名：

```typescript
const componentNames = [
  'Button',
  'Checkbox',
  'Radio',
  'Switch',
  'Input',
  'Select',
  'TreeSelect',
  'Cascader',
  'DatePicker',
  'TimePicker',
  'Calendar',
  'Upload',
  'Modal',
  'Drawer',
  'Message',
  'Notification',
  'Popconfirm',
  'Tooltip',
  'Popover',
  'Table',
  'List',
  'Tree',
  'Tabs',
  'Steps',
  'Progress',
  'Spin',
  'Avatar',
  'Badge',
  'Tag',
  'Card',
  'Collapse',
  'Carousel',
  'Breadcrumb',
  'Pagination',
  'Menu',
  'Dropdown',
  'Form',
  'Descriptions',
  'Skeleton',
  'Empty',
  'Result',
  'Alert',
  'Typography',
  'Layout',
  'Grid',
  'Space',
  'Flex',
  'ConfigProvider',
  'App',
  'Watermark',
  'ColorPicker',
  'QRCode',
  'Segmented',
];
```

匹配规则：大小写不敏感，包含匹配。

### 阶段二：处理临时文件

读取 `~changelog.md` 后，按以下规范处理：

**临时文件格式：**

```markdown
# Changelog Temp File

# Version: 6.4.0

# Generated: 2026-03-09T...

---

## abc1234

- PR: 56976
- Committer: zombieJ
- Commit: fix: Select height issue
- Category: Select
- English: Fix Select incorrect height when value is empty
- Chinese: 修复 Select value 为空时高度不正确的问题
```

**AGENTS.md 规范引用：**

- [核心原则](./AGENTS.md#核心原则) - 有效性过滤规则
- [格式与结构规范](./AGENTS.md#格式与结构规范) - 分组、描述、Emoji 规范
- [Emoji 规范](./AGENTS.md#emoji-规范严格执行) - 根据 commit 类型自动标记
- [输出示例参考](./AGENTS.md#输出示例参考) - 中英文格式参考

根据 AGENTS.md 的规范，对 `~changelog.md` 中的条目进行过滤、分组、格式检查，并在必要时进行交互式确认和修改。

#### 描述与署名补充规则

- 描述必须以动作开头：中文优先使用 `修复`、`优化`、`新增`、`重构` 等动词开头；英文优先使用 `Fix`、`Improve`、`Add`、`Refactor` 开头。
- 在“动作开头”的前提下，正文仍需包含组件名（例如：`修复 Select ...`、`Fix Select ...`）。
- 每条 changelog 默认补充 PR 作者链接（如 `[@username](https://github.com/username)`）。
- 如果作者属于 antd 团队成员，则跳过作者链接。
- 团队成员判断优先级：
   1. 以仓库内已有的团队/维护者名单为准（如 `contributors.json`、文档中的团队列表）。
   2. 若无法可靠判断，交互式询问用户是否添加该作者链接。

### 阶段三：写入文件

在 `---` front matter 之后、第一个版本标题之前插入新内容：

1. 读取 CHANGELOG.zh-CN.md
2. 找到 `---` 之后的位置
3. 插入生成的中文 changelog
4. 写入文件

同样流程处理 CHANGELOG.en-US.md

### 版本确认（可选）

版本号已在阶段一确定。如需更新 package.json，在写入 changelog 前询问：

```
是否需要同步更新 package.json 中的版本号？

当前版本: 6.3.1 → changelog 版本: 6.4.0
选项:
- [更新] 执行 npm version minor/patch
- [跳过] 保持 package.json 不变
```

### 写入确认（交互式）

**预览确认**：

```
请确认以下内容即将写入 CHANGELOG.zh-CN.md 和 CHANGELOG.en-US.md：

版本: 6.4.0
日期: 2026-03-09
条目数: 12

[预览完整内容] [直接写入] [取消]
```

## 完整交互流程

```
1. 获取可用 tags，选择起始版本
   ↓
2. 选择目标分支（master/feature/自定义）
   ↓
3. **立即确定版本号**（minor/patch/自定义）
   ↓
4. 初始化 ~changelog.md 头部（写入版本信息）
   ↓
5. git log 获取两个版本间的 commits
   ↓
6. 对每个 PR 执行 gh pr view 获取详情
   ↓
7. 从 PR body 提取中英文描述
   ↓
8. 识别组件 category
   ↓
9. **实时追加写入** ~changelog.md（每获取一个 PR 就写入）
   ↓
10. 过滤无效 commit（交互确认）
     ↓
11. 分组处理（按组件名）
    ↓
12. 检查描述规范性（交互确认）
    ↓
13. 重新生成不符合规范的描述（如需要）
    ↓
14. 预览确认（交互确认）
    ↓
15. 可选：更新 package.json 版本（npm version）
    ↓
16. 写入 CHANGELOG.zh-CN.md 和 CHANGELOG.en-US.md
    ↓
17. 清理临时文件 ~changelog.md
```

## 所需命令

此 skill 需要以下命令可用：

- `git tag --list` - 获取版本标签
- `git log <from>..<to> --oneline` - 获取版本间 commits
- `gh pr view <pr-number> --json title,body,author` - 获取 PR 详情
- `git show <hash>` - 查看 commit 详情
- `npm version minor` - 升级次版本号（6.3.1 → 6.4.0）
- `npm version patch` - 升级修订版本号（6.3.1 → 6.3.2）
- `cat >> ~changelog.md` 或 Node.js fs.appendFileSync - 实时追加写入

## 注意事项

- 需要 gh CLI 认证（运行 `gh auth login`）
- 写入前必须预览确认
- 保持中英文同步更新
- 描述以动作开头，并保证正文包含组件名（如 `修复 Select ...`、`Fix Select ...`）
- 默认添加 PR 作者链接；若作者是 antd 团队成员则跳过
- PR body 中没有中英文描述时，使用 PR title 作为后备
