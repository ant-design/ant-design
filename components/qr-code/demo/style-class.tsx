import React from 'react';
import { QRCode, Space } from 'antd';
import type { QRCodeProps } from 'antd';

const App: React.FC = () => {
  const classNamesObject: QRCodeProps['classNames'] = {
    root: 'custom-qrcode-root',
    cover: 'custom-qrcode-cover',
  }

  const stylesObject: QRCodeProps['styles'] = {
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
  }


  const classNamesFunction: QRCodeProps['classNames']  =(info) => ({
    root: info.props.type === 'canvas' ? 'canvas-qrcode' : 'svg-qrcode',
    cover: `cover-${info.props.size}`,
  })

  const stylesFunction: QRCodeProps['styles'] = (info) => ({
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
  })

  return (
    <Space  size="large">
      <div>
        <h4>classNames and styles object</h4>
        <Space wrap>
          <QRCode
            value="https://ant.design/"
            size={160}
            classNames={classNamesObject}
            styles={stylesObject}
          />

          <QRCode
            value="https://ant.design/"
            size={160}
            icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            classNames={classNamesObject}
            styles={stylesObject}
          />
        </Space>
      </div>

      <div>
        <h4>classNames and styles function</h4>
        <Space wrap>
          <QRCode
            value="https://ant.design/"
            size={120}
            type="canvas"
            bordered={true}
            classNames={classNamesFunction}
            styles={stylesFunction}
          />
        </Space>
      </div>
    </Space>
  )
};

export default App;
