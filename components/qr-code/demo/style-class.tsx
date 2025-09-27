import React from 'react';
import { Flex, QRCode } from 'antd';
import type { QRCodeProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const stylesObject: QRCodeProps['styles'] = {
    root: {
      border: '2px solid #1890ff',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#f0f8ff',
    },
  };

  const stylesFunction: QRCodeProps['styles'] = (info) => {
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
