import React, { Suspense } from 'react';
import ContributorsList from '@qixian.cs/github-contributors-list';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useIntl } from 'dumi';

import SiteContext from '../SiteContext';
import ContributorAvatar from './ContributorAvatar';

const useStyle = createStyles(({ cssVar, css }) => ({
  listMobile: css`
    margin: 1em 0 !important;
  `,
  title: css`
    font-size: ${cssVar.fontSizeSM};
    opacity: 0.5;
    margin-bottom: ${cssVar.marginXS};
  `,
  list: css`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    li {
      height: 24px;
      transition: all ${cssVar.motionDurationSlow};
      margin-inline-end: calc(-1 * ${cssVar.marginXS});
    }
    &:hover {
      li {
        margin-inline-end: 0;
      }
    }
  `,
}));

interface ContributorsProps {
  filename?: string;
}

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const { styles } = useStyle();
  const { isMobile } = React.use(SiteContext);

  if (!filename) {
    return null;
  }

  return (
    <div className={clsx({ [styles.listMobile]: isMobile })}>
      <div className={styles.title}>{formatMessage({ id: 'app.content.contributors' })}</div>
      <ContributorsList
        cache
        repo="ant-design"
        owner="ant-design"
        fileName={filename}
        className={styles.list}
        renderItem={(item, loading) => (
          <ContributorAvatar item={item} loading={loading} key={item?.url} />
        )}
      />
    </div>
  );
};

const SuspenseContributors: React.FC<React.ComponentProps<typeof Contributors>> = (props) => (
  <Suspense fallback={null}>
    <Contributors {...props} />
  </Suspense>
);

export default SuspenseContributors;
