/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/github.css';
import { Drawer, Typography, Alert, Space, Tabs, ConfigProvider, Table, TableProps } from 'antd';
import getValidateStatus, { STATUS, PASS } from './validateCheck';

hljs.registerLanguage('css', css);

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

export interface PreviewProps {
  visible: boolean;
  componentName: string;
  onClose: () => void;
}

export default function Preview({ visible, onClose }: PreviewProps) {
  const [styleList, setStyleList] = React.useState<string[]>([]);

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
    const observer = new MutationObserver(() => {
      const latestStyles = Array.from(document.querySelectorAll('style[data-css-hash]'))
        .map(style => style?.innerHTML || '')
        // Break lines
        .map(style => style.replace(/{/g, ' {\n'))
        .map(style => style.replace(/}/g, '}\n'))
        .map(style => style.replace(/;/g, ';\n'))
        // Line convert
        .map(style => {
          const lines = style.split(/[\n\r]+/);
          let leftParenthesis = false;

          return lines
            .map(line => {
              if (line.includes('}')) {
                leftParenthesis = false;
              }

              if (leftParenthesis) {
                line = `  ${line.replace(/:/g, ': ')}`;
              }

              if (line.includes('{')) {
                leftParenthesis = true;
              }

              // More lines for }
              line = line.replace('}', '}\n');

              return line;
            })
            .join('\n');
        })
        // Format
        .filter(txt => txt);

      setStyleList(latestStyles);
    });
    observer.observe(document.head, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, [visible]);

  const formatStyles = React.useMemo(
    () =>
      styleList.map(style => {
        const lines = style
          .split(/[\n\r]+/)
          .map(line => (line.includes('{') ? line.replace(/,/g, ',\n') : line))
          .join('\n');
        return hljs.highlight(lines, { language: 'css' }).value;
      }),
    [styleList],
  );

  const invalidateStyles = React.useMemo(() => {
    type Item = { status: STATUS; line: string; source?: string };
    const list: Item[] = [];

    styleList.forEach(style => {
      const lines = style.split(/[\n\r]+/);

      lines.forEach((line, index) => {
        const status = getValidateStatus(line);
        if (status !== PASS) {
          const item: Item = {
            status,
            line,
          };

          if (!line.includes('{')) {
            for (let i = index - 1; i >= 0; i -= 1) {
              const prevLine = lines[i];
              if (prevLine.includes('{')) {
                item.source = prevLine;
                break;
              }
            }
          }

          list.push(item);
        }
      });
    });

    return list.sort((a, b) => {
      if (a.status === 'error') {
        return -1;
      }
      if (b.status === 'error') {
        return 1;
      }

      return 0;
    });
  }, [styleList]);

  return (
    <Drawer
      title="cssinjs"
      placement="left"
      visible={visible}
      mask={false}
      width="45vw"
      onClose={onClose}
    >
      <Tabs>
        <Tabs.TabPane tab="Style" key="style">
          <Typography>
            {formatStyles.map((style, index) => (
              <pre key={index} dangerouslySetInnerHTML={{ __html: style }} />
            ))}
          </Typography>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Token" key="token">
          <Table
            dataSource={tokenList}
            columns={columns}
            rowKey="name"
            bordered
            size="small"
            pagination={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Analysis" key="analysis">
          <Space style={{ width: '100%' }} direction="vertical">
            {invalidateStyles.map(({ status, line, source }, index) => (
              <Alert
                key={index}
                message={
                  <Space style={{ width: '100%' }} direction="vertical">
                    {source}
                    {line}
                  </Space>
                }
                type={status as any}
              />
            ))}
          </Space>
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
}
