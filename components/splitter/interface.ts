// ================ outside ================
export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  rootClassName?: string;
  layout?: 'horizontal' | 'vertical';
  transition?: boolean;
  onResizeStart?: (sizes: number[], index: number) => void;
  onResize?: (sizes: number[], index: number) => void;
  onResizeEnd?: (sizes: number[], index: number) => void;
}

export interface PanelProps {
  className?: string;
  style?: React.CSSProperties;
  min?: number | string;
  max?: number | string;
  size?: number | string;
  collapsible?:
    | boolean
    | {
        start?: boolean;
        end?: boolean;
      };
  resizable?: boolean;
}

// ================ inside ================

export interface SplitBarProps extends Pick<PanelProps, 'resizable' | 'collapsible'> {
  index: number;
  prefixCls: string;
}
export interface InternalPanelProps extends PanelProps {
  className?: string;
  last?: boolean;
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

export interface SplitterContextType {
  basicsState: number[];
  reverse: boolean;
  resizing: boolean;
  onStart?: UseHandle['onStart'];
  setSize?: UseResize['setSize'];
}