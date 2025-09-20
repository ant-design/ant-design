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
  const baseBg = 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)';
  const baseBoxShadow = '0 1px 2px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.08)';
  return info?.props?.active
    ? {
        root: {
          borderRadius: 12,
          padding: 12,
          background: baseBg,
          boxShadow: baseBoxShadow,
        },
        header: {
          marginBottom: 12,
        },
        avatar: {
          borderRadius: '50%',
          backgroundImage: 'linear-gradient(145deg, #ececec, #f9f9f9)',
          boxShadow:
            'inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -1px 2px rgba(0, 0, 0, 0.08)',
        },
        title: {
          height: 20,
          borderRadius: 6,
          backgroundImage: 'linear-gradient(90deg, #eee, #f7f7f7)',
        },
        paragraph: {
          borderRadius: 6,
          backgroundImage: 'linear-gradient(90deg, #f0f0f0, #fafafa)',
        },
      }
    : {
        root: {
          borderRadius: 12,
          padding: 12,
          background: baseBg,
          boxShadow: baseBoxShadow,
        },
        header: {
          marginBottom: 12,
        },
        avatar: {
          borderRadius: '50%',
          backgroundColor: '#f2f2f2',
        },
        title: {
          height: 20,
          borderRadius: 6,
          backgroundColor: '#f3f3f3',
        },
        paragraph: {
          borderRadius: 6,
          backgroundColor: '#f4f4f4',
        },
      };
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
