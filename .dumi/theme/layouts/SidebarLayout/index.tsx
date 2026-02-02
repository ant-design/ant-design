import type { PropsWithChildren } from 'react';
import React from 'react';
import { createStaticStyles } from 'antd-style';
import { useSearchParams } from 'dumi';

import CommonHelmet from '../../common/CommonHelmet';
import Content from '../../slots/Content';
import Sidebar from '../../slots/Sidebar';

const styles = createStaticStyles(({ css, cssVar }) => ({
  main: css`
    display: flex;
    margin-top: ${cssVar.marginXL};
  `,
}));

const SidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const hideLayout = searchParams.get('layout') === 'false';
  return (
    <main className={styles.main}>
      <CommonHelmet />
      {!hideLayout && <Sidebar />}
      <Content>{children}</Content>
    </main>
  );
};

export default SidebarLayout;
