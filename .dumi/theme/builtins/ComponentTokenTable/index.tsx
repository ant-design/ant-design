import { css } from '@emotion/react';
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

const useStyle = (open: boolean) => ({
  tableTitle: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 40px;
  `,
  arrowIcon: css`
    position: relative;
    width: 10px;
    height: 0;
    margin-right: 12px;
    &:before,
    &:after {
      position: absolute;
      display: block;
      width: 6px;
      height: 1.5px;
      background-color: currentcolor;
      border-radius: 6px;
      transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      content: '';
    }
  `,
  toogleIcon: open
    ? css`
        &:before {
          transform: rotate(-45deg) translateX(2.5px);
        }
        &:after {
          transform: rotate(45deg) translateX(-2.5px);
        }
      `
    : css`
        &:before {
          transform: rotate(45deg) translateX(2.5px);
        }
        &:after {
          transform: rotate(-45deg) translateX(-2.5px);
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

  const [open, setOpen] = React.useState(defaultOpen || process.env.NODE_ENV !== 'production');

  const { tableTitle, arrowIcon, toogleIcon } = useStyle(open);

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
        <i css={[arrowIcon, toogleIcon]} />
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
  const [mergedGlobalTokens] = React.useMemo(() => {
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

    return [Array.from(globalTokenSet), componentTokens];
  }, [component]);

  return <SubTokenTable title="Global Token" tokens={mergedGlobalTokens} />;
};

export default React.memo(ComponentTokenTable);
