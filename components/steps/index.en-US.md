---
category: Components
group: Navigation
title: Steps
cover: https://gw.alipayobjects.com/zos/antfincdn/UZYqMizXHaj/Steps.svg
demo:
  cols: 2
---

`Steps` is a navigation bar that guides users through the steps of a task.

## When To Use

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

### Usage upgrade after 4.24.0

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="After version 4.24.0, we provide a simpler usage <Steps items={[...]} /> with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0." />, mountNode);
```

## Examples

<code src="./demo/deprecated.tsx">Basic (deprecated syntactic sugar)</code>
<code src="./demo/simple.tsx">Basic</code>
<code src="./demo/small-size.tsx">Mini version</code>
<code src="./demo/icon.tsx">With icon</code>
<code src="./demo/step-next.tsx">Switch Step</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/vertical-small.tsx">Vertical mini version</code>
<code src="./demo/error.tsx">Error status</code>
<code src="./demo/progress-dot.tsx">Dot Style</code>
<code src="./demo/customized-progress-dot.tsx">Customized Dot Style</code>
<code src="./demo/progress-dot-small.tsx" debug>Dot Style Size Small</code>
<code src="./demo/clickable.tsx">Clickable</code>
<code src="./demo/nav.tsx">Navigation Steps</code>
<code src="./demo/progress.tsx">Steps with progress</code>
<code src="./demo/label-placement.tsx">Label Placement</code>
<code src="./demo/progress-debug.tsx" debug>Progress Debug</code>
<code src="./demo/steps-in-steps.tsx" debug>Steps inside Steps</code>
<code src="./demo/inline.tsx">Inline Steps</code>

## API

```jsx
// works when >=4.24.0, recommended ✅
const items = [{ title: 'first step' }, { title: 'second step' }, { title: 'third step' }];
return <Tabs items={items} />;

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

| Property       | Description                                                                                                              | Type                                                                   | Default      | Version     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------ | ----------- |
| className      | Additional class to Steps                                                                                                | string                                                                 | -            |             |
| current        | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step`                       | number                                                                 | 0            |             |
| direction      | To specify the direction of the step bar, `horizontal` or `vertical`                                                     | string                                                                 | `horizontal` |             |
| initial        | Set the initial step, counting from 0                                                                                    | number                                                                 | 0            |             |
| labelPlacement | Place title and description with `horizontal` or `vertical` direction                                                    | string                                                                 | `horizontal` |             |
| percent        | Progress circle percentage of current step in `process` status (only works on basic Steps)                               | number                                                                 | -            | 4.5.0       |
| progressDot    | Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be `vertical` | boolean \| (iconDot, {index, status, title, description}) => ReactNode | false        |             |
| responsive     | Change to vertical direction when screen width smaller than `532px`                                                      | boolean                                                                | true         |             |
| size           | To specify the size of the step bar, `default` and `small` are currently supported                                       | string                                                                 | `default`    |             |
| status         | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error`      | string                                                                 | `process`    |             |
| type           | Type of steps, can be set to one of the following values: `default` `navigation` `inline`                                | string                                                                 | `default`    | inline: 5.0 |
| onChange       | Trigger when Step is changed                                                                                             | (current) => void                                                      | -            |             |
| items          | StepItem content                                                                                                         | [StepItem](#StepItem)                                                  | []           | 4.24.0      |

### `type="inline"`

| Property  | Description                                                                                                         | Type                  | Default   | Version |
| --------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- | --------- | ------- |
| className | Additional class to Steps                                                                                           | string                | -         |         |
| current   | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step`                  | number                | 0         |         |
| initial   | Set the initial step, counting from 0                                                                               | number                | 0         |         |
| status    | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string                | `process` |         |
| onChange  | Trigger when Step is changed                                                                                        | (current) => void     | -         |         |
| items     | StepItem content. not supported: `icon` `subtitle`                                                                  | [StepItem](#StepItem) | []        | 4.24.0  |

### StepItem

A single step in the step bar.

| Property    | Description                                                                                                                                           | Type      | Default | Version |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- | ------- |
| description | Description of the step, optional property                                                                                                            | ReactNode | -       |         |
| disabled    | Disable click                                                                                                                                         | boolean   | false   |         |
| icon        | Icon of the step, optional property                                                                                                                   | ReactNode | -       |         |
| status      | To specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string    | `wait`  |         |
| subTitle    | Subtitle of the step                                                                                                                                  | ReactNode | -       |         |
| title       | Title of the step                                                                                                                                     | ReactNode | -       |         |
