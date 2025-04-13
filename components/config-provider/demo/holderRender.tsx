import React, { useContext, useLayoutEffect } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { App, Button, ConfigProvider, message, Modal, notification, Space } from 'antd';

const Demo: React.FC = () => {
  const { locale, theme } = useContext(ConfigProvider.ConfigContext);
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <StyleProvider hashPriority="high">
          <ConfigProvider prefixCls="static" iconPrefixCls="icon" locale={locale} theme={theme}>
            <App message={{ maxCount: 1 }} notification={{ maxCount: 1 }}>
              {children}
            </App>
          </ConfigProvider>
        </StyleProvider>
      ),
    });
  }, [locale, theme]);

  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            message.info('This is a normal message');
          }}
        >
          message
        </Button>
        <Button
          type="primary"
          onClick={() => {
            notification.open({
              message: 'Notification Title',
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
          }}
        >
          notification
        </Button>
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Do you want to delete these items?',
              icon: <ExclamationCircleFilled />,
              content: 'Some descriptions',
            });
          }}
        >
          Modal
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
