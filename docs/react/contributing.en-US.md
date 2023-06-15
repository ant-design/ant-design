---
order: 12
title: Contributing
toc: false
---

The following is a set of guidelines for contributing to Ant Design. Please spend several minutes reading these guidelines before you create an issue or pull request.

## Code of Conduct

We have adopted a [Code of Conduct](https://github.com/ant-design/ant-design/blob/master/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Ant Design happens directly on [GitHub](https://github.com/ant-design). Both core team members and external contributors send pull requests which go through the same review process.

## Branch Organization

According to our [release schedule](/changelog#release-schedule), we maintain two branches, `master` and `feature`. If you send a bugfix pull request, please do it against the `master` branch, if it's a feature pull request, please do it against the `feature` branch.

## Bugs

We are using [GitHub Issues](https://github.com/ant-design/ant-design/issues) for bug tracking. The best way to get your bug fixed is by using our [issue helper](http://new-issue.ant.design) and provide reproduction steps with this [template](https://u.ant.design/codesandbox-repro).

Before you report a bug, please make sure you've searched existing issues, and read our [FAQ](/docs/react/faq).

## Proposing a Change

If you intend to change the public API or introduce new feature, we also recommend you use our [issue helper](http://new-issue.ant.design) to create a feature request issue.

If you want to help on new API, please reference [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules) to name it.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that contain bugs or small features that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take over it but you should still leave a comment.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from the [correct branch](#branch-organization).
2. Run `npm install` in the repository root.
3. If you've fixed a bug or added code that should be tested, add tests!
4. Ensure the test suite passes (npm run test). Tip: `npm test -- --watch TestName` is helpful in development.
5. Run `npm test -- -u` to update the [jest snapshots](https://jestjs.io/docs/snapshot-testing) and commit these changes as well (if there are any updates).
6. Ensure the UI change passes `npm run test-image`，Run `npm run test-image -- -u` to update UI snapshots and commit these changes as well (if there are any updates), **UI test base on [Docker](https://docs.docker.com/get-docker/), need download the corresponding installation according to the platform**
7. Make sure your code lints (npm run lint). Tip: Lint runs automatically when you `git commit` (Use [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)).

Sending a Pull Request to [react-component](https://github.com/react-component/):

Since antd's components are based on react-component, sometimes you may need to send pull request to the corresponding react-component repository. If it's a bugfix pull request, after it's merged, the core team will release a patch release for that component as soon as possible, then you only need to reinstall antd in your project to get the latest patch release. If it's a feature pull request, after it's merged, the core team will release a minor release, then you need raise another pull request to [Ant Design](https://github.com/ant-design/ant-design/) to update dependencies, document and TypeScript interfaces (if needed).

## Development Workflow

`npm` or `yarn` are recommended as package management tools.

After you clone the antd code and use following commands to install dependencies:

<InstallDependencies npm='$ npm install' yarn='$ yarn'></InstallDependencies>

You can also run the following common commands:

### Run locally

Runs Ant Design website locally.

<InstallDependencies npm='$ npm start' yarn='$ yarn start'></InstallDependencies>

### Checks the code style

<InstallDependencies npm='$ npm run lint' yarn='$ yarn lint'></InstallDependencies>

### Run test

runs the complete test suite. (Make sure the `NODE_ENV` environment variable is unset, or it may causing some problems.)

<InstallDependencies npm='$ npm test' yarn='$ yarn test'></InstallDependencies>

### Compile

compiles TypeScript code to the `lib` and `es` directory.

<InstallDependencies npm='$ npm run compile' yarn='$ yarn compile'></InstallDependencies>

### Build

creates UMD build of antd.

<InstallDependencies npm='$ npm run dist' yarn='$ yarn dist'></InstallDependencies>

## Development Tools

- VSCode plugin for CSS in JS: https://marketplace.visualstudio.com/items?itemName=shezhangzhang.antd-design-token
- Ant Design cheatsheet in VS Code: https://github.com/fi3ework/vscode-antd-rush

## Being a collaborator

If you are an active contributor and are willing to work with Ant Design Team in our opensource workflow, you can [apply to be a outside collaborator](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator).

You can also refer to the following contribution guide to become an antd contributor:

- [How to Grow as a Collaborator](/docs/blog/to-be-collaborator)
