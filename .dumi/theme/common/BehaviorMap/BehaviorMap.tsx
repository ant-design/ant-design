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
      // Helper function to estimate text width (since G6.Util.getTextSize is no longer available)
      const getTextWidth = (text: string, fontSize: number) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        context.font = `${fontSize}px sans-serif`;
        return context.measureText(text).width;
      };

      // Register custom start node
      G6.register('node', 'behavior-start-node', G6.BaseNode, {
        draw(model: any, shapeMap: any) {
          const { data } = model;
          const group = shapeMap.getContainer();
          const textWidth = getTextWidth(data.label || '', 16);
          const size = [textWidth + 40, 48];

          // Main rectangle
          const rect = group.appendChild({
            tag: 'rect',
            style: {
              width: size[0],
              height: size[1],
              x: -size[0] / 2,
              y: -size[1] / 2,
              fill: '#fff',
              stroke: 'transparent',
              radius: 8,
            },
          });

          // Label text
          group.appendChild({
            tag: 'text',
            style: {
              text: data.label || '',
              fill: 'rgba(0, 0, 0, 0.88)',
              fontSize: 16,
              fontWeight: 500,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          });

          return rect;
        },
        getAnchorPoints() {
          return [[0, 0.5], [1, 0.5]];
        },
      });

      // Register custom sub node
      G6.register('node', 'behavior-sub-node', G6.BaseNode, {
        draw(model: any, shapeMap: any) {
          const { data } = model;
          const group = shapeMap.getContainer();
          const textWidth = getTextWidth(data.label || '', 14);
          const padding = 16;
          const size = [
            textWidth + 32 + (data.targetType ? 12 : 0) + (data.link ? 20 : 0),
            40,
          ];

          // Main rectangle
          const rect = group.appendChild({
            tag: 'rect',
            style: {
              width: size[0],
              height: size[1],
              x: -size[0] / 2,
              y: -size[1] / 2,
              fill: '#fff',
              stroke: 'transparent',
              radius: 8,
              cursor: 'pointer',
            },
          });

          // Label text
          group.appendChild({
            tag: 'text',
            style: {
              text: data.label || '',
              x: data.targetType ? 12 + padding - size[0] / 2 : padding - size[0] / 2,
              fill: 'rgba(0, 0, 0, 0.88)',
              fontSize: 14,
              textBaseline: 'middle',
              cursor: 'pointer',
            },
          });

          // Target type indicator
          if (data.targetType) {
            group.appendChild({
              tag: 'rect',
              style: {
                width: 8,
                height: 8,
                x: 12 - size[0] / 2,
                y: -4,
                fill: data.targetType === 'mvp' ? '#1677ff' : '#A0A0A0',
                radius: 4,
                cursor: 'pointer',
              },
            });
          }

          // Children count badge
          if (data.children) {
            const length = Array.isArray(data.children) ? data.children.length : 0;
            group.appendChild({
              tag: 'rect',
              style: {
                width: 20,
                height: 20,
                x: size[0] / 2 - 4,
                y: -10,
                fill: '#404040',
                radius: 10,
                cursor: 'pointer',
              },
            });

            const countTextWidth = getTextWidth(String(length), 12);
            group.appendChild({
              tag: 'text',
              style: {
                text: String(length),
                x: size[0] / 2 + 6 - countTextWidth / 2,
                textBaseline: 'middle',
                fill: '#fff',
                fontSize: 12,
                cursor: 'pointer',
              },
            });
          }

          return rect;
        },
        getAnchorPoints() {
          return [[0, 0.5], [1, 0.5]];
        },
      });

      // Create graph with G6 v5
      const graph = new G6.Graph({
        container: ref.current!,
        width: ref.current!.scrollWidth,
        height: ref.current!.scrollHeight,
        renderer: 'svg',
        data: dataTransform(data),
        node: {
          type: (data: any) => data.type || 'behavior-sub-node',
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
          getHeight: () => 48,
          getWidth: (node: any) => {
            const textWidth = getTextWidth(node.id || '', 16);
            return textWidth + 40;
          },
          getVGap: () => 10,
          getHGap: () => 60,
          getSide: (node: any) => node.data?.direction,
        },
        behaviors: ['collapse-expand', 'drag-canvas'],
      });

      // Event handlers
      graph.on('node:pointerenter', (e: any) => {
        const nodeId = e.itemId || e.target?.id;
        if (nodeId) {
          graph.setItemState(nodeId, 'hover', true);
        }
      });
      
      graph.on('node:pointerleave', (e: any) => {
        const nodeId = e.itemId || e.target?.id;
        if (nodeId) {
          graph.setItemState(nodeId, 'hover', false);
        }
      });
      
      graph.on('node:click', (e: any) => {
        const nodeId = e.itemId || e.target?.id;
        if (nodeId) {
          const nodeData = graph.getNodeData(nodeId);
          if (nodeData?.link) {
            window.location.hash = nodeData.link as string;
          }
        }
      });

      graph.render();
      graph.fitCenter();
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
