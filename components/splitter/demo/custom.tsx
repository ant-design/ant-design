import React from 'react';
import { HolderOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Splitter, theme, Typography } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  icon: {
    padding: '8px 0',
    '&:hover': {
      color: token.colorPrimary,
    },
  },
}));

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const { token } = theme.useToken();
  const { styles } = useStyles();

  return (
    <ConfigProvider
      theme={{
        components: {
          Splitter: { splitBarSize: 10 },
        },
      }}
    >
      <Splitter
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        draggerIcon={{
          default: <HolderOutlined className={styles.icon} />,
          active: <HolderOutlined style={{ color: token.colorPrimary }} />,
        }}
      >
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
          <Desc text="Panel 1" />
        </Splitter.Panel>

        <Splitter.Panel>
          <Desc text="Panel 2" />
        </Splitter.Panel>

        <Splitter.Panel resizable={false}>
          <Desc text="Panel 3" />
        </Splitter.Panel>
      </Splitter>
    </ConfigProvider>
  );
};

export default App;
