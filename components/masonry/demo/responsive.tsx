import React from 'react';
import { Masonry } from 'antd';

import DemoItem from './DemoItem';

const heights = [120, 45, 85, 160, 95, 140, 75, 110, 65, 130, 90, 145, 55, 100, 80];

const Demo: React.FC = () => {
  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} gutter={{ xs: 8, sm: 12, md: 16 }}>
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
