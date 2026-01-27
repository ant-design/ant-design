import type { PropsWithChildren } from 'react';
import React from 'react';
import { createStyles } from 'antd-style';
import { useSearchParams } from 'dumi';

import CommonHelmet from '../../common/CommonHelmet';
import Content from '../../slots/Content';
import Sidebar from '../../slots/Sidebar';

const useStyle = createStyles(({ css, token }) => ({
  main: css`
    display: flex;
    margin-top: ${token.contentMarginTop}px;
  `,
}));

const SidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const hideLayout = searchParams.get('layout') === 'false';

  const { styles } = useStyle();
  return (
    <main className={styles.main}>
      <CommonHelmet />
      {!hideLayout && <Sidebar />}
      <Content>{children}</Content>
    </main>
  );
};

export default SidebarLayout;
