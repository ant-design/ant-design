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
import { Typography } from 'antd';

const { Paragraph } = Typography;

ReactDOM.render(
  <div>
    <Paragraph ellipsis>
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
      Ant Design, a design language for background applications, is refined by Ant UED Team.
    </Paragraph>

    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
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
