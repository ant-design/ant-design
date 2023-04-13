---
title: Dependency troubleshooting
date: 2023-04-13
author: zombieJ
---

As a large component library, Ant Design has complex internal dependencies. Sometimes there is nothing change in antd, but the update of the internal dependencies may also cause the developer's build failure. For example, my recent mistake with [path case error](https://github.com/ant-design/ant-design/issues/41236) made the build fail under Linux.

It's easier to find out the problem with the dependencies own by ourselves. But for third-party dependencies, it is often difficult to find out in the first time. Hours may have passed when developers report, making it somewhat difficult to find differences among hundreds of packages. We have accumulated some troubleshooting experience and will share it with you, but at the same time, in order to solve the problem faster, we have also done some extra things.

### Confirm information

We have added a [template site](https://new-issue.ant.design/) for Github issue. Developers will see the following form when submitting issues, and developers will be asked to fill in the relevant information as completely as possible:

![Issue Helper](https://user-images.githubusercontent.com/5378891/231633510-2e7c7819-12c2-4153-b3c8-4d5576116a08.png)

Most error problems can be combined to dig through antd version, React version, system, and browser version information which helps narrow the scope of troubleshooting as much as possible. Let's roughly determine if it's a general problem or a system-specific problem. Here we will not talk about component implementation bugs, but just talk about dependencies.

### Determine the scope

From the issue being discovered, we can reverse the time range through the commit CI of github:

![Commit List](https://user-images.githubusercontent.com/5378891/231635576-88a84f55-11d9-403c-bece-98d55bf5b893.png)

Then through the issue description, you can determine the approximate package and which ones are related (for example [#41236](https://github.com/ant-design/ant-design/issues/41236) from `@rc-component/trigger`, [#15930](https://github.com/ant-design/ant-design/issues/15930) via `@types/react`). Then check the version release status of the related package through npm:

![Publish Time](https://user-images.githubusercontent.com/5378891/231636272-e423301a-f8df-407e-8d4e-a49e219631e4.png)

When we find relevant updates, we will install the previous version for comparison to see if the build was successful. After checking one by one, we can determine which version the problem is, and we will also raise an issue for the corresponding Github (of course, if there is already one, just +1). At the same time, we also need to send a patch version to temporarily lock the corresponding version and remove it after the next update.

### Schedule build

As you see, the above troubleshooting method has a certain lag. We hope to reduce additional human labor by building regularly, and at the same time allow us to find problems faster. So we reused the [create-next-app-antd](https://github.com/ant-design/create-next-app-antd) project as the base (in this way, if something goes wrong with the template project, we can also be detected in advance). Created a `mock-project-build.yml` CI that executes every half hour, which periodically pulls [create-next-app-antd](https://github.com/ant-design/create-next-app-antd) repo to build:

```yml
on:
  workflow_dispatch:
  schedule:
    - cron: '*/30 * * * *'
```

Pass `--depth=1` to only pull the last commit. Then execute `yarn` to install dependencies to generate the corresponding `yarn.lock` file, and finally execute `yarn build` to build to completely simulate the construction process of a project.

Every time the build is successful, CI will cache the current `yarn.lock` file. In this way, if the next build fails, we can easily pull the two files for comparison to troubleshoot the problem. Although `actions/cache` does not allow cache keys with the same name, it allows `restore-keys` to get the latest cache, which is very convenient:

```yml
- uses: actions/cache@v3
  with:
    path: ~tmpProj/yarn.lock
    key: primes-${{ runner.os }}-${{ github.run_id }}
    restore-keys: mock-proj-lock-file
```

Then monitor the build failure event and compare the `yarn.lock` file to quickly find out the changed dependencies:

```yml
- name: 🎨 Diff Report
  if: ${{ failure() }}
  run: npx diff-yarn-lock --source=~tmpProj/yarn.lock --target=~tmpProj/yarn.lock.failed
```

![Diff](https://user-images.githubusercontent.com/5378891/226313045-83895072-57c1-4135-80cf-16eeecae8c18.png)

![Build List](https://user-images.githubusercontent.com/5378891/231641305-88ec5d5e-6879-458a-8660-9d9828b97fd9.png)

We also push messages to the developer group through the IM push protocol when failed, so we can identify the problem in the first place. The complete script can be viewed [here](https://github.com/ant-design/ant-design/blob/da83561f9cb57b0eb03d18543d96393689f799be/.github/workflows/mock-project-build.yml).

### Finally

We have been continuously optimizing the problems encountered in the maintenance process. If you have any good ideas or suggestions in use, you are welcome to put them in our issue or discussion. Have a nice day.
