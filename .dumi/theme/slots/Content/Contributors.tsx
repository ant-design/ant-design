import React, { Suspense } from 'react';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useIntl } from 'dumi';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import SiteContext from '../SiteContext';
import ContributorAvatar from './ContributorAvatar';
import type { AvatarListItem } from './ContributorAvatar';

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

interface ContributorsData {
  logins: string[];
  components: Record<string, number[]>;
  blog: Record<string, number[]>;
  react: Record<string, number[]>;
  spec: Record<string, number[]>;
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const MODULE_PATTERNS: ReadonlyArray<[RegExp, string]> = [
  [/^components\/([^/]+)\/index\.(zh-CN|en-US)\.md$/, 'components'],
  [/^docs\/blog\/(.+)\.(zh-CN|en-US)\.md$/, 'blog'],
  [/^docs\/react\/(.+)\.(zh-CN|en-US)\.md$/, 'react'],
  [/^docs\/spec\/(.+)\.(zh-CN|en-US)\.md$/, 'spec'],
];

function getContributorKey(filename?: string): string | null {
  for (const [pattern, module] of MODULE_PATTERNS) {
    const match = filename?.match(pattern);
    if (match) {
      const [, key] = match;
      return `${module}/${key}`;
    }
  }
  return null;
}

const CONTRIBUTORS_URL = '/contributors.json';

const swrConfig: SWRConfiguration<ContributorsData, Error> = {
  errorRetryCount: 3,
};

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const { isMobile } = React.use(SiteContext);
  const dataKey = getContributorKey(filename);

  const { data, error, isLoading } = useSWR<ContributorsData, Error>(
    process.env.NODE_ENV === 'production' && dataKey ? CONTRIBUTORS_URL : null,
    fetcher,
    swrConfig,
  );

  if (error) {
    console.error('Failed to fetch contributors data:', error);
    return null;
  }

  if (!dataKey || !data || isLoading) {
    return null;
  }

  const [module, ...rest] = dataKey.split('/');
  const key = rest.join('/');
  const indices = (data[module as keyof ContributorsData] as Record<string, number[]>)?.[key] ?? [];

  if (!indices.length) {
    return null;
  }

  const contributors = indices.map<AvatarListItem>((i) => {
    const login = data.logins[i];
    return { username: login, url: `https://github.com/${login}.png?size=24` };
  });

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
