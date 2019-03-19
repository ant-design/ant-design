---
category: Components
type: Data Display
title: Empty
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.


## Built-in image

+ Empty.PRESENTED_IMAGE_SIMPLE

+ Empty.PRESENTED_IMAGE_DEFAULT

## API

```jsx
<Empty>
  <Button>Create</Button>
</Empty>
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| description | Customize description | string \| ReactNode | - |
| imageStyle | style of image |  CSSProperties | - |
| image | Customize image. Will tread as image url when string provided. | string \| ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |
