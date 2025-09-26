import React from 'react';
import CSSMotion from '@rc-component/motion';
import classNames from 'classnames';

import { ConfigContext } from '../../config-provider/context';

export interface MotionContentProps {
  children?: React.ReactNode;
}

const MotionContent: React.FC<MotionContentProps> = ({ children }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();

  if (!React.isValidElement(children)) {
    return children;
  }

  return (
    <CSSMotion
      visible
      motionName={`${rootPrefixCls}-fade`}
      motionAppear
      motionEnter
      motionLeave={false}
      removeOnLeave={false}
    >
      {({ style: motionStyle, className: motionClassName }) => {
        const { className, style } = (
          children as React.ReactElement<{ className?: string; style?: React.CSSProperties }>
        ).props;

        const mergedClassName = classNames(className, motionClassName);
        const mergedStyles = {
          ...style,
          ...motionStyle,
        };

        return React.cloneElement<any>(children, {
          className: mergedClassName,
          style: mergedStyles,
        });
      }}
    </CSSMotion>
  );
};

export default MotionContent;
