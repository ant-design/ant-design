import React from 'react';
import { Masonry } from 'antd';

import DemoItem from './DemoItem';

const heights = [135, 60, 105, 180, 75, 85, 115, 70, 165, 40, 120, 90];

const Demo: React.FC = () => {
  return (
    <Masonry columns={4} gutter={16} sequential>
      {heights.map((height, index) => {
        const key = `item-${index}`;
        return (
          <DemoItem key={key} height={height}>
            {index + 1}
          </DemoItem>
        );
      })}
    </Masonry>
  );
};

export default Demo;
