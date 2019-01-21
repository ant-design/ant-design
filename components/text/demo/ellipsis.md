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
import { Text } from 'antd';

const { Paragraph } = Text;

ReactDOM.render(
  <div>
    <Paragraph rows={3}>
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
    </Paragraph>

    <Paragraph rows={3} extendable>
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
    </Paragraph>
  </div>
  , mountNode);
```
