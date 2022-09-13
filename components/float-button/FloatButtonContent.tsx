import React, { memo } from 'react';
import classNames from 'classnames';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import type { FloatButtonContentProps } from './interface';

const FloatButtonContent: React.FC<FloatButtonContentProps> = props => {
  const { icon, description, prefixCls, shape, type, CSSMotionClassName } = props;
  const classString = classNames(CSSMotionClassName, `${prefixCls}-content ${prefixCls}-${shape}`);
  const defaultElement = (
    <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>
      <FileTextOutlined />
    </div>
  );
  return (
    <div className={classString}>
      {icon || description ? (
        <>
          {icon && <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>{icon}</div>}
          {description && <span>{description}</span>}
        </>
      ) : (
        defaultElement
      )}
    </div>
  );
};

export default memo(FloatButtonContent);
