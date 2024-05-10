/* eslint-disable global-require */
import React from 'react';
import { BugOutlined, HistoryOutlined } from '@ant-design/icons';
import { Button, Drawer, Grid, Popover, Timeline, Typography } from 'antd';
import type { TimelineItemProps } from 'antd';
import { createStyles } from 'antd-style';
import semver from 'semver';

import deprecatedVersions from '../../../../BUG_VERSIONS.json';
import useFetch from '../../../hooks/useFetch';
import useLocale from '../../../hooks/useLocale';
import Link from '../Link';

interface MatchDeprecatedResult {
  match?: string;
  reason: string[];
}

function matchDeprecated(v: string): MatchDeprecatedResult {
  const match = Object.keys(deprecatedVersions).find((depreciated) =>
    semver.satisfies(v, depreciated),
  );
  const reason = deprecatedVersions[match as keyof typeof deprecatedVersions] || [];
  return {
    match,
    reason: Array.isArray(reason) ? reason : [reason],
  };
}

const useStyle = createStyles(({ token, css }) => ({
  history: css`
    position: absolute;
    top: 0;
    inset-inline-end: ${token.marginXS}px;
  `,

  li: css`
    // white-space: pre;
  `,

  ref: css`
    margin-inline-start: ${token.marginXS}px;
  `,
  bug: css`
    font-size: ${token.fontSize}px;
    color: #aaa;
    margin-inline-start: ${token.marginXS}px;
    display: inline-block;
    vertical-align: inherit;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  `,
  bugReasonTitle: css`
    padding: ${token.paddingXXS}px ${token.paddingXS}px;
  `,
  bugReasonList: css`
    width: 100%;
    max-width: 100%;
    li {
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      a {
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
      }
    }
  `,
}));

export interface ComponentChangelogProps {
  pathname: string;
}

const locales = {
  cn: {
    full: '完整更新日志',
    changelog: '更新日志',
    loading: '加载中...',
    empty: '暂无更新',
    bugList: 'Bug 版本',
  },
  en: {
    full: 'Full Changelog',
    changelog: 'Changelog',
    loading: 'loading...',
    empty: 'Nothing update',
    bugList: 'Bug Versions',
  },
};

const ParseChangelog: React.FC<{ changelog: string; refs: string[]; styles: any }> = (props) => {
  const { changelog = '', refs = [], styles } = props;

  const parsedChangelog = React.useMemo(() => {
    const nodes: React.ReactNode[] = [];

    let isQuota = false;
    let lastStr = '';

    for (let i = 0; i < changelog.length; i += 1) {
      const char = changelog[i];

      if (char !== '`') {
        lastStr += char;
      } else {
        let node: React.ReactNode = lastStr;
        if (isQuota) {
          node = <code>{node}</code>;
        }

        nodes.push(node);
        lastStr = '';
        isQuota = !isQuota;
      }
    }

    nodes.push(lastStr);

    return nodes;
  }, [changelog]);

  return (
    <>
      {/* Changelog */}
      <span>{parsedChangelog}</span>
      {/* Refs */}
      {refs?.map((ref) => (
        <a className={styles.ref} key={ref} href={ref} target="_blank" rel="noreferrer">
          #{ref.match(/^.*\/(\d+)$/)?.[1]}
        </a>
      ))}
    </>
  );
};

interface ChangelogInfo {
  version: string;
  changelog: string;
  refs: string[];
}

const useChangelog = (componentPath: string, lang: 'cn' | 'en'): ChangelogInfo[] => {
  const data = useFetch({
    key: `component-changelog-${lang}`,
    request: () => import(`../../../preset/components-changelog-${lang}.json`),
  });
  return React.useMemo(() => {
    const component = componentPath.replace(/-/g, '');
    const componentName = Object.keys(data).find(
      (name) => name.toLowerCase() === component.toLowerCase(),
    );
    return data[componentName as keyof typeof data] as ChangelogInfo[];
  }, [data, componentPath]);
};

const ComponentChangelog: React.FC<ComponentChangelogProps> = (props) => {
  const { pathname = '' } = props;
  const [locale, lang] = useLocale(locales);
  const [show, setShow] = React.useState(false);

  const { styles } = useStyle();

  const componentPath = pathname.match(/\/components\/([^/]+)/)?.[1] || '';

  const list = useChangelog(componentPath, lang);

  const timelineItems = React.useMemo<TimelineItemProps[]>(() => {
    const changelogMap: Record<string, ChangelogInfo[]> = {};

    list?.forEach((info) => {
      changelogMap[info.version] = changelogMap[info.version] || [];
      changelogMap[info.version].push(info);
    });

    return Object.keys(changelogMap).map((version) => {
      const changelogList = changelogMap[version];
      const bugVersionInfo = matchDeprecated(version);
      return {
        children: (
          <Typography>
            <Typography.Title level={4}>
              {version}
              {bugVersionInfo.match && (
                <Popover
                  destroyTooltipOnHide
                  placement="right"
                  title={<span className={styles.bugReasonTitle}>{locale.bugList}</span>}
                  content={
                    <ul className={styles.bugReasonList}>
                      {bugVersionInfo.reason.map<React.ReactNode>((reason, index) => (
                        <li key={`reason-${index}`}>
                          <a type="link" target="_blank" rel="noreferrer" href={reason}>
                            <BugOutlined />
                            {reason
                              ?.replace(/#.*$/, '')
                              ?.replace(
                                /^https:\/\/github\.com\/ant-design\/ant-design\/(issues|pull)\//,
                                '#',
                              )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  }
                >
                  <BugOutlined className={styles.bug} />
                </Popover>
              )}
            </Typography.Title>
            <ul>
              {changelogList.map<React.ReactNode>((info, index) => (
                <li key={index} className={styles.li}>
                  <ParseChangelog {...info} styles={styles} />
                </li>
              ))}
            </ul>
          </Typography>
        ),
      };
    });
  }, [list]);

  const screens = Grid.useBreakpoint();
  const width = screens.md ? '48vw' : '90vw';

  if (!list || !list.length) {
    return null;
  }

  return (
    <>
      <Button
        className={styles.history}
        icon={<HistoryOutlined />}
        onClick={() => {
          setShow(true);
        }}
      >
        {locale.changelog}
      </Button>
      <Drawer
        title={locale.changelog}
        extra={
          <Link style={{ fontSize: 14 }} to={`/changelog${lang === 'cn' ? '-cn' : ''}`}>
            {locale.full}
          </Link>
        }
        open={show}
        width={width}
        onClose={() => {
          setShow(false);
        }}
        destroyOnClose
      >
        <Timeline items={timelineItems} />
      </Drawer>
    </>
  );
};

export default ComponentChangelog;
