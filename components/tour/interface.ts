import type { ReactNode } from 'react';
import type {
  TourProps as RCTourProps,
  TourStepProps as RCTourStepProps,
} from '@rc-component/tour';

import type {
  SemanticClassNames,
  SemanticClassNamesType,
  SemanticStyles,
  SemanticStylesType,
} from '../_util/hooks';

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

export type TourClassNamesType = SemanticClassNamesType<TourProps, TourSemanticName>;
export type TourStylesType = SemanticStylesType<TourProps, TourSemanticName>;

export interface TourProps extends Omit<RCTourProps, 'renderPanel' | 'classNames' | 'styles'> {
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
  classNames?: SemanticClassNames<TourSemanticName>;
  styles?: SemanticStyles<TourSemanticName>;
}

export interface TourLocale {
  Next: string;
  Previous: string;
  Finish: string;
}
