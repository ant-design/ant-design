import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useButtonStyle = () => {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);

  const btnPrefixCls = getPrefixCls('btn');

  return createStyles(({ css }) => ({
    btn: css`
      background: red;

      .${btnPrefixCls}-icon {
        color: green;
      }
    `,
  }))();
};

function GeekProvider(props: { children?: React.ReactNode }) {
  const { styles } = useButtonStyle();

  return <ConfigProvider button={{ className: styles.btn }}>{props.children}</ConfigProvider>;
}

const App: React.FC = () => (
  <GeekProvider>
    <Space wrap>
      <Button type="primary" icon={<SmileOutlined />}>
        Primary Button
      </Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
  </GeekProvider>
);

export default App;
