---
order: 4
title:
  en-US: AI2 Projects
---

Canonical logos for AI2's projects.

```jsx
import { Logos } from '@allenai/varnish';

const { AllenNLP, Aristo, Mosaic, Prior, SemanticScholar, Fairness, Incubator } = Logos;

ReactDOM.render(
  <span>
    <div>AllenNLP</div>
    <AllenNLP />
    <br />

    <div>Aristo</div>
    <Aristo />
    <br />

    <div>Mosaic</div>
    <Mosaic />
    <br />

    <div>Prior</div>
    <Prior />
    <br />

    <div>Semantic Scholar</div>
    <SemanticScholar />
    <br />

    <div>Fairness</div>
    <Fairness />
    <br />

    <div>Incubator</div>
    <Incubator />
  </span>,
  mountNode,
);
```
