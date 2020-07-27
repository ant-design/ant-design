---
category: Components
type: Navigation
cols: 1
title: Steps
cover: https://gw.alipayobjects.com/zos/antfincdn/UZYqMizXHaj/Steps.svg
---

`Steps` is a navigation bar that guides users through the steps of a task.

## When To Use

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

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
| className | Additional class to Steps | string | - |  |
| type | Type of steps, can be set to one of the following values: `default`, `navigation` | string | `default` |  |
| current | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step` | number | 0 |  |
| direction | To specify the direction of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| labelPlacement | Place title and description with `horizontal` or `vertical` direction | string | `horizontal` |  |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be `vertical` | boolean \| (iconDot, {index, status, title, description}) => ReactNode | false |  |
| size | To specify the size of the step bar, `default` and `small` are currently supported | string | `default` |  |
| status | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |  |
| initial | Set the initial step, counting from 0 | number | 0 |  |
| onChange | Trigger when Step is changed | (current) => void | - |  |
| percent | Progress circle percentage of current step in `process` status | number | - | 4.5.0 |

### Steps.Step

A single step in the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| description | Description of the step, optional property | string \| ReactNode | - |  |
| icon | Icon of the step, optional property | string \| ReactNode | - |  |
| status | To specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |  |
| title | Title of the step | string \| ReactNode | - |  |
| subTitle | Subtitle of the step | string \| ReactNode | - |  |
| disabled | Disable click | boolean | false |  |
