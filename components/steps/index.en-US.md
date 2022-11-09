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

### Usage upgrade after 4.24.0

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="After version 4.24.0, we provide a simpler usage <Steps items={[...]} /> with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0." />, mountNode);
```

```jsx
// works when >=4.24.0, recommended ✅
const items = [{ title: 'first step' }, { title: 'second step' }, { title: 'third step' }];
return <Steps items={items} />;

// works when <4.24.0, deprecated when >=4.24.0 🙅🏻‍♀️
<Steps>
  <Step title="first step" />
  <Step title="second step" />
  <Step title="third step" />
</Steps>;
```

## API

### Steps

The whole of the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | Additional class to Steps | string | - |  |
| current | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step` | number | 0 |  |
| direction | To specify the direction of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| initial | Set the initial step, counting from 0 | number | 0 |  |
| labelPlacement | Place title and description with `horizontal` or `vertical` direction | string | `horizontal` |  |
| percent | Progress circle percentage of current step in `process` status (only works on basic Steps) | number | - | 4.5.0 |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be `vertical` | boolean \| (iconDot, {index, status, title, description}) => ReactNode | false |  |
| responsive | Change to vertical direction when screen width smaller than `532px` | boolean | true |  |
| size | To specify the size of the step bar, `default` and `small` are currently supported | string | `default` |  |
| status | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |  |
| type | Type of steps, can be set to one of the following values: `default`, `navigation` | string | `default` |  |
| onChange | Trigger when Step is changed | (current) => void | - |  |
| items | StepItem content | [StepItem](#StepItem) | [] | 4.24.0 |

### StepItem

A single step in the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| description | Description of the step, optional property | ReactNode | - |  |
| disabled | Disable click | boolean | false |  |
| icon | Icon of the step, optional property | ReactNode | - |  |
| status | To specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |  |
| subTitle | Subtitle of the step | ReactNode | - |  |
| title | Title of the step | ReactNode | - |  |
