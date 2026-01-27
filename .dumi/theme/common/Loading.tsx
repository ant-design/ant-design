import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, Flex, Skeleton, Spin } from 'antd';
import { createStaticStyles } from 'antd-style';
import { useLocation } from 'dumi';

import { Common } from './styles';

const styles = createStaticStyles(({ css, cssVar }) => {
  return {
    skeletonWrapper: css`
      width: 100%;
      max-width: 70vw;
      margin: 80px auto 0;
      text-align: center;
    `,
    img: css`
      display: block;
      margin-inline: auto;
      margin-bottom: ${cssVar.marginLG};
      filter: grayscale(1);
      opacity: 0.33;
    `,
  };
});

const Loading: React.FC = () => {
  const { pathname } = useLocation();

  let loadingNode: React.ReactNode = null;

  if (
    pathname.startsWith('/components') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/changelog')
  ) {
    loadingNode = (
      <div className={styles.skeletonWrapper}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          width={40}
          height={40}
          alt="loading"
          draggable={false}
          className={styles.img}
        />
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 4 }} style={{ marginTop: 32 }} />
      </div>
    );
  } else {
    loadingNode = (
      <Flex
        justify="center"
        align="center"
        gap="small"
        style={{ width: '100%', margin: '120px 0' }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  // Loading 组件独立于 GlobalLayout，而它也会影响站点样式。
  // 所以我们这边需要 hardcode 一下启动 layer。
  return (
    <StyleProvider layer>
      <ConfigProvider theme={{ zeroRuntime: process.env.NODE_ENV === 'production' }}>
        <Common />
        {loadingNode}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default Loading;
