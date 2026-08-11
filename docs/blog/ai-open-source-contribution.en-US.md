---
title: 'From Issue to PR: Completing an Open-Source Contribution with Codex and Skills'
date: 2026-08-11
author: QDyanbing
---

Hi, I'm [Yanbing Gao](https://github.com/QDyanbing). I have been contributing actively to the Ant Design community and often use AI agents to investigate problems, read code, and prepare PRs. The repository also includes several Skills (some of which came from workflows I summarized and contributed while doing this work 😁).

This article focuses on three of those Skills. `test-review` checks whether a test is worth keeping, `commit-msg` prepares the commit message, and `create-pr` prepares a PR with the repository template. Together, they cover several repetitive parts of a contribution that still need to follow repository conventions.

Using them is straightforward. When an Issue is already clear, Codex does not need a long prompt. A link and one sentence are enough to begin:

```text
https://github.com/ant-design/ant-design/issues/58884
Analyze how this Issue should be handled. Do not modify code yet.
```

With the link, Codex first reads the Issue, repository rules, related code, and commit history. After a person confirms that the analysis is on the right track, Codex can change the code and tests, then use `test-review` to check the test quality. Codex performs a local review, and a person checks the findings. Finally, a request to commit and create the PR hands the remaining workflow to `commit-msg` and `create-pr`.

## Start from an Issue link {#find-an-issue}

