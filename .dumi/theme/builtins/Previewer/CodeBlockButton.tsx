import React, { Suspense, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { FormattedMessage } from 'dumi';
import { ping } from '../../utils';

let pingDeferrer: PromiseLike<boolean>;

function useShowCodeBlockButton() {
  const [showCodeBlockButton, setShowCodeBlockButton] = useState(false);

  useEffect(() => {
    pingDeferrer ??= new Promise<boolean>((resolve) => {
      ping((status) => {
        if (status !== 'timeout' && status !== 'error') {
          return resolve(true);
        }

        return resolve(false);
      });
    });
    pingDeferrer.then(setShowCodeBlockButton);
  }, []);

  return showCodeBlockButton;
}

interface RiddleButtonProps {
  title?: string;
  dependencies: Record<PropertyKey, string>;
  jsx: string;
}

const RiddleButton: React.FC<RiddleButtonProps> = ({ title, dependencies = {}, jsx }) => {
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
            openHituCodeBlock(JSON.stringify(codeBlockPrefillConfig));
          }}
        />
      </div>
    </Tooltip>
  ) : null;
};

export default (props: RiddleButtonProps) => (
  <Suspense>
    <RiddleButton {...props} />
  </Suspense>
);
