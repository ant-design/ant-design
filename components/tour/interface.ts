import type { ReactNode } from 'react';
import type {
  TourProps as RCTourProps,
  TourStepProps as RCTourStepProps,
} from '@rc-component/tour';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';

export type TourSemanticName =
  | 'root'
  | 'cover'
  | 'mask'
  | 'section'
  | 'footer'
  | 'actions'
  | 'indicator'
  | 'indicators'
  | 'header'
  | 'title'
  | 'description';

export type TourClassNamesType = SemanticClassNamesType<BaseTourProps, TourSemanticName>;
export type TourStylesType = SemanticStylesType<BaseTourProps, TourSemanticName>;

export interface BaseTourProps {
  steps?: TourStepProps[];
  prefixCls?: string;
  current?: number;
  indicatorsRender?: (current: number, total: number) => ReactNode;
  actionsRender?: TourStepProps['actionsRender'];
  type?: 'default' | 'primary';
  open?: boolean;
  mask?: boolean | { style?: React.CSSProperties; color?: string };
  arrow?: boolean | { pointAtCenter?: boolean };
  placement?: string;
  zIndex?: number;
}

export interface TourProps extends Omit<RCTourProps, 'renderPanel'> {
  steps?: TourStepProps[];
  prefixCls?: string;
  current?: number;
  indicatorsRender?: (current: number, total: number) => ReactNode;
  actionsRender?: TourStepProps['actionsRender'];
  type?: 'default' | 'primary'; //	default type, affects the background color and text color
  classNames?: TourClassNamesType;
  styles?: TourStylesType;
  className?: string;
  style?: React.CSSProperties;
}

export interface TourStepProps extends RCTourStepProps {
  cover?: ReactNode; // Display pictures or videos
  nextButtonProps?: {
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
  };
  prevButtonProps?: {
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
  };
  indicatorsRender?: (current: number, total: number) => ReactNode;
  actionsRender?: (originNode: ReactNode, info: { current: number; total: number }) => ReactNode;
  type?: 'default' | 'primary'; //	default type, affects the background color and text color
  classNames?: Partial<Record<TourSemanticName, string>>;
  styles?: Partial<Record<TourSemanticName, React.CSSProperties>>;
}

export interface TourLocale {
  Next: string;
  Previous: string;
  Finish: string;
}
