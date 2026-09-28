import React from 'react';
import { Image, Segmented } from 'antd';
import { Mermaid, MermaidSource } from 'dumi-plugin-mermaid/component';
import type { MermaidProps } from 'dumi-plugin-mermaid/component';

import useStyles from './style';

type MermaidView = 'preview' | 'code';
type PreviewBackground = 'transparent' | 'container' | 'layout' | 'contrast';

const viewOptions: { label: string; value: MermaidView }[] = [
  { label: 'Preview', value: 'preview' },
  { label: 'Code', value: 'code' },
];

const DumiPluginMermaid: React.FC<MermaidProps> = (props) => {
  const { styles, theme } = useStyles();
  const [view, setView] = React.useState<MermaidView>('preview');
  const [svg, setSvg] = React.useState('');
  const [previewSrc, setPreviewSrc] = React.useState('');
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewBackground, setPreviewBackground] =
    React.useState<PreviewBackground>('transparent');

  const backgroundOptions: { color?: string; label: string; value: PreviewBackground }[] = [
    { label: 'Transparent background', value: 'transparent' },
    { color: theme.colorBgContainer, label: 'Container background', value: 'container' },
    { color: theme.colorBgLayout, label: 'Layout background', value: 'layout' },
    { color: theme.colorTextBase, label: 'Contrast background', value: 'contrast' },
  ];

  const previewMaskStyle: React.CSSProperties =
    previewBackground === 'transparent'
      ? {
        backgroundColor: theme.colorBgContainer,
        backgroundImage: `conic-gradient(${theme.colorFillSecondary} 25%, transparent 25% 50%, ${theme.colorFillSecondary} 50% 75%, transparent 75% 100%)`,
        backgroundSize: '16px 16px',
      }
      : {
        background: backgroundOptions.find(({ value }) => value === previewBackground)?.color,
      };

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
        styles={{ popup: { mask: previewMaskStyle } }}
        preview={{
          open: previewOpen,
          src: previewSrc,
          actionsRender: (originalNode) => (
            <div className={styles.previewActions}>
              <div
                aria-label="Preview background"
                className={styles.backgroundOptions}
                role="group"
              >
                {backgroundOptions.map(({ color, label, value }) => (
                  <button
                    aria-label={label}
                    aria-pressed={previewBackground === value}
                    className={styles.backgroundOption}
                    data-transparent={value === 'transparent'}
                    key={value}
                    style={{ backgroundColor: color }}
                    title={label}
                    type="button"
                    onClick={() => setPreviewBackground(value)}
                  />
                ))}
              </div>
              {originalNode}
            </div>
          ),
          onOpenChange: setPreviewOpen,
        }}
      />
    </div>
  );
};

export default DumiPluginMermaid;
