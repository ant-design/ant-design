---
category: Components
group: Data Display
title: Carousel
description: A set of carousel areas.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bPMSSqbaTMkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a-58QpYnqOsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

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
<code src="./demo/arrows.tsx" version="5.17.0">Arrows for switching</code>
<code src="./demo/dot-duration.tsx" version="5.24.0">Progress of dots</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrows | Whether to show switch arrows | boolean | false | 5.17.0 |
| autoplay | Whether to scroll automatically, you can specify `autoplay={{ dotDuration: true }}` to display the progress bar | boolean \| { dotDuration?: boolean } | false | dotDuration: 5.24.0 |
| autoplaySpeed | Delay between each auto scroll (in milliseconds) | number | 3000 |  |
| adaptiveHeight | Adjust the slide's height automatically | boolean | false |  |
| dotPosition | The position of the dots, which can be one of `top` `bottom` `left` `right` | string | `bottom` |  |
| dots | Whether to show the dots at the bottom of the gallery, `object` for `dotsClass` | boolean \| { className?: string } | true |  |
| draggable | Enable scrollable via dragging on desktop | boolean | false |  |
| fade | Whether to use fade transition | boolean | false |  |
| infinite | Infinitely wrap around contents | boolean | true |  |
| speed | Animation speed in milliseconds | number | 500 |  |
| easing | Transition interpolation function name | string | `linear` |  |
| effect | Transition effect | `scrollx` \| `fade` | `scrollx` |  |
| afterChange | Callback function called after the current index changes | (current: number) => void | - |  |
| beforeChange | Callback function called before the current index changes | (current: number, next: number) => void | - |  |
| waitForAnimate | Whether to wait for the animation when switching | boolean | false |  |

Find more APIs in react-slick [documentation](https://react-slick.neostack.com/docs/api).

## Methods

| Name | Description |
| --- | --- |
| goTo(slideNumber, dontAnimate) | Go to slide index, if dontAnimate=true, it happens without animation |
| next() | Change current slide to next slide |
| prev() | Change current slide to previous slide |

## Design Token

<ComponentTokenTable component="Carousel"></ComponentTokenTable>

## FAQ

### How to add custom arrows?

See [#12479](https://github.com/ant-design/ant-design/issues/12479).
