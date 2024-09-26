import React from 'react';

const Audio: React.FC<React.PropsWithChildren<{ domId: string }>> = ({ domId, children }) => {
  return (
    <a onClick={() => document.querySelector<HTMLAudioElement>(`#${domId}`)?.play()}>{children}</a>
  );
};

export default Audio;
