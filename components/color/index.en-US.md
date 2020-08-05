---
category: Components
type: General
title: Colors
cols: 2
cover: https://allenai.org/favicon.ico
---

Official AI2 Colors

## Primary Colors

```__react
import { PrimaryColorDisplay } from 'site/theme/template/varnish/ColorDisplay';
ReactDOM.render(<PrimaryColorDisplay />, mountNode);
```

## Extended Colors

```__react
import { ExtendedColorDisplay } from 'site/theme/template/varnish/ColorDisplay';
ReactDOM.render(<ExtendedColorDisplay />, mountNode);
```

## API

| Property        | Description                                | Type    | Default |
| --------------- | ------------------------------------------ | ------- | ------- |
| useContrastText | True if you should use contrast text color | boolean | false   |
| displayName     | Name of color                              | string  |         |
| hex             | Hex value of color                         | string  |         |
| rgb             | RGB object of color                        | {r: number, g: number, b: number} | |
