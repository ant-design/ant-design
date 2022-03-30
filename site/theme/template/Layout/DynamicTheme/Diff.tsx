import React, { FC } from 'react';

type DiffProps = {
  show: boolean;
};

const Diff: FC<DiffProps> = ({ show }) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const src = window.location.href.replace(/(https?:\/\/)[^/]+/, '$1ant.design');

  return (
    <iframe
      title="master-diff"
      style={{
        position: 'absolute',
        width: '100vw',
        height: document.body.scrollHeight,
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: show ? '30%' : '0',
        zIndex: 10,
      }}
      src={src}
      frameBorder={0}
    />
  );
};

export default Diff;
