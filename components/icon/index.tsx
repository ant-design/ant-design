import * as React from 'react';

export interface IconProps {
  type: string;
  className?: string;
  onClick?: (e) => void;
}

export default (props: IconProps) => {
  const { type, className = '' } = props;
  return <i {...props} className={`${className} anticon anticon-${type}`.trim()} />;
};
