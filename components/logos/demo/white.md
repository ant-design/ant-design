---
order: 3
title:
  en-US: White Logos
---

If you're using the logo against a dark background, you will want to set the
component's `color` value to `white`.

```jsx
import { AI2Logo } from '..'; // TODO: point this at varnish

ReactDOM.render(
  <div className="site-dark-wrapper">
    <AI2Logo color='white' size="lg" />
  </div>,
  mountNode,
);
```

```css
.site-dark-wrapper {
  background: #1B4596;
  padding: 26px 16px 16px;
}
```
