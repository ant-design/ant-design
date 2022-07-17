import classNames from 'classnames';
import * as React from 'react';
import type { ReactNode } from 'react';
import Tooltip from '../tooltip';
import type { TooltipProps } from '../tooltip';
import Popconfirm from '../popconfirm';
import type { PopconfirmProps } from '../popconfirm';
import Popover from '../popover';
import type { PopoverProps } from '../popover';

export interface OmitTextProps {
  width?: number | string;
  children?: ReactNode;
  className?: string;
  type?: string;
  tooltipProps?: Omit<TooltipProps, 'title'> | Omit<PopconfirmProps,'title'> | Omit<PopoverProps,'content'>;
}
const OmitTextChildren = (props: Omit<OmitTextProps, 'TooltipProps'>) => {
  const { width = 120, className, children, ...rest } = props;
  return (
    <div className={classNames('ant-omit-text', className)} style={{ maxWidth: width }} {...rest}>
      {children}
    </div>
  );
};
const OmitText = (props: OmitTextProps) => {
  const { type = 'tooltip', tooltipProps, ...rest } = props;
  if(['tooltip','confirm','popover'].indexOf(type.toLowerCase()) === -1){
    return null
  }
    
  if(type.toLowerCase() === 'confirm') {
    return (
      <Popconfirm title={rest.children} {...tooltipProps}>
        <OmitTextChildren {...rest} />
      </Popconfirm>
    )
  }
  if(type.toLowerCase() === 'popover'){
    return (
      <Popover content={rest.children} {...tooltipProps}>
        <OmitTextChildren {...rest} />
      </Popover>
    )
  }
  return (
    <Tooltip title={rest.children} {...tooltipProps}>
      <OmitTextChildren {...rest} />
    </Tooltip>
  );
};


export default OmitText;
