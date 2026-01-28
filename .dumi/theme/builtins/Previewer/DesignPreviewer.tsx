import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { CheckOutlined, SketchOutlined } from '@ant-design/icons';
import { App } from 'antd';
import { createStaticStyles } from 'antd-style';
import copy from '../../../../components/_util/copy';
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

const styles = createStaticStyles(({ cssVar, css }) => ({
  wrapper: css`
    position: relative;
    border: 1px solid ${cssVar.colorBorderSecondary};
    border-radius: ${cssVar.borderRadius};
    padding: ${cssVar.paddingMD} ${cssVar.paddingLG} ${cssVar.paddingMD * 2};
    margin-bottom: ${cssVar.marginLG};
  `,
  title: css`
    font-size: ${cssVar.fontSizeLG};
    font-weight: ${cssVar.fontWeightStrong};
    color: ${cssVar.colorTextHeading};

    &:hover {
      color: ${cssVar.colorTextHeading};
    }
  `,
  description: css`
    margin-top: ${cssVar.margin};
  `,
  demo: css`
    margin-top: ${cssVar.marginLG};
    display: flex;
    justify-content: center;
  `,
  copy: css`
    position: absolute;
    inset-inline-end: ${cssVar.paddingMD};
    inset-block-start: ${cssVar.paddingMD};
    cursor: pointer;
  `,
  copyTip: css`
    color: ${cssVar.colorTextTertiary};
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  `,
  copiedTip: css`
    .anticon {
      color: ${cssVar.colorSuccess};
    }
  `,
  tip: css`
    color: ${cssVar.colorTextTertiary};
    margin-top: ${cssVar.marginMD * 2};
  `,
}));

const DesignPreviewer: FC<AntdPreviewerProps> = ({ children, title, description, tip, asset }) => {
  const demoRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const { message } = App.useApp();
  const [locale] = useLocale(locales);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = async () => {
    try {
      if (demoRef.current) {
        const group = await nodeToGroup(demoRef.current);
        await copy(JSON.stringify(group.toSketchJSON()));
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
