import * as React from 'react';
import type { JSX } from 'react';
import classNames from 'classnames';

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
  const descContext = React.useContext(DescriptionsContext);
  const { classNames: descriptionsClassNames } = descContext;

  const mergedLabelStyle: React.CSSProperties = { ...labelStyle, ...styles?.label };
  const mergedContentStyle: React.CSSProperties = { ...contentStyle, ...styles?.content };

  if (bordered) {
    return (
      <Component
        className={classNames(
          {
            [`${itemPrefixCls}-item-${type}`]: type === 'label' || type === 'content',
            [`${descriptionsClassNames?.label}`]: descriptionsClassNames && type === 'label',
            [`${descriptionsClassNames?.content}`]: descriptionsClassNames && type === 'content',
          },
          className,
        )}
        style={style}
        colSpan={span}
      >
        {isNonNullable(label) && <span style={mergedLabelStyle}>{label}</span>}
        {isNonNullable(content) && <span style={mergedContentStyle}>{content}</span>}
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
        {isNonNullable(label) && (
          <span
            className={classNames(`${itemPrefixCls}-item-label`, descriptionsClassNames?.label, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
            style={mergedLabelStyle}
          >
            {label}
          </span>
        )}
        {isNonNullable(content) && (
          <span
            className={classNames(`${itemPrefixCls}-item-content`, descriptionsClassNames?.content)}
            style={mergedContentStyle}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
