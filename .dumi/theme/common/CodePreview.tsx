import type { ComponentProps } from 'react';
import React, { useEffect, useMemo } from 'react';
import type { Tab } from '@rc-component/tabs';
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

interface CodePreviewProps extends Omit<
  ComponentProps<typeof LiveCode>,
  'initialValue' | 'lang' | 'onChange'
> {
  sourceCode?: string;
  jsxCode?: string;
  styleCode?: string;
  entryName: string;
  onSourceChange?: (source: Record<string, string>) => void;
}

const toReactComponent = (jsonML: any[]) => {
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
};

type CodeType = 'tsx' | 'jsx' | 'style';

type Codes = Partial<Record<CodeType, string>>;

const CodePreview: React.FC<CodePreviewProps> = (props) => {
  const { sourceCode = '', jsxCode = '', styleCode = '', entryName, error, onSourceChange } = props;

  const { codeType, setCodeType } = React.use(DemoContext);

  const sourceCodes = useMemo<Codes>(() => {
    const codes: Codes = {};
    if (sourceCode) {
      codes.tsx = sourceCode.trim();
    }
    if (jsxCode) {
      codes.jsx = jsxCode.trim();
    }
    if (styleCode) {
      codes.style = styleCode.trim();
    }
    return codes;
  }, [sourceCode, jsxCode, styleCode]);

  const codeTypes = useMemo<CodeType[]>(() => {
    const types: CodeType[] = [];
    if (sourceCodes.tsx) {
      types.push('tsx');
    }
    if (sourceCodes.jsx) {
      types.push('jsx');
    }
    if (sourceCodes.style) {
      types.push('style');
    }
    return types;
  }, [sourceCodes]);

  const [highlightedCodes, setHighlightedCodes] = React.useState<Codes>({});

  useEffect(() => {
    const codes: Codes = {};
    if (sourceCodes.tsx) {
      codes.tsx = Prism.highlight(sourceCodes.tsx, Prism.languages.javascript, 'jsx');
    }
    if (sourceCodes.jsx) {
      codes.jsx = Prism.highlight(sourceCodes.jsx, Prism.languages.javascript, 'jsx');
    }
    if (sourceCodes.style) {
      codes.style = Prism.highlight(sourceCodes.style, Prism.languages.css, 'css');
    }
    setHighlightedCodes(codes);
  }, [sourceCodes]);

  const { styles } = useStyle();

  const memoizedItems = useMemo<Tab[]>(() => {
    return codeTypes.map((lang) => ({
      label: LANGS[lang],
      key: lang,
      children: (
        <div className={styles.code}>
          {lang === 'tsx' ? (
            <LiveCode
              error={error}
              lang={lang}
              initialValue={sourceCodes[lang] ?? ''}
              onChange={(code: string) => {
                onSourceChange?.({ [entryName]: code });
              }}
            />
          ) : (
            toReactComponent([
              'pre',
              { lang, highlighted: highlightedCodes[lang] ?? sourceCodes[lang] },
            ])
          )}
          {/* button 嵌套 button 会导致水合失败，这里需要用 div 标签，不能用 button */}
          <div className={styles.copyButton}>
            <Typography.Text className={styles.copyIcon} copyable={{ text: sourceCodes[lang] }} />
          </div>
        </div>
      ),
    }));
  }, [
    entryName,
    error,
    highlightedCodes,
    codeTypes,
    sourceCodes,
    styles.code,
    styles.copyButton,
    styles.copyIcon,
  ]);

  if (!codeTypes.length) {
    return null;
  }

  if (codeTypes.length === 1) {
    return (
      <LiveCode
        error={error}
        lang={codeTypes[0]}
        initialValue={sourceCodes[codeTypes[0]] ?? ''}
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
      items={memoizedItems}
    />
  );
};

export default CodePreview;
