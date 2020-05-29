---
order: 5
title:
  en-US: SvgIcon
---

## en-US

You can pass an inline `SVG` via the `svg` attribute. Note that the color WILL be affected by css.

```jsx
import { Icon, Button } from '@allenai/varnish';

const { SvgIcon } = Icon;

const InlineSvg = () => {
  return (<svg
    fill="currentColor"
    height="24px"
    width="24px"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="m0 0h6v6h-6zm2 2h2v2h-2zm-2 6h6v6h-6zm2 2h2v2h-2zm12-2h-6v6h6zm-2 2h-2v2h2zm-4-10h6v6h-6zm2 2h2v2h-2z"
      fillRule="evenodd"/>
  </svg>);
};

ReactDOM.render(
  <Button>
    <SvgIcon Svg={InlineSvg} /> InlineSvg used buttons text color
  </Button>,
  mountNode,
);
```
