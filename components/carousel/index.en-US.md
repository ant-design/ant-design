---
category: Components
type: Views
title: Carousel
---

A carousel component. Scales with its container.

## When to use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a resolving door.
- Commonly used in a carousel for a group of pictures/cards.

## API

| Property             | Description                                         | Type     | Default                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| effect           | Animation effect, either `scrollx` or `fade`   | String | scrollx |
| dots | Should we show the dots at the bottom of the gallery                | Boolean    | true |
| vertical | Whether to use a vertical display                               | Boolean   | false |
| autoplay | Whether to scroll automatically                                 | Boolean   | false |
| easing | Transition name                                                   | String   | linear |
| beforeChange | Callback function called before the current index changes   | function(from, to) |
| afterChange  | Callback function called after the current index changes    | function(current)  |

For more info on the parameters, refer to the https://github.com/akiran/react-slick

<style>
.ant-carousel .slick-slide {
  text-align: center;
  height: 100px;
  line-height: 100px;
  background: #71B5DE;
  color: #fff;
  overflow: hidden;
}
#components-carousel-demo-vertical .ant-carousel {
  margin-right: 35px;
}
</style>
