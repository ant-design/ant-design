---
order: 0
title:
  en-US: Default
---

Simplest Usage.

```jsx
import { Header, HeaderColumns, HeaderTitle } from '..'; // TODO: point this at varnish

ReactDOM.render(
  <Header>
    <HeaderColumns gridTemplateColumns="auto 1fr">
      <HeaderTitle>Title</HeaderTitle>
    </HeaderColumns>
  </Header>,
  mountNode,
);
```
