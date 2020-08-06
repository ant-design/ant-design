---
order: 6
title:
  zh-CN: 自定义字符
  en-US: Customize character
---

## zh-CN

可以使用 `(RateProps) => ReactNode` 的方式自定义每一个字符。

## en-US

Can customize each character using `(RateProps) => ReactNode`.

```jsx
import { Rate } from '@allenai/varnish';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

ReactDOM.render(
  <>
    <Rate
      defaultValue={2}
      character={({ index }) => {
        return index + 1;
      }}
    />
    <br />
    <Rate
      defaultValue={3}
      character={({ index }) => {
        return customIcons[index + 1];
      }}
    />
  </>,
  mountNode,
);
```
