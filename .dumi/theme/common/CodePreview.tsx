import { Button, Tabs, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { LiveContext } from 'dumi';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
import Prism from 'prismjs';
import React, { useContext, useEffect, useMemo } from 'react';
import LiveCode from './LiveCode';

const useStyle = createStyles(({ token, css }) => {
  const { colorIcon, colorBgTextHover, antCls } = token;

  return {
    code: css`
      position: relative;
      margin-top: -16px;
    `,

    copyButton: css`
      color: ${colorIcon};
      position: absolute;
      top: 16px;
      inset-inline-end: 16px;
      width: 32px;
      text-align: center;
      background: ${colorBgTextHover};
      padding: 0;
    `,

    copyIcon: css`
      ${antCls}-typography-copy {
        margin-inline-start: 0;
      }
      ${antCls}-typography-copy:not(${antCls}-typography-copy-success) {
        color: ${colorIcon};

        &:hover {
          color: ${colorIcon};
        }
      }
    `,
  };
});

const LANGS = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
  style: 'CSS',
};

interface CodePreviewProps {
  sourceCode?: string;
  jsxCode?: string;
  styleCode?: string;
  onCodeTypeChange?: (activeKey: string) => void;
}

function toReactComponent(jsonML: any[]) {
  return toReactElement(jsonML, [
    [
      (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
      (node: any, index: number) => {
        const attr = JsonML.getAttributes(node);
        return (
          <pre key={index} className={`language-${attr.lang}`}>
            <code dangerouslySetInnerHTML={{ __html: attr.highlighted }} />
          </pre>
        );
      },
    ],
  ]);
}

const CodePreview: React.FC<CodePreviewProps> = ({
  sourceCode = '',
  jsxCode = '',
  styleCode = '',
  onCodeTypeChange,
}) => {
  // 避免 Tabs 数量不稳定的闪动问题
  const initialCodes = {} as Record<'tsx' | 'jsx' | 'style', string>;
  if (sourceCode) {
    initialCodes.tsx = '';
  }
  if (jsxCode) {
    initialCodes.jsx = '';
  }
  if (styleCode) {
    initialCodes.style = '';
  }
  const [highlightedCodes, setHighlightedCodes] = React.useState(initialCodes);
  const sourceCodes = {
    tsx: sourceCode,
    jsx: jsxCode,
    style: styleCode,
  } as Record<'tsx' | 'jsx' | 'style', string>;
  useEffect(() => {
    const codes = {
      tsx: Prism.highlight(sourceCode, Prism.languages.javascript, 'jsx'),
      jsx: Prism.highlight(jsxCode, Prism.languages.javascript, 'jsx'),
      style: Prism.highlight(styleCode, Prism.languages.css, 'css'),
    };
    // 去掉空的代码类型
    Object.keys(codes).forEach((key: keyof typeof codes) => {
      if (!codes[key]) {
        delete codes[key];
      }
    });
    setHighlightedCodes(codes);
  }, [jsxCode, sourceCode, styleCode]);

  const langList = Object.keys(highlightedCodes);

  const { styles } = useStyle();

  const { enabled: liveEnabled } = useContext(LiveContext);

  const items = useMemo(
    () =>
      langList.map((lang: keyof typeof LANGS) => ({
        label: LANGS[lang],
        key: lang,
        children: (
          <div className={styles.code}>
            {lang === 'tsx' && liveEnabled ? (
              <LiveCode />
            ) : (
              toReactComponent(['pre', { lang, highlighted: highlightedCodes[lang] }])
            )}
            <Button type="text" className={styles.copyButton}>
              <Typography.Text className={styles.copyIcon} copyable={{ text: sourceCodes[lang] }} />
            </Button>
          </div>
        ),
      })),
    [JSON.stringify(highlightedCodes)],
  );

  if (!langList.length) {
    return null;
  }

  if (langList.length === 1) {
    return liveEnabled ? (
      <LiveCode />
    ) : (
      toReactComponent([
        'pre',
        {
          lang: langList[0],
          highlighted: highlightedCodes[langList[0] as keyof typeof LANGS],
          className: 'highlight',
        },
      ])
    );
  }

  return <Tabs centered className="highlight" onChange={onCodeTypeChange} items={items} />;
};

export default CodePreview;
