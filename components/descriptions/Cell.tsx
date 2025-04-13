import * as React from 'react';
import type { JSX } from 'react';
import classNames from 'classnames';
import DescriptionsContext from './DescriptionsContext';
import type { SemanticName } from './DescriptionsContext';

function notEmpty(val: any) {
  return val !== undefined && val !== null;
}

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

  if (bordered) {
    return (
      <Component
        className={classNames(
          {
            [`${itemPrefixCls}-item-label`]: type === 'label',
            [`${itemPrefixCls}-item-content`]: type === 'content',
            [`${descriptionsClassNames?.label}`]: type === 'label',
            [`${descriptionsClassNames?.content}`]: type === 'content',
          },
          className,
        )}
        style={style}
        colSpan={span}
      >
        {notEmpty(label) && <span style={{ ...labelStyle, ...styles?.label }}>{label}</span>}
        {notEmpty(content) && <span style={{ ...labelStyle, ...styles?.content }}>{content}</span>}
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
            className={classNames(`${itemPrefixCls}-item-label`, descriptionsClassNames?.label, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
            style={{ ...labelStyle, ...styles?.label }}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span
            className={classNames(`${itemPrefixCls}-item-content`, descriptionsClassNames?.content)}
            style={{ ...contentStyle, ...styles?.content }}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
