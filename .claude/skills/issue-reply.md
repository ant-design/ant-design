# Ant Design Issue 回复规范

## 核心原则

> 开源项目的用户和维护者之间并不是甲方和乙方的关系，issue 也不是客服。处理 issue 时抱着『一起合作来解决问题』的心态。

## Issue 类型

Issue 列表主要用于跟踪 **Bug 报告** 和 **功能请求**。

**使用问题的建议渠道：**
- [常见问题](https://ant.design/docs/react/faq-cn/)
- [StackOverflow](https://stackoverflow.com/questions/tagged/antd)（英文）
- [SegmentFault](https://segmentfault.com/t/antd)（中文）

遇到使用问题时，友善地引导用户到以上渠道，并提供有帮助的资源链接。

---

## 分类处理流程

### Bug 报告

| 情况 | 操作 | 标签 |
|------|------|------|
| 缺少重现链接 | 请求提供 | `🤔 Need Reproduce` |
| 有重现链接，确认 bug | 确认回复 | `🐛 Bug` |
| 不是 bug | 说明原因，关闭 | - |

### 功能请求

| 情况 | 操作 |
|------|------|
| 描述清晰 | 添加标签，保持打开 |
| 描述模糊 | 询问使用场景和期望 API |

### 使用问题

友善引导用户到正确的渠道，并提供帮助：

```
感谢反馈！根据您的问题描述，这是关于***的使用问题。

建议您参考以下资源：
- [常见问题](https://ant.design/docs/react/faq-cn/)
- [组件文档](https://ant.design/components/overview-cn)
- 在 [StackOverflow](https://stackoverflow.com/questions/tagged/antd) 或 [SegmentFault](https://segmentfault.com/t/antd) 提问，社区会帮助您

如果您发现这是 Bug 或需要新功能，欢迎补充更多信息重新提交。
```

### FAQ 问题

**查找资源顺序：**
1. 带 `❓FAQ` 标签的 issues
2. 组件文档 FAQ 部分
3. [常见问题汇总](https://ant.design/docs/react/faq-cn/)

---

## 常用标签

| 标签 | 用途 |
|------|------|
| `🐛 Bug` | 已确认的 bug |
| `💡 Feature Request` | 功能请求 |
| `🤔 Need Reproduce` | 缺少重现链接 |
| `❓FAQ` | 常见问题 |
| `help wanted` | 欢迎社区贡献 |
| `good first issue` | 适合新人 |

---

## Bug vs Feature Request 判断

| 类型 | 特征 |
|------|------|
| **Bug** | 使用现有功能，行为不符合预期 |
| **Feature Request** | 需要目前不存在的新能力 |

**示例：**
- Cascader 的 onFocus 不触发 → **Bug**（现有功能不工作）
- 添加 DatePicker 键盘导航 → **Feature Request**（新能力）

**不确定时归类为 Bug**

---

## 回复规范

### 语言
- 与 issue 作者使用**相同语言**
- **保持友善耐心**，即使用户语气不太好

### dosubot 回复

用 `@dosu` mention 机器人。

| 情况 | 处理 |
|------|------|
| 回复正确 | 确认背书 |
| 回复有误 | 补充更正 |
| 回复完整正确 | 无需额外回复 |

### 关闭 Issue

**可关闭情况：**
- 重复问题
- 使用问题
- 确认不是 bug
- 已解决

**关闭时保持礼貌，说明原因，欢迎继续讨论。**

---

## 回复模板

### 缺少重现链接

```
感谢反馈！请提供重现链接（CodeSandbox 或 StackBlitz），没有重现链接我们无法定位问题。

模板：
- CodeSandbox: https://codesandbox.io/s/antd-reproduction-template
- StackBlitz: https://stackblitz.com/edit/antd-reproduction
```

### 确认 Bug

```
感谢报告！我已确认这是一个 bug，我们会调查。
```

### 功能请求（需补充）

```
感谢功能请求！请描述：
1. 您想解决什么问题？
2. 当前 API 为什么无法满足？
3. 期望的 API 是什么？
```

### 重复 Issue

```
Duplicate of #xxxx
```

---

## 禁止事项

- ❌ 承诺发布日期
- ❌ 承诺会实现某功能
- ❌ 说"我们会添加这个功能"

**应该说：**"这是一个合理的需求，我们会考虑。欢迎社区贡献。"

---

## FAQ 资源

- [常见问题汇总](https://ant.design/docs/react/faq-cn/)
- [Form FAQ](https://ant.design/components/form-cn#faq)
- [Table 虚拟滚动](https://ant.design/components/table-cn#virtual-list)
- [国际化](https://ant.design/docs/react/i18n-cn)
- [主题定制](https://ant.design/docs/react/customize-theme-cn)