import React, { useState } from 'react';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Slider } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';

const useStyles = createStyles((props) => {
  const { css, iconPrefixCls, cssVar } = props;
  return {
    wrapper: css`
      position: relative;
      .${iconPrefixCls} {
        color: ${cssVar.colorTextQuaternary};
        font-size: ${cssVar.fontSizeLG};
        transition: color ${cssVar.motionDurationFast} ${cssVar.motionEaseInOutCirc};
        &.isActive {
          color: ${cssVar.colorPrimary};
        }
      }
    `,
    slider: css`
      flex: 1;
      width: 100%;
    `,
  };
});

interface IconSliderProps {
  max: number;
  min: number;
}

const IconSlider: React.FC<IconSliderProps> = (props) => {
  const { max, min } = props;

  const { styles } = useStyles();

  const [value, setValue] = useState(0);

  const mid = Number(((max - min) / 2).toFixed(5));

  return (
    <Flex justify="space-between" align="center" gap="small" className={styles.wrapper}>
      <FrownOutlined className={clsx({ isActive: value < mid })} />
      <Slider {...props} onChange={setValue} value={value} className={styles.slider} />
      <SmileOutlined className={clsx({ isActive: value >= mid })} />
    </Flex>
  );
};

const App: React.FC = () => <IconSlider min={0} max={20} />;

export default App;
