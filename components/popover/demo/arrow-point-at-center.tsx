import React from 'react';
import { createStaticStyles } from 'antd-style';
import { Flex, Popover } from 'antd';
import type { GetProp } from 'antd';

const classNames = createStaticStyles(({ css }) => ({
  item: css`
    width: 280px;
    height: 280px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed purple;
  `,
  box: css`
    width: 40px;
    height: 40px;
    background-color: deepskyblue;
  `,
  cross: css`
    position: relative;

    &::before, &::after {
      content: "";
      position: absolute;
      inset: 0;
    }
    &::before {
      top: 50%;
      height: 1px;
      background-color: red;
    }
    &::after {
      left: 50%;
      width: 1px;
      background-color: blue;
    }
  `,
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
  return (
    <Flex gap={16} wrap>
      {placements.map((placement) => (
        <div key={placement} className={classNames.item}>
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
            <div className={`${classNames.box} ${classNames.cross}`} />
          </Popover>
        </div>
      ))}
    </Flex>
  );
};

export default App;
