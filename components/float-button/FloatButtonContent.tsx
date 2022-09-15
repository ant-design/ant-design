import React, { memo } from 'react';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import type { FloatButtonContentProps } from './interface';

const FloatButtonContent: React.FC<FloatButtonContentProps> = props => {
  const { icon, description, prefixCls, type, ...rest } = props;
  const defaultElement = (
    <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>
      <FileTextOutlined />
    </div>
  );
  return (
    <div {...rest} className={`${prefixCls}-content`}>
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
