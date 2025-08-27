import React, { useEffect, useRef } from 'react';
import { createStyles, css } from 'antd-style';
import { useRouteMeta } from 'dumi';

import useLocale from '../../../hooks/useLocale';

const dataTransform = (data: BehaviorMapItem) => {
  const changeData = (d: any, level = 0) => {
    const clonedData: any = { ...d };
    switch (level) {
      case 0:
        clonedData.type = 'behavior-start-node';
        break;
      case 1:
        clonedData.type = 'behavior-sub-node';
        clonedData.collapsed = true;
        break;
      default:
        clonedData.type = 'behavior-sub-node';
        break;
    }

    if (d.children) {
      clonedData.children = d.children.map((child: any) => changeData(child, level + 1));
    }
    return clonedData;
  };
  return changeData(data);
};

type BehaviorMapItem = {
  id: string;
  label: string;
  targetType?: 'mvp' | 'extension';
  children?: BehaviorMapItem[];
  link?: string;
};

const useStyle = createStyles(({ token }) => ({
  container: css`
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: ${token.borderRadiusLG}px;
    overflow: hidden;
    position: relative;
  `,
  title: css`
    position: absolute;
    top: 20px;
    inset-inline-start: 20px;
    font-size: ${token.fontSizeLG}px;
  `,
  tips: css`
    display: flex;
    position: absolute;
    bottom: 20px;
    inset-inline-end: 20px;
  `,
  mvp: css`
    margin-inline-end: ${token.marginMD}px;
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${token.marginXS}px;
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
      margin-inline-end: ${token.marginXS}px;
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

export type BehaviorMapProps = {
  data: BehaviorMapItem;
};

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { styles } = useStyle();
  const [locale] = useLocale(locales);
  const meta = useRouteMeta();

  useEffect(() => {
    import('@antv/g6').then((G6) => {
      const { Graph, register, ExtensionCategory, Rect, treeToGraphData } = G6;
      
      // Helper function to estimate text width
      const getTextWidth = (text: string, fontSize: number) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        context.font = `${fontSize}px sans-serif`;
        return context.measureText(text).width;
      };

      // Custom Start Node extending Rect
      class BehaviorStartNode extends Rect {
        render(attributes: any, container: any) {
          const { labelText } = attributes;
          const textWidth = getTextWidth(labelText || this.id, 16);
          const width = textWidth + 40;
          const height = 48;
          
          // Render rectangle background
          this.upsert('background', 'rect', {
            x: -width / 2,
            y: -height / 2,
            width,
            height,
            fill: '#fff',
            stroke: '#e8e8e8',
            lineWidth: 1,
            radius: 8,
          }, container);
          
          // Add label text
          this.upsert('label', 'text', {
            x: 0,
            y: 0,
            text: labelText || this.id,
            fill: 'rgba(0, 0, 0, 0.88)',
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            textBaseline: 'middle',
          }, container);
        }
      }

      // Custom Sub Node extending Rect
      class BehaviorSubNode extends Rect {
        render(attributes: any, container: any) {
          const { labelText, targetType, childrenCount } = attributes;
          const textWidth = getTextWidth(labelText || this.id, 14);
          const padding = 16;
          const width = textWidth + 32 + (targetType ? 12 : 0) + (childrenCount > 0 ? 20 : 0);
          const height = 40;
          
          // Render rectangle background
          this.upsert('background', 'rect', {
            x: -width / 2,
            y: -height / 2,
            width,
            height,
            fill: '#fff',
            stroke: '#e8e8e8',
            lineWidth: 1,
            radius: 8,
          }, container);
          
          // Add target type indicator
          if (targetType) {
            this.upsert('target-type', 'rect', {
              x: -width / 2 + 12,
              y: -4,
              width: 8,
              height: 8,
              radius: 4,
              fill: targetType === 'mvp' ? '#1677ff' : '#A0A0A0',
            }, container);
          }
          
          // Add label text
          this.upsert('label', 'text', {
            x: targetType ? -width / 2 + 28 : -width / 2 + padding,
            y: 0,
            text: labelText || this.id,
            fill: 'rgba(0, 0, 0, 0.88)',
            fontSize: 14,
            textBaseline: 'middle',
            textAlign: 'left',
          }, container);

          // Add children count badge
          if (childrenCount > 0) {
            this.upsert('badge', 'rect', {
              x: width / 2 - 14,
              y: -10,
              width: 20,
              height: 20,
              radius: 10,
              fill: '#404040',
            }, container);

            this.upsert('badge-text', 'text', {
              x: width / 2 - 4,
              y: 0,
              text: String(childrenCount),
              textBaseline: 'middle',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 12,
            }, container);
          }
        }
      }

      // Register custom nodes
      register(ExtensionCategory.NODE, 'behavior-start-node', BehaviorStartNode);
      register(ExtensionCategory.NODE, 'behavior-sub-node', BehaviorSubNode);

      // Transform data to G6 v5 format
      const graphData = treeToGraphData(dataTransform(data));

      // Create graph
      const graph = new Graph({
        container: ref.current!,
        width: ref.current!.scrollWidth,
        height: ref.current!.scrollHeight,
        data: graphData,
        node: {
          type: (d: any) => {
            return d.depth === 0 ? 'behavior-start-node' : 'behavior-sub-node';
          },
          style: {
            labelText: (d: any) => d.data?.label || d.id,
            targetType: (d: any) => d.data?.targetType,
            childrenCount: (d: any) => d.data?.children ? d.data.children.length : 0,
          },
          state: {
            hover: {
              stroke: '#1677ff',
              lineWidth: 2,
            },
          },
        },
        edge: {
          type: 'cubic-horizontal',
          style: {
            lineWidth: 1,
            stroke: '#BFBFBF',
          },
        },
        layout: {
          type: 'mindmap',
          direction: 'LR',
          getHeight: (node: any) => node.depth === 0 ? 48 : 40,
          getWidth: (node: any) => {
            const labelText = node.data?.label || node.id || '';
            const textWidth = getTextWidth(labelText, node.depth === 0 ? 16 : 14);
            const targetType = node.data?.targetType;
            const childrenCount = node.data?.children ? node.data.children.length : 0;
            return Math.max(80, textWidth + 40 + (targetType ? 12 : 0) + (childrenCount > 0 ? 20 : 0));
          },
          getVGap: () => 10,
          getHGap: () => 60,
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand'],
      });

      // Event handlers
      graph.on('node:pointerenter', (e: any) => {
        const nodeId = e.target.id;
        if (nodeId) {
          graph.setElementState(nodeId, 'hover', true);
        }
      });
      
      graph.on('node:pointerleave', (e: any) => {
        const nodeId = e.target.id;
        if (nodeId) {
          graph.setElementState(nodeId, 'hover', false);
        }
      });
      
      graph.on('node:click', (e: any) => {
        const nodeId = e.target.id;
        if (nodeId) {
          const nodeData = graph.getNodeData(nodeId);
          if (nodeData?.data?.link) {
            window.location.hash = nodeData.data.link as string;
          }
        }
      });

      graph.render();
      graph.fitCenter();
    }).catch((error) => {
      console.error('Failed to load G6:', error);
    });
  }, []);

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.title}>{`${meta.frontmatter.title} ${locale.behaviorMap}`}</div>
      <div className={styles.tips}>
        <div className={styles.mvp}>{locale.MVPPurpose}</div>
        <div className={styles.extension}>{locale.extensionPurpose}</div>
      </div>
    </div>
  );
};

export default BehaviorMap;
