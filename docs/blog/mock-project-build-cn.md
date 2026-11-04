---
title: 依赖排查
date: 2023-04-13
author: zombieJ
zhihu_url: https://zhuanlan.zhihu.com/p/639266509
yuque_url: https://www.yuque.com/ant-design/ant-design/yi1lz5dg3iygwbed
juejin_url: https://juejin.cn/post/7322296529783128101
---

Ant Design 作为大型组件库，内部依赖十分复杂。有时候 antd 代码本身没有改动，但是底层依赖更新也可能导致开发者的构建失败。比如最近由于我的失误，一处[路径大小写错误](https://github.com/ant-design/ant-design/issues/41236)使得在 Linux 下会构建失败。

对于我们自己管理的依赖包，我们定位问题会比较简单。但是对于第三方依赖，往往很难第一时间发现。当用户反馈时，可能已经过了数个小时，使得在几百个包里找不同变得有些困难。我们累积了一些排查经验会与大家分享，但是同时也为了更快解决问题，我们也做了额外的一些事情。

### 确定信息 {#confirm-information}

我们为 GitHub issue 添加了一个[模板站点](https://new-issue.ant.design/)，开发者在提交问题时会看到如下表格，会让开发者尽量完整的填写相关信息：

![Issue Helper](https://user-images.githubusercontent.com/5378891/231633510-2e7c7819-12c2-4153-b3c8-4d5576116a08.png)

通过 antd 版本、React 版本、系统、浏览器版本 信息可以组合出大多数错误问题，帮助尽可能的缩小排查范围。让我们大致确定它是否是一个通用问题或者是一个特定系统的问题。这里我们就不讲组件实现 BUG，单讲讲依赖问题。

### 确定范围 {#determine-the-scope}

从 issue 被发现，我们可以通过 github 的 commit CI 倒推出时间范围：

![Commit List](https://user-images.githubusercontent.com/5378891/231635576-88a84f55-11d9-403c-bece-98d55bf5b893.png)

接着通过 issue 描述可以确定大致的包和哪些相关（例如 [#41236](https://github.com/ant-design/ant-design/issues/41236) 来自 `@rc-component/trigger`、[#15930](https://github.com/ant-design/ant-design/issues/15930) 来自 `@types/react`）。然后通过 npm 查看相关的包的版本发布情况：

![Publish Time](https://user-images.githubusercontent.com/5378891/231636272-e423301a-f8df-407e-8d4e-a49e219631e4.png)

在确定范围后，我们便可以通过安装先前版本进行构建的方式排查出有问题的版本。暂时在 package.json 中锁定并发布 patch 版本以解决依赖问题（在修复之后解除锁定）。同时也会向对应的 GitHub 提 issue（当然，如果已经有了去 +1 即可）。

### 定时构建 {#schedule-build}

如你所见，上述的排查方式有一定的滞后性。我们希望通过定时构建的方式减少额外的人力劳动，同时也能让我们更快的发现问题。因而我们复用了 [create-next-app-antd](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style) 项目作为基底（这样，如果模板项目出了问题，我们同样可以提前发现）。创建了一个每半小时执行一次的 `mock-project-build.yml` CI，它会定期拉取 [create-next-app-antd](https://github.com/ant-design/create-next-app-antd) repo 进行构建：

```yml
on:
  workflow_dispatch:
  schedule:
    - cron: '*/30 * * * *'
```

通过 `--depth=1` 只拉取最后一次 commit。再执行 `yarn` 安装依赖生成对应的 `yarn.lock` 文件，最后执行 `yarn build` 进行构建以完全模拟一个项目的构建过程。

每次构建成功，CI 都会缓存当下的 `yarn.lock` 文件。这样，我们在下次构建如果失败了，就可以很方便的拉取两份文件进行对比去排查问题。`actions/cache` 虽然不允许同名 cache key，但是允许通过 `restore-keys` 来获取最近的 cache，这就非常方便了：

```yml
- uses: actions/cache@v4
  with:
    path: ~tmpProj/yarn.lock
    key: primes-${{ runner.os }}-${{ github.run_id }}
    restore-keys: mock-proj-lock-file
```

接着监听构建失败事件，对 `yarn.lock` 文件进行对比快速找出变化的依赖：

```yml
- name: 🎨 Diff Report
  if: ${{ failure() }}
  run: npx diff-yarn-lock --source=~tmpProj/yarn.lock --target=~tmpProj/yarn.lock.failed
```

![Diff](https://user-images.githubusercontent.com/5378891/226313045-83895072-57c1-4135-80cf-16eeecae8c18.png)

![Build List](https://user-images.githubusercontent.com/5378891/231641305-88ec5d5e-6879-458a-8660-9d9828b97fd9.png)

我们在失败时还会通过 IM 推送协议将消息推送到开发者群组，这样我们就可以在第一时间确定问题。完整脚本可以[点击此处](https://github.com/ant-design/ant-design/blob/da83561f9cb57b0eb03d18543d96393689f799be/.github/workflows/mock-project-build.yml)查看。

### 最后 {#finally}

我们一直在持续优化在维护过程中遇到的问题，如果你在使用中有任何好的想法或者建议，都欢迎在我们的 issue 和 discussion 提出。感谢大家~
