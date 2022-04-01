/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Table, Space, TableProps, ConfigProvider, Select, Row, Col } from 'antd';
import { statistic } from '../../../../../components/_util/theme/util/statistic';

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
                      {val}
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
          content = String(value);
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
  const [, token] = ConfigProvider.useToken();
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
    const tokenKeys = statistic[selectedComponent!] || [];

    if (!tokenKeys.length) {
      return tokenList;
    }

    return tokenList.filter(({ name }) => tokenKeys.includes(name));
  }, [tokenList, selectedComponent]);

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
      <Col span={24}>
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
