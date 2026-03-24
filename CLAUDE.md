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

## 文档规范

### API 表格格式

英文版：

| Property | Description | Type | Default | Prop Version | [Config](/components/config-provider#component-config) Version |
| --- | --- | --- | --- | --- | --- |
| disabled | Whether the component is disabled | boolean | false | - | - |
| type | Button type | `primary` \| `default` | `default` | - | - |
| loadingIcon | (Global configuration only) Custom loading icon | ReactNode | - | - | 6.2.0 |

中文版：

| 参数 | 说明 | 类型 | 默认值 | 属性版本 | [配置](/components/config-provider#component-config)版本 |
| --- | --- | --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false | - | - |
| type | 按钮类型 | `primary` \| `default` | `default` | - | - |
| loadingIcon | (仅支持全局配置) 自定义加载图标 | ReactNode | - | - | 6.2.0 |

- 字符串默认值用反引号，布尔/数字直接写，无默认值用 `-`
- API 按字母顺序排列，新增属性需声明版本号
- 支持全局配置的属性需在最后一列注明版本号
- 仅支持全局配置的属性需要在描述中用户括号注明

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
- PR 内容默认使用英文
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

### 核心原则

- 文件位置：`CHANGELOG.en-US.md` 和 `CHANGELOG.zh-CN.md`
- 必须同时提供中英文两个版本
- 忽略用户无感知的改动（内部重构、纯测试更新、工具链优化等）
- 描述"对开发者的影响"，而非"具体的实现细节"
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

- 同一组件有 2 条以上改动时，使用 `- 组件名` 作为分类标题
- 单项改动直接写单行条目

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
