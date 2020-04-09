import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-animate/lib/CSSMotion';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

export interface LoadingIconProps {
  prefixCls: string;
  existIcon: boolean;
  loading?: boolean | object;
}

const getCollapsedWidth = () => ({ width: 0, opacity: 0 });
const getRealWidth = (node: HTMLElement) => ({ width: node.scrollWidth, opacity: 1 });

export default function LoadingIcon({ prefixCls, loading, existIcon }: LoadingIconProps) {
  const visible = !!loading;

  if (existIcon) {
    return (
      <span className={`${prefixCls}-loading-icon`}>
        <LoadingOutlined />
      </span>
    );
  }

  return (
    <CSSMotion
      visible={visible}
      motionName="zoom"
      removeOnLeave
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
    >
      {({ className, style }: { className: string; style: React.CSSProperties }, ref: any) => {
        return (
          <span className={`${prefixCls}-loading-icon`} style={style} ref={ref}>
            <LoadingOutlined className={classNames(className)} />
          </span>
        );
      }}
    </CSSMotion>
  );
}
