# Ant Design 官方回复 Skill

这个 skill 帮助按照社区规范对 Ant Design GitHub issues 进行官方回复。

## 基本规则

只对满足以下**所有条件**的 issues 进行回复：
1. 没有人类维护者（MEMBER/OWNER/CONTRIBUTOR）回复过
2. Issue 没有被标记为 "Inactive"

## 语言政策

- 使用与 issue 作者**相同的语言**回复
- 如果 issue 是英文，用英文回复
- 如果 issue 是中文，用中文回复
- 保持与原 issue 相同的语气和正式程度

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

## 处理重复 Issues

对于明显的重复问题：
1. 找到原始 issue
2. 回复："Duplicate of #xxxx"
3. 关闭 issue

示例：
```
Duplicate of #56947
```

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

```
Thanks for reporting! After investigation, this appears to be a usage issue rather than a bug.

[Explain the solution]

I'll close this issue, but feel free to continue the discussion or reopen if needed.
```

**以下情况不要关闭：**
- 不确定是否是 bug
- 用户未确认解决方案有效
- 可能需要进一步讨论
- 是一个有效的功能请求（保持打开以便考虑）

## 禁止承诺

- **永远不要承诺具体的发布日期**
- **永远不要承诺会实现某个新功能**
- **永远不要说"我们会添加这个功能"**
- 应该说：
  - "这是一个合理的需求，我们会考虑在后续版本中支持。"
  - "This is a reasonable feature request. We'll consider it for future releases."
  - "欢迎社区为此功能贡献代码。"

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

### 简单/易修复 Issues

添加标签鼓励社区贡献：
- `help wanted` - 开放贡献的 issues
- `good first issue` - 适合首次贡献者

适用条件：
- 有清晰复现步骤且修复简单的 bug
- 轻微的样式问题
- 文档改进
- 简单的功能添加

回复示例：
```
这个问题适合社区贡献。我已添加 `help wanted` 和 `good first issue` 标签。

如果您愿意解决这个问题，欢迎提交 PR！
```

### 其他标签

- `🐛 Bug` - 已确认的 bug
- `💡 Feature Request` - 功能请求
- `unconfirmed` - 需要更多信息或验证
- `improvement` - 改进建议

## 回复模板

### 1. Bug 报告

**信息不完整：**
```
感谢反馈！请提供一个最小化的 reproduction 链接（CodeSandbox 或 StackBlitz），以便我们复现和调查问题。
```

**完整且已确认：**
```
感谢详细的报告！我已确认这是一个 bug，我们会进行调查。
```

**不是 bug（使用问题）- 解释并礼貌关闭：**
```
感谢反馈！经过分析，这是一个使用问题而非 bug。

[用代码示例解释正确用法]

我将关闭此 issue。如果您仍有问题，欢迎继续讨论或重新打开。
```

### 2. 功能请求

**现有方案可用：**
```
感谢您的建议！目前可以通过现有 API 实现这个功能：

```jsx
// 代码示例
```

这能满足您的需求吗？
```

**没有现有方案：**
```
感谢您的功能请求！请详细描述您的使用场景，这样我们可以更好地理解需求。
```

### 3. 使用问题

**有现有 API：**
```
您可以通过以下方式实现：

```jsx
// 代码示例
```

参考文档：https://ant.design/components/xxx
```

**需要 workaround：**
```
目前组件不支持直接实现这个功能，但可以通过以下方式变通实现：

```jsx
// 变通代码
```
```

### 4. 重复 Issues

```
Duplicate of #xxxx
```

## 何时不回复

以下情况不要回复：
- Issue 有 "Inactive" 标签
- 维护者已经回复过
- dosubot 已经提供了完整正确的答案
- 无法确定正确的回复内容

## 语气和风格

- 保持有帮助和专业
- 尽可能提供代码示例
- 相关时引用文档链接
- 认可用户的反馈努力
- 回复简洁但完整
- 保持礼貌和友好，特别是关闭 issues 时