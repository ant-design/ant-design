---
order: -2
title:
  en-US: Code
---

## en-US

Code examples use Roboto Mono.

```jsx
import { Typography } from '@allenai/varnish';

const { InlineCode, Code } = Typography;

ReactDOM.render(
  <div>
    <Code>def get_metrics(self, reset: bool = False) -&gt; Dict[str, float]</Code>
    <Code variant="dark">def get_metrics(self, reset: bool = False) -&gt; Dict[str, float]</Code>
    The command <InlineCode>get_metrics(self, reset: bool = False)</InlineCode> has a default
    parameter.
    <br />
    The command <InlineCode variant="dark">get_metrics(self, reset: bool = False)</InlineCode> has a
    default parameter.
  </div>,
  mountNode,
);
```
