import React from 'react';
import { createStyles } from 'antd-style';
import { Flex, Popover } from 'antd';
import type { GetProp } from 'antd';

const useStyle = createStyles(() => ({
  item: {
    width: '280px',
    height: '280px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed purple',
  },

  box: {
    width: '40px',
    height: '40px',
    backgroundColor: 'deepskyblue',
  },

  cross: {
    position: 'relative',

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
    },
    '&::before': {
      top: '50%',
      height: '1px',
      backgroundColor: 'red',
    },
    '&::after': {
      left: '50%',
      width: '1px',
      backgroundColor: 'blue',
    },
  },
}));

type Placement = GetProp<typeof Popover, 'placement'>;

const placements: Placement[] = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
];

const App = () => {
  const { styles, cx } = useStyle();
  return (
    <Flex gap={16} wrap>
      {placements.map((placement) => (
        <div key={placement} className={styles.item}>
          <Popover
            placement={placement}
            content={
              <Flex align="center" justify="center">
                {placement}
              </Flex>
            }
            autoAdjustOverflow={false}
            arrow={{ pointAtCenter: true }}
            forceRender
            open
          >
            <div className={cx(styles.box, styles.cross)} />
          </Popover>
        </div>
      ))}
    </Flex>
  );
};

export default App;
