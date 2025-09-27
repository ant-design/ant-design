import React from 'react';
import { Button, Space, message } from 'antd';
import type { MessageArgsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    margin-top: 20vh;
  `,
}));

const stylesObject: MessageArgsProps['styles'] = {
  icon: { fontSize: '20px' },
};

const stylesFn: MessageArgsProps['styles'] = ({ props: { type } }) => {
  if (type === 'success') {
    return { content: { backgroundColor: '#F5F5F5' } };
  }

  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();
  const [messageApi, contextHolder] = message.useMessage();

  const showObjectStyle = () => {
    messageApi.open({
      type: 'info',
      content: 'This is a message with object classNames and styles',
      classNames: {
        root: styles.root,
      },
      styles: stylesObject,
    });
  };

  const showFunctionStyle = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a message with function classNames and styles',
      classNames: {
        root: styles.root,
      },
      styles: stylesFn,
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={showObjectStyle}>Object style</Button>
        <Button onClick={showFunctionStyle}>Function style</Button>
      </Space>
    </>
  );
};

export default App;
