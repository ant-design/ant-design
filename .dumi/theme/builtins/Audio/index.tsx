import React from 'react';
import { SoundOutlined } from '@ant-design/icons';
import { createStaticStyles } from 'antd-style';

const styles = createStaticStyles(({ css, cssVar }) => {
  return {
    playBtn: css`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      column-gap: ${cssVar.paddingXXS};
      margin: 0;
    `,
    icon: css`
      font-size: ${cssVar.fontSizeXL};
      color: ${cssVar.colorLink};
      transition: all ${cssVar.motionDurationSlow};
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
      &:hover {
        color: ${cssVar.colorLinkHover};
      }
      &:active {
        color: ${cssVar.colorLinkActive};
      }
    `,
  };
});

interface AudioProps {
  id?: string;
}

const AudioControl: React.FC<React.PropsWithChildren<AudioProps>> = ({ id, children }) => {
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const audio = document.querySelector<HTMLAudioElement>(`#${id}`);
    audio?.play();
  };
  return (
    <a className={styles.playBtn} onClick={onClick}>
      {children}
      <SoundOutlined className={styles.icon} />
    </a>
  );
};

export default AudioControl;
