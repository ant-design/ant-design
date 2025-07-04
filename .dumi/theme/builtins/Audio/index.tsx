import React from 'react';
import { SoundOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, token }) => {
  const { paddingXXS, fontSizeXL, motionDurationSlow, colorLink, colorLinkHover, colorLinkActive } =
    token;
  return {
    playBtn: css`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      column-gap: ${paddingXXS}px;
      margin: 0;
    `,
    icon: css`
      font-size: ${fontSizeXL}px;
      color: ${colorLink};
      transition: all ${motionDurationSlow};
      &:hover {
        color: ${colorLinkHover};
      }
      &:active {
        color: ${colorLinkActive};
      }
    `,
  };
});

interface AudioProps {
  id?: string;
}

const AudioControl: React.FC<React.PropsWithChildren<AudioProps>> = ({ id, children }) => {
  const { styles } = useStyle();
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
