import React, { useEffect, useMemo } from 'react';
import { Tabs } from 'antd';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
import Prism from 'prismjs';

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
  const initialCodes = {};
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

  useEffect(() => {
    const codes = {
      tsx: Prism.highlight(sourceCode, Prism.languages.javascript, 'jsx'),
      jsx: Prism.highlight(jsxCode, Prism.languages.javascript, 'jsx'),
      style: Prism.highlight(styleCode, Prism.languages.css, 'css'),
    };
    // 去掉空的代码类型
    Object.keys(codes).forEach((key) => {
      if (!codes[key]) {
        delete codes[key];
      }
    });
    setHighlightedCodes(codes);
  }, [jsxCode, sourceCode, styleCode]);

  const langList = Object.keys(highlightedCodes);
  const items = useMemo(
    () =>
      langList.map((lang) => ({
        label: LANGS[lang],
        key: lang,
        children: toReactComponent(['pre', { lang, highlighted: highlightedCodes[lang] }]),
      })),
    [JSON.stringify(highlightedCodes)],
  );

  if (!langList.length) {
    return null;
  }

  if (langList.length === 1) {
    return toReactComponent([
      'pre',
      { lang: langList[0], highlighted: highlightedCodes[langList[0]], className: 'highlight' },
    ]);
  }

  return <Tabs centered className="highlight" onChange={onCodeTypeChange} items={items} />;
};

export default CodePreview;
