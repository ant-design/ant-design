import React from 'react';
import { Masonry } from 'antd';

import DemoItem from './DemoItem';

const heights = [120, 45, 85, 160, 95, 140, 75, 110, 65, 130, 90, 145, 55, 100, 80];

const App: React.FC = () => {
  const items = heights.map((height, index) => ({
    key: `item-${index}`,
    data: height,
    index,
  }));

  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gutter={{ xs: 8, sm: 12, md: 16 }}
      items={items}
      itemRender={(item) => <DemoItem height={item.data}>{item.index + 1}</DemoItem>}
    />
  );
};

export default App;
