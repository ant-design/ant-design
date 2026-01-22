import React from 'react';
import {
  BugOutlined,
  CompassOutlined,
  EditOutlined,
  FileTextOutlined,
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { GetProp } from 'antd';
import { Descriptions, Flex, theme, Tooltip, Typography } from 'antd';
import { createStyles, css } from 'antd-style';
import copy from 'antd/es/_util/copy';
import kebabCase from 'lodash/kebabCase';

import useIssueCount from '../../../hooks/useIssueCount';
import useLocale from '../../../hooks/useLocale';
import ComponentChangelog from '../../common/ComponentChangelog';
import Link from '../../common/Link';

const locales = {
  cn: {
    import: '使用',
    copy: '复制',
    copied: '已复制',
    source: '反馈',
    docs: '文档',
    edit: '编辑此页',
    changelog: '更新日志',
    design: '设计指南',
    version: '版本',
    issueNew: '提交问题',
    issueOpen: '待解决',
    copyError: '复制失败',
  },
  en: {
    import: 'Import',
    copy: 'Copy',
    copied: 'Copied',
    source: 'GitHub',
    docs: 'Docs',
    edit: 'Edit this page',
    changelog: 'Changelog',
    design: 'Design',
    version: 'Version',
    issueNew: 'Issue',
    issueOpen: 'Open issues',
    copyError: 'Copy failed',
  },
};

const branchUrl = (repo: string) => `https://github.com/${repo}/edit/master/`;

function isVersionNumber(value?: string) {
  return value && /^\d+\.\d+\.\d+$/.test(value);
}

const transformComponentName = (componentName: string) => {
  if (componentName === 'Notification' || componentName === 'Message') {
    return componentName.toLowerCase();
  }
  return componentName;
};

const useStyle = createStyles(({ cssVar, token }) => ({
  code: css`
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    column-gap: ${cssVar.paddingXXS};
    border-radius: ${cssVar.borderRadiusSM};
    padding-inline: ${cssVar.paddingXXS} !important;
    transition: all ${cssVar.motionDurationSlow} !important;
    font-family: ${token.codeFamily};
    color: ${cssVar.colorTextSecondary} !important;
    &:hover {
      background: ${cssVar.controlItemBgHover};
    }
    a&:hover {
      text-decoration: underline !important;
    }
  `,
  icon: css`
    margin-inline-end: 4px;
  `,
}));

export interface ComponentMetaProps {
  component: string;
  source: string | true;
  filename?: string;
  version?: string;
  designUrl?: string;
  searchTitleKeywords?: string[];
  repo: string;
}

const ComponentMeta: React.FC<ComponentMetaProps> = (props) => {
  const { component, source, filename, version, designUrl, searchTitleKeywords, repo } = props;
  const { token } = theme.useToken();
  const [locale, lang] = useLocale(locales);
  const isZhCN = lang === 'cn';
  const { styles } = useStyle();

  // ======================= Issues Count =======================
  const { issueCount, issueCountLoading, issueNewUrl, issueSearchUrl } = useIssueCount({
    repo,
    titleKeywords: searchTitleKeywords,
  });

  // ========================= Copy =========================
  const [copied, setCopied] = React.useState(false);

  const importCode =
    component === 'Icon'
      ? `import { AntDesignOutlined } from '@ant-design/icons';`
      : `import { ${transformComponentName(component)} } from 'antd';`;

  const onCopy = async () => {
    await copy(importCode);
    setCopied(true);
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setCopied(false);
    }
  };

  // ======================== Source ========================
  const [filledSource, abbrSource, llmsPath] = React.useMemo(() => {
    if (String(source) === 'true') {
      const kebabComponent = kebabCase(component);
      return [
        `https://github.com/${repo}/blob/master/components/${kebabComponent}`,
        `components/${kebabComponent}`,
        `/components/${kebabComponent}${isZhCN ? '-cn' : ''}.md`,
      ];
    }

    if (typeof source !== 'string') {
      return [null, null, null];
    }

    return [source, source, null];
  }, [component, repo, source, isZhCN]);

  return (
    <Descriptions
      size="small"
      colon={false}
      column={1}
      style={{ marginTop: token.margin }}
      styles={{ label: { paddingInlineEnd: token.padding, width: 56 } }}
      items={
        [
          {
            label: locale.import,
            children: (
              <Tooltip
                placement="right"
                title={copied ? locale.copied : locale.copy}
                onOpenChange={onOpenChange}
              >
                <Typography.Text
                  className={styles.code}
                  style={{ cursor: 'pointer' }}
                  onClick={onCopy}
                >
                  {importCode}
                </Typography.Text>
              </Tooltip>
            ),
          },
          filledSource && {
            label: locale.source,
            children: (
              <Flex justify="flex-start" align="center" gap="small">
                <Typography.Link className={styles.code} href={filledSource} target="_blank">
                  <GithubOutlined className={styles.icon} />
                  <span>{abbrSource}</span>
                </Typography.Link>
                <Typography.Link className={styles.code} href={issueNewUrl} target="_blank">
                  <BugOutlined className={styles.icon} />
                  <span>{locale.issueNew}</span>
                </Typography.Link>
                <Typography.Link className={styles.code} href={issueSearchUrl} target="_blank">
                  <IssuesCloseOutlined className={styles.icon} />
                  <span>
                    {locale.issueOpen} {issueCountLoading ? <LoadingOutlined /> : issueCount}
                  </span>
                </Typography.Link>
              </Flex>
            ),
          },
          filename && {
            label: locale.docs,
            children: (
              <Flex justify="flex-start" align="center" gap="small">
                <Typography.Link
                  className={styles.code}
                  href={`${branchUrl(repo)}${filename}`}
                  target="_blank"
                >
                  <EditOutlined className={styles.icon} />
                  <span>{locale.edit}</span>
                </Typography.Link>
                {designUrl && (
                  <Link className={styles.code} to={designUrl}>
                    <CompassOutlined className={styles.icon} />
                    <span>{locale.design}</span>
                  </Link>
                )}
                <Typography.Link
                  className={styles.code}
                  href={llmsPath || ''}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileTextOutlined className={styles.icon} />
                  <span>LLMs.md</span>
                </Typography.Link>
                <ComponentChangelog>
                  <Typography.Link className={styles.code}>
                    <HistoryOutlined className={styles.icon} />
                    <span>{locale.changelog}</span>
                  </Typography.Link>
                </ComponentChangelog>
              </Flex>
            ),
          },
          isVersionNumber(version) && {
            label: locale.version,
            children: (
              <Typography.Text className={styles.code}>
                {isZhCN ? `自 ${version} 起支持` : `supported since ${version}`}
              </Typography.Text>
            ),
          },
        ].filter(Boolean) as GetProp<typeof Descriptions, 'items'>
      }
    />
  );
};

export default ComponentMeta;
