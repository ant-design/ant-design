---
order: 2
title:
  en-US: Removing Organization Name Text
---

Depending on the context, you may or may not want to display the full
organization name text.

```jsx
import { AI2Logo } from '..'; // TODO: point this at varnish

ReactDOM.render(
  <div>
    <AI2Logo includeText={false} size="lg" />
  </div>,
  mountNode,
);
```
