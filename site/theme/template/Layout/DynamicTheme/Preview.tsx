/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/github.css';
import { Drawer, Typography, Alert, Space, Tabs } from 'antd';
import getValidateStatus, { STATUS, PASS } from './validateCheck';
import Token from './Token';

hljs.registerLanguage('css', css);

export interface PreviewProps {
  visible: boolean;
  componentName: string;
  onClose: () => void;
}

function formatStyle(style: string) {
  let formatted = style;

  // Break lines
  formatted = formatted.replace(/{/g, ' {\n').replace(/}/g, '}\n').replace(/;/g, ';\n');

  // Line convert
  {
    const lines = formatted.split(/[\n\r]+/);
    let leftParenthesis = false;

    formatted = lines
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
  }

  return formatted;
}

export default function Preview({ visible, onClose }: PreviewProps) {
  const [styleList, setStyleList] = React.useState<{ text: string; path: string }[]>([]);

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const latestStyles = Array.from(document.querySelectorAll('style[data-css-hash]'))
        .filter(style => style)
        .map(style => ({
          text: formatStyle(style.innerHTML),
          path: style.getAttribute('data-dev-cache-path')!,
        }))
        .filter(style => style.text);

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
        const lines = style.text
          .split(/[\n\r]+/)
          .map(line => (line.includes('{') ? line.replace(/,/g, ',\n') : line))
          .join('\n');
        return {
          ...style,
          text: hljs.highlight(lines, { language: 'css' }).value,
        };
      }),
    [styleList],
  );

  const invalidateStyles = React.useMemo(() => {
    type Item = { status: STATUS; line: string; source?: string };
    const list: Item[] = [];

    styleList.forEach(({ text }) => {
      const lines = text.split(/[\n\r]+/);

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
            {formatStyles.map(({ text, path }, index) => (
              <pre
                key={index}
                dangerouslySetInnerHTML={{ __html: `🐚 Cache: ${path}\n\n${text}` }}
              />
            ))}
          </Typography>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Token" key="token">
          <Token />
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
