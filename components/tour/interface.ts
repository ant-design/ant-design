import type { ReactNode } from 'react';
import type {
  TourProps as RCTourProps,
  TourStepProps as RCTourStepProps,
} from '@rc-component/tour';

import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';

export type TourSemanticName = keyof TourSemanticClassNames & keyof TourSemanticStyles;

export type TourSemanticClassNames = {
  root?: string;
  cover?: string;
  mask?: string;
  section?: string;
  footer?: string;
  actions?: string;
  indicator?: string;
  indicators?: string;
  header?: string;
  title?: string;
  description?: string;
};

export type TourSemanticStyles = {
  root?: React.CSSProperties;
  cover?: React.CSSProperties;
  mask?: React.CSSProperties;
  section?: React.CSSProperties;
  footer?: React.CSSProperties;
  actions?: React.CSSProperties;
  indicator?: React.CSSProperties;
  indicators?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
};

export type TourClassNamesType = SemanticClassNamesType<TourProps, TourSemanticClassNames>;

export type TourStylesType = SemanticStylesType<TourProps, TourSemanticStyles>;

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
  classNames?: TourSemanticClassNames;
  styles?: TourSemanticStyles;
}

export interface TourLocale {
  Next: string;
  Previous: string;
  Finish: string;
}
