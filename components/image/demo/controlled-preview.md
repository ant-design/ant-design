---
order: 7
title:
  zh-CN: 受控的预览
  en-US: Controlled Preview
---

## zh-CN

可以使预览受控。

## en-US

You can make preview controlled.

```tsx
import { Button, Image } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        show image preview
      </Button>
      <Image
        width={200}
        style={{ display: 'none' }}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          visible,
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          onVisibleChange: value => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export default App;
```
