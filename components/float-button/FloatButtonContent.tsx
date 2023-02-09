import React, { memo } from 'react';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import classNames from 'classnames';
import type { FloatButtonContentProps } from './interface';

const FloatButtonContent: React.FC<FloatButtonContentProps> = (props) => {
  const { icon, description, prefixCls, className } = props;
  const defaultElement = (
    <div className={`${prefixCls}-icon`}>
      <QuestionCircleOutlined />
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
