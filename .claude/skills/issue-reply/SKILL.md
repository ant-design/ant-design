---
name: antd-issue-reply
description: Help maintainers reply to Ant Design GitHub issues following official guidelines. Use this skill when the user asks to handle issues, reply to issues, process issues, check issues, or manage issues for ant-design/ant-design repository. Also use when the user mentions "issue" in the context of antd, Ant Design, or GitHub issue management. This skill provides guidelines for classifying issues (Bug vs Feature Request), handling dosubot replies, using proper labels, writing polite responses, and knowing when to close issues.
---

# Ant Design Issue 回复规范

## 目标

**一、保持社区活跃** - 让用户反馈被及时响应，提升用户参与感和满意度。

**二、提高处理效率** - 减少 open issues 和重复 issues，保持 issues 区整洁有序。

## 核心原则

> 开源项目的用户和维护者之间并不是甲方和乙方的关系，issue 也不是客服。处理 issue 时抱着『一起合作来解决问题』的心态。

## 基本规则

### 一、首次回复

对满足以下**所有条件**的 issues 进行回复：
1. Issue 状态为 **open**
2. 没有人类维护者（MEMBER/OWNER/CONTRIBUTOR）回复过

### 二、检查已回复的 Issues

对于已有 MEMBER/CONTRIBUTOR 回复的 issues，也要检查是否处理妥当：

**需要关注的情况：**
1. 维护者已提出问题/解决方案，但用户**长时间（7天以上）**未回复
2. 问题已明确被解决（用户确认或版本已修复）
3. 维护者已说明这不是 bug，但 issue 仍然 open

**处理方式：**
- 用户长时间未回复 → 关闭 issue 并留言说明
- 问题已解决 → 关闭 issue
- 使用问题但已提供解决方案 → 关闭 issue

**注意：** Inactive 标签只表示近期无活动，不代表已解决，仍可回复。

## 语言政策

- 使用与 issue 作者**相同的语言**回复
- 检查 issue body 的语言，如果是英文则用英文，中文则用中文
- **保持友善和耐心**，即使用户语气不太好

**重要：** 即使 issue 通过 issue-helper 创建（有中文模板），如果用户的描述部分是英文，也应该用英文回复。

---

## Issue 类型

Issue 列表主要用于跟踪 **Bug 报告** 和 **功能请求**。

**使用问题的建议渠道：**
- [常见问题](https://ant.design/docs/react/faq-cn/)
- [StackOverflow](https://stackoverflow.com/questions/tagged/antd)（英文）
- [SegmentFault](https://segmentfault.com/t/antd)（中文）

---

## 处理 dosubot 回复

如果 dosubot 已经回复过：
1. **审核回复的准确性**
2. 正确 → 确认背书："感谢 @dosu 的分析，确认这是正确的解决方案。"
3. 不正确 → 提供更正："感谢 @dosu，但需要补充说明..."
4. 完整正确 → 无需额外回复

**使用 `@dosu`（而非 `@dosubot`）** mention 机器人。

---

## Issue 分类处理

### Bug 报告

**首先检查版本：**
- 老版本 + changelog 中已修复 → 引导用户升级验证

**检查重现链接：**
- 缺少/无关 → 添加 `🤔 Need Reproduce`，请求提供
- 有重现 + 确认 bug → 添加 `🐛 Bug` 标签

### 功能请求

- 添加 `💡 Feature Request` 标签
- 描述模糊 → 询问使用场景和期望 API

### 使用问题

**你可以尝试解决和回复使用问题：**
- 查阅文档，提供解决方案和代码示例
- 如果能解决，直接回复帮助用户

**也可以引入 AI 帮助解答：**
- `@docu` - GitHub Copilot 文档助手
- `@Copilot` - GitHub Copilot

回复示例：
```
感谢反馈！这是一个使用问题，让我尝试帮你解答：

[提供解决方案和代码示例]

参考文档：https://ant.design/components/xxx

如果以上方案不能解决问题，可以尝试 @docu 或 @Copilot 获取更多帮助。
```

**若无法解决，引导用户到其他渠道：**
- [常见问题](https://ant.design/docs/react/faq-cn/)
- [StackOverflow](https://stackoverflow.com/questions/tagged/antd) 或 [SegmentFault](https://segmentfault.com/t/antd)

### FAQ 问题

**查找资源顺序：**
1. 带 `❓FAQ` 标签的 issues
2. 组件文档 FAQ 部分
3. [常见问题汇总](https://ant.design/docs/react/faq-cn/)

---

## Bug vs Feature Request 分类

| 类型 | 特征 |
|------|------|
| **Bug** | 使用现有功能，行为不符合预期；之前正常现在坏了 |
| **Feature Request** | 需要目前不存在的新能力 |

**示例：**
- Cascader onFocus 不触发 → **Bug**（现有功能不工作）
- 添加 DatePicker 键盘导航 → **Feature Request**（新能力）

**不确定时归类为 Bug**

---

## 处理重复 Issues

1. 找到原始 issue
2. 回复："Duplicate of #xxxx"
3. 关闭 issue

---

## 关闭 Issues（需谨慎！）

**可关闭：**
- 重复问题
- 确定不是 bug（使用问题）
- 已解决
- 用户长时间未回复（7天以上）

**关闭时保持礼貌：**

问题已解决：
```
感谢反馈！这个问题已在 [版本号/PR#xxx] 中修复。

我将关闭此 issue。如有其他问题，欢迎继续讨论。
```

使用问题：
```
感谢反馈！经过分析，这是一个使用问题而非 bug。

[解释解决方案]

我将关闭此 issue。如果您仍有问题，欢迎继续讨论或重新打开。
```

用户长时间未回复：
```
由于长时间未收到回复，我将关闭此 issue。

如果问题仍然存在，请提供更多信息后重新打开，或创建新的 issue。
```

**不要关闭：**
- 不确定是否是 bug
- 用户未确认解决方案有效（且未超过等待时间）
- 有效的功能请求
- 正在活跃讨论中的 issue

---

## 禁止承诺

- ❌ 不要承诺发布日期
- ❌ 不要说"我们会添加这个功能"
- ✅ 应该说："这是一个合理的需求，我们会考虑。欢迎社区贡献。"

---

## 何时不回复

- dosubot 已提供完整正确答案
- 无法确定正确的回复内容
- Issue 正在活跃讨论中

## 检查已回复 Issues 的流程

对于已有维护者回复的 issues，按以下流程检查：

```
1. 查看维护者的最后一条评论
   ├─ 是提问/请求更多信息？
   │   └─ 用户是否超过 7 天未回复？
   │       ├─ 是 → 关闭 issue 并留言
   │       └─ 否 → 跳过
   ├─ 是说明解决方案？
   │   └─ 用户是否确认解决？
   │       ├─ 是 → 关闭 issue
   │       └─ 否，且超过 7 天 → 关闭 issue 并留言
   └─ 其他情况 → 跳过
```

---

## 语气和风格

- 保持友善、耐心和专业
- 尽可能提供代码示例
- 引用文档链接
- 对新人友好，鼓励社区参与

---

## 参考资源

详细标签列表和资源链接请参阅 `references/labels-and-resources.md`