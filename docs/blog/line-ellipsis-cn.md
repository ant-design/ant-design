---
title: 行省略计算
date: 2024-03-01
author: zombieJ
---

Ant Design 的 Typography 组件提供了一个 `ellipsis` 属性，用于在文本溢出时显示省略号。它支持通过配置 `ellipsis.rows` 来限定显示的行数。如果是纯粹的文本内容，它会通过 CSS `-webkit-line-clamp` 属性来实现。虽然有 `-webkit-` 前缀，但是在现代浏览器中都已经得到了很好的支持。

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

## CSS 的一些问题

然而 CSS 实现也有限制，那就是不支持对省略符号的修改以及对附加操作按钮的支持（比如置于最后的 复制、编辑、展开 等按钮）。

![with action](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZdC2QI1zZSUAAAAAAAAAAAAADrJ8AQ/original)

操作按钮会被一同截断，无法显示。

![ellipsis with action](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*B5qwQpqabcIAAAAAAAAAAAAADrJ8AQ/original)

虽然有一些黑魔法手段可以通过诸如 `float` 样式来实现，但是这样的方式在不同的浏览器中需要做针对性处理。此外仍然无法解决自定义省略符号的问题。因而目前最好的实现方式仍然是通过 JS 来实现。

## JS 实现

JS 中，我们通过二分法可以快速的找到文本的截断位置。只要根据 `rows` 推断出文本的高度，然后进行遍历，找到最大可以展示的文字数量即可：

![Cell Cut](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5YEYSaToC3YAAAAAAAAAAAAADrJ8AQ/original)

而行高则可以通过模拟埋入一个 `span` 来获取：

```tsx
<div>
  {text}
  {measuring && <span ref={measureRef}>&nbsp;</span>}
</div>
```

![Measure](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JR2ZTqbI1FYAAAAAAAAAAAAADrJ8AQ/original)

但是这样的方式也有一些问题，对于混合行高的场景（比如添加了图片、嵌入不同大小的文字等等）。这种计算方式往往会估算出错误的总高度，而使得裁剪位置不准确：

![Mixed Line Height](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JWqWT6__CnsAAAAAAAAAAAAADrJ8AQ/original)

由于图片高度超出了行高，导致计算认为这个图片占用了两行的高度。同时又因为图片本身无法裁剪，使得最终省略行数错误（3 行省略变成了 2 行）：

![Mixed Line Height Ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tysQSpDKnFsAAAAAAAAAAAAADrJ8AQ/original)

如果图片在第一行，那整个文本就会被截断：

![Image on the first line](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SjPKRKx_j8UAAAAAAAAAAAAADrJ8AQ/original)

而如果使用 CSS 则不会有这个问题：

![CSS Ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*59FqR6h5K5UAAAAAAAAAAAAADrJ8AQ/original)

## 混合测量

为了解决这个问题，我们可以通过混合测量的方式来解决。即通过 CSS 来测量原生多行省略的总高度，然后再通过 JS 进行二分法来确定文本的截断位置最终不要超过 CSS 测量的总高度：

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

这样就可以准确的处理混合行高的场景：

![Mixed Line Height Ellipsis](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*IMv0ToSovTwAAAAAAAAAAAAADrJ8AQ/original)

## 总结

通过混合测量的方式，我们可以非常容易的利用 CSS 的准确性和 JS 的灵活性，实现即使在包含图片等不同行高元素的复杂内容中，也能实现准确的文本截断。

该重构已经在 `5.15.0` 中发布，欢迎体验。
