import React from 'react';
import { BorderBeam, Card } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, prefixCls, cssVar } = props;
  return {
    card: css`
      width: 360px;
      .${prefixCls}-border-beam {
        opacity: 0;
        transition: opacity ${cssVar.motionDurationMid};
        &::before {
          animation-play-state: paused;
        }
      }
      &:hover {
        .${prefixCls}-border-beam {
          opacity: 1;
          &::before {
            animation-play-state: running;
          }
        }
      }
    `,
  };
});

const Demo: React.FC = () => {
  const { styles } = useStyles();
  return (
    <BorderBeam>
      <Card className={styles.card} title="Hover over the card">
        The border beam appears when the pointer moves over this card.
      </Card>
    </BorderBeam>
  );
};

export default Demo;
