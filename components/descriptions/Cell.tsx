import React from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import isNonNullable from '../_util/isNonNullable';
import type { CellSemanticType } from './DescriptionsContext';
import DescriptionsContext from './DescriptionsContext';

export interface CellProps {
  itemPrefixCls: string;
  span: number;
  className?: string;
  component: string;
  style?: React.CSSProperties;
  /** @deprecated Please use `styles.label` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  contentStyle?: React.CSSProperties;
  classNames?: CellSemanticType['classNames'];
  styles?: CellSemanticType['styles'];
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
    classNames,
  } = props;

  const Component = component as keyof React.JSX.IntrinsicElements;

  const { classNames: contextClassNames, styles: contextStyles } =
    React.useContext(DescriptionsContext);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props,
    },
  );

  const mergedLabelStyle: React.CSSProperties = { ...labelStyle, ...mergedStyles.label };
  const mergedContentStyle: React.CSSProperties = { ...contentStyle, ...mergedStyles.content };

  if (bordered) {
    return (
      <Component
        colSpan={span}
        style={style}
        className={clsx(className, {
          [`${itemPrefixCls}-item-${type}`]: type === 'label' || type === 'content',
          [mergedClassNames.label!]: mergedClassNames.label && type === 'label',
          [mergedClassNames.content!]: mergedClassNames.content && type === 'content',
        })}
      >
        {isNonNullable(label) && <span style={mergedLabelStyle}>{label}</span>}
        {isNonNullable(content) && <span style={mergedContentStyle}>{content}</span>}
      </Component>
    );
  }

  return (
    <Component className={clsx(`${itemPrefixCls}-item`, className)} style={style} colSpan={span}>
      <div className={`${itemPrefixCls}-item-container`}>
        {isNonNullable(label) && (
          <span
            style={mergedLabelStyle}
            className={clsx(`${itemPrefixCls}-item-label`, mergedClassNames.label, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
          >
            {label}
          </span>
        )}
        {isNonNullable(content) && (
          <span
            style={mergedContentStyle}
            className={clsx(`${itemPrefixCls}-item-content`, mergedClassNames.content)}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
