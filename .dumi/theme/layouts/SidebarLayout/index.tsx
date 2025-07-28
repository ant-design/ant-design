import type { PropsWithChildren } from 'react';
import React from 'react';
import { createStyles } from 'antd-style';

import CommonHelmet from '../../common/CommonHelmet';
import Content from '../../slots/Content';
import Sidebar from '../../slots/Sidebar';
import { useSearchParams } from 'dumi';

const useStyle = createStyles(({ css, cssVar }) => ({
  main: css`
    display: flex;
  `,
  content: css`
    padding-top: ${cssVar.marginXL};
  `,
}));

const SidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const hideLayout = searchParams.get('layout') === 'false';

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
