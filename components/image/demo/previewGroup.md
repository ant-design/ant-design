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
import { Image, Button } from 'antd';

const defaultImages = [
  {
    width: 100,
    src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
];

function ImageDemo() {
  const [images, setImages] = React.useState(defaultImages);
  const imagesHandle = () => {
    setImages([
      {
        width: 100,
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
      },
    ]);
  };

  return (
    <>
      <Image.PreviewGroup>
        {images.map(image => (
          <Image key={image.src} width={image.width} src={image.src} />
        ))}
      </Image.PreviewGroup>
      <Button onClick={imagesHandle}>点击按钮，再点击图片预览出异常</Button>
    </>
  );
}

ReactDOM.render(<ImageDemo />, mountNode);
```
