import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Descriptions, theme, Tooltip, Typography, type GetProp } from 'antd';
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
  },
  en: {
    import: 'Import',
    copy: 'Copy',
    copied: 'Copied',
    source: 'Source',
  },
};

const useStyle = createStyles(({ token }) => ({
  code: css`
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    column-gap: 4px;
    border-radius: 4px;
    padding-inline: ${token.paddingXS}px;
    transition: all ${token.motionDurationSlow} !important;
    &:hover {
      background: ${token.controlItemBgHover};
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
}

const ComponentMeta: React.FC<ComponentMetaProps> = (props) => {
  const { component, source } = props;
  const { token } = theme.useToken();
  const [locale] = useLocale(locales);

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
      labelStyle={{ paddingInlineEnd: token.padding }}
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
                <span>
                  <CopyToClipboard text={`import { ${component} } from "antd";`} onCopy={onCopy}>
                    <Typography.Text className={styles.code} onClick={onCopy}>
                      {importList}
                    </Typography.Text>
                  </CopyToClipboard>
                </span>
              </Tooltip>
            ),
          },
          filledSource && {
            label: locale.source,
            children: (
              <Typography.Link className={styles.code} href={filledSource} target="_blank">
                <GithubOutlined /> {abbrSource}
              </Typography.Link>
            ),
          },
        ].filter((v) => v) as GetProp<typeof Descriptions, 'items'>
      }
    />
  );
};

export default ComponentMeta;
