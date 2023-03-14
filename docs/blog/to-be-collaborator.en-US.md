---
title: How to Grow as a Collaborator
date: 2022-12-22
author: heiyu4585
---

Hello everyone, I am [heiyu](https://github.com/heiyu4585). About Ant Design, I believe everyone is very familiar with it. Before I contributed to Ant Design, I have used Ant Design in many background management system projects at work. The biggest feeling for me is that it is easy to use, beautiful, simple and stable. Now that the v5 version has been released, I strongly recommend everyone to try it. I am also fortunate to have developed the v5 version of the `Tour` component and `App` component, as well as some other maintenance work. Let me share with you the PR process of Ant Design, hoping to provide a reference for who are interested in building together for the community.

### Read related articles to familiarize yourself with related concepts

[Contributing](https://ant.design/docs/react/contributing)

[How to gracefully contribute code on github](https://segmentfault.com/a/1190000000736629)

[Become a Community Collaborator](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

[developer notes](https://github.com/ant-design/ant-design/wiki/Development)

[Some tips about git with PR](https://github.com/ant-design/ant-design/discussions/37051)

## Pull Ant Design code to local

### 1. Fork project

- First you need to fork the project, enter the [project page](https://github.com/ant-design/ant-design), click the [Fork button](https://github.com/ant-design/ant-design/fork)
- Ant Design link will appear in your github account is https://github.com/heiyu4585/ant-design this project
- Use the following command on the project address on the local computer: get a github folder

```bash
git clone https://github.com/[yourGithubAccount]/ant-design.git
```

Note: `[yourGithubAccount]` changed to your own github username

### 2. Add remote branch address

- Go to the Ant Design folder and add the remote address of Ant Design

```
cd ant-design
git remote add upstream https://github.com/ant-design/ant-design
```

- Pull the latest remote branch version

```bash
git pull upstream master
```

Now we are on the master branch from the fork, and this master is reserved for remote code tracking upstream

### 3. Create a new fix branch on github

![image-20221211130607684](https://user-images.githubusercontent.com/10607168/208016775-623abfe7-fa7f-438d-abc3-be445e52d8c5.png)

### 4. Pull the new branch locally

```bash
git pull
git checkout fix-branch
```

Now we can change the code on the branch

## Find the issue on the [Ant Design issue](https://github.com/ant-design/ant-design/issues) page and analyze the selection

To help you start your first attempt, we use [good first issues](https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") marks bugs and small features that are relatively easy to fix, and these issues are good as your first try. [help wanted](https://github.com/ant-design/ant-design/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) After all, it is easy to take over as a developer some problems.

![image-20221216111126983](https://user-images.githubusercontent.com/10607168/208016864-fd72d378-a5db-4c20-9a34-b136d5e7c446.png)

## Development Process

1. `npm start` A website running Ant Design locally
2. As issue mentioned. Debug, fixing or add new feature

## Run test cases and specification checks

1. When add new related test case, also make sure all tests pass `npm run test`. Tips: You can use `npm test -- --watch TestName` to run specified tests during development.
2. Run `npm test -- -u` to update [jest snapshot](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) and put These updates are also committed (if any).
3. Make sure your code passes the lint check `npm run lint`.

## Merge changes

- A common problem is that the remote upstream (ant-design/master) has a new update, which will lead to conflicts when we submit the Pull Request, so we can put the commits of other remote developers and our commit is merged.

- Switch to the `master` branch with the following code:

```bash
git checkout master
```

- Use the following code to pull the latest code from the remote:

```bash
git pull upstream master
```

- switch back to fix-branch

```bash
git checkout fix-branch
```

- Merge the `commit` of `master` into `fix-branch`, and resolve conflicts if there are conflicts:

```bash
git rebase master
```

- Submit the updated code to your own `fix-branch`:

```bash
git push origin fix-branch
```

## Submit a Pull Request

You can switch to the branches page on your github code repository page, click the fix-branch branch, click the `New pull request` button, add relevant comments and submit. Or switch to the code repository of the fix-branch branch, click the `Compare & pull request` button, add relevant comments and submit.

- On the [PR page](https://github.com/ant-design/ant-design/pulls), carefully fill in the submission description according to the default format, and you can refer to the merged PR.

- Check whether all the checks are passed. If you don’t click `details`, check the corresponding error report, and push again after repairing.

![image-20221210233540659](https://user-images.githubusercontent.com/10607168/208016178-5edb30af-7191-4ca0-a2d1-17c833f9ed92.png)

## Accept the maintainer's review and modify it, and wait for the maintainer to merge after passing the test

![image-20221216104628528](https://user-images.githubusercontent.com/10607168/208016926-f8ec6cf3-a599-481f-9611-d894975ab5f5.png)

## Common errors

- PR description is not filled in as required

![image-20221210234139748](https://user-images.githubusercontent.com/10607168/208016993-7b1b6838-5944-4098-85ed-d0ea4567f42f.png)

- Not rebase to latest version

![image-20221210234002553](https://user-images.githubusercontent.com/10607168/208017056-9a209552-29f3-48ab-ad09-90fde458147c.png)

- react 16 test failed

![image-20221212091630186](https://user-images.githubusercontent.com/10607168/208017142-c9ee4169-f2d0-4085-bcff-6c859ec54e71.png)

Repair method:

```bash
npm run install-react-16
npm run test component/XXX
```

## To be collaborator

After a period of continuous maintenance, Collaborators will start the invitation mechanism and initiate a vote in [#3222](https://github.com/ant-design/ant-design/issues/3222). When enough votes are met, you will be officially invited to become a Collaborator.

![Collaborators](https://user-images.githubusercontent.com/5378891/209089697-4fe3f3b3-ef44-4d63-94c2-d93d082c9951.png)

## Don't be afraid to make mistakes, do it bravely, everyone is welcome in the open source world.

![giphy](https://user-images.githubusercontent.com/10607168/208015974-04c3f09b-b5e8-4ef7-af00-0bb5652ec619.gif)

## Related resources

To learn more about Ant Design's development process and considerations, see:

- [contributor development maintenance guide](/docs/blog/contributor-development-maintenance-guide)
