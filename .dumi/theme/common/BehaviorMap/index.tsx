import type { FC } from 'react';
import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { createStaticStyles } from 'antd-style';

import useLocale from '../../../hooks/useLocale';
import type { BehaviorMapProps } from './BehaviorMap';

const InternalBehaviorMap = React.lazy(() => import('./BehaviorMap'));

const styles = createStaticStyles(({ cssVar, css }) => ({
  fallback: css`
    width: 100%;
    > * {
      width: 100% !important;
      border-radius: ${cssVar.borderRadiusLG};
    }
  `,
  placeholder: css`
    color: ${cssVar.colorTextDescription};
    font-size: ${cssVar.fontSizeLG};
  `,
}));

const locales = {
  cn: {
    placeholder: '正在载入行为模式地图...',
  },
  en: {
    placeholder: 'Loading behavior map...',
  },
};

const BehaviorMapFallback: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <div className={styles.fallback}>
      <Skeleton.Node active style={{ height: 600, width: '100%' }}>
        <span className={styles.placeholder}>{locale.placeholder}</span>
      </Skeleton.Node>
    </div>
  );
};

const BehaviorMap: FC<BehaviorMapProps> = (props) => (
  <Suspense fallback={<BehaviorMapFallback />}>
    <InternalBehaviorMap {...props} />
  </Suspense>
);

export default BehaviorMap;
