import React from 'react';
import { QRCode, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" size="large">
    {/* 对象形式的 classNames 和 styles */}
    <div>
      <h4>对象形式的 classNames 和 styles</h4>
      <Space wrap>
        <QRCode
          value="https://ant.design/"
          size={160}
          classNames={{
            root: 'custom-qrcode-root',
            cover: 'custom-qrcode-cover',
          }}
          styles={{
            root: {
              border: '2px solid #1890ff',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f0f8ff',
            },
            cover: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '4px',
            },
          }}
        />

        <QRCode
          value="https://ant.design/"
          size={160}
          icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          classNames={{
            root: 'custom-qrcode-with-icon',
            cover: 'custom-cover-with-icon',
          }}
          styles={{
            root: {
              border: '2px solid #52c41a',
              borderRadius: '12px',
              padding: '12px',
              backgroundColor: '#f6ffed',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
            cover: {
              backgroundColor: 'rgba(82, 196, 26, 0.1)',
              color: '#52c41a',
            },
          }}
        />
      </Space>
    </div>

    {/* 函数形式的 classNames 和 styles */}
    <div>
      <h4>函数形式的 classNames 和 styles</h4>
      <Space wrap>
        <QRCode
          value="https://ant.design/"
          size={120}
          type="canvas"
          bordered={true}
          classNames={(info) => ({
            root: info.props.type === 'canvas' ? 'canvas-qrcode' : 'svg-qrcode',
            cover: `cover-${info.props.size}`,
          })}
          styles={(info) => ({
            root: {
              border: info.props.type === 'canvas' ? '2px solid #ff4d4f' : '2px solid #faad14',
              borderRadius: info.props.size && info.props.size > 100 ? '8px' : '4px',
              padding: '8px',
              backgroundColor:
                info.props.type === 'canvas' ? 'rgba(255, 77, 79, 0.1)' : 'rgba(250, 173, 20, 0.1)',
              transform: info.props.bordered ? 'scale(1)' : 'scale(0.95)',
            },
            cover: {
              backgroundColor:
                info.props.type === 'canvas' ? 'rgba(255, 77, 79, 0.8)' : 'rgba(250, 173, 20, 0.8)',
              color: '#fff',
              fontWeight: 'bold',
            },
          })}
        />

        <QRCode
          value="https://ant.design/"
          size={140}
          type="svg"
          bordered={false}
          classNames={(info) => ({
            root: `dynamic-${info.props.type}-${info.props.size}`,
            cover: info.props.bordered ? 'bordered-cover' : 'borderless-cover',
          })}
          styles={(info) => ({
            root: {
              border: info.props.bordered ? '2px solid #722ed1' : 'none',
              borderRadius: info.props.type === 'svg' ? '16px' : '8px',
              padding: info.props.size && info.props.size > 120 ? '16px' : '8px',
              backgroundColor:
                info.props.type === 'svg' ? 'rgba(114, 46, 209, 0.1)' : 'rgba(19, 194, 194, 0.1)',
              boxShadow: info.props.bordered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
            },
            cover: {
              backgroundColor:
                info.props.type === 'svg' ? 'rgba(114, 46, 209, 0.9)' : 'rgba(19, 194, 194, 0.9)',
              color: '#fff',
              borderRadius: '8px',
            },
          })}
        />
      </Space>
    </div>

    {/* 不同状态的 QRCode */}
    <div>
      <h4>不同状态的 QRCode 样式</h4>
      <Space wrap>
        {(['active', 'expired', 'loading'] as const).map((status) => (
          <QRCode
            key={status}
            value="https://ant.design/"
            size={120}
            status={status}
            onRefresh={() => console.log('refresh')}
            classNames={(info) => ({
              root: `status-${info.props.status}`,
              cover: `cover-${info.props.status}`,
            })}
            styles={(info) => {
              const statusColors = {
                active: '#52c41a',
                expired: '#ff4d4f',
                loading: '#1890ff',
                scanned: '#722ed1',
              };
              const color = statusColors[info.props.status || 'active'];

              return {
                root: {
                  border: `2px solid ${color}`,
                  borderRadius: '8px',
                  padding: '12px',
                  backgroundColor: `${color}10`,
                  opacity: info.props.status === 'active' ? 1 : 0.8,
                },
                cover: {
                  backgroundColor: `${color}CC`,
                  color: '#fff',
                  borderRadius: '6px',
                  textAlign: 'center',
                },
              };
            }}
          />
        ))}
      </Space>
    </div>

    {/* 不同尺寸的 QRCode */}
    <div>
      <h4>不同尺寸的 QRCode 样式</h4>
      <Space wrap>
        {[80, 120, 160, 200].map((size) => (
          <QRCode
            key={size}
            value="https://ant.design/"
            size={size}
            classNames={(info) => ({
              root: `size-${info.props.size}`,
              cover: `cover-size-${info.props.size}`,
            })}
            styles={(info) => {
              const currentSize = info.props.size || 160;
              return {
                root: {
                  border: '2px solid #1890ff',
                  borderRadius: currentSize > 150 ? '12px' : currentSize > 100 ? '8px' : '4px',
                  padding: currentSize > 150 ? '16px' : currentSize > 100 ? '12px' : '8px',
                  backgroundColor: '#f0f8ff',
                  boxShadow:
                    currentSize > 150
                      ? '0 4px 16px rgba(0, 0, 0, 0.1)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                cover: {
                  backgroundColor: 'rgba(24, 144, 255, 0.9)',
                  color: '#fff',
                  borderRadius: currentSize > 150 ? '8px' : '4px',
                  fontSize: currentSize > 150 ? '16px' : currentSize > 100 ? '14px' : '12px',
                },
              };
            }}
          />
        ))}
      </Space>
    </div>
  </Space>
);

export default App;
