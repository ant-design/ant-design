import React from 'react';
import { Image, Segmented } from 'antd';
import { createStyles } from 'antd-style';
import { Mermaid, MermaidSource } from 'dumi-plugin-mermaid/component';
import type { MermaidProps } from 'dumi-plugin-mermaid/component';

type MermaidView = 'preview' | 'code';

const viewOptions: { label: string; value: MermaidView }[] = [
  { label: 'Preview', value: 'preview' },
  { label: 'Code', value: 'code' },
];

const useStyle = createStyles(({ css, token }) => ({
  wrapper: css`
    overflow: hidden;
    border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;

    && > .dumi-default-source-code {
      margin: 0;
      border-radius: 0;
    }
  `,
  preview: css`
    padding: 1em;
    cursor: zoom-in;
  `,
  header: css`
    display: flex;
    justify-content: flex-end;
    padding: ${token.paddingXS}px ${token.paddingSM}px;
    border-block-end: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
    background: ${token.colorFillQuaternary};
  `,
}));

const DumiPluginMermaid: React.FC<MermaidProps> = (props) => {
  const { styles } = useStyle();
  const [view, setView] = React.useState<MermaidView>('preview');
  const [svg, setSvg] = React.useState('');
  const [previewSrc, setPreviewSrc] = React.useState('');
  const [previewOpen, setPreviewOpen] = React.useState(false);

  React.useEffect(() => {
    if (!svg) {
      return;
    }

    const previewUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    setPreviewSrc(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [svg]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Segmented<MermaidView> options={viewOptions} value={view} onChange={setView} />
      </div>
      {view === 'preview' ? (
        <div className={styles.preview} onClick={() => setPreviewOpen(!!previewSrc)}>
          <Mermaid {...props} onRender={setSvg} />
        </div>
      ) : (
        <MermaidSource code={props.code} />
      )}
      <Image
        aria-hidden
        hidden
        src={previewSrc}
        preview={{
          open: previewOpen,
          src: previewSrc,
          onOpenChange: setPreviewOpen,
        }}
      />
    </div>
  );
};

export default DumiPluginMermaid;
