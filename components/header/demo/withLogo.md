---
order: 1
title:
  en-US: With Logo and Content
---

Header inside a layout with a logo and content.

```jsx
import { Header, HeaderColumns, HeaderTitle } from '..'; // TODO: point this at varnish
import Layout from '../../layout'; // TODO: point this at varnish
import { AI2Logo } from '../../logos'; // TODO: point this at varnish

ReactDOM.render(
  <Layout bgcolor="N2">
    <Header>
      <HeaderColumns gridTemplateColumns="auto auto 1fr">
        <AI2Logo includeText={false} />
        <HeaderTitle>Title</HeaderTitle>
      </HeaderColumns>
    </Header>
    <Layout.Content>Content!</Layout.Content>
  </Layout>,
  mountNode,
);
```
