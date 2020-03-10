---
category: Global Styles
order: 6
title: Dark Theme
---


Dark mode is a theme where all UI elements are darkened.

## When to use

- When working continuously in a dark environment, it is recommended to use the dark mode to change the visual pressure caused by the brightness contrast to ensure the user's experience.
- When immersive and focused work content is required, dark mode is recommended to help users pay more attention to the highlighted content and operations.
  > The famous principle of turning off the lights when watching a movie in a movie theater is the same principle.

## Design Principles

1. **Comfort of content**

Avoid using highly contrasting colors or content in dark mode. Continuous use will bring fatigue.

2. **Consistency of Information**

The information content in the dark mode needs to be consistent with the light mode, and the initialization hierarchical relationship should not be broken.

## Color

In the application of colors, we are based on 12 sets of basic swatches and combine longer rule processing to make colors better blend under different environmental colors.

### Basic Swatches

```__react
import ColorPalettes from '../../site/theme/template/Color/ColorPalettes';

ReactDOM.render(<ColorPalettes dark />, mountNode);
```

### 色板生成工具

同样，我们也提供了一套暗色下的色板生成工具，需要选择你的主色以及页面的背景色，我们会为你生成一套暗色下的色板

```__react
import ColorPaletteToolDark from '../../site/theme/template/Color/ColorPaletteToolDark';

ReactDOM.render(<ColorPaletteToolDark />, mountNode);
```
