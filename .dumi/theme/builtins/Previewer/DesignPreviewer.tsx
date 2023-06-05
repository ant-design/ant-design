import type { FC } from 'react';
import React, { useRef } from 'react';
import { createStyles, css } from 'antd-style';
import { CheckOutlined, SketchOutlined } from '@ant-design/icons';
import { nodeToGroup } from 'html2sketch';
import copy from 'copy-to-clipboard';
import { App } from 'antd';
import type { AntdPreviewerProps } from '.';

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
    inset-inline-end: 20px;
    inset-block-start: 20px;
    cursor: pointer;
  `,
  copyTip: css`
    color: ${token.colorTextTertiary};
  `,
  copiedTip: css`
    .anticon {
      color: ${token.colorSuccess};
    }
  `,
  tip: css`
    color: ${token.colorTextTertiary};
    margin-top: 40px;
  `,
}));

const DesignPreviewer: FC<AntdPreviewerProps> = ({ children, title, description, tip, asset }) => {
  const { styles } = useStyle();
  const demoRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const { message } = App.useApp();

  const handleCopy = async () => {
    try {
      const group = await nodeToGroup(demoRef.current);
      copy(JSON.stringify(group.toSketchJSON()));
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (e) {
      console.error(e);
      message.error('复制失败');
    }
  };

  return (
    <div className={styles.wrapper} id={asset.id}>
      <a className={styles.title} href={`#${asset.id}`}>
        {title}
      </a>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
      <div className={styles.copy}>
        {copied ? (
          <div className={styles.copiedTip}>
            <CheckOutlined />
            <span style={{ marginLeft: 8 }}>已复制，使用 Kitchen 插件即可粘贴</span>
          </div>
        ) : (
          <div onClick={handleCopy} className={styles.copyTip}>
            <SketchOutlined />
            <span style={{ marginLeft: 8 }}>复制 Sketch JSON</span>
          </div>
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
