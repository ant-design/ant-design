---
order: 6
title:
  zh-CN: 自定义预览图片
  en-US: Custom preview image
---

## zh-CN

可以设置不同的预览图片。

## en-US

You can set different preview image.

```jsx
import React from 'react';
import { Image } from 'antd';

function ImageDemo() {
  return (
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
      preview={{
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }}
    />
  );
}

ReactDOM.render(<ImageDemo />, mountNode);
```
