---
order: 6
title:
  en-US: ImgIcon
---

## en-US

You can pass an imported source via the `src` attribute.
Note that the color WILL NOT be affected by css if the img contains an externally linked SVG.

```jsx
import { Icon, Button } from '@allenai/varnish';
import svgSrc from '../../icons/formCalendar.svg';

const { ImgIcon } = Icon;

ReactDOM.render(
  <Button>
    <ImgIcon src={svgSrc} /> ReferencedSvg does NOT use buttons text color
  </Button>,
  mountNode,
);
```
