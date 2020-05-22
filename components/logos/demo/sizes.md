---
order: 1
title:
  en-US: Sizes
---

This component includes a `size` property.

```jsx
import { Logos } from '@allenai/varnish';

const { AI2Logo } = Logos;

ReactDOM.render(
  <div>
    <div>micro</div>
    <AI2Logo size="micro" />
    <br />

    {/* For default size, no need to set <AI2Logo size="default" />
    since "default" is the default value of the size property. */}
    <div>default</div>
    <AI2Logo />
    <br />

    <div>lg</div>
    <AI2Logo size="lg" />
    <br />

    <div>custom (15x)</div>
    {/* Custom size */}
    <AI2Logo size={15} />
  </div>,
  mountNode,
);
```
