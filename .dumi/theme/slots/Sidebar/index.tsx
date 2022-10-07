import React, { type FC } from 'react';
import { useSidebarData } from 'dumi';

const Sidebar: FC = () => {
  // TODO: implement sidebar
  // from: https://github.com/ant-design/ant-design/blob/2a754bd5cad7fd4892a065a8e044fb402f51f426/site/theme/template/Content/MainContent.jsx#L458-L467
  //  1. Sticky
  //  2. Menu Group & Menu Item
  //  3. Collapsible (only for design doc: https://ant.design/docs/spec/introduce-cn)
  console.log('conventional sidebar data', useSidebarData());

  return (
    <section style={{ width: 240, padding: 22, borderRight: '1px solid #eee' }}>
      Sidebar Area
    </section>
  );
};

export default Sidebar;
