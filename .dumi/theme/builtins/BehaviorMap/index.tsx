import type { FC, ReactNode } from 'react';
import G6 from '@antv/g6';
import { useEffect } from 'react';

type BehaviorMapItem = {
  title: ReactNode;
  type?: 'mvp' | 'extension';
  children?: BehaviorMapItem[];
  link?: string;
};

export type BehaviorMapProps = {
  items;
};

const BehaviorMap: FC = () => {
  useEffect(() => {}, []);

  return <div />;
};

export default BehaviorMap;
