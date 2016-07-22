---
category: Components
type: Views
title: Timeline
---

Vertical display timeline.

## When To Use

- When a series of information need to be lined from top to bottom by time.
- When need a timeline to make a visual connection.

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

| Property      | Description                                     | Type       | Default |
|----------|----------------------------------------|------------|-------|
| pending  | to set the last ghost node's existence or its content | boolean or React.Element | false  |

### Timeline.Item

Node of timeline

| Property      | Description                                     | Type       | Default |
|----------|------------------------------------------|------------|-------|
| color   | to set the circle's color to `blue, red, green` or other custom colors | string | blue  |
| dot   | custom timeline dot | React.Element | -  |
