import React from 'react';
import classNames from 'classnames';
import Grid from './Grid';

export interface CardProps {
  prefixCls?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  loading?: boolean;
  noHovering?: boolean;
  children?: any;
  id?: string;
  className?: string;
}

const Card = (props: CardProps) => {
  const {
    prefixCls = 'ant-card', className, extra, bodyStyle, noHovering,
    title, loading, bordered = true, ...others,
  } = props;
  let children = props.children;
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-no-hovering`]: noHovering,
  });

  if (loading) {
    children = (
      <div>
        <p className={`${prefixCls}-loading-block`} style={{ width: '94%' }} />
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '28%' }} />
          <span className={`${prefixCls}-loading-block`} style={{ width: '62%' }} />
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '22%' }} />
          <span className={`${prefixCls}-loading-block`} style={{ width: '66%' }} />
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '56%' }} />
          <span className={`${prefixCls}-loading-block`} style={{ width: '39%' }} />
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '21%' }} />
          <span className={`${prefixCls}-loading-block`} style={{ width: '15%' }} />
          <span className={`${prefixCls}-loading-block`} style={{ width: '40%' }} />
        </p>
      </div>
    );
  }

  let head;
  if (!title) {
    head = null;
  } else {
    head = typeof title === 'string' ? (
      <div className={`${prefixCls}-head`}>
        <h3 className={`${prefixCls}-head-title`}>{title}</h3>
      </div>
    ) : (
      <div className={`${prefixCls}-head`}>
        <div className={`${prefixCls}-head-title`}>{title}</div>
      </div>
    );
  }

  return (
    <div {...others} className={classString}>
      {head}
      {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
      <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
    </div>
  );
};

(Card as any).Grid = Grid;

export default Card;
