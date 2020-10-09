---
category: Components
type: Data Display
title: Timeline
cover: https://gw.alipayobjects.com/zos/antfincdn/vJmo00mmgR/Timeline.svg
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

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| pending | Set the last ghost node's existence or its content | ReactNode | false |
| pendingDot | Set the dot of the last ghost node when pending is true | ReactNode | &lt;LoadingOutlined /> |
| reverse | Whether reverse nodes or not | boolean | false |
| mode | By sending `alternate` the timeline will distribute the nodes to the left and right | `left` \| `alternate` \| `right` | - |

### Timeline.Item

Node of timeline

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| color | Set the circle's color to `blue`, `red`, `green`, `gray` or other custom colors | string | `blue` |
| dot | Customize timeline dot | ReactNode | - |
| position | Customize node position | `left` \| `right` | - |
| label | Set the label | ReactNode | - |
