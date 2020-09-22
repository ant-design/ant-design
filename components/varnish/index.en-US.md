---
category: Components
type: General
title: Theme
cols: 1
cover: https://allenai.org/favicon.ico
---

The default Varnish theme, which provides programmatic access to the default values for a colors, typography and other properties related to the user interface.

## Example Usage in a Component

```ts
import styled from 'styled-components';

const RedBackground = styled.div`
  background: ${({ theme }) => theme.color.R6};
`;
```

## Default Theme

```__react
import { Theme } from './Theme';
import { Collapse } from '@allenai/varnish';

/*

TODO: We should have better reference docs for this. This is one of the key interfaces that users
or @allenai/varnish will interact with, yet:

- Our docs for it aren't great
- Typesafey falls out the window

We should fix one (or both) of these. I bet the former is the easier fix...

*/

const topLevelKeys = Object.keys(Theme.default);

ReactDOM.render(
    <Collapse>
        {topLevelKeys.map(key => (
            <Collapse.Panel key={key} header={<code>{key}</code>}>
                <pre><code>{JSON.stringify(Theme.default[key], null, 2)}</code></pre>
            </Collapse.Panel>
        ))}
    </Collapse>
, mountNode);
```
