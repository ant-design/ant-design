import React from 'react';
import { Flex, QRCode } from 'antd';
import type { QRCodeProps, QRCodeSemanticAllType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
  `,
}));

const stylesObject: QRCodeProps['styles'] = {
  root: {
    border: '2px solid #1890ff',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgb(24, 144, 255, 0.1)',
  },
};

const stylesFunction: QRCodeProps['styles'] = (info): QRCodeSemanticAllType['styles'] => {
  if (info.props.type === 'canvas') {
    return {
      root: {
        border: '2px solid #ff4d4f',
        borderRadius: 8,
        padding: 16,
        backgroundColor: 'rgba(255, 77, 79, 0.1)',
      },
    };
  }
};

const App: React.FC = () => {
  const sharedProps: QRCodeProps = {
    value: 'https://ant.design/',
    size: 160,
    classNames,
  };

  return (
    <Flex gap="middle">
      <QRCode {...sharedProps} styles={stylesObject} />
      <QRCode
        {...sharedProps}
        type="canvas"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        styles={stylesFunction}
      />
    </Flex>
  );
};

export default App;
