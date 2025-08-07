import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { CheckOutlined, SketchOutlined } from '@ant-design/icons';
import { App } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'copy-to-clipboard';
import { nodeToGroup } from 'html2sketch';

import type { AntdPreviewerProps } from '.';
import useLocale from '../../../hooks/useLocale';

const locales = {
  cn: {
    copySketch: '复制 Sketch JSON',
    pasteToPlugin: '已复制，使用 Kitchen 插件即可粘贴',
    message: '复制失败',
  },
  en: {
    copySketch: 'Copy Sketch JSON',
    pasteToPlugin: 'Copied. You can paste using the Kitchen plugin.',
    message: 'Copy failed',
  },
};

const useStyle = createStyles(({ token, css }) => ({
  wrapper: css`
    position: relative;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    padding: ${token.paddingMD}px ${token.paddingLG}px ${token.paddingMD * 2}px;
    margin-bottom: ${token.marginLG}px;
  `,
  title: css`
    font-size: ${token.fontSizeLG}px;
    font-weight: ${token.fontWeightStrong};
    color: ${token.colorTextHeading};

    &:hover {
      color: ${token.colorTextHeading};
    }
  `,
  description: css`
    margin-top: ${token.margin}px;
  `,
  demo: css`
    margin-top: ${token.marginLG}px;
    display: flex;
    justify-content: center;
  `,
  copy: css`
    position: absolute;
    inset-inline-end: ${token.paddingMD}px;
    inset-block-start: ${token.paddingMD}px;
    cursor: pointer;
  `,
  copyTip: css`
    color: ${token.colorTextTertiary};
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  `,
  copiedTip: css`
    .anticon {
      color: ${token.colorSuccess};
    }
  `,
  tip: css`
    color: ${token.colorTextTertiary};
    margin-top: ${token.marginMD * 2}px;
  `,
}));

const DesignPreviewer: FC<AntdPreviewerProps> = ({ children, title, description, tip, asset }) => {
  const { styles } = useStyle();
  const demoRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const { message } = App.useApp();
  const [locale] = useLocale(locales);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = async () => {
    try {
      if (demoRef.current) {
        const group = await nodeToGroup(demoRef.current);
        copy(JSON.stringify(group.toSketchJSON()));
        setCopied(true);
        timerRef.current = setTimeout(() => {
          setCopied(false);
        }, 5000);
      }
    } catch {
      message.error(locale.message);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper} id={asset.id}>
      <a className={styles.title} href={`#${asset.id}`}>
        {title}
      </a>
      {description && (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: description is from markdown
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <div className={styles.copy}>
        {copied ? (
          <div className={styles.copiedTip}>
            <CheckOutlined />
            <span style={{ marginInlineStart: 8 }}>{locale.pasteToPlugin}</span>
          </div>
        ) : (
          <button type="button" onClick={handleCopy} className={styles.copyTip}>
            <SketchOutlined />
            <span style={{ marginInlineStart: 8 }}>{locale.copySketch}</span>
          </button>
        )}
      </div>
      <div className={styles.demo} ref={demoRef}>
        {children}
      </div>
      <div className={styles.tip}>{tip}</div>
    </div>
  );
};

export default DesignPreviewer;
