---
category: Global Styles
order: 6
title: Dark Mode
---

Dark mode is a theme where all UI elements are darkened.

## When to use

- Dark mode is recommended when you are in a dark environment as it prevents eye strain.
- Dark mode is great for highlighting important content
  > It works similarly to turning off the lights in a movie theater.

## Design Principles

1. **Comfort of content**

Avoid using highly contrasting colors or content in dark mode. Continuous use will bring fatigue.

2. **Consistency of Information**

The information content in the dark mode needs to be consistent with the light mode, and the initialization hierarchical relationship should not be broken.

## Color

In the application of colors, we are based on 12 sets of basic swatches and combine longer rule processing to make colors better blend under different environmental colors.

### Color Palette

```__react
import ColorPalettes from '../../site/theme/template/Color/ColorPalettes';

ReactDOM.render(<ColorPalettes dark />, mountNode);
```

### Color Palette Generator

Additionally, we also provide a set of tools for generating color palettes in dark colors. You need to select your primary color and the background color of the page. We will generate a dark mode color palette for you.

```__react
import ColorPaletteToolDark from '../../site/theme/template/Color/ColorPaletteToolDark';

ReactDOM.render(<ColorPaletteToolDark />, mountNode);
```
