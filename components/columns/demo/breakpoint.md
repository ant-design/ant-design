---
order: 2
title:
  en-US: breakpoint
---

Specify `breakpoint` to force grid into a single columns on small screens.

```jsx
import { Columns } from '..'; // TODO: point this at varnish
import Skeleton from '../../skeleton'; // TODO: point this at varnish

ReactDOM.render(
   <div>
        <Columns count={3} breakpoint="md">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Columns>
      </div>,
  mountNode,
);
```
