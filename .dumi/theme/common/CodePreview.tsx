import React from 'react';
import { Tabs } from 'antd';

const LANGS = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
};

interface CodePreviewProps {
  codes?: Record<PropertyKey, string>;
  toReactComponent?: (node: any) => React.ReactNode;
  onCodeTypeChange?: (activeKey: string) => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({ toReactComponent, codes, onCodeTypeChange }) => {
  const langList = Object.keys(codes).sort().reverse();
  if (langList.length === 1) {
    return toReactComponent([
      'pre',
      { lang: langList[0], highlighted: codes[langList[0]], className: 'highlight' },
    ]);
  }
  return (
    <Tabs
      centered
      className="highlight"
      onChange={onCodeTypeChange}
      items={langList.map((lang) => ({
        label: LANGS[lang],
        key: lang,
        children: toReactComponent(['pre', { lang, highlighted: codes[lang] }]),
      }))}
    />
  );
};

export default CodePreview;
