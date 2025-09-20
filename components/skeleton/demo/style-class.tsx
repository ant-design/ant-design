import React from 'react';
import { Flex, Skeleton } from 'antd';
import type { SkeletonProps } from 'antd';

const classNamesFn: SkeletonProps['classNames'] = (info) => {
  return info?.props?.active
    ? {
        root: 'demo-skeleton-root-active',
        header: 'demo-skeleton-header-active',
        section: 'demo-skeleton-section-active',
        avatar: 'demo-skeleton-avatar-active',
        title: 'demo-skeleton-title-active',
        paragraph: 'demo-skeleton-paragraph-active',
      }
    : {
        root: 'demo-skeleton-root-normal',
        header: 'demo-skeleton-header-normal',
        section: 'demo-skeleton-section-normal',
        avatar: 'demo-skeleton-avatar-normal',
        title: 'demo-skeleton-title-normal',
        paragraph: 'demo-skeleton-paragraph-normal',
      };
};

const stylesFn: SkeletonProps['styles'] = (info) => {
  return info?.props?.active
    ? { root: {}, header: {}, section: {}, avatar: {}, title: {}, paragraph: {} }
    : { root: {}, header: {}, section: {}, avatar: {}, title: {}, paragraph: {} };
};

const Demo: React.FC = () => {
  return (
    <Flex justify="space-between" align="center" gap="large">
      <Skeleton classNames={classNamesFn} styles={stylesFn} />
      <Skeleton classNames={classNamesFn} styles={stylesFn} active />
    </Flex>
  );
};

export default Demo;
