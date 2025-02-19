import React from 'react';
import { Masonry } from 'antd';

import DemoItem from './DemoItem';

const heights = [135, 60, 105, 180, 75, 85, 115, 70, 165, 40, 120, 90];

const App: React.FC = () => (
  <Masonry
    sequential
    columns={4}
    gutter={16}
    items={heights}
    itemRender={(height, { index }) => <DemoItem height={height}>{index + 1}</DemoItem>}
  />
);

export default App;
