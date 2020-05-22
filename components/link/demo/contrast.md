---
order: 1
title:
  en-US: Contrast
---

To use contrast style, make a styled component using `contrastLinkColorStyles`.

```jsx
import styled from 'styled-components';
import { Link } from '@allenai/varnish';

const Contrast = styled.div`
  a[href] {
    ${Link.contrastLinkColorStyles()};
  }

  background: #1b4596;
  padding: 26px 16px 16px;
  color: #fff;
`;

ReactDOM.render(
  <Contrast>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a molestic metus.{' '}
    <a href="./">Contrast Link</a> lobortis varius. Cras vulputate felis et mauris tincidunt,
    elementum volutpat.
  </Contrast>,
  mountNode,
);
```
