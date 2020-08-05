---
category: Components
type: General
title: Theme
cols: 1
cover: https://allenai.org/favicon.ico
---

Theme for Varnish Theming.

## When To Use

- After wrapping your App in the `ThemeProvider`, when you want to set a css value to match the Varnish theme.

## Example Usage

```css
background: ${({theme}) => theme.color.R6};
```

## Default Theme

```__react
import ReactJson from 'react-json-view';
import { Theme } from './Theme';
ReactDOM.render(
    <ReactJson name="Theme" collapsed={2} collapseStringsAfterLength={65} src={Theme.default} />
, mountNode);
```
