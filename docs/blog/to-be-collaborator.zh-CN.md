---
title: 如何成长为 Collaborator
date: 2022-12-22
author: heiyu4585
---

大家好，我是[黑雨](https://github.com/heiyu4585)。关于 Ant Design，相信大家都非常熟悉，我在很多后台管理系统项目使用过 Ant Design，给我最大的感觉就是好用、好看、简单、稳定。现在 `v5` 版本已经发布，强烈推荐大家试使用，我也有幸开发了 `v5` 版本的 `Tour` 组件和 `App` 组件，以及一些其他维护工作。下面给大家分享一下 Ant Design 的 PR 流程，希望能给有兴趣为社区共建的同学提供一份参考。

## 一. 阅读相关文章熟悉相关概念

[贡献指南](https://ant.design/docs/react/contributing-cn)

[如何优雅地在 github 上贡献代码](https://segmentfault.com/a/1190000000736629)

[成为社区协作成员](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

[开发者说明](https://github.com/ant-design/ant-design/wiki/Development)

[使用 git 创建 PR 的一些建议](https://github.com/ant-design/ant-design/discussions/37051)

## 二. 拉取 Ant Design 代码到本地

### 1. Fork 项目

- 首先需要 fork 项目，进入[项目页面](https://github.com/ant-design/ant-design)，点击右上角的 [Fork 按钮](https://github.com/ant-design/ant-design/fork)
- 你的 github 帐号中会出现 Ant Design 链接是 https://github.com/heiyu4585/ant-design 这个项目
- 在本地电脑上项目地址使用以下命令：得到一个 github 文件夹

```bash
git clone https://github.com/[yourGithubAccount]/ant-design.git
```

注意： `[yourGithubAccount]` 改为自己的 github 用户名

### 2. 添加远端分支地址

- 进入 Ant Design 文件夹，添加 Ant Design 的远程地址

```bash
cd ant-design
git remote add upstream https://github.com/ant-design/ant-design
```

- 拉取最新的远端分支版本

```bash
git pull upstream master
```

现在我们在 fork 来的 master 分支上，这个 master 留作跟踪 upstream 的远程代码

### 3. 在 github 上创建新 fix 分支

![image-20221211130607684](https://user-images.githubusercontent.com/10607168/208016775-623abfe7-fa7f-438d-abc3-be445e52d8c5.png)

### 4. 在本地拉取新分支

```bash
git pull
git checkout fix-branch
```

现在我们可以在分支上更改代码了

## 三. 在[Ant Design 的 issue](https://github.com/ant-design/ant-design/issues)页找到 issue 并分析选择

为了能帮助你开始你的第一次尝试，我们用 [good first issues](https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") 标记了一些比较容易修复的 bug 和小功能，这些 issue 可以很好地作为你的首次尝试。[help wanted](https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) 是作为开发者比较容易接手的一些问题。

![image-20221216111126983](https://user-images.githubusercontent.com/10607168/208016864-fd72d378-a5db-4c20-9a34-b136d5e7c446.png)

## 四. 开发流程

1. `npm start` 在本地运行 Ant Design 的网站
2. 按照 issue 描述调试、修复问题或者开发新的 feature

## 五. 运行测试用例及规范检查

1. 在添加 issue 相关测试用例同时，确认所有的测试都是通过的 `npm run test`。 小贴士：开发过程中可以用 `npm test -- --watch TestName` 来运行指定的测试。
2. 运行 `npm test -- -u` 来更新 [jest snapshot](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) 并且把这些更新也提交上来（如果有的话）。
3. 确保你的代码通过了 lint 检查 `npm run lint`。

## 六. 合并修改

- 一个常见的问题是远程的 upstream (ant-design/master) 有了新的更新，从而会导致我们提交的 Pull Request 时会导致冲突，因此我们可以在提交前先把远程其他开发者的 commit 和我们的 commit 合并。

- 使用以下代码切换到 `master` 分支：

```bash
git checkout master
```

- 使用以下代码拉出远程的最新代码：

```bash
git pull upstream master
```

- 切换回 fix-branch

```bash
git checkout fix-branch
```

- 把 `master` 的 `commit `合并到 `fix-branch`，有冲突解决冲突：

```bash
git rebase master
```

- 把更新代码提交到自己的 `fix-branch` 中:

```bash
git push origin fix-branch
```

## 七. 提交 Pull Request

你可以在你的 github 代码仓库页面切换到 branches 页面点击 fix-branch 分支后点击 `New pull request` 按钮，添加相关注释后提交. 或者切换到 fix-branch 分支的代码仓库点击 `Compare & pull request` 按钮，添加相关注释后提交.

- [PR 页面](https://github.com/ant-design/ant-design/pulls) 上按照默认格式认真填写提交描述，可以参考已经 merge 的 PR。

- 查看 checks 是否全部通过，如果没有点 `details` 就去查看对应的报错，修复后重新 push。

![image-20221210233540659](https://user-images.githubusercontent.com/10607168/208016178-5edb30af-7191-4ca0-a2d1-17c833f9ed92.png)

## 八. 接受维护者的 review 并修改，合格后等待维护者 merge

![image-20221216104628528](https://user-images.githubusercontent.com/10607168/208016926-f8ec6cf3-a599-481f-9611-d894975ab5f5.png)

## 九. 常见错误

- PR 描述未按要求填写

![image-20221210234139748](https://user-images.githubusercontent.com/10607168/208016993-7b1b6838-5944-4098-85ed-d0ea4567f42f.png)

- 未 rebase 到最新版本

![image-20221210234002553](https://user-images.githubusercontent.com/10607168/208017056-9a209552-29f3-48ab-ad09-90fde458147c.png)

- react 16 test 未通过

![image-20221212091630186](https://user-images.githubusercontent.com/10607168/208017142-c9ee4169-f2d0-4085-bcff-6c859ec54e71.png)

修复方法：

```
npm run install-react-16
npm run test componet/XXX
```

## 十. 成为 Collaborator

当持续维护一段时候后，Collaborator 会启动邀请机制，在 [#3222](https://github.com/ant-design/ant-design/issues/3222) 中发起投票。当满足足够票数后，会正式邀请你成为 Collaborator。

![Collaborators](https://user-images.githubusercontent.com/5378891/209089697-4fe3f3b3-ef44-4d63-94c2-d93d082c9951.png)

## 不要怕犯错误，勇敢地去做，开源世界欢迎大家。

![giphy](https://user-images.githubusercontent.com/10607168/208015974-04c3f09b-b5e8-4ef7-af00-0bb5652ec619.gif)

## 相关资源

了解更多 Ant Design 的开发流程和和注意事项，可以参考：

- [贡献者开发维护指南](/docs/blog/contributor-development-maintenance-guide-cn)
