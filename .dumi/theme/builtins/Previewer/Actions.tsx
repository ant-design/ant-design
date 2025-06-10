import React, { useRef, Suspense } from 'react';
import { LinkOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Tooltip } from 'antd';
import { FormattedMessage } from 'dumi';
import LZString from 'lz-string';
import stackblitzSdk from '@stackblitz/sdk';

import CodePenIcon from '../../icons/CodePenIcon';
import CodeSandboxIcon from '../../icons/CodeSandboxIcon';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import ClientOnly from '../../common/ClientOnly';
import CodeBlockButton from './CodeBlockButton';
import type { ThemeName } from '../../common/ThemeSwitch';

const track = ({ type, demo }: { type: string; demo: string }) => {
  window.gtag?.('event', 'demo', { event_category: type, event_label: demo });
};

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

interface ActionsProps {
  showOnlineUrl: boolean;
  docsOnlineUrl?: string;
  codesanboxPrefillConfig: any;
  codepenPrefillConfig: any;
  assetId: string;
  localizedTitle?: string;
  dependencies: Record<PropertyKey, string>;
  jsx: string;
  stackblitzPrefillConfig: any;
  suffix: string;
  demoUrlWithTheme: string;
  theme: ThemeName[];
  codeExpand: boolean;
  onCodeExpand: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  showOnlineUrl,
  docsOnlineUrl,
  codesanboxPrefillConfig,
  codepenPrefillConfig,
  assetId,
  localizedTitle,
  dependencies,
  jsx,
  stackblitzPrefillConfig,
  suffix,
  demoUrlWithTheme,
  theme,
  codeExpand,
  onCodeExpand,
}) => {
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  const codepenIconRef = useRef<HTMLFormElement>(null);
  const handleCodeExpand = () => {
    track({ type: 'expand', demo: assetId });
    onCodeExpand();
  };

  // 统一展开/收起图标
  const expandIcon = theme?.includes('dark')
    ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
    : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg';
  const unexpandIcon = theme?.includes('dark')
    ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
    : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg';

  return (
    <Flex wrap gap="middle" className="code-box-actions">
      {/* 在线文档按钮 */}
      {showOnlineUrl && (
        <Tooltip title={<FormattedMessage id="app.demo.online" />}>
          <a
            className="code-box-code-action"
            aria-label="open in new tab"
            target="_blank"
            rel="noreferrer"
            href={docsOnlineUrl || ''}
          >
            <LinkOutlined className="code-box-online" />
          </a>
        </Tooltip>
      )}
      {/* CodeSandbox 按钮 */}
      <form
        className="code-box-code-action"
        action="https://codesandbox.io/api/v1/sandboxes/define"
        method="POST"
        target="_blank"
        ref={codeSandboxIconRef}
        onClick={() => {
          track({ type: 'codesandbox', demo: assetId });
          codeSandboxIconRef.current?.submit();
        }}
      >
        <input
          type="hidden"
          name="parameters"
          value={compress(JSON.stringify(codesanboxPrefillConfig))}
        />
        <Tooltip title={<FormattedMessage id="app.demo.codesandbox" />}>
          <CodeSandboxIcon className="code-box-codesandbox" />
        </Tooltip>
      </form>
      {/* 代码块复制按钮 */}
      <CodeBlockButton title={localizedTitle} dependencies={dependencies} jsx={jsx} />
      {/* StackBlitz 按钮 */}
      <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
        <span
          className="code-box-code-action"
          aria-label="open in new tab"
          tabIndex={0}
          role="button"
          onClick={() => {
            track({ type: 'stackblitz', demo: assetId });
            stackblitzSdk.openProject(stackblitzPrefillConfig, {
              openFile: [`demo.${suffix}`],
            });
          }}
        >
          <ThunderboltOutlined
            className="code-box-stackblitz"
            style={{ transform: 'scale(1.2)' }}
          />
        </span>
      </Tooltip>
      {/* CodePen 按钮 */}
      <form
        className="code-box-code-action"
        action="https://codepen.io/pen/define"
        method="POST"
        target="_blank"
        ref={codepenIconRef}
        onClick={() => {
          track({ type: 'codepen', demo: assetId });
          codepenIconRef.current?.submit();
        }}
      >
        <ClientOnly>
          <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
        </ClientOnly>
        <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
          <CodePenIcon className="code-box-codepen" />
        </Tooltip>
      </form>
      {/* 分离窗口按钮 */}
      <Tooltip title={<FormattedMessage id="app.demo.separate" />}>
        <a
          className="code-box-code-action"
          aria-label="open in new tab"
          target="_blank"
          rel="noreferrer"
          href={demoUrlWithTheme}
        >
          <ExternalLinkIcon className="code-box-separate" />
        </a>
      </Tooltip>
      {/* 展开/收起代码按钮 */}
      <Tooltip title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}>
        <div
          className="code-expand-icon code-box-code-action"
          tabIndex={0}
          role="button"
          onClick={handleCodeExpand}
        >
          <img
            alt="expand code"
            src={expandIcon}
            className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
          />
          <img
            alt="expand code"
            src={unexpandIcon}
            className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
          />
        </div>
      </Tooltip>
    </Flex>
  );
};

const SuspenseActions = (props: React.ComponentProps<typeof Actions>) => (
  <Suspense fallback={null}>
    <Actions {...props} />
  </Suspense>
);

export default SuspenseActions;
