import React, { useEffect, useMemo, useRef } from 'react';

import { createStyles, css } from 'antd-style';
import { useRouteMeta } from 'dumi';
import mermaid from 'mermaid';

import useLocale from '../../../hooks/useLocale';

interface BehaviorMapItem {
  id: string;
  label: string;
  targetType?: 'mvp' | 'extension';
  children?: BehaviorMapItem[];
  link?: string;
}
}

export interface BehaviorMapProps {
  data: BehaviorMapItem;
}

const useStyle = createStyles(({ cssVar }) => ({
  container: css`
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
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
    font-size: 14px;
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
      background-color: #1677ff;
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
      background-color: #a0a0a0;
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

const generateMermaidCode = (root: BehaviorMapItem): string => {
  const lines: string[] = [];

  lines.push('graph LR');

  lines.push(`classDef baseNode fill:#fff,stroke:none,stroke-width:0px,rx:5,ry:5,font-size:14px`);

  const traverse = (node: BehaviorMapItem, parentId?: string) => {
    const safeId = `node_${node.id.replace(/[^a-z0-9]/gi, '_')}`;
    let labelText = node.label.replace(/"/g, "'");

    if (!parentId) {
      lines.push(`style ${safeId} font-size:16px`);
      labelText = `**${labelText}**`;
    } else if (node.targetType === 'mvp') {
      const blueDot = `<span style="display:inline-block;width:8px;height:8px;background-color:rgb(22, 119, 255);border-radius:50%;margin-right:8px;vertical-align:middle;"></span>`;
      labelText = `${blueDot}${labelText}`;
    } else if (node.targetType === 'extension') {
      const grayDot = `<span style="display:inline-block;width:8px;height:8px;background-color:rgb(160, 160, 160);border-radius:50%;margin-right:8px;vertical-align:middle;"></span>`;
      labelText = `${grayDot}${labelText}`;
    }
    lines.push(`${safeId}["${labelText}"]:::baseNode`);

    if (node.link) {
      lines.push(`click ${safeId} "#${node.link}"`);
    }

    if (parentId) {
      lines.push(`${parentId} --> ${safeId}`);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child, safeId));
    }
  };

  traverse(root);
  return lines.join('\n');
};

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const { styles } = useStyle();
  const [locale] = useLocale(locales);
  const meta = useRouteMeta();

  const mermaidCode = useMemo(() => {
    return generateMermaidCode(data);
  }, [data]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      flowchart: {
        htmlLabels: true,
        curve: 'linear',
        rankSpacing: 150,
        nodeSpacing: 40,
      },
    });

    let isCancelled = false;
    const renderChart = async () => {
      if (chartRef.current && mermaidCode) {
          mermaidChartCounter += 1;
          const id = `mermaid-${Date.now()}-${mermaidChartCounter}`;
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, mermaidCode);
          if (!isCancelled) {
            chartRef.current.innerHTML = svg;
          // Error reporting: use console.error in development, placeholder for production
          if (process.env.NODE_ENV === 'production') {
            // TODO: Integrate with error reporting service, e.g., Sentry
          } else {
            console.error('Mermaid render error:', error);
          }
          // Fallback UI: show a styled, informative, internationalized error message
          chartRef.current.innerHTML = `
            <div style="padding: 16px; color: #d4380d; background: #fffbe6; border-radius: 4px; border: 1px solid #ffe58f;">
              <strong>${locale.renderErrorTitle || 'Failed to render chart.'}</strong>
              <div style="margin-top: 8px;">${locale.renderErrorDesc || 'Please try refreshing the page or contact support.'}</div>
            </div>
          `;
          if (!isCancelled) {
            console.error('Mermaid render error:', error);
            chartRef.current.innerHTML = 'Render Error';
          }
        }
      }
    };

    renderChart();

      <div
        ref={chartRef}
        className={styles.chartContainer}
        role="img"
        aria-label={`${locale.behaviorMap} - ${meta.frontmatter.title}`}
      />
      isCancelled = true;
    };
  }, [mermaidCode]);

  return (
    <div ref={containerRef} className={styles.container}>
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
