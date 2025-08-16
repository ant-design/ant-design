import React, { useEffect, useRef } from 'react';
import { createStyles, css } from 'antd-style';
import { useRouteMeta } from 'dumi';

import useLocale from '../../../hooks/useLocale';

const dataTransform = (data: BehaviorMapItem) => {
  const nodes: any[] = [];
  const edges: any[] = [];
  
  const traverse = (d: any, level = 0, parentId?: string) => {
    const nodeType = level === 0 ? 'behavior-start-node' : 'behavior-sub-node';
    const node = {
      id: d.id,
      data: {
        label: d.label,
        targetType: d.targetType,
        children: d.children,
        link: d.link,
        nodeType, // Store the node type in data
      },
      style: {
        x: level * 200 + 100,
        y: nodes.length * 60 + 100,
      },
    };
    nodes.push(node);
    
    if (parentId) {
      edges.push({
        id: `${parentId}-${d.id}`,
        source: parentId,
        target: d.id,
      });
    }
    
    if (d.children && Array.isArray(d.children)) {
      d.children.forEach((child: any) => {
        traverse(child, level + 1, d.id);
      });
    }
  };
  
  traverse(data);
  return { nodes, edges };
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
    import('@antv/g6').then((G6Module) => {
      console.log('G6 loaded successfully', G6Module);
      
      // Import G6 v5 components
      const { Graph, register, Rect, ExtensionCategory, treeToGraphData } = G6Module;
      
      console.log('G6 components:', { Graph, register, Rect, ExtensionCategory, treeToGraphData });
      
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
          console.log('BehaviorStartNode render called', { attributes, container });
          // Render basic rectangle first
          super.render(attributes, container);
          
          // Get node data
          const nodeData = this.context.graph.getNodeData(this.id);
          const data = nodeData?.data || {};
          
          console.log('BehaviorStartNode data:', data);
          
          // Add label text
          this.upsert('label', 'text', {
            x: 0,
            y: 0,
            text: data.label || '',
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
          console.log('BehaviorSubNode render called', { attributes, container });
          // Render basic rectangle first
          super.render(attributes, container);
          
          // Get node data
          const nodeData = this.context.graph.getNodeData(this.id);
          const data = nodeData?.data || {};
          
          console.log('BehaviorSubNode data:', data);
          
          // Calculate text width for positioning
          const textWidth = getTextWidth(data.label || '', 14);
          const width = textWidth + 32 + (data.targetType ? 12 : 0) + (data.children ? 20 : 0);
          
          // Add target type indicator
          if (data.targetType) {
            this.upsert('target-type', 'circle', {
              cx: 12 - width / 2,
              cy: 0,
              r: 4,
              fill: data.targetType === 'mvp' ? '#1677ff' : '#A0A0A0',
            }, container);
          }
          
          // Add label text
          this.upsert('label', 'text', {
            x: data.targetType ? 12 + 16 - width / 2 : 16 - width / 2,
            y: 0,
            text: data.label || '',
            fill: 'rgba(0, 0, 0, 0.88)',
            fontSize: 14,
            textBaseline: 'middle',
            textAlign: 'left',
          }, container);

          // Add children count badge
          if (data.children && Array.isArray(data.children)) {
            const length = data.children.length;
            
            this.upsert('badge', 'circle', {
              cx: width / 2 - 4,
              cy: -10,
              r: 10,
              fill: '#404040',
            }, container);

            this.upsert('badge-text', 'text', {
              x: width / 2 - 4,
              y: -10,
              text: String(length),
              textBaseline: 'middle',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 12,
            }, container);
          }
        }
      }

      // Register custom nodes
      try {
        register(ExtensionCategory.NODE, 'behavior-start-node', BehaviorStartNode);
        register(ExtensionCategory.NODE, 'behavior-sub-node', BehaviorSubNode);
        console.log('Custom nodes registered successfully');
      } catch (error) {
        console.error('Failed to register custom nodes:', error);
      }

      // Transform hierarchical data to G6 format using treeToGraphData if available
      let transformedData;
      try {
        if (treeToGraphData) {
          transformedData = treeToGraphData(data);
          console.log('Used treeToGraphData, result:', transformedData);
        } else {
          // Fallback to our manual transformation
          transformedData = dataTransform(data);
          console.log('Used manual transformation, result:', transformedData);
        }
      } catch (error) {
        console.error('Data transformation failed:', error);
        transformedData = dataTransform(data);
      }

      // Create graph
      const graph = new Graph({
        container: ref.current!,
        width: ref.current!.scrollWidth,
        height: ref.current!.scrollHeight,
        data: transformedData,
        node: {
          type: (d: any) => {
            // For treeToGraphData result, check depth. For manual, check nodeType
            if (d.depth === 0 || d.data?.nodeType === 'behavior-start-node') {
              return 'behavior-start-node';
            }
            return 'behavior-sub-node';
          },
          style: {
            size: (d: any) => {
              const nodeData = d.data || {};
              const isStartNode = d.depth === 0 || nodeData.nodeType === 'behavior-start-node';
              const textWidth = getTextWidth(nodeData.label || '', isStartNode ? 16 : 14);
              const width = textWidth + 40 + (nodeData.targetType ? 12 : 0) + (nodeData.children ? 20 : 0);
              const height = isStartNode ? 48 : 40;
              return [width, height];
            },
            fill: '#fff',
            stroke: 'transparent',
            radius: 8,
            cursor: 'pointer',
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
          getHeight: (node: any) => {
            const nodeData = node.data || {};
            const isStartNode = node.depth === 0 || nodeData.nodeType === 'behavior-start-node';
            return isStartNode ? 48 : 40;
          },
          getWidth: (node: any) => {
            const nodeData = node.data || {};
            const isStartNode = node.depth === 0 || nodeData.nodeType === 'behavior-start-node';
            const textWidth = getTextWidth(nodeData.label || '', isStartNode ? 16 : 14);
            return textWidth + 40 + (nodeData.targetType ? 12 : 0) + (nodeData.children ? 20 : 0);
          },
          getVGap: () => 10,
          getHGap: () => 60,
        },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      });

      console.log('Graph created:', graph);

      // Event handlers
      graph.on('node:pointerenter', (e: any) => {
        const nodeId = e.target.id;
        if (nodeId) {
          graph.setElementState(nodeId, ['hover']);
        }
      });
      
      graph.on('node:pointerleave', (e: any) => {
        const nodeId = e.target.id;
        if (nodeId) {
          graph.setElementState(nodeId, []);
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

      try {
        graph.render();
        console.log('Graph rendered successfully');
        graph.fitCenter();
        console.log('Graph fit to center');
      } catch (error) {
        console.error('Failed to render graph:', error);
      }
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
