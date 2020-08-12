---
order: 1
title:
  en-US: Link Style
---

To use link style on non `a[href]`, make a styled component using `linkColorStyles`.

```jsx
import styled from 'styled-components';
import { Link } from '@allenai/varnish';

const SpanLink = styled.span`
  ${Link.linkColorStyles()};
`;

ReactDOM.render(
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a molestic metus.{' '}
    <SpanLink>Span Link</SpanLink> lobortis varius. Cras vulputate felis et mauris tincidunt,{' '}
    elementum volutpat.
  </div>,
  mountNode,
);
```
