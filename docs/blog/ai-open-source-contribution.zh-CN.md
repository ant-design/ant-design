---
title: 从 Issue 到 PR：AI 时代如何高效参与开源组件库
date: 2026-08-11
author: QDyanbing
---

大家好，我是 [高艳兵](https://github.com/QDyanbing)。在参与 Ant Design 社区维护的过程中，AI Agent 已经成为我查找问题、阅读代码和准备 PR 的常用工具；而仓库内沉淀的 Skills，则把测试审查、提交信息和 PR 创建等项目经验变成了 Agent 可以稳定执行的流程。

本文关注的不是“让 AI 替人写完一个 Bug”，而是如何让 AI、Ant Design CLI 和仓库内 Skills 各自做擅长的事：AI 快速搜索和收敛问题范围，CLI 提供匹配当前版本的结构化资料，Skills 复用仓库已经验证过的工作流。贡献者则负责判断问题是否真实、行为是否应该改变、兼容边界在哪里，以及现有证据能否证明修复正确。

下面以我提交的 Alert [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) 和对应的 [PR #58885](https://github.com/ant-design/ant-design/pull/58885) 为例，完整记录如何借助这些能力完成一次真实贡献：从在线复现、CLI 创建 Issue，到 AI 定位、红绿测试、`test-review`、本地 CR，再到 `commit-msg`、`create-pr`、远端 Review、CI 与最终 Merge。

```text
发现问题 → CLI 创建 Issue → AI 定义边界并定位 → 实现与测试 → Skill 审查 → 本地 CR → Skill 创建 PR → Review 与 CI → Merge
```

这条路径的关键不是把整个仓库一次性交给 AI，而是在每个阶段给它明确上下文，并在适合的位置调用仓库 Skill。每一步仍然需要清晰的输入、产出和人工检查点；尤其是创建 Issue、提交代码和创建 PR 这类会改变外部状态的操作，应该在证据齐全、内容预览无误后再执行。

## 发现一个值得解决的 Issue {#find-an-issue}

参与开源项目通常有两个起点。

一种是从社区中寻找已有任务。Ant Design 会使用 [`good first issue`](https://github.com/ant-design/ant-design/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) 标记适合第一次参与的问题，使用 [`help wanted`](https://github.com/ant-design/ant-design/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22help%20wanted%22) 标记希望社区协助的问题。找到目标后，还要确认是否已经有人处理，并阅读相关讨论，避免重复劳动。

另一种是在真实使用、阅读源码或 Review 时发现问题。此时不要急着创建 Issue，先确认：

- 当前使用的是哪个 antd 版本；
- 相关 API 是否存在，或者已经废弃；
- 最新版本是否仍然可以复现；
- 是否已经存在相同 Issue；
- 问题位于 antd，还是底层 `@rc-component/*`。

这次问题来自一个很小的 API 组合：Alert 顶层的 `onClose` 已经标记为废弃，文档推荐迁移到 `closable.onClose`。但把代码改为 `closable={{ onClose }}` 后，Alert 并不会显示关闭按钮；只有继续补上 `closeIcon: true` 才能关闭。回调已经配置，却没有触发回调的入口，这与对象形式 `closable` 所表达的语义并不一致。

我先在 antd 6.5.3 的 CodeSandbox 中保留最小代码和实际结果：只配置 `closable.onClose` 时，Alert 没有关闭按钮。

AI 可以帮助搜索和对比，Ant Design CLI 则可以提供当前版本的结构化资料：

```bash
antd info Alert --version 6.5.3 --detail --format json
antd doc Alert --version 6.5.3 --lang zh --format json
antd changelog 6.5.2 6.5.3 Alert --format json
antd demo Alert --version 6.5.3 --format json
```

CLI 返回的类型和文档都表明：`closable` 支持对象配置，对象中包含 `onClose`；顶层 `onClose` 则推荐迁移到 `closable.onClose`。Changelog 中也没有 6.5.2 到 6.5.3 的相关行为变化。再搜索已有 Issue 后，最接近的 #53682 只是引入这项 API，并没有报告“不显示关闭按钮”，因此可以确认这是一个独立问题。

## 用 CLI 创建可处理的 Issue {#create-the-issue}

确认问题后，下一步不是让 AI 修复，而是先建立一个其他人也能理解和复现的 Issue。高质量 Issue 至少需要包含：最小复现、操作步骤、预期结果、实际结果和运行环境。

`antd bug` 可以将这些信息整理为 Ant Design Issue 模板。这次先使用中文生成 #58884 的 JSON 预览：

```bash
antd bug \
  --title "Alert 的 closable 仅配置 onClose 时不显示关闭按钮" \
  --reproduction "https://codesandbox.io/p/sandbox/yu-fa-tang-antd-6-5-3-forked-35wfql" \
  --steps "1. 使用 antd 6.5.3 渲染 Alert；2. 仅传入 closable={{ onClose }}；3. 查看 Alert 是否显示关闭按钮，并尝试触发 onClose。" \
  --expected "配置 closable.onClose 后，Alert 应显示默认关闭按钮；点击后关闭 Alert，并触发 onClose 回调。" \
  --actual "Alert 不显示关闭按钮，导致用户无法点击关闭，closable.onClose 也无法触发。" \
  --format json
```

预览阶段不会提交 Issue。检查标题、复现链接、步骤和预期行为无误后，再使用同一组参数添加 `--submit`，最终由 CLI 创建 [Issue #58884](https://github.com/ant-design/ant-design/issues/58884)。提交属于外部操作，应该始终由人确认，而不是让 Agent 在尚未验证问题时自动执行。

![使用 Ant Design CLI 创建的 Issue #58884](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*iSteSqd4qrAAAAAAU7AAAAgAegCCAQ/original)

一个完整的 Issue 是后续 AI 协作的第一个稳定上下文。它让 Agent 和维护者从同一组事实出发，而不是各自猜测“问题可能是什么”。

## 写代码前先定义完成标准 {#define-done}

Issue 描述的是用户看到的现象，但不一定直接给出了正确解决方案。让 AI 读完 Issue 就修改代码，往往会过早锁定某个猜测。

我通常先给 Agent 一个只读任务：

```text
先不要修改代码。请阅读 Issue、组件文档、相关实现、已有测试和历史改动：

1. 用一句话描述用户可观察到的问题；
2. 找到触发该行为的调用链；
3. 分开列出已确认事实和仍需验证的推断；
4. 判断是否涉及公开 API 或兼容行为；
5. 给出能够证明修复有效的最小回归场景。
```

在 #58884 中，首先需要区分“对象形式的 `closable` 是否代表启用关闭能力”和“是否必须显式提供关闭图标”这两个问题。对照 Alert 的公开类型、文档以及仓库通用的 `useClosable` 逻辑后，可以确定几个边界：

- `closable={{ onClose }}` 应该显示默认关闭按钮；
- 点击按钮后应关闭 Alert，并调用对象中的 `onClose`；
- `closable.onClose` 继续优先于已经废弃的顶层 `onClose`；
- 不改变布尔形式 `closable`、自定义 `closeIcon` 和其他关闭分支。

这些结论可以整理成一份简短的完成标准：

```text
目标：对象形式的 closable 在没有显式 closeIcon 时仍启用关闭能力。
非目标：不调整图标合并、动画和其他关闭 API。
兼容：保留 closable.onClose 对顶层 onClose 的优先级。
验证：只传 closable.onClose，查询可访问的关闭按钮，点击后断言对象回调被调用一次。
```

完成标准既约束 AI 的实现范围，也是稍后编写测试和 Review PR 的依据。

## 让 AI 基于项目上下文定位问题 {#locate-the-problem}

Agent 能读取整个仓库，不代表一开始就应该让它无边界地搜索所有文件。更有效的方法是围绕完成标准逐步补充上下文。

针对 Alert 问题，需要阅读的内容主要是：

- `components/alert/Alert.tsx` 中 `closable`、`isClosable` 和关闭图标的合并逻辑；
- `components/alert/__tests__/index.test.tsx` 中已有的关闭行为测试；
- Alert 文档中 `closable`、`closeIcon` 和 `onClose` 的契约；
- 通用 `useClosable` Hook 对对象配置的处理方式；
- Issue 讨论、相关历史改动和仓库规范。

仓库规则同样属于上下文。Ant Design 将 Demo、测试、文档、分支和 PR 等规范写在仓库的 [AGENTS.md](https://github.com/ant-design/ant-design/blob/master/CLAUDE.md) 中。让 AI 在行动前读取规则，可以提前避免错误导入、无关重构、错误分支和不符合模板的 PR。

最终定位到 `isClosable` 中的一处条件：

```tsx
if (isPlainObject(closable) && closable.closeIcon) {
  return true;
}
```

这段逻辑把“对象中是否存在真值 `closeIcon`”当成了“是否可关闭”的条件。因此 `{ onClose }` 虽然是合法的 `closable` 对象，却会继续落到后续分支并得到 `false`。问题由此收敛为：

> 对象形式的 `closable` 本身就代表启用关闭能力，不应该再依赖 `closeIcon` 是否为真值。

## 最小实现必须和行为测试一起完成 {#implement-and-verify}

定位原因后，AI 最有价值的工作是寻找仓库已有语义，而不是立即创造新的抽象。通用 `useClosable` 已经把对象配置视为启用状态，因此 Alert 只需让自己的判断保持一致：

```diff
- if (isPlainObject(closable) && closable.closeIcon) {
+ if (isPlainObject(closable)) {
    return true;
  }
```

修复前先把已有测试改造成回归场景：移除 `closeIcon: true`，通过可访问角色查询按钮，再验证对象回调的优先级。

```tsx
const onClose = jest.fn();
const handleClosableClose = jest.fn();

render(
  <Alert title="Warning Text" closable={{ onClose: handleClosableClose }} onClose={onClose} />,
);

fireEvent.click(screen.getByRole('button'));
expect(onClose).toHaveBeenCalledTimes(0);
expect(handleClosableClose).toHaveBeenCalledTimes(1);
```

第一次只修改测试时，它会因为找不到 `button` 而失败，既有用例则正常通过；修改 `isClosable` 后，Alert 测试套件 22 个用例全部通过。这个红绿过程证明测试确实能够复现 #58884，而不是修复完成后才补上的“永远会绿”的断言。

测试没有读取 `isClosable`、CSS 类名或组件内部状态，只观察关闭按钮和回调，因此保护的是独立的用户行为。完成测试后，我又调用了 Ant Design 仓库中的 [test-review Skill](https://github.com/ant-design/ant-design/pull/57628)，专门检查期望是否来自公开契约、是否重复覆盖、是否锁定实现细节，以及测试在修复前能否失败。

这正是仓库 Skill 适合介入的位置：AI 可以很快生成一个“能通过”的测试，但 `test-review` 会按照 antd 已有的测试准则追问这个用例是否真的值得保留。Skill 给出的仍是审查意见，最终是否接受、改写或删除测试，需要贡献者结合 Issue 契约人工确认。

## 创建 PR 前先完成本地 CR {#local-code-review}

实现和测试完成后，不应该直接创建 PR。下一步是基于完整改动做一次本地 Code Review（CR），提前发现维护者在远端 Review 时可能指出的问题。

本地 CR 需要覆盖相对基线的完整分支 Diff，同时确认没有遗漏的暂存或未暂存内容：

```bash
git status --short
git diff <base>...HEAD
git diff
git diff --cached
```

如果使用 Codex，可以直接输入 `/review`，选择基于基线分支或未提交改动进行审查。前者覆盖已经提交的分支 Diff，后者覆盖暂存、未暂存和未跟踪文件；创建 PR 前需要确保两部分都没有遗漏。无论使用内置入口还是普通 Prompt，审查范围都应该明确。

我会让 AI 先扮演 Reviewer，只输出问题，不修改代码：

```text
请基于 Issue、完成标准、仓库规范和 <base>...HEAD 的完整 Diff 做本地 CR，先不要修改代码。

重点检查：
1. 实现是否真正解决 Issue，是否存在错误分支或兼容性回归；
2. 测试是否覆盖公开行为，是否遗漏失败场景或锁定实现细节；
3. 是否存在无关改动、重复逻辑或可复用的仓库能力；
4. 类型、文档、Demo、更新说明和导入方式是否符合仓库规范。

只报告可执行的问题。每条 Finding 给出优先级、文件与行号、触发条件和影响；不要为了输出内容而编造问题。
```

AI 给出的 Finding 仍然只是候选结论，需要逐条回到最新代码验证。成立的问题再修复；不成立的建议应说明原因后忽略，不能为了让 Review 列表清零而修改正确代码。

本地 CR 是一个循环，而不是一次调用：

```text
Review 完整 Diff → 验证 Finding → 修复成立的问题 → 运行相关检查 → 再次 Review
```

当本地 CR 没有阻断问题、Diff 中没有无关改动，并且完成标准都有对应证据时，才进入创建 PR 的阶段。本地 CR 不能替代维护者 Review，但可以把远端沟通集中在真正需要讨论的设计和兼容问题上。

这次本地 CR 最终只保留两个文件：Alert 的一行行为修复，以及一个回归测试。除重新运行 Alert 测试套件外，我还分别执行了 `antd lint`、Prettier 检查和 `git diff --check`；CLI 对实现与测试都返回 0 个问题。测试质量审查也确认，这个用例验证的是“按钮可见并触发对象回调”的独立契约，不是用实现证明实现。

## 让仓库内 Skills 完成 PR 交付 {#create-the-pr}

通过本地 CR 后，代码内容已经基本稳定，接下来才是准备提交信息和 PR。此时仍需要确认 Bug 修复是否基于正确分支、需要提交的改动是否完整，以及文档、Demo 和 PR 模板中的更新日志是否与用户可感知的影响一致。

这里的更新日志指 PR 模板中的双语更新说明，不等于直接编辑 `CHANGELOG.zh-CN.md` 和 `CHANGELOG.en-US.md`。普通贡献只需按模板描述本次改动给用户或开发者带来的变化；如果没有可感知变化，则说明无需更新。正式 CHANGELOG 会在发版流程中统一整理。

这些步骤规则明确、重复度高，非常适合交给仓库内 Skills。它们和通用 Prompt 的区别在于：检查范围、模板和输出要求都跟随仓库维护，贡献者不必每次重新向 AI 解释 antd 的协作规范。与这次贡献直接相关的有：

| Skill | 作用 | 人工检查点 |
| --- | --- | --- |
| [commit-msg](https://github.com/ant-design/ant-design/pull/57203) | 根据暂存区和近期提交风格生成单行提交信息 | 是否准确覆盖所有暂存改动 |
| [create-pr](https://github.com/ant-design/ant-design/pull/57228) | 分析基线到当前分支的完整 Diff，填写官方 PR 模板 | Base、标题、正文和更新日志是否正确 |
| [test-review](https://github.com/ant-design/ant-design/pull/57628) | 静态审查测试是否保护独立契约 | 是否接受、改写或拒绝测试建议 |

在 Codex 中使用这些 Skills 不需要记忆额外命令，直接用自然语言描述目标即可。重要的是把当前阶段和希望保留的人工检查点说清楚，例如：

```text
请使用 test-review Skill 审查本次新增测试是否值得保留，先不要修改代码。
根据当前暂存区和仓库近期风格写一条提交信息。
请使用 create-pr Skill 基于完整分支创建 PR，执行前先预览 Base、标题和正文。
```

使用 Skill 的意义不是少写几段文字，而是让 Agent 每次都执行同样的仓库检查。以 `create-pr` 为例，它不能只总结最后一个 Commit，而需要读取整个分支；真正调用 `gh pr create` 之前，还必须把 Base、英文标题和中文正文交给人确认。AI 负责快速整理，Skill 负责约束执行步骤，人负责最后判断和授权，三者不能互相替代。

对于这个案例，提交信息为 `fix(Alert): show close button for closable onClose`。`create-pr` Skill 基于完整 Diff 生成英文标题和中文正文；我确认 Base 为 `master`、更新日志与实际影响一致后，才创建 [PR #58885](https://github.com/ant-design/ant-design/pull/58885)。PR 通过 `Fixes #58884` 关联原始问题，正文说明 API 迁移背景、根因、兼容边界和回归测试。Issue、完成标准、代码、测试和 PR 描述由此形成同一条证据链。

## 远端 Review、CI 与 Merge {#remote-review-and-merge}

创建 PR 只是进入下一轮验证，而不是流程结束。Agent 可以帮助归纳 Review、定位 CI 日志并提出修改，但不能默认所有建议都正确。

处理 Review 时，我会把建议重新放回完成标准中检查：

- 它是否指出了真实的行为或兼容问题？
- 它要求的测试是否保护新的独立契约？
- 它是否扩大了当前 Issue 的范围？
- 如果是 AI Review，这条结论是否已经根据最新代码重新验证？

在 #58885 中，CodeRabbit 没有给出可执行评论，并确认标题、描述、Issue 关联和改动范围等 PR 前置检查均通过。这并不等于维护者已经批准，也不能代替人工 Review；它只能说明当前没有被自动审查发现的阻断问题。反过来，如果 AI Review 提出建议，也应该重新放回最新代码和完成标准中验证，而不是看到评论就修改。

CI 则负责验证另一组客观条件：相关测试、类型检查、代码规范、覆盖率、构建和必要的视觉回归。对于带有 UI 变化的 PR，还应该检查部署预览，而不是只看任务显示绿色。

#58885 的首轮 CI 覆盖了 lint、构建、Node 测试、React 18 与最新 React 矩阵、dist 与 dist-min、覆盖率、包体积、预览部署和视觉回归。所有自动检查最终通过，修改行覆盖率为 100%，视觉报告也明确显示没有发现差异。

![PR #58885 的自动检查全部通过](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*jZqiQoiEwGkAAAAATOAAAAgAegCCAQ/original)

截图中的自动检查已经全部通过，但页面仍然显示 `Review required`。这正是组件库贡献中容易被忽略的一步：CI 只能证明代码通过了项目预设的检查，最终是否接受这项行为变化，仍然需要维护者判断。

如果维护者提出意见，处理方式和本地 CR 一样：先判断建议是否成立，再修改代码、运行相关检查并重新 Review，而不是为了尽快合并而机械接受所有建议。在 #58885 中，自动 Review 和 CI 没有发现阻断问题，随后 [afc163](https://github.com/afc163) 完成人工 Review 并批准了改动，将 PR 合并进 `master`，对应的 Merge Commit 为 [`5040df9`](https://github.com/ant-design/ant-design/commit/5040df92921d404b5b494eea911d24516062e813)。

PR 正文中的 `Fixes #58884` 也在此时发挥作用：代码合并后，GitHub 自动关闭了最初创建的 [Issue #58884](https://github.com/ant-design/ant-design/issues/58884)。从发现问题、创建 Issue，到实现、测试、本地 CR、远端 Review、CI、Merge 和 Issue 关闭，这次贡献终于形成了一条完整链路。

Merge 之后，还可以继续关注修复进入哪个发布版本，以及新版本发布后是否收到用户反馈。如果问题涉及底层 rc-component，流程中还会多出底层仓库修复、发版和 antd 验证，但每个阶段仍然遵循同样的原则：明确输入、保留证据、人工确认外部操作。

## 用 AI 提速，用仓库 Skills 固化流程 {#workflow-summary}

回顾从 Issue 到 Merge 的过程，AI、CLI、仓库 Skills 和人的分工可以概括为：

| 阶段 | AI、CLI 与仓库 Skills 负责 | 人负责确认 | 阶段产出 |
| --- | --- | --- | --- |
| 发现问题 | 搜索重复 Issue、核对 API 与版本 | 问题是否真实、是否值得处理 | 可复现的问题 |
| 创建 Issue | `antd bug` 整理模板和环境信息 | 内容无误后才提交 | 可被他人处理的 Issue |
| 定义完成标准 | 阅读文档、实现、测试和历史 | 目标、非目标与兼容边界 | 明确的验收条件 |
| 实现与验证 | AI 定位调用链并生成最小补丁和测试候选，`test-review` 审查测试质量 | 方案与测试是否保护公开行为 | 最小 Diff 与回归测试 |
| 本地 CR | 审查完整 Diff、测试质量和仓库规范 | Finding 是否成立、是否仍有阻断问题 | 可以提交给维护者的干净分支 |
| 创建 PR | `commit-msg` 生成提交信息，`create-pr` 按仓库模板生成 PR 草稿 | Base、正文、更新日志和外部提交 | 可 Review 的 PR |
| 远端 Review、CI 与 Merge | 归纳意见、分析日志、准备修正 | 建议是否成立、是否可以 Merge | 合并 PR 并关闭原 Issue |

AI 带来的效率，并不是省略流程，而是更快地查找证据、定位相关代码并让信息在阶段之间传递；仓库 Skills 则把团队已有经验变成可以重复执行的检查。Issue 变成完成标准，完成标准变成代码和测试，本地 CR 将改动收敛为可提交的分支，PR 的 Review 和 CI 最终决定它能否被合并。

工具可以帮助我们更快地执行，Skill 可以帮助我们稳定地复用经验，但三个决定始终需要由贡献者掌握：行为应不应该改变、改动边界在哪里，以及什么证据足以证明它正确。AI 的 Finding、测试建议和 PR 草稿都只能作为候选结果，不能自动变成项目结论。

当这三个问题都有清晰答案时，从 Issue 到 PR 就不再是一连串碰运气的尝试，而是一条可以借助 AI 高效完成、同时保持质量的工程流程。

## 补充：我的 Issue 从哪里来 {#my-issue-sources}

上面的流程解决了“拿到 Issue 后如何完成贡献”，但还有一个经常被问到的问题：去哪里找到值得处理的 Issue？

我的 Issue 并不只来自 GitHub 列表。社区反馈、其他技术栈的实现、真实业务场景和本地源码巡检，会从不同角度暴露组件库的问题。无论来源是什么，我都不会直接把发现当成 Bug，而是先经过版本确认、重复搜索、最小复现和契约判断，再决定是否创建 Issue。

### Ant Design Issues：最直接也最重要的来源 {#source-ant-design-issues}

[Ant Design Issues](https://github.com/ant-design/ant-design/issues) 是我最主要的来源。这里汇集了不同版本、浏览器、框架组合和业务场景下的真实反馈，其中不少问题很难由组件库自身的测试提前覆盖。

我通常不会只看标题就开始编码，而是先完成一次小型分诊：

1. 阅读完整描述、复现和评论，区分用户看到的现象与用户猜测的原因；
2. 使用 CLI 核对对应版本的 API 和 Changelog，确认问题在当前版本是否仍然存在；
3. 搜索重复 Issue、相关 PR 和底层 rc-component，避免重复修复；
4. 本地或在线运行最小复现，补齐缺失的操作步骤；
5. 确认无人处理后留言说明判断和计划，再开始实现。

AI 很适合帮助整理长讨论、搜索相似问题和建立代码调用链，但是否属于 Bug、预期行为是什么，仍要回到文档、设计约定和可复现结果。对第一次贡献的同学，可以先关注 `good first issue`；熟悉仓库后，再从 `help wanted`、已确认 Bug 和长期未解决的问题中寻找任务。

### Antdv Next：从 Vue 实现中交叉检查组件行为 {#source-antdv-next}

[Antdv Next](https://www.antdv-next.com) 是一个基于 Ant Design 设计体系构建的 Vue 3 组件库，目标是让 Vue 项目也能获得与 antd 对齐的设计语言、组件能力和主题体验。如果你正在使用 Vue 3，我也推荐实际体验一下。

对我来说，它同时是一个很有价值的 Issue 来源。相同的设计目标分别由 React 和 Vue 实现，特别适合做横向对比：

- 同名 API 在边界输入下是否表现一致；
- Disabled、Loading、RTL、键盘操作等状态是否有遗漏；
- 文档和 Demo 是否覆盖了另一端已经处理的场景；
- Vue 版本是否有更清晰的实现，可以反向提醒 antd 检查历史逻辑；
- antd 的新能力同步过去时，是否暴露了原设计中没有说明清楚的契约。

这种对比并不是要求两个框架逐行实现一致。React 与 Vue 的响应式模型、生命周期和 DOM 组织方式不同，另一份实现只能作为发现候选问题的线索，不能直接作为 antd 行为的最终标准。真正创建 Issue 前，仍然需要回到 Ant Design 的公开 API、设计语义和兼容要求完成验证。

### 公司业务：从真实项目的日常开发中发现问题 {#source-business-development}

我所在公司的业务项目目前已经使用 antd v6。相比只展示单个能力的组件 Demo，真实页面会组合 Form、Table、Modal、Select 等多个组件，还会叠加业务封装、权限控制、异步数据、主题覆盖和复杂状态。组件一旦进入这些长期运行的场景，就会遇到更丰富的输入与操作路径，因此日常开发本身也是我发现 Issue 的重要来源。

这类问题通常最先表现为一个普通的业务 Bug，例如某组数据无法正确渲染、多个弹层组合后焦点异常，或主题配置在特定页面没有按预期生效。排查时，我会逐层移除业务数据、二次封装和自定义样式，把问题缩小到 antd 的公开 API；再对照文档、类型和组件行为，确认它不是业务代码造成的。只有脱离公司私有环境后仍能稳定复现的问题，才会整理成社区能够运行的最小案例并创建 Issue。

这个项目最早使用的是 antd v4，后来借助 [Ant Design CLI](https://github.com/ant-design/ant-design-cli) 升级到了 v6。借这个机会，也强烈安利一下 [afc163](https://github.com/afc163) 大佬主导开发的 `@ant-design/cli`。

在类似的跨版本升级中，可以先用 CLI 建立项目画像、查询迁移知识，再让 AI 根据结构化结果分批处理：

```bash
antd doctor --format json
antd usage ./src --format json
antd lint ./src --format json
```

CLI 把多个版本的 API、Demo、Token、Semantic DOM、Changelog 和迁移知识整理成了可离线查询的结构化数据，也提供项目扫描、诊断、迁移和 Bug 报告能力。在这次升级中，它帮助我们快速盘点现有用法并定位需要人工确认的改动。对人来说，它减少了在多份历史文档之间反复查找的成本；对 AI 来说，它提供了比训练数据更准确、更匹配当前版本的上下文。

### Codex 本地巡检：从相似代码中发现不一致 {#source-codex-search}

最后一个来源，是使用 Codex 在本地仓库中搜索和阅读代码。它能够结合当前 Checkout 中的源码、测试、文档、Git Diff 和仓库规则工作，也可以通过集成终端执行搜索与验证命令。相比把一段代码复制给对话模型，本地上下文更适合发现跨文件、跨组件的不一致。

不过，“帮我找几个 Bug”是一个过于宽泛的任务，很容易得到只有可能性、没有证据的结果。我更常从一个已经确认的规则出发，让 Codex 做有边界的横向巡检，例如：

- 某个共享 Hook 修复后，搜索其他组件是否复制了旧逻辑；
- 一个组件补齐 Disabled 或 Loading 行为后，对比同类复合组件；
- 某个 API 文档修正后，检查类型、英文文档和 Demo 是否仍有差异；
- 某种样式优先级确定后，搜索其他组件的合并顺序；
- 一个底层依赖调整导出边界后，查找仓库中剩余的深层路径引用。

我会要求 Codex 只输出候选问题，不直接修改代码：

```text
请只读搜索仓库，不要修改代码。围绕已确认的规则检查相似实现。

每个候选问题必须提供：
1. 对应的公开契约或已有正确实现；
2. 具体文件、代码路径和不一致点；
3. 用户可以观察到的影响；
4. 最小复现或可验证步骤；
5. 是否已经存在相同 Issue 或 PR。

证据不足的内容不要作为 Issue 输出。
```

候选结果出来后，我仍然会逐条判断：它是否会影响真实用户，是否有独立契约支持，是否能稳定复现，以及修改成本是否与收益匹配。只有通过这些检查的候选项，才会进入本文开头的 Issue 创建流程。

这四类来源形成了一个循环：GitHub 带来社区的真实反馈，Antdv Next 提供跨框架参照，公司业务覆盖真实生产场景，Codex 则帮助把一次修复扩展为有边界的代码巡检。来源可以不同，但进入社区后都会沿着同一条路径前进：先证明问题，再定义边界，用测试和本地 CR 收敛改动，最后经过远端 Review 与 CI 进入 Merge。一个 Issue 从被发现到随 PR 合并而关闭，才算真正走完一轮；下一次在业务、社区或源码中发现的问题，又会从这里重新开始。

## 结语：把效率交给 AI，把判断留给人 {#conclusion}

回看 #58884 从 Issue 到 Merge 的完整过程，AI 真正提升的是搜索、阅读、归纳和定位的效率：它能快速缩小问题范围、串起跨文件上下文，也能把重复流程交给仓库 Skills 稳定执行。但它不会因为读过更多代码，就自动知道一个行为是否符合组件设计，更不能仅凭一条 Finding 或一个通过的测试决定改动已经正确。

预期行为、API 语义、兼容边界、测试价值和 Review 意见都需要人工判断；创建 Issue、提交代码、创建 PR 和接受修改等外部操作，也需要人在执行前确认。更合适的协作方式不是让 AI 替代贡献者，而是让 AI 找得更快、让 Skills 做得更稳，最后由人对进入仓库的结果负责。
