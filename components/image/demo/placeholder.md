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
import { Image, Button } from 'antd';

function ImageDemo() {
  const [random, setRandom] = React.useState();
  return (
    <>
      <Image
        width={200}
        src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
        placeholder={
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            width={200}
            alt="placeholder"
          />
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
        Reload
      </Button>
    </>
  );
}

ReactDOM.render(<ImageDemo />, mountNode);
```
