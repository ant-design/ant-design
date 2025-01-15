---
title: 👀 视觉回归测试
date: 2025-01-05
author: Wxh16144
---

视觉回归测试（Visual Regression Testing）是一种软件测试技术，专注于检测 Web 应用程序或网站的用户界面中的视觉变化和差异, 它涉及在不同的开发阶段捕获网页的屏幕截图，并进行比较，用来识别由代码更改或更新引起的任何意外的视觉回归。

## 基准截图

Ant Design 视觉回归测试的主要目标是检测组件的视觉变化，避免 PR 改动引入的视觉问题。我们使用 [jest-puppeteer](https://jestjs.io/docs/puppeteer) 作为测试框架。将 Puppeteer 与 Jest 结合使用，对每一个组件 Demo 进行截图，然后与基准截图进行比较。

可以看到每个组件下的 `__tests__/image.test.ts` 里面包含了视觉回归测试的代码, 你可以通过以下命令在 antd 仓库中运行视觉截图:

```bash
npm run test:image # 截图将会保存在 imageSnapshots 目录下, 指定组件截图可以使用 npm run test:image -- components/button
```

## 视觉回归方案

### Argos

早期我们使用 [Argos](https://argos-ci.com/) 作为视觉回归测试的方案，但是 Argos 修改了收费策略，antd 在每次 PR 中都会触发视觉回归测试，每次对比将近 6,000 张截图，这样的费用是我们无法承受的。

### Self-hosted

我们自建了视觉回归测试的方案，利用前面提到的 jest-puppeteer，将每一个组件的 Demo 分别使用 `dark`、`light`、`compact` 以及 `cssVar` 四种主题进行截图，然后将截图上传到 [阿里云 OSS](https://www.aliyun.com/product/oss) 中，作为基准截图。

利用 GitHub Actions 持续集成，可以在每次基准分支的代码变动时，自动截图并上传到 OSS 中，这样就保证了基准截图的实时性。

对于需要进行视觉回归测试的分支，我们使用 [pixelmatch](https://github.com/mapbox/pixelmatch) 将当前截图与基准截图进行比较，如果有差异，将会生成差异截图，并将差异报告上传到 OSS 中。

进一步利用 GitHub Actions，实现在 PR 中对比基准截图，如果有视觉差异，CI 会将 PR 中的差异截图和报告上传到 OSS 中，在 PR 中展示视觉差异，同时标记为失败，需要开发者进行修复。

![https://github.com/ant-design/ant-design/pull/52210#issuecomment-2567659292](https://github.com/user-attachments/assets/8a5c4e0a-3686-4b1c-aa32-930505173abe)

## 本地视觉回归测试

在本地开发，准备提交 PR 贡献时，我们也可以通过以下命令来事先进行视觉回归测试:

```bash
npm run test:visual-regression:local # 按照提示选择组件进行视觉回归测试
```

## 以上

- 视觉回归持续集成方案，可以参考 [.github/workflows/visual-regression-\*.yml](https://github.com/search?q=repo%3Aant-design%2Fant-design%20path%3A%2F%5E%5C.github%5C%2Fworkflows%5C%2F%2F%20Visual%20Regression&type=code)
- 基准截图实现，可以参考 [tests/shared/imageTest.tsx](https://github.com/ant-design/ant-design/blob/46a8eff/tests/shared/imageTest.tsx#L38)
- 视觉回归测试的代码实现，可以参考 [scripts/visual-regression](https://github.com/ant-design/ant-design/tree/46a8eff/scripts/visual-regression)
