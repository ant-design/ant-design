---
order: 0
title:
  en-US: Direct Usage
---

You can directly use a Varnish color via the theme.

```jsx
import styled from 'styled-components';

const ColorDiv = styled.div`
    width: 100%;
    height: ${({theme}) => theme.spacing.xl };
    margin-bottom: ${({theme}) => theme.spacing.xxs };
    color: white;
    text-align: center;
    background: ${(props) => props.theme.color[props.col]};
`;

const colorsToRender = ['B8','B7','B6','O8','O7','O6'];

ReactDOM.render(
  <div>
    {colorsToRender.map(color =>  <ColorDiv key={color} col={color}>{color}</ColorDiv> )}
  </div>,
  mountNode,
);
```
