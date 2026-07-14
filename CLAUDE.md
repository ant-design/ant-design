# Ant Design 项目开发指南

> 本文件为 AI 编程助手提供项目上下文和开发规范。

## 项目信息

- React 组件库，发布为 npm 包 `antd`
- 使用 TypeScript 和 React 开发
- 采用 CSS-in-JS 架构（基于 `@ant-design/cssinjs`）
- 支持 Design Token 主题系统、暗色模式、RTL 布局、SSR、国际化（150+ 语言）

### 项目结构

```
ant-design/
├── components/              # 组件源代码（84+ 组件）
│   ├── component-name/      # 单个组件目录
│   │   ├── ComponentName.tsx      # 主组件实现
│   │   ├── demo/                  # 演示代码（*.tsx 和 *.md）
│   │   ├── style/                 # 样式系统（index.ts / token.ts）
│   │   ├── __tests__/            # 单元测试
│   │   ├── index.en-US.md        # 英文文档
│   │   ├── index.zh-CN.md        # 中文文档
│   │   └── index.tsx             # 导出入口
│   ├── _util/                   # 共享工具函数库
│   ├── theme/                   # 主题系统
│   └── locale/                  # 国际化文本
├── tests/                       # 测试工具和共享测试
├── docs/                        # 站点文档
├── CHANGELOG.zh-CN.md           # 中文更新日志
└── CHANGELOG.en-US.md           # 英文更新日志
```

---

## 通用编码规范

- 判断数据类型时，优先使用 `components/_util/is.ts` 中已有的方法，例如 `isNumber`、`isString`、`isPlainObject`、`isFunction`、`isThenable`、`isPrimitive`、`isNonNullable`。
- 仅当 `components/_util/is.ts` 中没有合适方法，或当前场景需要更严格、更特殊的判断逻辑时，再使用内联 `typeof`、`instanceof` 等判断方式。

## 样式优先级规范

- 当组件根节点同时支持 ConfigProvider 的 `styles.root`、ConfigProvider 的 `style`、组件自身的 `styles.root` 和组件自身的 `style` 时，优先级从低到高为：ConfigProvider `styles.root` -> ConfigProvider `style` -> 组件 `styles.root` -> 组件 `style`；如在 util 层预合并根节点样式，预合并结果内部应保持前三者的同样顺序，组件自身 `style` 保持最终最高优先级。

---

## Demo 导入规范

- 常规 `components/**/demo/` 文件在引入 Ant Design 组件、组件内部模块、工具方法、变量、类型定义时，一律使用绝对路径导入，不使用相对路径导入。
- `components/**/demo/_semantic*.tsx` 属于语义文档专用 demo，是例外场景：允许通过相对路径引用 `.dumi/hooks/useLocale`、`.dumi/theme/common/*` 等站点侧辅助模块。
- `.dumi/` 目录内部的站点实现文件可按现有目录结构使用相对路径引用本目录模块；当引用仓库内 Ant Design 组件入口时，优先使用项目公开入口或已配置别名。
- 允许的导入形式应优先使用项目公开入口或已配置别名，例如：`antd`、`antd/es/*`、`antd/lib/*`、`antd/locale/*`、`@@/*`。
- `.dumi/*` 不是仓库通用的 TS 路径别名；如需引用 `.dumi` 内部模块，请按文件位置使用相对路径。
- 常规 demo 文件中，禁止使用 `..`、`../xxx`、`../../xxx`、`./xxx` 这类相对路径去引用组件实现、内部模块、方法、变量、类型，包含跨 demo、跨目录复用的场景。
- 常规 demo 与 `.dumi` 文件之间不要互相相对引用（`_semantic*.tsx` 等站点语义 demo 复用 `.dumi` 辅助模块除外）。如果需要复用少量逻辑，优先内联，或提取到可通过绝对路径访问的公共位置。

## Test 导入规范

- 本规范适用于 `components/**/__tests__/` 下的测试文件。
- 在这些目录下引入 Ant Design 组件，或引入组件内部模块、工具方法、变量、类型定义时，一律使用相对路径导入，不使用绝对路径导入。
- 测试文件应优先从当前组件目录、相邻内部模块或共享测试工具目录通过相对路径引用，例如：`..`、`../index`、`../xxx`、`../../_util/*`、`../../../tests/shared/*`。
- 禁止在 `__tests__` 目录下使用 `antd`、`antd/es/*`、`antd/lib/*`、`antd/locale/*`、`.dumi/*`、`@@/*` 这类绝对路径或别名路径去引用仓库内代码。
- 如需引用仓库外第三方依赖，仍按依赖包名正常导入，例如 `react`、`@testing-library/react`、`dayjs`。

