import * as React from 'react';
import classNames from 'classnames';

function notEmpty(val: any) {
  return val !== undefined && val !== null;
}

export interface CellProps {
  itemPrefixCls: string;
  span: number;
  className?: string;
  component: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
}

const Cell: React.FC<CellProps> = ({
  itemPrefixCls,
  component,
  span,
  className,
  style,
  bordered,
  label,
  content,
  colon,
}) => {
  const Component = component as any;

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
        {notEmpty(label) ? label : content}
      </Component>
    );
  }

  return (
    <Component
      className={classNames(`${itemPrefixCls}-item`, className)}
      style={style}
      colSpan={span}
    >
      {label && (
        <span
          className={classNames(`${itemPrefixCls}-item-label`, {
            [`${itemPrefixCls}-item-no-colon`]: !colon,
          })}
        >
          {label}
        </span>
      )}
      {content && <span className={classNames(`${itemPrefixCls}-item-content`)}>{content}</span>}
    </Component>
  );
};

export default Cell;
