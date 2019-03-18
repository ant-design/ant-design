---
category: Components
type: Data Display
title: Empty
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

## API

```jsx
<Empty>
  <Button>Create</Button>
</Empty>
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| description | Customize description | string \| ReactNode | - |
| imageStyle | style of image | same as style | - |
| image | Customize image. Will tread as image url when string provided. since 3.16.0,you can choose another style of image by setting image to `Empty.PRESENTED_IMAGE_SIMPLE`. | string \| ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |
