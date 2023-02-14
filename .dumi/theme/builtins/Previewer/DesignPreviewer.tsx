import type { FC } from 'react';
import React, { useRef } from 'react';
import type { IPreviewerProps } from 'dumi';
import { createStyles, css } from 'antd-style';
import { SketchOutlined } from '@ant-design/icons';
import { nodeToGroup } from 'html2sketch';
import copy from 'copy-to-clipboard';
import { App } from 'antd';

const useStyle = createStyles(({ token }) => ({
  wrapper: css`
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    padding: 20px 24px 40px;
    position: relative;
    margin-bottom: ${token.marginLG}px;
  `,
  title: css`
    font-size: ${token.fontSizeLG}px;
    font-weight: ${token.fontWeightStrong};
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
    inset-inline-end: 20px;
    inset-block-start: 20px;
    color: ${token.colorTextTertiary};
    cursor: pointer;
  `,
  tip: css`
    color: ${token.colorTextTertiary};
    margin-top: 40px;
  `,
}));

const DesignPreviewer: FC<IPreviewerProps> = ({ children, title, description, tip }) => {
  const { styles } = useStyle();
  const demoRef = useRef<HTMLDivElement>(null);
  const { message } = App.useApp();

  const handleCopy = async () => {
    try {
      const group = await nodeToGroup(demoRef.current);
      copy(JSON.stringify(group.toSketchJSON()));
      message.success('复制成功');
    } catch (e) {
      console.error(e);
      message.error('复制失败');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
      <div className={styles.copy} onClick={handleCopy}>
        <SketchOutlined />
        <span style={{ marginLeft: 8 }}>粘贴至 Sketch</span>
      </div>
      <div className={styles.demo}>
        <div ref={demoRef}>{children}</div>
      </div>
      <div className={styles.tip}>{tip}</div>
    </div>
  );
};

export default DesignPreviewer;
