---
title: 'From Issue to PR: Contributing to Open-Source Component Libraries Efficiently in the AI Era'
date: 2026-08-11
author: QDyanbing
---

Hello, I am [Yanbing Gao](https://github.com/QDyanbing). While contributing to the Ant Design community, AI agents have become regular tools for finding problems, reading code, and preparing PRs. Repository Skills complement them by turning project experience around test review, commit messages, and PR creation into workflows that agents can execute consistently.

This article is not about asking AI to finish a bug on a contributor's behalf. It is about giving AI, Ant Design CLI, and repository Skills the work they do best: AI searches quickly and narrows the problem scope, the CLI provides structured information for the relevant version, and Skills reuse workflows that the repository has already validated. Contributors still decide whether the problem is real, whether behavior should change, where compatibility boundaries lie, and whether the available evidence proves the fix.

Using my Alert [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) and its corresponding [PR #58885](https://github.com/ant-design/ant-design/pull/58885), the following sections show how these capabilities supported a real contribution: reproducing the problem, creating the Issue with the CLI, locating the cause with AI, running a red-green regression test, invoking `test-review`, completing local review, using `commit-msg` and `create-pr`, handling remote review and CI, and finally merging.

```text
Find a problem → Create the Issue with CLI → Define scope and locate with AI → Implement and test → Review with a Skill → Local review → Create the PR with a Skill → Review and CI → Merge
```

The point is not to hand the entire repository to AI at once. It is to provide explicit context at every stage and invoke a repository Skill at the right checkpoint. Every step still needs clear inputs, outputs, and human review. External actions such as creating an Issue, committing code, and opening a PR should happen only after the evidence and generated content have been checked.

## Find an Issue worth solving {#find-an-issue}

Open-source contributions usually begin in one of two ways.

The first is choosing an existing community task. Ant Design uses [`good first issue`](https://github.com/ant-design/ant-design/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) for approachable first contributions and [`help wanted`](https://github.com/ant-design/ant-design/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22help%20wanted%22) when community help is welcome. Before taking one, check whether someone is already working on it and read the discussion to avoid duplicated effort.

The second is discovering a problem while using the library, reading source code, or reviewing changes. Before creating an Issue, verify:

- which antd version is in use;
- whether the relevant API exists or is deprecated;
- whether the latest version still reproduces the problem;
- whether a duplicate Issue already exists;
- whether the problem belongs to antd or an underlying `@rc-component/*` package.

This issue came from a small API combination. Alert's top-level `onClose` is deprecated in favor of `closable.onClose`. After migrating to `closable={{ onClose }}`, however, the Alert did not render a close button. Closing worked only after adding `closeIcon: true`. The callback was configured, but the user had no way to trigger it, which did not match the meaning of an object-form `closable` configuration.

I first kept the smallest possible example and its visible result in an antd 6.5.3 CodeSandbox: when only `closable.onClose` is configured, the Alert has no close button.

AI can search and compare evidence, while Ant Design CLI provides structured, version-aware information:

```bash
antd info Alert --version 6.5.3 --detail --format json
antd doc Alert --version 6.5.3 --lang zh --format json
antd changelog 6.5.2 6.5.3 Alert --format json
antd demo Alert --version 6.5.3 --format json
```

The types and documentation both showed that `closable` accepts an object containing `onClose`, while the top-level `onClose` is deprecated. The changelog contained no related behavior change between 6.5.2 and 6.5.3. A duplicate search found that the closest report, #53682, introduced the API but did not report the missing close button. This was therefore an independent bug.

## Create an actionable Issue with the CLI {#create-the-issue}

Once the problem is confirmed, do not ask AI to fix it yet. First create an Issue that another contributor can understand and reproduce. A useful Issue needs a minimal reproduction, steps, expected behavior, actual behavior, and environment details.

`antd bug` formats this information using the Ant Design Issue template. For #58884, I first generated a Chinese JSON preview:

```bash
antd bug \
  --title "Alert 的 closable 仅配置 onClose 时不显示关闭按钮" \
  --reproduction "https://codesandbox.io/p/sandbox/yu-fa-tang-antd-6-5-3-forked-35wfql" \
  --steps "1. 使用 antd 6.5.3 渲染 Alert；2. 仅传入 closable={{ onClose }}；3. 查看 Alert 是否显示关闭按钮，并尝试触发 onClose。" \
  --expected "配置 closable.onClose 后，Alert 应显示默认关闭按钮；点击后关闭 Alert，并触发 onClose 回调。" \
  --actual "Alert 不显示关闭按钮，导致用户无法点击关闭，closable.onClose 也无法触发。" \
  --format json
```

Previewing does not submit the Issue. After checking the title, reproduction, steps, and expected behavior, I ran the same command with `--submit`, and the CLI created [Issue #58884](https://github.com/ant-design/ant-design/issues/58884). Submission is an external action and should always require human confirmation instead of being performed automatically before the bug is verified.

![Issue #58884 created with Ant Design CLI](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*iSteSqd4qrAAAAAAU7AAAAgAegCCAQ/original)

A complete Issue becomes the first stable context for later AI collaboration. It gives the agent and maintainers the same facts instead of separate guesses about what the problem might be.

## Define done before writing code {#define-done}

An Issue describes what a user observed, but it does not necessarily provide the correct solution. Letting AI edit code immediately after reading the Issue often locks the task to an early assumption.

I usually begin with a read-only request:

```text
Do not modify code yet. Read the Issue, component documentation, relevant implementation, existing tests, and history:

1. Describe the user-observable problem in one sentence.
2. Locate the call chain that produces the behavior.
3. Separate confirmed facts from assumptions that still need verification.
4. Identify public APIs and compatibility behavior involved.
5. Propose the smallest regression scenario that proves the fix.
```

For #58884, the first question was whether an object-form `closable` enables closing by itself or only when it contains an explicit icon. Comparing Alert's public types and documentation with the repository's shared `useClosable` behavior established several boundaries:

- `closable={{ onClose }}` should render the default close button;
- clicking it should close the Alert and invoke the object callback;
- `closable.onClose` should remain higher priority than the deprecated top-level `onClose`;
- boolean `closable`, custom `closeIcon`, and other closing branches should remain unchanged.

These conclusions can be expressed as a compact definition of done:

```text
Goal: An object-form closable enables closing even without an explicit closeIcon.
Non-goals: Do not change icon merging, animation, or other closing APIs.
Compatibility: Keep closable.onClose higher priority than the top-level onClose.
Verification: Pass only closable.onClose, query the accessible close button, click it, and assert that the object callback runs once.
```

The definition of done constrains the AI implementation and later becomes the basis for tests and PR review.

## Let AI locate the problem using project context {#locate-the-problem}

An agent may be able to read the entire repository, but beginning with an unbounded search is rarely effective. It is better to expand the context gradually around the definition of done.

For this Alert issue, the relevant context was mainly:

- `closable`, `isClosable`, and close-icon merging in `components/alert/Alert.tsx`;
- existing closing tests in `components/alert/__tests__/index.test.tsx`;
- the documented contract of `closable`, `closeIcon`, and `onClose`;
- the shared `useClosable` Hook's treatment of object configurations;
- related Issues, history, and repository contribution rules.

Repository rules are also part of the context. Ant Design records demo, test, documentation, branch, and PR conventions in the repository's [AGENTS.md](https://github.com/ant-design/ant-design/blob/master/CLAUDE.md). Asking AI to read those rules before acting helps prevent invalid imports, unrelated refactoring, wrong target branches, and malformed PRs.

The investigation converged on one condition inside `isClosable`:

```tsx
if (isPlainObject(closable) && closable.closeIcon) {
  return true;
}
```

It used a truthy `closable.closeIcon` as the condition for enabling closing. As a result, the valid `{ onClose }` object fell through to later branches and produced `false`. The problem could now be stated precisely:

> An object-form `closable` enables closing by itself and should not depend on a truthy `closeIcon`.

## Implement minimally and verify behavior together {#implement-and-verify}

Once the cause is located, the most useful job for AI is finding existing repository semantics, not immediately inventing a new abstraction. The shared `useClosable` logic already treated an object configuration as enabled, so Alert only needed to align its condition:

```diff
- if (isPlainObject(closable) && closable.closeIcon) {
+ if (isPlainObject(closable)) {
    return true;
  }
```

Before changing the implementation, I converted the existing callback-priority test into the regression case: remove `closeIcon: true`, query the button by its accessible role, and keep the callback-priority assertions.

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

With only the test changed, it failed because no `button` could be found while all existing cases passed. After the `isClosable` fix, all 22 Alert tests passed. This red-green sequence proved that the test reproduced #58884 rather than being an assertion added only after the fix.

The test does not inspect `isClosable`, CSS classes, or internal state. It observes only the close button and callbacks, so it protects independent user behavior. After completing the test, I invoked the repository's [test-review Skill](https://github.com/ant-design/ant-design/pull/57628) to check whether the expectation came from a public contract, duplicated coverage, locked implementation details, and failed before the fix.

This is exactly where a repository Skill is useful. AI can quickly generate a test that passes, but `test-review` applies antd's test criteria and asks whether that case deserves to remain. Its output is still review advice: the contributor must decide whether to accept, rewrite, or remove the test in light of the Issue's contract.

## Complete a local review before creating the PR {#local-code-review}

Do not create a PR immediately after implementation and tests are finished. First perform a local Code Review (CR) over the complete change to catch problems that maintainers would otherwise find during remote review.

The local review should cover the full branch diff against its base and confirm that no staged or unstaged changes have been missed:

```bash
git status --short
git diff <base>...HEAD
git diff
git diff --cached
```

When using Codex, enter `/review` and choose either a review against the base branch or a review of uncommitted changes. The first covers committed branch changes; the second covers staged, unstaged, and untracked files. Before creating the PR, make sure neither scope is omitted. The review scope should remain explicit whether you use the built-in entry point or a regular prompt.

I first ask AI to act only as a reviewer and report findings without editing code:

```text
Review the complete <base>...HEAD diff using the Issue, definition of done, and repository rules. Do not modify code yet.

Focus on:
1. whether the implementation really solves the Issue and introduces behavioral or compatibility regressions;
2. whether tests protect public behavior, miss failure cases, or lock implementation details;
3. whether the diff contains unrelated changes, duplicated logic, or ignores existing repository capabilities;
4. whether types, documentation, demos, update notes, and imports follow repository rules.

Report only actionable problems. Give every finding a priority, file and line, trigger condition, and impact. Do not invent findings merely to produce output.
```

AI findings are still candidate conclusions and must be verified against the latest code. Fix findings that are valid. Explain and ignore suggestions that are not; do not change correct code merely to empty the review list.

Local review is a loop rather than a single invocation:

```text
Review the complete diff → Verify findings → Fix valid problems → Run relevant checks → Review again
```

Only move on to PR creation when no blocking finding remains, the diff contains no unrelated changes, and every acceptance criterion has supporting evidence. Local review does not replace maintainer review, but it lets remote discussion focus on design and compatibility questions that genuinely need maintainers.

The final local diff for this case contained only two files: one behavioral line in Alert and one regression test. In addition to rerunning the Alert test suite, I ran `antd lint` on both files, checked Prettier formatting, and used `git diff --check`; the CLI reported zero issues. The test-quality review also confirmed that the case protected the independent contract “the button is visible and invokes the object callback,” rather than asserting an internal implementation detail.

## Let repository Skills complete PR delivery {#create-the-pr}

After local review, the code is largely stable and it is finally time to prepare the commit and PR. Confirm that the bug fix is based on the correct branch, all intended changes are included, and documentation, demos, and the PR template's Change Log match the user-visible impact.

Here, Change Log means the bilingual update summary in the PR template, not direct edits to `CHANGELOG.zh-CN.md` and `CHANGELOG.en-US.md`. A regular contribution only needs to describe its impact on users or developers, or state that no update is needed when there is no user-visible change. The formal CHANGELOG is assembled during the release process.

These repeated, rule-driven steps are good candidates for repository Skills. Unlike a generic prompt, their review scope, templates, and output requirements evolve with the repository, so contributors do not have to explain antd's collaboration conventions to AI every time. The Skills directly relevant to this contribution are:

| Skill | Purpose | Human checkpoint |
| --- | --- | --- |
| [commit-msg](https://github.com/ant-design/ant-design/pull/57203) | Generate one commit message from staged changes and recent repository style | Does it accurately cover every staged change? |
| [create-pr](https://github.com/ant-design/ant-design/pull/57228) | Analyze the complete base-to-branch diff and fill the official PR template | Are the base, title, body, and Change Log correct? |
| [test-review](https://github.com/ant-design/ant-design/pull/57628) | Review whether tests protect independent contracts | Should a test suggestion be accepted, rewritten, or rejected? |

Using these Skills in Codex does not require memorizing extra commands. Describe the goal in natural language and make the current stage and human checkpoint explicit. For example:

```text
Use the test-review Skill to assess whether the new test is worth keeping. Do not edit code yet.
Write one commit message from the current staging area and recent repository style.
Use the create-pr Skill for the complete branch. Preview the base, title, and body before creating the PR.
```

The point of a Skill is not saving a few paragraphs of typing. It makes the agent execute the same repository checks every time. For example, `create-pr` must inspect the full branch rather than only the last commit, and it must show the base, English title, and Chinese body for human confirmation before calling `gh pr create`. AI organizes the material quickly, the Skill constrains the procedure, and the contributor owns the final judgment and authorization; none replaces the others.

For this case, the commit message was `fix(Alert): show close button for closable onClose`. The `create-pr` Skill generated an English title and Chinese body from the complete diff. Only after confirming that the base was `master` and the Change Log matched the actual impact did I open [PR #58885](https://github.com/ant-design/ant-design/pull/58885). It linked the original problem with `Fixes #58884` and explained the API-migration context, cause, compatibility boundaries, and regression test. The Issue, definition of done, code, tests, and PR description now formed one evidence chain.

## Remote review, CI, and Merge {#remote-review-and-merge}

Creating the PR begins another verification round; it does not end the process. An agent can summarize reviews, inspect CI logs, and prepare changes, but it must not assume that every suggestion is correct.

I evaluate review comments against the definition of done:

- Does the comment identify a real behavioral or compatibility problem?
- Would the requested test protect a new independent contract?
- Does it expand the scope beyond the current Issue?
- If it came from AI review, was it verified against the latest code?

For #58885, CodeRabbit produced no actionable comments and passed its PR-level checks for the title, description, linked Issue, and change scope. That does not mean a maintainer has approved the change, and it does not replace human review. It only means automated review found no blocking issue. Conversely, when AI review does suggest a change, the suggestion must still be verified against the latest code and definition of done instead of being applied automatically.

CI verifies another set of objective conditions: targeted tests, type checks, code style, coverage, builds, and any required visual regression. PRs with UI changes should also be inspected through their deployment previews rather than relying only on a green status.

The first CI round for #58885 covered lint, builds, Node tests, React 18 and latest-React matrices, dist and dist-min packages, coverage, bundle size, preview deployment, and visual regression. Every automated check passed, all modified coverable lines were covered, and the visual report found no differences.

![All automated checks passed for PR #58885](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*jZqiQoiEwGkAAAAATOAAAAgAegCCAQ/original)

The screenshot shows that every automated check had passed while the page still displayed `Review required`. This is an important boundary in component-library contributions: CI proves that the code satisfies the project's predefined checks, but a maintainer still decides whether the behavioral change should be accepted.

When maintainers leave feedback, the same discipline used during local review applies: evaluate whether the suggestion is valid, update the code when necessary, rerun the relevant checks, and review the diff again instead of accepting every suggestion mechanically just to merge faster. In #58885, automated review and CI found no blocking issue. [afc163](https://github.com/afc163) then completed the human review, approved the change, and merged the PR into `master` as merge commit [`5040df9`](https://github.com/ant-design/ant-design/commit/5040df92921d404b5b494eea911d24516062e813).

The `Fixes #58884` line in the PR body completed the other half of the workflow: once the code was merged, GitHub automatically closed the original [Issue #58884](https://github.com/ant-design/ant-design/issues/58884). From finding the problem and creating the Issue through implementation, testing, local review, remote review, CI, Merge, and Issue closure, this contribution now forms one complete chain.

After Merge, contributors can continue watching which release includes the fix and whether users report follow-up problems. A bug in an underlying rc-component adds package-level fixes, releases, and antd verification to the path, but the principle remains the same at every stage: explicit inputs, preserved evidence, and human confirmation for external actions.

## Use AI for speed and repository Skills for repeatability {#workflow-summary}

The responsibilities of AI, the CLI, repository Skills, and people across the path from Issue to Merge can be summarized as follows:

| Stage | AI, CLI, and repository Skills | Human confirmation | Output |
| --- | --- | --- | --- |
| Find a problem | Search duplicates and compare APIs and versions | Is the problem real and worth solving? | A reproducible problem |
| Create the Issue | Use `antd bug` to format the report and environment | Submit only after checking the content | An actionable Issue |
| Define done | Read documentation, implementation, tests, and history | Confirm goals, non-goals, and compatibility boundaries | Explicit acceptance criteria |
| Implement and verify | Use AI to trace the call path and generate a minimal patch and test candidates; use `test-review` to review test quality | Do the solution and tests protect public behavior? | A minimal diff and regression test |
| Local review | Review the complete diff, test quality, and repository rules | Are findings valid, and do blockers remain? | A clean branch ready for maintainers |
| Create the PR | Use `commit-msg` for the commit message and `create-pr` for a repository-compliant PR draft | Confirm base, body, Change Log, and external submission | A reviewable PR |
| Remote review, CI, and Merge | Summarize feedback, inspect logs, and prepare corrections | Is the feedback valid, and is the PR mergeable? | Merge the PR and close the original Issue |

AI-driven efficiency does not come from removing stages. It comes from finding evidence, locating related code, and moving information between stages faster. Repository Skills turn existing team experience into repeatable checks. The Issue becomes a definition of done, the definition becomes code and tests, local review narrows the change into a branch ready for submission, and PR review plus CI decide whether it can be merged.

Tools make execution faster, and Skills make experience reusable, but contributors must retain three decisions: whether behavior should change, where the boundary belongs, and what evidence is sufficient to prove correctness. AI findings, test suggestions, and PR drafts remain candidate outputs; they do not become project conclusions automatically.

When those questions have clear answers, moving from Issue to PR stops being a sequence of guesses. It becomes an engineering workflow that AI can accelerate without lowering quality.

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

## Conclusion: give AI the speed and keep human judgment {#conclusion}

Looking back at #58884 from Issue to Merge, AI's real contribution was efficiency in searching, reading, summarizing, and locating. It narrowed the problem scope quickly, connected context across files, and helped repository Skills execute repeated procedures consistently. But reading more code does not automatically tell AI whether a behavior matches the component's design, and neither a single finding nor a passing test is enough to prove that a change is correct.

Expected behavior, API semantics, compatibility boundaries, test value, and review comments still require human judgment. External actions such as creating an Issue, committing code, opening a PR, and accepting a proposed change also need human confirmation. The productive model is not to replace contributors with AI, but to let AI find faster, let Skills execute more consistently, and keep people accountable for what enters the repository.
