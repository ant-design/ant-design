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

#### 1.5 并行获取每个 PR 的详情

**使用并行 subagent 同时获取所有 PR 详情，而不是顺序逐个请求。**

将所有 PR 编号分批（每批最多 10 个），为每批 dispatch 一个 subagent，并行执行：

```
[主流程]
  ├── subagent-1: gh pr view 56001 56002 56003 ... 56010
  ├── subagent-2: gh pr view 56011 56012 56013 ... 56020
  └── subagent-3: gh pr view 56021 56022 ...
```

每个 subagent 执行的命令：

```bash
gh pr view <pr-number> --json title,body,author,number
```

返回字段：

- `title`: PR 标题
- `body`: PR 描述（可能包含中英文 changelog）
- `author`: 提交者
- `number`: PR 编号

所有 subagent 返回后，汇总结果，再统一进行描述提取和写入。

**每处理完一个 PR 后，立即追加写入 `~changelog.md`**。

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

##### 从 PR body 提取并校验中英文描述

**有限使用 PR body 中的 changelog，但必须校验合规性。**

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

**提取后必须按照 antd changelog 规范进行校验，不合规则改写**（见下方"Changelog 合规校验"）。

**如果 PR body 中没有 changelog 内容**，则根据 PR title、body 描述和 commit 信息自动生成符合规范的描述（见下方"无 changelog 时自动生成"）。

##### 过滤规则：哪些 PR 不写入 changelog

以下改动**不应出现**在 changelog 中（用户无感知）：

- 纯内部重构（不影响 API 和行为）
- 纯测试更新（新增/修改测试用例，无功能变更）
- CI/工具链/依赖升级（与组件无关）
- 文档/站点样式微调（不影响组件本身）
- chore、build、ci 类型的 commit

遇到上述类型，在 `~changelog.md` 中标记 `Skip: true`，最终写入时过滤掉。

##### Changelog 合规校验

对从 PR body 提取的描述，逐条检查以下规范，不符合的**必须改写**：

| 规则 | 正确示例 | 错误示例 |
| --- | --- | --- |
| Emoji 必须在**行首** | `🐞 Fix Select height` | `Fix Select height 🐞` |
| 必须以动作动词开头（Emoji 之后） | `🐞 修复 Select ...` / `🆕 新增 Button ...` | `Select 修复...` |
| 正文必须包含**组件名** | `🐞 Fix Select height issue` | `🐞 Fix height issue` |
| 组件名**不加反引号** | `Fix Select height` | `Fix \`Select\` height` |
| **属性名/API 用反引号** | `Fix Select \`value\` prop` | `Fix Select value prop` |
| 组件名后**不加冒号** | `🐞 Fix Select height` | `🐞 Fix Select: height` |
| 中文与英文/数字之间保留空格 | `修复 Select 在暗色主题的问题` | `修复Select在暗色主题的问题` |
| 每条只选一个 Emoji，不叠加 | `🐞 Fix Select ...` | `🐞🆕 Fix Select ...` |
| 描述开发者影响，不描述实现细节 | `Fix Select height when empty` | `Remove minHeight CSS property` |

**Emoji 规范**（完整版，从 CLAUDE.md 同步）：

| Emoji  | 用途                   |
| ------ | ---------------------- |
| 🐞     | 修复 Bug               |
| 💄     | 样式更新或 token 更新  |
| 🆕     | 新增特性 / 新增属性    |
| 🔥     | 极其值得关注的新增特性 |
| 🇺🇸🇨🇳🇬🇧 | 国际化改动             |
| 📖 📝  | 文档或网站改进         |
| ✅     | 新增或更新测试用例     |
| 🛎     | 更新警告/提示信息      |
| ⌨️ ♿  | 可访问性增强           |
| 🗑     | 废弃或移除             |
| 🛠     | 重构或工具链优化       |
| ⚡️     | 性能提升               |

**commit 类型 → Emoji / 动词 映射**：

| commit 前缀                | 中文动词   | 英文动词            | Emoji        |
| -------------------------- | ---------- | ------------------- | ------------ |
| `fix:` / `bug:`            | 修复       | Fix                 | 🐞           |
| `feat:` / `feature:`       | 新增       | Add                 | 🆕           |
| `style:` / `ui:`           | 优化       | Improve             | 💄           |
| `refactor:`                | 重构       | Refactor            | 🛠           |
| `perf:`                    | 提升性能   | Improve performance | ⚡️           |
| `docs:`                    | 更新文档   | Update docs         | 📝           |
| `i18n:` / `locale:`        | 更新国际化 | Update i18n         | 🇺🇸           |
| `deprecate:`               | 废弃       | Deprecate           | 🗑           |
| `chore:` / `test:` / `ci:` | —          | —                   | 跳过，不写入 |

##### 无 changelog 时自动生成

当 PR body 中没有 changelog 内容（无 English/Chinese 标记）时，根据以下信息生成：

