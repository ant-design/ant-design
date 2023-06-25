---
title: 打包体积优化
date: 2023-06-25
author: zombieJ
juejin_url: https://juejin.cn/post/7248424501813674021
---

在现代 JS 应用中，通过模块化打包工具可以自动将一些未使用的模块代码去除，这个过程叫做 [Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)。不过如果你已经对此非常熟悉了，你会发现现实中它并不是那么完美，我们还需要一些额外的操作才能达到最佳的体积优化效果。今天，我们就来讲讲一个 ConfigProvider 导致的 Tree Shaking 失效的问题。

### ConfigProvider 与 rc-field-form

在日常维护中，我们遇到了一些关于使用 ConfigProvider 会导致 BundleSize 变大的问题：

- https://github.com/ant-design/ant-design/issues/41607
- https://github.com/ant-design/ant-design/issues/43019
- https://github.com/ant-design/ant-design/issues/42499

而社区在反馈的同时也把被错误打包进来的包找了出来 `rc-field-form`，这里我们就直接借用一下 issue 中的图示：

<img alt="bundle size" src="https://user-images.githubusercontent.com/44499686/239506452-11161494-76d3-4e80-a53f-57b097008cac.png" />

ConfigProvider 提供了全局化配置能力，其中也包含了 Form 组件校验信息的自定义模板配置：

```tsx
<ConfigProvider form={{ validateMessages }} />
```

<img width="501" alt="Customize" src="https://github.com/ant-design/ant-design/assets/5378891/40081170-af57-44f9-9088-c5cc55e65802">

由于该功能对表单的校验有依赖关系，因而它由底层的 `rc-field-form` 提供的 FormProvider 实现。在 antd 中会先和自身的本地化后的 `validateMessages` 做聚合：

```tsx
// Sample only. Not real world code.
import { FormProvider } from 'rc-field-form';

const ConfigProvider = ({ validateMessages, children }) => {
  const mergedValidateMessages = React.useMemo(
    () => merge(antdDefaultValidateMessages, validateMessages),
    [validateMessages],
  );

  return (
    <FormProvider validateMessages={mergedValidateMessages}>
      <SomeOtherProvider>{children}</SomeOtherProvider>
    </FormProvider>
  );
};
```

而 FormProvider 本身又对 `rc-field-form` 的 FormContext 进行了封装，导致引入 FormProvider 后将 `rc-field-form` 的更多内容给打包进来了：

<img height="300" alt="Deps" src="https://github.com/ant-design/ant-design/assets/5378891/938e2375-e143-4c93-bfc9-207039361479">

你或许会想到，我们是不是可以做一个优化，如果没有配置 `validateMessages` 我们就不调用这个 FormProvider？

```tsx
// Sample only. Not real world code.
import { FormProvider } from 'rc-field-form';

const ConfigProvider = ({ validateMessages, children }) => {
  let node = children;

  if (validateMessages) {
    node = <FormProvider validateMessages={merge(...)}>{node}</FormProvider>;
  }

  return node;
};
```

很遗憾，这是不行的。Tree Shaking 是静态编译过程，而 `validateMessages` 是一个运行时的配置。所以在打包过程中，我们无法知道 `validateMessages` 是否存在，因而无法做到这样的优化。

### 拆解依赖

`rc-field-form` 自然可以调整依赖，让 FormProvider 解耦。但是很明显，我们不应该依赖于第三方库的调整（虽然 `rc-field-form` 也由我们来维护）。我们应该从根本上解决这个问题，让 ConfigProvider 不再依赖于 FormProvider。实现也非常简单，既然这是 `rc-field-form` 所独有的，那么我们直接抽一个 Context 出来，让 ConfigProvider 不再感知 FormProvider 即可：

```tsx
// Sample only. Not real world code.
import { ValidateMessageContext } from '../form/context.ts';

const ConfigProvider = ({ validateMessages, children }) => {
  const mergedValidateMessages = ...

  return (
    // Just use the proxy context
    <ValidateMessageContext value={mergedValidateMessages}>
      <SomeOtherProvider>{children}</SomeOtherProvider>
    </ValidateMessageContext>
  );
};
```

而在 Form 中，同样消费代理的 Context：

```tsx
// Sample only. Not real world code.
import Form, { FormProvider } from 'rc-field-form';
import { ValidateMessageContext } from './context';

export default (props) => {
  const validateMessages = React.useContext(ValidateMessageContext);

  return (
    <FormProvider validateMessages={validateMessages}>
      <Form {...props} />
    </FormProvider>
  );
};
```

依赖就变成了这样，从而实现了解耦：

<img height="400" alt="New Deps" src="https://github.com/ant-design/ant-design/assets/5378891/4fde4332-1110-43a7-9a0e-aef806da59ef">

### 总结

Tree Shaking 提供了一种自动化的方式来优化打包体积，但是我们需要注意一些细节。否则可能不慎导致一些依赖被错误的引入。以上。
