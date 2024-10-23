import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image.PreviewGroup
    preview={{ countRender: (current, total) => `当前 ${current} / 总计 ${total}` }}
  >
    <Image
      width={150}
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      alt="preview group top progress image1"
    />
    <Image
      width={150}
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      alt="preview group top progress image2"
    />
    <Image
      width={150}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      alt="preview group top progress image3"
    />
  </Image.PreviewGroup>
);

export default App;