I will use Alert [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) and the corresponding [PR #58885](https://github.com/ant-design/ant-design/pull/58885) as the example. I gave Codex the link and asked for analysis only, with no code changes. This makes it possible to decide whether the behavior is a regression, an intentional design choice, or an implementation gap before any edit begins.

This case came from a small API combination. Alert's top-level `onClose` is deprecated, and the documentation recommends moving it to `closable.onClose`. But after I changed the code to `closable={{ onClose }}`, the Alert no longer showed a close button. I still had to add `closeIcon: true`. The callback was there, but the page gave the user no way to trigger it. That did not match what an object-form `closable` seemed to mean.

I started by saving a minimal reproduction in an antd 6.5.3 CodeSandbox: configure only `closable.onClose`, and the Alert has no close button.

I then asked Codex to search and compare the relevant code, and used Ant Design CLI to look up information for that version:

```bash
antd info Alert --version 6.5.3 --detail --format json
antd doc Alert --version 6.5.3 --lang zh --format json
antd changelog 6.5.2 6.5.3 Alert --format json
antd demo Alert --version 6.5.3 --format json
```

The result was fairly clear. `closable` accepts an object containing `onClose`, and the top-level `onClose` is indeed meant to move to `closable.onClose`. The changelog showed no related behavior change between 6.5.2 and 6.5.3. The closest existing Issue was #53682, which introduced the API but did not mention the missing close button. So I knew I was looking at a separate problem.

## Use the CLI to write a clear Issue {#create-the-issue}

If someone else has already submitted the Issue, this section can be skipped. I found #58884 myself, so I first had to create it before using the Issue link as input for Codex. That meant including the minimal reproduction, steps, expected and actual behavior, and environment details.

`antd bug` puts this information into the Ant Design Issue template. For #58884, I first generated a Chinese JSON preview:

```bash
antd bug \
  --title "Alert 的 closable 仅配置 onClose 时不显示关闭按钮" \
  --reproduction "https://codesandbox.io/p/sandbox/yu-fa-tang-antd-6-5-3-forked-35wfql" \
  --steps "1. 使用 antd 6.5.3 渲染 Alert；2. 仅传入 closable={{ onClose }}；3. 查看 Alert 是否显示关闭按钮，并尝试触发 onClose。" \
  --expected "配置 closable.onClose 后，Alert 应显示默认关闭按钮；点击后关闭 Alert，并触发 onClose 回调。" \
  --actual "Alert 不显示关闭按钮，导致用户无法点击关闭，closable.onClose 也无法触发。" \
  --format json
```

The JSON preview does not submit anything. I checked the title, reproduction link, steps, and expected behavior, then added `--submit` to the same command and let the CLI create [Issue #58884](https://github.com/ant-design/ant-design/issues/58884). I do not let Codex submit automatically, especially while the problem is still unverified.

![Issue #58884 created with Ant Design CLI](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*iSteSqd4qrAAAAAAU7AAAAgAegCCAQ/original)

Once the Issue is clear, Codex and maintainers both work from the same information. Nobody has to guess what the problem is supposed to be.

## Codex analyzes first, then a person confirms the direction {#analyze-the-issue}

After giving Codex the Issue link, I ask it to analyze the problem without changing code. Codex uses the current code and the repository's [AGENTS.md](https://github.com/ant-design/ant-design/blob/master/CLAUDE.md), compares Alert's types and documentation with the shared `useClosable` behavior, and finds this condition inside `isClosable`:

```tsx
if (isPlainObject(closable) && closable.closeIcon) {
  return true;
}
```

This code treated a truthy `closable.closeIcon` as the signal that Alert was closable. The valid `{ onClose }` object therefore fell through to later branches and produced `false`. The fix was direct: an object-form `closable` enables closing by itself and should not depend on a truthy `closeIcon`.

Once I confirmed that this matched the API's expected behavior, I asked Codex to update the code and tests.

## Implement and review the test after confirming the plan {#implement-and-verify}

I let Codex modify code only after confirming the analysis. The instruction can still be short:

```text
Follow the plan above. Run the relevant checks when finished, then use the test-review Skill to review the changed test.
```

The shared `useClosable` logic already treated an object configuration as enabled, so Alert only needed to do the same:

```diff
- if (isPlainObject(closable) && closable.closeIcon) {
+ if (isPlainObject(closable)) {
    return true;
  }
```

I changed the test before touching the implementation. The existing callback-priority case became the regression test: remove `closeIcon: true`, find the button by its accessible role, and keep the callback-priority assertions.

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

With only the test changed, the new case failed because it could not find a `button`; the other tests still passed. After the `isClosable` fix, all 22 Alert tests passed. That red-green sequence showed that the test really reproduced #58884 and that the small change fixed it.

The test never reads `isClosable`, a CSS class, or internal state. It checks what a user can observe: whether the close button appears and whether the callback runs. After implementation, the repository's [test-review Skill](https://github.com/ant-design/ant-design/pull/57628) statically reviews whether the test is worth keeping. It checks for an independent public contract, duplicate coverage, and assertions tied to implementation details. It does not write tests or run them by default.

Producing a passing test is not difficult. The harder question is whether the test is worth keeping. `test-review` gives an opinion based on antd's test criteria, but I still decide whether to keep, rewrite, or remove the case after checking it against the Issue contract.

## Do a local review before opening the PR {#local-code-review}

Once the code and tests pass, I do not open the PR immediately. I ask Codex to review the current change first:

```text
Review the current change. Do not modify code yet.
```

The review checks the implementation, tests, and change scope against the Issue, repository rules, and current diff. I still verify every finding against the latest code. I fix real problems and skip suggestions that do not hold up. After a change, I rerun the relevant checks and ask for another review until no blocking issue or unrelated change remains.

The final local diff contained only two files: a one-line Alert fix and one regression test. I reran the Alert tests, then ran `antd lint`, Prettier, and `git diff --check`; neither the implementation nor the test reported an error. The test review also confirmed that the case checked whether the button appeared and the object callback ran, without using the implementation to prove itself. At this point, I read the complete diff and check results myself before allowing the commit step to begin.

## Commit and create the PR after human confirmation {#create-the-pr}

After local review and human confirmation, the final instruction is also short:

```text
Commit the current changes and create a PR.
```

At the commit stage, Codex first organizes the files to be committed, then invokes `commit-msg` to generate one commit message from the staging area and recent repository style. After the commit, `create-pr` reads the current branch's complete diff against its base, selects the official template, and prepares a PR draft. I still check the target branch, make sure the intended changes are complete, and verify that the PR Change Log describes the user-visible impact accurately.

Here, Change Log means the Chinese and English summary in the PR template. It does not mean editing `CHANGELOG.zh-CN.md` and `CHANGELOG.en-US.md` directly. A regular contribution only needs to explain its impact on users or developers, or say that no update is needed. The release process assembles the formal CHANGELOG later.

These jobs look much the same every time, which makes them a good fit for repository Skills. The Skill already says what to inspect, which template to use, and what to produce. It also evolves with the repository, so contributors do not have to explain antd's conventions to Codex again for every PR. I used three Skills in this contribution:

| Skill | Purpose | Human checkpoint |
| --- | --- | --- |
| [commit-msg](https://github.com/ant-design/ant-design/pull/57203) | Generate one commit message from staged changes and recent repository style | Does it accurately cover every staged change? |
| [create-pr](https://github.com/ant-design/ant-design/pull/57228) | Analyze the complete base-to-branch diff and fill the official PR template | Are the base, title, body, and Change Log correct? |
| [test-review](https://github.com/ant-design/ant-design/pull/57628) | Review whether tests protect independent contracts | Should a test suggestion be accepted, rewritten, or rejected? |

There are no Skill names or extra commands to memorize in Codex. I describe the goal in plain language, and Codex selects the relevant Skill from the intent and current stage. The useful part of a Skill is consistency. For example, `create-pr` reads the full branch; it does not stop at the last Commit. Before it calls `gh pr create`, it shows the base, English title, and Chinese body for confirmation. Codex can organize the material and the Skill can keep the process on track, but a person still decides whether to use the result or perform an external action.

For this change, the commit message was `fix(Alert): show close button for closable onClose`. `create-pr` generated an English title and Chinese body from the complete diff. I checked that the base was `master` and that the Change Log matched the actual impact before opening [PR #58885](https://github.com/ant-design/ant-design/pull/58885). The PR linked the original problem with `Fixes #58884` and explained the API-migration context, the cause, the compatibility boundary, and the regression test. At that point, the Issue, code, tests, and PR description should all tell the same story.

## Remote review, CI, and Merge {#remote-review-and-merge}

Once the PR is open, remote review and CI begin. Codex can organize review comments, inspect CI logs, and prepare a change, but it should not assume that every suggestion is correct.

I check each review comment against the Issue and the earlier analysis:

- Does the comment identify a real behavioral or compatibility problem?
- Would the requested test protect a new independent contract?
- Does it expand the scope beyond the current Issue?
- If it came from AI review, was it verified against the latest code?

For #58885, CodeRabbit found nothing that needed action, and its checks for the title, description, linked Issue, and change scope all passed. That only meant the automated review found no blocker. A maintainer still had to decide whether to accept the change. The same rule applies to other AI reviews: verify a suggestion against the latest code and the Issue before editing anything.

CI checks tests, types, code style, coverage, and the build. If the PR changes the UI, I also open the deployment preview and inspect the result myself.

The first CI round for #58885 ran lint, builds, Node tests, the React 18 and latest-React matrices, dist and dist-min checks, coverage, bundle size, preview deployment, and visual regression. Every automated check passed, modified-line coverage reached 100%, and the visual report found no difference.

![All automated checks passed for PR #58885](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*jZqiQoiEwGkAAAAATOAAAAgAegCCAQ/original)

The screenshot shows every automated check passing while the page still says `Review required`. Those states do not conflict. CI shows that the code passed the project's predefined checks; a maintainer still decides whether the behavior change should be accepted.

When maintainers leave feedback, I first decide whether it should be accepted. If the suggestion holds up, I change the code, rerun the checks, and review the diff again. Automated review and CI found no blocker in #58885. [afc163](https://github.com/afc163) then reviewed and approved the change, and merged the PR into `master`. The merge commit is [`5040df9`](https://github.com/ant-design/ant-design/commit/5040df92921d404b5b494eea911d24516062e813).

After the merge, the `Fixes #58884` line in the PR body made GitHub close the original [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) automatically. That was the end of the path from finding the problem to closing the Issue.

After Merge, I still watch for the release that includes the fix and any follow-up feedback from users. A problem in an underlying rc-component adds another repository fix, a release, and antd verification to the path. The way of working stays the same: make the input clear, keep the evidence, and ask for human confirmation before external actions.

## Looking back at the workflow {#workflow-summary}

When the Issue already exists, the actual conversation can be reduced to four steps.

First, give Codex the link and ask only for analysis:

```text
https://github.com/ant-design/ant-design/issues/58884
Analyze how this Issue should be handled. Do not modify code yet.
```

Second, confirm the analysis and ask Codex to implement the change and invoke `test-review`:

```text
The plan looks correct. Follow it, run the relevant checks, and review the changed test when finished.
```

Third, ask Codex for a local review after the code and tests are complete:

```text
Review the complete local change. Do not modify code yet; report only actionable problems.
```

Fourth, verify every review finding, fix the valid ones, and inspect the complete diff. Once everything is clear, commit and create the PR:

```text
The local review and checks look good. Commit the current changes and create a PR.
```

Behind those four messages, Codex reads the Issue, locates code, and runs checks. `test-review`, `commit-msg`, and `create-pr` handle the repeatable repository workflows assigned to them. A person decides whether the problem is valid, whether the plan is correct, whether review findings should be accepted, and whether to perform the commit and PR actions.

Skills reduce the need to explain repository conventions repeatedly and keep Codex on the same process every time. They improve efficiency, but they do not make design or compatibility decisions for the contributor.

## A final note: where my Issues come from {#my-issue-sources}

The workflow above explains how to complete a contribution after obtaining an Issue, but another question comes up frequently: where can worthwhile Issues be found?

My Issues do not come only from the GitHub list. Community feedback, implementations in other technology stacks, real product scenarios, and local source-code inspections expose different kinds of component-library problems. Regardless of the source, I do not immediately treat a discovery as a bug. I first check versions, search for duplicates, build a minimal reproduction, and identify the relevant contract before deciding whether to create an Issue.

### Ant Design Issues: the most direct and important source {#source-ant-design-issues}

[Ant Design Issues](https://github.com/ant-design/ant-design/issues) is my primary source. It collects real feedback across versions, browsers, framework combinations, and business scenarios. Many of these cases are difficult for the component library's own tests to anticipate.

Rather than coding from the title, I first perform a small triage:

1. Read the full description, reproduction, and comments, separating the observed symptom from the reporter's theory about its cause.
2. Use the CLI to check the API and changelog for the relevant version and confirm that the current version still reproduces the problem.
3. Search duplicate Issues, related PRs, and underlying rc-components to avoid solving the same problem twice.
4. Run the minimal reproduction locally or online and fill in missing steps.
5. After confirming that nobody is working on it, comment with the diagnosis and plan before implementing.

AI is helpful for summarizing long discussions, searching similar reports, and tracing code. Whether something is a bug and what behavior is expected must still be established through documentation, design conventions, and reproducible results. New contributors can begin with `good first issue`; after learning the repository, they can move to `help wanted`, confirmed bugs, and long-standing problems.

### Antdv Next: cross-check component behavior through Vue {#source-antdv-next}

[Antdv Next](https://www.antdv-next.com) is a Vue 3 component library built on the Ant Design design system. It aims to bring Vue projects a design language, component capabilities, and theming experience aligned with antd. If you are building with Vue 3, I recommend trying it in a real project.

It is also a valuable source of potential Issues. The same design goal is implemented separately in React and Vue, making cross-framework comparison useful:

- Do equivalent APIs behave consistently with boundary inputs?
- Are Disabled, Loading, RTL, and keyboard states handled on both sides?
- Do documentation and demos cover cases already addressed by the other implementation?
- Does the Vue implementation contain a clearer solution that suggests checking historical antd logic?
- When antd capabilities are ported, does the process expose an underspecified design contract?

This comparison does not mean the two frameworks should have line-by-line identical implementations. React and Vue have different reactive models, lifecycles, and DOM organizations. Another implementation is evidence for a candidate problem, not the final definition of antd behavior. Before creating an Issue, verify it against Ant Design's public APIs, design semantics, and compatibility requirements.

### Company projects: finding problems in daily development {#source-business-development}

My company's product now uses antd v6. Unlike component demos that isolate one capability, real pages combine Form, Table, Modal, Select, and many other components with business wrappers, access control, asynchronous data, theme overrides, and complex state. Once components enter these long-running scenarios, they encounter a much broader range of inputs and interaction paths. Daily product development is therefore another important source of my Issues.

These problems usually first look like ordinary application bugs: a particular dataset fails to render, focus behaves incorrectly when overlays are combined, or theme configuration does not take effect on one page. During diagnosis, I progressively remove business data, wrappers, and custom styles until the case depends only on antd's public APIs. I then compare the documentation, types, and runtime behavior to confirm that application code is not the cause. Only a problem that remains reproducible outside the company's private environment becomes a minimal public example and an Issue.

This project originally used antd v4 and later upgraded to v6 with [Ant Design CLI](https://github.com/ant-design/ant-design-cli). This experience also gives me a good reason to strongly recommend `@ant-design/cli`, led by [afc163](https://github.com/afc163).

For a similar cross-version upgrade, the CLI can first build a project inventory and provide migration knowledge before AI handles the structured findings in batches:

```bash
antd doctor --format json
antd usage ./src --format json
antd lint ./src --format json
```

The CLI packages APIs, demos, tokens, Semantic DOM, changelogs, and migration knowledge across antd versions into structured data that works offline. It also provides project analysis, diagnostics, migration, and bug-reporting capabilities. During this upgrade, it helped us quickly inventory existing usage and locate changes that needed human confirmation. For people, it reduces repeated searching across historical documentation. For AI, it provides context that is more accurate and version-specific than training data.

### Codex local inspection: finding inconsistencies in similar code {#source-codex-search}

My final source is using Codex to search and read the local repository. It can work with source code, tests, documentation, Git diffs, and repository instructions in the current checkout, and it can run search and validation commands through the integrated terminal. Compared with pasting a code fragment into a chat model, local context is better suited to finding inconsistencies across files and components.

However, “find some bugs for me” is far too broad and often produces possibilities without evidence. I prefer starting from one confirmed rule and asking Codex to perform a bounded horizontal inspection. For example:

- after fixing a shared Hook, search for components that copied the old logic;
- after completing Disabled or Loading behavior in one component, compare similar composite components;
- after correcting API documentation, check types, English documentation, and demos for remaining differences;
- after establishing a style-priority rule, search merge order in other components;
- after changing an underlying package's export boundary, find remaining deep-path imports.

I ask Codex to report candidates without editing code:

```text
Search the repository read-only and do not modify code. Inspect similar implementations against the confirmed rule.

Every candidate must provide:
1. the public contract or existing correct implementation;
2. the specific file, code path, and inconsistency;
3. the user-observable impact;
4. a minimal reproduction or verification procedure;
5. whether an equivalent Issue or PR already exists.

Do not report evidence-poor possibilities as Issues.
```

After receiving candidates, I still evaluate each one: Does it affect real users? Is it supported by an independent contract? Can it be reproduced reliably? Is the expected benefit worth the change cost? Only candidates that pass these checks enter the Issue-creation workflow described at the beginning of this article.

Together, these four sources form a loop: GitHub provides real community feedback, Antdv Next offers a cross-framework reference, company projects cover real production scenarios, and Codex extends a specific fix into a bounded code inspection. The sources differ, but once a problem enters the community, it follows the same path: prove the problem, define the boundary, narrow the change through tests and local review, and move through remote review and CI into Merge. One cycle is complete only when the Issue closes with the merged PR; the next problem found in a product, the community, or the source code begins the loop again.

## Conclusion {#conclusion}

If you are thinking about contributing to an open-source project, pick an Issue you can probably handle. Spending hours on it only to find that it is much bigger than expected is no fun.

If it looks manageable, drop the link into Codex:

```text
Help me take care of this Issue. I don't want to see it again.
```

Let Codex find the code, add the test, and review the change while Skills prepare the commit message and PR. Step in when a decision needs to be made. Once the PR is merged, the Issue really does disappear. There, you have made an open-source contribution.
