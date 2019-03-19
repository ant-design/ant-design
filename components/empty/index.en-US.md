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

![image](https://user-images.githubusercontent.com/507615/54591679-b0ceb580-4a65-11e9-925c-ad15b4eae93d.png)


+ Empty.PRESENTED_IMAGE_DEFAULT

![image](https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png)

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
