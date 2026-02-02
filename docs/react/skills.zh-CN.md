---
group:
  title: AI
  order: 0.9
order: 2
title: SKILL.md
tag: New
---

本文说明 Ant Design 技能包的定位、结构与用法，并给出适用范围、触发条件与输出要求。目标是让你快速判断何时调用技能、从哪里开始读、以及期望产出什么。

## 什么是 SKILL.md？ {#what-is-skill-md}

`SKILL.md` 是技能入口文件，用于描述使用边界、触发条件与输出要求。一个技能包通常包含以下内容：

- `SKILL.md`
- `references/`（可选，用于拆分复杂内容）
- `scripts/` 或其他资源（可选）

## 适用范围 {#scope}

适用范围：

- antd 6.x 与 React 18/19 相关的组件选型、用法与表现问题
- 主题与 tokens、ConfigProvider 与 StyleProvider 配置
- SSR/样式顺序/水合相关问题
- 常见交互与可访问性检查点

## 什么时候用这套技能 {#when-to-use}

- 你在做 antd 组件选型或想确认合适的用法
- 主题/样式有冲突，想要可维护的处理方式
- SSR 或样式注入顺序异常
- 你只需要决策建议，不需要长篇教程

## 触发条件 {#triggers}

- 出现跨组件或跨字段联动
- 遇到 SSR/水合或样式顺序问题
- 需要在多种可选方案中做取舍

## 可用资源 {#available-resources}

本仓库内相关技能内容位置：

- `antd-skill/skills/ant-design/SKILL.md`
- `antd-skill/skills/ant-design/references/`

## 输出期望 {#expected-output}

输出通常包含以下内容（按需提供）：

- 推荐的组件与简短理由
- 最小可行的 Provider 配置思路
- 可能的风险点与规避手段
- 命中复杂条件时，给出对应 reference 路径

## 安装 {#install}

优先使用命令行安装：

```bash
pnpx skills add ant-design/antd-skill
# or
npx skills add ant-design/antd-skill
```

## 在编辑器中使用 {#use-in-editor}

如需手动安装，请参考各编辑器官方文档中的技能目录约定与触发方式：

- Cursor Skills 文档：https://cursor.com/cn/docs/context/skills
- Claude Code Skills 文档：https://code.claude.com/docs/en/skills#extend-claude-with-skills
- Trae Skills 文档：https://docs.trae.ai/ide/skills?_lang=zh
- Qoder Skills 文档：https://docs.qoder.com/cli/Skills#skills

## 使用方式 {#usage}

1. 先确定要用的技能：`ant-design` / `ant-design-pro` / `ant-design-x`。
2. 打开对应 `skills/<skill>/SKILL.md`，先看适用范围与输出要求。
3. 复杂场景再查 `skills/<skill>/references/*.md`。
4. 只要决策建议时，主 `SKILL.md` 就够用；不要当成教程。

## 使用案例 {#cases}

以下是可触发该技能的提问示例：

- “我要做 antd 主题定制，优先用 tokens 还是局部样式？”
- “Next.js SSR 下 antd 样式顺序乱了，ConfigProvider 和 StyleProvider 怎么配？”
- “Form 里做跨字段联动校验，用 dependencies 还是 useWatch？”
- “表格要服务端排序/分页，入口应该看哪个 reference？”
- “Upload 做受控 fileList，还要自定义请求，推荐的处理方式是什么？”
- “表单跨字段联动要怎么做？”

## 常见场景入口 {#entry-points}

- 表单联动、动态列表：`references/form-advanced.md`
- 表格分页/排序/虚拟滚动：`references/table-advanced.md`
- 远程搜索与自定义渲染：`references/select-advanced.md`
- 受控上传、自定义请求：`references/upload-advanced.md`
- 异步树、勾选策略：`references/tree-advanced.md`

## 常见问题 {#faq}

- **要代码吗？** 如果你只要决策建议，一般不需要代码；遇到复杂交互再看 reference。
- **版本不明确怎么办？** 默认按 antd 6.x 处理，旧版本请说明。
- **遇到多状态/联动？** 直接看对应 reference，避免把内容挤在主文档里。

## 使用建议 {#usage-tips}

- `SKILL.md` 保持简洁，复杂内容拆到 `references/`。
- 当问题命中复杂条件时，优先引用对应 reference。
