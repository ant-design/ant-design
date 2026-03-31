---
name: antd-version-release
description: ant-design 仓库的版本发布工作流。在用户提到发版、准备 release、更新版本号、收集发布日志、创建 changelog 或 release PR、发布新的 antd 版本时使用。覆盖分支选择、changelog 准备、package 版本更新、PR 规范以及最终 npm publish 流程。
---

# Ant Design 发版指南

## 目标

这个 skill 面向 ant-design 仓库的真实发版流程，不是通用应用的自动发版模板。

它主要覆盖两类任务：

1. 准备发布 PR：更新 changelog 和 `package.json`
2. 正式发布版本：执行 `npm publish`

## 触发场景

当用户提到以下任一场景时使用：

- 发版
- 发布版本
- release
- release PR
- 更新 changelog
- 升级版本号
- publish antd

## 核心规则

### 一、分支选择

- 新特性相关的发布准备，通常基于 `feature`
- Bugfix、文档改动以及大多数常规发布准备，通常基于 `master`
- 如果是维护分支发版，沿用已有稳定分支，例如 `5.x-stable`、`4.x-stable`

### 二、发布准备是手动维护的

ant-design 的发布准备通常就是一个普通 PR，主要更新：

- `CHANGELOG.en-US.md`
- `CHANGELOG.zh-CN.md`
- `package.json`

不要假设 CI 会在 PR 合并时替你更新版本号。

### 三、正式发布发生在 PR 合并之后

真正的 npm 包发布动作，发生在 release PR 合并之后。

- 使用 `npm publish`
- 不要使用 `npm run pub`，仓库已经明确提示应使用 `npm publish`
- 在准备 release PR 时，不要手动创建 Git tag
- 发布完成后，`postpublish` 会处理 tag 推送，tag 再触发 GitHub Release 和钉钉通知等工作流

## 发布类型

除非用户明确要求其它流程，否则只处理常见的两类：

| 类型  | 常见基线分支             | 版本变化               | 使用场景             |
| ----- | ------------------------ | ---------------------- | -------------------- |
| Patch | `master`                 | `x.y.z` -> `x.y.(z+1)` | Bug 修复、稳定性发布 |
| Minor | `feature` 或指定发布分支 | `x.y.z` -> `x.(y+1).0` | 特性批量发布         |

如果改动里明显包含未发布的新特性，优先判断为 minor；否则默认按 patch 处理。

## 流程

### 1. 确认目标分支与当前版本

开始前至少检查：

```bash
git branch -vv
git rev-parse --abbrev-ref HEAD
cat package.json
git tag --list | grep -v -E '(experimental|alpha|resource)' | sort -V | tail -20
```

确认以下信息：

- 当前要发布的是哪条分支
- `package.json` 里的当前版本号
- 最近一次有效 release tag
- 下一个版本应该升 patch 还是 minor

### 2. 收集 changelog 来源

优先复用仓库现有的 changelog 流程，不要重新发明一套发布日志写法。

- 如果任务核心是“收集发布日志”，优先参考 `.agents/skills/changelog-collect/SKILL.md`
- 扫描最近一个 release tag 到目标分支之间的 commit 和 PR
- 只保留用户可感知的改动
- 纯重构、纯测试、CI、内部维护类改动默认忽略，除非用户明确要求保留

常用命令：

```bash
git log <from-tag>..<target-branch> --oneline
git diff <from-tag>...<target-branch> --stat
gh pr view <number> --json title,body,author,number
```

### 3. 更新发布文件

发布准备通常只应改这三个文件：

- `CHANGELOG.en-US.md`
- `CHANGELOG.zh-CN.md`
- `package.json`

要求：

- 中英文 changelog 必须一起更新
- 新增 section 标题必须与目标版本完全一致，例如 `## 6.3.6`
- 必须有日期行，并且日期应接近当前发布日期，例如 `` `2026-03-31` ``
- changelog 文案必须遵循 ant-design 现有格式
- `package.json` 中的版本号必须与 changelog 版本一致

除非用户明确要求，否则不要额外引入别的 release 元数据文件。

### 4. 提交前校验

至少运行：

```bash
npm run lint:changelog
```

必要时再运行：

```bash
npm run version
```

`npm run version` 只在需要刷新本地生成的版本文件、做校验时才运行。不要把无关的生成文件顺手带进 release PR，除非仓库本来就预期它们会被更新。

### 5. 提交与 PR 规范

这个仓库里的 release 准备 PR，通常会使用类似标题：

- `docs: add changelog for 6.3.5`
- `docs: release 6.3.5`

注意：

- 如果 PR 标题里包含 `release` 或 `changelog`，就必须带上版本号
- `.github/workflows/verify-package-version.yml` 会校验这件事
- PR 标题保持英文
- 创建 PR 时必须使用仓库官方模板

如果需要生成 PR body：

- 保留模板原有 section
- 简要说明本次发布范围
- changelog 类 PR 的正文可以简洁，因为详细内容已经写在 changelog 文件里

## 正式发布流程

这部分只在 release PR 已经合并，并且用户明确要求“现在发布”时才使用。

### 发布前提

发布前必须确认：

1. 当前分支已经切到合并后的目标分支，通常是 `master`
2. 工作区是干净的
3. 远端分支已同步到最新
4. `package.json` 中的版本号已经是目标发布版本
5. `CHANGELOG.en-US.md` 中已经存在该版本对应的 changelog 条目

`scripts/check-version-md.ts` 默认要求：

- 存在与当前版本完全匹配的 changelog section
- 日期格式正确，且接近当前发布日期

### 发布命令

执行：

```bash
npm publish
```

仓库里的相关行为：

- `prepublishOnly` 会执行 `scripts/pre-publish.ts`
- 默认会检查远端 CI 状态，除非显式设置 `SKIP_CI_CHECK`
- 会下载构建产物
- `postpublish` 会为当前版本推送 Git tag
- 该 tag 会触发后续 release 相关 GitHub workflow

### 不要做的事

- 不要使用 `npm run pub`
- 不要在 publish 前手动创建或推送版本 tag
- changelog 或版本号缺失时不要直接发布
- 如果明显是 feature release，不要默认对着 `master` 准备发布，除非用户明确确认

## Agent 执行动作

当用户要求你协助发版时：

1. 检查当前分支、版本号和最近 tags
2. 根据目标分支和改动范围判断是 patch 还是 minor
3. 更新 changelog 和 `package.json`
4. 运行 npm run lint:changelog 和 tsx scripts/check-version-md.ts 校验
5. 用带版本号的 `docs:` 标题提交
6. 参考 .github/PULL_REQUEST_TEMPLATE.md，用正确的 base branch 创建 PR
7. 只有在 PR 合并后、且用户明确要求时，才执行 `npm publish`

如果任务只是“准备 release PR”，那就在创建 PR 后停止，不要继续执行发布。
