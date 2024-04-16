import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Chatbox } from 'antd';

const sentences = ['Feel free to use Ant Design !', '欢迎使用 Ant Design！'];

const useLoopSentence = () => {
  const [index, setIndex] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIndex((prevState) => (prevState ? 0 : 1));
    }, 4000);
    return () => clearTimeout(timerRef.current);
  }, [index]);
  return sentences[index];
};

const App: React.FC = () => {
  const content = useLoopSentence();
  return (
    <Chatbox
      content={content}
      typing={{ step: 1, interval: 100 }}
      avatar={<Avatar size={32} icon={<UserOutlined />} />}
    />
  );
};

export default App;
