import React, { Suspense } from 'react';
import ContributorsList from '@qixian.cs/github-contributors-list';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useIntl } from 'dumi';

import SiteContext from '../SiteContext';
import ContributorAvatar from './ContributorAvatar';

const styles = createStaticStyles(({ cssVar, css }) => ({
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
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
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

// 这些机器人账号不需要展示
const blockList = [
  'github-actions',
  'copilot',
  'renovate',
  'dependabot',
  'gemini-code-assist[bot]',
];

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
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
        filter={(item) => !blockList.includes(item?.username?.toLowerCase() ?? '')}
        renderItem={(item, loading) => (
          <ContributorAvatar item={item} loading={loading} key={item?.url} />
        )}
      />
    </div>
  );
};

const SuspenseContributors: React.FC<ContributorsProps> = (props) => (
  <Suspense fallback={null}>
    <Contributors {...props} />
  </Suspense>
);

export default SuspenseContributors;
