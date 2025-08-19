import React from 'react';
import { Image, Space } from 'antd';

const App: React.FC = () => {
  return (
    <>
      <Space>
        <Image
          width={100}
          alt="Default blur"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          preview={{
            previewMask: true,
            cover: (
              <Space vertical align="center">
                Default blur
              </Space>
            ),
          }}
        />
        <Image
          alt="Dimmed mask"
          width={100}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          preview={{
            previewMask: { blur: false },
            cover: (
              <Space vertical align="center">
                Dimmed mask
              </Space>
            ),
          }}
        />
        <Image
          width={100}
          alt="No mask"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          preview={{
            previewMask: false,
            cover: (
              <Space vertical align="center">
                No mask
              </Space>
            ),
          }}
        />
      </Space>
    </>
  );
};

export default App;
