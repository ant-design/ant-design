import React, { Suspense, useMemo, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { App, Tooltip } from 'antd';
import { FormattedMessage } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import HituIcon from '../../icons/HituIcon';

const locales = {
  cn: {
    message: '此功能仅在内网环境可用',
  },
  en: {
    message: 'This feature is only available in the internal network environment',
  },
};

interface CodeBlockButtonProps {
  title?: string;
  dependencies: Record<PropertyKey, string>;
  jsx: string;
}

const CodeBlockButton: React.FC<CodeBlockButtonProps> = ({ title, dependencies = {}, jsx }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const [locale] = useLocale(locales);

  const codeBlockPrefillConfig = useMemo(() => {
    return {
      title: `${title} - antd@${dependencies.antd}`,
      js: `${
        /import React(\D*)from 'react';/.test(jsx) ? '' : `import React from 'react';\n`
      }import { createRoot } from 'react-dom/client';\n${jsx.replace(
        /export default/,
        'const ComponentDemo =',
      )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
      css: '',
      json: JSON.stringify({ name: 'antd-demo', dependencies }, null, 2),
    };
  }, [dependencies, jsx, title]);

  const openHituCodeBlockFn = React.useCallback(() => {
    setLoading(false);
    // @ts-ignore
    if (window.openHituCodeBlock) {
      // @ts-ignore
      window.openHituCodeBlock(JSON.stringify(codeBlockPrefillConfig));
    } else {
      message.error(locale.message);
    }
  }, [codeBlockPrefillConfig, message, locale.message]);

  const handleClick = () => {
    const scriptId = 'hitu-code-block-js';
    const existScript = document.getElementById(scriptId) as HTMLScriptElement;
    if (existScript?.dataset.loaded) {
      openHituCodeBlockFn();
      return;
    }
    setLoading(true);
    const script = document.createElement('script');
    script.src = `https://renderoffice.alipayobjects.com/p/yuyan/180020010001206410/parseFileData-v1.0.1.js?t=${Date.now()}`;
    script.async = true;
    script.id = scriptId;
    script.onload = () => {
      script.dataset.loaded = 'true';
      openHituCodeBlockFn();
    };
    script.onerror = () => {
      openHituCodeBlockFn();
    };
    document.body.appendChild(script);
  };

  return (
    <Tooltip title={<FormattedMessage id="app.demo.codeblock" />}>
      <div className="code-box-code-action">
        {loading ? (
          <LoadingOutlined className="code-box-codeblock" />
        ) : (
          <HituIcon className="code-box-codeblock" onClick={handleClick} />
        )}
      </div>
    </Tooltip>
  );
};

const SuspenseCodeBlockButton: React.FC<CodeBlockButtonProps> = (props) => (
  <Suspense fallback={null}>
    <CodeBlockButton {...props} />
  </Suspense>
);

export default SuspenseCodeBlockButton;
