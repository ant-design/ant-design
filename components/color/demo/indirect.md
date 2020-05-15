---
order: 1
title:
  en-US: Indirect Usage
---

You can also access colors via the palette.

```jsx
import styled from 'styled-components';

const Error = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: ${({theme}) => theme.spacing.xxs };
    color: ${(props) => props.theme.palette.text.error};
    background: ${(props) => props.theme.palette.background.error};
    border: ${(props) => `1px solid ${props.theme.palette.border.error}`};
`;

ReactDOM.render(
  <Error>I cant do that Dave.</Error>,
  mountNode,
);
```
