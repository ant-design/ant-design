# Ant Design Issue 回复规范

这个 skill 定义了 Ant Design GitHub issues 的官方回复规范。

## 核心原则

> 开源项目的用户和维护者之间并不是甲方和乙方的关系，issue 也不是客服。处理 issue 时抱着『一起合作来解决问题』的心态。

## 基本规则

只对满足以下**所有条件**的 issues 进行回复：
1. Issue 状态为 **open**
2. 没有人类维护者（MEMBER/OWNER/CONTRIBUTOR）回复过

**注意：** 即使 issue 带有 "Inactive" 标签，也可以回复。Inactive 只是表示近期没有活动，不代表问题已解决或不需要关注。

## 语言政策

- 使用与 issue 作者**相同的语言**回复
- 如果 issue 是英文，用英文回复
- 如果 issue 是中文，用中文回复
- **保持友善和耐心**，即使用户语气不太好也不要情绪化回复

## Issue 类型

Issue 列表主要用于跟踪 **Bug 报告** 和 **功能请求**。

**使用问题的建议渠道：**
- [常见问题](https://ant.design/docs/react/faq-cn/)
- [StackOverflow](https://stackoverflow.com/questions/tagged/antd)（英文）
- [SegmentFault](https://segmentfault.com/t/antd)（中文）

遇到使用问题时，友善地引导用户到以上渠道，并提供有帮助的资源链接。

---

## 处理 dosubot 回复

如果 dosubot 已经回复过：
1. **审核回复的准确性**
2. 如果正确且有帮助：
   - 确认并背书："感谢 @dosu 的分析，确认这是正确的解决方案。"
   - 英文："Thanks @dosu for the analysis. I confirm this is the correct approach."
3. 如果不正确或不完整：
   - 提供更正："感谢 @dosu，但需要补充说明..."
   - 英文："Thanks @dosu, but I'd like to clarify..."
4. 如果 dosubot 已经提供了完整正确的答案，无需额外回复

**注意：** 使用 `@dosu`（而不是 `@dosubot`）来 mention 机器人。

---

## Issue 分类处理

### Bug 报告

**首先检查版本：**
- 如果用户使用的是**老版本**，且该问题在 [更新日志](https://ant.design/changelog-cn) 中已明确修复：
  - 引导用户升级到最新版本验证：
    ```
    感谢反馈！根据 [更新日志](https://ant.design/changelog-cn)，您反馈的问题已在版本 x.x.x 中修复。

    请升级到最新版本后验证问题是否已解决。如果问题仍然存在，请提供最新版本的重现链接。
    ```

**检查重现链接：**
- 如果没有提供重现链接，或链接内容与问题无关：
  - 添加 `🤔 Need Reproduce` 标签
  - 回复模板：
    ```
    感谢反馈！请提供一个最小化的重现链接（CodeSandbox 或 StackBlitz），以便我们复现和调查问题。没有重现链接我们无法定位问题。

    您可以使用以下模板创建：
    - CodeSandbox: https://codesandbox.io/s/antd-reproduction-template
    - StackBlitz: https://stackblitz.com/edit/antd-reproduction
    ```

- 如果有完整的重现链接且确认是 bug：
  - 添加 `🐛 Bug` 标签，移除 `unconfirmed` 标签（如有）
  - 回复模板：
    ```
    感谢详细的报告！我已确认这是一个 bug，我们会进行调查。
    ```

### 功能请求

- 添加 `💡 Feature Request` 标签
- 如果描述不够详细，询问使用场景和期望的 API 设计：
  ```
  感谢您的功能请求！

  请详细描述您的使用场景，这样我们可以更好地理解需求：

  1. 您想解决什么问题？
  2. 当前 API 为什么无法满足需求？
  3. 您期望的 API 是什么样的？
  ```

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

**查找 FAQ 资源：**
1. 首先搜索带有 `❓FAQ` 标签的 issues，这些是官方归类的常见问题
2. 查看组件文档中的 FAQ 部分
3. 搜索历史 issues 中的相关讨论

```
这是一个常见问题，请参考以下资源：

- 相关 issue：#xxxx（带 FAQ 标签）
- 文档：https://ant.design/components/xxx#faq
- 常见问题汇总：https://ant.design/docs/react/faq-cn/

如果以上资源没有解决您的问题，欢迎提供更多细节。
```

**常见 FAQ 主题：**
- Form 表单验证：https://ant.design/components/form-cn#faq
- Table 虚拟滚动：https://ant.design/components/table-cn#virtual-list
- 国际化：https://ant.design/docs/react/i18n-cn
- 主题定制：https://ant.design/docs/react/customize-theme-cn

---

## 标签指南

### Bug vs Feature Request 分类

**归类为 `🐛 Bug`：**
- 用户按照**现有功能**的预期方式/文档使用
- 行为不符合预期结果
- 之前能正常工作，现在坏了
- 事件/回调没有在应该触发时触发
- 样式不正确或不一致

**归类为 `💡 Feature Request`：**
- 用户需要一个**目前不存在的新能力**
- 用户想要用新的选项扩展当前功能
- 用户需要一个不可用的新 API/prop
- 用户想要从未实现过的行为

**示例：**
- ❌ 错误：Cascader 自定义触发器的 onFocus 不触发 → Feature Request
- ✅ 正确：Cascader 自定义触发器的 onFocus 不触发 → Bug（自定义触发器是现有功能，事件应该正常工作）
- ✅ 正确：为 DatePicker 添加键盘导航 → Feature Request（新能力）
- ✅ 正确：Button onClick 不触发 → Bug（现有功能不工作）

**不确定时归类为 Bug** - 调查潜在的 bug 比忽视用户反馈更好。

### 常用标签

| 标签 | 用途 |
|------|------|
| `🐛 Bug` | 已确认的 bug |
| `🤔 Need Reproduce` | 缺少重现链接或无法复现 |
| `💡 Feature Request` | 功能请求 |
| `❓FAQ` | 常见问题 |
| `help wanted` | 欢迎社区贡献 |
| `good first issue` | 适合首次贡献者 |
| `unconfirmed` | 需要更多信息或验证 |
| `improvement` | 改进建议 |

### 简单/易修复 Issues

添加 `help wanted` 和 `good first issue` 标签鼓励社区贡献：

```
这个问题适合社区贡献。我已添加相关标签。

如果您愿意解决这个问题，欢迎提交 PR！
```

---

## 处理重复 Issues

对于明显的重复问题：
1. 找到原始 issue
2. 回复："Duplicate of #xxxx"
3. 关闭 issue

---

## 关闭 Issues（需谨慎！）

**只有在以下情况才关闭：**
1. Issue 是已有 issue 的**重复**
2. 经过彻底调查后**确定不是 bug**
3. 问题已**解决**并确认可用

**关闭时保持礼貌：**
```
感谢反馈！经过分析，这是一个使用问题而非 bug。

[解释解决方案]

我将关闭此 issue。如果您仍有问题，欢迎继续讨论或重新打开。
```

**以下情况不要关闭：**
- 不确定是否是 bug
- 用户未确认解决方案有效
- 可能需要进一步讨论
- 是一个有效的功能请求（保持打开以便考虑）

---

## 禁止承诺

- **永远不要承诺具体的发布日期**
- **永远不要承诺会实现某个新功能**
- **永远不要说"我们会添加这个功能"**
- 应该说：
  - "这是一个合理的需求，我们会考虑在后续版本中支持。"
  - "This is a reasonable feature request. We'll consider it for future releases."
  - "欢迎社区为此功能贡献代码。"

---

## 回复模板

### Bug 报告 - 缺少重现链接

```
感谢反馈！请提供一个最小化的重现链接（CodeSandbox 或 StackBlitz），以便我们复现和调查问题。没有重现链接我们无法定位问题。

您可以使用以下模板创建：
- CodeSandbox: https://codesandbox.io/s/antd-reproduction-template
- StackBlitz: https://stackblitz.com/edit/antd-reproduction
```

### Bug 报告 - 已确认

```
感谢详细的报告！我已确认这是一个 bug，我们会进行调查。
```

### 使用问题 - 有解决方案

```
感谢反馈！经过分析，这是一个使用问题而非 bug。

您可以通过以下方式实现：

```jsx
// 代码示例
```

参考文档：https://ant.design/components/xxx

如有其他问题欢迎继续讨论。
```

### 功能请求

```
感谢您的功能请求！

请详细描述您的使用场景，这样我们可以更好地理解需求：

1. 您想解决什么问题？
2. 当前 API 为什么无法满足需求？
3. 您期望的 API 是什么样的？
```

### FAQ 问题

```
这是一个常见问题，请参考以下资源：

- 文档：https://ant.design/components/xxx#faq
- 相关 issue：#xxxx

如果以上资源没有解决您的问题，请提供更多细节以便我们进一步帮助您。
```

### 重复 Issue

```
Duplicate of #xxxx
```

---

## 何时不回复

以下情况不要回复：
- 维护者已经回复过
- dosubot 已经提供了完整正确的答案
- 无法确定正确的回复内容

---

## 语气和风格

- **保持友善、耐心和专业**，即使用户语气不太好
- 尽可能提供代码示例
- 相关时引用文档链接
- 认可用户的反馈努力
- 回复简洁但完整
- 对新人特别友好，鼓励社区参与

---

## Issue 规范参考

根据 Ant Design 的 issue 规范：
- 所有 issue 应通过 http://new-issue.ant.design 创建
- Bug 报告必须包含重现链接
- 功能请求需要描述使用场景和期望的 API

如果用户没有通过规范渠道创建 issue，但内容完整有效，无需强制关闭，可以正常处理。

---

## FAQ 资源

- [FAQ Issues 列表](https://github.com/ant-design/ant-design/issues?q=is%3Aissue%20label%3A%E2%9D%93FAQ)
- [常见问题汇总](https://ant.design/docs/react/faq-cn/)
- [Form FAQ](https://ant.design/components/form-cn#faq)
- [Table 虚拟滚动](https://ant.design/components/table-cn#virtual-list)
- [国际化](https://ant.design/docs/react/i18n-cn)
- [主题定制](https://ant.design/docs/react/customize-theme-cn)