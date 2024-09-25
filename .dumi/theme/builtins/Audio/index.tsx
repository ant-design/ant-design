import React from 'react';

const Audio: React.FC<React.PropsWithChildren<{ domId: string }>> = ({ domId, children }) => {
  return (
    <a
      onClick={() => {
        const audioElement = document.getElementById(domId) as HTMLAudioElement;
        if (audioElement) {
          audioElement.play();
        }
      }}
    >
      {children}
    </a>
  );
};

export default Audio;
