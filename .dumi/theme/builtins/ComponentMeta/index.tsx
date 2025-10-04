import React from 'react';
import { CompassOutlined, EditOutlined, GithubOutlined, HistoryOutlined } from '@ant-design/icons';
import type { GetProp } from 'antd';
import { Descriptions, Flex, theme, Tooltip, Typography } from 'antd';
import { createStyles, css } from 'antd-style';
import copy from 'antd/es/_util/copy';
import kebabCase from 'lodash/kebabCase';

import useLocale from '../../../hooks/useLocale';
import ComponentChangelog from '../../common/ComponentChangelog';
import Link from '../../common/Link';

const locales = {
  cn: {
    import: '使用',
    copy: '复制',
    copied: '已复制',
    source: '源码',
    docs: '文档',
    edit: '编辑此页',
    changelog: '更新日志',
    design: '设计指南',
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
    design: 'Design',
    version: 'Version',
  },
};

const branchUrl = 'https://github.com/ant-design/ant-design/edit/master/';

function isVersionNumber(value?: string) {
  return value && /^\d+\.\d+\.\d+$/.test(value);
}

const useStyle = createStyles(({ cssVar }) => ({
  code: css`
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    column-gap: ${cssVar.paddingXXS};
    border-radius: ${cssVar.borderRadiusSM};
    padding-inline: ${cssVar.paddingXXS} !important;
    transition: all ${cssVar.motionDurationSlow} !important;
    font-family: ${cssVar.codeFamily};
    color: ${cssVar.colorTextSecondary} !important;
    &:hover {
      background: ${cssVar.controlItemBgHover};
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
}

const ComponentMeta: React.FC<ComponentMetaProps> = (props) => {
  const { component, source, filename, version, designUrl } = props;
  const { token } = theme.useToken();
  const [locale, lang] = useLocale(locales);
  const isZhCN = lang === 'cn';
  const { styles } = useStyle();

  // ========================= Copy =========================
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    await copy(`import { ${component} } from "antd";`);
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
                  {importList}
                </Typography.Text>
              </Tooltip>
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
              <Flex justify="flex-start" align="center" gap="small">
                <Typography.Link
                  className={styles.code}
                  href={`${branchUrl}${filename}`}
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
