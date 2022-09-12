import React, { memo } from 'react';
import classNames from 'classnames';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import type { ContentProps } from './interface';

const FloatButtonContent: React.FC<ContentProps> = props => {
  const { icon, description, prefixCls, shape, type, CSSMotionClassName } = props;
  return (
    <div className={classNames(CSSMotionClassName, `${prefixCls}-content ${prefixCls}-${shape}`)}>
      {(icon || description) && (
        <>
          <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>{icon}</div>
          {description && <span>{description}</span>}
        </>
      )}
      {!icon && !description && (
        <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>
          <FileTextOutlined />
        </div>
      )}
    </div>
  );
};

export default memo(FloatButtonContent);
