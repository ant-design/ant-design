import React from 'react';
import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Flex, Splitter, Typography } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  draggerIcon: {
    '&:hover': {
      color: token.colorPrimary,
    },
  },
  collapsibleIcon: {
    fontSize: 16,
    color: token.colorTextDescription,

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
  const { styles } = useStyles();

  return (
    <ConfigProvider
      theme={{
        components: {
          Splitter: { splitBarSize: 1, splitTriggerSize: 16 },
        },
      }}
    >
      <Splitter
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        draggerIcon={<ColumnWidthOutlined className={styles.draggerIcon} />}
        collapsibleIcon={{
          start: <CaretLeftOutlined className={styles.collapsibleIcon} />,
          end: <CaretRightOutlined className={styles.collapsibleIcon} />,
        }}
      >
        <Splitter.Panel defaultSize="40%" min="20%" max="70%" collapsible>
          <Desc text="Panel 1" />
        </Splitter.Panel>

        <Splitter.Panel collapsible>
          <Desc text="Panel 2" />
        </Splitter.Panel>

        <Splitter.Panel resizable={false}>
          <Desc text="Panel 3" />
        </Splitter.Panel>
      </Splitter>

      <Splitter
        layout="vertical"
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
        draggerIcon={<ColumnHeightOutlined className={styles.draggerIcon} />}
        collapsibleIcon={{
          start: <CaretUpOutlined className={styles.collapsibleIcon} />,
          end: <CaretDownOutlined className={styles.collapsibleIcon} />,
        }}
      >
        <Splitter.Panel defaultSize="40%" min="30%" max="70%" collapsible>
          <Desc text="First" />
        </Splitter.Panel>

        <Splitter.Panel collapsible>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
    </ConfigProvider>
  );
};

export default App;
