import React from 'react';
import { Masonry } from 'antd';

import DemoItem from './DemoItem';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const App: React.FC = () => (
  <Masonry
    columns={4}
    gutter={16}
    items={heights}
    itemRender={(height, { index }) => <DemoItem height={height}>{index + 1}</DemoItem>}
  />
);

export default App;
