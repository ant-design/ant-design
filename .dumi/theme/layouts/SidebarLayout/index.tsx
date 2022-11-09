import React, { FC, PropsWithChildren } from 'react';
import Sidebar from '../../slots/Sidebar';
import Content from '../../slots/Content';
import CommonHelmet from '../../common/CommonHelmet';

const SidebarLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main style={{ display: 'flex', marginTop: 40 }}>
      <CommonHelmet />
      <Sidebar />
      <Content>{children}</Content>
    </main>
  );
};

export default SidebarLayout;
