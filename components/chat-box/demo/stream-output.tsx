import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ChatBox } from 'antd';

const sentences = ['Feel free to use Ant Design !', '欢迎使用 Ant Design！'];

const useLoopSentence = () => {
  const [index, setIndex] = React.useState<number>(0);
  React.useEffect(() => {
    setTimeout(() => {
      setIndex((prevState) => (prevState ? 0 : 1));
    }, 4000);
  }, [index]);
  return sentences[index];
};

const App: React.FC = () => {
  const content = useLoopSentence();
  return (
    <ChatBox
      content={content}
      step={{ step: 1, interval: 100 }}
      avatar={<Avatar size={32} icon={<UserOutlined />} />}
    />
  );
};

export default App;
