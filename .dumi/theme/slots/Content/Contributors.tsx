import React, { Suspense } from 'react';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useIntl } from 'dumi';
import useSWR from 'swr';

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

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

function getContributorUrl(filename?: string) {
  const match = filename?.match(/^components\/([^/]+)\/index\.(zh-CN|en-US)\.md$/);

  if (!match) {
    return null;
  }

  const [, component, locale] = match;

  return `/component-contributors/${component}-${locale === 'zh-CN' ? 'zhCN' : 'enUS'}.json`;
}

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const { isMobile } = React.use(SiteContext);
  const contributorUrl = getContributorUrl(filename);
  const { data: contributorLogins = [] } = useSWR<string[]>(contributorUrl, fetcher, {
    errorRetryCount: 3,
  });

  if (!contributorUrl) {
    return null;
  }

  const contributors = contributorLogins.map((login) => ({
    username: login,
    url: `https://github.com/${login}.png?size=32`,
  }));

  return (
    <div className={clsx({ [styles.listMobile]: isMobile })}>
      <div className={styles.title}>{formatMessage({ id: 'app.content.contributors' })}</div>
      <ul className={styles.list}>
        {contributors.map((item) => (
          <ContributorAvatar item={item} key={item.username} />
        ))}
      </ul>
    </div>
  );
};

const SuspenseContributors: React.FC<ContributorsProps> = (props) => (
  <Suspense fallback={null}>
    <Contributors {...props} />
  </Suspense>
);

export default SuspenseContributors;
