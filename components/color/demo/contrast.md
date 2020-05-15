---
order: 2
title:
  en-US: Text Contrast
---

To properly color text on top of a color, use the `useContrastText` property to pick the text color.

```jsx
import styled from 'styled-components';

const ColorDiv = styled.div`
    width: 100%;
    height: ${({theme}) => theme.spacing.xl };
    margin-bottom: ${({theme}) => theme.spacing.xxs };
    color: white;
    text-align: center;
    color: ${({theme, col}) => theme.color[col].useContrastText ? theme.palette.text.contrast : theme.palette.text.primary};
    background: ${({theme, col}) => theme.color[col]};
    border: 1px solid ${({theme, col}) => theme.color[col].useContrastText ? theme.palette.text.contrast : theme.palette.text.primary};
`;
const colorsToRender = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10'];

ReactDOM.render(
  <div>
    {colorsToRender.map(color => <ColorDiv key={color} col={color}>{color}</ColorDiv> )}
  </div>,
  mountNode,
);
```
