import React from 'react';
import { ZoomInOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';

const App: React.FC = () => (
  <Image
    width={96}
    alt="basic image"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    classNames={{
      popup: {
        mask: 'customize-mask',
      },
    }}
    preview={{
      cover: (
        <Space vertical align="center">
          <ZoomInOutlined />
          示例
        </Space>
      ),
    }}
  />
);

export default App;
