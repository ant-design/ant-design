---
order: 0
title:
  en-US: Basic Usage
---

Change the screen width to see the color change based on breakpoints.

```jsx
import styled from 'styled-components';

const BreakpointDiv = styled.div`
    width: 144px;
    height: 24px;
    margin: 16px;
    padding: 0 8px;
    background: ${({theme}) => theme.color.N6};

    ::after {
      content: '> breakpoints.xl2'
    }

    @media (max-width: ${({theme}) => theme.breakpoints.xl2}) {
      background: ${({theme}) => theme.color.R6};
      ::after {
        content: '< breakpoints.xl2'
      }
    }
    @media (max-width: ${({theme}) => theme.breakpoints.xl}) {
      background: ${({theme}) => theme.color.O6};
      ::after {
        content: '< breakpoints.xl'
      }
    }
    @media (max-width: ${({theme}) => theme.breakpoints.lg}) {
      background: ${({theme}) => theme.color.G6};
      ::after {
        content: '< breakpoints.lg'
      }
    }
    @media (max-width: ${({theme}) => theme.breakpoints.md}) {
      background: ${({theme}) => theme.color.B6};
      ::after {
        content: '< breakpoints.md'
      }
    }
    @media (max-width: ${({theme}) => theme.breakpoints.sm}) {
      background: ${({theme}) => theme.color.P6};
      ::after {
        content: '< breakpoints.sm'
      }
    }
`;

ReactDOM.render(
  <div>
    <BreakpointDiv />
  </div>,
  mountNode,
);
```
