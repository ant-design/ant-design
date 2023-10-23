import React from 'react';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

const useStyles = createStyles(({ cx, token }) => {
  const play = css`
    position: absolute;
    right: ${token.paddingLG}px;
    bottom: ${token.paddingLG}px;
    font-size: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.65);
    opacity: 0;
    transition: opacity ${token.motionDurationSlow};
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

export default function VideoPlayer({
  className,
  ...restProps
}: React.HtmlHTMLAttributes<HTMLVideoElement>) {
  const { styles } = useStyles();
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
      className={classNames(styles.container, className)}
      tabIndex={0}
      role="button"
      title="play or pause"
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      <div className={classNames(styles.holder)}>
        <video ref={videoRef} className={styles.video} muted loop {...restProps} />

        <div className={styles.play}>{playing ? <PauseCircleFilled /> : <PlayCircleFilled />}</div>
      </div>
    </div>
  );
}
