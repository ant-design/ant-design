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

#### 1.3 使用 gh 获取 commit 列表

```bash
git log <from-tag>..<to-branch> --oneline
```

解析每个 commit，提取 PR 编号（匹配 `#12345` 格式）。

#### 1.4 使用 gh 获取每个 PR 的详情

对每个 PR 编号执行：

```bash
gh pr view <pr-number> --json title,body,author
```

返回字段：

- `title`: PR 标题
- `body`: PR 描述（包含中英文 changelog）
- `author`: 提交者

#### 1.5 从 PR body 提取中英文描述

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

#### 1.6 识别组件 Category

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

#### 1.7 实时写入临时文件

**重要：每获取一个 PR 的信息就立即写入 `~changelog.md`，不要等全部遍历完毕再写入。** 这样可以防止超出对话上下文限制。

首先初始化 `~changelog.md` 文件头部：

```markdown
# Changelog Temp File

# Version: 6.4.0

# Generated: 2026-03-09T...

---
```

每获取一个 PR 的详情后，立即追加写入：

```markdown
## abc1234

- PR: 56976
- Committer: zombieJ
- Commit: fix: Select height issue
- Category: Select
- English: Fix Select incorrect height when value is empty
- Chinese: 修复 Select value 为空时高度不正确的问题
```

追加写入方式：

```bash
# 使用 >> 追加写入
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

或者使用 Node.js：

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

**交互确认**：

```
过滤规则确认：
- 将过滤: docs, test, refactor, chore, ci 开头的 commit
- 保留: fix, feat, style, perf, a11y 等
选项：[确认过滤] [不过滤全部] [自定义规则]
```

```
发现 N 条不符合规范的描述
选项：[全部重新生成] [逐个确认] [跳过]
```

### 阶段三：写入文件

在 `---` front matter 之后、第一个版本标题之前插入新内容：

1. 读取 CHANGELOG.zh-CN.md
2. 找到 `---` 之后的位置
3. 插入生成的中文 changelog
4. 写入文件

同样流程处理 CHANGELOG.en-US.md

### 版本确认（交互式）

在写入前询问是否需要更新版本：

```
是否需要更新 package.json 中的版本号？

当前版本: 6.3.1
选项:
- [minor] 升级到 6.4.0（次版本号）
- [patch] 升级到 6.3.2（修订版本号）
- [不更新] 保持当前版本
```

用户选择后：

- 如果选择 minor/patch：使用 `npm version` 命令更新 package.json
- 写入 changelog 时使用新版本号

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
3. git log 获取两个版本间的 commits
   ↓
4. 对每个 PR 执行 gh pr view 获取详情
   ↓
5. 从 PR body 提取中英文描述
   ↓
6. 识别组件 category
   ↓
7. **实时追加写入** ~changelog.md（每获取一个 PR 就写入）
   ↓
8. 过滤无效 commit（交互确认）
   ↓
9. 分组处理（按组件名）
   ↓
10. 检查描述规范性（交互确认）
    ↓
11. 重新生成不符合规范的描述（如需要）
    ↓
12. 版本确认（minor/patch/不更新）
    ↓
13. 预览确认（交互确认）
    ↓
14. 写入 CHANGELOG.zh-CN.md 和 CHANGELOG.en-US.md
    ↓
15. 清理临时文件 ~changelog.md
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
- 组件名在正文中要出现（如 `Select 修复...`，不是 `修复 Select...`）
- PR body 中没有中英文描述时，使用 PR title 作为后备
