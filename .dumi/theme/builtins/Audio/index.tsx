import React from 'react';
import { SoundOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, cssVar }) => {
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
