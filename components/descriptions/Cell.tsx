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
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
  hashId?: string;
}

const Cell: React.FC<CellProps> = ({
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
  hashId,
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
          hashId,
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
      className={classNames(`${itemPrefixCls}-item`, className, hashId)}
      style={style}
      colSpan={span}
    >
      <div className={classNames(`${itemPrefixCls}-item-container`, hashId)}>
        {(label || label === 0) && (
          <span
            className={classNames(
              `${itemPrefixCls}-item-label`,
              {
                [`${itemPrefixCls}-item-no-colon`]: !colon,
              },
              hashId,
            )}
            style={labelStyle}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span
            className={classNames(`${itemPrefixCls}-item-content`, hashId)}
            style={contentStyle}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
