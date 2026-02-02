import React from 'react';
import { PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';

const styles = createStaticStyles(({ css, cx, cssVar }) => {
  const play = css`
    position: absolute;
    inset-inline-end: ${cssVar.paddingLG};
    bottom: ${cssVar.paddingLG};
    font-size: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.65);
    opacity: 0;
    transition: opacity ${cssVar.motionDurationSlow};
  `;

  return {
    container: css`
      position: relative;
    `,

    holder: css`
      position: relative;
      cursor: pointer;

      &:hover {
        .${cx(play)} {
          opacity: 1;
        }
      }
    `,

    video: css`
      width: 100%;
    `,

    play,
  };
});

const VideoPlayer: React.FC<React.HtmlHTMLAttributes<HTMLVideoElement>> = ({
  className,
  ...restProps
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (playing) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playing]);

  return (
    <div
      className={clsx(styles.container, className)}
      tabIndex={0}
      role="button"
      title="play or pause"
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      <div className={clsx(styles.holder)}>
        <video ref={videoRef} className={styles.video} muted loop {...restProps} />
        <div className={styles.play}>{playing ? <PauseCircleFilled /> : <PlayCircleFilled />}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
