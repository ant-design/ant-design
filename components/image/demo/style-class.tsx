import React from 'react';
import { Flex, Image, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" size="large">
    {/* 对象形式的 classNames 和 styles */}
    <div>
      <h4>对象形式的 classNames 和 styles</h4>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        alt="示例图片"
        classNames={{
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
        }}
        styles={{
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
        }}
      />
    </div>

    {/* 函数形式的 classNames 和 styles */}
    <div>
      <h4>函数形式的 classNames 和 styles</h4>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        alt="示例图片"
        preview={{ open: false }}
        classNames={(info) => ({
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
        })}
        styles={(info) => ({
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
            backgroundColor: info.props.preview
              ? 'rgba(82, 196, 26, 0.1)'
              : 'rgba(255, 77, 79, 0.1)',
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
        })}
      />
    </div>

    {/* 图片组 */}
    <div>
      <h4>图片组示例</h4>
      <Image.PreviewGroup
        classNames={{
          popup: {
            root: 'custom-group-popup',
            mask: 'custom-group-mask',
            body: 'custom-group-body',
            footer: 'custom-group-footer',
            actions: 'custom-group-actions',
          },
        }}
        styles={{
          popup: {
            root: {
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
            },
            mask: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            },
            body: {
              padding: '30px',
            },
            footer: {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px 8px 0 0',
            },
            actions: {
              gap: '24px',
            },
          },
        }}
      >
        <Flex gap="middle">
          <Image
            width={150}
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="图片1"
            classNames={{
              root: 'group-image-root',
              image: 'group-image-img',
              cover: 'group-image-cover',
            }}
            styles={{
              root: {
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '2px',
              },
              image: {
                borderRadius: '4px',
              },
              cover: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          />
          <Image
            width={150}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            alt="图片2"
            classNames={{
              root: 'group-image-root',
              image: 'group-image-img',
              cover: 'group-image-cover',
            }}
            styles={{
              root: {
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '2px',
              },
              image: {
                borderRadius: '4px',
              },
              cover: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          />
        </Flex>
      </Image.PreviewGroup>
    </div>
  </Space>
);

export default App;
