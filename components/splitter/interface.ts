import type { Orientation } from '../_util/hooks';
import type { GenerateSemantic } from '../_util/hooks/semanticType';
import type { ShowCollapsibleIconMode } from './SplitBar';

export type SplitterSemanticType = {
  classNames?: {
    root?: string;
    panel?: string;
    dragger?: string | { default?: string; active?: string };
  };
  styles?: {
    root?: React.CSSProperties;
    panel?: React.CSSProperties;
    // remove React.CSSProperties
    dragger?: { default?: React.CSSProperties; active?: React.CSSProperties };
  };
};

export type SplitterSemanticAllType = GenerateSemantic<SplitterSemanticType, SplitterProps>;

export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  classNames?: SplitterSemanticAllType['classNames'] | SplitterSemanticAllType['classNamesFn'];
  style?: React.CSSProperties;
  styles?: SplitterSemanticAllType['styles'] | SplitterSemanticAllType['stylesFn'];
  rootClassName?: string;
  /**
   * @deprecated please use `orientation`
   * @default horizontal
   */
  layout?: Orientation;
  orientation?: Orientation;
  vertical?: boolean;
  draggerIcon?: React.ReactNode;
  collapsibleIcon?: {
    start?: React.ReactNode;
    end?: React.ReactNode;
  };
  onDraggerDoubleClick?: (index: number) => void;
  onResizeStart?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  onCollapse?: (collapsed: boolean[], sizes: number[]) => void;
  lazy?: boolean;
}

export interface PanelProps {
  className?: string;
  style?: React.CSSProperties;
  min?: number | string;
  max?: number | string;
  size?: number | string;
  collapsible?:
    | boolean
    | { start?: boolean; end?: boolean; showCollapsibleIcon?: ShowCollapsibleIconMode };
  resizable?: boolean;
  defaultSize?: number | string;
}

// ================ inside ================

export interface InternalPanelProps extends PanelProps {
  className?: string;
  prefixCls?: string;
}

export interface UseResizeProps extends Pick<SplitterProps, 'onResize'> {
  basicsState: number[];
  items: PanelProps[];
  panelsRef: React.RefObject<(HTMLDivElement | null)[]>;
  reverse: boolean;
  setBasicsState: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface UseResize {
  setSize: (data: { size: number; index: number }[]) => void;
  setOffset: (offset: number, containerSize: number, index: number) => void;
}

export interface UseHandleProps
  extends Pick<SplitterProps, 'layout' | 'onResizeStart' | 'onResizeEnd'> {
  basicsState: number[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
  setOffset: UseResize['setOffset'];
  setResizing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseHandle {
  onStart: (x: number, y: number, index: number) => void;
}

export interface UseCollapsibleProps {
  basicsState: number[];
  collapsible?: PanelProps['collapsible'];
  index: number;
  reverse: boolean;
  setSize?: UseResize['setSize'];
}

export interface UseCollapsible {
  nextIcon: boolean;
  overlap: boolean;
  previousIcon: boolean;
  onFold: (type: 'previous' | 'next') => void;
  setOldBasics: () => void;
}
