import React, { cloneElement, isValidElement } from 'react';
import { BugOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Grid, Popover, Tag, Timeline, Typography } from 'antd';
import type { TimelineItemProps } from 'antd';
import { createStyles } from 'antd-style';
import semver from 'semver';

import deprecatedVersions from '../../../../BUG_VERSIONS.json';
import useFetch from '../../../hooks/useFetch';
import useLocale from '../../../hooks/useLocale';
import useLocation from '../../../hooks/useLocation';
import Link from '../Link';

interface MatchDeprecatedResult {
  match?: string;
  reason: string[];
}

interface ChangelogInfo {
  version: string;
  changelog: string;
  refs: string[];
  contributors: string[];
  releaseDate: string;
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
  listWrap: css`
    > li {
      line-height: 2;
    }
  `,
  linkRef: css`
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
  extraLink: css`
    font-size: ${token.fontSize}px;
  `,
  drawerContent: {
    position: 'relative',
    [`> ${token.antCls}-drawer-body`]: {
      scrollbarWidth: 'thin',
      scrollbarGutter: 'stable',
    },
  },
  versionWrap: css`
    margin-bottom: 1em;
  `,
  versionTitle: css`
    height: 28px;
    line-height: 28px;
    font-weight: 600;
    font-size: 20px;
    margin: 0 !important;
  `,
  versionTag: css`
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      margin-inline-end: 0;
    }
  `,
}));

const locales = {
  cn: {
    full: '查看完整日志',
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

const ParseChangelog: React.FC<{ changelog: string }> = (props) => {
  const { changelog = '' } = props;

  const parsedChangelog = React.useMemo(() => {
    const nodes: React.ReactNode[] = [];

    let isQuota = false;
    let isBold = false;
    let lastStr = '';

    for (let i = 0; i < changelog.length; i += 1) {
      const char = changelog[i];
      const isDoubleAsterisk = char === '*' && changelog[i + 1] === '*';

      if (char !== '`' && !isDoubleAsterisk) {
        lastStr += char;
      } else {
        let node: React.ReactNode = lastStr;
        if (isQuota) {
          node = <code key={`code-${i}`}>{node}</code>;
        } else if (isBold) {
          node = <strong key={`strong-${i}`}>{node}</strong>;
        }

        nodes.push(node);
        lastStr = '';
        if (char === '`') {
          isQuota = !isQuota;
        } else if (isDoubleAsterisk) {
          isBold = !isBold;
          i += 1; // Skip the next '*'
        }
      }
    }

    nodes.push(lastStr);

    return nodes;
  }, [changelog]);

  return <span>{parsedChangelog}</span>;
};

const RefLinks: React.FC<{ refs: string[]; contributors: string[] }> = ({ refs, contributors }) => {
  const { styles } = useStyle();

  return (
    <>
      {refs?.map((ref) => (
        <React.Fragment key={ref}>
          <a className={styles.linkRef} key={ref} href={ref} target="_blank" rel="noreferrer">
            #{ref.match(/[^/]+$/)?.[0]}
          </a>
        </React.Fragment>
      ))}
      {contributors?.map((contributor) => (
        <React.Fragment key={contributor}>
          <a
            className={styles.linkRef}
            key={contributor}
            href={`https://github.com/${contributor}`}
            target="_blank"
            rel="noreferrer"
          >
            @{contributor}
          </a>
        </React.Fragment>
      ))}
    </>
  );
};

const RenderChangelogList: React.FC<{ changelogList: ChangelogInfo[] }> = ({ changelogList }) => {
  const elements: React.ReactNode[] = [];
  const { styles } = useStyle();
  const len = changelogList.length;
  for (let i = 0; i < len; i += 1) {
    const { refs, changelog, contributors } = changelogList[i];
    // Check if the next line is an image link and append it to the current line
    if (i + 1 < len && changelogList[i + 1].changelog.trim().startsWith('<img')) {
      const imgDom = new DOMParser().parseFromString(changelogList[i + 1].changelog, 'text/html');
      const imgElement = imgDom.querySelector<HTMLImageElement>('img');
      elements.push(
        <li key={i}>
          <ParseChangelog changelog={changelog} />
          <RefLinks refs={refs} contributors={contributors} />
          <br />
          <img
            src={imgElement?.getAttribute('src') || ''}
            alt={imgElement?.getAttribute('alt') || ''}
            width={imgElement?.getAttribute('width') || ''}
          />
        </li>,
      );
      i += 1; // Skip the next line
    } else {
      elements.push(
        <li key={i}>
          <ParseChangelog changelog={changelog} />
          <RefLinks refs={refs} contributors={contributors} />
        </li>,
      );
    }
  }
  return <ul className={styles.listWrap}>{elements}</ul>;
};

const useChangelog = (componentPath: string, lang: 'cn' | 'en'): ChangelogInfo[] => {
  const logFileName = `components-changelog-${lang}.json`;

  const data = useFetch({
    key: `component-changelog-${lang}`,
    request: () => import(`../../../preset/${logFileName}`),
  });
  return React.useMemo(() => {
    const component = componentPath.replace(/-/g, '');
    const componentName = Object.keys(data).find(
      (name) => name.toLowerCase() === component.toLowerCase(),
    );
    return data[componentName as keyof typeof data] as ChangelogInfo[];
  }, [data, componentPath]);
};

const ComponentChangelog: React.FC<Readonly<React.PropsWithChildren>> = (props) => {
  const { children } = props;
  const [locale, lang] = useLocale(locales);
  const [show, setShow] = React.useState(false);
  const { pathname } = useLocation();

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
            <Flex className={styles.versionWrap} justify="flex-start" align="center" gap="middle">
              <Button
                color="default"
                className={styles.versionTitle}
                variant="link"
                href={`/changelog${lang === 'cn' ? '-cn' : ''}/#${version.replace(/\./g, '').replace(/\s.*/g, '-')}`}
              >
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
              </Button>
              <Tag className={styles.versionTag} bordered={false} color="blue">
                {changelogList[0]?.releaseDate}
              </Tag>
            </Flex>
            <RenderChangelogList changelogList={changelogList} />
          </Typography>
        ),
      };
    });
  }, [list]);

  const screens = Grid.useBreakpoint();
  const width = screens.md ? '48vw' : '90vw';

  if (!pathname.startsWith('/components/') || !list || !list.length) {
    return null;
  }

  return (
    <>
      {isValidElement(children) &&
        cloneElement(children as React.ReactElement<any>, {
          onClick: () => setShow(true),
        })}
      <Drawer
        destroyOnClose
        className={styles.drawerContent}
        title={locale.changelog}
        extra={
          <Link className={styles.extraLink} to={`/changelog${lang === 'cn' ? '-cn' : ''}`}>
            {locale.full}
          </Link>
        }
        open={show}
        width={width}
        onClose={() => setShow(false)}
      >
        <Timeline items={timelineItems} />
      </Drawer>
    </>
  );
};

export default ComponentChangelog;
