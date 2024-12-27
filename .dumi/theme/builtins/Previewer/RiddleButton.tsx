import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'antd';
import { FormattedMessage } from 'dumi';

import type { IPreviewerProps } from 'dumi';

import RiddleIcon from '../../icons/RiddleIcon';
import { ping } from '../../utils';

let pingDeferrer: PromiseLike<boolean>;

function useShowRiddleButton() {
  const [showRiddleButton, setShowRiddleButton] = useState(false);

  useEffect(() => {
    pingDeferrer ??= new Promise<boolean>((resolve) => {
      ping((status) => {
        if (status !== 'timeout' && status !== 'error') {
          return resolve(true);
        }

        return resolve(false);
      });
    });
    pingDeferrer.then(setShowRiddleButton);
  }, []);

  return showRiddleButton;
}

interface RiddleButtonProps {
  title?: string;
  dependencies: Record<PropertyKey, string>;
  jsx: string;
  track: ({
    type,
    demo,
  }: {
    type: string;
    demo: string;
  }) => void;
  asset: IPreviewerProps['asset'];
}

const RiddleButton: React.FC<RiddleButtonProps> = ({
  title,
  dependencies = {},
  jsx,
  track,
  asset,
}) => {
  const riddleIconRef = useRef<HTMLFormElement>(null);
  const showRiddleButton = useShowRiddleButton();

  const riddlePrefillConfig = {
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

  return showRiddleButton ? (
    <form
      className="code-box-code-action"
      action="//riddle.alibaba-inc.com/riddles/define"
      method="POST"
      target="_blank"
      ref={riddleIconRef}
      onClick={() => {
        track({ type: 'riddle', demo: asset.id });
        riddleIconRef.current?.submit();
      }}
    >
      <input type="hidden" name="data" value={JSON.stringify(riddlePrefillConfig)} />
      <Tooltip title={<FormattedMessage id="app.demo.riddle" />}>
        <RiddleIcon className="code-box-riddle" />
      </Tooltip>
    </form>
  ) : null;
};

export default (props: RiddleButtonProps) => (
  <Suspense>
    <RiddleButton {...props} />
  </Suspense>
);
