import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image.PreviewGroup
    preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    <Image
      alt="svg image"
      width={200}
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <Image
      width={200}
      alt="svg image"
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    />
  </Image.PreviewGroup>
);

export default App;
