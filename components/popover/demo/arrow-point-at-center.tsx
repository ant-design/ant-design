import type { PopoverProps } from 'antd';
import { Button, Popover } from 'antd';
import { createStyles } from 'antd-style';
import * as React from 'react';

type Placement = PopoverProps['placement'];

const useStyle = createStyles(() => ({
  container: {
    display: 'grid',
    placeItems: 'center',
    height: '680px',
    width: '680px',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
  },

  preview: {
    gridArea: '2 / 2 / -2 / -2',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

// 容器 + after + before 实现十字架
const useCrossStyle = createStyles(() => ({
  container: {
    position: 'relative',
    width: '100px',
    height: '100px',
    backgroundColor: 'deepskyblue',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      backgroundColor: 'red',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      width: '1px',
      backgroundColor: 'green',
    },
  },
}));

interface GridItem {
  key: Placement;
  area: string;
}

const gridItems: GridItem[] = [
  // top
  { key: 'topLeft', area: '1 / 2' },
  { key: 'top', area: '1 / 3' },
  { key: 'topRight', area: '1 / 4' },
  // left
  { key: 'leftTop', area: '2 / 1' },
  { key: 'left', area: '3 / 1' },
  { key: 'leftBottom', area: '4 / 1' },
  // right
  { key: 'rightTop', area: '2 / 5' },
  { key: 'right', area: '3 / 5' },
  { key: 'rightBottom', area: '4 / 5' },
  // bottom
  { key: 'bottomLeft', area: '5 / 2' },
  { key: 'bottom', area: '5 / 3' },
  { key: 'bottomRight', area: '5 / 4' },
];

interface WrapperProps {
  children: React.ReactElement;
}

function Wrapper(props: WrapperProps) {
  const { children } = props;
  const { styles } = useStyle();
  const [placement, setPlacement] = React.useState<Placement>('top');

  return (
    <div className={styles.container}>
      {gridItems.map((item) => (
        <Button
          key={item.key}
          style={{ gridArea: item.area }}
          onMouseEnter={() => setPlacement(item.key)}
        >
          {item.key}
        </Button>
      ))}
      <div className={styles.preview}>
        {React.isValidElement(children)
          ? React.cloneElement<any>(children, { placement })
          : children}
      </div>
    </div>
  );
}

function Demo(props: any) {
  const { styles } = useCrossStyle();
  return (
    <Popover
      placement={props.placement}
      content={<div className={styles.container} />}
      arrow={{ pointAtCenter: true }}
      forceRender
      open
    >
      <div className={styles.container} />
    </Popover>
  );
}

export default () => (
  <Wrapper>
    <Demo />
  </Wrapper>
);
