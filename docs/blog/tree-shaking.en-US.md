---
title: Bundle Size Optimization
date: 2023-06-25
author: zombieJ
juejin_url: https://juejin.cn/post/7248424501813674021
---

In modern JS applications, unused module can be automatically removed by modular packaging tools. This process is called [Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking). However, if you are already very familiar with it, you will find that it is not so perfect in reality. We still need some extra operations to achieve the best size optimization effect. Today, let's talk about a problem that ConfigProvider causes Tree Shaking to fail.

### ConfigProvider and rc-field-form

In daily maintenance, we encountered some problems that using ConfigProvider would cause bundle size to increase:

- https://github.com/ant-design/ant-design/issues/41607
- https://github.com/ant-design/ant-design/issues/43019
- https://github.com/ant-design/ant-design/issues/42499

The community also found the package that was incorrectly packaged while giving feedback `rc-field-form`. Here we directly borrow the illustration in the issue:

<img alt="bundle size" src="https://user-images.githubusercontent.com/44499686/239506452-11161494-76d3-4e80-a53f-57b097008cac.png" />

ConfigProvider provides global configuration capabilities, which also includes the custom template configuration of Form component verification information:

```tsx
<ConfigProvider form={{ validateMessages }} />
```

<img width="501" alt="Customize" src="https://github.com/ant-design/ant-design/assets/5378891/40081170-af57-44f9-9088-c5cc55e65802">

Since this feature dependents with the verification of the form, it is implemented by the FormProvider provided by the underlying `rc-field-form`. In antd, it will be aggregated with its own localized `validateMessages`:

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

Meanwhile, FormProvider itself encapsulates the FormContext of `rc-field-form`, which causes more content of `rc-field-form` to be packaged after introducing FormProvider:

<img height="300" alt="Deps" src="https://github.com/ant-design/ant-design/assets/5378891/938e2375-e143-4c93-bfc9-207039361479">

You may think, can we optimize it? If `validateMessages` is not configured, we will not call this FormProvider?

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

Unfortunately, this is not possible. Tree Shaking is a static compilation process, and `validateMessages` is a runtime configuration. So in the packaging process, we cannot know whether `validateMessages` exists, so we cannot achieve this optimization.

### Decompose Dependencies

We can adjust `rc-field-form` dependencies, so that FormProvider can be decoupled. But obviously, we should not rely on the adjustment of third-party libraries though `rc-field-form` is also maintained by us. We should solve this problem fundamentally, so that ConfigProvider no longer depends on FormProvider. The implementation is also very simple. Since this is unique to `rc-field-form`, we directly extract a Context, so that ConfigProvider no longer perceives FormProvider:

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

Form also consumes the proxy Context:

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

Decomposing the dependencies in this way:

<img height="400" alt="New Deps" src="https://github.com/ant-design/ant-design/assets/5378891/4fde4332-1110-43a7-9a0e-aef806da59ef">

### Final

Tree Shaking provides an automated way to optimize bundle size, but we need to pay attention to some details. Otherwise, some dependencies may be incorrectly introduced. Thanks.
