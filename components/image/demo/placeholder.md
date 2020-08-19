---
order: 3
title:
  zh-CN: 加载 Loading
  en-US: Loading
---

## zh-CN

大图加载 loading。

## en-US

Large image loading.

```jsx
import React from 'react';
import { Image, Spin, Button } from 'antd';

function ImageDemo() {
  const [random, setRandom] = React.useState();
  return (
    <>
      <Image
        width={200}
        src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
        placeholder={
          <div
            style={{
              marginTop: 90,
              marginLeft: 100,
            }}
          >
            <Spin spining />
          </div>
        }
      />
      <Button
        type="primary"
        style={{
          marginLeft: 10,
        }}
        onClick={() => {
          setRandom(Date.now());
        }}
      >
        Random
      </Button>
    </>
  );
}

ReactDOM.render(<ImageDemo />, mountNode);
```
