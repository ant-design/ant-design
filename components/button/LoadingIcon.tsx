import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import React, { forwardRef } from 'react';
import IconWrapper from './IconWrapper';

type InnerLoadingIconProps = {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
};

const InnerLoadingIcon = forwardRef<HTMLSpanElement, InnerLoadingIconProps>(
  ({ prefixCls, className, style, iconClassName }, ref) => {
    const mergedIconCls = classNames(`${prefixCls}-loading-icon`, className);

    return (
      <IconWrapper prefixCls={prefixCls} className={mergedIconCls} style={style} ref={ref}>
        <LoadingOutlined className={iconClassName} />
      </IconWrapper>
    );
  },
);

export interface LoadingIconProps {
  prefixCls: string;
  existIcon: boolean;
  loading?: boolean | object;
  className?: string;
  style?: React.CSSProperties;
}

const getCollapsedWidth = (): React.CSSProperties => ({
  width: 0,
  opacity: 0,
  transform: 'scale(0)',
});

const getRealWidth = (node: HTMLElement): React.CSSProperties => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: 'scale(1)',
});

const LoadingIcon: React.FC<LoadingIconProps> = (props) => {
  const { prefixCls, loading, existIcon, className, style } = props;
  const visible = !!loading;

  if (existIcon) {
    return <InnerLoadingIcon prefixCls={prefixCls} className={className} style={style} />;
  }

  return (
    <CSSMotion
      visible={visible}
      // We do not really use this motionName
      motionName={`${prefixCls}-loading-icon-motion`}
      motionLeave={visible}
      removeOnLeave
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
    >
      {({ className: motionCls, style: motionStyle }, ref: React.Ref<HTMLSpanElement>) => (
        <InnerLoadingIcon
          prefixCls={prefixCls}
          className={className}
          style={{ ...style, ...motionStyle }}
          ref={ref}
          iconClassName={motionCls}
        />
      )}
    </CSSMotion>
  );
};

export default LoadingIcon;
