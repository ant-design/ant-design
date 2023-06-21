import type {
  TourProps as RCTourProps,
  TourStepProps as RCTourStepProps,
} from '@rc-component/tour';
import type { ReactNode } from 'react';

export interface TourProps extends Omit<RCTourProps, 'renderPanel'> {
  steps?: TourStepProps[];
  className?: string;
  prefixCls?: string;
  current?: number;
  indicatorsRender?: (current: number, total: number) => ReactNode;
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
}

export interface TourStepProps extends RCTourStepProps {
  cover?: ReactNode; // 展示的图片或者视频
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
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
}

export interface TourLocale {
  Next: string;
  Previous: string;
  Finish: string;
}
