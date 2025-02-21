import React from 'react';
import { EditOutlined, GithubOutlined, HistoryOutlined } from '@ant-design/icons';
import type { GetProp } from 'antd';
import { Descriptions, Flex, theme, Tooltip, Typography } from 'antd';
import { createStyles, css } from 'antd-style';
import kebabCase from 'lodash/kebabCase';
import CopyToClipboard from 'react-copy-to-clipboard';

import useLocale from '../../../hooks/useLocale';
import ComponentChangelog from '../../common/ComponentChangelog';

const locales = {
  cn: {
    import: '使用',
    copy: '复制',
    copied: '已复制',
    source: '源码',
    docs: '文档',
    edit: '编辑此页',
    changelog: '更新日志',
    version: '版本',
  },
  en: {
    import: 'Import',
    copy: 'Copy',
    copied: 'Copied',
    source: 'Source',
    docs: 'Docs',
    edit: 'Edit this page',
    changelog: 'Changelog',
    version: 'Version',
  },
};

const branchUrl = 'https://github.com/ant-design/ant-design/edit/master/';

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
  import: css`
    color: ${token.magenta8};
  `,
  component: css`
    color: ${token.colorText};
  `,
  from: css`
    color: ${token.magenta8};
    margin-inline-end: 0.5em;
  `,
  antd: css`
    color: ${token.green8};
  `,
  semicolon: css`
    color: ${token.colorText};
  `,
  icon: css`
    margin-inline-end: ${token.marginXXS}px;
  `,
}));

export interface ComponentMetaProps {
  component: string;
  source: string | true;
  filename?: string;
  version?: string;
}

const ComponentMeta: React.FC<ComponentMetaProps> = (props) => {
  const { component, source, filename, version } = props;
  const { token } = theme.useToken();
  const [locale, lang] = useLocale(locales);
  const isZhCN = lang === 'cn';
  const { styles } = useStyle();

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
        `https://github.com/ant-design/ant-design/blob/master/components/${kebabComponent}`,
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
  const importList = [
    <span key="import" className={styles.import}>
      import
    </span>,
    <span key="component" className={styles.component}>{`{ ${transformComponentName(
      component,
    )} }`}</span>,
    <span key="from" className={styles.from}>
      from
    </span>,
    <span key="antd" className={styles.antd}>
      {`"antd"`}
    </span>,
    <span key="semicolon" className={styles.semicolon}>
      ;
    </span>,
  ];

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
              <Typography.Link className={styles.code} href={filledSource} target="_blank">
                <GithubOutlined className={styles.icon} />
                <span>{abbrSource}</span>
              </Typography.Link>
            ),
          },
          filename && {
            label: locale.docs,
            children: (
              <Flex justify="flex-start" align="center" gap="middle">
                <Typography.Link
                  className={styles.code}
                  href={`${branchUrl}${filename}`}
                  target="_blank"
                >
                  <EditOutlined className={styles.icon} />
                  <span>{locale.edit}</span>
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
