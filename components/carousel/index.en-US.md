---
category: Components
group: Data Display
title: Carousel
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bPMSSqbaTMkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a-58QpYnqOsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

A carousel component. Scales with its container.

## When To Use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a revolving door.
- Commonly used for a group of pictures/cards.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/position.tsx">Position</code>
<code src="./demo/autoplay.tsx">Scroll automatically</code>
<code src="./demo/fade.tsx">Fade in</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoplay | Whether to scroll automatically | boolean | false |  |
| dotPosition | The position of the dots, which can be one of `top` `bottom` `left` `right` | string | `bottom` |  |
| dots | Whether to show the dots at the bottom of the gallery, `object` for `dotsClass` and any others | boolean \| { className?: string } | true |  |
| easing | Transition interpolation function name | string | `linear` |  |
| effect | Transition effect | `scrollx` \| `fade` | `scrollx` |  |
| afterChange | Callback function called after the current index changes | function(current) | - |  |
| beforeChange | Callback function called before the current index changes | function(from, to) | - |  |

## Methods

| Name | Description |
| --- | --- |
| goTo(slideNumber, dontAnimate) | Go to slide index, if dontAnimate=true, it happens without animation |
| next() | Change current slide to next slide |
| prev() | Change current slide to previous slide |

Find more APIs in react-slick [documentation](https://react-slick.neostack.com/docs/api).

## FAQ

### How to add custom arrows?

See [#12479](https://github.com/ant-design/ant-design/issues/12479).
