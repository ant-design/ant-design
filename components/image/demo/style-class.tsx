import React from 'react';
import { Image, Space } from 'antd';

import type { ImageProps } from 'antd';

const App: React.FC = () => {
  const classNamesObject: ImageProps['classNames'] = {
    root: 'custom-image-root',
    image: 'custom-image-img',
    cover: 'custom-image-cover',
    popup: {
      root: 'custom-popup-root',
      mask: 'custom-popup-mask',
      body: 'custom-popup-body',
      footer: 'custom-popup-footer',
      actions: 'custom-popup-actions',
    },
  };

  const stylesObject: ImageProps['styles'] = {
    root: {
      border: '2px solid #1890ff',
      borderRadius: '8px',
      padding: '4px',
    },
    image: {
      borderRadius: '4px',
    },
    cover: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '4px',
    },
    popup: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      },
      mask: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      body: {
        padding: '20px',
      },
      footer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      actions: {
        gap: '16px',
      },
    },
  };

  const classNamesFunction: ImageProps['classNames'] = (info) => ({
    root: info.props.preview ? 'image-with-preview' : 'image-no-preview',
    image: 'dynamic-image',
    cover: 'dynamic-cover',
    popup: {
      root: 'dynamic-popup-root',
      mask: 'dynamic-popup-mask',
      body: 'dynamic-popup-body',
      footer: 'dynamic-popup-footer',
      actions: 'dynamic-popup-actions',
    },
  });

  const stylesFunction: ImageProps['styles'] = (info) => ({
    root: {
      border: info.props.preview ? '2px solid #52c41a' : '2px solid #ff4d4f',
      borderRadius: '8px',
      padding: '4px',
      transition: 'all 0.3s ease',
    },
    image: {
      borderRadius: '4px',
      filter: info.props.preview ? 'none' : 'grayscale(50%)',
    },
    cover: {
      backgroundColor: info.props.preview ? 'rgba(82, 196, 26, 0.1)' : 'rgba(255, 77, 79, 0.1)',
    },
    popup: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
      },
      mask: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      },
      body: {
        padding: '24px',
      },
      footer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
      actions: {
        gap: '20px',
      },
    },
  });
  return (
    <Space size="large">
      <div>
        <h4>classNames and styles object</h4>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="示例图片"
          classNames={classNamesObject}
          styles={stylesObject}
        />
      </div>

      <div>
        <h4>classNames and styles function</h4>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="示例图片"
          preview={{ open: false }}
          classNames={classNamesFunction}
          styles={stylesFunction}
        />
      </div>
    </Space>
  );
};

export default App;
