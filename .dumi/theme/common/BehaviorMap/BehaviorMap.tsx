import G6 from '@antv/g6';
import { createStyles, css } from 'antd-style';
import { useRouteMeta } from 'dumi';
import React, { useEffect, useRef } from 'react';

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
      const size = [textWidth + 16 * 2 + (cfg!.targetType ? 12 : 0) + (cfg!.link ? 20 : 0), 40];
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
            html: `
            <div style="width: 16px; height: 16px;">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="DatePicker" transform="translate(-890.000000, -441.000000)" fill-rule="nonzero">
                          <g id="编组-30" transform="translate(288.000000, 354.000000)">
                              <g id="编组-7备份-7" transform="translate(522.000000, 79.000000)">
                                  <g id="right-circle-outlinedd" transform="translate(80.000000, 8.000000)">
                                      <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="16" height="16"></rect>
                                      <path d="M10.4171875,7.8984375 L6.5734375,5.1171875 C6.490625,5.0578125 6.375,5.115625 6.375,5.21875 L6.375,5.9515625 C6.375,6.1109375 6.4515625,6.2625 6.58125,6.35625 L8.853125,8 L6.58125,9.64375 C6.4515625,9.7375 6.375,9.8875 6.375,10.0484375 L6.375,10.78125 C6.375,10.8828125 6.490625,10.9421875 6.5734375,10.8828125 L10.4171875,8.1015625 C10.4859375,8.0515625 10.4859375,7.9484375 10.4171875,7.8984375 Z" id="路径" fill="#BFBFBF"></path>
                                      <path d="M8,1 C4.134375,1 1,4.134375 1,8 C1,11.865625 4.134375,15 8,15 C11.865625,15 15,11.865625 15,8 C15,4.134375 11.865625,1 8,1 Z M8,13.8125 C4.790625,13.8125 2.1875,11.209375 2.1875,8 C2.1875,4.790625 4.790625,2.1875 8,2.1875 C11.209375,2.1875 13.8125,4.790625 13.8125,8 C13.8125,11.209375 11.209375,13.8125 8,13.8125 Z" id="形状" fill="#BFBFBF"></path>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
              </svg>
            </div>
          `,
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
            html: `
            <div style="width: 16px; height: 16px;">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="DatePicker" transform="translate(-890.000000, -441.000000)" fill-rule="nonzero">
                          <g id="编组-30" transform="translate(288.000000, 354.000000)">
                              <g id="编组-7备份-7" transform="translate(522.000000, 79.000000)">
                                  <g id="right-circle-outlinedd" transform="translate(80.000000, 8.000000)">
                                      <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="16" height="16"></rect>
                                      <path d="M10.4171875,7.8984375 L6.5734375,5.1171875 C6.490625,5.0578125 6.375,5.115625 6.375,5.21875 L6.375,5.9515625 C6.375,6.1109375 6.4515625,6.2625 6.58125,6.35625 L8.853125,8 L6.58125,9.64375 C6.4515625,9.7375 6.375,9.8875 6.375,10.0484375 L6.375,10.78125 C6.375,10.8828125 6.490625,10.9421875 6.5734375,10.8828125 L10.4171875,8.1015625 C10.4859375,8.0515625 10.4859375,7.9484375 10.4171875,7.8984375 Z" id="路径" fill="#1677ff"></path>
                                      <path d="M8,1 C4.134375,1 1,4.134375 1,8 C1,11.865625 4.134375,15 8,15 C11.865625,15 15,11.865625 15,8 C15,4.134375 11.865625,1 8,1 Z M8,13.8125 C4.790625,13.8125 2.1875,11.209375 2.1875,8 C2.1875,4.790625 4.790625,2.1875 8,2.1875 C11.209375,2.1875 13.8125,4.790625 13.8125,8 C13.8125,11.209375 11.209375,13.8125 8,13.8125 Z" id="形状" fill="#1677ff"></path>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
              </svg>
            </div>
          `,
          },
        },
      },
    },
  },
  'rect',
);

const dataTransform = (data: BehaviorMapItem) => {
  const changeData = (d: any, level = 0) => {
    const clonedData: any = {
      ...d,
    };
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

const useStyle = createStyles(() => ({
  container: css`
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  `,
  title: css`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 16px;
  `,
  tips: css`
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 20px;
  `,
  mvp: css`
    margin-right: 20px;
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-right: 8px;
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
      margin-right: 8px;
      background-color: #a0a0a0;
      border-radius: 50%;
      content: '';
    }
  `,
}));

export type BehaviorMapProps = {
  data: BehaviorMapItem;
};

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { styles } = useStyle();
  const meta = useRouteMeta();

  useEffect(() => {
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
  }, []);

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.title}>{`${meta.frontmatter.title} 行为模式地图`}</div>
      <div className={styles.tips}>
        <div className={styles.mvp}>MVP 行为目的</div>
        <div className={styles.extension}>拓展行为目的</div>
      </div>
    </div>
  );
};

export default BehaviorMap;
