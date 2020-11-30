---
order: 5
title:
  zh-CN: 多张图片预览
  en-US: Multiple image preview
---

## zh-CN

点击左右切换按钮可以预览多张图片。

## en-US

Click the left and right switch buttons to preview multiple images.

```jsx
import { Image } from 'antd';

function ImageDemo() {
  return (
    <Image.PreviewGroup>
      <Image
        width={200}
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <Image
        width={200}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </Image.PreviewGroup>
  );
}

ReactDOM.render(<ImageDemo />, mountNode);
```