1. 优先使用 **PR title**（经过格式标准化，不能原文照抄）
2. 参考 **PR body 的描述内容**（提取关键改动点，描述对开发者的影响）
3. 如有必要，查看 `git show <hash>` 的 diff 内容辅助理解改动

生成规则：

- 根据 PR title 前缀或内容判断动作类型（fix/feat/style 等）
- Emoji 置于**行首**，选择对应的 Emoji 和动词
- 格式：`Emoji 动词 组件名 改动描述`（中英文各一条）
- 描述"对开发者的影响"，而非"具体的实现细节"

**示例**：

```
PR title: fix(Select): fix height issue when value is empty
↓ 自动生成
English: 🐞 Fix Select incorrect height when value is empty
Chinese: 🐞 修复 Select value 为空时高度不正确的问题
```

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

**CLAUDE.md 规范引用：**参考项目根目录 `CLAUDE.md` 中的 Changelog 规范（核心原则、格式规范、Emoji 规范、句式规范）。

根据规范，对 `~changelog.md` 中的条目进行过滤、分组、格式检查，并在必要时进行交互式确认和修改。

#### 过滤规则

- 跳过 `chore:`、`test:`、`ci:`、`build:` 类型的 commit
- 跳过纯文档/站点改动（不影响组件 API 和行为的）
- 跳过纯测试更新和工具链升级

#### 分组逻辑

- **同一组件有 2 条及以上改动时**，使用 `- 组件名` 作为分类标题，改动条目缩进列在其下
- **单项改动**直接写单行条目，不需要标题

**示例（多条）**：

```markdown
- Select
  - 🐞 Fix Select incorrect height when value is empty. [#56976](https://github.com/ant-design/ant-design/pull/56976) [@zombieJ](https://github.com/zombieJ)
  - 💄 Improve Select dropdown animation. [#56980](https://github.com/ant-design/ant-design/pull/56980) [@afc163](https://github.com/afc163)
- 🐞 Fix Button style in Safari. [#56901](https://github.com/ant-design/ant-design/pull/56901) [@li](https://github.com/li)
```

#### 描述与署名补充规则

- Emoji 在行首，动词紧跟其后
- 组件名不加反引号；属性名、API 名用反引号
- 描述"对开发者的影响"，而非"具体实现细节"
- 每条 changelog 统一补充 **PR 链接** 和 **PR 作者链接**，顺序为先 PR 后作者（如 `[#56976](https://github.com/ant-design/ant-design/pull/56976) [@username](https://github.com/username)`），不区分是否团队成员

### 阶段三：写入文件并校验

在 `---` front matter 之后、第一个版本标题之前插入新内容：

1. 读取 CHANGELOG.zh-CN.md
2. 找到 `---` 之后的位置
3. 插入生成的中文 changelog
4. 写入文件

同样流程处理 CHANGELOG.en-US.md

**写入后必须运行 lint 校验**：

```bash
npm run lint:changelog
```

如果 lint 报错，根据错误信息修正对应的 changelog 条目，重新写入，直到 lint 通过。常见错误类型：

- Emoji 格式不符
- 中英文空格缺失
- 组件名使用了反引号
- 版本格式或日期格式不对

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
5. git log 获取两个版本间的 commits，提取所有 PR 编号
   ↓
6. **并行 dispatch subagents** 批量获取 PR 详情（每批最多 10 个）
   ↓
7. 汇总所有 PR 结果，逐条处理：
   ├── 有 changelog → 提取 → **校验合规性** → 不合规则改写
   └── 无 changelog → 根据 PR title/body/diff **自动生成**符合规范的描述
   ↓
8. 识别组件 category
   ↓
9. 追加写入 ~changelog.md
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
17. **运行 `npm run lint:changelog` 校验，有报错则修正并重新写入**
    ↓
18. 清理临时文件 ~changelog.md
    ↓
19. （可选）创建发布 PR，PR body 中直接包含完整的中英文 changelog 内容
```

## 所需命令

此 skill 需要以下命令可用：

- `git tag --list` - 获取版本标签
- `git log <from>..<to> --oneline` - 获取版本间 commits
- `gh pr view <pr-number> --json title,body,author,number` - 获取 PR 详情
- `git show <hash>` - 查看 commit 详情（用于无 changelog 时辅助生成描述）
- `npm version minor` - 升级次版本号（6.3.1 → 6.4.0）
- `npm version patch` - 升级修订版本号（6.3.1 → 6.3.2）
- `cat >> ~changelog.md` 或 Node.js fs.appendFileSync - 追加写入
- `npm run lint:changelog` - 校验 changelog 格式（写入后必须运行）

## 注意事项

- 需要 gh CLI 认证（运行 `gh auth login`）
- 写入前必须预览确认
- 保持中英文同步更新
- 描述以动作开头，并保证正文包含组件名（如 `修复 Select ...`、`Fix Select ...`）
- 统一添加 PR 作者链接（不区分是否团队成员）
- PR body 有 changelog 时，以 PR body 为准，但必须校验并按 antd 规范改写不合规内容
- PR body 无 changelog 时，根据 PR title/body/diff 自动生成，不能只用 PR title 原文照抄
