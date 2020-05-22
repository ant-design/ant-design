---
order: 1
title:
  en-US: No truncation
---

If the text is short enough, there will be no truncation.

```jsx
import MaxLengthText from '..'; // TODO: put back after deploy // import { MaxLengthText } from '@allenai/varnish';

ReactDOM.render(
  <MaxLengthText
    maxLength={150}
    showMoreText="Thar be the treasure"
    showLessText="Take away me' treasure"
  >
    This is a short passage, me&apos; matey. A&apos;vast, there shouldn&apos;t be no truncation no
    should there.
  </MaxLengthText>,
  mountNode,
);
```
