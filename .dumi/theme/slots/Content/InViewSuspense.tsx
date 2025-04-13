import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { InView } from 'react-intersection-observer';
import type { IntersectionObserverProps } from 'react-intersection-observer';

type InViewSuspenseProps = Pick<IntersectionObserverProps, 'delay'> & {
  fallback?: React.ReactNode;
};

const InViewSuspense: React.FC<React.PropsWithChildren<InViewSuspenseProps>> = ({
  children,
  fallback = <Skeleton.Input active size="small" />,
  delay = 200,
}) => (
  <InView triggerOnce delay={delay}>
    {({ inView, ref }) => (
      <div ref={ref}>
        <Suspense fallback={fallback}>{inView ? children : <span />}</Suspense>
      </div>
    )}
  </InView>
);

export default InViewSuspense;
