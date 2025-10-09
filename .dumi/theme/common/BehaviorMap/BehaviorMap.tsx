import React, { useEffect, useRef } from 'react';
import { RightCircleOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { createStyles, css } from 'antd-style';
import { useRouteMeta } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import { renderReactToHTMLString } from '../../../theme/utils/renderReactToHTML';

interface BehaviorMapItem {
  id: string;
  label: string;
  targetType?: 'mvp' | 'extension';
  children?: BehaviorMapItem[];
  link?: string;
  collapsed?: boolean;
  type?: 'behavior-start-node' | 'behavior-sub-node';
}

const dataTransform = (rootData: BehaviorMapItem) => {
  const changeData = (data: BehaviorMapItem, level = 0) => {
    const clonedData: BehaviorMapItem = { ...data };
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
    if (Array.isArray(data.children)) {
      clonedData.children = data.children.map((child) => changeData(child, level + 1));
    }
    return clonedData;
  };
  return changeData(rootData);
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

export interface BehaviorMapProps {
  data: BehaviorMapItem;
}

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { styles } = useStyle();
  const [locale] = useLocale(locales);
  const meta = useRouteMeta();

  useEffect(() => {
    import('@antv/g6').then((G6) => {
      G6.registerNode('behavior-start-node', {
        draw: (cfg, group) => {
          const textWidth = G6.Util.getTextSize(cfg!.label, 16)[0];
          const size = [textWidth + 20 * 2, 48];
          const keyShape = group!.addShape('rect', {
            name: 'start-node',
            attrs: {
              width: size[0],
              height: size[1],
              y: -size[1] / 2,
              radius: 8,
              fill: '#fff',
            },
          });
          group!.addShape('text', {
            attrs: {
              text: `${cfg!.label}`,
              fill: 'rgba(0, 0, 0, 0.88)',
              fontSize: 16,
              fontWeight: 500,
              x: 20,
              textBaseline: 'middle',
            },
            name: 'start-node-text',
          });
          return keyShape;
        },
        getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
      });

      G6.registerNode(
        'behavior-sub-node',
        {
          draw: (cfg, group) => {
            const textWidth = G6.Util.getTextSize(cfg!.label, 14)[0];
            const padding = 16;
            const size = [
              textWidth + 16 * 2 + (cfg!.targetType ? 12 : 0) + (cfg!.link ? 20 : 0),
              40,
            ];
            const keyShape = group!.addShape('rect', {
              name: 'sub-node',
              attrs: {
                width: size[0],
                height: size[1],
                y: -size[1] / 2,
                radius: 8,
                fill: '#fff',
                cursor: 'pointer',
              },
            });
            group!.addShape('text', {
              attrs: {
                text: `${cfg!.label}`,
                x: cfg!.targetType ? 12 + 16 : padding,
                fill: 'rgba(0, 0, 0, 0.88)',
                fontSize: 14,
                textBaseline: 'middle',
                cursor: 'pointer',
              },
              name: 'sub-node-text',
            });
            if (cfg!.targetType) {
              group!.addShape('rect', {
                name: 'sub-node-type',
                attrs: {
                  width: 8,
                  height: 8,
                  radius: 4,
                  y: -4,
                  x: 12,
                  fill: cfg!.targetType === 'mvp' ? '#1677ff' : '#A0A0A0',
                  cursor: 'pointer',
                },
              });
            }
            if (cfg!.children) {
              const { length } = cfg!.children as any;
              group!.addShape('rect', {
                name: 'sub-node-children-length',
                attrs: {
                  width: 20,
                  height: 20,
                  radius: 10,
                  y: -10,
                  x: size[0] - 4,
                  fill: '#404040',
                  cursor: 'pointer',
                },
              });
              group!.addShape('text', {
                name: 'sub-node-children-length-text',
                attrs: {
                  text: `${length}`,
                  x: size[0] + 6 - G6.Util.getTextSize(`${length}`, 12)[0] / 2,
                  textBaseline: 'middle',
                  fill: '#fff',
                  fontSize: 12,
                  cursor: 'pointer',
                },
              });
            }
            if (cfg!.link) {
              group!.addShape('dom', {
                attrs: {
                  width: 16,
                  height: 16,
                  x: size[0] - 12 - 16,
                  y: -8,
                  cursor: 'pointer',
                  // DOM's html
                  html: renderReactToHTMLString(
                    <Flex align="center" justify="center">
                      <RightCircleOutlined style={{ color: '#BFBFBF' }} />
                    </Flex>,
                  ),
                },
                // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
                name: 'sub-node-link',
              });
            }
            return keyShape;
          },
          getAnchorPoints() {
            return [
              [0, 0.5],
              [1, 0.5],
            ];
          },
          options: {
            stateStyles: {
              hover: {
                stroke: '#1677ff',
                'sub-node-link': {
                  html: renderReactToHTMLString(
                    <Flex align="center" justify="center">
                      <RightCircleOutlined style={{ color: '#1677ff' }} />
                    </Flex>,
                  ),
                },
              },
            },
          },
        },
        'rect',
      );
      const graph = new G6.TreeGraph({
        container: ref.current!,
        width: ref.current!.scrollWidth,
        height: ref.current!.scrollHeight,
        renderer: 'svg',
        modes: {
          default: ['collapse-expand', 'drag-canvas'],
        },
        defaultEdge: {
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
          getWidth: (node: any) => G6.Util.getTextSize(node.label, 16)[0] + 20 * 2,
          getVGap: () => 10,
          getHGap: () => 60,
          getSide: (node: any) => node.data.direction,
        },
      });

      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item!, 'hover', true);
      });
      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item!, 'hover', false);
      });
      graph.on('node:click', (e) => {
        const { link } = e.item!.getModel();
        if (link) {
          window.location.hash = link as string;
        }
      });

      graph.data(dataTransform(data));
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
