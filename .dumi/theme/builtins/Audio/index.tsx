import React from 'react';
import { SoundOutlined } from '@ant-design/icons';

const Audio: React.FC<React.PropsWithChildren<{ domId: string }>> = ({ domId, children }) => {
  return (
    <a onClick={() => document.querySelector<HTMLAudioElement>(`#${domId}`)?.play()}>
      {children}
      <SoundOutlined style={{ fontSize: 20, color: 'black' }} />
    </a>
  );
};

export default Audio;
