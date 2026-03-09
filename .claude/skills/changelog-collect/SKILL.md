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

### 阶段一：生成临时文件

1. 运行 `npx tsx scripts/generate-changelog.ts`
2. 选择起始版本（tag）
3. 选择目标分支
4. 脚本通过 gh CLI 获取 PR 信息
5. 生成临时文件 `~changelog.md`

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

### 阶段二：处理临时文件（按 AGENTS.md 规范）

读取 `~changelog.md` 后，按以下规则处理：

#### 1. 有效性过滤（AGENTS.md 2.1）

**必须过滤掉以下类型**：

- 文档改进（commit message 以 `docs:` 开头）
- 测试用例更新（`test:` 开头）
- 内部重构（`refactor:` 开头，不影响用户）
- 工具链优化（`chore:` 开头）
- CI/CD 更新（`ci:` 开头）

**保留的类型**：

- Bug 修复（`fix:` 开头）
- 新增特性（`feat:` 开头）
- 样式更新（包含 style、css、token 相关）
- 性能优化
- 无障碍增强

**交互确认**：

```
过滤规则确认：
- 将过滤: docs, test, refactor, chore, ci 开头的 commit
- 保留: fix, feat, style, perf, a11y 等
选项：[确认过滤] [不过滤全部] [自定义规则]
```

#### 2. 分组处理（AGENTS.md 2.4）

按组件名分组，规则如下：

**多项改动**（同一组件 ≥2 条）：

```
- 组件名
  - 🐞 描述1
  - 🆕 描述2
```

**单项改动**：直接写，不设分组标题

```
- 🐞 组件名 描述
```

**分组优先级**：

1. 先按组件名分组
2. 同组件多条放一起
3. 单条独立放顶部

#### 3. 描述规范检查（AGENTS.md 2.3）

**中文格式**：

- ✅ Emoji 置顶：`🐞 组件名 描述`
- ✅ 无英文冒号
- ✅ 属性用反引号包裹：`修复 Select `value` 为空的问题`
- ✅ 描述用户的原始问题和对开发者的影响

**英文格式**：

- ✅ Emoji 置顶：`🐞 Fix 组件名 描述`
- ✅ 动词在前：Fix / Add / Support / Refactor / Improve
- ✅ 属性用反引号包裹
- ✅ 开发者视角

**不符合规范的描述处理**：

1. 读取 `~changelog.md` 中的 commit hash
2. 执行 `git show <hash>` 获取代码改动
3. 分析改动内容，生成符合规范的描述
4. 更新临时文件中的 English/Chinese 字段

**交互确认**：

```
发现 N 条不符合规范的描述
选项：[全部重新生成] [逐个确认] [跳过]
```

#### 4. Emoji 自动标记（AGENTS.md 2.5）

根据 commit message 类型自动标记：

| Commit 类型    | Emoji |
| -------------- | ----- |
| fix: / 修复    | 🐞    |
| feat: / 新增   | 🆕    |
| style: / 💄    | 💄    |
| perf: / 性能   | ⚡️    |
| docs:          | 📖    |
| refactor:      | 🛠    |
| a11y: / 无障碍 | ⌨️ ♿ |
| test:          | ✅    |
| chore:         | 🛠    |
| build:         | 🛠    |

#### 5. 输出格式（AGENTS.md 2.6）

**中文版**：

```markdown
## 6.4.0

`2026-03-09`

- ConfigProvider
  - 🆕 ConfigProvider 支持 Modal 的 `maskClosable` 全局配置。[#56739](...)
- Select
  - 🐞 Select 修复 `value` 为空字符串时下拉框高度不正确的问题。[#56976](...)
- 🐞 Input 修复 `variant="borderless"` 时高度与 Select 不一致的问题。[#57014](...)
```

**英文版**：

```markdown
## 6.4.0

`2026-03-09`

- ConfigProvider
  - 🆕 Support ConfigProvider global configuration of `maskClosable` for Modal. [#56739](...)
- Select
  - 🐞 Fix Select incorrect dropdown height when `value` is empty string. [#56976](...)
- 🐞 Fix Input height inconsistency with Select when using `variant="borderless"`. [#57014](...)
```

#### 6. 写入确认（交互式）

**预览确认**：

```
请确认以下内容即将写入 CHANGELOG.zh-CN.md 和 CHANGELOG.en-US.md：

版本: 6.4.0
日期: 2026-03-09
条目数: 12

[预览完整内容] [直接写入] [取消]
```

### 阶段三：写入文件

在 `---` front matter 之后、第一个版本标题之前插入新内容：

1. 读取 CHANGELOG.zh-CN.md
2. 找到 `---` 之后的位置
3. 插入生成的中文 changelog
4. 写入文件

同样流程处理 CHANGELOG.en-US.md

## 完整交互流程

```
1. 运行 npx tsx scripts/generate-changelog.ts
   ↓
2. 选择版本，确认目标分支
   ↓
3. 读取生成的 ~changelog.md
   ↓
4. 过滤无效 commit（交互确认）
   ↓
5. 分组处理（按组件名）
   ↓
6. 检查描述规范性（交互确认）
   ↓
7. 重新生成不符合规范的描述（如需要）
   ↓
8. 预览确认（交互确认）
   ↓
9. 写入 CHANGELOG.zh-CN.md 和 CHANGELOG.en-US.md
   ↓
10. 清理临时文件 ~changelog.md
```

## 相关命令

- `npx tsx scripts/generate-changelog.ts` - 生成临时 changelog
- `git show <hash>` - 查看 commit 详情
- `git log <from>..<to> --oneline` - 查看版本间 commits

## 注意事项

- 需要 gh CLI 认证
- 写入前必须预览确认
- 保持中英文同步更新
- 组件名在正文中要出现（如 `Select 修复...`，不是 `修复 Select...`）
