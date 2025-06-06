---
category: Components
group: Navigation
title: Steps
description: A navigation bar that guides users through the steps of a task.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*677sTqCpE3wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cFsBQLA0b7UAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## Examples

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">Basic</code>
<code src="./demo/error.tsx">Error status</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/clickable.tsx">Clickable</code>
<code src="./demo/panel.tsx">Panel Steps</code>
<code src="./demo/icon.tsx">With icon</code>
<code src="./demo/step-next.tsx" debug>Switch Step</code>
<code src="./demo/title-placement.tsx">Title Placement and Progress</code>
<code src="./demo/progress-dot.tsx">Dot Style</code>
<code src="./demo/customized-progress-dot.tsx" debug>Customized Dot Style</code>
<code src="./demo/nav.tsx">Navigation Steps</code>
<code src="./demo/progress.tsx" debug>Steps with progress</code>
<code src="./demo/progress-debug.tsx" debug>Progress Debug</code>
<code src="./demo/steps-in-steps.tsx" debug>Steps inside Steps</code>
<code src="./demo/inline.tsx">Inline Steps</code>
<code src="./demo/inline-variant.tsx">Inline Style Combination</code>
<code src="./demo/variant-debug.tsx" debug>Variant Debug</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Steps

The whole of the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Semantic DOM class | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| current | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step` | number | 0 |  |
| ~~direction~~ | To specify the direction of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| iconRender | Custom render icon, please use `items.icon` first | (oriNode, info: { index, active, item }) => ReactNode | - |  |
| initial | Set the initial step, counting from 0 | number | 0 |  |
| ~~labelPlacement~~ | Place title and content with `horizontal` or `vertical` direction | string | `horizontal` |  |
| orientation | To specify the orientation of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| percent | Progress circle percentage of current step in `process` status (only works on basic Steps) | number | - | 4.5.0 |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. `titlePlacement` will be `vertical` | boolean \| (iconDot, { index, status, title, content }) => ReactNode | false |  |
| responsive | Change to vertical direction when screen width smaller than `532px` | boolean | true |  |
| size | To specify the size of the step bar, `default` and `small` are currently supported | string | `default` |  |
| status | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |  |
| styles | Semantic DOM style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - |  |
| titlePlacement | Place title and content with `horizontal` or `vertical` direction | string | `horizontal` |  |
| type | Type of steps, can be set to one of the following values: `default` `dot` `inline` `navigation` `panel` | string | `default` |  |
| variant | Config style variant | `filled` \| `outlined` | `filled` |  |
| onChange | Trigger when Step is changed | (current) => void | - |  |
| items | StepItem content | [StepItem](#stepitem) | [] | 4.24.0 |

### StepItem

A single step in the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| content | Description of the step, optional property | ReactNode | - |  |
| ~~description~~ | Description of the step, optional property | ReactNode | - |  |
| disabled | Disable click | boolean | false |  |
| icon | Icon of the step, optional property | ReactNode | - |  |
| status | To specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |  |
| subTitle | Subtitle of the step | ReactNode | - |  |
| title | Title of the step | ReactNode | - |  |

## Semantic DOM

### Steps

<code src="./demo/_semantic.tsx" simplify="true"></code>

### StepItem

<code src="./demo/_semantic_items.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Steps"></ComponentTokenTable>
