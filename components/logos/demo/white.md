---
order: 3
title:
  en-US: White Logos
---

If you're using the logo against a dark background, you will want to set the component's `color` value to `white`.

```jsx
import { Logos } from '@allenai/varnish';

const { AI2Logo } = Logos;

ReactDOM.render(
  <div className="site-dark-wrapper">
    <AI2Logo color="white" size="lg" />
  </div>,
  mountNode,
);
```

```css
.site-dark-wrapper {
  background: #1b4596;
  padding: 26px 16px 16px;
}
```
