import { css } from '@emotion/react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import CommonHelmet from '../../common/CommonHelmet';
import Content from '../../slots/Content';
import Sidebar from '../../slots/Sidebar';

const useStyle = () => ({
  main: css`
    display: flex;
    margin-top: 40px;
  `,
});

const SidebarLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { main } = useStyle();
  return (
    <main css={main}>
      <CommonHelmet />
      <Sidebar />
      <Content>{children}</Content>
    </main>
  );
};

export default SidebarLayout;
