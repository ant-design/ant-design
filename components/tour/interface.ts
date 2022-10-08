import type React from 'react';
import type {ReactNode} from 'react';
import type {TourProps  as RCTour} from '../../../tour/src/index';

export type TourType = 'default' | 'primary';

export type TourShape = 'circle' | 'square';



export interface TourProps extends RCTour{
  type?: 'default' | 'primary'; //	default	类型，影响底色与文字颜色
  nextButtonProps?: { children?: ReactNode; onClick?: () => void }; //	{ children: '下一步' }	下一步按钮的属性
  prevButtonProps?: { children?: ReactNode; onClick?: () => void }; //	{ children: '上一步' }	上一步按钮的属性
  finishButtonProps?: { children?: ReactNode; onClick?: () => void }; //	{ children: '上一步' }	上一步按钮的属性
}

export interface TourContentProps extends React.DOMAttributes<HTMLDivElement> {
  className?: string;
  icon?: TourProps['icon'];
  description?: TourProps['description'];
  prefixCls: TourProps['prefixCls'];
}

export type CompoundedComponent = React.ForwardRefExoticComponent<
  TourProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>
>;
