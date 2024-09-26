import React from 'react';

const Icon: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    id="voice"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.84-5 6.7v2.07c4-.91 7-4.49 7-8.77c0-4.28-3-7.86-7-8.77M16.5 12c0-1.77-1-3.29-2.5-4.03V16c1.5-.71 2.5-2.24 2.5-4M3 9v6h4l5 5V4L7 9H3z"
      fill="currentColor"
    />
  </svg>
);

const Audio: React.FC<React.PropsWithChildren<{ domId: string }>> = ({ domId, children }) => {
  return (
    <a onClick={() => document.querySelector<HTMLAudioElement>(`#${domId}`)?.play()}>
      {children}
      <Icon style={{ height: 24, verticalAlign: 'middle', color: 'black' }} />
    </a>
  );
};

export default Audio;
