import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { createStyles } from 'antd-style';
import LiveEditor from '../slots/LiveEditor';
import LiveError from '../slots/LiveError';
import { EditFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import useLocale from '../../hooks/useLocale';

const useStyle = createStyles(({ token, css }) => {
  const { colorPrimaryBorder, colorIcon, colorPrimary } = token;

  return {
    editor: css`
      .npm__react-simple-code-editor__textarea {
        outline: none;

        &:hover {
          box-shadow: inset 0 0 0 1px ${colorPrimaryBorder} !important;
        }

        &:focus {
          box-shadow: inset 0 0 0 1px ${colorPrimary} !important;
        }
      }
    `,

    editableIcon: css`
      position: absolute;
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

const LiveCode: FC = () => {
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
        <LiveEditor />
        <LiveError />
      </div>
      <Tooltip title={locale.demoEditable} open={open} onOpenChange={handleOpenChange}>
        <EditFilled className={styles.editableIcon} />
      </Tooltip>
    </>
  );
};

export default LiveCode;
