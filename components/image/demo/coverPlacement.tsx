import React from 'react';
import { ZoomInOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';

const App: React.FC = () => {
  return (
    <Space size={16}>
      <Image
        width={96}
        alt="basic image"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          cover: {
            coverNode: (
              <Space align="center">
                <ZoomInOutlined />
                center
              </Space>
            ),
            placement: 'center',
          },
        }}
      />
      <Image
        width={96}
        alt="image"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          cover: {
            coverNode: (
              <Space align="center">
                <ZoomInOutlined />
                top
              </Space>
            ),
            placement: 'top',
          },
        }}
      />
      <Image
        width={96}
        alt="image"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          cover: {
            coverNode: (
              <Space align="center">
                <ZoomInOutlined />
                bottom
              </Space>
            ),
            placement: 'bottom',
          },
        }}
      />
    </Space>
  );
};

export default App;
