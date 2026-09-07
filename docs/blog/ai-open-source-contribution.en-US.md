---
title: 'How to Use AI and Skills to Reduce Maintenance Costs'
date: 2026-08-11
author: QDyanbing
---

Hi, I'm [Yanbing Gao](https://github.com/QDyanbing). I have been helping maintain Ant Design and often use AI agents to investigate problems, read code, and prepare PRs. The repository also has a set of Skills maintained alongside the code (some came from workflows I summarized and contributed while doing this work 😁).

Writing the fix is only one part of component-library maintenance. Even a small change needs Issue analysis, code location, a regression test, local review, a commit message, a PR template, remote review, and CI. None of these steps is especially difficult on its own, but repeating them across many changes adds real maintenance cost.

I now give suitable work to Codex and let repository Skills supply antd's specific rules for tests, commits, and PRs. This article focuses on three Skills, `test-review`, `commit-msg`, and `create-pr`, and how they fit into a real maintenance workflow.

## A quick Issue for context {#find-an-issue}

Alert [Issue #58884](https://github.com/ant-design/ant-design/issues/58884) was straightforward. The documentation recommends moving the deprecated top-level `onClose` to `closable.onClose`, but an Alert configured only with `closable={{ onClose }}` did not show a close button. The callback therefore had no way to run.

I saved a minimal reproduction with antd 6.5.3, then used `antd bug` from Ant Design CLI to generate a Chinese Issue preview. I checked the reproduction link, steps, expected behavior, and actual behavior before adding `--submit`.

![Issue #58884 created with Ant Design CLI](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*iSteSqd4qrAAAAAAU7AAAAgAegCCAQ/original)

Codex read the Issue, repository rules, and relevant code, then traced the problem to Alert's handling of object-form `closable`. The final fix changed one line and added a regression test. The corresponding [PR #58885](https://github.com/ant-design/ant-design/pull/58885) has since been merged into `master`.

The Alert change itself was small. The useful part is the maintenance path around it: I supplied an Issue link and a goal for each stage, Codex worked inside the repository, Skills supplied project rules, and a person stepped in for decisions and external actions.

## How an Issue link moves through maintenance {#maintenance-workflow}

For a clear Issue, I usually ask Codex to analyze before editing anything:

```text
https://github.com/ant-design/ant-design/issues/58884
Analyze how this Issue should be handled. Do not modify code yet.
```

Implementation, testing, local review, commit preparation, and PR creation can all follow with short instructions. The three Skills do not replace Codex or run as isolated tools. Each one joins the workflow at the point where repository-specific checks are needed.

![Maintenance workflow with Codex, Skills, and human confirmation](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*iUCOSIBXdhkAAAAAQxAAAAgAeuN6AQ)

The three dashed boxes show reproduction and repair, review and confirmation, and creation and submission. Blue nodes are handled by Codex, purple nodes are repository Skills, and orange nodes need human confirmation. Review is the main task in phase two; `test-review` is only the test-specific check within it. If either the AI review or human confirmation fails, the change returns to repair and enters review again when ready.

## Skills keep repository knowledge in the workflow {#repository-skills}

Ant Design keeps Skills under [`.agents/skills`](https://github.com/ant-design/ant-design/tree/master/.agents/skills). Each Skill states when it applies, what context to read, what to check, and what output to produce. The instructions evolve with the repository rules.

![Skills directory in the Ant Design repository](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*S2fcRrrlttYAAAAARaAAAAgAeuN6AQ)

This workflow uses three of them:

| Skill | When it runs | Repeated maintainer checks it handles |
| --- | --- | --- |
| [test-review](https://github.com/ant-design/ant-design/pull/57628) | After implementation and tests | Whether the test follows a public contract, duplicates coverage, or depends on implementation details |
| [commit-msg](https://github.com/ant-design/ant-design/pull/57203) | After local review and human confirmation | Whether the staged change is complete and the message matches recent repository style |
| [create-pr](https://github.com/ant-design/ant-design/pull/57228) | After the commit | The base, complete branch diff, official template, title, and Change Log |

Codex selects the relevant Skill from the current task, so I can describe the goal in plain language. Maintainers no longer need to restate the testing criteria, commit format, and template rules on every PR. When a rule changes, the Skill changes with the repository.

## A person confirms the direction first {#analyze-the-issue}

Given the Issue link, Codex reads the Issue, current code, commit history, and the repository's [AGENTS.md](https://github.com/ant-design/ant-design/blob/master/AGENTS.md), then searches the most relevant implementation and tests. For #58884, it found that `isClosable` required a truthy `closeIcon` even though `{ onClose }` was already a valid `closable` object.

This is the first human checkpoint. AI can narrow the search quickly, but the intended public API behavior and compatibility boundary cannot be decided from one implementation alone. I compared the analysis with the Alert documentation and shared `useClosable` behavior before asking Codex to edit the code.

## Use test-review after implementation {#implement-and-verify}

Once the direction was clear, the next instruction stayed short:

```text
Follow the plan above. Run the relevant checks when finished, then use the test-review Skill to review the changed test.
```

Codex treated an object-form `closable` as enabling close behavior and changed the existing test into a regression case. The test no longer passed `closeIcon: true`; it located the close button by its accessible role and checked the object callback.

![Changes to the Alert regression test](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*w65HRbSBwlwAAAAARbAAAAgAeuN6AQ)

With only the test changed, the case failed because it could not find the button. After the implementation fix, all 22 Alert tests passed. `test-review` then checked whether the case protected public behavior, duplicated existing coverage, or proved the implementation with its own internals. The Skill gives an assessment; a person still decides whether to keep, rewrite, or remove the test.

## Do a local review before opening the PR {#local-code-review}

After the code and tests pass, I do not open the PR immediately. I ask Codex to read the complete change first:

```text
Review the current change. Do not modify code yet.
```

Codex checks the implementation, tests, and change scope against the Issue, repository rules, and current diff. I verify each finding against the latest code, fix only the ones that hold up, and rerun the relevant checks.

The final #58885 diff contained two files: a one-line Alert fix and one regression test. I reran the component tests, `antd lint`, Prettier, and `git diff --check`, then read the complete diff myself. This local review catches avoidable problems before they turn into another round of remote review.

## Let commit-msg and create-pr handle the repeated work {#create-the-pr}

After local review and human confirmation, I only need to tell Codex:

```text
Commit the current changes and create a PR.
```

`commit-msg` reads the staging area and recent commit style to generate one message. `create-pr` reads the current branch's complete diff against its base, selects the official template, and prepares the PR. Its summary covers the full branch and every commit in it.

There is still a human checkpoint here. I verify the target branch, staged files, English title, Chinese body, and the bilingual Change Log in the PR template. Once those are correct, Codex can perform the commit and PR actions.

For #58885, the commit message was `fix(Alert): show close button for closable onClose`. The PR linked the Issue with `Fixes #58884` and explained the cause, compatibility boundary, and regression test. With the Issue, code, test, and PR description aligned, a maintainer can start the review without reconstructing the context.

## Remote review, CI, and Merge {#remote-review-and-merge}

Once the PR is open, Codex can organize review comments and inspect CI logs. A comment still needs to be checked against the latest code and the Issue, whether it came from a person or an AI reviewer.

The first CI round for #58885 covered lint, builds, Node tests, React version matrices, coverage, bundle size, preview deployment, and visual regression. Every automated check passed, modified-line coverage reached 100%, and the visual report found no difference.

![All automated checks passed for PR #58885](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*jZqiQoiEwGkAAAAATOAAAAgAegCCAQ/original)

Passing CI means the change has reached the repository's reviewable baseline. [afc163](https://github.com/afc163) then reviewed and approved the change and merged it into `master`. The `Fixes #58884` line in the PR body made GitHub close the original Issue automatically.

![PR #58885 merged into master](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*FiD_S4q3qDgAAAAARZAAAAgAeuN6AQ)

## The maintenance costs this workflow reduces {#maintenance-cost}

AI and Skills reduce four kinds of repeated work in this workflow:

- **Finding context**: Codex reads the Issue, repository rules, code, tests, and history in the local checkout, so maintainers do not need to assemble a file list by hand.
- **Repeated checks**: `test-review`, `commit-msg`, and `create-pr` apply established repository requirements at the relevant stage.
- **Remote rework**: test review and local CR catch problems before the PR starts another review round.
- **Handoff notes**: commit messages and PR bodies come from the complete diff, making the problem, solution, and impact easier for reviewers to follow.

The saved time stays available for decisions that still need a maintainer: whether the problem is valid, how the public API should behave, where the compatibility boundary lies, whether to accept a review finding, and whether the change can be merged. AI searches quickly and narrows the scope; Skills keep the process consistent. A person still makes the final calls.

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
