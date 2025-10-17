import React from 'react';
import {
  BugOutlined,
  CompassOutlined,
  EditOutlined,
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
} from '@ant-design/icons';
import type { GetProp } from 'antd';
import { Descriptions, Flex, theme, Tooltip, Typography } from 'antd';
import { createStyles, css } from 'antd-style';
import kebabCase from 'lodash/kebabCase';
import CopyToClipboard from 'react-copy-to-clipboard';

import useIssueCount from '../../../hooks/useIssueCount';
import useLocale from '../../../hooks/useLocale';
import ComponentChangelog from '../../common/ComponentChangelog';
import Link from '../../common/Link';

const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};

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
  },
};

const branchUrl = (repo: string) => `https://github.com/${repo}/edit/master/`;

function isVersionNumber(value?: string) {
  return value && /^\d+\.\d+\.\d+$/.test(value);
}

const useStyle = createStyles(({ token }) => ({
  code: css`
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    column-gap: ${token.paddingXXS}px;
    border-radius: ${token.borderRadiusSM}px;
    padding-inline: ${token.paddingXXS}px !important;
    transition: all ${token.motionDurationSlow} !important;
    font-family: ${token.codeFamily};
    color: ${token.colorTextSecondary} !important;
    &:hover {
      background: ${token.controlItemBgHover};
    }
    a&:hover {
      text-decoration: underline !important;
    }
  `,
  icon: css`
    margin-inline-end: 3px;
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

  const onCopy = () => {
    setCopied(true);
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setCopied(false);
    }
  };

  // ======================== Source ========================
  const [filledSource, abbrSource] = React.useMemo(() => {
    if (String(source) === 'true') {
      const kebabComponent = kebabCase(component);
      return [
        `https://github.com/${repo}/blob/master/components/${kebabComponent}`,
        `components/${kebabComponent}`,
      ];
    }

    if (typeof source !== 'string') {
      return [null, null];
    }

    return [source, source];
  }, [component, source]);

  const transformComponentName = (componentName: string) => {
    if (componentName === 'Notification' || componentName === 'Message') {
      return componentName.toLowerCase();
    }
    return componentName;
  };

  // ======================== Render ========================
  const importList = `import { ${transformComponentName(component)} } from "antd";`;

  return (
    <Descriptions
      size="small"
      colon={false}
      column={1}
      style={{ marginTop: token.margin }}
      styles={{
        label: { paddingInlineEnd: token.padding, width: 56 },
      }}
      items={
        [
          {
            label: locale.import,
            children: (
              <CopyToClipboard text={`import { ${component} } from "antd";`} onCopy={onCopy}>
                <Tooltip
                  placement="right"
                  title={copied ? locale.copied : locale.copy}
                  onOpenChange={onOpenChange}
                >
                  <Typography.Text className={styles.code} onClick={onCopy}>
                    {importList}
                  </Typography.Text>
                </Tooltip>
              </CopyToClipboard>
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
                    {locale.issueOpen}
                    {issueCountLoading ? ' -' : isNumber(issueCount) ? ` ${issueCount}` : ''}
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
