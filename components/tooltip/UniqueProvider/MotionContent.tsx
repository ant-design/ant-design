import React from 'react';
import CSSMotion from '@rc-component/motion';
import classNames from 'classnames';

import { ConfigContext } from '../../config-provider/context';

const MotionContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();

  // This will never reach since we will not render this when no children
  /* istanbul ignore next */
  if (
    !React.isValidElement<{
      className?: string;
      style?: React.CSSProperties;
    }>(children)
  ) {
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
        const { className, style } = children.props;

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
