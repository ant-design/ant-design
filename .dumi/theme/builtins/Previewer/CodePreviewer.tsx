import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import { createStyles, css } from 'antd-style';
import { clsx } from 'clsx';
import { FormattedMessage, useLiveDemo } from 'dumi';

import type { AntdPreviewerProps } from '.';
import useLocation from '../../../hooks/useLocation';
import BrowserFrame from '../../common/BrowserFrame';
import ClientOnly from '../../common/ClientOnly';
import CodePreview from '../../common/CodePreview';
import EditButton from '../../common/EditButton';
import SiteContext from '../../slots/SiteContext';
import Actions from './Actions';

const useStyle = createStyles(({ cssVar }) => {
  return {
    codeHideBtn: css`
      position: sticky;
      bottom: 0;
      z-index: 1;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 ${cssVar.borderRadius} ${cssVar.borderRadius};
      border-top: 1px solid ${cssVar.colorSplit};
      color: ${cssVar.colorTextSecondary};
      transition: all ${cssVar.motionDurationMid} ease-in-out;
      background-color: ${cssVar.colorBgElevated};
      cursor: pointer;
      &:hover {
        color: ${cssVar.colorPrimary};
      }
      span {
        margin-inline-end: ${cssVar.marginXXS};
      }
    `,
  };
});

const CodePreviewer: React.FC<AntdPreviewerProps> = (props) => {
  const {
    asset,
    expand,
    iframe,
    demoUrl,
    children,
    title,
    description,
    originDebug,
    jsx = '',
    style,
    compact,
    background,
    filename,
    version,
    simplify,
    clientOnly,
    pkgDependencyList,
  } = props;
  const location = useLocation();
  const { styles } = useStyle();

  const entryName = 'index.tsx';
  const entryCode = asset.dependencies[entryName].value;

  const demoContainer = useRef<HTMLElement>(null);
  const {
    node: liveDemoNode,
    error: liveDemoError,
    setSource: setLiveDemoSource,
  } = useLiveDemo(asset.id, {
    iframe: Boolean(iframe),
    containerRef: demoContainer as React.RefObject<HTMLElement>,
  });
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [codeExpand, setCodeExpand] = useState<boolean>(false);
  const { isDark } = React.use(SiteContext);

  const { hash, pathname, search } = location;
  const docsOnlineUrl = `https://ant.design${pathname ?? ''}${search ?? ''}#${asset.id}`;

  const [showOnlineUrl, setShowOnlineUrl] = useState<boolean>(false);

  useEffect(() => {
    const regexp = /preview-(\d+)-ant-design/; // matching PR preview addresses
    setShowOnlineUrl(
      process.env.NODE_ENV === 'development' || regexp.test(window.location.hostname),
    );
  }, []);

  useEffect(() => {
    if (asset.id === hash.slice(1)) {
      anchorRef.current?.click();
    }
  }, [asset.id, hash]);

  useEffect(() => {
    setCodeExpand(expand);
  }, [expand]);

  const mergedChildren = !iframe && clientOnly ? <ClientOnly>{children}</ClientOnly> : children;
  const demoUrlWithTheme = useMemo(() => {
    return `${demoUrl}${isDark ? '?theme=dark' : ''}`;
  }, [demoUrl, isDark]);

  const iframePreview = useMemo(() => {
    if (!iframe) {
      return null;
    }
    return (
      <BrowserFrame>
        <iframe
          src={demoUrlWithTheme}
          height={iframe === true ? undefined : iframe}
          title="demo"
          className="iframe-demo"
        />
      </BrowserFrame>
    );
  }, [demoUrlWithTheme, iframe]);

  const previewContent = iframePreview ?? mergedChildren;

  const codeBoxClass = clsx('code-box', {
    expand: codeExpand,
    'code-box-debug': originDebug,
    'code-box-simplify': simplify && !iframe,
  });

  const highlightClass = clsx('highlight-wrapper', {
    'highlight-wrapper-expand': codeExpand,
  });

  const backgroundGrey = isDark ? '#303030' : '#f0f2f5';

  const codeBoxDemoStyle: React.CSSProperties = {
    padding: iframe || compact ? 0 : undefined,
    overflow: iframe || compact ? 'hidden' : undefined,
    backgroundColor: background === 'grey' ? backgroundGrey : undefined,
  };

  const codeBox: React.ReactNode = (
    <section className={codeBoxClass} id={asset.id}>
      <section
        className="code-box-demo notranslate"
        translate="no"
        style={codeBoxDemoStyle}
        ref={demoContainer}
      >
        {liveDemoNode || <React.StrictMode>{previewContent}</React.StrictMode>}
      </section>
      {!simplify && (
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Tooltip title={originDebug ? <FormattedMessage id="app.demo.debug" /> : ''}>
              <a href={`#${asset.id}`} ref={anchorRef}>
                {title}
              </a>
            </Tooltip>
            <EditButton
              title={<FormattedMessage id="app.content.edit-demo" />}
              filename={filename}
            />
          </div>
          {description && (
            <div
              className="code-box-description"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: it's for markdown
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <Actions
            showOnlineUrl={showOnlineUrl}
            docsOnlineUrl={docsOnlineUrl}
            entryCode={entryCode}
            styleCode={style}
            pkgDependencyList={pkgDependencyList}
            assetId={asset.id}
            title={title}
            jsx={jsx}
            demoUrlWithTheme={demoUrlWithTheme}
            codeExpand={codeExpand}
            onCodeExpand={() => setCodeExpand((prev) => !prev)}
          />
        </section>
      )}
      {codeExpand && (
        <section className={highlightClass} key="code">
          <CodePreview
            sourceCode={entryCode}
            jsxCode={jsx}
            styleCode={style}
            error={liveDemoError}
            entryName={entryName}
            onSourceChange={setLiveDemoSource}
          />
          <div
            tabIndex={0}
            role="button"
            className={styles.codeHideBtn}
            onClick={() => setCodeExpand(false)}
          >
            <UpOutlined />
            <FormattedMessage id="app.demo.code.hide.simplify" />
          </div>
        </section>
      )}
    </section>
  );

  useEffect(() => {
    // In Safari, if style tag be inserted into non-head tag,
    // it will affect the rendering ability of the browser,
    // resulting in some response delays like following issue:
    // https://github.com/ant-design/ant-design/issues/39995
    // So we insert style tag into head tag.
    if (!style) {
      return;
    }
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    (styleTag as any)['data-demo-url'] = demoUrlWithTheme;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [style, demoUrlWithTheme]);

  if (version) {
    return (
      <Badge.Ribbon text={version} color={version.includes('<') ? 'red' : undefined}>
        {codeBox}
      </Badge.Ribbon>
    );
  }

  return codeBox;
};

export default CodePreviewer;
