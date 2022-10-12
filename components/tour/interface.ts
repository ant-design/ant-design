import type React from 'react';
import type { ReactNode } from 'react';
import type {
  TourProps as RCTourProps,
  TourStepProps as RCTourStepProps,
} from '../../../tour/src/index';

export interface TourStepProps extends RCTourStepProps {
  cover?: ReactNode; // 展示的图片或者视频
  title: ReactNode; // 标题
  description?: ReactNode; //	主要描述部分
  nextButtonProps?: { children?: ReactNode; onClick?: () => void };
  prevButtonProps?: { children?: ReactNode; onClick?: () => void };
  finishButtonProps?: { children?: ReactNode; onClick?: () => void };
  renderStep?: (current: number) => ReactNode;
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
  renderPanel: () => ReactNode;
}

export interface TourProps extends RCTourProps {
  steps: TourStepProps[];
  className?: string;
}

export type CompoundedComponent = React.ForwardRefExoticComponent<
  TourProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>
>;
