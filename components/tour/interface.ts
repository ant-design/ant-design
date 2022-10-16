import type React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { TourProps as RCTourProps, TourStepInfo } from '../../../tour/src/index';

export interface TourStepProps extends TourStepInfo {
  cover?: ReactNode; // 展示的图片或者视频
  title: ReactNode; // 标题
  description?: ReactNode; //	主要描述部分
  nextButtonProps?: { children?: ReactNode; onClick?: () => void };
  prevButtonProps?: { children?: ReactNode; onClick?: () => void };
  finishButtonProps?: { children?: ReactNode; onClick?: () => void };
  renderStep?: (current: number) => ReactNode;
  renderPanel?: () => ReactNode;
  style?: CSSProperties;
}

export interface TourProps extends RCTourProps {
  steps: TourStepProps[];
  className?: string;
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
}

export type CompoundedComponent = React.ForwardRefExoticComponent<
  TourProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>
>;
