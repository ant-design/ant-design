---
category: Components
type: Data Display
title: Carousel
---

A carousel component. Scales with its container.

## When To Use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a revolving door.
- Commonly used for a group of pictures/cards.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| afterChange | Callback function called after the current index changes | function(current) | - | 3.0.0 |
| autoplay | Whether to scroll automatically | boolean | `false` | 3.0.0 |
| beforeChange | Callback function called before the current index changes | function(from, to) | - | 3.0.0 |
| dotPosition | The position of the dots, which can be one of `top` `bottom` `left` `right` | string | bottom | 3.17.0 |
| dots | Whether to show the dots at the bottom of the gallery | boolean | `true` | 3.0.0 |
| easing | Transition interpolation function name | string | `linear` | 3.0.0 |
| effect | Transition effect | `scrollx` \| `fade` | `scrollx` | 3.0.0 |

## Methods

| Name | Description | Version Added |
| --- | --- | --- |
| goTo(slideNumber, dontAnimate) | Go to slide index, if dontAnimate=true, it happens without animation | 3.9.3 |
| next() | Change current slide to next slide | 3.0.0 |
| prev() | Change current slide to previous slide | 3.0.0 |

For more info on the parameters, refer to the <https://github.com/akiran/react-slick>
