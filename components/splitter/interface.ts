import type { Orientation, SemanticType } from '../_util/hooks';
import type { ShowCollapsibleIconMode } from './SplitBar';

export type SplitterSemanticType = {
  classNames: {
    root?: string;
    panel?: string;
    dragger?: {
      default?: string;
      active?: string;
    };
  };
  styles: {
    root?: React.CSSProperties;
    panel?: React.CSSProperties;
    dragger?: {
      default?: React.CSSProperties;
      active?: React.CSSProperties;
    };
  };
};

export interface SplitterSemanticDraggerClassNames {
  default?: string;
  active?: string;
}

export type SplitterClassNamesType = SemanticType<
  SplitterProps,
  SplitterSemanticType['classNames']
>;

export type SplitterStylesType = SemanticType<SplitterProps, SplitterSemanticType['styles']>;

export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  classNames?: SplitterClassNamesType;
  style?: React.CSSProperties;
  styles?: SplitterStylesType;
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

export interface UseHandleProps extends Pick<
  SplitterProps,
  'layout' | 'onResizeStart' | 'onResizeEnd'
> {
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
