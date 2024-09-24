import React, { useEffect, useRef } from 'react';
import { createStyles, css } from 'antd-style';
import { useRouteMeta } from 'dumi';
import { getG6Instance } from './initG6';

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

export type BehaviorMapProps = {
  data: BehaviorMapItem;
};

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { styles } = useStyle();
  const meta = useRouteMeta();

  useEffect(() => {
    (async () => {
      const G6 = await getG6Instance();
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
    })();
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
