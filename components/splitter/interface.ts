export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  rootClassName?: string;
  layout?: 'horizontal' | 'vertical';
  onResizeStart?: (sizes: number[], index: number) => void;
  onResize?: (sizes: number[], index: number) => void;
  onResizeEnd?: (sizes: number[], index: number) => void;
}

export interface SplitBarProps extends Pick<PanelProps, 'resizable' | 'collapsible'> {
  prefixCls: string;
  index: number;
  size?: number;
}

export interface PanelProps {
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

export interface InternalPanelProps extends PanelProps {
  prefixCls?: string;
  className?: string;
  gutter?: number;
}

export interface UseResizeProps extends Pick<SplitterProps, 'layout' | 'onResize'> {
  panelsRef: React.RefObject<(HTMLDivElement | null)[]>;
  gutter: number;
  gutterCount: number;
  items: PanelProps[];
  isRTL: boolean;
  basicsData: number[];
  setBasicsState: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface UseResize {
  setSize: (size: number, index: number) => void;
  setOffset: (offset: number, containerSize: number, index: number) => void;
}

export interface UseMoveProps
  extends Pick<SplitterProps, 'layout' | 'onResizeStart' | 'onResizeEnd'> {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  basicsState: SplitterContextType['basicsState'];
  gutterCount: number;
  setOffset: SplitterContextType['setOffset'];
  setResizing: SplitterContextType['setResizing'];
}

export interface UseMove {
  onStart: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

export interface SplitterContextType {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  panelsRef?: React.MutableRefObject<(HTMLDivElement | null)[]>;
  gutterCount: number;

  isRTL: boolean;
  layout: SplitterProps['layout'];
  resizing: boolean;
  basicsState: number[];

  setSize?: UseResize['setSize'];
  setOffset?: UseResize['setOffset'];
  setResizing?: React.Dispatch<React.SetStateAction<boolean>>;
  onResizeStart?: SplitterProps['onResizeStart'];
  onResizeEnd?: SplitterProps['onResizeEnd'];
}
