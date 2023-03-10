/* eslint import/no-unresolved: 0 */
import { ConfigProvider, Table } from 'antd';
import { getDesignToken } from 'antd-token-previewer';
import tokenMeta from 'antd/es/version/token-meta.json';
import tokenData from 'antd/es/version/token.json';
import React from 'react';
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

interface SubTokenTableProps {
  title: string;
  tokens: string[];
}

function SubTokenTable({ tokens, title }: SubTokenTableProps) {
  const [, lang] = useLocale(locales);
  const { token } = useSiteToken();
  const columns = useColumns();

  if (!tokens.length) {
    return null;
  }

  const data = tokens.map((name) => {
    const meta = tokenMeta[name];

    return {
      name,
      desc: lang === 'cn' ? meta.desc : meta.descEn,
      type: meta.type,
      value: (defaultToken as any)[name],
    };
  });

  return (
    // Reuse `.markdown` style
    <div className="markdown">
      <h3>{title}</h3>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 0,
          },
        }}
      >
        <Table
          size="middle"
          columns={columns}
          bordered
          dataSource={data}
          style={{ marginBottom: token.margin }}
        />
      </ConfigProvider>
    </div>
  );
}

export interface ComponentTokenTableProps {
  component: string;
}

function ComponentTokenTable({ component }: ComponentTokenTableProps) {
  const { global: globalTokens = [], component: componentTokens = [] } = tokenData[component] || {};

  return (
    <>
      <SubTokenTable title="Component Token" tokens={componentTokens} />
      <SubTokenTable title="Global Token" tokens={globalTokens} />
    </>
  );
}

export default React.memo(ComponentTokenTable);