---

## 文档规范

### API 表格格式

英文版：

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| disabled | Whether the component is disabled | boolean | false | - | × |
| loadingIcon | (Only supports global configuration) Custom loading icon | ReactNode | - | - | 6.2.0 |
| type | Button type | `primary` \| `default` | `default` | - | ✔ |

中文版：

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false | - | × |
| loadingIcon | (仅支持全局配置) 自定义加载图标 | ReactNode | - | × | 6.2.0 |
| type | 按钮类型 | `primary` \| `default` | `default` | - | ✔ |

列说明：

- 参数：按字母顺序排列，忽略 className, style, onClick, onKeyDown 等通用属性, onChange, onClick 等事件回调放在最后
- 说明：简洁描述参数作用，如果仅支持全局配置需在描述中用括号注明
- 类型：使用 TypeScript 定义的类型
- 默认值：字符串用反引号，布尔/数字直接写，无默认值用 `-`
- 版本：新增属性需声明引入的版本号；上个大版本已存在属性标注 `-`；仅支持全局配置的属性标注 `×`
- 全局配置：支持全局配置的属性需标注版本号；上个大版本已支持的标注 `✔`；不支持全局配置的属性标注 `×`

### 文档锚点 ID 规范

- 中文标题必须手动指定英文锚点：`## 中文标题 {#english-anchor-id}`
- 锚点 ID 符合 `^[a-zA-Z][\w-:\.]*$`，长度不超过 32 字符
- FAQ 章节下的锚点必须以 `faq-` 为前缀
- 同一问题的中英文锚点保持一致

### 国际化规范

- 本地化配置文件：`components/locale/`，命名如 `zh_CN.ts`、`en_US.ts`
- 添加或修改本地化配置时，需同时修改所有语言文件
- 类型入口：`components/locale/index.tsx`

---

## PR 规范

### 标题与内容

- PR 标题始终使用英文，格式：`类型: 简短描述`
- PR 内容默认使用英文，可根据用户语言习惯决定使用中文或英文
- 示例：`fix: fix button style issues in Safari browser`

### PR 模板（必须使用）

- 英文模板：`.github/PULL_REQUEST_TEMPLATE.md`
- 中文模板：`.github/PULL_REQUEST_TEMPLATE_CN.md`
- 使用 `gh pr create` 创建 PR 时，必须手动填充模板内容

### 分支策略

- 新特性开发需基于 `feature` 分支，PR 目标分支也需为 `feature`
- 其余提交至 `master` 分支
- 分支命名规范：
  - 功能开发：`feat/description-of-feature`
  - 问题修复：`fix/issue-number-or-description`
  - 文档更新：`docs/what-is-changed`
  - 代码重构：`refactor/what-is-changed`

### PR 改动类型

- 🆕 新特性提交
- 🐞 Bug 修复
- 📝 文档改进
- 📽️ 演示代码改进
- 💄 样式/交互改进
- 🤖 TypeScript 更新
- 📦 包体积优化
- ⚡️ 性能优化
- 🌐 国际化改进

---

## Changelog 规范

### 适用范围

- 本节仅适用于用户明确要求收集/生成 changelog、准备 release PR、版本发布，或正在编辑 `CHANGELOG.en-US.md` / `CHANGELOG.zh-CN.md` 的场景。
- 普通功能、修复、文档、demo PR 不要求直接修改 `CHANGELOG.en-US.md` / `CHANGELOG.zh-CN.md`；代码 CR 时也不应仅因缺少 CHANGELOG 文件改动而提出 finding。
- 普通 PR 如需填写 PR 模板中的 Change Log，仅描述本 PR 对用户或开发者的影响，或按模板填写 `N/A` / `No changelog required` / `无需更新日志`。正式 CHANGELOG 由 release owner 在发布流程中统一整理。

### 核心原则

- 文件位置：`CHANGELOG.en-US.md` 和 `CHANGELOG.zh-CN.md`
- 必须同时提供中英文两个版本
- 忽略用户无感知的改动（内部重构、纯测试更新、工具链优化等）
- 描述"用户或开发者能感知到的变化"，而非"具体的实现细节"；不要用"传递某配置"、"修改 runtime"、"增加 metadata"等内部实现视角代替效果描述
- 涉及 Design Token 时，必须列出具体新增、修复或变更的 token 名称
- `rc-component` 或其他运行时依赖升级默认不作为 changelog；但如果带来用户可感知能力、行为变化、类型定义改进或包体积收益，必须单独核查并描述影响
- 尽量给出 PR 链接，并统一添加贡献者链接

