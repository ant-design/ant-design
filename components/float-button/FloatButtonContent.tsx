import React, { memo } from 'react';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';

import type { FloatButtonContentProps } from './interface';

const FloatButtonContent: React.FC<FloatButtonContentProps> = (props) => {
  const { icon, description, prefixCls, className, ...rest } = props;

  const defaultElement = (
    <div className={`${prefixCls}-icon`}>
      <FileTextOutlined />
    </div>
  );

  return (
    <div {...rest} className={classNames(className, `${prefixCls}-content`)}>
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
