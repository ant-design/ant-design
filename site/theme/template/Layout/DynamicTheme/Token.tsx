/* eslint-disable react/no-array-index-key */
import type { TableProps } from 'antd';
import { Alert, Col, Row, Select, Space, Table, useDesignToken } from 'antd';
import * as React from 'react';
import { statistic } from '../../../../../components/theme';

const wrapValue = (value: any) => {
  const string = String(value);

  let additionalInfo: React.ReactNode;

  if (string.startsWith('#') || string.startsWith('rgba(')) {
    additionalInfo = (
      <span
        style={{
          display: 'inline-block',
          width: '1em',
          height: '1em',
          background: string,
          boxShadow: '0 0 2px rgba(50,50,50,0.5)',
        }}
      />
    );
  }

  return additionalInfo ? (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
      {additionalInfo}
      {string}
    </div>
  ) : (
    string
  );
};

const columns: TableProps<{ name: string; value: any }>['columns'] = [
  {
    dataIndex: 'name',
    title: 'Name',
    width: 1,
  },
  {
    dataIndex: 'value',
    title: 'Value',
    render: (value: string) => {
      let content: React.ReactNode = value;

      switch (typeof value) {
        case 'object': {
          if (Array.isArray(value)) {
            content = (
              <ul style={{ margin: 0 }}>
                {(value as string[]).map((val, index) => (
                  <li key={index}>
                    <Space size="large">
                      <span style={{ userSelect: 'none' }}>[{index}]</span>
                      {wrapValue(val)}
                    </Space>
                  </li>
                ))}
              </ul>
            );
            break;
          }
        }

        // eslint-disable-next-line no-fallthrough
        default:
          content = wrapValue(value);
      }

      return <span style={{ wordBreak: 'break-word' }}>{content}</span>;
    },
  },
];

export interface TokenProps {
  tokenList: string[];
}

export default () => {
  const [selectedComponent, setSelectedComponent] = React.useState<string>();
  const [componentNames, setComponentNames] = React.useState<{ value: string; label: string }[]>(
    [],
  );

  // Full token
  const { token } = useDesignToken();
  const tokenList = React.useMemo(
    () =>
      Object.keys(token)
        .filter(name => !name.startsWith('_'))
        .map((name: keyof typeof token) => ({
          name,
          value: token[name],
        })),
    [token],
  );

  React.useEffect(() => {
    function update() {
      setComponentNames(Object.keys(statistic).map(key => ({ value: key, label: key })));
    }
    const observer = new MutationObserver(update);
    observer.observe(document.head, { childList: true });

    update();

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredTokenList = React.useMemo(() => {
    const tokenKeys = statistic[selectedComponent!]?.global || [];

    if (!tokenKeys.length) {
      return tokenList;
    }

    return tokenList.filter(({ name }) => tokenKeys.includes(name));
  }, [tokenList, selectedComponent]);

  const componentTokenList = React.useMemo(
    () =>
      Object.entries(statistic[selectedComponent!]?.component || {}).map(([key, value]) => ({
        name: key,
        value,
      })),
    [selectedComponent],
  );

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Select
          style={{ width: '100%' }}
          value={selectedComponent}
          options={componentNames}
          onChange={setSelectedComponent}
          allowClear
        />
      </Col>
      {filteredTokenList.length === tokenList.length && (
        <Col span={24}>
          <Alert
            type="error"
            message="Tokens here maybe a mistake because all tokens are listed. Please check if you are using deconstruction in this component."
          />
        </Col>
      )}
      {componentTokenList.length > 0 && (
        <Col span={24}>
          <h3 style={{ paddingBottom: 4 }}>Component Token</h3>
          <Table
            dataSource={componentTokenList}
            columns={columns}
            rowKey="name"
            bordered
            size="small"
            pagination={false}
          />
        </Col>
      )}
      <Col span={24}>
        <h3 style={{ paddingBottom: 4 }}>Global Token</h3>
        <Table
          dataSource={filteredTokenList}
          columns={columns}
          rowKey="name"
          bordered
          size="small"
          pagination={false}
        />
      </Col>
    </Row>
  );
};
