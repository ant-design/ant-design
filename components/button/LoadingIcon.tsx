import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-animate/lib/CSSMotion';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

export interface LoadingIconProps {
  prefixCls: string;
  loading?: boolean | object;
}

export default function LoadingIcon({ prefixCls, loading }: LoadingIconProps) {
  const visible = !!loading;
  return (
    <CSSMotion visible={visible} motionName="zoom" removeOnLeave leavedClassName="hidden">
      {({ className }: { className: string }) => (
        <LoadingOutlined className={classNames(className, `${prefixCls}-loading-icon`)} />
      )}
    </CSSMotion>
  );
}
