import React from 'react';
import { Button, Modal } from 'antd';

const countDown = () => {
  let secondsToGo = 5;

  const modal = Modal.success({
    title: 'This is a notification message',
    content: `This modal will be destroyed after ${secondsToGo} second.`,
  });

  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};

const App: React.FC = () => <Button onClick={countDown}>Open modal to close in 5s</Button>;

export default App;
