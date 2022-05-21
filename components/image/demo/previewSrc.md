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

```tsx
import { Image } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Image
    width={200}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
    preview={{
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }}
  />
);

export default App;
```
