---
category: Components
type: Navigation
cols: 1
title: Steps
---

`Steps` is a navigation bar that guides users through the steps of a task.

## When To Use

When the task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## API

```jsx
<Steps>
  <Step title="first step" />
  <Step title="second step" />
  <Step title="third step" />
</Steps>
```

### Steps

The whole of the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | additional class to Steps | string | - | 3.11.3 |
| current | to set the current step, counting from 0. You can overwrite this state by using `status` of `Step` | number | 0 |  |
| direction | to specify the direction of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| labelPlacement | place title and description with `horizontal` or `vertical` direction | string | `horizontal` | 3.7.3 |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be `vertical` | Boolean or (iconDot, {index, status, title, description}) => ReactNode | false |  |
| size | to specify the size of the step bar, `default` and `small` are currently supported | string | `default` |  |
| status | to specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |  |
| initial | set the initial step, counting from 0 | number | 0 | 3.9.0 |
| onChange | Trigger when Step click to change | (current) => void | - | 3.19.0 |

### Steps.Step

A single step in the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| description | description of the step, optional property | string\|ReactNode | - |  |
| icon | icon of the step, optional property | string\|ReactNode | - |  |
| status | to specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |  |
| title | title of the step | string\|ReactNode | - |  |
