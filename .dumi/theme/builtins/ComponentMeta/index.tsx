import React from 'react';
import {
  BugOutlined,
  CompassOutlined,
  EditOutlined,
  ExportOutlined,
  FileTextOutlined,
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
  LinkOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { GetProp } from 'antd';
import { Descriptions, Dropdown, Flex, theme, Tooltip, Typography } from 'antd';
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
    open: '打开',
    openInNewTab: '在新标签页中打开',
    openInChatGPT: '在 ChatGPT 中打开',
    openInClaude: '在 Claude 中打开',
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
    open: 'Open',
    openInNewTab: 'Open in New Tab',
    openInChatGPT: 'Open in ChatGPT',
    openInClaude: 'Open in Claude',
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
  menuIcon: css`
    margin-inline-end: 4px;
    width: 14px;
    height: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 16px;
    svg {
      width: 14px;
      height: 14px;
      display: block;
    }
  `,
  menuLabel: css`
    display: flex;
    align-items: center;
    column-gap: 6px;
    width: 100%;
  `,
  menuLabelRightIcon: css`
    margin-inline-start: auto;
    display: inline-flex;
    align-items: center;
    padding-inline-start: 8px;
  `,
}));

const ChatGptLogoIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>OpenAI</title>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

const ClaudeLogoIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Anthropic</title>
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
);

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

  const llmsViewUrls = React.useMemo(() => {
    if (!llmsPath) return null;
    if (typeof window === 'undefined') return null;
    const llmsUrl = new URL(llmsPath, window.location.origin).toString();
    if (!llmsUrl) return null;
    const query = `Read ${llmsUrl}, I want to ask questions about it.`;
    return {
      markdownUrl: llmsUrl,
      chatgptUrl: `https://chatgpt.com/?${new URLSearchParams({
        hints: 'search',
        q: query,
      }).toString()}`,
      claudeUrl: `https://claude.ai/new?${new URLSearchParams({
        q: query,
      }).toString()}`,
    };
  }, [llmsPath]);

  const llmsMenuItemsConfig = [
    {
      itemKey: 'llms-open-in-new-tab',
      icon: (
        <span className={styles.menuIcon}>
          <LinkOutlined />
        </span>
      ),
      label: locale.openInNewTab,
      url: llmsViewUrls?.markdownUrl,
    },
    {
      itemKey: 'llms-open-in-chatgpt',
      icon: (
        <span className={styles.menuIcon}>
          <ChatGptLogoIcon />
        </span>
      ),
      label: locale.openInChatGPT,
      url: llmsViewUrls?.chatgptUrl,
    },
    {
      itemKey: 'llms-open-in-claude',
      icon: (
        <span className={styles.menuIcon}>
          <ClaudeLogoIcon />
        </span>
      ),
      label: locale.openInClaude,
      url: llmsViewUrls?.claudeUrl,
    },
  ];

  const renderLlmsMenuItemLabel = (label: string, url?: string) => {
    const content = (
      <span className={styles.menuLabel}>
        {label}
        <span className={styles.menuLabelRightIcon}>
          <ExportOutlined />
        </span>
      </span>
    );

    if (!url) {
      return content;
    }

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  };

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
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: llmsMenuItemsConfig.map(({ itemKey, icon, label, url }) => ({
                      key: itemKey,
                      icon,
                      label: renderLlmsMenuItemLabel(label, url),
                      disabled: !url,
                    })),
                  }}
                >
                  <Typography.Link
                    className={styles.code}
                    onClick={(event) => event.preventDefault()}
                  >
                    <FileTextOutlined className={styles.icon} />
                    <span>LLMs.md</span>
                  </Typography.Link>
                </Dropdown>
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
