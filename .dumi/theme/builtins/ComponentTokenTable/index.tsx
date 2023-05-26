import { RightOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { ConfigProvider, Table } from 'antd';
import { getDesignToken } from 'antd-token-previewer';
import tokenMeta from 'antd/es/version/token-meta.json';
import tokenData from 'antd/es/version/token.json';
import React, { useMemo, useState } from 'react';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import { useColumns } from '../TokenTable';

const defaultToken = getDesignToken();

const locales = {
  cn: {
    token: 'Token 名称',
    description: '描述',
    type: '类型',
    value: '默认值',
  },
  en: {
    token: 'Token Name',
    description: 'Description',
    type: 'Type',
    value: 'Default Value',
  },
};

const useStyle = () => ({
  tableTitle: css`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 40px;
  `,
  arrowIcon: css`
    font-size: 16px;
    margin-right: 8px;
    & svg {
      transition: all 0.3s;
    }
  `,
});

interface SubTokenTableProps {
  defaultOpen?: boolean;
  title: string;
  tokens: string[];
}

const SubTokenTable: React.FC<SubTokenTableProps> = ({ defaultOpen, tokens, title }) => {
  const [, lang] = useLocale(locales);
  const { token } = useSiteToken();
  const columns = useColumns();

  const [open, setOpen] = useState<boolean>(defaultOpen || process.env.NODE_ENV !== 'production');

  const { tableTitle, arrowIcon } = useStyle();

  if (!tokens.length) {
    return null;
  }

  const data = tokens
    .sort((token1, token2) => {
      const hasColor1 = token1.toLowerCase().includes('color');
      const hasColor2 = token2.toLowerCase().includes('color');

      if (hasColor1 && !hasColor2) {
        return -1;
      }

      if (!hasColor1 && hasColor2) {
        return 1;
      }

      return token1 < token2 ? -1 : 1;
    })
    .map((name) => {
      const meta = tokenMeta[name];

      if (!meta) {
        return null;
      }

      return {
        name,
        desc: lang === 'cn' ? meta.desc : meta.descEn,
        type: meta.type,
        value: defaultToken[name],
      };
    })
    .filter(Boolean);

  return (
    <div>
      <div css={tableTitle} onClick={() => setOpen(!open)}>
        <RightOutlined css={arrowIcon} rotate={open ? 90 : 0} />
        <h3>{title}</h3>
      </div>
      {open && (
        <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
          <Table
            size="middle"
            columns={columns}
            bordered
            dataSource={data}
            style={{ marginBottom: token.margin }}
            pagination={false}
            rowKey={(record) => record.name}
          />
        </ConfigProvider>
      )}
    </div>
  );
};

export interface ComponentTokenTableProps {
  component: string;
}

const ComponentTokenTable: React.FC<ComponentTokenTableProps> = ({ component }) => {
  const [mergedGlobalTokens] = useMemo(() => {
    const globalTokenSet = new Set<string>();
    let componentTokens: Record<string, string> = {};

    component.split(',').forEach((comp) => {
      const { global: globalTokens = [], component: singleComponentTokens = [] } =
        tokenData[comp] || {};

      globalTokens.forEach((token: string) => {
        globalTokenSet.add(token);
      });

      componentTokens = {
        ...componentTokens,
        ...singleComponentTokens,
      };
    });

    return [Array.from(globalTokenSet), componentTokens] as const;
  }, [component]);

  return <SubTokenTable title="Global Token" tokens={mergedGlobalTokens} />;
};

export default React.memo(ComponentTokenTable);
