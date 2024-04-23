import React from 'react';
import { EditOutlined, GithubOutlined } from '@ant-design/icons';
import type { GetProp } from 'antd';
import { Descriptions, theme, Tooltip, Typography } from 'antd';
import { createStyles, css } from 'antd-style';
import kebabCase from 'lodash/kebabCase';
import CopyToClipboard from 'react-copy-to-clipboard';

import useLocale from '../../../hooks/useLocale';

const locales = {
  cn: {
    import: '使用',
    copy: '复制',
    copied: '已复制',
    source: '源码',
    docs: '文档',
    edit: '编辑此页',
    version: '版本',
  },
  en: {
    import: 'Import',
    copy: 'Copy',
    copied: 'Copied',
    source: 'Source',
    docs: 'Docs',
    edit: 'Edit this page',
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
    padding-inline: ${token.paddingXXS}px;
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

  // ======================== Render ========================
  const importList = [
    <span key="import" className={styles.import}>
      import
    </span>,
    <span key="component" className={styles.component}>{`{ ${component} }`}</span>,
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
      labelStyle={{ paddingInlineEnd: token.padding, width: 54 }}
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
                <GithubOutlined style={{ marginInlineEnd: 4 }} />
                <span>{abbrSource}</span>
              </Typography.Link>
            ),
          },
          filename && {
            label: locale.docs,
            children: (
              <Typography.Link
                className={styles.code}
                href={`${branchUrl}${filename}`}
                target="_blank"
              >
                <EditOutlined style={{ marginInlineEnd: 4 }} />
                <span>{locale.edit}</span>
              </Typography.Link>
            ),
          },
          isVersionNumber(version) && {
            label: locale.version,
            children: (
              <Typography.Text className={styles.code}>
                {isZhCN ? `自 ${version} 后支持` : `supported since ${version}`}
              </Typography.Text>
            ),
          },
        ].filter(Boolean) as GetProp<typeof Descriptions, 'items'>
      }
    />
  );
};

export default ComponentMeta;
