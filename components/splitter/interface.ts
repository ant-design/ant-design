import type { Orientation } from '../_util/hooks/useOrientation';

// ================ outside ================
export interface SplitterSemanticDraggerClassNames {
  default?: string;
  active?: string;
}

export interface SplitterSemanticClassNames {
  root?: string;
  panel?: string;
  dragger: string | SplitterSemanticDraggerClassNames;
}

export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  classNames?: SplitterSemanticClassNames;
  style?: React.CSSProperties;
  styles?: Partial<Record<keyof SplitterSemanticClassNames, React.CSSProperties>>;
  rootClassName?: string;
  /**
   * @deprecated please use orientation
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
  onResizeStart?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  lazy?: boolean;
}

export interface PanelProps {
  className?: string;
  style?: React.CSSProperties;
  min?: number | string;
  max?: number | string;
  size?: number | string;
  collapsible?: boolean | { start?: boolean; end?: boolean };
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
