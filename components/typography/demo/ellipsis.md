---
order: 4
title:
  zh-CN: 省略号
  en-US: Ellipsis
---

## zh-CN

多行文本省略。

## en-US

Multiple line ellipsis support.

```jsx
import { Typography } from '@allenai/varnish';

const { Paragraph } = Typography;

ReactDOM.render(
  <>
    <Paragraph ellipsis>
      Varnish, a design language for background applications, is refined by AI2. Varnish, a design
      language for background applications, is refined by AI2. Varnish, a design language for
      background applications, is refined by AI2. Varnish, a design language for background
      applications, is refined by AI2. Varnish, a design language for background applications, is
      refined by AI2. Varnish, a design language for background applications, is refined by AI2.
      Varnish, a design language for background applications, is refined by AI2.
    </Paragraph>

    <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
      Varnish, a design language for background applications, is refined by AI2. Varnish, a design
      language for background applications, is refined by AI2. Varnish, a design language for
      background applications, is refined by AI2. Varnish, a design language for background
      applications, is refined by AI2. Varnish, a design language for background applications, is
      refined by AI2. Varnish, a design language for background applications, is refined by AI2.
      Varnish, a design language for background applications, is refined by AI2.
    </Paragraph>
  </>,
  mountNode,
);
```
