---
title: Line Ellipsis Calculation
date: 2024-03-01
author: zombieJ
---

Ant Design's Typography component provides an `ellipsis` property to display ellipsis when text overflows. It supports limiting the number of displayed lines through the `ellipsis.rows` configuration. If it is pure text content, it will be implemented through the CSS `-webkit-line-clamp` property. Although it has a `-webkit-` prefix, it has been well supported in modern browsers.

```tsx
<div
  style={{
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    webkitLineClamp: 3,
  }}
>
  {text}
</div>
```

![row ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7tAJRZNqEnwAAAAAAAAAAAAADrJ8AQ/original)

## Some issues with CSS

However, CSS implementation also has limitations, that is, it does not support modifying the ellipsis and supporting additional action buttons (such as copy, edit, expand, etc.):

![with action](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZdC2QI1zZSUAAAAAAAAAAAAADrJ8AQ/original)

Operational buttons will be truncated together and cannot be displayed.

![ellipsis with action](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*B5qwQpqabcIAAAAAAAAAAAAADrJ8AQ/original)

Though there are some magic methods to achieve this through styles such as `float`, this method requires targeted processing in different browsers. In addition, it still cannot solve the problem of custom ellipsis. Therefore, the best implementation method is still through JS.

## Using JS

With JS, we can quickly find the truncation position of the text through binary search. As long as the height of the text is inferred based on `rows`, we can traverse and find the maximum number of characters that can be displayed:

![Cell Cut](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5YEYSaToC3YAAAAAAAAAAAAADrJ8AQ/original)

And get the line height by simulating an embedded `span`:

```tsx
<div>
  {text}
  {measuring && <span ref={measureRef}>&nbsp;</span>}
</div>
```

![Measure](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JR2ZTqbI1FYAAAAAAAAAAAAADrJ8AQ/original)

But this method also has some problems, for mixed line height scenarios (such as adding images, embedding different sizes of text, etc.). This calculation method often estimates the wrong total height, making the truncation position inaccurate:

![Mixed Line Height](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JWqWT6__CnsAAAAAAAAAAAAADrJ8AQ/original)

Since the height of the image exceeds the line height, the calculation thinks that the image occupies the height of two lines. At the same time, because the image itself cannot be truncated, the final number of ellipsis lines is incorrect (3 lines of ellipsis becomes 2 lines):

![Mixed Line Height Ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tysQSpDKnFsAAAAAAAAAAAAADrJ8AQ/original)

Even worse, if the image is on the first line, the entire text will be truncated:

![Image on the first line](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SjPKRKx_j8UAAAAAAAAAAAAADrJ8AQ/original)

But if you use CSS, there will be no such problem:

![CSS Ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*59FqR6h5K5UAAAAAAAAAAAAADrJ8AQ/original)

## Mixed Measurement

To solve this problem, we can use a mixed measurement method. That is, use CSS to measure the total height of the native multi-line ellipsis, and then use JS to perform binary search to ensure that the truncation position of the text does not exceed the total height measured by CSS:

```tsx
<div ref={measureRef} style={ellipsisStyle}>
  {text}
</div>;

const cssHeight = measureRef.current.clientHeight;
```

```tsx
// pseudocode. Not used in real world
<div ref={walkingMeasureRef}>{text.slice(0, walkingMeasureIndex)}</div>;

if (walkingMeasureRef.current.clientHeight > cssHeight) {
  // Not meet the requirement
}
```

This helps to accurately handle mixed line height scenarios:

![Mixed Line Height Ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*IMv0ToSovTwAAAAAAAAAAAAADrJ8AQ/original)

## Summary

The mixed measurement method allows us to easily use the accuracy of CSS and the flexibility of JS to achieve accurate text truncation even in complex content containing images and other elements with different line heights.

This refactoring has been released in `5.15.0`, welcome to experience it.
