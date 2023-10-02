import React, { memo } from 'react';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import type { FloatButtonContentProps } from './interface';

const FloatButtonContent: React.FC<FloatButtonContentProps> = (props) => {
  const { icon, description, prefixCls, className } = props;
  const defaultElement = (
    <div className={`${prefixCls}-icon`}>
      <FileTextOutlined />
    </div>
  );
  return (
    <div
      onClick={props.onClick}
      onFocus={props.onFocus}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(className, `${prefixCls}-content`)}
    >
      {icon || description ? (
        <>
          {icon && <div className={`${prefixCls}-icon`}>{icon}</div>}
          {description && <div className={`${prefixCls}-description`}>{description}</div>}
        </>
      ) : (
        defaultElement
      )}
    </div>
  );
};

export default memo(FloatButtonContent);
