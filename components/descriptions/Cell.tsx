import classNames from 'classnames';
import * as React from 'react';

function notEmpty(val: any) {
  return val !== undefined && val !== null;
}

export interface CellProps {
  itemPrefixCls: string;
  span: number;
  className?: string;
  component: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
}

const Cell: React.FC<CellProps> = (props) => {
  const {
    itemPrefixCls,
    component,
    span,
    className,
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon,
  } = props;

  const Component = component as keyof JSX.IntrinsicElements;

  if (bordered) {
    return (
      <Component
        className={classNames(
          {
            [`${itemPrefixCls}-item-label`]: notEmpty(label),
            [`${itemPrefixCls}-item-content`]: notEmpty(content),
          },
          className,
        )}
        style={style}
        colSpan={span}
      >
        {notEmpty(label) && <span style={labelStyle}>{label}</span>}
        {notEmpty(content) && <span style={contentStyle}>{content}</span>}
      </Component>
    );
  }

  return (
    <Component
      className={classNames(`${itemPrefixCls}-item`, className)}
      style={style}
      colSpan={span}
    >
      <div className={`${itemPrefixCls}-item-container`}>
        {(label || label === 0) && (
          <span
            className={classNames(`${itemPrefixCls}-item-label`, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
            style={labelStyle}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span className={classNames(`${itemPrefixCls}-item-content`)} style={contentStyle}>
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
