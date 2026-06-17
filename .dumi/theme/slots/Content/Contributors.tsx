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
    return { url: null, component: null };
  }

  const [, component, lang] = match;

  return {
    url: `/component-contributors/${lang === 'zh-CN' ? 'zhCN' : 'enUS'}.json`,
    component,
  };
}

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const { isMobile } = React.use(SiteContext);
  const { url, component } = getContributorUrl(filename);
  const { data: allContributors = {} } = useSWR<Record<string, string[]>>(url, fetcher, {
    errorRetryCount: 3,
  });

  const contributorLogins = component ? (allContributors[component] ?? []) : [];

  if (!url || !component) {
    return null;
  }

  const contributors = contributorLogins.map((login) => ({
    username: login,
    url: `https://github.com/${login}.png?size=24`,
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
