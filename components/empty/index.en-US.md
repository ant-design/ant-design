---
category: Components
type: Data Display
title: Empty
cols: 1
---

Empty state placeholder.

## When To Use

- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

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

## Built-in images

+ Empty.PRESENTED_IMAGE_SIMPLE

  <img src="https://user-images.githubusercontent.com/507615/54591679-b0ceb580-4a65-11e9-925c-ad15b4eae93d.png" height="35px">

+ Empty.PRESENTED_IMAGE_DEFAULT

  <img src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" height="100px">
