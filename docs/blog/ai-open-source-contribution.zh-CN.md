---
title: 如何用 AI 和 Skills 降低维护成本
date: 2026-08-11
author: QDyanbing
---

大家好，我是 [高艳兵](https://github.com/QDyanbing)。最近一直在参与 Ant Design 社区维护，平时会用 AI Agent 查问题、读代码和准备 PR。仓库里也有一组跟着代码一起维护的 Skills（其中一些也是我在参与过程中总结并贡献的 😁）。

维护组件库时，真正花时间的往往不只是写代码。一个很小的修复，也要经历 Issue 分析、代码定位、回归测试、本地 CR、提交信息、PR 模板、远端 Review 和 CI。单看每一步都不复杂，但每天重复几次，维护成本就堆起来了。

现在我会把适合自动化的工作交给 Codex，再由仓库里的 Skills 告诉它 antd 在测试、提交和 PR 上具体要检查什么。这篇文章主要介绍三个 Skills：`test-review`、`commit-msg` 和 `create-pr`，以及它们怎样接进一次真实的维护流程。

## 先用一个 Issue 交代背景 {#find-an-issue}

Alert [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) 的问题很简单：文档已经推荐把顶层 `onClose` 迁移到 `closable.onClose`，但只写 `closable={{ onClose }}` 时，Alert 不会显示关闭按钮，回调自然也没有机会触发。

我先在 antd 6.5.3 的 CodeSandbox 里留下最小复现，再用 Ant Design CLI 的 `antd bug` 生成中文 Issue 预览。确认复现链接、步骤、预期结果和实际结果都准确后，才加上 `--submit` 创建 Issue。

![使用 Ant Design CLI 创建的 Issue #58884](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*iSteSqd4qrAAAAAAU7AAAAgAegCCAQ/original)

Codex 读完 Issue、仓库规则和相关代码后，把问题定位到 Alert 对对象形式 `closable` 的判断。最终修复只有一行，并补了一个回归测试；对应的 [PR #58885](https://github.com/ant-design/ant-design/pull/58885) 已经合入 `master`。

Alert 的修复本身并不复杂。更值得展开的是这次维护过程：我只提供 Issue 链接和每个阶段的目标，Codex 负责在仓库里执行，Skills 负责带入项目规则，人只在需要判断和执行外部操作时介入。

## 一条 Issue 链接如何进入维护流程 {#maintenance-workflow}

遇到一个描述清楚的 Issue，我通常先让 Codex 分析，不直接改代码：

```text
https://github.com/ant-design/ant-design/issues/58884
分析一下这个 Issue 怎么处理，先不要修改代码。
```

后面的实现、测试、本地 CR、提交和创建 PR 都可以继续用很短的指令。三个 Skills 不会取代 Codex，也不是彼此独立的工具；它们出现在不同阶段，把仓库已经确认的做法交给 Codex 执行。

![Codex、Skills 与人工确认组成的维护流程](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*WYVwSLqs0mMAAAAAQrAAAAgAeuN6AQ)

三个虚线框分别是复现和修复、CR 和确认、创建和提交。蓝色节点由 Codex 执行，紫色节点是仓库 Skills，橙色节点需要人工确认。CR 是第二阶段的主任务，`test-review` 只是其中的测试专项检查；AI CR 或人工确认没有通过，都会返回修复，完成后重新进入 CR。

## Skills 把仓库经验放进流程里 {#repository-skills}

Ant Design 把 Skills 放在仓库的 [`.agents/skills`](https://github.com/ant-design/ant-design/tree/master/.agents/skills) 目录中。每个 Skill 都会写清楚适用场景、需要读取的上下文、检查方式和输出要求，并随着仓库规则一起更新。

![Ant Design 仓库中的 Skills 目录](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*S2fcRrrlttYAAAAARaAAAAgAeuN6AQ)

这次主要用到三个：

| Skill | 进入流程的时机 | 它替维护者重复检查什么 |
| --- | --- | --- |
| [test-review](https://github.com/ant-design/ant-design/pull/57628) | 实现和测试完成后 | 测试是否来自公开契约、是否重复、是否绑死实现细节 |
| [commit-msg](https://github.com/ant-design/ant-design/pull/57203) | 本地 CR 和人工确认通过后 | 暂存区是否完整，提交信息是否符合近期仓库风格 |
| [create-pr](https://github.com/ant-design/ant-design/pull/57228) | Commit 完成后 | Base、完整分支 Diff、官方模板、标题和更新日志是否正确 |

Codex 会根据当前任务选择对应的 Skill，所以平时直接说目标就行。维护者不用在每个 PR 里重新解释一次测试准则、提交格式和模板要求，规则有调整时也只需要跟着仓库更新 Skill。

## 分析方向先由人确认 {#analyze-the-issue}

拿到 Issue 链接后，Codex 会读取 Issue、当前代码、提交历史和仓库里的 [AGENTS.md](https://github.com/ant-design/ant-design/blob/master/AGENTS.md)，再搜索最相关的实现与测试。#58884 最终定位到 `isClosable` 对对象配置的判断：代码只有在 `closeIcon` 为真时才认为 Alert 可以关闭，忽略了 `{ onClose }` 本身已经是合法的 `closable` 配置。

这一步先停下来由人确认很重要。AI 可以很快缩小范围，但公开 API 应该怎样表现、兼容边界在哪里，不能只根据一段实现直接下结论。我确认分析符合 Alert 文档和通用 `useClosable` 逻辑后，才让 Codex 开始修改。

## 实现之后，用 test-review 检查测试 {#implement-and-verify}

确认方向后，我给 Codex 的指令仍然很短：

```text
按上面的方案处理，完成后运行相关检查，并使用 test-review Skill 审查本次修改的测试。
```

Codex 把对象形式的 `closable` 直接视为启用关闭能力，并把已有测试改成回归场景：不再显式传 `closeIcon: true`，通过可访问角色找到关闭按钮，再断言对象里的回调被调用。

![Alert 回归测试的改动](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*w65HRbSBwlwAAAAARbAAAAgAeuN6AQ)

只改测试时，用例会因为找不到按钮而失败；实现修复后，Alert 的 22 个测试全部通过。`test-review` 接着检查这个测试是否真的保护了公开行为，有没有重复覆盖，或者拿内部实现来证明内部实现。它给出审查意见，最后保留、改写还是删除，仍然由人结合 Issue 判断。

## 创建 PR 前，先在本地做一轮 CR {#local-code-review}

代码和测试通过后，我不会马上创建 PR，而是让 Codex 先看一遍完整改动：

```text
CR 一下当前改动，先不要修改代码。
```

Codex 会结合 Issue、仓库规则和当前 Diff 检查实现、测试与改动范围。它列出的 Finding 不能照单全收，我会逐条回到最新代码里确认；确实成立的再修，修完重新运行检查，直到没有阻断问题和无关改动。

PR #58885 的本地 CR 最后只留下两个文件：Alert 的一行修复和一个回归测试。我重新跑了组件测试、`antd lint`、Prettier 和 `git diff --check`，再亲自看一遍完整 Diff。创建 PR 前完成这轮本地 CR，可以把不少来回修改挡在远端 Review 之前。

## commit-msg 和 create-pr 接手重复工作 {#create-the-pr}

本地 CR 和人工检查都通过后，我只需要告诉 Codex：

```text
提交当前改动并创建 PR。
```

`commit-msg` 会读取暂存区和近期提交风格，生成一行提交信息；`create-pr` 会读取当前分支相对基线的完整 Diff，选择官方模板并准备 PR。它读取的是整个分支，不会只总结最后一个 Commit。

这里仍然有一次人工确认：Bug 修复是否基于正确分支、暂存内容是否完整、PR 的英文标题和中文正文是否准确、模板里的中英文更新日志能否说明用户可感知的变化。确认完成后，Codex 才会执行提交和创建 PR。

PR #58885 最终使用提交信息 `fix(Alert): show close button for closable onClose`。PR 通过 `Fixes #58884` 关联 Issue，正文说明了问题原因、兼容边界和回归测试。Issue、代码、测试和 PR 描述能够互相对应，维护者接手 Review 时就不用重新整理上下文。

## 远端 Review、CI 和 Merge {#remote-review-and-merge}

PR 创建后，Codex 还可以整理 Review 意见和查 CI 日志。不过无论评论来自人还是 AI，都要放回最新代码和 Issue 中验证，不能看到建议就直接改。

PR #58885 的首轮 CI 覆盖了 lint、构建、Node 测试、React 版本矩阵、覆盖率、包体积、预览部署和视觉回归。所有自动检查最终通过，修改行覆盖率是 100%，视觉报告也没有发现差异。

![PR #58885 的自动检查全部通过](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*jZqiQoiEwGkAAAAATOAAAAgAegCCAQ/original)

CI 通过只代表代码达到了仓库预设的可评审状态。之后 [afc163](https://github.com/afc163) 完成人工 Review、批准改动，并把 PR 合并进 `master`；PR 中的 `Fixes #58884` 随后自动关闭了 Issue。

![PR #58885 已合入 master](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*FiD_S4q3qDgAAAAARZAAAAgAeuN6AQ)

## 这套流程降低了哪些维护成本 {#maintenance-cost}

回头看这条流程，AI 和 Skills 主要减少了四类重复投入：

- **找上下文**：Codex 直接在本地读取 Issue、仓库规则、代码、测试和历史改动，维护者不用手工整理文件清单；
- **重复检查**：`test-review`、`commit-msg` 和 `create-pr` 把已经确认的仓库要求放到对应阶段执行；
- **远端返工**：测试审查和本地 CR 提前发现问题，减少 PR 创建后的来回修改；
- **交接说明**：提交信息和 PR 模板来自完整 Diff，Reviewer 更容易看清问题、方案和影响。

省下来的时间可以留给真正需要维护者判断的事情：问题是否成立、公开 API 应该怎样表现、兼容边界在哪里、CR 建议是否采纳，以及这次改动是否可以合并。AI 擅长快速搜索和缩小问题范围，Skills 负责让过程更稳定；最后的决定仍然要由人做。

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

## 结语 {#conclusion}

如果你正打算为开源库做些什么，先挑一个自己大概能接住的 Issue。别忙活半天，最后才发现它牵涉一大片底层设计，那就有点难受了。

觉得问题不大，就把链接丢给 Codex：

```text
帮我把这个问题处理了，我不想再看见它了。
```

接下来让 Codex 找代码、补测试、做 CR，Skills 准备提交信息和 PR；需要判断的地方你再拍板。等 PR 合进去，这个 Issue 就真的从眼前消失了，一次贡献也就完成了。
