---
order: 3
title:
  zh-CN: 省略号
  en-US: ellipsis
---

## zh-CN

多行文本省略。

## en-US

Multiple line ellipsis support.

```jsx
import { Text } from 'antd';

const { Paragraph } = Text;

ReactDOM.render(
  <Paragraph lines={3}>
    Ant Design, a design language for background applications, is refined by Ant UED Team.
    Ant Design, a design language for background applications, is refined by Ant UED Team.
    Ant Design, a design language for background applications, is refined by Ant UED Team.
    Ant Design, a design language for background applications, is refined by Ant UED Team.
    Ant Design, a design language for background applications, is refined by Ant UED Team.
  </Paragraph>
  , mountNode);
```
