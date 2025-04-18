import React from 'react';
import { Flex, Skeleton, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { useLocation } from 'dumi';

const useStyle = createStyles(({ token, css }) => {
  return {
    loading: css`
      max-width: 70vw;
      width: 100%;
      margin: 80px auto 0;
      text-align: center;
    `,
    logoImg: css`
      width: 40px;
      margin-bottom: ${token.marginLG}px;
      filter: grayscale(1);
      opacity: 0.33;
    `,
    flexWrapper: css`
      width: 100%;
      margin: 120px 0;
    `,
  };
});

const Loading: React.FC = () => {
  const { pathname } = useLocation();
  const { styles } = useStyle();
  if (
    pathname.startsWith('/components') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/changelog')
  ) {
    return (
      <div className={styles.loading}>
        <img
          draggable={false}
          alt="loading"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          className={styles.logoImg}
        />
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 32 }} />
      </div>
    );
  }
  return (
    <Flex justify="center" align="center" gap="small" className={styles.flexWrapper}>
      <Spin size="large" />
    </Flex>
  );
};

export default Loading;
