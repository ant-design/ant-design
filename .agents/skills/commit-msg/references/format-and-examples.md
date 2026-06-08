# Commit 格式与示例

## antd 仓库近期风格参考

近期提交里常见这些写法：

- `fix(site): prevent duplicate API requests for doc contributors`
- `fix(Splitter): set partially defined panel sizes correctly`
- `chore: bump @antfu/eslint-config to 7.7.0`
- `site: fix ThemePreview copy button in dark theme`
- `docs: fix parenthesis typo in Form.useWatch type`
- `ci: skip persist image-snapshots`

可以看出：

- 仓库常用英文
- 常见形式不是单一一种，既有 `type(scope): subject`，也有 `scope: subject`
- `site` 在 antd 中经常直接作为前缀使用

## 常见类型

| type       | 适用场景                         |
| ---------- | -------------------------------- |
| `feat`     | 新功能                           |
| `fix`      | 修 bug                           |
| `docs`     | 文档、说明、示例文字             |
| `refactor` | 重构，不引入新功能，也不是修 bug |
| `test`     | 测试新增或调整                   |
| `chore`    | 依赖、脚本、工程杂项             |
| `ci`       | CI 配置                          |
| `site`     | 文档站、官网、展示层交互         |

## scope 示例（Ant Design 场景）

- 组件：`Button`、`Table`、`Form`、`DatePicker`
- 目录/模块：`site`、`scripts`、`docs`、`theme`
- 宽 scope：`components`

## 选择规则

### 何时用 `fix(Component)`

适用于组件行为修正，例如：

- 交互不符合预期
- 边界状态显示错误
- 类型或逻辑错误影响使用

示例：

- `fix(Table): correct pagination when data is empty`
- `fix(Form): preserve validate status after reset`

### 何时用 `docs`

适用于：

- 只改文档文字
- 改 demo 说明
- 改 README、FAQ、注释示例

示例：

- `docs: update FAQ link in issue template`
- `docs(Button): clarify loading demo description`

### 何时用 `site`

适用于文档站或官网层面的改动，例如：

- 首页展示
- 文档页交互
- 暗色模式下的展示问题

示例：

- `site: add one-click copy theme code button`
- `site: fix ThemePreview copy button in dark theme`

### 何时用 `chore`

适用于：

- 依赖升级
- lint 规则调整
- 脚本维护
- 非业务逻辑的工程改动

示例：

- `chore: bump @biomejs/biome from 2.4.5 to 2.4.6`
- `chore(scripts): update release helper`

## 多改动合并为一行的写法

暂存区同时包含多种小改动时，用更高层级的概括覆盖全部：

- 多个组件小修补 → `chore(components): clean up styles and types`
- 文档 + 代码示例 → `docs: update Button demo and README`
- 修 bug 同时调样式 → `fix(Table): pagination and styling`
- 站点多个交互点一起调整 → `site: refine theme preview interactions`

## 输出要求

- 只输出一行
- 不加反引号
- 不加引号
- 不解释原因，除非用户明确要求
- 尽量不超过 72 个字符

## 示例

**输入**：`git diff --cached` 显示只改了 `components/button/demo/loading.md` 里一段说明。

**输出**：`docs(Button): update loading demo description`

**输入**：暂存区包含 Table 的 type 修正、一处样式、一个 test 文件。

**输出**：`fix(Table): adjust pagination types, styles and test`

**输入**：仅改了一个脚本文件 `scripts/xxx.js`。

**输出**：`chore(scripts): update xxx script`

**输入**：首页主题预览和复制按钮一起调整。

**输出**：`site: refine theme preview copy interactions`
