---
title: Hi, GitHub Actions
date: 2023-06-06
author: Wxh16144
---

Hi, I'm [Wxh16144](https://github.com/Wxh16144). I have discovered some tools that can improve development efficiency and code quality through learning Ant Design's component library and participating in community contributions. I'd like to take this opportunity to share my experience with you. To help better understand Ant Design, and to apply these techniques to your own projects.

# Preface

Ant Design is hosted on GitHub as an open-source project, making it easy to communicate and collaborate with developers around the world, and allowing developers to submit issues and pull requests. Additionally, we can well manage the code repository and automate workflows such as testing and deployment through utilizing GitHub Actions and its CI/CD capabilities.

## What is GitHub Actions

GitHub Actions is a platform for automating software development workflows, Developers can easily customize and configure their own workflows by adding YAML format files to the `.github/workflows` directory to define the workflow and implement CI (continuous integration). By Understanding GitHub Actions.We can grasp some concepts within workflows through [understanding GitHub actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

- **Event**: Triggers a workflow run, such as when someone creates an issue, a pull request, or pushes code to a branch.
- **Job**: A workflow consists of one or more jobs that run in parallel by default, but can be set to run sequentially. Each job can contain multiple steps.
- **Step**: Defines the work to be done for a particular section. Each step runs as a separate process. Each item under this section is a separate operation or shell script.

Here's a visual representation from the official documentation that shows the relationship between **Event**, **Job** and **Step**:

![overview-actions-simple](https://docs.github.com/assets/cb-25535/mw-1000/images/help/actions/overview-actions-simple.webp)

# How to use

With the knowledge we have gained, we know that all of Ant Design's workflows are managed in the [`.github/workflows`](https://github.com/ant-design/ant-design/tree/master/.github/workflows) directory.

Ant Design's CI covers the following aspects:

- **Community management**: Use GitHub Actions to perform quality checks on issues/PRs and improve collaboration efficiency through comments and labels.
- **Code quality**: Use ESLint and Prettier to perform code standard checks to ensure code quality and consistency.
- **Testing**: Use Jest and testing-library to perform unit tests and snapshot tests to ensure code correctness and stability.
- **Build**: Build ES5 and ES6 module specifications to ensure the library can be used in different environments.
- **Deployment**: Use [dumi](https://d.umijs.org/) to automatically generate documentation and publish it to GitHub Pages.

## Issue

As a feature on the GitHub platform, issues serve as a centralized information hub for collecting community feedback and problems. Collaborators can add labels, milestones, and assignees to better organize tasks and projects.

### Ensuring the Quality of Issues

Ensuring issues contain sufficient information helps us to analyze and prioritize. We provide an [issue assistant](http://new-issue.ant.design) to standardize the process of creating issues. Additionally, we use GitHub Actions to check the issues created to auto close if it not pass the assistant's checks. Which will be labeled as [Invalid](https://github.com/ant-design/ant-design/issues?q=label%3AInvalid), and leaving comment to remind the creator how to ask a question properly.

![invalid-issue-preview](https://user-images.githubusercontent.com/32004925/231660945-509cf97c-43eb-4a1c-acd2-81eeedfe4a73.png)

However, team members may sometimes be unable to obtain effective information from the provided content. In such cases,will add labels such as [🤔 Need Reproduce](https://github.com/ant-design/ant-design/issues?q=label%3A%22%F0%9F%A4%94+Need+Reproduce%22+), [needs-more-info](https://github.com/ant-design/ant-design/issues?q=label%3A%22%F0%9F%A4%94+Need+Reproduce%22+), or [help wanted](https://github.com/ant-design/ant-design/issues?q=label%3A%22help+wanted%22+) to notice reporter improving the issue. The [issue-labeled.yml](https://github.com/ant-design/ant-design/blob/da83561f9cb57b0eb03d18543d96393689f799be/.github/workflows/issue-labeled.yml) file records different labels triggering corresponding comment reply jobs.

![need-reproduce-auto-comment-preview](https://user-images.githubusercontent.com/32004925/231673201-c7376eeb-010b-46d0-a7d0-4c115d58f58c.png)

![help-wanted-auto-comment-preview](https://user-images.githubusercontent.com/32004925/231673404-60b248cd-823f-4d31-8fff-d95b02b35fee.png)

### Common Issue FAQ

For some common issues, the team provides detailed answers to help developers solve problems more quickly. For example, when the title of an issue contains keywords such as `can not open`, `website`, `down`, `IE`, etc., the [issue-open-check.yml#L43-L94](https://github.com/ant-design/ant-design/blob/da83561f9cb57b0eb03d18543d96393689f799be/.github/workflows/issue-open-check.yml#L43-L94) job records the standard reply format in detail and will automatically close the issue.

### Regular Issue Cleanup

Using GitHub Actions scheduled tasks to help manage and close issues, these automated operations can effectively avoid excessive accumulation of unprocessed issues.

- [issue-close-require.yml](https://github.com/ant-design/ant-design/blob/01a475af6d8ff4943fe4c91d04582120bf9b3a84/.github/workflows/issue-close-require.yml): Checks issues marked as `🤔 Need Reproduce` or `needs-more-info` at a scheduled time. If these tags are not removed after 3 days, the issue will be automatically commented on and closed.
- [issue-check-inactive.yml](https://github.com/ant-design/ant-design/blob/01a475af6d8ff4943fe4c91d04582120bf9b3a84/.github/workflows/issue-check-inactive.yml): Scheduled to check issues which have no activity within the last 30 days every 15 days and add an `Inactive` label to them, without closing. If modified or has new comments, the `Inactive` and `needs-more-info` labels will be automatically removed.

![inactive-issue-preview](https://user-images.githubusercontent.com/32004925/234459079-db813907-503d-4405-801d-38e133c85996.png)

## Pull Request

The Ant Design team strongly encourages community involvement in Pull Request (PR), and provides the [Contributor development maintenance guide](./contributor-development-maintenance-guide) document for reference. It's important to follow certain standards when submitting a PR to ensure quality and effective communication. Additionally, the team uses GitHub Actions to require and review certain aspects of PRs to maintain code quality and ensure long-term project maintenance.

### PR Pre-test

When you initiate a pull request (PR), the description content, including the changelog section, will be generated automatically through the PR template and needs to be filled in by the developer. The [pr-open-check.yml](https://github.com/ant-design/ant-design/blob/3d627eb475e32daf3a47731140685124d568a495/.github/workflows/pr-open-check.yml) Job will check it, and if it is not filled in, the CI will remind you with a comment. Just like this:

![pr-non-changelog-comment-preview](https://user-images.githubusercontent.com/32004925/231672871-32689c30-1e0a-40fc-9237-9b9b4312f15c.png)

If the issue referenced in the PR description has the `🎱 Collaborate PR only` label, the PR will be closed and leave a notification.

The [verify-files-modify.yml](https://github.com/ant-design/ant-design/blob/3d627eb475/.github/workflows/verify-files-modify.yml) job will check the changes. If the changes include specific directories (such as `./github/` and `scripts/`) or specific files (such as `CHANGELOG.md`), community contributions will be rejected. The PR will be automatically closed and assigned to core members.

### Code Style Checking

In the [lint](https://github.com/ant-design/ant-design/blob/dedbdfddafc0134219e391473c109c14766f413d/.github/workflows/test.yml#L52-L75) job, the process always follows the procedure of performing a lint check on the code submitted by each developer.

![eslint-ci-preview](https://user-images.githubusercontent.com/32004925/234477805-5cf3cf89-6654-4329-882d-47b35964f6fc.png)

### PR deploy preview

For every pull request created, GitHub Actions will trigger the build process to ensure the documentation is correct. And PR does not affect the documentation or component demos. PR deployment is divided into multiple jobs, and the specific process is as follows:

- First, the [preview-start.yml](https://github.com/ant-design/ant-design/blob/c6a7dbc09e709a8905aaa6c073593a1fed6bea14/.github/workflows/preview-start.yml)job is triggered to create a placeholder comment on the PR, informing the developer to start the preview build. This is what is often seen as "Preview Preparing..."

![preview-preparing..](https://user-images.githubusercontent.com/32004925/231686636-eef933e6-2678-4e49-9552-babc50687644.png)

- At the same time, the [preview-build.yml](https://github.com/ant-design/ant-design/blob/b7d1d7cdbd888a1d73b3a3bf87bf4977e9b9bf91/.github/workflows/preview-build.yml#L52-L77) job performs the build operation on the site.
- Finally, the [preview-deploy.yml](https://github.com/ant-design/ant-design/blob/c6a7dbc09e709a8905aaa6c073593a1fed6bea14/.github/workflows/preview-deploy.yml) job waits for `preview-build.yml` to complete before performing the corresponding operations. If the build is successful, it will be deployed using [Surge](https://surge.sh/), and the deployment address follows the rule: `https://preview-{PR-id}-ant-design.surge.sh`. The placeholder image in the comment is updated with a success icon (clicking on the image will take you to the specific address), otherwise it is marked with a failure icon.

### Other Reviews

- The [size-limit.yml](https://github.com/ant-design/ant-design/blob/5dfce5443744271f778313c23eb8ec3a5af481f8/.github/workflows/size-limit.ym) job checks the size of the product resulting from the PR.
- Recently, the team has added ChatGPT to GitHub Actions to perform AI-based code review. The specific job can be found in the [chatgpt-cr.yml](https://github.com/ant-design/ant-design/blob/f7fd474cf8792ea01d03461d407c0edc11828a1c/.github/workflows/chatgpt-cr.yml) file.

## Unit Testing

Unit testing is one of the most important components of component library quality assurance. Whenever any code is pushed, this CI is triggered to perform automated testing, including PRs initiated by developers or updates to the main branch.

### Build Testing

The team wanted the packaged product to build properly after each code update. Ant Design has added the [Dist Job](https://github.com/ant-design/ant-design/blob/master/.github/workflows/test.yml#L104-L138) and [Compile Job](https://github.com/ant-design/ant-design/blob/40fb753349c4f2be314c91dbb7e6f1a960097c19/.github/workflows/test.yml#L254-L288) in the test.yml file to ensure the repository can be built and packaged correctly.

### Function Testing

you may notice that there are as many as 30 jobs related to testing only each time.

The team is very cautious about unit testing and needs to consider the running status of components on various major versions of React (usually versions 16, 17, and 18). If it is an update to the main branch, the running status of project build artifacts (usually `dist`, `es`, and `lib`) on three versions of React also needs to be considered. Currently, it is known that all components of Ant Design have over 4000 test cases. In order to further improve the efficiency of testing, we have also set up a distributed testing environment.

With the help of the [Job matrix strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs), CI can configure multiple jobs to perform testing tasks at one time. [Normal test](https://github.com/ant-design/ant-design/blob/40fb753349c4f2be314c91dbb7e6f1a960097c19/.github/workflows/test.yml#L141-L223) and [Module test](https://github.com/ant-design/ant-design/blob/40fb753349c4f2be314c91dbb7e6f1a960097c19/.github/workflows/test.yml#L294-L357) are the jobs that Ant Design uses the matrix strategy to test.

## Website Deploy

The deployment and build process here is consistent with the PR preview deployment and build behavior mentioned earlier, except that the deployment target of the built artifacts is different.

### Official Website Deploy

The [https://ant.design](https://ant.design) official website uses the free [GitHub Pages](https://pages.github.com/) function provided by GitHub. It uses the Actions [Deploy to GitHub Pages](https://github.com/ant-design/ant-design/blob/dedbdfddafc0134219e391473c109c14766f413d/.github/workflows/site-deploy.yml#L73-L78) job to push the built documentation artifacts directly to the [gh-pages](https://github.com/ant-design/ant-design/tree/gh-pages) branch.

### Standalone Versions

As we all know, the [https://ant.design](https://ant.design) official website always maintains the latest version. However, sometimes it is still necessary to refer to the documentation of a specific version. The [Deploy to Surge](https://github.com/ant-design/ant-design/blob/5aad29d937baeba43ca8acde7f86450e9aec99f1/.github/workflows/site-deploy.yml#L80-L90) job is responsible for deploying the website to Surge after each new version is released, with the URL format `https://ant-design-{major}-{minor}-{patch}.surge.sh`, and posting the URL as a comment on each release commit.

![versions-preview](https://user-images.githubusercontent.com/32004925/234485713-4e93154c-d5a4-4cad-87b0-e76667ff237f.png)

## Other

In the previous sections, we introduced many scenarios used by Ant Design. However, there are still some Jobs that haven't been specifically introduced. Here are some additional details to supplement that.

### IM notification

To ensure that developers and community members are informed of relevant information as soon as possible, IM integration is implemented using the events provided by Action:

- [issue-notice](https://github.com/ant-design/ant-design/blob/master/.github/workflows/issue-open-check.yml#L96-L105) and [discussion-notice](https://github.com/ant-design/ant-design/blob/dedbdfddafc0134219e391473c109c14766f413d/.github/workflows/disscustion-open-check.yml#L16-L25) jobs send notifications to the DingTalk community group whenever an issue or discussion is created.

- The [release-helper.yml](https://github.com/ant-design/ant-design/blob/dedbdfddaf/.github/workflows/release-helper.yml) CI file publishes the update log to the DingTalk community group whenever antd releases a version and creates a release.

- Other jobs not mentioned here are waiting for you to explore and discover...

## Apply to your own projects

In the previous sections, we introduced many scenarios in which Ant Design uses GitHub Action. Why not try to apply it to your own project and improve production efficiency? Let's demonstrate this with a simple demo.

### Creating a Project

Create a Vite + React project by running the command `pnpm create vite@latest my-react-app --template react-ts` in the command line.

### Configuring CI Workflow

Create a new file named `ci.yml` in the `.github/workflows` folder located in the project's root directory with the following code:

```yml
name: CI

# Set the event to pull request event and push event of the master branch
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

permissions:
  contents: write

jobs:
  CI:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7.0.0

      - name: Install dependencies
        run: pnpm install

      - name: lint
        run: pnpm run lint

      # The template does not contain test cases. If you need to use test cases, you can uncomment it
      # - name: Test
      #   run: pnpm run test

      - name: Build
        run: pnpm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        # Only deploy when the push event of the master branch is triggered
        if: github.ref == 'refs/heads/master'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

The above workflow includes a CI job that will run `lint`, `build`, and `deploy` in sequence when we push to the `master` branch. The process is shown below:

![test-CI-preview](https://user-images.githubusercontent.com/32004925/234609284-ec7b40f5-a221-4c8b-9093-ce68a1a545bb.png)

### Adding Caching

To further optimize dependency installation speed, we can add pnpm caching. After that, we can initiate a pull request to verify the previous steps.

```yml
# ...
- name: create pnpm-lock.yaml
  run: pnpm install --frozen-lockfile --ignore-scripts

- name: Get pnpm store directory
  id: pnpm-cache
  shell: bash
  run: |
    echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

- name: Setup pnpm cache
  uses: actions/cache@v4
  with:
    path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-

# ...
```

The initiated pull request also triggered the CI job correctly, and our pnpm store has been cached. From now on, Every time CI triggered from now on, it will check the content of the `pnpm-lock.yaml` file to determine whether to read the cache directly.

![pr-CI-preview](https://user-images.githubusercontent.com/32004925/234617748-8bc4f0fd-b29a-4b01-b416-1c16eed03acb.png)

![restore-cache](https://user-images.githubusercontent.com/32004925/234621854-dbfc565c-26e0-4e48-862d-8dde8ab22627.png)

Regarding the `Setup pnpm cache` step above, any cached items that have not been accessed within 7 days will be deleted. There is no limit to the number of caches that can be stored, but the total size of all caches in the storage repository is limited to 10 GB. For more information, please refer to [Caching dependencies to speed up workflows](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows).

![cache-pnpm-store](https://user-images.githubusercontent.com/32004925/234618808-46137b0d-27a0-4b01-b1a6-6e4931f6d388.png)

## After all

I hope it has helped you gain a deeper understanding of Ant Design. You are also welcome to participate in discussions and contribute to the project at the [Ant Design Discussion](https://github.com/ant-design/ant-design/discussions).