### 格式规范

#### 条目格式

- **Emoji 置顶**：每条以 Emoji 开头
- **不加冒号**：组件名后不使用英文冒号
- **每条必含组件名**：正文必须出现对应组件名
- **组件名不用反引号**：Modal、Button 等；属性名/API 用反引号
- **中英空格**：中文与英文、数字、链接之间保留一个空格

#### 句式

| 语言 | 格式 | 示例 |
| --- | --- | --- |
| 中文 | `Emoji 动词 组件名 描述`（动词在前） | `🐞 修复 Button 在暗色主题下 \`color\` 的问题。` |
| 英文 | `Emoji 动词 组件名 描述`（动词在前） | `🐞 Fix Button reversed \`hover\` colors in dark theme.` |

#### 分组逻辑

- 同一组件最终有 2 条以上有效改动时，使用 `- 组件名` 作为分类标题
- 单项改动直接写单行条目
- **严格禁止只有 1 条有效 changelog 的组件单独分组**：过滤、合并、移动到 Icon/跨组件分类或其他分类后，必须重新统计各组件有效条目数；最终只有 1 条的组件必须拆回顶层单行条目
- 发布版本 changelog 要按影响排序：最重要的跨版本变化放最前；同为组件分组时，条目多的组件优先

### Emoji 规范

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

每条 Changelog 仅选择一个 Emoji，不要在同一条目中叠加多个 Emoji。

编写 Changelog 时，请参考 `CHANGELOG.zh-CN.md` 和 `CHANGELOG.en-US.md` 中已有条目的格式。

---

## 参考资源

- [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules) - API 命名规范
- [轮值规则和版本发布流程](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B) - 版本发布流程
- [Unique Panel Component](https://github.com/ant-design/ant-design/wiki/Unique-Panel-Component) - 独立面板组件规范

---

## 编码行为准则

旨在减少 LLM 编码中常见错误的行为准则，可与项目特定指令合并使用。

**权衡：** 本准则倾向于"谨慎优于速度"。对于简单任务，请自行判断。

### 1. 先思考再编码

**"不要假设。不要隐藏困惑。呈现权衡。"**

实现之前：

- 明确陈述假设；如果不确定，就提问。
- 当存在多种理解时，逐一列出而非默默选择。
- 如果存在更简单的方案，直接说明并在必要时提出异议。
- 如果有不明白的地方，停下来指出困惑之处，然后提问。

### 2. 简洁优先

**"用最少的代码解决问题。不做臆测性编码。"**

- 不实现超出需求的特性。
- 不为仅使用一次的代码做抽象。
- 不添加未经要求的"灵活性"或"可配置性"。
- 不处理不可能发生的错误场景。
- 如果你写了 200 行但 50 行就够了，那就重写。

问问自己："资深工程师会觉得这过于复杂吗？" 如果是，就简化。

### 3. 精准改动

**"只改必须改的。只清理自己制造的遗留。"**

编辑现有代码时：

- 不要"改善"相邻的代码、注释或格式。
- 不要重构没有问题的代码。
- 即使你习惯不同写法，也要与现有风格保持一致。
- 如果发现无关的废弃代码，提出来而不是直接删除。

当你的改动产生了孤立的代码时：

- 移除因你的改动而变得未使用的 import/变量/函数。
- 不要移除之前就存在的废弃代码，除非被明确要求。

检验标准："每一行改动都应该能追溯到用户的请求。"

### 4. 目标驱动执行

**"定义成功标准。循环验证直到通过。"**

将任务转化为可验证的目标：

- "添加校验" → 为无效输入编写测试，然后使其通过
- "修复 Bug" → 编写复现测试，然后使其通过
- "重构 X" → 确保重构前后测试都通过

对于多步骤任务，简要列出计划：

```
1. [步骤] → 验证：[检查方式]
2. [步骤] → 验证：[检查方式]
3. [步骤] → 验证：[检查方式]
```

"明确的成功标准让你可以独立循环迭代。" 模糊的标准如"让它能用"则需要不断确认。

---

**"以下情况说明本准则生效："** diff 中不必要的改动减少，因过度复杂导致的重写减少，澄清问题发生在实现之前而非犯错之后。
