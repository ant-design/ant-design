---
title: Contributor development maintenance guide
date: 2023-03-10
author: kiner-tang
---

Hi, my name is [kiner-tang(文辉)](https://github.com/kiner-tang). My personal work is closely related to **AntDesign**, so I can be considered a heavy user of **AntDesign**.It is for this reason that I am slowly working my way up from a user to a Contributor, contributing some of the problems I encountered and the new features I concluded to the community, and finally being honored to become a member of **AntDesign Collaborator**.

During the journey from user to contributor, and then from contributor to collaborator, I also encountered many problems. I would like to take this opportunity to sort out and summarize these problems, hoping to be helpful to new contributors and collaborators joining **AntDesign** community.

## Regular Contributor

### About dependent version

Popular package managers, whether npm, yarn, or pnpm, offer version-locking solutions that, most of the time, help us avoid version-inconsistencies in packages.However, in **ant-design** projects, many functions depend on the original components in the **react-component** repository. We expect that when we encounter some bugs, after the **react-component** fixes and releases the patch version, Instead of manually upgrading the version in the **ant-design** project, we can install the latest patch installation package only by reinstalling the dependencies.At this point, the version-lock file provided by the package manager is the main obstacle to automatic updates, because once the version-lock file is available, reinstalling the dependency will also install the version specified by the lock file and cannot be upgraded to the patch version.

Based on the above reasons, we adopt the following methods:

1. Add `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` and other version lock files to `.gitignore` without version tracking.

2. In `package.json`, for the dependencies that we want to update when there is a new patch version, we use `~` description version number to allow patch version update.

```json
{
  "dependencies": {
    "rc-cascader": "~3.9.0"
  }
}
```

For the difference between `^` and `~` in the version description of package.json, see [package.json 文件^和~区别](https://blog.csdn.net/shan1991fei/article/details/125430971).

Thus, when our dependency such as rc-cascader fixes a bug and releases a patch version such as: `3.9.1`, then the user's latest installed version is `3.9.1`. For the maintainer of ant-design, we only need to execute the following command:

```bash
# Clean up the local lockfile, although this file will not be included in the version tracking, it will still be generated when running yarn installation dependencies, so it is still necessary to clean it, or you can use: yarn --no-lockfile during installation, so that no lockfile will be generated
yarn clean-lockfiles
# Reinstall dependencies
yarn add rc-cascader
```

### Snapshot update problem

In **ant-design**, we use jest for unit testing and coverage testing, with many first-time references Students of **ant-design** project development may often find that they just modify the text in a demo. Why does the CI test task fail as soon as they push it? This starts with ant-design's snapshot detection.

In most libraries, the concept of idempotence is emphasized, meaning that the same method, no matter how many times I execute the line, as long as the input parameters are the same, then the result will be the same.In **ant-design**, I think the biggest use of snapshot detection is to verify the idempotence of our demo, so as to ensure the stability and certainty of component output.In fact, the principle of snapshot detection is very simple, is to save our demo generated html string, the next time in the running of the test task for comparison, if there is a difference that indicates that the snapshot detection failed.

Going back to the original question, what should we do if we change a demo and find that the snapshot detection fails?

1. First of all, we need to check the inconsistency of snapshot comparison to see if it is the expected change. If only the text is changed, and only the text is different from the snapshot comparison result, we just need to run the following command to update the snapshot:

   ```bash
   # Run the test command to update snapshot
   yarn test -u
   ```

2. However, if the changes during snapshot comparison exceed the scope of your modification this time, for example, you only changed the text, but found that classnames in snapshots have changed, which obviously does not meet expectations, we need to rectify the causes.

   The common causes are as follows:

   - Local dependency is too old, it is possible to pull the latest code, but did not update the local dependency, resulting in the dependency package version is too low and the output results are inconsistent.The

     solution is as simple as deleting the lock file、node_modules，and reinstall dependencies.

   - You may have locally changed the core code in addition to the demo, causing the logic to change. You need to go over this change carefully.

### rc-x Library dependencies

In **ant-design**, most components are an upper encapsulation of a component based on **react-component**. Therefore, if a user reports a bug, when we troubleshoot the problem, if we find the problem is in the **@react-component/xxx** or **rc-xxx** component, Then we need to put pr on those components to fix it.After the fix, we need to verify the fix results in the **ant-design** project, then we can link the project to the **ant-design** project for verification.For example:

Run `yarn link` under the rc project.

![001](https://user-images.githubusercontent.com/10286961/224358206-828e2baf-d76d-46e6-ac02-25609963a003.png)

Run `yarn link "Project name"` in **ant-design**

![002](https://user-images.githubusercontent.com/10286961/224358294-219a47b0-4621-4732-85ff-3f350ea1f72e.png)

Once we have verified, we can mention pr to the rc component.It should be noted that link may cause an exception when running the test command. Therefore, after local verification, we need to run the following

command locally to delete the package from link:

```bash
yarn unlink "rc-field-form"
yarn install --force
```

When the pr is finally merged, usually the maintainer will release a version. If the patch version is released, then you only need to install and verify it in the **ant-design** project, but if the minor version is released, Then we also need to take the initiative to upgrade the version in the ant-design project, and after passing the local verification, a separate pr to ant-design for upgrade repair.

### Property expiration

In a large project, if you want to scrap an property or method, it is actually very troublesome, because your project may already have a lot of items in use, if you kill it, then others upgrade the console screen will be red, or even can't run.But in the process of project iteration, we will encounter more and more scenes and problems, a long time ago solution may no longer fit, really need to scrap, then, we need to adopt a soft, less radical way to scrap, leave enough time for users to modify.

In **ant-design**, we adopt a **five-step strategic** obsolescence property or method:

1. **Add an expiration mark to the property**

   ![003](https://user-images.githubusercontent.com/10286961/224358324-8f72f2c0-d5bb-4281-9b29-7e2428353449.png)

   When we add the above expired tag, we can see later using this variable:

   ![004](https://user-images.githubusercontent.com/10286961/224358351-958a168d-41de-44b0-8244-2f8d67c4d13a.png)

2. **Add console warnings**

![005](https://user-images.githubusercontent.com/10286961/224358371-09f08f79-8c95-4126-b382-59311bb702d6.png)

It is important to note that after adding console warnings, we need to add a test case to the test case to test whether the warnings will be displayed if the expired properties are used, so as to ensure that the warnings can be displayed normally.

![006](https://user-images.githubusercontent.com/10286961/224358407-3d89d2f5-b4aa-48b4-aab8-1331a0f620fa.png)

3. **Update document**: The above two steps are mainly to warn developers in the editor and browser preview. Next, we need to update the relevant software documentation. Generally speaking, if we need an expired property, it means that it is not recommended for users to use. And add the description of the new property simultaneously.(PS: If it cannot be deleted due to special circumstances, please specify the version supported by this property and the alternative scheme in the remarks column)

4. **Compatibility between old and new**: Now that we're done with the early tips, it's important to make sure that the new property and the old one live in harmony for a while until the old one dies. That is to say, currently we use expired property to work normally, in addition to the warning, can not have any changes.

   ![007](https://user-images.githubusercontent.com/10286961/224358439-76c42c78-e244-42bd-8935-b08f536931a2.png)

   We can do something like this, making sure that the new property takes precedence over the old one, and only trying to use the old one if no new one exists.At this point, our property expiration work is done.

5. **Wipe out**: After our properties have expired for a certain period of time, usually when the major version number is upgraded, we can remove the obsolescence. We also need to delete comments, warnings, test cases, and documents that were added to obsolete the property etc. At this point our property abandonment work is done.

## New Collaborator

After contributing for some time, I believe you have gained a deeper understanding of **AntDesign's** overall development process and project architecture. At this point, you may want to take on more tasks and contribute more to the open source community.Then, you can apply to be a Collaborator at **AntDesign** by commenting on the link below for more active contributors. [Add Collaborator permission for some active contributors](https://github.com/ant-design/ant-design/issues/3222), The Collaborators will then start the voting process, and after passing the voting, they will invite you to officially become a Collaborator at AntDesign.

After you become a newly appointed AntDesign collaborator, you will be assigned some additional rights, such as:

- Tag the issue
- Close the issue
- Free to create branches under the AntDesign project
- Free to merge approved PR

- ...

There are some caveats to this.

### Merge PR

At this point, you can merge the approved PR, but merging code is tricky, knowing when to use squash and when not to.

![008](https://user-images.githubusercontent.com/10286961/224358476-2332e36f-0adf-486f-8b17-1b2ad34926aa.jpg)

- **Merge pull Request**: Normally merge the current PR into the target branch usually when branch to branch merge each other, do not merge the commit record, do not merge PR, or you will forget to add the target branch too many redundant commit records.
- **Squash and merge**: Merge commit records into a squash and merge into the target branch(this is usually used for merging PR).
- **Rebase and merge**：When you want to adjust the baseline

Before merging branches, it is a good idea to check with the author that they have been fully modified and that they have been carefully reviewed. And at least one maintainer approves this PR. Determine which of the above scenarios this PR is, and then choose the appropriate way to merge.

### Identify XY Problems

As a collaborator, you may often communicate with users, so you are very likely to encounter XY problems, XY problems seriously affect our troubleshooting efficiency, therefore, we need to have a basic cognition and discrimination of XY problems, and learn how to avoid falling into the trap of XY problems.

- [高效沟通的拦路虎——XY 问题](https://zhuanlan.zhihu.com/p/612569093)
- [X-Y PROBLEM](https://coolshell.cn/articles/10804.html)

## Epilogue

Finally, we sincerely hope that more and more contributors and collaborators can join us to build a more efficient and elegant AntDesign.
