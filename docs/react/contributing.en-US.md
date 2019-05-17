---
order: 10
title: Contributing
toc: false
---

The following is a set of guidelines for contributing to Ant Design. Please spend several minutes in reading these guidelines before you create an issue or pull request.

## Code of Conduct

We have adopted a [Code of Conduct](https://github.com/ant-design/ant-design/blob/master/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Ant Design happens directly on [GitHub](https://github.com/ant-design). Both core team members and external contributors send pull requests which go through the same review process.

## Branch Organization

According to our [release schedule](changelog#Release-Schedule), we maintain two branches, `master` and `feature`. If you send a bugfix pull request, please do it against the `master` branch, if it's a feature pull request, please do it against the `feature` branch.

## Bugs

We are using [GitHub Issues](https://github.com/ant-design/ant-design/issues) for bug tracing. The best way to get your bug fixed is using our [issue helper](http://new-issue.ant.design) and provide a reproduction with this [template](https://u.ant.design/codesandbox-repro).

Before you reporting a bug, please make sure you've searched exists issues, and read our [FAQ](/docs/react/faq).

## Proposing a Change

If you intend to change the public API or introduce new feature, we also recommend use our [issue helper](http://new-issue.ant.design) to create a feature request issue.

If you want to help on new API, please ref [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules) to name it.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that contain bugs or small features that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take over it but you should still leave a comment.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from [proper branch](#Branch-Organization).
1. Run `npm install` in the repository root.
1. If you've fixed a bug or added code that should be tested, add tests!
1. Ensure the test suite passes (npm run test). Tip: `npm test -- --watch TestName` is helpful in development.
1. Run `npm test -- -u` to update [jest snapshot](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) and commit these changes as well (if has).
1. Make sure your code lints (npm run lint). Tip: Lint runs automatically when you `git commit`.

Sending a Pull Request to [react-component](https://github.com/react-component/):

Since antd's components are based on react-component, sometimes you may need to send pull request to the corresponding react-component repository. If it's a bugfix pull request, after it's merged, the core team will release a patch release for that component as soon as possible, then you only need to do is reinstalling antd in your project to get the latest patch release. If it's a feature pull request, after it's merged, the core team will release a minor release, then you need raise another pull request to [Ant Design](https://github.com/ant-design/ant-design/) to update dependencies, document and TypeScript interfaces (if needed).

## Development Workflow

After cloning antd, run `npm install` to fetch its dependencies. Then, you can run several commands:

1. `npm start` runs Ant Design website locally.
1. `npm run lint` checks the code style.
1. `npm test` runs the complete test suite.
1. `npm run compile` compiles TypeScript code to the `lib` and `es` directory.
1. `npm run dist` creates UMD build of antd.
