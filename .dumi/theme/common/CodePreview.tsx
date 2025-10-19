import type { ComponentProps } from 'react';
import React, { useEffect, useMemo } from 'react';
import { Tabs, Typography } from 'antd';
import { createStyles } from 'antd-style';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
import Prism from 'prismjs';

import DemoContext from '../slots/DemoContext';
import LiveCode from './LiveCode';

const useStyle = createStyles(({ cssVar, token, css }) => {
  const { antCls } = token;

  return {
    code: css`
      position: relative;
      margin-top: calc(-1 * ${cssVar.margin});
    `,

    copyButton: css`
      color: ${cssVar.colorIcon};
      position: absolute;
      z-index: 2;
      top: 16px;
      inset-inline-end: ${cssVar.padding};
      width: 32px;
      text-align: center;
      padding: 0;
    `,

    copyIcon: css`
      ${antCls}-typography-copy {
        position: relative;
        margin-inline-start: 0;

        // expand clickable area
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: -5px;
          inset-inline-start: -9px;
          bottom: -5px;
          inset-inline-end: -9px;
        }
      }
      ${antCls}-typography-copy:not(${antCls}-typography-copy-success) {
        color: ${cssVar.colorIcon};

        &:hover {
          color: ${cssVar.colorIcon};
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

interface CodePreviewProps
  extends Omit<ComponentProps<typeof LiveCode>, 'initialValue' | 'lang' | 'onChange'> {
  sourceCode?: string;
  jsxCode?: string;
  styleCode?: string;
  entryName: string;
  onSourceChange?: (source: Record<string, string>) => void;
}

function toReactComponent(jsonML: any[]) {
  return toReactElement(jsonML, [
    [
      (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
      (node: any, index: number) => {
        const attr = JsonML.getAttributes(node);
        return (
          <pre key={index} className={`language-${attr.lang}`}>
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: it's for markdown */}
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
  entryName,
  onSourceChange,
  error,
}) => {
  // 避免 Tabs 数量不稳定的闪动问题
  const initialCodes: Partial<Record<'tsx' | 'jsx' | 'style', string>> = {};
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
  const { codeType, setCodeType } = React.use(DemoContext);

  const sourceCodes = useMemo<Record<'tsx' | 'jsx' | 'style', string>>(() => {
    return {
      // omit trailing line break
      tsx: sourceCode?.trim(),
      jsx: jsxCode?.trim(),
      style: styleCode?.trim(),
    };
  }, [sourceCode, jsxCode, styleCode]);

  useEffect(() => {
    const codes = {
      tsx: Prism.highlight(sourceCode, Prism.languages.javascript, 'jsx'),
      jsx: Prism.highlight(jsxCode, Prism.languages.javascript, 'jsx'),
      style: Prism.highlight(styleCode, Prism.languages.css, 'css'),
    };
    // 去掉空的代码类型
    (Object.keys(codes) as (keyof typeof codes)[]).forEach((key) => {
      if (!codes[key]) {
        delete codes[key];
      }
    });
    setHighlightedCodes(codes);
  }, [jsxCode, sourceCode, styleCode]);

  const langList = Object.keys(highlightedCodes) as ('tsx' | 'jsx' | 'style')[];

  const { styles } = useStyle();

  const items = useMemo(
    () =>
      langList.map((lang: keyof typeof LANGS) => ({
        label: LANGS[lang],
        key: lang,
        children: (
          <div className={styles.code}>
            {lang === 'tsx' ? (
              <LiveCode
                error={error}
                lang={lang}
                initialValue={sourceCodes[lang]}
                onChange={(code: string) => {
                  onSourceChange?.({ [entryName]: code });
                }}
              />
            ) : (
              toReactComponent(['pre', { lang, highlighted: highlightedCodes[lang] }])
            )}
            {/* button 嵌套 button 会导致水合失败，这里需要用 div 标签，不能用 button */}
            <div className={styles.copyButton}>
              <Typography.Text className={styles.copyIcon} copyable={{ text: sourceCodes[lang] }} />
            </div>
          </div>
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      entryName,
      error,
      highlightedCodes,
      langList,
      sourceCodes,
      styles.code,
      styles.copyButton,
      styles.copyIcon,
    ],
  );

  if (!langList.length) {
    return null;
  }

  if (langList.length === 1) {
    return (
      <LiveCode
        error={error}
        lang={langList[0]}
        initialValue={sourceCodes[langList[0]]}
        onChange={(code: string) => {
          onSourceChange?.({ [entryName]: code });
        }}
      />
    );
  }

  return (
    <Tabs
      centered
      className="highlight"
      activeKey={codeType}
      onChange={setCodeType}
      items={items}
    />
  );
};

export default CodePreview;
