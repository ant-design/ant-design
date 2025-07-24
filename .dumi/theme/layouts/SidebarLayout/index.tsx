import type { PropsWithChildren } from 'react';
import React from 'react';
import { createStyles } from 'antd-style';

import CommonHelmet from '../../common/CommonHelmet';
import Content from '../../slots/Content';
import Sidebar from '../../slots/Sidebar';

const useStyle = createStyles(({ css, token }) => ({
  main: css`
    display: flex;
    // margin-top: ${token.contentMarginTop}px;
  `,
  content: css`
    padding-top: ${token.contentMarginTop}px;
  `,
}));

const SidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { styles } = useStyle();
  return (
    <main className={styles.main}>
      <CommonHelmet />
      <Sidebar />
      <Content className={styles.content}>{children}</Content>
    </main>
  );
};

export default SidebarLayout;
