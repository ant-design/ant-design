---
title: 从 Issue 到 PR：用 Codex 和 Skills 完成一次开源贡献
date: 2026-08-11
author: QDyanbing
---

大家好，我是 [高艳兵](https://github.com/QDyanbing)。最近一直在参与 Ant Design 社区贡献，平时会用 AI Agent 帮忙查问题、读代码和准备 PR。仓库里也内置了不少 Skills（其中一些也是我在参与过程中总结并贡献的 😁）。

这篇文章主要想介绍其中三个 Skills：`test-review` 用来审查测试是否值得保留，`commit-msg` 用来整理提交信息，`create-pr` 用来按仓库模板准备 PR。它们正好覆盖了一次贡献中几个容易重复、又必须遵守仓库规范的步骤。

实际用起来并不复杂。遇到一个已经描述清楚的 Issue，通常不需要给 Codex 写很长的 Prompt，一条链接加一句话就可以开始：

```text
https://github.com/ant-design/ant-design/issues/58884
分析一下这个 Issue 怎么处理，先不要修改代码。
```

拿到链接后，Codex 会先读取 Issue、仓库规则、相关代码和提交历史。人确认分析没有走偏后，再让它处理代码和测试，并用 `test-review` 检查测试质量；完成后做本地 CR，由人检查结果。最后再让 Codex 提交并创建 PR，后面的流程会由 `commit-msg` 和 `create-pr` 接手。

## 从一个 Issue 链接开始 {#find-an-issue}

下面就拿 Alert [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) 和对应的 [PR #58885](https://github.com/ant-design/ant-design/pull/58885) 来走一遍。把链接交给 Codex 后，我先让它分析，不允许直接修改代码。这样可以先判断问题是功能回归、有意设计还是实现遗漏，也能避免一开始就沿着错误方向改代码。

这次碰到的就是一个很小的 API 组合问题。Alert 顶层的 `onClose` 已经废弃，文档建议迁移到 `closable.onClose`。但我把代码改成 `closable={{ onClose }}` 后，Alert 并没有显示关闭按钮，还得额外补上 `closeIcon: true` 才能关闭。回调明明已经传进去了，页面上却没有可以触发它的入口，这和对象形式 `closable` 表达的意思对不上。

于是我先在 antd 6.5.3 的 CodeSandbox 里留了一个最小复现：只配置 `closable.onClose`，Alert 不会显示关闭按钮。

接下来让 Codex 帮忙搜索和对比，再用 Ant Design CLI 查询这个版本的资料：

```bash
antd info Alert --version 6.5.3 --detail --format json
antd doc Alert --version 6.5.3 --lang zh --format json
antd changelog 6.5.2 6.5.3 Alert --format json
antd demo Alert --version 6.5.3 --format json
```

查到的结果比较明确：`closable` 支持包含 `onClose` 的对象配置，顶层 `onClose` 也确实推荐迁移到 `closable.onClose`。Changelog 里没有 6.5.2 到 6.5.3 的相关行为变化。已有 Issue 里最接近的是 #53682，但它只是在引入这项 API，没有提到关闭按钮不显示。因此，这次遇到的是另一个问题。

## 用 CLI 把 Issue 写清楚 {#create-the-issue}

如果接手的是别人已经提交的 Issue，这一节可以直接跳过。#58884 是我自己发现的问题，所以在把 Issue 链接交给 Codex 处理之前，先要把它创建出来。最小复现、操作步骤、预期结果、实际结果和运行环境，这些信息都要写清楚。

`antd bug` 会把这些信息整理成 Ant Design 的 Issue 模板。这次我先用中文生成 #58884 的 JSON 预览：

```bash
antd bug \
  --title "Alert 的 closable 仅配置 onClose 时不显示关闭按钮" \
  --reproduction "https://codesandbox.io/p/sandbox/yu-fa-tang-antd-6-5-3-forked-35wfql" \
  --steps "1. 使用 antd 6.5.3 渲染 Alert；2. 仅传入 closable={{ onClose }}；3. 查看 Alert 是否显示关闭按钮，并尝试触发 onClose。" \
  --expected "配置 closable.onClose 后，Alert 应显示默认关闭按钮；点击后关闭 Alert，并触发 onClose 回调。" \
  --actual "Alert 不显示关闭按钮，导致用户无法点击关闭，closable.onClose 也无法触发。" \
  --format json
```

JSON 预览不会真正提交 Issue。我检查完标题、复现链接、步骤和预期行为后，才在同一组参数后面加上 `--submit`，由 CLI 创建 [Issue #58884](https://github.com/ant-design/ant-design/issues/58884)。这一步我不会交给 Codex 自动执行，问题还没验证清楚时，更不应该直接提交。

![使用 Ant Design CLI 创建的 Issue #58884](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*iSteSqd4qrAAAAAAU7AAAAgAegCCAQ/original)

Issue 写清楚以后，后面无论是 Codex 还是维护者，看到的都是同一套信息，不用再各自猜问题到底是什么。

## Codex 先分析，人确认方向 {#analyze-the-issue}

把 Issue 链接交给 Codex 后，我先让它分析怎么处理，不直接修改代码。Codex 结合当前代码和仓库里的 [AGENTS.md](https://github.com/ant-design/ant-design/blob/master/CLAUDE.md)，对比了 Alert 的类型、文档和通用的 `useClosable` 逻辑，最终把问题定位到了 `isClosable` 里的这个条件：

```tsx
if (isPlainObject(closable) && closable.closeIcon) {
  return true;
}
```

这段逻辑只有在对象里的 `closeIcon` 为真时，才认为 Alert 可以关闭。`{ onClose }` 虽然是合法的 `closable` 对象，却会继续落到后面的分支，最后得到 `false`。修复方向也很明确：对象形式的 `closable` 本身就代表启用关闭能力，不应该再依赖 `closeIcon` 是否为真值。

我确认这个分析符合 API 的预期后，就让 Codex 按照这个方向处理代码和测试。

## 确认方案后再实现并审查测试 {#implement-and-verify}

分析结果确认无误后，我才让 Codex 开始修改代码。实际给出的指令可以很短：

```text
按上面的方案处理，完成后运行相关检查，并使用 test-review Skill 审查本次修改的测试。
```

通用 `useClosable` 已经把对象配置当成启用状态，Alert 这里只要保持一致就行：

```diff
- if (isPlainObject(closable) && closable.closeIcon) {
+ if (isPlainObject(closable)) {
    return true;
  }
```

我没有先改实现，而是先把已有测试改成这次的回归场景：删掉 `closeIcon: true`，通过可访问角色找到按钮，再检查对象回调的优先级。

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

只改测试、不改实现时，新用例会因为找不到 `button` 而失败，其他用例仍然正常通过。改完 `isClosable` 后，Alert 的 22 个测试全部通过。先红后绿，说明这个测试确实复现了 #58884，也能证明这次修改有效。

这个测试没有去读 `isClosable`、CSS 类名或者组件内部状态，只看用户能不能看到关闭按钮、点击后回调有没有执行，检查的是公开行为。实现完成后，[test-review Skill](https://github.com/ant-design/ant-design/pull/57628) 会静态审查这个测试是否值得保留：依据是不是来自公开契约，有没有重复覆盖，是否绑死实现细节。它不负责补测试，也不会默认运行测试。

写一个能通过的测试并不难，难的是判断这个测试值不值得留。`test-review` 会按 antd 的测试准则给出意见，但最后是接受、改写还是删除，仍然要结合 Issue 的约定由人来决定。

## 创建 PR 前，先在本地做一轮 CR {#local-code-review}

代码和测试都跑通后，我不会马上创建 PR，而是先让 Codex 看一遍当前完整改动：

```text
CR 一下当前改动，先不要修改代码。
```

这轮 CR 会结合 Issue、仓库规则和当前 Diff 检查实现、测试与改动范围。Codex 列出的 Finding 不能照单全收，我会回到最新代码里逐条确认：确实有问题就修，建议不成立就跳过。改完以后重新运行相关检查，再做一轮 CR，直到没有阻断问题和无关改动。

这次本地 CR 最后只留下两个文件：Alert 的一行修复和一个回归测试。我重新跑了 Alert 测试，也执行了 `antd lint`、Prettier 检查和 `git diff --check`，实现和测试都没有报错。测试审查也确认，这个用例验证的是按钮是否出现、对象回调是否执行，没有拿内部实现来证明内部实现。到这里，我会再亲自看一遍完整 Diff 和检查结果，确认没有问题后才进入提交阶段。

## 人工确认后，再提交并创建 PR {#create-the-pr}

本地 CR 和人工检查都通过后，最后一条指令同样可以很短：

```text
提交当前改动并创建 PR。
```

进入提交阶段后，Codex 会先整理需要提交的文件，再调用 `commit-msg` 根据暂存区和近期提交风格生成一行提交信息。提交完成后，`create-pr` 会读取当前分支相对基线的完整 Diff，选择官方模板并生成 PR 草稿。这时还要确认 Bug 修复是不是基于正确分支、需要提交的改动全不全，以及 PR 模板里的更新日志能不能准确说明用户会感知到的变化。

这里说的更新日志，是 PR 模板里的中英文说明，不是直接去改 `CHANGELOG.zh-CN.md` 和 `CHANGELOG.en-US.md`。普通贡献只要按模板说清楚这次改动对用户或开发者有什么影响；如果没有可感知变化，写明无需更新即可。正式 CHANGELOG 会在发版时统一整理。

这些工作每次都差不多，很适合交给仓库里的 Skills。检查哪些内容、使用什么模板、最后输出什么，Skill 里都已经写好了，而且会跟着仓库一起更新，不用每次都重新向 Codex 解释 antd 的协作规范。这次主要用到了三个：

| Skill | 作用 | 人工检查点 |
| --- | --- | --- |
| [commit-msg](https://github.com/ant-design/ant-design/pull/57203) | 根据暂存区和近期提交风格生成单行提交信息 | 是否准确覆盖所有暂存改动 |
| [create-pr](https://github.com/ant-design/ant-design/pull/57228) | 分析基线到当前分支的完整 Diff，填写官方 PR 模板 | Base、标题、正文和更新日志是否正确 |
| [test-review](https://github.com/ant-design/ant-design/pull/57628) | 静态审查测试是否保护独立契约 | 是否接受、改写或拒绝测试建议 |

在 Codex 里不用背每个 Skill 的名字和额外命令，直接说目标即可。Codex 会根据当前意图选择对应的 Skill。Skill 真正省事的地方，是每次都会按同一套规则检查。比如 `create-pr` 会读取整个分支，而不是只总结最后一个 Commit；真正调用 `gh pr create` 前，还会把 Base、英文标题和中文正文交给人确认。Codex 可以整理材料，Skill 可以提醒步骤，但结果用不用、外部操作做不做，还是由人决定。

具体到这次修改，提交信息是 `fix(Alert): show close button for closable onClose`。`create-pr` 根据完整 Diff 生成了英文标题和中文正文。我确认 Base 是 `master`，更新日志也和实际影响一致后，才创建 [PR #58885](https://github.com/ant-design/ant-design/pull/58885)。PR 用 `Fixes #58884` 关联原始问题，正文里写清了 API 迁移背景、问题原因、兼容边界和回归测试。走到这里，Issue、代码、测试和 PR 描述应该能互相对得上。

## 远端 Review、CI 和 Merge {#remote-review-and-merge}

PR 创建后，就进入远端 Review 和 CI。Codex 可以帮忙整理 Review 意见、查 CI 日志、准备修改，但不能看到一条建议就默认它是对的。

处理 Review 时，我会把建议放回 Issue 和前面的分析结果里再看一遍：

- 它是否指出了真实的行为或兼容问题？
- 它要求的测试是否保护新的独立契约？
- 它是否扩大了当前 Issue 的范围？
- 如果是 AI Review，这条结论是否已经根据最新代码重新验证？

在 #58885 中，CodeRabbit 没有提出需要处理的问题，标题、描述、Issue 关联和改动范围这些前置检查也都通过了。但这只能说明自动审查没发现阻断项，改动能不能接受，仍然要等维护者 Review。其他 AI Review 也是一样，给出的建议要回到最新代码和 Issue 里验证，不能看到评论就改。

CI 会检查测试、类型、代码规范、覆盖率和构建结果。PR 如果涉及 UI 变化，我还会打开部署预览，自己看一遍实际效果。

PR #58885 的首轮 CI 跑了 lint、构建、Node 测试、React 18 和最新 React 矩阵，还检查了 dist、dist-min、覆盖率、包体积、预览部署和视觉回归。最后所有自动检查都通过了，修改行覆盖率是 100%，视觉报告也没有发现差异。

![PR #58885 的自动检查全部通过](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*jZqiQoiEwGkAAAAATOAAAAgAegCCAQ/original)

截图里所有自动检查都已经通过，但页面上仍然显示 `Review required`。这两个状态并不冲突：CI 只能证明代码通过了项目预设的检查，这项行为变化要不要接受，还得由维护者判断。

维护者提出意见后，我会先判断要不要采纳。建议成立，再改代码、跑检查，然后重新 Review。#58885 的自动 Review 和 CI 都没有发现阻断问题，之后 [afc163](https://github.com/afc163) 完成人工 Review、批准改动，并把 PR 合并进 `master`。对应的 Merge Commit 是 [`5040df9`](https://github.com/ant-design/ant-design/commit/5040df92921d404b5b494eea911d24516062e813)。

代码合并后，PR 正文里的 `Fixes #58884` 让 GitHub 自动关闭了最开始创建的 [Issue #58884](https://github.com/ant-design/ant-design/issues/58884)。到这里，这个问题才算真正走完了从发现到关闭的全过程。

Merge 以后，我还会继续看修复会进入哪个版本，以及发版后有没有新的用户反馈。如果问题出在底层 rc-component，中间还会多出底层仓库修复、发版和 antd 验证。不过做法没有变：每一步都把输入说清楚、把证据留下来，涉及外部操作时再由人确认。

## 回头看这套流程 {#workflow-summary}

如果 Issue 已经存在，实际交流可以压缩成四步。

第一步，把链接交给 Codex，只让它分析：

```text
https://github.com/ant-design/ant-design/issues/58884
分析一下这个 Issue 怎么处理，先不要修改代码。
```

第二步，人工确认分析结果后，让 Codex 实现并调用 `test-review`：

```text
方案没有问题，按这个方向处理。完成后运行相关检查，并审查本次修改的测试。
```

第三步，代码和测试完成后让 Codex 做本地 CR：

```text
对当前完整改动做一次本地 CR，先不要修改代码，只报告可以执行的问题。
```

第四步，逐条确认 CR 结果、修复成立的问题，并检查完整 Diff。确认没有问题后，再提交并创建 PR：

```text
本地 CR 和检查结果都没有问题，提交当前改动并创建 PR。
```

这几句话背后，Codex 负责读 Issue、找代码和执行检查；`test-review`、`commit-msg`、`create-pr` 负责各自已经写进仓库的固定流程。人负责确认问题是否成立、方案是否正确、CR 建议是否要采纳，以及最终是否执行提交和创建 PR。

Skills 减少了反复解释仓库规范的成本，也让 Codex 每次都按同一套流程做事。它们能提高效率，但不会替贡献者做设计和兼容性判断。

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
