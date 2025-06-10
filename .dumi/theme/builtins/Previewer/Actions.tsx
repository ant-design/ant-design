import React, { useRef } from 'react';
import { LinkOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Tooltip } from 'antd';
import { FormattedMessage } from 'dumi';
import CodePenIcon from '../../icons/CodePenIcon';
import CodeSandboxIcon from '../../icons/CodeSandboxIcon';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import ClientOnly from '../../common/ClientOnly';
import CodeBlockButton from './CodeBlockButton';
import LZString from 'lz-string';
import stackblitzSdk from '@stackblitz/sdk';

const track = ({ type, demo }: { type: string; demo: string }) => {
  if (!window.gtag) return;
  window.gtag('event', 'demo', { event_category: type, event_label: demo });
};

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
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
  theme: string;
  codeExpand: boolean;
  onCodeExpand: (demo: string) => void;
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
    onCodeExpand(assetId);
  };
  return (
    <Flex wrap gap="middle" className="code-box-actions">
      {showOnlineUrl && (
        <Tooltip title={<FormattedMessage id="app.demo.online" />}>
          <a
            className="code-box-code-action"
            target="_blank"
            rel="noreferrer"
            href={docsOnlineUrl || ''}
          >
            <LinkOutlined aria-label="open in new tab" className="code-box-online" />
          </a>
        </Tooltip>
      )}
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
      <CodeBlockButton title={localizedTitle} dependencies={dependencies} jsx={jsx} />
      <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
        <span
          className="code-box-code-action"
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
      <Tooltip title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}>
        <div className="code-expand-icon code-box-code-action">
          <img
            alt="expand code"
            src={
              theme?.includes('dark')
                ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
            }
            className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
            onClick={handleCodeExpand}
          />
          <img
            alt="expand code"
            src={
              theme?.includes('dark')
                ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
            }
            className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
            onClick={handleCodeExpand}
          />
        </div>
      </Tooltip>
    </Flex>
  );
};

export default Actions;
