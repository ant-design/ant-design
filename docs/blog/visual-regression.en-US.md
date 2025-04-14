---
title: 👀 Visual Regression Testing
date: 2025-01-05
author: Wxh16144
---

Visual Regression Testing is a software testing technique that focuses on detecting visual changes and differences in the user interface of web applications or websites. It involves capturing screenshots of web pages at different stages of development and comparing them to identify any unexpected visual regressions caused by code changes or updates.

## Baseline Screenshots

The main goal of Ant Design's visual regression testing is to detect visual changes in components and avoid visual issues introduced by PR changes. We use [jest-puppeteer](https://jestjs.io/docs/puppeteer) as our testing framework. By combining Puppeteer with Jest, we take screenshots of each component demo and compare them with baseline screenshots.

You can find visual regression test code in `__tests__/image.test.ts` under each component. You can run visual screenshots in the antd repository using the following command:

```bash
npm run test:image # Screenshots will be saved in the imageSnapshots directory. For specific component screenshots, use: npm run test:image -- components/button
```

## Visual Regression Solutions

### Argos

Initially, we used [Argos](https://argos-ci.com/) as our visual regression testing solution. However, Argos changed their pricing strategy, and with antd triggering visual regression tests on every PR, comparing nearly 6,000 screenshots each time, the cost became unsustainable for us.

### Self-hosted

We built our own visual regression testing solution using jest-puppeteer mentioned earlier. We take screenshots of each component demo using four themes: `dark`, `light`, `compact`, and `cssVar`, then upload these screenshots to [Alibaba Cloud OSS](https://www.aliyun.com/product/oss) as baseline screenshots.

Using GitHub Actions for continuous integration, we automatically capture and upload screenshots to OSS whenever the base branch code changes, ensuring the baseline screenshots stay up-to-date.

For branches requiring visual regression testing, we use [pixelmatch](https://github.com/mapbox/pixelmatch) to compare current screenshots with baseline screenshots. If differences are found, difference screenshots are generated, and the difference report is uploaded to OSS.

Further leveraging GitHub Actions, we implement baseline screenshot comparison in PRs. If visual differences are detected, the CI uploads the difference screenshots and report to OSS, displays the visual differences in the PR, and marks it as failed, requiring developers to fix the issues.

![https://github.com/ant-design/ant-design/pull/52210#issuecomment-2567659292](https://github.com/user-attachments/assets/8a5c4e0a-3686-4b1c-aa32-930505173abe)

## Local Visual Regression Testing

When developing locally and preparing to submit a PR contribution, we can run visual regression tests in advance using the following command:

```bash
npm run test:visual-regression:local # Follow the prompts to select components for visual regression testing
```

## References

- For visual regression CI implementation, refer to [.github/workflows/visual-regression-\*.yml](https://github.com/search?q=repo%3Aant-design%2Fant-design%20path%3A%2F%5E%5C.github%5C%2Fworkflows%5C%2F%2F%20Visual%20Regression&type=code)
- For baseline screenshot implementation, refer to [tests/shared/imageTest.tsx](https://github.com/ant-design/ant-design/blob/46a8eff/tests/shared/imageTest.tsx#L38)
- For visual regression test code implementation, refer to [scripts/visual-regression](https://github.com/ant-design/ant-design/tree/46a8eff/scripts/visual-regression)
