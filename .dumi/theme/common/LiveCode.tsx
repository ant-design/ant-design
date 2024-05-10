import type { ComponentProps, FC } from 'react';
import React, { useEffect, useState } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import SourceCodeEditor from 'dumi/theme-default/slots/SourceCodeEditor';

import useLocale from '../../hooks/useLocale';
import LiveError from '../slots/LiveError';

const useStyle = createStyles(({ token, css }) => {
  const { colorBgContainer, colorIcon } = token;

  return {
    editor: css`
      // override dumi editor styles
      .dumi-default-source-code-editor {
        .dumi-default-source-code {
          background: ${colorBgContainer};
        }

        .dumi-default-source-code > pre,
        .dumi-default-source-code-scroll-content > pre,
        .dumi-default-source-code-editor-textarea {
          padding: ${token.paddingSM}px ${token.padding}px;
        }

        .dumi-default-source-code > pre,
        .dumi-default-source-code-scroll-content > pre {
          font-size: ${token.fontSize}px;
          line-height: 2;
          font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        }

        // disable dumi default copy button
        .dumi-default-source-code-copy {
          display: none;
        }

        &::after {
          border-radius: 0 !important;
        }

        &:hover:not(:focus-within) {
          &::after {
            box-shadow: 0 0 0 1px ${token.colorPrimaryBorderHover} inset;
          }
        }
      }
    `,

    editableIcon: css`
      position: absolute;
      z-index: 2;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 16px;
      inset-inline-end: 56px;
      color: ${colorIcon};
    `,
  };
});

const locales = {
  cn: {
    demoEditable: '编辑 Demo 可实时预览',
  },
  en: {
    demoEditable: 'Edit demo with real-time preview',
  },
};

const HIDE_LIVE_DEMO_TIP = 'hide-live-demo-tip';

const LiveCode: FC<
  {
    error: Error | null;
  } & Pick<ComponentProps<typeof SourceCodeEditor>, 'lang' | 'initialValue' | 'onChange'>
> = (props) => {
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();
  const [locale] = useLocale(locales);

  useEffect(() => {
    const shouldOpen = !localStorage.getItem(HIDE_LIVE_DEMO_TIP);
    if (shouldOpen) {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      localStorage.setItem(HIDE_LIVE_DEMO_TIP, 'true');
    }
  };

  return (
    <>
      <div className={styles.editor}>
        <SourceCodeEditor
          lang={props.lang}
          initialValue={props.initialValue}
          onChange={props.onChange}
        />
        <LiveError error={props.error} />
      </div>
      <Tooltip title={locale.demoEditable} open={open} onOpenChange={handleOpenChange}>
        <EditFilled className={styles.editableIcon} />
      </Tooltip>
    </>
  );
};

export default LiveCode;
