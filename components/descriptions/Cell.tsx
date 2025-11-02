import * as React from 'react';
import type { JSX } from 'react';
import classnames from 'classnames';

import DescriptionsContext from './DescriptionsContext';
import type { SemanticName } from './DescriptionsContext';

const isNonNullable = <T,>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

export interface CellProps {
  itemPrefixCls: string;
  span: number;
  className?: string;
  component: string;
  style?: React.CSSProperties;
  /** @deprecated Please use `styles={{ label: {} }}` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles={{ content: {} }}` instead */
  contentStyle?: React.CSSProperties;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  classNames?: Partial<Record<SemanticName, string>>;
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
  type?: 'label' | 'content' | 'item';
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
    type,
    styles,
  } = props;

  const Component = component as keyof JSX.IntrinsicElements;

  const { classNames: ctxClassNames } = React.useContext(DescriptionsContext);

  const mergedLabelStyle: React.CSSProperties = { ...labelStyle, ...styles?.label };
  const mergedContentStyle: React.CSSProperties = { ...contentStyle, ...styles?.content };

  if (bordered) {
    return (
      <Component
        colSpan={span}
        style={style}
        className={classnames(className, {
          [`${itemPrefixCls}-item-${type}`]: type === 'label' || type === 'content',
          [ctxClassNames?.label!]: ctxClassNames?.label && type === 'label',
          [ctxClassNames?.content!]: ctxClassNames?.content && type === 'content',
        })}
      >
        {isNonNullable(label) && <span style={mergedLabelStyle}>{label}</span>}
        {isNonNullable(content) && <span style={mergedContentStyle}>{content}</span>}
      </Component>
    );
  }

  return (
    <Component
      colSpan={span}
      style={style}
      className={classnames(`${itemPrefixCls}-item`, className)}
    >
      <div className={`${itemPrefixCls}-item-container`}>
        {isNonNullable(label) && (
          <span
            style={mergedLabelStyle}
            className={classnames(`${itemPrefixCls}-item-label`, ctxClassNames?.label, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
          >
            {label}
          </span>
        )}
        {isNonNullable(content) && (
          <span
            style={mergedContentStyle}
            className={classnames(`${itemPrefixCls}-item-content`, ctxClassNames?.content)}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
