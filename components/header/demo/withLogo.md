---
order: 1
title:
  en-US: With Logo and Content
---

Header inside a layout with a logo and content.

```jsx
import { Header, Layout, Logos } from '@allenai/varnish';

const { HeaderColumns, HeaderTitle } = Header;

ReactDOM.render(
  <Layout bgcolor="N2">
    <Header>
      <HeaderColumns gridTemplateColumns="auto auto 1fr">
        <Logos.AI2Logo includeText={false} />
        <HeaderTitle>Title</HeaderTitle>
      </HeaderColumns>
    </Header>
    <Layout.Content>Content!</Layout.Content>
  </Layout>,
  mountNode,
);
```
