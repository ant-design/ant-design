---
order: 0
title:
  en-US: Usage
---

Simple usage.

```jsx
import styled from 'styled-components';

const Info = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: ${({theme}) => theme.spacing.xxs };
    color: ${(props) => props.theme.palette.text.info};
    background: ${(props) => props.theme.palette.background.info};
    border: ${(props) => `1px solid ${props.theme.palette.border.info}`};
`;
const Error = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: ${({theme}) => theme.spacing.xxs };
    color: ${(props) => props.theme.palette.text.error};
    background: ${(props) => props.theme.palette.background.error};
    border: ${(props) => `1px solid ${props.theme.palette.border.error}`};
`;

ReactDOM.render(
  <div>
    <Info>I can do that Dave.</Info>
    <Error>I cant do that Dave.</Error>
  </div>,
  mountNode,
);
```
