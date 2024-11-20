import React from 'react';
import { Masonry } from 'antd';

import DemoItem from './DemoItem';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Demo: React.FC = () => {
  return (
    <Masonry columns={4} gutter={16}>
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
