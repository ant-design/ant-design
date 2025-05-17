import React, { Suspense, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { FormattedMessage } from 'dumi';

const codeBlockJs =
  'https://renderoffice.a' +
  'lipay' +
  'objects.com/p' +
  '/yuyan/180020010001206410/parseFileData-v1.0.1.js';

function useShowCodeBlockButton() {
  const [showCodeBlockButton, setShowCodeBlockButton] = useState(false);

  useEffect(() => {
    const scriptId = 'hitu-code-block-js';
    const existScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existScript) {
      // 如果已标记 loaded，直接显示按钮
      if (existScript.dataset.loaded) {
        setShowCodeBlockButton(true);
      }
      return;
    }
    const script = document.createElement('script');
    script.src = codeBlockJs;
    script.async = true;
    script.id = scriptId;
    script.onload = () => {
      script.dataset.loaded = 'true';
      setShowCodeBlockButton(true);
    };
    document.body.appendChild(script);
  }, []);

  return showCodeBlockButton;
}

interface CodeBlockButtonProps {
  title?: string;
  dependencies: Record<PropertyKey, string>;
  jsx: string;
}

const CodeBlockButton: React.FC<CodeBlockButtonProps> = ({ title, dependencies = {}, jsx }) => {
  const showCodeBlockButton = useShowCodeBlockButton();

  const codeBlockPrefillConfig = {
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

  return showCodeBlockButton ? (
    <Tooltip title={<FormattedMessage id="app.demo.codeblock" />}>
      <div className="code-box-code-action">
        <img
          alt="codeblock"
          src="https://mdn.alipayobjects.com/huamei_wtld8u/afts/img/A*K8rjSJpTNQ8AAAAAAAAAAAAADhOIAQ/original"
          className="code-box-codeblock"
          onClick={() => {
            openHituCodeBlock?.(JSON.stringify(codeBlockPrefillConfig));
          }}
        />
      </div>
    </Tooltip>
  ) : null;
};

export default (props: CodeBlockButtonProps) => (
  <Suspense>
    <CodeBlockButton {...props} />
  </Suspense>
);
