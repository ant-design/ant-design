---
category: Components
type: Data Display
title: Timeline
---

Vertical display timeline.

## When To Use

- When a series of information needs to be ordered by time (ascending or descending).
- When you need a timeline to make a visual connection.

## API

```jsx
<Timeline>
  <Timeline.Item>step1 2015-09-01</Timeline.Item>
  <Timeline.Item>step2 2015-09-01</Timeline.Item>
  <Timeline.Item>step3 2015-09-01</Timeline.Item>
  <Timeline.Item>step4 2015-09-01</Timeline.Item>
</Timeline>
```

### Timeline

Timeline

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| pending | Set the last ghost node's existence or its content | boolean\|string\|ReactNode | `false` | 3.0.0 |
| pendingDot | Set the dot of the last ghost node when pending is true | string\|ReactNode | `<Icon type="loading" />` | 3.3.0 |
| reverse | reverse nodes or not | boolean | false | 3.5.0 |
| mode | By sending `alternate` the timeline will distribute the nodes to the left and right. | `left` \| `alternate` \| `right` | - | 3.8.0 |

### Timeline.Item

Node of timeline

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| color | Set the circle's color to `blue`, `red`, `green` or other custom colors | string | `blue` | 3.0.0 |
| dot | Customize timeline dot | string\|ReactNode | - | 3.0.0 |
| position | Customize node position | `left` \| `right` | - | 3.17.0 |
