---
order: 0
title:
  en-US: Basic Usage
---

Basic Usage.

```jsx
import styled from 'styled-components';

const SpacingDiv = styled.div`
    text-align: center;
    width: min-content;
    margin: ${({theme}) => `${theme.spacing.md} ${theme.spacing.xl}`};
    padding: ${({theme}) => theme.spacing.sm};
    background: ${({theme}) => theme.palette.primary.main};
`;

ReactDOM.render(
  <div>
    <SpacingDiv>
      Hello
    </SpacingDiv>
    <SpacingDiv>
      World
    </SpacingDiv>
  </div>,
  mountNode,
);
```
