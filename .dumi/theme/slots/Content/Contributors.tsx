import React, { Suspense, useState } from 'react';
import { Avatar, Button, Modal } from 'antd';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';
import { useIntl } from 'dumi';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import useIsPreviewSite from '../../../hooks/useIsPreviewSite';
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 180px), 1fr));
    gap: ${cssVar.marginSM};
    margin: 0;
    padding: 0;
    list-style: none;

    a,
    a:hover,
    a:active {
      display: flex;
      align-items: center;
      gap: ${cssVar.marginXS};
      color: ${cssVar.colorTextSecondary};
      overflow-wrap: anywhere;
    }

    .ant-avatar {
      flex-shrink: 0;
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
  const [open, setOpen] = useState(false);
  const dataKey = getContributorKey(filename);
  const isPreviewSite = useIsPreviewSite();

  const { data, error, isLoading } = useSWR<ContributorsData, Error>(
    process.env.NODE_ENV === 'production' && !isPreviewSite && dataKey ? CONTRIBUTORS_URL : null,
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
  const title = formatMessage({ id: 'app.content.contributors' });
  const label = `${title} (${contributors.length})`;

  return (
    <div className={clsx({ [styles.listMobile]: isMobile })}>
      <div className={styles.title}>{title}</div>
      <Button type="text" aria-label={label} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <Avatar.Group size="small">
          {contributors.slice(0, 5).map(({ username, url }) => (
            <Avatar key={username} src={url} alt={username}>
              {username}
            </Avatar>
          ))}
        </Avatar.Group>
        <span>{contributors.length}</span>
      </Button>
      <Modal
        title={label}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={640}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
      >
        <ul className={styles.list}>
          {contributors.map((item) => (
            <ContributorAvatar item={item} key={item.username} />
          ))}
        </ul>
      </Modal>
    </div>
  );
};

const SuspenseContributors: React.FC<ContributorsProps> = (props) => (
  <Suspense fallback={null}>
    <Contributors {...props} />
  </Suspense>
);

export default SuspenseContributors;
