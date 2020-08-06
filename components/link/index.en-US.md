---
category: Components
type: General
title: Link
cols: 2
cover: https://allenai.org/favicon.ico
---

Varnish has default styles for `a[href]` links and provides a base style `contrastLinkColorStyles`
for use on dark backgrounds.

## Recommended InternalLink

```jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Link } from '@allenai/varnish';

const { linkColorStyles } = Link

export const InternalLink = styled(NavLink)`
    ${linkColorStyles()}
`;
```
