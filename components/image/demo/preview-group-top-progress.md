---
order: 100
title:
  zh-CN: 多图预览时顶部进度自定义
  en-US: Top progress customization when previewing multiple images
debug: true
---

## zh-CN

多图预览时顶部展示进度, 支持自定义

## en-US

The progress is displayed at the top of the multi-image preview, and customization is supported

```jsx
import { Image } from 'antd';

const App = () => (
  <Image.PreviewGroup
    preview={{ countRender: (current, total) => `当前 ${current} / 总计 ${total}` }}
  >
    <Image width={150} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
    <Image
      width={150}
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    />
    <Image
      width={150}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  </Image.PreviewGroup>
);

export default App;
```
