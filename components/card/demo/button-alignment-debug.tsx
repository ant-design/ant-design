import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Flex, Popconfirm } from 'antd';
import type { GetProp } from 'antd';
import { createStyles } from 'antd-style';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopconfirm } = Popconfirm;

const useStyle = createStyles(({ css }) => ({
  icon: css`
    background: rgba(255, 0, 0, 0.1);

    span {
      background: rgba(0, 255, 0, 0.5);
    }
  `,
  content: css`
    background: rgba(0, 0, 255, 0.1);
  `,
}));

const App: React.FC = () => {
  const { styles } = useStyle();

  const btnCls: GetProp<typeof Button, 'classNames'> = {
    icon: styles.icon,
    content: styles.content,
  };

  return (
    <ConfigProvider button={{ classNames: btnCls }}>
      <Flex vertical gap="middle">
        <Card
          className="line-card"
          title="#57727 Card extra"
          extra={<Button icon={<SmileOutlined />}>Test</Button>}
        >
          Button in Card extra should be vertically centered with the title.
        </Card>

        <Card title="#57896 regression minimum case">
          <div className="simulate-57896">
            <div className="inline-buttons">
              <Button>Cancel</Button>
              <Button type="primary" icon={<SmileOutlined />}>
                Confirm
              </Button>
            </div>
          </div>
        </Card>

        <InternalPopconfirm
          title="Are you OK?"
          okButtonProps={{
            icon: <SmileOutlined />,
          }}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default App;
