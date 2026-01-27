import React, { useEffect, useRef } from 'react';
import { createStaticStyles } from 'antd-style';
import { useRouteMeta } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import { useMermaidCode } from './useMermaidCode';

export interface BehaviorMapItem {
  id: string;
  label: string;
  targetType?: 'mvp' | 'extension';
  children?: BehaviorMapItem[];
  link?: string;
}

export interface BehaviorMapProps {
  data: BehaviorMapItem;
}

const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    width: 100%;
    min-height: 600px;
    height: fit-content;
    background-color: ${cssVar.colorBgLayout};
    border: 1px solid #e8e8e8;
    border-radius: ${cssVar.borderRadiusLG};
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  chartContainer: css`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    > svg {
      margin: auto;
    }
  `,
  title: css`
    position: absolute;
    top: 20px;
    inset-inline-start: 20px;
    font-size: ${cssVar.fontSizeLG};
    z-index: 10;
  `,
  tips: css`
    display: flex;
    position: absolute;
    bottom: 20px;
    inset-inline-end: 20px;
    z-index: 10;
    border-radius: 4px;
    font-size: ${cssVar.fontSize};
  `,
  mvp: css`
    margin-inline-end: ${cssVar.marginMD};
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${cssVar.marginXS};
      background-color: rgb(22, 119, 255);
      border-radius: 50%;
      content: '';
    }
  `,
  extension: css`
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${cssVar.marginXS};
      background-color: rgb(160, 160, 160);
      border-radius: 50%;
      content: '';
    }
  `,
}));

const locales = {
  cn: {
    MVPPurpose: 'MVP 行为目的',
    extensionPurpose: '拓展行为目的',
    behaviorMap: '行为模式地图',
  },
  en: {
    MVPPurpose: 'MVP behavior purpose',
    extensionPurpose: 'Extension behavior purpose',
    behaviorMap: 'Behavior Map',
  },
};

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [locale] = useLocale(locales);
  const meta = useRouteMeta();

  const mermaidCode = useMermaidCode(data);

  const cancelledRef = useRef<boolean>(false);

  useEffect(() => {
    cancelledRef.current = false;

    const renderChart = async () => {
      if (!chartRef.current || !mermaidCode) {
        return;
      }

      try {
        const mermaid = (await import('mermaid')).default;

        if (cancelledRef.current) {
          return;
        }

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'strict',
          flowchart: {
            htmlLabels: true,
            curve: 'linear',
            rankSpacing: 150,
            nodeSpacing: 10,
          },
        });

        const id = `mermaid-${Date.now()}`;

        const { svg } = await mermaid.render(id, mermaidCode);

        if (!cancelledRef.current && chartRef.current) {
          chartRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelledRef.current && chartRef.current) {
          chartRef.current.innerHTML = 'Render Error';
        }
      }
    };

    renderChart();

    return () => {
      cancelledRef.current = true;
    };
  }, [mermaidCode]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{`${meta.frontmatter.title} ${locale.behaviorMap}`}</div>
      <div ref={chartRef} className={styles.chartContainer} />
      <div className={styles.tips}>
        <div className={styles.mvp}>{locale.MVPPurpose}</div>
        <div className={styles.extension}>{locale.extensionPurpose}</div>
      </div>
    </div>
  );
};

export default BehaviorMap;
